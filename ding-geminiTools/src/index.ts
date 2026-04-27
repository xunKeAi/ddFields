import { FieldType, fieldDecoratorKit, FormItemComponent, FieldExecuteCode,AuthorizationType } from 'dingtalk-docs-cool-app';
const { t } = fieldDecoratorKit;

// 通过addDomainList添加请求接口的域名
fieldDecoratorKit.setDomainList(['api.exchangerate-api.com','token.yishangcloud.cn','open.feishu.cn','pay.xunkecloud.cn','api.xunkecloud.cn']);

fieldDecoratorKit.setDecorator({
   name: 'AI 对话(GPT)',
  // 定义AI 字段的i18n语言资源
  i18nMap: {
    'zh-CN': {
        'modelSelection': '选择模型',
        'inputCommand': '输入指令',
        'outputResult': '输出结果',
        'errorTips1': '令牌配置有误，请检查您的令牌是否正确，如仍有疑问可加入钉钉群咨询',
        'inputCommandTips': '请输入您的指令',
        'refAtt': '参考附件',

      },
      'en-US': {
        'modelSelection': 'Model selection',
        'inputCommand': 'Input command',
        'outputResult': 'Output result',
        'errorTips1': 'The token configuration is wrong. Please check whether your token is correct. If you still have any questions, you can join the Dingding group for consultation.',
        'inputCommandTips': 'Please enter your command.',
        'refAtt': 'Reference attachment',
      },
      'ja-JP': {
        'modelSelection': 'モデル選択',
        'inputCommand': '入力コマンド',
        'outputResult': '出力結果',
        'errorTips1': 'トークンの設定が間違っています。トークンが正しいかどうかを確認してください。まだ疑問がある場合は、DingDingグループに参加して相談してください。',
        'inputCommandTips': '入力コマンドを入力してください。',
        'refAtt': '参考添付',
      },
  },
   errorMessages: {
    // 定义错误信息集合
    'error1': t('errorTips1'),

  },
 authorizations: 
    {
      id: 'auth_id',// 授权的id，用于context.fetch第三个参数指定使用
      platform: 'yishangcloud',// 授权平台，目前可以填写当前平台名称
      type: AuthorizationType.HeaderBearerToken, // 授权类型
      required: true,// 设置为选填，用户如果填了授权信息，请求中则会携带授权信息，否则不带授权信息
      instructionsUrl: "http://token.yishangcloud.cn/",// 帮助链接，告诉使用者如何填写这个apikey
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
      key: 'modelSelection',
      label: t('modelSelection'),
      component: FormItemComponent.SingleSelect,
      props: {
        defaultValue: 'gemini-3.1-pro-preview',
        placeholder: '请选择模型',
        options: [
          { key: 'gemini-3.1-pro-preview',title: 'gemini-3.1-pro-preview',},
          { key: 'gemini-3-pro-preview', title: 'gemini-3-pro-preview',},
          { key: 'gemini-2.5-pro',title: 'gemini-2.5-pro',},
        ]
      },
      validator: {
        required: true,
      }
    },
     {
      key: 'inputCommand',
      label: t('inputCommand'),
      component: FormItemComponent.Textarea,
      tooltips: {
        title:  t('inputCommandTips')
      },
      props: {
       placeholder: t('inputCommandTipsTips'),
        enableFieldReference: true,
      },
      validator: {
        required: true,
      }
    },
     {
      key: 'refAtt',
      label: t('refAtt'),
      component: FormItemComponent.FieldSelect,
      tooltips: {
        title:  t('refAttTips')
      },
       props: {
        mode: 'single',
        supportTypes: [FieldType.Attachment],
      },
      validator: {
        required: false,
      }
    },
  ],
  // 定义AI 字段的返回结果类型
 resultType: {
    type: FieldType.Text
  },
  // formItemParams 为运行时传入的字段参数，对应字段配置里的 formItems （如引用的依赖字段）
  execute: async (context: any, formItemParams: any) => {
    const { modelSelection, inputCommand, refAtt } = formItemParams;

    // 调试日志函数
    const debugLog = (arg: any) => {
      console.log(JSON.stringify({
        timestamp: new Date().toISOString(),
        ...arg
      }));
    };

    try {

      const apiUrl = `http://token.yishangcloud.cn/v1/chat/completions`;
      const fileUrl = refAtt?.[0]?.tmp_url || '';

      // 构建请求消息
      const messages = [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: inputCommand
            },
            // 添加附件URL（如果存在）
            ...(fileUrl ? [
              {
                type: 'file_url',
                file_url: {
                  url: fileUrl
                }
              }
            ] : [])
          ]
        }
      ];

      // 构建请求配置
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: modelSelection,
          messages
        })
      };

      console.log(requestOptions);
      
      // 发送API请求
      const taskResp = await context.fetch(apiUrl, requestOptions, 'auth_id');
      const initialResult = await taskResp.json();

      console.log(initialResult);
      

      // 检查是否有错误
      if (initialResult.error) {
        debugLog({
          type: 'error',
          message: initialResult.error.message,
          code: initialResult.error.code,
          errorType: initialResult.error.type
        });

        // 检查令牌有效性
        if (initialResult.error.message?.includes('无效的令牌')) {
          return {
            code: FieldExecuteCode.Error,
            errorMessage: '无效的令牌'
          };
        }

        return {
          code: FieldExecuteCode.Success,
          data: `错误: ${initialResult.error.message}`
        };
      }

      // 检查响应结构
      if (!initialResult.choices?.[0]?.message?.content) {
        return {
          code: FieldExecuteCode.Error,
          errorMessage: 'API响应格式错误'
        };
      }

      const aiResult = String(initialResult.choices[0].message.content);
      return {
        code: FieldExecuteCode.Success,
        data: aiResult
      };

    } catch (e) {
      debugLog({
        type: 'exception',
        message: String(e)
      });
      return {
        code: FieldExecuteCode.Error,
        errorMessage: `执行失败: ${String(e)}`
      };
    }
  },
});
export default fieldDecoratorKit;
