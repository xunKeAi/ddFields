# AI视频生成（可灵）字段捷径技术方案

## 一、需求概述

将可灵的三个视频生成接口（文生视频、图生视频、视频Omni）整合为一个钉钉字段捷径，用户通过选择不同模型和参数配置，统一调用 `POST https://token.yishangcloud.cn/v1/videos` 接口生成视频。

## 二、接口分析

### 2.1 统一入口接口
- **创建任务**: `POST https://token.yishangcloud.cn/v1/videos`
- **查询任务**: `GET https://token.yishangcloud.cn/v1/videos/{task_id}`

### 2.2 三种模式参数差异

| 参数 | 文生视频 | 图生视频 | 视频Omni | 说明 |
|------|---------|---------|----------|------|
| model | ✓ | ✓ | ✓ | 模型选择 |
| prompt | ✓ | ✓ | ✓ | 文本提示词（必需） |
| duration | ✓ | ✓ | ✓ | 视频时长 3-15秒 |
| mode | ✓ | ✓ | ✓ | std/pro/4k |
| aspect_ratio | ✓ | ✗ | ✓ | 16:9/9:16/1:1 |
| sound | ✓ | ✓ | ✗ | on/off |
| image | ✗ | ✓ | ✓ | 参考图片URL |
| image_tail | ✗ | ✓ | ✓ | 尾帧图片URL |
| videos | ✗ | ✗ | ✓ | 参考视频URL |
| metadata | ✗ | ✗ | ✓ | 视频配置对象 |

### 2.3 模型列表（去重合并）

```
文生视频专属:
- kling-v1, kling-v1-6, kling-v2-master, kling-v2-1-master
- kling-v2-5-turbo, kling-v2-6, kling-v3

图生视频专属:
- kling-v1-5, kling-v2-1

视频Omni专属:
- kling-video-o1, kling-v3-omni
```

**合并后的完整模型列表**（按接口支持分类显示提示）:
```
kling-v1, kling-v1-5, kling-v1-6, kling-v2-master, kling-v2-1,
kling-v2-1-master, kling-v2-5-turbo, kling-v2-6, kling-v3,
kling-video-o1, kling-v3-omni
```

## 三、字段配置设计

### 3.1 表单项（formItems）

```
1. model（模型选择）- SingleSelect [必需]
   - 合并所有模型，用户选择后根据模型特性显示提示

2. prompt（提示词）- Textarea [必需]
   - 支持字段引用

3. image（参考图片/首帧）- FieldSelect [可选]
   - 支持 Attachment 类型
   - 用于图生视频和视频Omni

4. image_tail（尾帧图片）- FieldSelect [可选]
   - 支持 Attachment 类型
   - 用于图生视频和视频Omni

5. videos（参考视频）- FieldSelect [可选]
   - 支持 Attachment 类型
   - 仅用于视频Omni模式

6. duration（视频时长）- SingleSelect [可选，默认5秒]
   - 枚举值：3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15

7. mode（生成模式）- SingleSelect [可选，默认std]
   - 枚举值：std, pro, 4k

8. aspect_ratio（画面比例）- SingleSelect [可选，默认16:9]
   - 枚举值：16:9, 9:16, 1:1

9. sound（是否生成声音）- SingleSelect [可选，默认off]
   - 枚举值：on, off
```

### 3.2 参数传递逻辑

```typescript
// 基础参数（所有模式都需要）
const requestBody: any = {
  model: model,
  prompt: prompt,
  duration: parseInt(duration),
  mode: mode
};

// 文生视频：添加 aspect_ratio 和 sound
if (isTextToVideo(model)) {
  requestBody.aspect_ratio = aspect_ratio;
  requestBody.sound = sound;
}

// 图生视频：添加 image、image_tail、sound
if (isImageToVideo(model)) {
  if (imageUrl) requestBody.image = imageUrl;
  if (imageTailUrl) requestBody.image_tail = imageTailUrl;
  requestBody.sound = sound;
}

// 视频Omni：添加 aspect_ratio、image、image_tail、videos、metadata
if (isOmniVideo(model)) {
  requestBody.aspect_ratio = aspect_ratio;
  if (imageUrl) requestBody.image = imageUrl;
  if (imageTailUrl) requestBody.image_tail = imageTailUrl;
  if (videoUrl) {
    requestBody.videos = [videoUrl];
    requestBody.metadata = {
      video_list: [{
        refer_type: "feature",
        keep_original_sound: "yes"
      }]
    };
  }
}
```

## 四、执行流程

```
1. 参数校验（prompt必填）
      ↓
2. 提取附件URL（从refImage/refVideo中递归提取tmp_url）
      ↓
3. 构建请求体（根据模型类型决定参数）
      ↓
4. 调用创建任务接口 POST /v1/videos
      ↓
5. 获取 task_id
      ↓
6. 轮询查询接口 GET /v1/videos/{task_id}
   - 间隔：5秒
   - 最大等待：15分钟（900秒）
   - 状态判断：failed/completed
      ↓
7. 返回视频URL
```

## 五、错误处理

| 错误类型 | 判断条件 | 返回码 |
|---------|---------|--------|
| 配置错误 | 令牌无效、令牌配置有误 | ConfigError |
| 额度耗尽 | 令牌额度已用尽、quota | QuotaExhausted |
| 任务失败 | status === 'failed' | Error |
| 超时 | 轮询超过15分钟 | Error |
| 其他错误 | catch异常 | Error + errorMessage |

## 六、已确认问题

1. **查询接口响应格式**：视频URL字段名为 `video_url`，与Veo一致 ✓

2. **视频Omni的metadata配置**：
   - `refer_type` 固定传 "feature"（用户无需选择）
   - `keep_original_sound` 开放给用户选择 ✓

3. **图片参数**：不强制校验，用户上传则传递，不上传则不传 ✓

## 七、文件结构

```
klingToVideo/
├── README.md          # 技术方案文档
├── package.json       # 项目配置
├── tsconfig.json      # TypeScript配置
└── src/
    └── index.ts       # 字段捷径实现代码
```

## 八、使用说明

1. 安装依赖：`npm install`
2. 本地调试：`npm start`
3. 打包发布：`npm run pack`
