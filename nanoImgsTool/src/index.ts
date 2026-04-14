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
        'errorTips3': '官方任务超时，请稍后重试',
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
    const { imageMethod, imagePrompt, refImage, aspectRatio ,imagePromptOne,imagePromptTwo,imagePromptThree,imagePromptFour,imagePromptFive,picType} = formItemParams;    
        
     /** 为方便查看日志，使用此方法替代console.log */
    function debugLog(arg: any) {
      // @ts-ignore
      console.log(JSON.stringify({
        timestamp: new Date().toISOString(),
        ...arg
      }))
    }

    function extractAllTmpUrls(data: any) {
    // 存储所有提取到的 tmp_url
    const tmpUrlList: string[] = [];

    // 递归遍历函数
    function traverse(currentData: any) {
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

      const createImageUrl = `http://token.yishangcloud.cn/v1/images/generations` 
      
      // 收集所有非空的提示词
      const prompts = [];
      if (imagePrompt) prompts.push(imagePrompt);
      if (imagePromptOne) prompts.push(imagePromptOne);
      if (imagePromptTwo) prompts.push(imagePromptTwo);
      if (imagePromptThree) prompts.push(imagePromptThree);
      if (imagePromptFour) prompts.push(imagePromptFour);
      if (imagePromptFive) prompts.push(imagePromptFive);
      
      // 如果没有提示词，抛出错误
      if (prompts.length === 0) {
         return {
          code: FieldExecuteCode.Error,
          errorMessage: 'error4'
        } ;
      }
      
      
      // 为每个提示词创建请求选项
      const requestOptionsList = prompts.map((prompt) => {
        return {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            model: imageMethod,
            "prompt": prompt,
            "image": extractAllTmpUrls(refImage),
            "response_format":"url",
            "aspectRatio": aspectRatio,
             "picType": picType
          })
        };
      });
      
      
      // 创建超时Promise
      const timeoutPromise = new Promise<{ timeout: boolean }>((resolve) => {
        setTimeout(() => resolve({ timeout: true }), 850000); // 850秒
      });

      // 为每个请求添加超时处理
      const requestPromises = requestOptionsList.map(options => {
        return context.fetch(createImageUrl, options, 'auth_id');
      });

      // 使用Promise.race实现全局超时
      let responses: any[] = [];
      let isTimeout = false;

      try {
        // 等待所有请求完成或超时
        const raceResult = await Promise.race([
          Promise.all(requestPromises),
          timeoutPromise
        ]);

        // 检查是否是超时结果
        if (typeof raceResult === 'object' && raceResult !== null && 'timeout' in raceResult) {
          isTimeout = true;
          // 超时后，收集已完成的请求结果
          // 这里需要处理，因为Promise.all会全部失败如果有超时
          // 所以我们需要修改策略，使用Promise.allSettled
          const settledResults = await Promise.allSettled(requestPromises);
          responses = settledResults.map(result => {
            if (result.status === 'fulfilled') {
              return result.value;
            }
            return null; // 标记失败的请求
          });
        } else {
          // 类型断言，确保TypeScript知道这是一个数组
          responses = raceResult as any[];
        }
      } catch (error) {
        console.error('请求过程中发生错误:', error);
        // 发生错误时，尝试收集已完成的请求
        const settledResults = await Promise.allSettled(requestPromises);
        responses = settledResults.map(result => {
          if (result.status === 'fulfilled') {
            return result.value;
          }
          return null; // 标记失败的请求
        });
      }
      
      // 检查令牌有效性
      for (const resp of responses) {
        if (resp && resp.error?.message?.includes('无效的令牌')) {
          return {
            code: FieldExecuteCode.Error,
            errorMessage: 'error2'
          };
        }
      }

      // 处理所有响应
      const imageResults = [];
      let hasErrors = false;
      
      for (let i = 0; i < responses.length; i++) {
        try {
          const taskResp = responses[i];
          
          if (!taskResp) {
            console.error(`第${i+1}个请求未能成功发送或超时`);
            hasErrors = true;
            continue;
          }

          debugLog({[`=1 图片创建接口结果 ${i+1}`]: taskResp});
          
          if (!taskResp.ok) {
            const errorData = await taskResp.json().catch(() => ({}));
            console.error(`第${i+1}个API请求失败:`, taskResp.status, errorData);
            hasErrors = true;
            continue;
          }
          
          const initialResult = await taskResp.json();
          
          if (!initialResult || !initialResult.data || !Array.isArray(initialResult.data) || initialResult.data.length === 0) {
            console.error(`第${i+1}个API响应数据格式不正确或为空`);
            hasErrors = true;
            continue;
          }
          console.log(`第${i+1}个请求的initialResult:`, initialResult);
          
          const imageUrl = initialResult.data[0].url;
          console.log(`第${i+1}个请求的imageUrl:`, imageUrl);
          
          if (!imageUrl) {
            console.error(`第${i+1}个请求未获取到图片URL`);
            hasErrors = true;
            continue;
          }

          const fileName =`image.${picType}`;
          
          // 添加到结果列表
          imageResults.push({
            fileName: fileName,
            type: 'image',
            url: imageUrl
          });
        } catch (error) {
          console.error(`处理第${i+1}个请求时出错:`, error);
          hasErrors = true;
        }
      }

      // 打印超时信息
      if (isTimeout) {
        console.log('请求超时，返回已完成的结果');
      }
      
      // 如果所有请求都失败了，才抛出错误
      if (imageResults.length === 0 && hasErrors) {
        throw new Error('所有图片请求都失败了');
      }
      
      return {
          code: FieldExecuteCode.Success, // 0 表示请求成功
          // data 类型需与下方 resultType 定义一致
          data: imageResults
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
