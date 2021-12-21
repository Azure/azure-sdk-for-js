let nock = require('nock');

module.exports.hash = "f540219c5cdd3f0f4bef066bda2225fb";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/common/discovery/instance')
  .query(true)
  .reply(200, {"tenant_discovery_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/v2.0/.well-known/openid-configuration","api-version":"1.1","metadata":[{"preferred_network":"login.microsoftonline.com","preferred_cache":"login.windows.net","aliases":["login.microsoftonline.com","login.windows.net","login.microsoft.com","sts.windows.net"]},{"preferred_network":"login.partner.microsoftonline.cn","preferred_cache":"login.partner.microsoftonline.cn","aliases":["login.partner.microsoftonline.cn","login.chinacloudapi.cn"]},{"preferred_network":"login.microsoftonline.de","preferred_cache":"login.microsoftonline.de","aliases":["login.microsoftonline.de"]},{"preferred_network":"login.microsoftonline.us","preferred_cache":"login.microsoftonline.us","aliases":["login.microsoftonline.us","login.usgovcloudapi.net"]},{"preferred_network":"login-us.microsoftonline.com","preferred_cache":"login-us.microsoftonline.com","aliases":["login-us.microsoftonline.com"]}]}, [
  'Cache-Control',
  'max-age=86400, private',
  'Content-Type',
  'application/json; charset=utf-8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Methods',
  'GET, OPTIONS',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'x-ms-request-id',
  '32ea23f5-8af6-4214-946f-0c69eeac0200',
  'x-ms-ests-server',
  '2.1.12261.17 - KRSLR2 ProdSlices',
  'Set-Cookie',
  'fpc=Av1d73DVm9JHl1RD-euVKXc; expires=Wed, 19-Jan-2022 06:52:02 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrMMjbuKBJYU2wR7O9MO7-N9tvUS6TAV_lDFTxjFdDIPYQvZvzETTTUV60O5A106f4EGR_DnYGor-2x5eMltZyqpY8tRx5W_5xZXgltRLlQMLpNNyjxj7ITFo1qJR_S1xh93buAKG4MISn-DDbkOqxZupSFEbzk6jQi8T2ugQ3ocEgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 20 Dec 2021 06:52:01 GMT',
  'Content-Length',
  '980'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/88888888-8888-8888-8888-888888888888/v2.0/.well-known/openid-configuration')
  .reply(200, {"token_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/authorize","device_authorization_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/devicecode","http_logout_supported":true,"frontchannel_logout_supported":true,"end_session_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"kerberos_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/kerberos","tenant_region_scope":"WW","cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}, [
  'Cache-Control',
  'max-age=86400, private',
  'Content-Type',
  'application/json; charset=utf-8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Methods',
  'GET, OPTIONS',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'x-ms-request-id',
  'ab800d36-9487-492e-b40d-f24b96bc0400',
  'x-ms-ests-server',
  '2.1.12261.17 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AueFT7NKzXBEt86psHdF3sI; expires=Wed, 19-Jan-2022 06:52:02 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrLlau1-XBnrZVpE89nKOtPFZFhQ0AsmjC3XhfOco8oHtDby-7jlKpDHvutaTzpiW8MQgYq9L4YWJ9Fyqtdiq5hTRt3G6t_KqfEgBxZMZxxGYte1mEhLgTARcSI7MOIqoZJn2QbcXt5OxYAK7go5Hc_3OG62AjSpNJNOaRGt_xMRggAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 20 Dec 2021 06:52:01 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.4.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=00811451-91d3-4461-b3ab-98ef13c7af9b&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'x-ms-request-id',
  'c7025f87-5230-4b1b-a3d3-5a8e4c580800',
  'x-ms-ests-server',
  '2.1.12261.17 - SEASLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AiSg-YxXJCJGrlBTVFXEDAnLj78gAQAAABEfUtkOAAAA; expires=Wed, 19-Jan-2022 06:52:02 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 20 Dec 2021 06:52:01 GMT',
  'Content-Length',
  '1393'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .put('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.CognitiveServices/accounts/myaccountxxx', {"kind":"CognitiveServices","sku":{"name":"S0"},"identity":{"type":"SystemAssigned"},"location":"eastus"})
  .query(true)
  .reply(201, {"id":"/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.CognitiveServices/accounts/myaccountxxx","name":"myaccountxxx","type":"Microsoft.CognitiveServices/accounts","etag":"\"5c0073d9-0000-0100-0000-61c0281b0000\"","systemData":{"createdBy":"azure_client_id","createdByType":"Application","createdAt":"2021-12-20T06:52:07.6415104Z","lastModifiedBy":"azure_client_id","lastModifiedByType":"Application","lastModifiedAt":"2021-12-20T06:52:07.6415104Z"},"location":"eastus","sku":{"name":"S0"},"kind":"CognitiveServices","properties":{"endpoint":"https://eastus.api.cognitive.microsoft.com/","internalId":"8567070c229743ad82a226637bfd3598","dateCreated":"2021-12-20T06:52:10.6652411Z","apiProperties":{},"callRateLimit":{"rules":[{"key":"formrecognizer.custom.train","renewalPeriod":60,"count":1,"dynamicThrottlingEnabled":false,"matchPatterns":[{"path":"formrecognizer/custom/train","method":"*"}]},{"key":"formrecognizer.custom.copymodels","renewalPeriod":60,"count":1,"dynamicThrottlingEnabled":false,"matchPatterns":[{"path":"formrecognizer/custom/models/{modelId}/copy","method":"*"}]},{"key":"formrecognizer.custom.models.get","renewalPeriod":60,"count":10,"dynamicThrottlingEnabled":false,"matchPatterns":[{"path":"formrecognizer/custom/models","method":"GET"}]},{"key":"formrecognizer.analyzeform","renewalPeriod":1,"count":15,"dynamicThrottlingEnabled":false,"matchPatterns":[{"path":"formrecognizer/custom/models/{modelId}/analyze","method":"POST"}]},{"key":"formrecognizer.analyzeform.result","renewalPeriod":1,"count":100,"dynamicThrottlingEnabled":false,"matchPatterns":[{"path":"formrecognizer/custom/models/{modelId}/analyzeResults/{resultId}","method":"GET"}]},{"key":"customvision.training","renewalPeriod":1,"count":10,"dynamicThrottlingEnabled":false,"matchPatterns":[{"path":"customvision/v3.0/training/*","method":"*"},{"path":"customvision/v3.1/training/*","method":"*"},{"path":"customvision/v3.2/training/*","method":"*"},{"path":"customvision/v3.3/training/*","method":"*"},{"path":"customvision/v3.4-preview/training/*","method":"*"}]},{"key":"customvision.prediction","renewalPeriod":1,"count":10,"dynamicThrottlingEnabled":false,"matchPatterns":[{"path":"customvision/v3.0/prediction/*","method":"*"},{"path":"customvision/v3.1/prediction/*","method":"*"}]},{"key":"speech.synthesize","renewalPeriod":1,"count":200,"dynamicThrottlingEnabled":false,"matchPatterns":[{"path":"speech/synthesize","method":"*"}]},{"key":"speech.customvoicesynthesize","renewalPeriod":1,"count":200,"dynamicThrottlingEnabled":false,"matchPatterns":[{"path":"speech/customvoicesynthesize","method":"*"}]},{"key":"speech.neuralvoicesynthesize","renewalPeriod":1,"count":200,"dynamicThrottlingEnabled":false,"matchPatterns":[{"path":"speech/neuralvoicesynthesize","method":"*"}]},{"key":"speech.customneuralvoicesynthesize","renewalPeriod":1,"count":200,"dynamicThrottlingEnabled":false,"matchPatterns":[{"path":"speech/customneuralvoicesynthesize","method":"*"}]},{"key":"speech.conversationtranscription","renewalPeriod":1,"count":100,"dynamicThrottlingEnabled":false,"matchPatterns":[{"path":"speech/singlechannelaudioconversationtranscription","method":"*"},{"path":"speech/multichannelaudioconversationtranscribe","method":"*"},{"path":"speech/videoconversationtranscribe","method":"*"}]},{"key":"speech.speechtotext","renewalPeriod":10,"count":100,"dynamicThrottlingEnabled":false,"matchPatterns":[{"path":"speechtotext/*","method":"*"}]},{"key":"speech.texttospeech","renewalPeriod":10,"count":100,"dynamicThrottlingEnabled":false,"matchPatterns":[{"path":"texttospeech/*","method":"*"}]},{"key":"speech.speakerrecognitionv2","renewalPeriod":1,"count":20,"dynamicThrottlingEnabled":false,"matchPatterns":[{"path":"speaker/*","method":"*"}]},{"key":"speech.speakerrecognitionv1","renewalPeriod":1,"count":5,"dynamicThrottlingEnabled":false,"matchPatterns":[{"path":"spid/*","method":"*"}]},{"key":"docmentTranslation","renewalPeriod":1,"count":20,"dynamicThrottlingEnabled":false,"matchPatterns":[{"path":"translator/text/batch/*","method":"*"}]},{"key":"textTranslation","renewalPeriod":1,"count":100,"dynamicThrottlingEnabled":false,"matchPatterns":[{"path":"translator/text/*","method":"*"}]},{"key":"token","renewalPeriod":1,"count":100,"dynamicThrottlingEnabled":false,"matchPatterns":[{"path":"sts/v1.0/*","method":"*"}]},{"key":"ListManagement","renewalPeriod":1,"count":15,"dynamicThrottlingEnabled":false,"matchPatterns":[{"path":"contentmoderator/lists/v1.0/*","method":"*"}]},{"key":"Moderate","renewalPeriod":1,"count":20,"dynamicThrottlingEnabled":false,"matchPatterns":[{"path":"contentmoderator/moderate/v1.0/*","method":"*"}]},{"key":"Review","renewalPeriod":1,"count":20,"dynamicThrottlingEnabled":false,"matchPatterns":[{"path":"contentmoderator/review/v1.0/*","method":"*"}]},{"key":"luis.endpoint","renewalPeriod":1,"count":50,"dynamicThrottlingEnabled":false,"matchPatterns":[{"path":"luis/*","method":"*"},{"path":"luis/prediction/*","method":"*"}]},{"key":"workflow.endpoint.postcalls","renewalPeriod":60,"count":60,"dynamicThrottlingEnabled":false,"matchPatterns":[{"path":"/language/:analyze-conversations","method":"*"}]},{"key":"textAnalytics.unifiedAuthoring","renewalPeriod":60,"count":100,"dynamicThrottlingEnabled":false,"matchPatterns":[{"path":"language/text/authoring/v1.0-preview.1/*","method":"*"}]},{"key":"textAnalytics.unifiedAuthoring.getcalls","renewalPeriod":60,"count":100,"dynamicThrottlingEnabled":false,"matchPatterns":[{"path":"language/text/authoring/v1.0-preview.2/*","method":"GET"}]},{"key":"textAnalytics.unifiedAuthoring.updatecalls","renewalPeriod":60,"count":10,"dynamicThrottlingEnabled":false,"matchPatterns":[{"path":"language/text/authoring/v1.0-preview.2/*","method":"*"}]},{"key":"textAnalytics.unifiedAuthoring.clu.getCalls","renewalPeriod":60,"count":100,"dynamicThrottlingEnabled":false,"matchPatterns":[{"path":"language/customize-conversation/*","method":"GET"}]},{"key":"textAnalytics.unifiedAuthoring.clu.updateCalls","renewalPeriod":60,"count":10,"dynamicThrottlingEnabled":false,"matchPatterns":[{"path":"language/customize-conversation/*","method":"*"}]},{"key":"textAnalytics.customText","renewalPeriod":60,"count":100,"dynamicThrottlingEnabled":false,"matchPatterns":[{"path":"text/analytics/v3.1-preview.ct.1/analyze/*","method":"*"}]},{"key":"textAnalytics.analyze","renewalPeriod":60,"count":300,"dynamicThrottlingEnabled":false,"matchPatterns":[{"path":"text/analytics/v3.1/analyze/*","method":"*"},{"path":"text/analytics/v3.2-preview.1/analyze/*","method":"*"},{"path":"text/analytics/v3.2-preview.2/analyze/*","method":"*"}]},{"key":"textAnalytics.healthcare","renewalPeriod":60,"count":300,"dynamicThrottlingEnabled":false,"matchPatterns":[{"path":"text/analytics/v3.1/entities/health/*","method":"*"},{"path":"text/analytics/v3.2-preview.1/health/*","method":"*"},{"path":"text/analytics/v3.2-preview.2/health/*","method":"*"}]},{"key":"textAnalytics","renewalPeriod":60,"count":1000,"dynamicThrottlingEnabled":false,"matchPatterns":[{"path":"text/analytics/*","method":"*"}]},{"key":"questionanswering","renewalPeriod":60,"count":600,"dynamicThrottlingEnabled":false,"matchPatterns":[{"path":"qnamaker/*","method":"*"}]},{"key":"unifiedlanguage.questionanswering","renewalPeriod":60,"count":600,"dynamicThrottlingEnabled":false,"matchPatterns":[{"path":"language/query-knowledgebases/*","method":"*"},{"path":"language/:query-*","method":"*"}]},{"key":"vision.recognizeText","renewalPeriod":1,"count":30,"dynamicThrottlingEnabled":false,"matchPatterns":[{"path":"vision/recognizeText","method":"POST"},{"path":"vision/textOperations/*","method":"GET"},{"path":"vision/read/*","method":"*"}]},{"key":"vision","renewalPeriod":1,"count":15,"dynamicThrottlingEnabled":false,"matchPatterns":[{"path":"vision/*","method":"*"}]},{"key":"face","renewalPeriod":1,"count":15,"dynamicThrottlingEnabled":false,"matchPatterns":[{"path":"face/*","method":"*"}]},{"key":"bingVisualSearch","renewalPeriod":1,"count":30,"dynamicThrottlingEnabled":false,"matchPatterns":[{"path":"bing/v7.0/images/visualsearch/*","method":"*"}]},{"key":"bingSearch","renewalPeriod":1,"count":250,"dynamicThrottlingEnabled":false,"matchPatterns":[{"path":"bing/*","method":"*"}]},{"key":"bingCustomSearch","renewalPeriod":1,"count":150,"dynamicThrottlingEnabled":false,"matchPatterns":[{"path":"bingcustomsearch/*","method":"*"}]},{"key":"container.billing","renewalPeriod":10,"count":500,"dynamicThrottlingEnabled":false,"matchPatterns":[{"path":"billing/*","method":"*"}]},{"key":"default","renewalPeriod":1,"count":20,"dynamicThrottlingEnabled":false,"matchPatterns":[{"path":"*","method":"*"}]}]},"isMigrated":false,"publicNetworkAccess":"Enabled","capabilities":[{"name":"Container","value":"Face.*,Face.Face,ComputerVision.*,ComputerVision.VideoAnalytics,TextAnalytics.*,TextAnalytics.Healthcare,TextAnalytics.Keyphrase,TextAnalytics.KeyphraseV2,TextAnalytics.KeyPhraseONNX,TextAnalytics.LanguageFastText,TextAnalytics.Language,TextAnalytics.LanguageV2,TextAnalytics.Sentiment,TextAnalytics.SentimentV2,TextAnalytics.SentimentV3,TextAnalytics.SentimentV3Preview,LUIS.LUIS,ContentModerator.*,TextTranslation.*,SpeechServices.*,FormRecognizer.*"},{"name":"Cloud","value":"TextAnalytics.Healthcare,TextAnalytics.Analyze,QuestionAnswer.AllApis,LanguageService.QuestionAnsweringApis"}],"endpoints":{"Bing Autosuggest":"https://eastus.api.cognitive.microsoft.com/","Bing Spell Check":"https://eastus.api.cognitive.microsoft.com/","Bing Entity Search":"https://eastus.api.cognitive.microsoft.com/","Bing Image Search":"https://eastus.api.cognitive.microsoft.com/","Bing News Search":"https://eastus.api.cognitive.microsoft.com/","Bing Video Search":"https://eastus.api.cognitive.microsoft.com/","Bing Web Search":"https://eastus.api.cognitive.microsoft.com/","Bing Visual Search":"https://eastus.api.cognitive.microsoft.com/","Bing Custom Search":"https://eastus.api.cognitive.microsoft.com/","Face":"https://eastus.api.cognitive.microsoft.com/","Computer Vision":"https://eastus.api.cognitive.microsoft.com/","Text Analytics":"https://eastus.api.cognitive.microsoft.com/","LanguageAuthoring":"https://eastus.api.cognitive.microsoft.com/","ConversationalLanguageUnderstanding":"https://eastus.api.cognitive.microsoft.com/","ConversationalLURuntime":"https://eastus.api.cognitive.microsoft.com/","QnAMaker":"https://eastus.api.cognitive.microsoft.com/","turing":"https://eastus.api.cognitive.microsoft.com/","Turing DeepWrite":"https://eastus.api.cognitive.microsoft.com/","QuestionAnswering":"https://eastus.api.cognitive.microsoft.com/","LUIS.Authoring":"https://eastus.api.cognitive.microsoft.com/","LUIS":"https://eastus.api.cognitive.microsoft.com/","Unified Speech":"https://eastus.api.cognitive.microsoft.com/","Content Moderator - Review":"https://eastus.api.cognitive.microsoft.com/","Content Moderator - Moderate":"https://eastus.api.cognitive.microsoft.com/","Content Moderator - List Management":"https://eastus.api.cognitive.microsoft.com/","TextTranslation-Global":"https://api.cognitive.microsofttranslator.com/","TextTranslation":"https://eastus.api.cognitive.microsoft.com/","DocumentTranslation":"https://eastus.api.cognitive.microsoft.com/","Token":"https://eastus.api.cognitive.microsoft.com/","Container":"https://eastus.api.cognitive.microsoft.com/","Speech Services Speech to Text v2.0":"https://eastus.api.cognitive.microsoft.com/","Speech Services Speech to Text v3.0":"https://eastus.api.cognitive.microsoft.com/","Speech Services Speech to Text v3.1-preview.1":"https://eastus.api.cognitive.microsoft.com/","Speech Services Custom Voice":"https://eastus.api.cognitive.microsoft.com/","Speech Services Audio Content Creation":"https://eastus.api.cognitive.microsoft.com/","Speech Services Speaker Verification":"https://eastus.api.cognitive.microsoft.com/","Speech Services Speaker Identification":"https://eastus.api.cognitive.microsoft.com/","Custom_Vision_Prediction_3.0":"https://eastus.api.cognitive.microsoft.com/","Custom_Vision_Prediction_3.1":"https://eastus.api.cognitive.microsoft.com/","Custom_Vision_Training_3.1":"https://eastus.api.cognitive.microsoft.com/","Custom_Vision_Training_3.2":"https://eastus.api.cognitive.microsoft.com/","Custom_Vision_Training_3.3":"https://eastus.api.cognitive.microsoft.com/","FormRecognizer":"https://eastus.api.cognitive.microsoft.com/"},"provisioningState":"Succeeded"},"identity":{"principalId":"2f87a0de-373f-4e7e-8c79-1fbc638b1bdd","tenantId":"88888888-8888-8888-8888-888888888888","type":"SystemAssigned","userAssignedIdentities":{}}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '12654',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'ETag',
  '"5c0073d9-0000-0100-0000-61c0281b0000"',
  'X-Content-Type-Options',
  'nosniff',
  'x-ms-request-id',
  '6a808278-84ae-4839-ae2f-b5bddc45e3c4',
  'x-envoy-upstream-service-time',
  '940',
  'Server',
  'istio-envoy',
  'x-ms-ratelimit-remaining-subscription-writes',
  '1199',
  'x-ms-correlation-request-id',
  '058a9735-31b4-4d37-b654-d45c3f23daa7',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211220T065213Z:058a9735-31b4-4d37-b654-d45c3f23daa7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'Date',
  'Mon, 20 Dec 2021 06:52:12 GMT'
]);
