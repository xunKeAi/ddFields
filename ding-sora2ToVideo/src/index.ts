import { FieldType, fieldDecoratorKit, FormItemComponent, FieldExecuteCode, AuthorizationType } from 'dingtalk-docs-cool-app';
const { t } = fieldDecoratorKit;

// 通过addDomainList添加请求接口的域名
fieldDecoratorKit.setDomainList(['api.exchangerate-api.com','token.yishangcloud.cn','pay.xunkecloud.cn','open.feishu.cn']);

fieldDecoratorKit.setDecorator({
  name: 'AI 视频(Sora2)',
  // 定义AI 字段的i18n语言资源
  i18nMap: {
    'zh-CN': {
        'videoMethod': '模型选择',
        'videoPrompt': '视频提示词',
        'refImage': '参考图片',
        'size': '视频尺寸',
        'seconds': '视频时长',
        'videoPromptTips': '请输入视频编辑提示词',
        'refImageTips': '请上传参考图片文件',
        'errorTips1': 'AI 字段异常，维护中可联系开发者咨询',
        'errorTips2': '视频创建失败，请检查您的提示词或图片信息，Sora2不支持上传真人图像提示词不允许出现暴力等内容',
        'errorTips3': '令牌配置有误，请检查您的令牌是否正确，如仍有疑问可加入钉钉群咨询',
        'errorTips4': '视频生成超时，请稍后重试',

      },
      'en-US': {
        'videoMethod': 'Model selection',
        'videoPrompt': 'Video prompt',
        'refImage': 'Reference image',
        'size': 'Video size',   
        'seconds': 'Video duration',
        'errorTips1': 'Model selection is required',
        'errorTips2': 'Video creation failed, please check your prompt or image information, Sora2 does not support uploading real people images and does not allow violent content',
        'errorTips3': 'The token configuration is wrong. Please check whether your token is correct. If you still have any questions, you can join the Dingding group for consultation.',
        'errorTips4': 'Video generation timed out, please try again later',
      },
      'ja-JP': {
        'videoMethod': 'モデル選択',
        'videoPrompt': 'ビデオ提示词',
        'refImage': '参考画像',
        'size': 'ビデオサイズ',   
        'seconds': 'ビデオ时长',
        'errorTips1': 'モデル選択は必須です',
        'errorTips2': 'ビデオ作成失敗、ヒントを確認してください。Sora2は人間画像をアップロードできません。暴力などの内容を含めることはできません',
        'errorTips3': 'トークンの設定が間違っています。トークンが正しいかどうかを確認してください。まだ疑問がある場合は、DingDingグループに参加して相談してください。',
        'errorTips4': 'ビデオ生成がタイムアウトしました。後でもう一度試してください。',
      },
  },
  errorMessages: {
    // 定义错误信息集合
    'error1': t('errorTips1'),
    'error2': t('errorTips2'),
    'error3': t('errorTips3'),
    'error4': t('errorTips4'),
  },
  authorizations: 
    {
      id: 'auth_id',// 授权的id，用于context.fetch第三个参数指定使用
      platform: 'yishangcloud',// 授权平台，目前可以填写当前平台名称
      type: AuthorizationType.HeaderBearerToken, // 授权类型
      required: true,// 设置为选填，用户如果填了授权信息，请求中则会携带授权信息，否则不带授权信息
      instructionsUrl: "https://token.yishangcloud.cn/",// 帮助链接，告诉使用者如何填写这个apikey
      label: '关联账号', // 授权平台，告知用户填写哪个平台的信息
      tooltips: '请配置授权', // 提示，引导用户添加授权
      icon: { // 当前平台的图标
        light: 'https://token.yishangcloud.cn/logo1.png', 
        dark: 'https://token.yishangcloud.cn/logo1.png'
      }
    },
  // 定义AI 字段的入参
  formItems: [
    {
      key: 'videoMethod',
      label: t('videoMethod'),
      component: FormItemComponent.SingleSelect,
      props: {
        defaultValue: 'sora-2',
        placeholder: '请选择模型',
        options: [
          {
            key: 'sora-2',
            title: 'sora-2',
          }
        ]
      },
      validator: {
        required: true,
      }
    },
    {
      key: 'videoPrompt',
      label: t('videoPrompt'),
      component: FormItemComponent.Textarea,
      tooltips: {
        title:  t('videoPrompt')
      },
      props: {
       placeholder: t('videoPromptTips'),
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
        title:  t('refImageTips'),
      },
      props: {
        mode: 'single',
        supportTypes: [FieldType.Attachment],
      },
      validator: {
        required: false,
      }
    },
    {
      key: 'size',
      label: t('size'),
      component: FormItemComponent.SingleSelect,
      props: {
        defaultValue: '720x1280',
        options: [
          {
            key: '720x1280',
            title: '720x1280',
          },
          {
            key: '1280x720',
            title: '1280x720',
          },
        ]
      },
      validator: {
        required: true,
      }
    },
    {
      key: 'seconds',
      label: t('seconds'),
      component: FormItemComponent.SingleSelect,
       props: {
        defaultValue: '10',
        options: [
          {
            key: '10',
            title: '10秒',
          },
          {
            key: '15',
            title: '15秒',
          },
        ]
      },
      validator: {
        required: true,
      }
    },
  ],
  // 定义AI 字段的返回结果类型
  resultType: {
    type: FieldType.Attachment,
  },
  // formItemParams 为运行时传入的字段参数，对应字段配置里的 formItems （如引用的依赖字段）
  execute: async (context, formItemParams: any) => {
    const { videoMethod, videoPrompt, refImage, size, seconds } = formItemParams;

    /** 为方便查看日志，使用此方法替代console.log */
    const debugLog = (arg: any) => {
      // @ts-ignore
      console.log(JSON.stringify({
        timestamp: new Date().toISOString(),
        ...arg
      }));
    };

    // 定义常量
    const API_BASE_URL = 'http://token.yishangcloud.cn/v1/videos';
    const POLLING_INTERVAL = 5000; // 5秒间隔
    const MAX_POLLING_TIME = 900000; // 900秒最大等待时间

    try {
      // 构建请求参数
      const requestBody: any = {
        model: videoMethod,
        prompt: videoPrompt,
        seconds,
        size,
      };

      // 如果refImage存在且有第一个元素的tmp_url，则添加input_reference参数
      if (refImage?.[0]?.tmp_url) {
        requestBody.input_reference = [refImage[0].tmp_url];
      }

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      };

      debugLog({ requestOptions });

      // 创建视频任务
      const createTask = await context.fetch(API_BASE_URL, requestOptions, 'auth_id');
      const taskResp = await createTask.json();

      debugLog({ taskResp });

      // 检查令牌有效性
      if (taskResp.error?.message?.includes('无效的令牌')) {
        return {
          code: FieldExecuteCode.Error,
          errorMessage: 'error3'
        };
      }

      // 检查是否返回了任务id
      if (!taskResp?.id) {
        throw new Error(taskResp.error?.message || '创建视频任务失败');
      }

      // 轮询获取视频状态
      const videoDetailUrl = `${API_BASE_URL}/${taskResp.id}`;
      const detailRequestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      };

      const startTime = Date.now();
      let videoDetailResp: any;
      let pollingComplete = false;

      while (!pollingComplete && (Date.now() - startTime) < MAX_POLLING_TIME) {
        const getTaskDetail = await context.fetch(videoDetailUrl, detailRequestOptions, 'auth_id');
        videoDetailResp = await getTaskDetail.json();

        // 检查状态
        if (videoDetailResp?.status === 'failed') {
          return {
            code: FieldExecuteCode.Error,
            errorMessage: 'error2'
          };
        } else if (videoDetailResp?.status === 'completed') {
          pollingComplete = true;
          debugLog({ message: '视频生成完成' });
        } else {
          // 未完成，等待后继续轮询
          await new Promise(resolve => setTimeout(resolve, POLLING_INTERVAL));
        }
      }

      // 检查是否超时
      if (!pollingComplete) {
        debugLog({ message: '视频生成超时' });
        return {
          code: FieldExecuteCode.ConfigError,
          errorMessage: '视频生成超时，请稍后重试'
        };
      }

      // 从视频详情中提取视频URL
      const videoUrl = videoDetailResp?.video_url || '';

      return {
        code: FieldExecuteCode.Success, // 0 表示请求成功
        // data 类型需与下方 resultType 定义一致
        data: [{
          fileName: `${taskResp.id}.mp4`,
          type: 'video',
          url: videoUrl
        }]
      };

    } catch (e) {
      debugLog({ error: String(e) });

      const errorMsg = String(e);
      if (errorMsg.includes('无可用渠道')) {
        return {
          code: FieldExecuteCode.Error,
          errorMessage: 'error1'
        };
      }

      // 检查错误消息中是否包含余额耗尽的信息
      if (errorMsg.includes('令牌额度已用尽') || errorMsg.includes('quota')) {
        return {
          code: FieldExecuteCode.QuotaExhausted
        };
      }

      if (errorMsg.includes('无效的令牌')) {
        return {
          code: FieldExecuteCode.ConfigError
        };
      }

     return {
      code: FieldExecuteCode.Error,
      extra: { errorMessage: String(e) }
    };
    }
  },
});
export default fieldDecoratorKit;
