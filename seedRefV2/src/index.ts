import { FieldType, fieldDecoratorKit, FormItemComponent, FieldExecuteCode, AuthorizationType } from 'dingtalk-docs-cool-app';
const { t } = fieldDecoratorKit;

// 通过addDomainList添加请求接口的域名
fieldDecoratorKit.setDomainList(['api.exchangerate-api.com','token.yishangcloud.cn','pay.xunkecloud.cn','open.feishu.cn']);

fieldDecoratorKit.setDecorator({
  name: 'AI 视频生成（Seedance 2.0&Fast）',
  // 定义AI 字段的i18n语言资源
  i18nMap: {
    'zh-CN': {
        'videoMethod': '模型选择',
        'videoPrompt': '视频提示词',
        'refImage': '参考图片',
        'refVideo': '参考视频',
        'refVideoTips': '单个视频时长 [2, 15] s，最多传入 3 个参考视频，所有视频总时长不超过 15s',
        'refAudio': '参考音频',
        'refAudioTips': '单个音频时长 [2, 15] s，最多传入 3 段参考音频，所有音频总时长不超过 15 s',
        'videoResolution': '视频分辨率',
        'size': '视频尺寸',
        'seconds': '视频时长',
        'sizeTips': '视频尺寸为视频尺寸设置生成视频的宽高比例，可按横屏、竖屏或方形画幅选择adaptive则根据参考图自动选择最合适的宽高比',
        'videoPromptTips': '请输入视频编辑提示词',
        'refImageTips': '图片生成视频时最多支持提供1至9张参考图，支持 JPG、PNG、 WEBP、BMP、TIFF、GIF，单文件建议小于10MB',
        'errorTips1': 'AI 字段异常，维护中可联系开发者咨询',
        'errorTips2': '视频创建失败，请检查您的提示词或图片信息提示词不允许出现暴力等内容',
        'errorTips3': '令牌配置有误，请检查您的令牌是否正确，如仍有疑问可加入钉钉群咨询',
        'errorTips4': '视频生成超时，请稍后重试',

      },
      'en-US': {
        'videoMethod': 'Model selection',
        'videoPrompt': 'Video prompt',
        'videoResolution': 'Video resolution',
        'refImage': 'Reference image',
        'refVideo': 'Reference video',
        'refAudio': 'Reference audio',
        'refVideoTips': 'Single video duration [2, 15] s, up to 3 reference videos, total duration does not exceed 15s',
        'refAudioTips': 'Single audio duration [2, 15] s, up to 3 reference audio segments, total duration does not exceed 15 s',
        'size': 'Video size',   
        'seconds': 'Video duration',
        'errorTips1': 'Model selection is required',
        'errorTips2': 'Video creation failed, please check your prompt or image information, prompt cannot contain violent content',
        'errorTips3': 'The token configuration is wrong. Please check whether your token is correct. If you still have any questions, you can join the Dingding group for consultation.',
        'errorTips4': 'Video generation timed out, please try again later',
      },
      'ja-JP': {
        'videoMethod': 'モデル選択',
        'videoPrompt': 'ビデオ提示词',
        'refImage': '参考画像',
        'refVideo': '参考ビデオ',
        'refAudio': '参考オーディオ',
        'refVideoTips': '单个ビデオ时长 [2, 15] s, 最多传入 3 个参考ビデオ，所有ビデオ总时长不超过 15s',
        'refAudioTips': '单个オーディオ时长 [2, 15] s, 最多传入 3 段参考オーディオ，所有オーディオ总时长不超过 15 s',
        'videoResolution': 'ビデオ解像度',
        'size': 'ビデオサイズ',   
        'seconds': 'ビデオ时长',
        'errorTips1': 'モデル選択は必須です',
        'errorTips2': 'ビデオ作成失敗、ヒントを確認してください。暴力などの内容を含めることはできません',
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
        defaultValue: 'doubao-seedance-2-0',
        placeholder: '请选择模型',
        options: [
          {
            key: 'doubao-seedance-2-0',
            title: 'Seedance Pro 2.0',
          },
          {
            key: 'doubao-seedance-2-0-fast',
            title: 'Seedance Pro 2.0 Fast',
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
        mode: 'multiple',
        supportTypes: [FieldType.Attachment],
      },
      validator: {
        required: false,
      }
    },{
      key: 'refVideo',
      label: t('refVideo'),
      component: FormItemComponent.FieldSelect,
      tooltips: {
        title:  t('refVideoTips'),
      },
      props: {
        mode: 'multiple',
        supportTypes: [FieldType.Attachment],
      },
      validator: {
        required: false,
      }
    },{
      key: 'refAudio',
      label: t('refAudio'),
      component: FormItemComponent.FieldSelect,
      tooltips: {
        title:  t('refAudioTips'),
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
      key: 'videoResolution',
      label: t('videoResolution'),
      component: FormItemComponent.SingleSelect,
      props: {
        defaultValue: '720p',
        options: [
          { key: '720p',title: '720p'},
          { key: '480p',title: '480p'},
        ]
      },
      validator: {
        required: true,
      }
    },
    
    {
      key: 'size',
      label: t('size'),
      component: FormItemComponent.SingleSelect,
      props: {
        defaultValue: 'adaptive',
        options: [
          { key: 'adaptive', title: 'adaptive' },
          {
            key: '1:1',
            title: '1:1',
          }, {
            key: '16:9',
            title: '16:9',
          }, {
            key: '9:16',
            title: '9:16',
          },
          {
            key: '4:3',
            title: '4:3',
          },
          {
            key: '3:4',
            title: '3:4',
          },
          {
            key: '21:9',
            title: '21:9',
          }
        ]
      },
       tooltips: {
        title:  t('sizeTips'),
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
          { key: '4', title: '4s'},
          { key: '5', title: '5s'},
          { key: '6', title: '6s'},
          { key: '7', title: '7s'},
          { key: '8', title: '8s'},
          { key: '9', title: '9s'},
          { key: '10', title: '10s'},
          { key: '11', title: '11s'},
          { key: '12', title: '12s'},
          { key: '13', title: '13s'},
          { key: '14', title: '14s'},
          { key: '15', title: '15s'},
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
    const { videoMethod, videoPrompt, refImage, refVideo, refAudio, size, seconds, videoResolution } = formItemParams;

    /** 为方便查看日志，使用此方法替代console.log */
    const debugLog = (arg: any) => {
      // @ts-ignore
      console.log(JSON.stringify({
        timestamp: new Date().toISOString(),
        ...arg
      }));
    };


    // 定义常量
    const API_BASE_URL = 'https://token.yishangcloud.cn/v1/videos';
    const POLLING_INTERVAL = 5000; // 5秒间隔
    const MAX_POLLING_TIME = 900000; // 900秒最大等待时间

    try {

      
      // 构建请求参数
      let modelName = `${videoMethod}_${videoResolution}_${seconds}s`;
      if (videoMethod === 'doubao-seedance-2-0') {
        modelName = `${videoMethod}-${videoResolution}_${seconds}s`;
      }
      
      const requestBody: any = {
        model: modelName,
        prompt: videoPrompt,
        metadata:{
          ratio: size,
          duration: Number(seconds),
          resolution: videoResolution,
        }
      };

      console.log(requestBody);
      

      // 收集附件URL的通用函数
      const collectAttachmentUrls = (attachments: any, maxCount: number): string[] => {
        const urls: string[] = [];
        if (attachments && Array.isArray(attachments)) {
          for (const subArray of attachments) {
            if (subArray && Array.isArray(subArray)) {
              for (const item of subArray) {
                if (item?.tmp_url) {
                  // 移除 tmp_url 中的空格和反引号
                  const cleanUrl = item.tmp_url.trim().replace(/^`|`$/g, '');
                  urls.push(cleanUrl);
                  // 达到最大数量时停止
                  if (urls.length >= maxCount) {
                    return urls;
                  }
                }
              }
            }
          }
        }
        return urls;
      };

      // 收集各种附件URL
      const imageUrls = collectAttachmentUrls(refImage, 9);
      const videoUrls = collectAttachmentUrls(refVideo, 3);
      const audioUrls = collectAttachmentUrls(refAudio, 3);

      // 添加到请求体
      if (imageUrls.length > 0) {
        requestBody.images = imageUrls;
      }
      if (videoUrls.length > 0) {
        requestBody.videos = videoUrls;
      }
      if (audioUrls.length > 0) {
        requestBody.audios = audioUrls;
      }

      
      // 收集所有参考图片的 tmp_url 到数组中
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      };
      console.log(requestOptions);
      

      // 创建视频任务
      const createTask = await context.fetch(API_BASE_URL, requestOptions, 'auth_id');
      const taskResp = await createTask.json();


      // 检查是否返回了任务id
      if (!taskResp?.id) {
        console.log(taskResp);
        if (taskResp?.error) {
          throw new Error(taskResp.error.message || '创建视频任务失败');
        }else{
          let msg = taskResp.message;
          try { msg = JSON.parse(msg).message; } catch {}
          msg = msg.replace(/\s*Request id:.*/i, '').trim();
          throw new Error(msg || '创建视频任务失败');
        }
        
        
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
        } else if (videoDetailResp?.status === 'completed' || videoDetailResp?.status === 'succeeded') {
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
      console.log(videoUrl);
      

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
        extra: { errorMessage: errorMsg }
      };
    }
  },
});
export default fieldDecoratorKit;