import { FieldType, fieldDecoratorKit, FormItemComponent, FieldExecuteCode, AuthorizationType } from 'dingtalk-docs-cool-app';


const { t } = fieldDecoratorKit;

// 通过addDomainList添加请求接口的域名
fieldDecoratorKit.setDomainList(['api.exchangerate-api.com','token.yishangcloud.cn','open.feishu.cn','pay.xunkecloud.cn']);

fieldDecoratorKit.setDecorator({
  name: 'AI生图（Nano）',
  // 定义AI 字段的i18n语言资源
  i18nMap: {
    'zh-CN': {
        'imageMethod': '模型选择',
        'imagePrompt': '提示词',
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
        defaultValue: 'nano-banana',
        placeholder: '请选择模型',
        options: [
          { key: 'nano-banana',title: 'nano-banana'}, 
          { key: 'nano-banana-pro',title: 'nano-banana-pro'},
          { key: 'nano-banana-pro_1k',title: 'nano-banana-pro-1k'}, 
          { key: 'nano-banana-pro_2k',title: 'nano-banana-pro-2k'}, 
          { key: 'nano-banana-pro_4k',title: 'nano-banana-pro-4k'},
          { key: 'nano-banana2-1K',title: 'nano-banana2-1K'},
          { key: 'nano-banana2-2K',title: 'nano-banana2-2K'},
          { key: 'nano-banana2-4K',title: 'nano-banana2-4K'},
        ]
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
      component: FormItemComponent.SingleSelect,
      props: {
        defaultValue: 'auto',
        placeholder: '请选择图像比例',
        options: [
          {
            key: 'auto',
            title: 'auto',
          },
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
            key: '3:2',
            title: '3:2',
          },
          {
            key: '2:3',
            title: '2:3',
          },
          {
            key: '5:4',
            title: '5:4',
          },
          {
            key: '4:5',
            title: '4:5',
          },
          {
            key: '21:9',
            title: '21:9',
          }
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
    },
    {
      key: 'picType',
      label: t('picType'),
      component: FormItemComponent.SingleSelect,
      props: {
        defaultValue: 'jpg',
        options: [
          { key: 'png',title: 'png'},
          { key: 'jpg',title: 'jpg'},
          { key: 'webp',title: 'webp'},
        ]
      },
       tooltips: {
        title:  '请选择需要输出的图片类型（4K画质强制输出为webp格式）不同格式画质有不一致，最优为PNG=webp > jpg'
      },
      validator: {
        required: true,
      }
    },
    {
      key: 'genQty',
      label: t('genQty'),
      component: FormItemComponent.SingleSelect,
      props: {
        defaultValue: '1',
        options: [
          { key: '1',title: '1'},
          { key: '2',title: '2'},
          { key: '3',title: '3'},
          { key: '4',title: '4'},
          { key: '5',title: '5'},
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
execute: async (context: any, formItemParams: any) => {
  const { imageMethod, imagePrompt, refImage, aspectRatio, genQty, picType } = formItemParams;

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
        model: imageMethod,
        prompt: imagePrompt,
        image: extractAllTmpUrls(refImage),
        response_format: 'url',
        size: aspectRatio,
        "picType": picType
      })
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
            fileName: `image.${picType}`,
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
