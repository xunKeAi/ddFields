"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _dingtalkDocsCoolApp = require("dingtalk-docs-cool-app");
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var t = _dingtalkDocsCoolApp.fieldDecoratorKit.t;

// 通过addDomainList添加请求接口的域名
_dingtalkDocsCoolApp.fieldDecoratorKit.setDomainList(['api.exchangerate-api.com', 'token.yishangcloud.cn', 'pay.xunkecloud.cn']);
_dingtalkDocsCoolApp.fieldDecoratorKit.setDecorator({
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
      'errorTips2': '令牌配置有误，请检查您的令牌是否正确，如仍有疑问可加入钉钉群咨询'
    },
    'en-US': {
      'videoMethod': 'Model selection',
      'videoPrompt': 'Video prompt',
      'refImage': 'Reference image',
      'size': 'Video size',
      'promptRema': 'Video prompt reminder',
      'errorTips1': 'Model selection is required',
      'errorTips3': 'The token configuration is wrong. Please check whether your token is correct. If you still have any questions, you can join the Dingding group for consultation.'
    },
    'ja-JP': {
      'videoMethod': 'モデル選択',
      'videoPrompt': 'ビデオ提示词',
      'refImage': '参考画像',
      'size': 'ビデオサイズ',
      'promptRema': 'ビデオ提示词の注意点',
      'errorTips1': 'モデル選択は必須です',
      'errorTips2': 'トークンの設定が間違っています。トークンが正しいかどうかを確認してください。まだ疑問がある場合は、DingDingグループに参加して相談してください。'
    }
  },
  errorMessages: {
    // 定义错误信息集合
    'error1': t('errorTips1'),
    'error2': t('errorTips2')
  },
  authorizations: {
    id: 'auth_id',
    // 授权的id，用于context.fetch第三个参数指定使用
    platform: 'yishangcloud',
    // 授权平台，目前可以填写当前平台名称
    type: _dingtalkDocsCoolApp.AuthorizationType.HeaderBearerToken,
    // 授权类型
    required: true,
    // 设置为选填，用户如果填了授权信息，请求中则会携带授权信息，否则不带授权信息
    instructionsUrl: "https://token.yishangcloud.cn/",
    // 帮助链接，告诉使用者如何填写这个apikey
    label: '关联账号',
    // 授权平台，告知用户填写哪个平台的信息
    tooltips: '请配置授权',
    // 提示，引导用户添加授权
    icon: {
      // 当前平台的图标
      light: 'https://token.yishangcloud.cn/logo1.png',
      dark: 'https://token.yishangcloud.cn/logo1.png'
    }
  },
  // 定义捷径的入参
  formItems: [{
    key: 'videoMethod',
    label: t('videoMethod'),
    component: _dingtalkDocsCoolApp.FormItemComponent.SingleSelect,
    props: {
      defaultValue: 'veo3.1',
      placeholder: '请选择模型',
      options: [{
        key: 'veo3',
        title: 'veo3'
      }, {
        key: 'veo3.1',
        title: 'veo3.1'
      }, {
        key: 'veo3.1-4k',
        title: 'veo3.1-4k'
      }, {
        key: 'veo3.1-pro',
        title: 'veo3.1-pro'
      }, {
        key: 'veo3.1-pro-4k',
        title: 'veo3.1-pro-4k'
      }]
    },
    validator: {
      required: true
    }
  }, {
    key: 'videoPrompt',
    label: t('videoPrompt'),
    component: _dingtalkDocsCoolApp.FormItemComponent.Textarea,
    tooltips: {
      title: t('promptRema')
    },
    props: {
      placeholder: '请输入视频编辑提示词',
      enableFieldReference: true
    },
    validator: {
      required: true
    }
  }, {
    key: 'refImage',
    label: t('refImage'),
    component: _dingtalkDocsCoolApp.FormItemComponent.FieldSelect,
    tooltips: {
      title: '请上传参考图片文件'
    },
    props: {
      mode: 'multiple',
      supportTypes: [_dingtalkDocsCoolApp.FieldType.Attachment]
    },
    validator: {
      required: false
    }
  }, {
    key: 'size',
    label: t('size'),
    component: _dingtalkDocsCoolApp.FormItemComponent.SingleSelect,
    props: {
      defaultValue: '720x1280',
      placeholder: '请选择模型',
      options: [{
        key: '720x1280',
        title: '720x1280'
      }, {
        key: '1280x720',
        title: '1280x720'
      }]
    },
    validator: {
      required: true
    }
  }],
  // 定义捷径的返回结果类型
  resultType: {
    type: _dingtalkDocsCoolApp.FieldType.Attachment
  },
  // formItemParams 为运行时传入的字段参数，对应字段配置里的 formItems （如引用的依赖字段）
  execute: function () {
    var _execute = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(context, formItemParams) {
      var videoMethod, videoPrompt, refImage, size, debugLog, extractTmpUrl, _taskResp$error, createVideoUrl, requestBody, tmpUrl, requestOptions, createTask, taskResp, videoDetailUrl, detailRequestOptions, pollingInterval, maxPollingTime, startTime, videoDetailResp, pollingComplete, getTaskDetail, videoUrl, _t;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            extractTmpUrl = function _extractTmpUrl(data) {
              // 排除 null/undefined 或空值场景
              if (data === null || typeof data === 'undefined') {
                return null;
              }

              // 如果是对象（包括数组、普通对象）
              if (_typeof(data) === 'object') {
                // 先检查当前对象是否有 tmp_url 属性且为有效字符串
                if ('tmp_url' in data && typeof data.tmp_url === 'string' && data.tmp_url.trim()) {
                  return data.tmp_url.trim();
                }

                // 遍历对象/数组的每一个元素（跳过 null 元素）
                for (var key in data) {
                  if (data.hasOwnProperty(key) && data[key] !== null) {
                    var result = extractTmpUrl(data[key]);
                    if (result !== null) {
                      return result;
                    }
                  }
                }
              }

              // 非对象/没找到有效 tmp_url，返回 null
              return null;
            };
            debugLog = function _debugLog(arg) {
              // @ts-ignore
              console.log(JSON.stringify(_objectSpread({
                timestamp: new Date().toISOString()
              }, arg)));
            };
            videoMethod = formItemParams.videoMethod, videoPrompt = formItemParams.videoPrompt, refImage = formItemParams.refImage, size = formItemParams.size;
            /** 为方便查看日志，使用此方法替代console.log */
            _context.p = 1;
            createVideoUrl = "http://token.yishangcloud.cn/v1/videos"; // 构建请求参数，动态添加quality参数
            requestBody = {
              model: videoMethod,
              "prompt": videoPrompt,
              seconds: "8",
              size: size
            }; // 如果refImage存在且有元素的tmp_url，则将所有tmp_url组成数组赋值给input_reference
            tmpUrl = extractTmpUrl(refImage);
            if (tmpUrl) {
              // 仅当找到有效 tmp_url 时赋值
              requestBody.input_reference = [tmpUrl];
            }
            requestOptions = {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(requestBody)
            };
            console.log(requestOptions);
            _context.n = 2;
            return context.fetch(createVideoUrl, requestOptions, 'auth_id');
          case 2:
            createTask = _context.v;
            _context.n = 3;
            return createTask.json();
          case 3:
            taskResp = _context.v;
            if (!((_taskResp$error = taskResp.error) !== null && _taskResp$error !== void 0 && (_taskResp$error = _taskResp$error.message) !== null && _taskResp$error !== void 0 && _taskResp$error.includes('无效的令牌'))) {
              _context.n = 4;
              break;
            }
            return _context.a(2, {
              code: _dingtalkDocsCoolApp.FieldExecuteCode.Error,
              errorMessage: 'error2'
            });
          case 4:
            if (!(taskResp && taskResp.id)) {
              _context.n = 13;
              break;
            }
            // 调用第二个API获取视频详情 - 实现轮询逻辑
            videoDetailUrl = "http://token.yishangcloud.cn/v1/videos/".concat(taskResp.id);
            detailRequestOptions = {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json'
              }
            }; // 轮询获取视频状态
            pollingInterval = 5000; // 5秒间隔
            maxPollingTime = 900000; // 900秒最大等待时间
            startTime = Date.now();
            pollingComplete = false;
          case 5:
            if (!(!pollingComplete && Date.now() - startTime < maxPollingTime)) {
              _context.n = 11;
              break;
            }
            _context.n = 6;
            return context.fetch(videoDetailUrl, detailRequestOptions, 'auth_id');
          case 6:
            getTaskDetail = _context.v;
            _context.n = 7;
            return getTaskDetail.json();
          case 7:
            videoDetailResp = _context.v;
            if (!(videoDetailResp && videoDetailResp.status === 'failed')) {
              _context.n = 8;
              break;
            }
            return _context.a(2, {
              code: _dingtalkDocsCoolApp.FieldExecuteCode.Error,
              errorMessage: 'error2'
            });
          case 8:
            if (!(videoDetailResp && videoDetailResp.status === 'completed')) {
              _context.n = 9;
              break;
            }
            pollingComplete = true;
            debugLog('视频生成完成');
            _context.n = 10;
            break;
          case 9:
            _context.n = 10;
            return new Promise(function (resolve) {
              return setTimeout(resolve, pollingInterval);
            });
          case 10:
            _context.n = 5;
            break;
          case 11:
            if (pollingComplete) {
              _context.n = 12;
              break;
            }
            debugLog('视频生成超时');
            return _context.a(2, {
              code: _dingtalkDocsCoolApp.FieldExecuteCode.Error,
              errorMessage: '视频生成超时，请稍后重试'
            });
          case 12:
            // 从视频详情中提取视频URL
            videoUrl = videoDetailResp && videoDetailResp.video_url ? videoDetailResp.video_url : "";
            console.log(videoUrl);
            return _context.a(2, {
              code: _dingtalkDocsCoolApp.FieldExecuteCode.Success,
              // 0 表示请求成功
              // data 类型需与下方 resultType 定义一致
              data: [{
                fileName: 'video.mp4',
                type: 'video',
                url: videoUrl
              }]
            });
          case 13:
            throw new Error(taskResp.error.message);
          case 14:
            _context.n = 19;
            break;
          case 15:
            _context.p = 15;
            _t = _context.v;
            console.log('====error', String(_t));
            if (!String(_t).includes('无可用渠道')) {
              _context.n = 16;
              break;
            }
            return _context.a(2, {
              code: _dingtalkDocsCoolApp.FieldExecuteCode.Error,
              errorMessage: 'error1'
            });
          case 16:
            if (!(String(_t).includes('令牌额度已用尽') || String(_t).includes('quota'))) {
              _context.n = 17;
              break;
            }
            return _context.a(2, {
              code: _dingtalkDocsCoolApp.FieldExecuteCode.QuotaExhausted
            });
          case 17:
            if (!String(_t).includes('无效的令牌')) {
              _context.n = 18;
              break;
            }
            return _context.a(2, {
              code: _dingtalkDocsCoolApp.FieldExecuteCode.ConfigError
            });
          case 18:
            return _context.a(2, {
              code: _dingtalkDocsCoolApp.FieldExecuteCode.Error,
              errorMessage: 'error1'
            });
          case 19:
            return _context.a(2);
        }
      }, _callee, null, [[1, 15]]);
    }));
    function execute(_x, _x2) {
      return _execute.apply(this, arguments);
    }
    return execute;
  }()
});
var _default = exports["default"] = _dingtalkDocsCoolApp.fieldDecoratorKit;