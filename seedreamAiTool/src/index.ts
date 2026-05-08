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
  const { imagePrompt, refImage, aspectRatio, genQty } = formItemParams;

  // 日志工具
  const debugLog = (arg: any) => {
    console.log(JSON.stringify({
      timestamp: new Date().toISOString(),
      ...arg
    }));
  };

  // 递归提取 tmp_url
  const extractAllTmpUrls = (data: any): string[] => {
    const tmpUrlList: string[] = [];
    const traverse = (current: any) => {
      if (!current) return;
      if (typeof current === 'object') {
        if (current.tmp_url && typeof current.tmp_url === 'string' && current.tmp_url.trim()) {
          tmpUrlList.push(current.tmp_url.trim());
        }
        Object.values(current).forEach(traverse);
      }
    };
    traverse(data);
    return [...new Set(tmpUrlList)];
  };
let imageResults = [];
  // 单张图片请求（内部出错直接抛错，让 Promise.any 捕获）
  const fetchImage = async (): Promise<string> => {
    const createImageUrl = 'https://token.yishangcloud.cn/v1/images/generations';
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'doubao-seedream-5-0-260128',
        prompt: imagePrompt,
        image: extractAllTmpUrls(refImage),
        response_format: 'url',
        size: aspectRatio,
        "picType": "png"
      })
    };

    console.log(options);
  
    const taskResp = await context.fetch(createImageUrl, options, 'auth_id');

    // HTTP 状态异常
    if (!taskResp.ok) {
      const errData = await taskResp.json().catch(() => ({}));
      const msg = errData.error?.message || `API请求失败: ${taskResp.status}`;
      throw new Error(msg);
    }
    const result = await taskResp.json();
    const imageUrl = result.data[0].url;

    
     imageResults.push({
            fileName: "image.png",
            type: 'image',
            url: imageUrl
          });    
    return result.data[0].url;
  };

  try {
    // 入参校验
    if (!imagePrompt?.trim()) {
      return {
        code: FieldExecuteCode.Error,
        errorMessage: 'error4'
      };
    }

    const requestCount = Math.max(1, parseInt(genQty) || 1);
    const requests = Array.from({ length: requestCount }, () => fetchImage());

    // 使用Promise.allSettled处理所有请求，即使有错误也继续运行
    const results = await Promise.allSettled(requests);
    

    const successfulUrls = results
      .filter(result => result.status === 'fulfilled')
      .map(result => (result as PromiseFulfilledResult<string>).value);
    
    // 收集所有失败的错误信息
    const failedReasons = results
      .filter(result => result.status === 'rejected')
      .map(result => (result as PromiseRejectedResult).reason?.message || String((result as PromiseRejectedResult).reason));
    
    // 如果没有成功的结果，抛出错误
    if (successfulUrls.length === 0) {
      throw new Error(failedReasons[0] || '所有图片生成请求都失败了');
    }
    
     return {
          code: FieldExecuteCode.Success, // 0 表示请求成功
          // data 类型需与下方 resultType 定义一致
          data: imageResults
        };
  } catch (err: any) {
  // 先转成字符串！！！
  let errMsg = String(err?.message || err);
  errMsg = errMsg.replace(/\s*[Rr]equest id: .*$/, '');
  if (errMsg.includes('令牌额度已用尽') || errMsg.includes('quota') || errMsg.includes('额度')) {
    return { code: FieldExecuteCode.QuotaExhausted };
  }
  if (errMsg.includes('无效的令牌')) {
     return { code: FieldExecuteCode.AuthorizationError };
  }
   if (errMsg.includes('当前分组上游负载已饱和，请稍后再试')) {
        return {
          code: FieldExecuteCode.Error,
          errorMessage: 'error4'
        };
      }

  return {
    code: FieldExecuteCode.Error,
    extra: { errorMessage: errMsg }
  };
  }
}

});
export default fieldDecoratorKit;
