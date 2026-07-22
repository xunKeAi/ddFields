import { FieldType, fieldDecoratorKit, FormItemComponent, FieldExecuteCode, AuthorizationType } from 'dingtalk-docs-cool-app';


const { t } = fieldDecoratorKit;

// 通过addDomainList添加请求接口的域名
fieldDecoratorKit.setDomainList(['api.exchangerate-api.com','token.yishangcloud.cn','open.feishu.cn','pay.xunkecloud.cn']);

fieldDecoratorKit.setDecorator({
  name: 'AI生图（Nano 多图模式）',
  // 定义AI 字段的i18n语言资源
  i18nMap: {
    'zh-CN': {
        'imageMethod': '模型选择',
        'imagePromptOne': '提示词1',
        'imagePromptTwo': '提示词2',
        'imagePromptThree': '提示词3',
        'imagePromptFour': '提示词4',
        'imagePromptFive': '提示词5',
        'refImage': '参考图片',
        'aspectRatio': '图像比例',
        'errorTips1': 'AI 字段异常，维护中可联系开发者咨询', 
        'errorTips2': '令牌配置有误，请检查您的令牌是否正确，如仍有疑问可加入钉钉群咨询',
        'errorTips3': '官方超时或提示词/参考图存在违规请修改后重试',
        'errorTips4': '至少需要有一个提示词不能为空',
        'picType': '图片输出格式',


      },
      'en-US': {
        'imageMethod': 'Model selection',
        'imagePromptOne': 'Image editing prompt 1',
        'imagePromptTwo': 'Image editing prompt 2',
        'imagePromptThree': 'Image editing prompt 3',
        'imagePromptFour': 'Image editing prompt 4',
        'imagePromptFive': 'Image editing prompt 5',
        'refImage': 'Reference image',
        'aspectRatio': 'Aspect ratio',
        'errorTips1': 'Model selection is required',
        'errorTips2': 'The token configuration is wrong. Please check whether your token is correct. If you still have any questions, you can join the Dingding group for consultation.',
        'errorTips3': 'Official task timeout, please try again later',
        'errorTips4': 'At least one prompt word cannot be empty',
        'picType': 'Image output format',
      },
      'ja-JP': {
        'imageMethod': 'モデル選択',
        'imagePromptOne': '画像編集提示詞1',
        'imagePromptTwo': '画像編集提示詞2',
        'imagePromptThree': '画像編集提示詞3',
        'imagePromptFour': '画像編集提示詞4',
        'imagePromptFive': '画像編集提示詞5',
        'refImage': '参考画像',
        'aspectRatio': '画像比',
        'errorTips1': 'モデル選択は必須です',
        'errorTips2': 'トークンの設定が間違っています。トークンが正しいかどうかを確認してください。まだ疑問がある場合は、DingDingグループに参加して相談してください。',
        'errorTips3': '公式タスクのタイムアウトが発生しました。後でもう一度お試しください。',
        'errorTips4': '少なくとも1つの提示詞は空にすることはできません',
        'picType': '画像出力フォーマット',
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
      key: 'imagePromptOne',
      label: t('imagePromptOne'),
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
      key: 'imagePromptTwo',
      label: t('imagePromptTwo'),
      component: FormItemComponent.Textarea,
      props: {
        placeholder: '请输入图片编辑提示词',
        enableFieldReference: true,
      },
      validator: {
        required: false, 
      }
    },
    {
      key: 'imagePromptThree',
      label: t('imagePromptThree'),
      component: FormItemComponent.Textarea,
      props: {
        placeholder: '请输入图片编辑提示词',
        enableFieldReference: true,
      },
      validator: {
        required: false, 
      }
    },
    {
      key: 'imagePromptFour',
      label: t('imagePromptFour'),
      component: FormItemComponent.Textarea,
      props: {
        placeholder: '请输入图片编辑提示词',
        enableFieldReference: true,
      },
      validator: {
        required: false, 
      }
    },
    {
      key: 'imagePromptFive',
      label: t('imagePromptFive'),
      component: FormItemComponent.Textarea,
      props: {
        placeholder: '请输入图片编辑提示词',
        enableFieldReference: true,
      },
      validator: {
        required: false, 
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
        defaultValue: 'png',
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
  ],
  // 定义AI 字段的返回结果类型
  resultType: {
    type: FieldType.Attachment,
  },
  // formItemParams 为运行时传入的字段参数，对应字段配置里的 formItems （如引用的依赖字段）
 execute: async (context: any, formItemParams: any) => {
  const {
    imageMethod,
    refImage,
    aspectRatio,
    imagePromptOne,
    imagePromptTwo,
    imagePromptThree,
    imagePromptFour,
    imagePromptFive,
    picType
  } = formItemParams;


  console.log('formItemParams', formItemParams);
  


  // 日志工具
  const debugLog = (arg: any) => {
    console.log(JSON.stringify({
      timestamp: new Date().toISOString(),
      ...arg
    }));
  };

  // 递归提取 tmp_url
  const extractAllTmpUrls = (data: any): (string | null)[] => {
    const tmpUrlList: string[] = [];
    const traverse = (current: any) => {
      if (!current) return;
      if (Array.isArray(current)) {
        current.forEach(traverse);
        return;
      }
      if (typeof current === 'object') {
        if (current.tmp_url && typeof current.tmp_url === 'string' && current.tmp_url.trim()) {
          tmpUrlList.push(current.tmp_url.trim());
        }
        Object.values(current).forEach(traverse);
      }
    };
    traverse(data);
    const uniqueUrls = [...new Set(tmpUrlList)];
    return uniqueUrls;
  };

  // 单张图片请求
  const fetchImage = async (prompt: string): Promise<string> => {
    const createImageUrl = 'https://token.yishangcloud.cn/v1/images/generations';
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: imageMethod,
        prompt: prompt,
        image: extractAllTmpUrls(refImage),
        response_format: 'url',
        aspectRatio: aspectRatio,
        picType: picType
      })
    };

    console.log(options);
    
    const taskResp = await context.fetch(createImageUrl, options, 'auth_id');
    const bodyText = await taskResp.text().catch(() => '');
    
    let errorData: any = {};
    try { errorData = JSON.parse(bodyText); } catch {
      // 响应体可能包含多段 JSON 拼接，尝试提取第一段
      const firstJsonEnd = bodyText.indexOf('}{');
      if (firstJsonEnd !== -1) {
        try { errorData = JSON.parse(bodyText.slice(0, firstJsonEnd + 1)); } catch {}
      }
    }

    if (!taskResp.ok) {
      const errData = await taskResp.json().catch(() => ({}));
      const msg = errData.error?.message || `API请求失败: ${taskResp.status}`;
      throw new Error(msg);
    }

    const result = await taskResp.json();
    return result.data[0].url;
  };

  try {
    // 收集所有非空提示词
    const prompts = [
      imagePromptOne,
      imagePromptTwo,
      imagePromptThree,
      imagePromptFour,
      imagePromptFive
    ].filter(Boolean);

    // 入参校验
    if (prompts.length === 0) {
      return {
        code: FieldExecuteCode.Error,
        errorMessage: 'error4'
      };
    }

    // 创建请求
    const requests = prompts.map(prompt => fetchImage(prompt));
    const results = await Promise.allSettled(requests);

    // ====================== 你要的核心逻辑 完整保留 ======================
    // 过滤成功的 URL
    const successfulUrls = results
      .filter(result => result.status === 'fulfilled')
      .map(result => (result as PromiseFulfilledResult<string>).value);

    // 收集失败原因
    const failedReasons = results
      .filter(result => result.status === 'rejected')
      .map(result => (result as PromiseRejectedResult).reason?.message || String((result as PromiseRejectedResult).reason));

    // 全部失败才抛错
    if (successfulUrls.length === 0) {
      throw new Error(failedReasons[0] || '所有图片生成请求都失败了');
    }
    // ====================================================================

    // 组装返回格式
    const imageResults = successfulUrls.map(url => ({
      fileName: `image.${picType}`,
      type: 'image',
      url: url
    }));

    return {
      code: FieldExecuteCode.Success,
      data: imageResults
    };

  } catch (err: any) {
    let errMsg = String(err?.message || err);
    errMsg = errMsg.replace(/\s*[Rr]equest id: .*$/, '');

    if (errMsg.includes('令牌额度已用尽') || errMsg.includes('quota') || errMsg.includes('额度')) {
      return { code: FieldExecuteCode.QuotaExhausted };
    }
    if (errMsg.includes('无效的令牌')) {
      return { code: FieldExecuteCode.AuthorizationError };
    }
    if (errMsg.includes('gemini image generation failed') || errMsg.includes('当前分组上游负载已饱和') || errMsg.includes('request')||errMsg.includes("google gemini timeout") || errMsg.includes('官方超时')) {
      return { code: FieldExecuteCode.Error, errorMessage: 'error3' };
    }
    

    return {
      code: FieldExecuteCode.Error,
      extra: { errorMessage: errMsg }
    };
  }
}
});
export default fieldDecoratorKit;
