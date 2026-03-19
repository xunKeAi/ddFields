import { FieldType, fieldDecoratorKit, FormItemComponent, FieldExecuteCode, AuthorizationType } from 'dingtalk-docs-cool-app';


const { t } = fieldDecoratorKit;

// 通过addDomainList添加请求接口的域名
fieldDecoratorKit.setDomainList(['api.exchangerate-api.com','token.yishangcloud.cn','open.feishu.cn','pay.xunkecloud.cn']);

fieldDecoratorKit.setDecorator({
  name: 'AI 图片生成(Seedream5.0)',
  // 定义AI 字段的i18n语言资源
  i18nMap: {
    'zh-CN': {
        // 'imageMethod': '模型选择',
        'imagePrompt': '提示词',
        'refImage': '参考图片',
        'aspectRatio': '图像比例',
        'errorTips1': 'AI 字段异常，维护中可联系开发者咨询', 
        'errorTips2': '令牌配置有误，请检查您的令牌是否正确，如仍有疑问可加入钉钉群咨询',
        'errorTips3': '官方任务超时，请稍后重试',
        'errorTips4': '提示词不能为空',
        'genQty': '生成数量',
        'genQtyTips': '选择产出图片数量。最多5张',

      },
      'en-US': {
        // 'imageMethod': 'Model selection',
        'imagePrompt': 'Image editing prompt',
        'refImage': 'Reference image',
        'aspectRatio': 'Aspect ratio',
        'errorTips1': 'Model selection is required',
        'errorTips2': 'The token configuration is wrong. Please check whether your token is correct. If you still have any questions, you can join the Dingding group for consultation.',
        'errorTips3': 'Official task timeout, please try again later',
        'errorTips4': 'Image editing prompt cannot be empty',
        'genQty': 'Generate quantity',
        'genQtyTips': 'Select the number of output pictures. Up to 5 sheets',
      },
      'ja-JP': {
        // 'imageMethod': 'モデル選択',
        'imagePrompt': '画像編集提示詞',
        'refImage': '参考画像',
        'aspectRatio': '画像比',
        'errorTips1': 'モデル選択は必須です',
        'errorTips2': 'トークンの設定が間違っています。トークンが正しいかどうかを確認してください。まだ疑問がある場合は、DingDingグループに参加して相談してください。',
        'errorTips3': '公式タスクのタイムアウトが発生しました。後でもう一度お試しください。',
        'errorTips4': '画像編集提示詞は空にすることはできません',
        'genQty': '生成数量',
        'genQtyTips': '生成される画像の数を選択してください。最大5枚まで',
      },
  },
    errorMessages: {
    // 定义错误信息集合
    'error2': t('errorTips2'),
    'error1': t('errorTips1'),
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
      key: 'imagePrompt',
      label: t('imagePrompt'),
      component: FormItemComponent.Textarea,
      props: {
        placeholder: '请输入图片编辑提示词',
        enableFieldReference: true,
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
        defaultValue: '2K',
        placeholder: '请选择图像比例',
        options: [
         { key:"2K", title:"2K"},
          { key:"3K", title:"3K"},
          { key:"2048X2048", title:"2K (1:1 2048X2048)"},
          { key:"2304X1728", title:"2K (4:3 2304X1728)"},
          { key:"1728X2304", title:"2K (3:4 1728X2304)"},
          { key:"2848X1600", title:"2K (16:9 2848X1600)"},
          { key:"1600X2848", title:"2K (9:16 1600X2848)"},
          { key:"2496X1664", title:"2K (3:2 2496X1664)"},
          { key:"1664X2496", title:"2K (2:3 1664X2496)"},
          { key:"3136X1344", title:"2K (21:9 3136X1344)"},
          { key:"3072X3072", title:"3K (1:1 3072X3072)"},
          { key:"3456X2592", title:"3K (4:3 3456X2592)"},
          { key:"2592X3456", title:"3K (3:4 2592X3456)"},
          { key:"4096X2304", title:"3K (16:9 4096X2304)"},
          { key:"2304X4096", title:"3K (9:16 2304X4096)"},
          { key:"2496X3744", title:"3K (2:3 2496X3744)"},
          { key:"3744X2496", title:"3K (3:2 3744X2496)"},
          { key:"4704X2016", title:"3K (21:9 4704X2016)"}
        ]
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
    },{
      key: 'genQty',
      label: t('genQty'),
      component: FormItemComponent.SingleSelect,
      props: {
        defaultValue: '1',
        placeholder: '请选择生成数量',
        options: [
          { key:"1", title:"1"},
          { key:"2", title:"2"},
          { key:"3", title:"3"},
          { key:"4", title:"4"},
          { key:"5", title:"5"},
        ]
      },
      validator: {
        required: true,
      },
      tooltips: {
        title: t('genQtyTips')
      }
    },
  ],
  // 定义AI 字段的返回结果类型
  resultType: {
    type: FieldType.Attachment,
  },
  // formItemParams 为运行时传入的字段参数，对应字段配置里的 formItems （如引用的依赖字段）
  execute: async (context: any, formItemParams: any) => {
    const {imagePrompt, refImage, aspectRatio, genQty } = formItemParams;    
        
     /** 为方便查看日志，使用此方法替代console.log */
    function debugLog(arg: any) {
      // @ts-ignore
      console.log(JSON.stringify({
        timestamp: new Date().toISOString(),
        ...arg
      }))
    }

    function extractAllTmpUrls(data) {
    // 存储所有提取到的 tmp_url
    const tmpUrlList = [];

    // 递归遍历函数
    function traverse(currentData) {
        // 跳过 null/undefined
        if (currentData === null || typeof currentData === 'undefined') {
            return;
        }

        // 如果是对象（数组/普通对象）
        if (typeof currentData === 'object') {
            // 检查当前对象是否有有效 tmp_url
            if (
                'tmp_url' in currentData && 
                typeof currentData.tmp_url === 'string' && 
                currentData.tmp_url.trim()
            ) {
                tmpUrlList.push(currentData.tmp_url.trim());
            }

            // 遍历所有子元素（跳过原型链属性）
            for (const key in currentData) {
                if (currentData.hasOwnProperty(key)) {
                    traverse(currentData[key]);
                }
            }
        }
    }

    // 开始遍历传入的数据
    traverse(data);
    // 返回去重后的数组（可选：如果需要去重则加，不需要则直接返回 tmpUrlList）
    return [...new Set(tmpUrlList)];
}
    
    try {

         if (!imagePrompt || imagePrompt.trim() === '') {        
        return {
          code: FieldExecuteCode.Error,
          errorMessage: 'error4'
        } ;
      }

      const createImageUrl = `http://token.yishangcloud.cn/v1/images/generations` 

      const jsonRequestOptions = {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            model: "doubao-seedream-5-0-260128",
            "prompt": imagePrompt,
            "image": extractAllTmpUrls(refImage),
            "response_format":"url",
            "size": aspectRatio
          })
        };
        
        console.log(jsonRequestOptions);
        
        // 根据 genQty 实现并发请求
        const requestCount = parseInt(genQty) || 1;
        const requests = [];
        
        // 定义带重试的请求函数
        async function fetchWithRetry(url, options, authId, maxRetries = 3) {
          let retries = 0;
          
          while (retries < maxRetries) {
            try {
              const taskResp = await context.fetch(url, options, authId);
              
              // 检查令牌有效性
              if (taskResp.error?.message?.includes('无效的令牌')) {
                throw new Error('无效的令牌');
              }

              if (!taskResp) {
                throw new Error('请求未能成功发送');
              }

              debugLog({'=1 图片创建接口结果': taskResp});
              
              if (!taskResp.ok) {
                const errorData = await taskResp.json().catch(() => ({}));
                console.error('API请求失败:', taskResp.status, errorData);
                
                // 检查HTTP错误响应中的无效令牌错误
                if (errorData.error && errorData.error.message ) {
                  throw new Error(errorData.error.message);
                }
                
                throw new Error(`API请求失败: ${taskResp.status} ${taskResp.statusText}`);
              }
              
              const initialResult = await taskResp.json();
              
              if (!initialResult || !initialResult.data || !Array.isArray(initialResult.data) || initialResult.data.length === 0) {
                throw new Error('API响应数据格式不正确或为空');
              }
              
              const imageUrl = initialResult.data[0].url;
              
              if (!imageUrl) {
                throw new Error('未获取到图片URL');
              }
              
              return imageUrl;
            } catch (error) {
              retries++;
              console.log(`请求失败，正在重试 (${retries}/${maxRetries}):`, error.message);
              
              if (retries >= maxRetries) {
                throw error;
              }
              
              // 等待一段时间后重试
              await new Promise(resolve => setTimeout(resolve, 1000 * retries));
            }
          }
        }
        
        for (let i = 0; i < requestCount; i++) {
          requests.push(
            fetchWithRetry(createImageUrl, jsonRequestOptions, 'auth_id')
          );
        }
        
        // 等待所有请求完成，即使部分失败
        const results = await Promise.allSettled(requests);
        
        // 过滤出成功的结果
        const imageUrls = results
          .filter(result => result.status === 'fulfilled')
          .map(result => (result as PromiseFulfilledResult<string>).value);
        
        // 检查是否有成功的结果
        if (imageUrls.length === 0) {
          throw new Error('所有图片生成请求都失败了');
        }
        
        // 构建返回数据数组
        const returnData = imageUrls.map((url, index) => ({
          fileName: `image_${index + 1}.png`,
          type: 'image',
          url: url
        }));

      return {
          code: FieldExecuteCode.Success, // 0 表示请求成功
          // data 类型需与下方 resultType 定义一致
          data: returnData
        };

      
    } catch (e) {
      console.log('====error', String(e));
      
       if (String(e).includes('无可用渠道')) { 
        return {
          code: FieldExecuteCode.Error, 
          errorMessage: 'error1',
        };
      }

      if (String(e).includes('timeout')) { 
        return {
          code: FieldExecuteCode.Error, 
          errorMessage: 'error3',
        };
      }

      // 检查错误消息中是否包含余额耗尽的信息
      if (String(e).includes('令牌额度已用尽')||String(e).includes('quota')||String(e).includes('额度')) {
        
        return {
          code: FieldExecuteCode.QuotaExhausted, 
        };
      }
       if (String(e).includes('无效的令牌')||String(e).includes('令牌')) {
        
        return {
          code: FieldExecuteCode.ConfigError, 
        };
      }
       return {
          code: FieldExecuteCode.Error, 
          errorMessage: 'error3',
        };
    }
  }
});
export default fieldDecoratorKit;
