import { FieldType, fieldDecoratorKit, FormItemComponent, FieldExecuteCode, AuthorizationType } from 'dingtalk-docs-cool-app';


const { t } = fieldDecoratorKit;

// 通过addDomainList添加请求接口的域名
fieldDecoratorKit.setDomainList(['api.exchangerate-api.com', 'token.yishangcloud.cn', 'open.feishu.cn', 'pay.xunkecloud.cn']);

fieldDecoratorKit.setDecorator({
  name: 'AI 图片生成(可灵)',
  // 定义AI 字段的i18n语言资源
  i18nMap: {
    'zh-CN': {
      'model': '模型选择',
      'prompt': '提示词',
      'refImage': '参考图片',
      'aspectRatio': '画面比例',
      'resolution': '清晰度',
      'resultType': '输出模式',
      'seriesAmount': '组图数量',
      'genQty': '生成数量',
      'errorTips1': 'AI 字段异常，维护中可联系开发者咨询',
      'errorTips2': '令牌配置有误，请检查您的令牌是否正确，如仍有疑问可加入钉钉群咨询',
      'errorTips3': '官方任务超时，请稍后重试',
      'errorTips4': '提示词不能为空',
      'errorTips5': '提示词不能超过2500个字符',
      'errorTips6': '请重新调整参数，当前参数官方不支持',
    },
    'en-US': {
      'model': 'Model selection',
      'prompt': 'Prompt',
      'refImage': 'Reference image',
      'aspectRatio': 'Aspect ratio',
      'resolution': 'Resolution',
      'resultType': 'Output mode',
      'seriesAmount': 'Series amount',
      'genQty': 'Generation quantity',
      'errorTips1': 'AI field exception, please contact the developer',
      'errorTips2': 'The token configuration is wrong. Please check whether your token is correct.',
      'errorTips3': 'Official task timeout, please try again later',
      'errorTips4': 'Prompt cannot be empty',
      'errorTips5': 'Prompt cannot exceed 2500 characters',
      'errorTips6': 'Please adjust parameters, current parameters are not supported by official',
    },
    'ja-JP': {
      'model': 'モデル選択',
      'prompt': '提示詞',
      'refImage': '参考画像',
      'aspectRatio': '画像比',
      'resolution': '解像度',
      'resultType': '出力モード',
      'seriesAmount': '組図数量',
      'genQty': '生成数量',
      'errorTips1': 'AIフィールドの例外、開発者に連絡してください',
      'errorTips2': 'トークンの設定が間違っています。トークンが正しいかどうかを確認してください。',
      'errorTips3': '公式タスクのタイムアウトが発生しました。後でもう一度お試しください。',
      'errorTips4': '提示詞は空にすることはできません',
      'errorTips5': '提示詞は2500文字を超えることはできません',
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
  // 定义AI 字段的入参
  formItems: [
    {
      key: 'model',
      label: t('model'),
      component: FormItemComponent.SingleSelect,
      props: {
        defaultValue: 'kling-v3-omni',
        placeholder: '请选择模型',
        options: [
          { key: 'kling-image-o1', title: 'kling-image-o1' },
          { key: 'kling-v3-omni', title: 'kling-v3-omni' },
        ]
      },
      validator: {
        required: true,
      }
    },
    {
      key: 'prompt',
      label: t('prompt'),
      component: FormItemComponent.Textarea,
      props: {
        placeholder: '请输入提示词',
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
        title: '请上传参考图片文件，支持 .jpg/.jpeg/.png 格式'
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
      key: 'aspectRatio',
      label: t('aspectRatio'),
      component: FormItemComponent.SingleSelect,
      props: {
        defaultValue: 'auto',
        placeholder: '请选择画面比例',
        options: [
          { key: 'auto', title: 'auto (自动)' },
          { key: '1:1', title: '1:1' },
          { key: '3:2', title: '3:2' },
          { key: '2:3', title: '2:3' },
          { key: '16:9', title: '16:9' },
          { key: '9:16', title: '9:16' },
          { key: '4:3', title: '4:3' },
          { key: '3:4', title: '3:4' },
          { key: '21:9', title: '21:9' },
        ]
      },
      validator: {
        required: false,
      }
    },
    {
      key: 'resolution',
      label: t('resolution'),
      component: FormItemComponent.SingleSelect,
      props: {
        defaultValue: '1k',
        placeholder: '请选择清晰度',
        options: [
          { key: '1k', title: '1k' },
          { key: '2k', title: '2k' },
          { key: '4k', title: '4k' },
        ]
      },
      validator: {
        required: false,
      }
    },
    {
      key: 'resultType',
      label: t('resultType'),
      component: FormItemComponent.SingleSelect,
      tooltips: {
        title: '单图：生成独立图片，可选择生成数量；组图：一次生成多张相关图片（kling-image-o1 不支持）'
      },
      props: {
        defaultValue: 'single',
        placeholder: '请选择输出模式',
        options: [
          { key: 'single', title: 'single (单图)' },
          { key: 'series', title: 'series (组图)' },
        ]
      },
      validator: {
        required: false,
      }
    },
    {
      key: 'seriesAmount',
      label: t('seriesAmount'),
      component: FormItemComponent.SingleSelect,
      tooltips: {
        title: '仅在组图模式下生效'
      },
      props: {
        defaultValue: '4',
        placeholder: '请选择组图数量',
        options: [
          { key: 'auto', title: 'auto (自动)' },
          { key: '2', title: '2' },
          { key: '3', title: '3' },
          { key: '4', title: '4' },
          { key: '5', title: '5' },
          { key: '6', title: '6' },
          { key: '7', title: '7' },
          { key: '8', title: '8' },
          { key: '9', title: '9' },
        ]
      },
      validator: {
        required: false,
      }
    },
    {
      key: 'genQty',
      label: t('genQty'),
      component: FormItemComponent.SingleSelect,
      tooltips: {
        title: '仅在单图模式下生效'
      },
      props: {
        defaultValue: '1',
        placeholder: '请选择生成数量',
        options: [
          { key: '1', title: '1' },
          { key: '2', title: '2' },
          { key: '3', title: '3' },
          { key: '4', title: '4' },
          { key: '5', title: '5' },
          { key: '6', title: '6' },
          { key: '7', title: '7' },
          { key: '8', title: '8' },
          { key: '9', title: '9' },
        ]
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
    const { model, prompt, refImage, aspectRatio, resolution, resultType, seriesAmount, genQty } = formItemParams;

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

    let imageResults: any[] = [];

    // 单次图片请求
    const fetchImage = async (): Promise<string> => {
      const createImageUrl = 'https://token.yishangcloud.cn/v1/images/generations';
      const refImageUrls = extractAllTmpUrls(refImage);

      const body: Record<string, unknown> = {
        model: model,
        prompt: prompt,
        aspect_ratio: aspectRatio,
        resolution: resolution,
        result_type: resultType,
      };

      // 添加参考图片
      if (refImageUrls.length > 0) {
        body.image = refImageUrls;
      }

      // 组图模式时添加 series_amount，单图模式时添加 n
      if (resultType === 'series') {
        body.series_amount = seriesAmount || 'auto';
      } else {
        const n = parseInt(genQty) || 1;
        body.n = n;
      }

      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      };

      debugLog({ stage: 'request', body });

      const taskResp = await context.fetch(createImageUrl, options, 'auth_id');

      // HTTP 状态异常
      if (!taskResp.ok) {
        const errData = await taskResp.json().catch(() => ({}));
        const msg = errData.error?.message || `API请求失败: ${taskResp.status}`;
        throw new Error(msg);
      }

      const result = await taskResp.json();
      debugLog({ stage: 'response', result });

      // 处理 code=1201 或 is not supported 参数不支持错误
      if (result.code === 1201 || (result.error?.message?.includes('is not supported'))) {
        throw new Error('PARAM_NOT_SUPPORTED');
      }

      // 处理返回的图片
      if (result.data && Array.isArray(result.data)) {
        result.data.forEach((item: any, index: number) => {
          if (item.url) {
            imageResults.push({
              fileName: `kling_image_${Date.now()}_${index + 1}.png`,
              type: 'image',
              url: item.url
            });
          }
        });
      }

      return result.data?.[0]?.url || '';
    };

    try {
      // 入参校验
      if (!prompt?.trim()) {
        return {
          code: FieldExecuteCode.Error,
          errorMessage: 'error4'
        };
      }

      // 提示词长度校验
      if (prompt.length > 2500) {
        return {
          code: FieldExecuteCode.Error,
          errorMessage: 'error5'
        };
      }

      // 只需请求一次，n 或 series_amount 参数控制生成数量
      const requestCount = 1;
      const requests = Array.from({ length: requestCount }, () => fetchImage());

      // 使用Promise.allSettled处理所有请求
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

      debugLog({ stage: 'complete', imageResults });

      return {
        code: FieldExecuteCode.Success,
        data: imageResults
      };
    } catch (err: any) {
      let errMsg = String(err?.message || err);
      errMsg = errMsg.replace(/\s*[Rr]equest id: .*$/, '');
      debugLog({ stage: 'error', errMsg });

      if (errMsg.includes('令牌额度已用尽') || errMsg.includes('quota') || errMsg.includes('额度')) {
        return { code: FieldExecuteCode.QuotaExhausted };
      }
      if (errMsg.includes('无效的令牌')) {
        return { code: FieldExecuteCode.AuthorizationError };
      }
      if (errMsg.includes('PARAM_NOT_SUPPORTED')) {
        return { code: FieldExecuteCode.Error, errorMessage: 'error6' };
      }

      return {
        code: FieldExecuteCode.Error,
        extra: { errorMessage: errMsg }
      };
    }
  }
});

export default fieldDecoratorKit;
