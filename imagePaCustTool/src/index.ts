import { FieldType, fieldDecoratorKit, FormItemComponent, FieldExecuteCode, AuthorizationType } from 'dingtalk-docs-cool-app';


const { t } = fieldDecoratorKit;

// 通过addDomainList添加请求接口的域名
fieldDecoratorKit.setDomainList(['api.exchangerate-api.com','token.yishangcloud.cn','open.feishu.cn','pay.xunkecloud.cn']);

fieldDecoratorKit.setDecorator({
  name: 'AI 图片生成(自定义比例)',
  // 定义AI 字段的i18n语言资源
  i18nMap: {
    'zh-CN': {
        'imageMethod': '生图模型',
        'imagePrompt': '提示词',
        'imageQuality': '图片质量',
        'refImage': '参考图片',
        'aspectRatio': '图像比例',
        'errorTips1': 'AI 字段异常，维护中可联系开发者咨询', 
        'errorTips2': '令牌配置有误，请检查您的令牌是否正确，如仍有疑问可加入钉钉群咨询',
        'errorTips3': '官方任务超时，请稍后重试',
        'errorTips4': '提示词不能为空',
        'picType': '图片输出格式',
        'genQty': '生成数量',

      },
      'en-US': {
        'imageMethod': 'Model selection',
        'imageQuality': 'Image quality',
        'imagePrompt': 'Image editing prompt',
        'refImage': 'Reference image',
        'aspectRatio': 'Aspect ratio',
        'errorTips1': 'Model selection is required',
        'errorTips2': 'The token configuration is wrong. Please check whether your token is correct. If you still have any questions, you can join the Dingding group for consultation.',
        'errorTips3': 'Official task timeout, please try again later',
        'errorTips4': 'Image editing prompt cannot be empty',
        'picType': 'Image output format',
        'genQty': 'Generation quantity',
      },
      'ja-JP': {
        'imageMethod': 'モデル選択',
        'imageQuality': '画像質量',
        'imagePrompt': '画像編集提示詞',
        'refImage': '参考画像',
        'aspectRatio': '画像比',
        'errorTips1': 'モデル選択は必須です',
        'errorTips2': 'トークンの設定が間違っています。トークンが正しいかどうかを確認してください。まだ疑問がある場合は、DingDingグループに参加して相談してください。',
        'errorTips3': '公式タスクのタイムアウトが発生しました。後でもう一度お試しください。',
        'errorTips4': '画像編集提示詞は空にすることはできません',
        'picType': '画像出力形式',
        'genQty': '生成数量',
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
      key: 'imageMethod',
      label: t('imageMethod'),
      component: FormItemComponent.SingleSelect,
      props: {
        defaultValue: 'nano-banana2',
        placeholder: '请选择模型',
        options: [
          { key: 'nano-banana-pro',title: 'nano-banana-pro'},
          { key: 'nano-banana2',title: 'nano-banana2'},
           { key: 'gpt-image-2',title: 'gpt-image-2'},
        ]
      },
      validator: {
        required: true,
      }
    },
    {
      key: 'imageQuality',
      label: t('imageQuality'),
      component: FormItemComponent.FieldSelect,
      props: {
        mode: 'single',
        supportTypes: [FieldType.Text, FieldType.SingleSelect],
      },
      validator: {
        required: true,
      }
    },
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
      component: FormItemComponent.FieldSelect,
      props: {
        mode: 'single',
        supportTypes: [FieldType.Text, FieldType.SingleSelect],
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
      key: 'picType',
      label: t('picType'),
      component: FormItemComponent.FieldSelect,
      props: {
        mode: 'single',
        supportTypes: [FieldType.Text, FieldType.SingleSelect],
      },
      validator: {
        required: true,
      }
    },
    {
      key: 'genQty',
      label: t('genQty'),
      component: FormItemComponent.FieldSelect,
      props: {
        mode: 'single',
        supportTypes: [FieldType.Text, FieldType.Number, FieldType.SingleSelect],
      },
      validator: {
        required: false,
      }
    },
  ],
  // 定义AI 字段的返回结果类型
  resultType: {
    type: FieldType.Attachment,
  },
  // formItemParams 为运行时传入的字段参数，对应字段配置里的 formItems （如引用的依赖字段）
execute: async (context: any, formItemParams: any) => {
  const { imageMethod, imageQuality, imagePrompt, refImage, aspectRatio, genQty, picType } = formItemParams;

  const finalImageQuality = imageQuality || '1K';
  const finalAspectRatio = aspectRatio || 'auto';
  const finalPicType = picType || 'png';

  // gpt-image-2 不需要拼 quality 后缀（1K/2K/4K 等价于无后缀）
  // nano-banana-pro 用 _ 拼接，如 nano-banana-pro_1K
  const finalModel = imageMethod === 'gpt-image-2'
    ? 'gpt-image-2'
    : imageMethod === 'nano-banana-pro'
      ? imageMethod + '_' + finalImageQuality
      : imageMethod + '-' + finalImageQuality;


  
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
    const refImageUrls = extractAllTmpUrls(refImage);
    const body: Record<string, unknown> = {
      model: finalModel,
      prompt: imagePrompt,
      size: finalAspectRatio,
      "picType": finalPicType
    };
    if (refImageUrls.length > 0) {
      body.image = refImageUrls;
    }

    
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    };

    console.log(options);
  
    const taskResp = await context.fetch(createImageUrl, options, 'auth_id');
    const bodyText = await taskResp.text().catch(() => '');
    
    // 统一从 bodyText 解析 JSON，避免重复消费响应体
    const parseBody = (text: string): any => {
      try { return JSON.parse(text); } catch {
        const firstJsonEnd = text.indexOf('}{');
        if (firstJsonEnd !== -1) {
          try { return JSON.parse(text.slice(0, firstJsonEnd + 1)); } catch {}
        }
        return {};
      }
    };

    // HTTP 状态异常
    if (!taskResp.ok) {
      const errData = parseBody(bodyText);
      const msg = errData.error?.message || `API请求失败: ${taskResp.status}`;
      throw new Error(msg);
    }
    const result = parseBody(bodyText);
    const imageUrl = result.data[0].url;

    
     imageResults.push({
            fileName: `image.${finalPicType}`,
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

    console.log(imageResults);
    
     return {
          code: FieldExecuteCode.Success, // 0 表示请求成功
          // data 类型需与下方 resultType 定义一致
          data: imageResults
        };
  } catch (err: any) {
      let errMsg = String(err?.message || err);
      
      errMsg = errMsg.replace(/\s*[Rr]equest id: .*$/, '');
      console.log(errMsg);
      
      if (errMsg.includes('令牌额度已用尽') || errMsg.includes('quota') || errMsg.includes('额度')) {
        return { code: FieldExecuteCode.QuotaExhausted };
      }
      if (errMsg.includes('gemini image generation failed') || errMsg.includes('当前分组上游负载已饱和') || errMsg.includes('request')||errMsg.includes("google gemini timeout") || errMsg.includes('官方超时')) {
      return { code: FieldExecuteCode.Error, errorMessage: 'error3' };
    }
      if (errMsg.includes('无效的令牌')) {
        return { code: FieldExecuteCode.AuthorizationError };
      }

      return {
        code: FieldExecuteCode.Error,
        extra: { errorMessage: errMsg }
      };
  }
}
});
export default fieldDecoratorKit;
