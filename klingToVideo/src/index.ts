import { FieldType, fieldDecoratorKit, FormItemComponent, FieldExecuteCode, AuthorizationType } from 'dingtalk-docs-cool-app';

const { t } = fieldDecoratorKit;

// 通过addDomainList添加请求接口的域名
fieldDecoratorKit.setDomainList(['api.exchangerate-api.com', 'token.yishangcloud.cn', 'pay.xunkecloud.cn']);

// 模型分类
const TEXT_TO_VIDEO_MODELS = ['kling-v1', 'kling-v1-6', 'kling-v2-master', 'kling-v2-1-master', 'kling-v2-5-turbo', 'kling-v2-6', 'kling-v3'];
const IMAGE_TO_VIDEO_MODELS = ['kling-v1', 'kling-v1-5', 'kling-v1-6', 'kling-v2-master', 'kling-v2-1', 'kling-v2-1-master', 'kling-v2-5-turbo', 'kling-v2-6', 'kling-v3'];
const OMNI_MODELS = ['kling-video-o1', 'kling-v3-omni'];

// 不支持 sound 的模型
const NO_SOUND_MODELS = [
  'kling-v1',
  'kling-v1-5',
  'kling-v1-6',
  'kling-v2-master',
  'kling-v2-1',
  'kling-v2-1-master',
  'kling-v2-5-turbo',
  'kling-video-o1',
];

// 所有模型合并去重
const ALL_MODELS = [...new Set([...TEXT_TO_VIDEO_MODELS, ...IMAGE_TO_VIDEO_MODELS, ...OMNI_MODELS])];

fieldDecoratorKit.setDecorator({
  name: 'AI视频创作（可灵）',
  // 定义捷径的i18n语言资源
  i18nMap: {
    'zh-CN': {
      'modelSelect': '模型选择',
      'videoPrompt': '提示词',
      'refImage': '参考图片',
      'imageTail': '尾帧图片',
      'refVideo': '参考视频',
      'duration': '视频时长',
      'genMode': '生成模式',
      'aspectRatio': '画面比例',
      'sound': '生成声音',
      'keepSound': '保留原声',
      'errorTips1': '捷径异常，维护中可联系开发者咨询',
      'errorTips2': '令牌配置有误，请检查您的令牌是否正确，如仍有疑问可加入钉钉群咨询',
      'errorTips3': '视频生成超时，请稍后重试',
      'errorTips4': '提示词不能为空',
      'errorTips5': '视频时长不足3秒',
      'errorTips6': '请重新调整参数，当前参数官方不支持',
    },
    'en-US': {
      'modelSelect': 'Model selection',
      'videoPrompt': 'Prompt',
      'refImage': 'Reference image',
      'imageTail': 'Tail frame image',
      'refVideo': 'Reference video',
      'duration': 'Video duration',
      'genMode': 'Generation mode',
      'aspectRatio': 'Aspect ratio',
      'sound': 'Generate sound',
      'keepSound': 'Keep original sound',
      'errorTips1': 'Shortcut exception, under maintenance, please contact the developer',
      'errorTips2': 'Token configuration error, please check if your token is correct',
      'errorTips3': 'Video generation timeout, please try again later',
      'errorTips4': 'Prompt cannot be empty',
      'errorTips5': 'Video duration less than 3 seconds',
      'errorTips6': 'Please adjust parameters, current parameters are not supported by official',
    },
    'ja-JP': {
      'modelSelect': 'モデル選択',
      'videoPrompt': 'プロンプト',
      'refImage': '参考画像',
      'imageTail': '末尾フレーム画像',
      'refVideo': '参考動画',
      'duration': '動画の長さ',
      'genMode': '生成モード',
      'aspectRatio': 'アスペクト比',
      'sound': '音声生成',
      'keepSound': '元の音声を保持',
      'errorTips1': 'ショートカット例外、メンテナンス中、開発者にお問い合わせください',
      'errorTips2': 'トークン設定エラー、トークンが正しいか確認してください',
      'errorTips3': '動画生成タイムアウト、後でもう一度お試しください',
      'errorTips4': 'プロンプトは空にできません',
      'errorTips5': '動画の長さが3秒未満です',
      'errorTips6': 'パラメータを調整してください、現在のパラメータは公式でサポートされていません',
    },
  },
  errorMessages: {
    'error1': t('errorTips1'),
    'error2': t('errorTips2'),
    'error3': t('errorTips3'),
    'error4': t('errorTips4'),
    'error5': t('errorTips5'),
    'error6': t('errorTips6'),
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
      tooltips: {
        title: 'kling-video-o1、kling-v3-omni 支持参考视频生成；其他模型支持文生视频/图生视频'
      },
      props: {
        defaultValue: 'kling-v3',
        placeholder: '请选择模型',
        options: ALL_MODELS.map(m => ({ key: m, title: m }))
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
        placeholder: '请输入视频生成提示词',
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
        title: '参考图片，配合尾帧可实现首尾帧过渡效果'
      },
      props: {
        mode: 'multiple',
        supportTypes: [FieldType.Attachment],
      },
      validator: {
        required: false,
      }
    },
    {
      key: 'imageTail',
      label: t('imageTail'),
      component: FormItemComponent.FieldSelect,
      tooltips: {
        title: '作为视频尾帧，配合首帧实现过渡效果'
      },
      props: {
        mode: 'multiple',
        supportTypes: [FieldType.Attachment],
      },
      validator: {
        required: false,
      }
    },
    {
      key: 'refVideo',
      label: t('refVideo'),
      component: FormItemComponent.FieldSelect,
      tooltips: {
        title: '仅 kling-video-o1、kling-v3-omni 模型支持，参考视频不少于3秒'
      },
      props: {
        mode: 'multiple',
        supportTypes: [FieldType.Attachment],
      },
      validator: {
        required: false,
      }
    },
    {
      key: 'duration',
      label: t('duration'),
      component: FormItemComponent.SingleSelect,
      props: {
        defaultValue: '5',
        placeholder: '请选择视频时长',
        options: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(v => ({ key: String(v), title: `${v}秒` }))
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
          { key: 'pro', title: '专业(pro)' },
          { key: '4k', title: '4K' }
        ]
      },
      validator: {
        required: true,
      }
    },
    {
      key: 'aspectRatio',
      label: t('aspectRatio'),
      component: FormItemComponent.SingleSelect,
      props: {
        defaultValue: '16:9',
        placeholder: '请选择画面比例',
        options: [
          { key: '16:9', title: '16:9' },
          { key: '9:16', title: '9:16' },
          { key: '1:1', title: '1:1' }
        ]
      },
      validator: {
        required: false,
      }
    },
    {
      key: 'sound',
      label: t('sound'),
      component: FormItemComponent.SingleSelect,
      props: {
        defaultValue: 'off',
        placeholder: '是否生成声音',
        options: [
          { key: 'on', title: '是' },
          { key: 'off', title: '否' }
        ]
      },
      tooltips: {
        title: '生成视频时是否同时生成声音'
      },
      validator: {
        required: false,
      }
    },
    {
      key: 'keepSound',
      label: t('keepSound'),
      component: FormItemComponent.SingleSelect,
      props: {
        defaultValue: 'no',
        placeholder: '是否保留参考视频原声',
        options: [
          { key: 'yes', title: '是' },
          { key: 'no', title: '否' }
        ]
      },
      tooltips: {
        title: '仅 kling-video-o1、kling-v3-omni 模型支持，保留参考视频原声'
      },
      validator: {
        required: false,
      }
    },
  ],
  // 定义捷径的返回结果类型
  resultType: {
    type: FieldType.Attachment,
  },
  // formItemParams 为运行时传入的字段参数
  execute: async (context, formItemParams: any) => {
    const {
      modelSelect,
      videoPrompt,
      refImage,
      imageTail,
      refVideo,
      duration,
      genMode,
      aspectRatio,
      sound,
      keepSound
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

    // 判断模型类型
    const isO1 = modelSelect === 'kling-video-o1';
    const isOmni = modelSelect === 'kling-v3-omni';

    try {
      // 入参校验
      if (!videoPrompt?.trim()) {
        return {
          code: FieldExecuteCode.Error,
          errorMessage: 'error4'
        };
      }

      // 提取图片URL
      const imageUrl = extractTmpUrl(refImage);
      const imageTailUrl = extractTmpUrl(imageTail);
      const videoUrl = extractTmpUrl(refVideo);
      const hasImage = imageUrl || imageTailUrl;
      const hasVideo = !!videoUrl;

      // 拼接模型名称
      let fullModel: string;

      if (isO1) {
        // kling-video-o1: 不支持 sound
        if (hasVideo) {
          fullModel = `${modelSelect}-${genMode}-video`;
        } else {
          fullModel = `${modelSelect}-${genMode}`;
        }
      } else if (isOmni) {
        // kling-v3-omni: 支持 sound 和 video，但不能同时
        if (hasVideo) {
          fullModel = `${modelSelect}-${genMode}-video`;
        } else if (sound === 'on') {
          fullModel = `${modelSelect}-${genMode}-sound`;
        } else {
          fullModel = `${modelSelect}-${genMode}`;
        }
      } else {
        // 其他模型：原有逻辑
        fullModel = `${modelSelect}-${genMode}`;
        if (sound === 'on') {
          fullModel = `${fullModel}-sound`;
        }
      }

      // 构建请求参数
      const requestBody: any = {
        model: fullModel,
        prompt: videoPrompt,
        duration: parseInt(duration) || 5,
        mode: genMode
      };

      // 根据模型类型添加参数
      if (isO1 || isOmni) {
        // 视频Omni模式
        requestBody.aspect_ratio = aspectRatio;
        if (imageUrl) requestBody.image = imageUrl;
        if (imageTailUrl) requestBody.image_tail = imageTailUrl;
        if (videoUrl) {
          requestBody.videos = [videoUrl];
          requestBody.metadata = {
            video_list: [{
              refer_type: "feature",
              keep_original_sound: keepSound
            }]
          };
        }
      } else {
        // 文生视频/图生视频模式
        requestBody.aspect_ratio = aspectRatio;
        requestBody.sound = sound;
        if (imageUrl) requestBody.image = imageUrl;
        if (imageTailUrl) requestBody.image_tail = imageTailUrl;
      }

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

      // 检查参数错误 1201
      const errorMsg = taskResp.error?.message || taskResp.message || '';
      if (taskResp.code === 1201 || errorMsg.includes('"code":1201') || errorMsg.includes('is not supported')) {
        return {
          code: FieldExecuteCode.Error,
          errorMessage: 'error6'
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
        const videoUrl = videoDetailResp?.metadata?.video_url || "";

        debugLog({ videoUrl });

        return {
          code: FieldExecuteCode.Success,
          data: [{
            fileName: 'video.mp4',
            type: 'video',
            url: videoUrl
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

      // 视频时长不足3秒
      if (errMsg.includes('Video duration can not less than 3s')) {
        return {
          code: FieldExecuteCode.Error,
          errorMessage: 'error5',
        };
      }

      // 参数不支持或错误码1201
      if (errMsg.includes('is not supported') || errMsg.includes('"code":1201')) {
        return {
          code: FieldExecuteCode.Error,
          errorMessage: 'error6',
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
