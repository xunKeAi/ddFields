# AI视频大师（可灵）字段捷径技术方案

## 一、需求概述

将可灵的「动作控制」接口封装为钉钉字段捷径，用户上传参考图片和参考视频，生成视频中的人物动作与参考视频一致。

## 二、接口分析

### 2.1 接口地址
- **创建任务**: `POST https://token.yishangcloud.cn/v1/videos`
- **查询任务**: `GET https://token.yishangcloud.cn/v1/videos/{task_id}`

### 2.2 动作控制参数

| 参数 | 类型 | 必需 | 说明 |
|------|------|------|------|
| model | string | ✓ | 模型名称：kling-v2-6, kling-v3 |
| prompt | string | ✓ | 文本提示词（不超过2500字符） |
| image | string | ✓ | 参考图片URL |
| videos | array[string] | ✓ | 参考视频URL |
| mode | string | ✓ | 生成模式：std, pro |
| keep_original_sound | string | 可选 | 是否保留视频原声：yes, no（默认yes） |
| character_orientation | string | ✓ | 人物朝向：image, video |

### 2.3 character_orientation 说明
- **image**：与图片中人物朝向一致；参考视频时长不得超过 10 秒
- **video**：与视频中人物朝向一致；参考视频时长不得超过 30 秒

### 2.4 请求示例

```json
{
  "model": "kling-v2-6",
  "prompt": "图一的女孩穿着灰色宽松T恤和牛仔短裤像视频里一样跳起舞来",
  "image": "https://example.com/image.png",
  "videos": ["https://example.com/dance.mp4"],
  "duration": 5,
  "mode": "pro",
  "keep_original_sound": "yes",
  "character_orientation": "image"
}
```

### 2.5 响应示例

```json
{
  "id": "889296046059696210",
  "task_id": "889296046059696210",
  "object": "video",
  "model": "kling-v2-6",
  "status": "",
  "progress": 0,
  "created_at": 1780053219
}
```

## 三、字段配置设计

### 3.1 表单项（formItems）

| 字段 | 类型 | 必需 | 说明 |
|------|------|------|------|
| modelSelect | SingleSelect | ✓ | 模型选择：kling-v2-6, kling-v3 |
| videoPrompt | Textarea | ✓ | 提示词（≤2500字符） |
| refImage | FieldSelect | ✓ | 参考图片（Attachment类型） |
| refVideo | FieldSelect | ✓ | 参考视频（Attachment类型） |
| duration | SingleSelect | ✓ | 视频时长 3-15秒，默认5秒 |
| genMode | SingleSelect | ✓ | 生成模式：std, pro |
| keepSound | SingleSelect | ✓ | 是否保留原声：yes, no |
| characterOrientation | SingleSelect | ✓ | 人物朝向：image, video |

## 四、执行流程

```
1. 参数校验
   - prompt 必填且 ≤2500字符
   - image 和 video 必需
      ↓
2. 提取附件URL（从refImage/refVideo中递归提取tmp_url）
      ↓
3. 构建请求体
      ↓
4. 调用创建任务接口 POST /v1/videos
      ↓
5. 获取 task_id
      ↓
6. 轮询查询接口 GET /v1/videos/{task_id}
   - 间隔：5秒
   - 最大等待：15分钟
   - 状态判断：failed/completed
      ↓
7. 返回视频URL
```

## 五、错误处理

| 错误类型 | 判断条件 | 错误码 |
|---------|---------|--------|
| 配置错误 | 令牌无效 | ConfigError |
| 额度耗尽 | 令牌额度已用尽、quota | QuotaExhausted |
| 任务失败 | status === 'failed' | Error |
| 超时 | 轮询超过15分钟 | error3 |
| 提示词空 | prompt为空 | error4 |
| 参数不支持 | is not supported | error5 |
| 视频时长不足 | Video duration can not less than 3s | error6 |
| 参数错误 | "code":1201 | error7 |
| 缺少图片/视频 | image或video未上传 | error8 |
| 提示词过长 | prompt > 2500字符 | error9 |

## 六、与 klingToVideo 的区别

| 功能 | klingToVideo | klingToVideoTool |
|------|-------------|------------------|
| 名称 | AI视频生成（可灵） | AI视频大师（可灵） |
| 接口类型 | 文生视频/图生视频/视频Omni | 动作控制 |
| 模型 | 11个模型 | kling-v2-6, kling-v3 |
| 必需参数 | prompt | prompt + image + video |
| 特有参数 | aspect_ratio, sound | character_orientation |

## 七、文件结构

```
klingToVideoTool/
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