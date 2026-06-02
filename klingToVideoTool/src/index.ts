import { FieldType, fieldDecoratorKit, FormItemComponent, FieldExecuteCode, AuthorizationType } from 'dingtalk-docs-cool-app';

const { t } = fieldDecoratorKit;

// 通过addDomainList添加请求接口的域名
fieldDecoratorKit.setDomainList(['api.exchangerate-api.com', 'token.yishangcloud.cn', 'pay.xunkecloud.cn']);

// 动作控制模型
const ACTION_CONTROL_MODELS = ['kling-v2-6', 'kling-v3'];

fieldDecoratorKit.setDecorator({
  name: 'AI视频大师（可灵）',
  // 定义捷径的i18n语言资源
  i18nMap: {
    'zh-CN': {
      'modelSelect': '模型选择',
      'videoPrompt': '提示词',
      'refImage': '参考图片',
      'refVideo': '参考视频',
      'genMode': '生成模式',
      'keepSound': '保留原声',
      'characterOrientation': '人物朝向',
      'errorTips1': '捷径异常，维护中可联系开发者咨询',
      'errorTips2': '令牌配置有误，请检查您的令牌是否正确，如仍有疑问可加入钉钉群咨询',
      'errorTips3': '视频生成超时，请稍后重试',
      'errorTips4': '提示词不能为空',
      'errorTips5': '请重新调整参数，当前参数官方不支持',
      'errorTips6': '请上传参考图片和参考视频',
      'errorTips7': '提示词不能超过2500个字符',
    },
    'en-US': {
      'modelSelect': 'Model selection',
      'videoPrompt': 'Prompt',
      'refImage': 'Reference image',
      'refVideo': 'Reference video',
      'genMode': 'Generation mode',
      'keepSound': 'Keep original sound',
      'characterOrientation': 'Character orientation',
      'errorTips1': 'Shortcut exception, under maintenance, please contact the developer',
      'errorTips2': 'Token configuration error, please check if your token is correct',
      'errorTips3': 'Video generation timeout, please try again later',
      'errorTips4': 'Prompt cannot be empty',
      'errorTips5': 'Please adjust parameters, current parameters are not supported by official',
      'errorTips6': 'Please upload reference image and reference video',
      'errorTips7': 'Prompt cannot exceed 2500 characters',
    },
    'ja-JP': {
      'modelSelect': 'モデル選択',
      'videoPrompt': 'プロンプト',
      'refImage': '参考画像',
      'refVideo': '参考動画',
      'genMode': '生成モード',
      'keepSound': '元の音声を保持',
      'characterOrientation': '人物の向き',
      'errorTips1': 'ショートカット例外、メンテナンス中、開発者にお問い合わせください',
      'errorTips2': 'トークン設定エラー、トークンが正しいか確認してください',
      'errorTips3': '動画生成タイムアウト、後でもう一度お試しください',
      'errorTips4': 'プロンプトは空にできません',
      'errorTips5': 'パラメータを調整してください、現在のパラメータは公式でサポートされていません',
      'errorTips6': '参考画像と参考動画をアップロードしてください',
      'errorTips7': 'プロンプトは2500文字を超えることはできません',
    },
  },
  errorMessages: {
    'error1': t('errorTips1'),
    'error2': t('errorTips2'),
    'error3': t('errorTips3'),
    'error4': t('errorTips4'),
    'error5': t('errorTips5'),
    'error6': t('errorTips6'),
    'error7': t('errorTips7'),
  },
  authorizations: {
    id: 'auth_id',
    platform: 'yishangcloud',
    type: AuthorizationType.HeaderBearerToken,
    required: true,
    instructionsUrl: "https://token.yishangcloud.cn/",
    label: '关联账号',
    tooltips: '请配置授权',
    icon: {
      light: 'https://token.yishangcloud.cn/logo1.png',
      dark: 'https://token.yishangcloud.cn/logo1.png'
    }
  },
  // 定义捷径的入参
  formItems: [
    {
      key: 'modelSelect',
      label: t('modelSelect'),
      component: FormItemComponent.SingleSelect,
      props: {
        defaultValue: 'kling-v3',
        placeholder: '请选择模型',
        options: ACTION_CONTROL_MODELS.map(m => ({ key: m, title: m }))
      },
      validator: {
        required: true,
      }
    },
    {
      key: 'videoPrompt',
      label: t('videoPrompt'),
      component: FormItemComponent.Textarea,
      props: {
        placeholder: '请输入视频生成提示词（不超过2500字符）',
        enableFieldReference: true,
      },
      validator: {
        required: true,
      }
    },
    {
      key: 'refImage',
      label: t('refImage'),
      component: FormItemComponent.FieldSelect,
      tooltips: {
        title: '上传参考图片（必需），生成视频中的人物动作与参考视频一致'
      },
      props: {
        mode: 'multiple',
        supportTypes: [FieldType.Attachment],
      },
      validator: {
        required: true,
      }
    },
    {
      key: 'refVideo',
      label: t('refVideo'),
      component: FormItemComponent.FieldSelect,
      tooltips: {
        title: '上传参考视频（必需），人物朝向与图片一致时参考视频≤10秒，与视频一致时≤30秒'
      },
      props: {
        mode: 'multiple',
        supportTypes: [FieldType.Attachment],
      },
      validator: {
        required: true,
      }
    },
    {
      key: 'genMode',
      label: t('genMode'),
      component: FormItemComponent.SingleSelect,
      props: {
        defaultValue: 'std',
        placeholder: '请选择生成模式',
        options: [
          { key: 'std', title: '标准(std)' },
          { key: 'pro', title: '专业(pro)' }
        ]
      },
      validator: {
        required: true,
      }
    },
    {
      key: 'keepSound',
      label: t('keepSound'),
      component: FormItemComponent.SingleSelect,
      props: {
        defaultValue: 'yes',
        placeholder: '是否保留参考视频原声',
        options: [
          { key: 'yes', title: '是' },
          { key: 'no', title: '否' }
        ]
      },
      validator: {
        required: true,
      }
    },
    {
      key: 'characterOrientation',
      label: t('characterOrientation'),
      component: FormItemComponent.SingleSelect,
      props: {
        defaultValue: 'image',
        placeholder: '人物朝向参考',
        options: [
          { key: 'image', title: '与图片一致（参考视频≤10秒）' },
          { key: 'video', title: '与视频一致（参考视频≤30秒）' }
        ]
      },
      validator: {
        required: true,
      }
    },
  ],
  // 定义捷径的返回结果类型
  resultType: {
    type: FieldType.Attachment,
  },
  // formItemParams 为运行时传入的字段参数
  execute: async (context, formItemParams: any) => {
    let {
      modelSelect,
      videoPrompt,
      refImage,
      refVideo,
      genMode,
      keepSound,
      characterOrientation
    } = formItemParams;

    // 日志工具
    const debugLog = (arg: any) => {
      console.log(JSON.stringify({
        timestamp: new Date().toISOString(),
        ...arg
      }));
    };

    // 递归提取 tmp_url（提取第一个有效的）
    const extractTmpUrl = (data: any): string | null => {
      if (data === null || typeof data === 'undefined') {
        return null;
      }
      if (typeof data === 'object') {
        if ('tmp_url' in data && typeof data.tmp_url === 'string' && data.tmp_url.trim()) {
          return data.tmp_url.trim();
        }
        for (const key in data) {
          if (data.hasOwnProperty(key) && data[key] !== null) {
            const result = extractTmpUrl(data[key]);
            if (result !== null) {
              return result;
            }
          }
        }
      }
      return null;
    };

    try {
      // 入参校验
      if (!videoPrompt?.trim()) {
        return {
          code: FieldExecuteCode.Error,
          errorMessage: 'error4'
        };
      }

      // 提示词长度校验
      if (videoPrompt.length > 2500) {
        return {
          code: FieldExecuteCode.Error,
          errorMessage: 'error8'
        };
      }

      // 提取图片和视频URL
      const imageUrl = extractTmpUrl(refImage);
      const videoUrl = extractTmpUrl(refVideo);

      // 必需图片和视频
      if (!imageUrl || !videoUrl) {
        return {
          code: FieldExecuteCode.Error,
          errorMessage: 'error7'
        };
      }

      // 拼接模型名称：model-mode-video（如 kling-v3-std-video）
      modelSelect = `${modelSelect}-${genMode}-video`;

      // 构建请求参数
      const requestBody: any = {
        model: modelSelect,
        prompt: videoPrompt,
        image: imageUrl,
        videos: [videoUrl],
        mode: genMode,
        keep_original_sound: keepSound,
        character_orientation: characterOrientation
      };

      debugLog({ request: requestBody });

      // 创建视频任务
      const createVideoUrl = 'https://token.yishangcloud.cn/v1/videos';
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      };

      const createTask = await context.fetch(createVideoUrl, requestOptions, 'auth_id');
      const taskResp = await createTask.json();

      debugLog({ taskResponse: taskResp });

      // 检查令牌有效性
      if (taskResp.error?.message?.includes('无效的令牌')) {
        return {
          code: FieldExecuteCode.Error,
          errorMessage: 'error2'
        };
      }

      // 检查是否返回了正确的task_id
      if (taskResp && taskResp.task_id) {
        // 轮询查询任务状态
        const videoDetailUrl = `https://token.yishangcloud.cn/v1/videos/${taskResp.task_id}`;
        const detailRequestOptions = {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        };

        const pollingInterval = 5000; // 5秒间隔
        const maxPollingTime = 900000; // 15分钟最大等待时间
        const startTime = Date.now();

        let videoDetailResp;
        let pollingComplete = false;

        while (!pollingComplete && (Date.now() - startTime) < maxPollingTime) {
          const getTaskDetail = await context.fetch(videoDetailUrl, detailRequestOptions, 'auth_id');
          videoDetailResp = await getTaskDetail.json();

          debugLog({ pollingResponse: videoDetailResp });

          if (videoDetailResp && videoDetailResp.status === 'failed') {
            return {
              code: FieldExecuteCode.Error,
              errorMessage: videoDetailResp.error?.message || '视频生成失败'
            };
          } else if (videoDetailResp && videoDetailResp.status === 'completed') {
            pollingComplete = true;
            debugLog({ message: '视频生成完成' });
          } else {
            // 未完成，等待后继续轮询
            await new Promise(resolve => setTimeout(resolve, pollingInterval));
          }
        }

        // 检查是否超时
        if (!pollingComplete) {
          debugLog({ message: '视频生成超时' });
          return {
            code: FieldExecuteCode.Error,
            errorMessage: 'error3'
          };
        }

        // 提取视频URL
        const videoUrlResult = videoDetailResp?.metadata?.video_url || "";

        debugLog({ videoUrl: videoUrlResult });

        return {
          code: FieldExecuteCode.Success,
          data: [{
            fileName: 'video.mp4',
            type: 'video',
            url: videoUrlResult
          }]
        };
      } else {
        throw new Error(taskResp.error?.message || '创建任务失败');
      }

    } catch (e: any) {
      const errMsg = String(e?.message || e);
      debugLog({ error: errMsg });

      if (errMsg.includes('无可用渠道')) {
        return {
          code: FieldExecuteCode.Error,
          errorMessage: 'error1',
        };
      }

      if (errMsg.includes('令牌额度已用尽') || errMsg.includes('quota') || errMsg.includes('额度')) {
        return {
          code: FieldExecuteCode.QuotaExhausted,
        };
      }

      if (errMsg.includes('无效的令牌')) {
        return {
          code: FieldExecuteCode.ConfigError,
        };
      }

      // 参数不支持或错误码1201
      if (errMsg.includes('is not supported') || errMsg.includes('"code":1201')) {
        return {
          code: FieldExecuteCode.Error,
          errorMessage: 'error5',
        };
      }

      return {
        code: FieldExecuteCode.Error,
        extra: { errorMessage: errMsg }
      };
    }
  },
});

export default fieldDecoratorKit;