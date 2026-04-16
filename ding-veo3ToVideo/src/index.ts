import { FieldType, fieldDecoratorKit, FormItemComponent, FieldExecuteCode, AuthorizationType } from 'dingtalk-docs-cool-app';
const { t } = fieldDecoratorKit;

// 通过addDomainList添加请求接口的域名
fieldDecoratorKit.setDomainList(['api.exchangerate-api.com','token.yishangcloud.cn','pay.xunkecloud.cn']);

fieldDecoratorKit.setDecorator({
  name: 'AI 视频(Veo3)',
  // 定义捷径的i18n语言资源
  i18nMap: {
    'zh-CN': {
        'videoMethod': '模型选择',
        'videoPrompt': '视频提示词',
        'refImage': '参考图片',
        'size': '视频尺寸',
        'promptRema': '视频提示词',
        'errorTips1': '捷径异常，维护中可联系开发者咨询',
        'errorTips2': '令牌配置有误，请检查您的令牌是否正确，如仍有疑问可加入钉钉群咨询',
      },
      'en-US': {
        'videoMethod': 'Model selection',
        'videoPrompt': 'Video prompt',
        'refImage': 'Reference image',
        'size': 'Video size',   
        'promptRema': 'Video prompt reminder',
        'errorTips1': 'Model selection is required',
        'errorTips3': 'The token configuration is wrong. Please check whether your token is correct. If you still have any questions, you can join the Dingding group for consultation.',
     
      },
      'ja-JP': {
        'videoMethod': 'モデル選択',
        'videoPrompt': 'ビデオ提示词',
        'refImage': '参考画像',
        'size': 'ビデオサイズ',   
        'promptRema': 'ビデオ提示词の注意点',
        'errorTips1': 'モデル選択は必須です',
        'errorTips2': 'トークンの設定が間違っています。トークンが正しいかどうかを確認してください。まだ疑問がある場合は、DingDingグループに参加して相談してください。',
     
      },
  },
    errorMessages: {
    // 定义错误信息集合
    'error1': t('errorTips1'),
    'error2': t('errorTips2'),

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
  // 定义捷径的入参
  formItems: [
    {
      key: 'videoMethod',
      label: t('videoMethod'),
      component: FormItemComponent.SingleSelect,
      props: {
        defaultValue: 'veo3.1',
        placeholder: '请选择模型',
        options: [
          { key: 'veo3', title: 'veo3'},
          { key: 'veo3.1', title: 'veo3.1'},
          { key: 'veo3.1-4k', title: 'veo3.1-4k'},
          { key: 'veo3.1-pro', title: 'veo3.1-pro'},
          { key: 'veo3.1-pro-4k', title: 'veo3.1-pro-4k'},
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
        title:  t('promptRema')
      },
      props: {
        placeholder: '请输入视频编辑提示词',
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
        title:  '请上传参考图片文件'
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
      key: 'size',
      label: t('size'),
      component: FormItemComponent.SingleSelect,
      props: {
        defaultValue: '720x1280',
        placeholder: '请选择模型',
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
  ],
  // 定义捷径的返回结果类型
  resultType: {
    type: FieldType.Attachment,
  },
  // formItemParams 为运行时传入的字段参数，对应字段配置里的 formItems （如引用的依赖字段）
  execute: async (context, formItemParams: any) => {
    const { videoMethod, videoPrompt, refImage, size } = formItemParams;

     /** 为方便查看日志，使用此方法替代console.log */
    function debugLog(arg: any) {
      // @ts-ignore
      console.log(JSON.stringify({
        timestamp: new Date().toISOString(),
        ...arg
      }))
    }

    function extractTmpUrl(data) {
    // 排除 null/undefined 或空值场景
    if (data === null || typeof data === 'undefined') {
        return null;
    }

    // 如果是对象（包括数组、普通对象）
    if (typeof data === 'object') {
        // 先检查当前对象是否有 tmp_url 属性且为有效字符串
        if ('tmp_url' in data && typeof data.tmp_url === 'string' && data.tmp_url.trim()) {
            return data.tmp_url.trim();
        }

        // 遍历对象/数组的每一个元素（跳过 null 元素）
        for (const key in data) {
            if (data.hasOwnProperty(key) && data[key] !== null) {
                const result = extractTmpUrl(data[key]);
                if (result !== null) {
                    return result;
                }
            }
        }
    }

    // 非对象/没找到有效 tmp_url，返回 null
    return null;
}
    try {
     const createVideoUrl = `http://token.yishangcloud.cn/v1/videos`;
            // 构建请求参数，动态添加quality参数
            const requestBody: any = {
                model: videoMethod,
                "prompt": videoPrompt,
                seconds:"8",
                size: size,
            };
            
            
            // 如果refImage存在且有元素的tmp_url，则将所有tmp_url组成数组赋值给input_reference
          const tmpUrl = extractTmpUrl(refImage);
          if (tmpUrl) { // 仅当找到有效 tmp_url 时赋值
              requestBody.input_reference = [tmpUrl];
          }
            
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestBody)
            };

            console.log(requestOptions);
            
            
            const createTask = await context.fetch(createVideoUrl, requestOptions, 'auth_id');
            const taskResp = await createTask.json();
           
    // 检查令牌有效性
      if (taskResp.error?.message?.includes('无效的令牌')) {
        return {
          code: FieldExecuteCode.Error,
          errorMessage: 'error2'
        };
      }

           
     


      // 检查第一个接口是否返回了正确的id
      if (taskResp && taskResp.id) {
        // 调用第二个API获取视频详情 - 实现轮询逻辑
        const videoDetailUrl = `http://token.yishangcloud.cn/v1/videos/${taskResp.id}`;
        const detailRequestOptions = {
          method: 'GET',
          headers: { 
            'Content-Type': 'application/json'
          }
        };
        
        // 轮询获取视频状态
        const pollingInterval = 5000; // 5秒间隔
        const maxPollingTime = 900000; // 900秒最大等待时间
        const startTime = Date.now();
        
        let videoDetailResp;
        let pollingComplete = false;
        
        while (!pollingComplete && (Date.now() - startTime) < maxPollingTime) {
          const getTaskDetail = await context.fetch(videoDetailUrl, detailRequestOptions, 'auth_id');
          videoDetailResp = await getTaskDetail.json();
          
          
          // 检查状态是否为failed或completed
          if (videoDetailResp && videoDetailResp.status === 'failed') {
            return {
              code: FieldExecuteCode.Error,
              errorMessage: 'error2'
            };
          } else if (videoDetailResp && videoDetailResp.status === 'completed') {
            pollingComplete = true;
            debugLog('视频生成完成');
          } else {
            // 未完成，等待5秒后继续轮询
            await new Promise(resolve => setTimeout(resolve, pollingInterval));
          }
        }
        
        // 检查是否超时
        if (!pollingComplete) {
          debugLog('视频生成超时');
          return {
            code: FieldExecuteCode.Error,
            errorMessage: '视频生成超时，请稍后重试'
          };
        }

      
        
        
        
        // 从视频详情中提取视频URL
        const videoUrl = videoDetailResp && videoDetailResp.video_url ? videoDetailResp.video_url : "";

        console.log(videoUrl);
        
        
        return {
          code: FieldExecuteCode.Success, // 0 表示请求成功
          // data 类型需与下方 resultType 定义一致
          data: [{
            fileName:'video.mp4',
            type: 'video',
            url: videoUrl
          }]
        };
      } else {
         throw new Error(taskResp.error.message);
      }

     
   
    } catch (e) {
      console.log('====error', String(e));
      
       if (String(e).includes('无可用渠道')) { 
        return {
          code: FieldExecuteCode.Error, 
          errorMessage: 'error1',
        };
      }

      // 检查错误消息中是否包含余额耗尽的信息
      if (String(e).includes('令牌额度已用尽')||String(e).includes('quota')) {
        
        return {
          code: FieldExecuteCode.QuotaExhausted, 
        };
      }
       if (String(e).includes('无效的令牌')) {
        
        return {
          code: FieldExecuteCode.ConfigError, 
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
