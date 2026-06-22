import { FieldType, fieldDecoratorKit, FormItemComponent, FieldExecuteCode, AuthorizationType } from 'dingtalk-docs-cool-app';

const { t } = fieldDecoratorKit;

// 视觉模型列表
const visualModels = ['glm-5v-turbo', 'glm-4.6v', 'qwen3.7-plus', 'qwen3.6-plus', 'qwen3.5-flash'];

// 支持文件的模型（智谱视觉模型）
const fileSupportModels = ['glm-5v-turbo', 'glm-4.6v'];

// 视频扩展名
const videoExtensions = ['mp4', 'mov', 'mkv', 'avi', 'webm'];

// 文件扩展名
const fileExtensions = ['pdf', 'txt', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'jsonl'];

function isVisualModel(model: string): boolean {
  return visualModels.includes(model);
}

function isFileSupportModel(model: string): boolean {
  return fileSupportModels.includes(model);
}

function isVideoUrl(url: string): boolean {
  // 去掉查询参数，获取真正的扩展名
  const urlWithoutQuery = url.split('?')[0].split('#')[0].toLowerCase();
  const ext = urlWithoutQuery.split('.').pop() || '';
  return videoExtensions.includes(ext);
}

function isFileUrl(url: string): boolean {
  // 去掉查询参数，获取真正的扩展名
  const urlWithoutQuery = url.split('?')[0].split('#')[0].toLowerCase();
  const ext = urlWithoutQuery.split('.').pop() || '';
  return fileExtensions.includes(ext);
}

function getFileType(url: string, model: string): 'video_url' | 'file_url' | 'image_url' {
  if (isVideoUrl(url)) return 'video_url';
  if (isFileUrl(url) && isFileSupportModel(model)) return 'file_url';
  return 'image_url';
}

// 域名白名单
fieldDecoratorKit.setDomainList(['token.yishangcloud.cn']);

fieldDecoratorKit.setDecorator({
  name: 'AI 对话',
  i18nMap: {
    'zh-CN': {
      'modelSelection': '模型选择',
      'inputCommand': '输入指令',
      'refAtt': '参考附件',
      'zhipu': '智谱',
      'deepseek': 'DeepSeek',
      'qwen': '千问',
      'visualTag': '(视觉)',
      'modelTips': '视觉模型支持文本、图片、视频，智谱还支持PDF等文档，可配合附件使用',
      'inputCommandTips': '请输入您的指令或问题',
      'refAttTips': '选择附件供视觉模型分析',
    },
    'en-US': {
      'modelSelection': 'Model Selection',
      'inputCommand': 'Input Command',
      'refAtt': 'Reference Attachment',
      'zhipu': 'Zhipu',
      'deepseek': 'DeepSeek',
      'qwen': 'Qwen',
      'visualTag': '(Vision)',
      'modelTips': 'Visual models support text, images, videos. Zhipu also supports PDF and other documents.',
      'inputCommandTips': 'Please enter your command or question',
      'refAttTips': 'Select attachment for visual model analysis',
    },
    'ja-JP': {
      'modelSelection': 'モデル選択',
      'inputCommand': '入力コマンド',
      'refAtt': '参考添付',
      'zhipu': 'Zhipu',
      'deepseek': 'DeepSeek',
      'qwen': 'Qwen',
      'visualTag': '(視覚)',
      'modelTips': '視覚モデルはテキスト、画像、動画をサポート。ZhipuはPDF等のドキュメントもサポート。',
      'inputCommandTips': 'コマンドまたは質問を入力してください',
      'refAttTips': '視覚モデル分析用の添付ファイルを選択',
    },
  },
  authorizations: {
    id: 'auth_id',
    platform: 'yishangcloud',
    type: AuthorizationType.HeaderBearerToken,
    required: true,
    instructionsUrl: 'https://token.yishangcloud.cn/',
    label: '关联账号',
    tooltips: '请配置授权',
    icon: {
      light: 'https://token.yishangcloud.cn/logo1.png',
      dark: 'https://token.yishangcloud.cn/logo1.png'
    }
  },
  formItems: [
    {
      key: 'modelSelection',
      label: t('modelSelection'),
      component: FormItemComponent.SingleSelect,
      props: {
        defaultValue: 'glm-5.2',
        placeholder: '请选择模型',
        options: [
          // 智谱系列
          { key: 'glm-5.2', title: t('zhipu') + ' GLM-5.2' },
          { key: 'glm-5.1', title: t('zhipu') + ' GLM-5.1' },
          { key: 'glm-5-turbo', title: t('zhipu') + ' GLM-5-turbo' },
          { key: 'glm-5v-turbo', title: t('zhipu') + ' GLM-5v-turbo' + t('visualTag') },
          { key: 'glm-4.6v', title: t('zhipu') + ' GLM-4.6v' + t('visualTag') },
          // DeepSeek系列
          { key: 'deepseek-v4-flash', title: t('deepseek') + ' V4-flash' },
          { key: 'deepseek-v4-pro', title: t('deepseek') + ' V4-pro' },
          // 千问系列
          { key: 'qwen3.7-max', title: t('qwen') + ' Qwen3.7-max' },
          { key: 'qwen3.7-plus', title: t('qwen') + ' Qwen3.7-plus' + t('visualTag') },
          { key: 'qwen3.6-plus', title: t('qwen') + ' Qwen3.6-plus' + t('visualTag') },
          { key: 'qwen3.5-flash', title: t('qwen') + ' Qwen3.5-flash' + t('visualTag') },
        ]
      },
      tooltips: {
        title: t('modelTips')
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
        title: t('inputCommandTips')
      },
      props: {
        placeholder: t('inputCommandTips'),
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
        title: t('refAttTips')
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
  resultType: {
    type: FieldType.Text
  },
  execute: async (context: any, formItemParams: any) => {
    const { modelSelection, inputCommand, refAtt } = formItemParams;

    const debugLog = (arg: any) => {
      console.log(JSON.stringify({
        timestamp: new Date().toISOString(),
        ...arg
      }));
    };

    try {
      const apiUrl = 'https://token.yishangcloud.cn/v1/chat/completions';
      const model = modelSelection;

      // 获取所有附件URL
      const fileUrls: string[] = [];
      if (refAtt && refAtt.length > 0) {
        for (const att of refAtt) {
          if (att && att.tmp_url) {
            fileUrls.push(att.tmp_url);
          }
        }
      }

      // 构建消息
      let messages: any[] = [];

      if (isVisualModel(model) && fileUrls.length > 0) {
        // 视觉模型 + 有附件：构建多模态消息（支持多附件）
        const content: any[] = [];
        for (const url of fileUrls) {
          const fileType = getFileType(url, model);
          content.push({ type: fileType, [fileType]: { url: url } });
        }
        content.push({ type: 'text', text: inputCommand });
        messages = [{
          role: 'user',
          content: content
        }];
      } else {
        messages = [{
          role: 'user',
          content: inputCommand
        }];
      }

      const requestBody = {
        model: model,
        messages: messages
      };

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      };

      debugLog({ type: 'request', requestBody });

      const response = await context.fetch(apiUrl, requestOptions, 'auth_id');
      const result: any = await response.json();

      debugLog({ type: 'response', result });

      // 检查错误
      if (result.error) {
        return {
          code: FieldExecuteCode.Success,
          data: `错误: ${result.error.message}`
        };
      }

      // 获取响应内容
      if (result.choices && result.choices.length > 0) {
        const aiResult = result.choices[0].message.content;
        return {
          code: FieldExecuteCode.Success,
          data: aiResult
        };
      }

      return {
        code: FieldExecuteCode.Success,
        data: 'AI服务异常，请稍后重试～'
      };

    } catch (e) {
      debugLog({
        type: 'exception',
        message: String(e)
      });
      return {
        code: FieldExecuteCode.Success,
        data: `执行失败: ${String(e)}`
      };
    }
  },
});

export default fieldDecoratorKit;