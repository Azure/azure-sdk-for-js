let nock = require('nock');

module.exports.hash = "49ee0255ff279d99052929bd49bc21b8";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/common/discovery/instance')
  .query(true)
  .reply(200, {"tenant_discovery_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/v2.0/.well-known/openid-configuration","api-version":"1.1","metadata":[{"preferred_network":"login.microsoftonline.com","preferred_cache":"login.windows.net","aliases":["login.microsoftonline.com","login.windows.net","login.microsoft.com","sts.windows.net"]},{"preferred_network":"login.partner.microsoftonline.cn","preferred_cache":"login.partner.microsoftonline.cn","aliases":["login.partner.microsoftonline.cn","login.chinacloudapi.cn"]},{"preferred_network":"login.microsoftonline.de","preferred_cache":"login.microsoftonline.de","aliases":["login.microsoftonline.de"]},{"preferred_network":"login.microsoftonline.us","preferred_cache":"login.microsoftonline.us","aliases":["login.microsoftonline.us","login.usgovcloudapi.net"]},{"preferred_network":"login-us.microsoftonline.com","preferred_cache":"login-us.microsoftonline.com","aliases":["login-us.microsoftonline.com"]}]}, [
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
  'e8ed368f-919b-4202-9a4c-cddc95a7e700',
  'x-ms-ests-server',
  '2.1.12381.24 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=ApLtiKlnwrlHvTmEL5zFBT4; expires=Thu, 03-Mar-2022 22:03:22 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr2RsaYYqbbS5jpYjAhJNUFWiATpW6Ja4MF6t8LpC6sdHTufXFYdq1MOOP3UcuX0AqhxxR7YyKkwHt9SBWU4m3kGix8McbIQsfpBr6yOROrglMv6ROSzQs-UBW1L9gG4rjKRuF0_sSGasCApnnoGqBphUpx-raxx4U6nJoAVZIeqkgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 01 Feb 2022 22:03:22 GMT',
  'Content-Length',
  '980'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/12345678-1234-1234-1234-123456789012/v2.0/.well-known/openid-configuration')
  .reply(200, {"token_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/authorize","device_authorization_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/devicecode","http_logout_supported":true,"frontchannel_logout_supported":true,"end_session_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"kerberos_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/kerberos","tenant_region_scope":"WW","cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}, [
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
  'a1bdd81e-1bf7-43f4-99c7-a7c78a0ac300',
  'x-ms-ests-server',
  '2.1.12381.24 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AqD0RUlEiupBo-SCuuJf6VA; expires=Thu, 03-Mar-2022 22:03:22 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr1QAq_8SsPQ0gmk4p1y6_qWasKtN5z-toETZ6kUp-AiEPpVIBSH0KJXiPk_f6He2Q3v_PM-mjt8qMzPUx55TnonwGLvP1Hp-3eYhW1-0crCNoY3OLDRPBfH3IoQHd_hE1bjuZCWOpoZJ0bVR0CTib0SzIqspIWls9dyvzB-oi3lAgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 01 Feb 2022 22:03:22 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.5.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=9b2e228b-f617-4729-be49-dabb522bfdeb&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '6bd12f62-f088-40f2-9731-59a3caafd300',
  'x-ms-ests-server',
  '2.1.12381.24 - SCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AhrOHXJMcUpDuLLalI-83-4; expires=Thu, 03-Mar-2022 22:03:23 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 01 Feb 2022 22:03:22 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/documentModels')
  .query(true)
  .reply(200, {"value":[{"modelId":"prebuilt-businessCard","createdDateTime":"2022-01-30T00:00:00Z","apiVersion":"2022-01-30-preview","description":"Prebuilt model to extract key information from English business cards, including personal contact info, company name, job title, and more."},{"modelId":"prebuilt-document","createdDateTime":"2022-01-30T00:00:00Z","apiVersion":"2022-01-30-preview","description":"Prebuilt model to extract text, selection marks, tables, entities, and general key-value pairs."},{"modelId":"prebuilt-idDocument","createdDateTime":"2022-01-30T00:00:00Z","apiVersion":"2022-01-30-preview","description":"Prebuilt model to extract key information from US driver licenses and international passports."},{"modelId":"prebuilt-invoice","createdDateTime":"2022-01-30T00:00:00Z","apiVersion":"2022-01-30-preview","description":"Prebuilt model to extract key information from English invoices, including customer, vendor, invoice ID, due date, total, and more."},{"modelId":"prebuilt-layout","createdDateTime":"2022-01-30T00:00:00Z","apiVersion":"2022-01-30-preview","description":"Prebuilt model to extract text, selection marks, tables, and other layout information."},{"modelId":"prebuilt-receipt","createdDateTime":"2022-01-30T00:00:00Z","apiVersion":"2022-01-30-preview","description":"Prebuilt model to extract key information from English receipts, including merchant name, transaction date, transaction total, and more."},{"modelId":"prebuilt-tax.us.w2","createdDateTime":"2022-01-30T00:00:00Z","apiVersion":"2022-01-30-preview","description":"Prebuilt model to extract key information from IRS US W2 tax forms (year 2018-2021)"},{"modelId":"input2163225987212408525","createdDateTime":"2021-09-21T21:31:16Z","apiVersion":"2021-07-30-preview"},{"modelId":"copySource163225988631507929","createdDateTime":"2021-09-21T21:31:30Z","apiVersion":"2021-07-30-preview"},{"modelId":"input1163113109668902281","createdDateTime":"2021-09-08T19:58:21Z","apiVersion":"2021-07-30-preview"},{"modelId":"modelName163113248153505751","createdDateTime":"2021-09-08T20:21:25Z","apiVersion":"2021-07-30-preview"},{"modelId":"copySource163237519378307187","createdDateTime":"2021-09-23T05:33:18Z","apiVersion":"2021-07-30-preview"},{"modelId":"modelName163113250880806719","createdDateTime":"2021-09-08T20:21:52Z","apiVersion":"2021-07-30-preview"},{"modelId":"modelName164375298596203582","createdDateTime":"2022-02-01T22:03:11Z","apiVersion":"2022-01-30-preview"},{"modelId":"input2163113109670701032","createdDateTime":"2021-09-08T19:58:21Z","apiVersion":"2021-07-30-preview"},{"modelId":"composedModelName163113111005107104","createdDateTime":"2021-09-08T19:58:30Z","apiVersion":"2021-07-30-preview"},{"modelId":"copyTarget163226013235708643","createdDateTime":"2021-09-21T21:35:28Z","apiVersion":"2021-07-30-preview"},{"modelId":"composedModelName163237539928802537","createdDateTime":"2021-09-23T05:36:40Z","apiVersion":"2021-07-30-preview"},{"modelId":"customFormModelName163112101595907208","createdDateTime":"2021-09-08T17:10:19Z","apiVersion":"2021-07-30-preview"},{"modelId":"input1163287095585905071","createdDateTime":"2021-09-28T23:16:00Z","apiVersion":"2021-07-30-preview"},{"modelId":"customFormModelName163112436624101146","createdDateTime":"2021-09-08T18:06:11Z","apiVersion":"2021-07-30-preview"},{"modelId":"copyTarget163225945514709890","createdDateTime":"2021-09-21T21:24:11Z","apiVersion":"2021-07-30-preview"},{"modelId":"azsdkJavaScript871456","createdDateTime":"2021-09-21T21:14:36Z","apiVersion":"2021-07-30-preview"},{"modelId":"copySource163237540514707220","createdDateTime":"2021-09-23T05:36:50Z","apiVersion":"2021-07-30-preview"},{"modelId":"copyTarget163237520176206090","createdDateTime":"2021-09-23T05:33:18Z","apiVersion":"2021-07-30-preview"},{"modelId":"copyModelName163113159166606844","createdDateTime":"2021-09-08T20:06:37Z","apiVersion":"2021-07-30-preview"},{"modelId":"modelName163113225393208484","createdDateTime":"2021-09-08T20:17:37Z","apiVersion":"2021-07-30-preview"},{"modelId":"modelName163113223443705279","createdDateTime":"2021-09-08T20:17:18Z","apiVersion":"2021-07-30-preview"},{"modelId":"modelName163113250650601315","createdDateTime":"2021-09-08T20:21:50Z","apiVersion":"2021-07-30-preview"},{"modelId":"copySource163225944741401940","createdDateTime":"2021-09-21T21:24:11Z","apiVersion":"2021-07-30-preview"},{"modelId":"input1163237517970002616","createdDateTime":"2021-09-23T05:33:03Z","apiVersion":"2021-07-30-preview"},{"modelId":"composedModelName164375297951902160","createdDateTime":"2022-02-01T22:03:01Z","apiVersion":"2022-01-30-preview"},{"modelId":"composedModelName163113105718707490","createdDateTime":"2021-09-08T19:57:38Z","apiVersion":"2021-07-30-preview"},{"modelId":"modelName163113249535404329","createdDateTime":"2021-09-08T20:21:39Z","apiVersion":"2021-07-30-preview"},{"modelId":"input1163225987212409177","createdDateTime":"2021-09-21T21:31:16Z","apiVersion":"2021-07-30-preview"},{"modelId":"modelName163112893633403661","createdDateTime":"2021-09-08T19:22:21Z","apiVersion":"2021-07-30-preview"},{"modelId":"copyModelName163113221826906658","createdDateTime":"2021-09-08T20:17:02Z","apiVersion":"2021-07-30-preview"},{"modelId":"composedModelName163237518783605359","createdDateTime":"2021-09-23T05:33:08Z","apiVersion":"2021-07-30-preview"},{"modelId":"customFormModelName163112218040803833","createdDateTime":"2021-09-08T17:29:45Z","apiVersion":"2021-07-30-preview"},{"modelId":"customFormModelName163112476698303571","createdDateTime":"2021-09-08T18:12:54Z","apiVersion":"2021-07-30-preview"},{"modelId":"modelName163112850615809534","createdDateTime":"2021-09-08T19:15:10Z","apiVersion":"2021-07-30-preview"},{"modelId":"customFormModelName163112134627105335","createdDateTime":"2021-09-08T17:15:51Z","apiVersion":"2021-07-30-preview"},{"modelId":"220a7072-44d1-4fb5-8bdf-444c8d4cec6f","createdDateTime":"2021-11-17T19:14:13Z","apiVersion":"2021-07-30-preview"},{"modelId":"customFormModelName163276659392204568","createdDateTime":"2021-09-27T18:16:38Z","apiVersion":"2021-07-30-preview"},{"modelId":"customFormModelName163225936721405143","createdDateTime":"2021-09-21T21:22:52Z","apiVersion":"2021-07-30-preview"},{"modelId":"copySource163113181450007698","createdDateTime":"2021-09-08T20:10:18Z","apiVersion":"2021-07-30-preview"},{"modelId":"input1163226010901703902","createdDateTime":"2021-09-21T21:35:13Z","apiVersion":"2021-07-30-preview"},{"modelId":"input2163237545457201891","createdDateTime":"2021-09-23T05:37:39Z","apiVersion":"2021-07-30-preview"}],"nextLink":"https://endpoint/formrecognizer/documentModels?api-version=2022-01-30-preview&nextLink=2!216!MDAwMTE3IXN1YnNjcmlwdGlvbnMvYzVhMWYyNjJhOTFhNGFlOThkMDY0NTBmODRjMWU4ZDYvbW9kZWxzLzZkNThhNjQ2LWI2MjItNDA4YS04ZjgxLTI1NDc3YzI0NGE1ZS92ZXJzaW9uLTIwMjEtMDctMzAtcHJldmlldyEwMDAwMjghOTk5OS0xMi0zMVQyMzo1OTo1OS45OTk5OTk5WiE-"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '3165',
  'apim-request-id',
  '4183575c-9523-46ca-82dd-390c3c82ec68',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 01 Feb 2022 22:03:26 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/documentModels')
  .query(true)
  .reply(200, {"value":[{"modelId":"modelName163112891446101037","createdDateTime":"2021-09-08T19:21:58Z","apiVersion":"2021-07-30-preview"},{"modelId":"copyModelName163113247341401635","createdDateTime":"2021-09-08T20:21:18Z","apiVersion":"2021-07-30-preview"},{"modelId":"customFormModelName163225976830501119","createdDateTime":"2021-09-21T21:29:33Z","apiVersion":"2021-07-30-preview"},{"modelId":"composedModelName163237546315104585","createdDateTime":"2021-09-23T05:37:44Z","apiVersion":"2021-07-30-preview"},{"modelId":"customFormModelName163112427920703690","createdDateTime":"2021-09-08T18:04:48Z","apiVersion":"2021-07-30-preview"},{"modelId":"customFormModelName163112404501104129","createdDateTime":"2021-09-08T18:00:50Z","apiVersion":"2021-07-30-preview"},{"modelId":"be431595-f744-489f-9bc7-e6f5d5fd7bf0","createdDateTime":"2021-11-17T18:53:33Z","apiVersion":"2021-07-30-preview"},{"modelId":"copySource163237513086007176","createdDateTime":"2021-09-23T05:32:14Z","apiVersion":"2021-07-30-preview"},{"modelId":"modelName163113226031203118","createdDateTime":"2021-09-08T20:17:43Z","apiVersion":"2021-07-30-preview"},{"modelId":"modelName163113225806505194","createdDateTime":"2021-09-08T20:17:41Z","apiVersion":"2021-07-30-preview"},{"modelId":"input1163276668637201181","createdDateTime":"2021-09-27T18:18:10Z","apiVersion":"2021-07-30-preview"},{"modelId":"modelName163113251616301817","createdDateTime":"2021-09-08T20:22:00Z","apiVersion":"2021-07-30-preview"},{"modelId":"input1163237545457008940","createdDateTime":"2021-09-23T05:37:39Z","apiVersion":"2021-07-30-preview"},{"modelId":"customFormModelName163112198508209559","createdDateTime":"2021-09-08T17:26:29Z","apiVersion":"2021-07-30-preview"},{"modelId":"customFormModelName163237528989108521","createdDateTime":"2021-09-23T05:34:54Z","apiVersion":"2021-07-30-preview"},{"modelId":"input2163237511671106336","createdDateTime":"2021-09-23T05:32:01Z","apiVersion":"2021-07-30-preview"},{"modelId":"modelName163113225165209720","createdDateTime":"2021-09-08T20:17:35Z","apiVersion":"2021-07-30-preview"},{"modelId":"copySource163113177540700815","createdDateTime":"2021-09-08T20:09:40Z","apiVersion":"2021-07-30-preview"},{"modelId":"modelName163113249759302545","createdDateTime":"2021-09-08T20:21:41Z","apiVersion":"2021-07-30-preview"},{"modelId":"input1163113104419902536","createdDateTime":"2021-09-08T19:57:30Z","apiVersion":"2021-07-30-preview"},{"modelId":"customFormModelName163112185276303749","createdDateTime":"2021-09-08T17:24:16Z","apiVersion":"2021-07-30-preview"},{"modelId":"modelName163113223877409304","createdDateTime":"2021-09-08T20:17:22Z","apiVersion":"2021-07-30-preview"},{"modelId":"input2163276668637200779","createdDateTime":"2021-09-27T18:18:10Z","apiVersion":"2021-07-30-preview"},{"modelId":"modelName163112946697207731","createdDateTime":"2021-09-08T19:31:11Z","apiVersion":"2021-07-30-preview"},{"modelId":"modelName163113249329305183","createdDateTime":"2021-09-08T20:21:36Z","apiVersion":"2021-07-30-preview"},{"modelId":"input1163237539114206451","createdDateTime":"2021-09-23T05:36:35Z","apiVersion":"2021-07-30-preview"},{"modelId":"composedModelName163225988032605049","createdDateTime":"2021-09-21T21:31:21Z","apiVersion":"2021-07-30-preview"},{"modelId":"input1163237511671105750","createdDateTime":"2021-09-23T05:32:01Z","apiVersion":"2021-07-30-preview"},{"modelId":"input2163225943337600768","createdDateTime":"2021-09-21T21:23:57Z","apiVersion":"2021-07-30-preview"},{"modelId":"input2163226010901805393","createdDateTime":"2021-09-21T21:35:14Z","apiVersion":"2021-07-30-preview"},{"modelId":"customFormModelName163717656999000315","createdDateTime":"2021-11-17T19:16:13Z","apiVersion":"2021-07-30-preview"},{"modelId":"a7d67140ccde47e7a1e52432b129da65","createdDateTime":"2021-09-08T18:32:50Z","apiVersion":"2021-07-30-preview"},{"modelId":"customFormModelName164375281971107645","createdDateTime":"2022-02-01T22:00:24Z","apiVersion":"2022-01-30-preview"},{"modelId":"input2164375297071001356","createdDateTime":"2022-02-01T22:02:56Z","apiVersion":"2022-01-30-preview"},{"modelId":"input1","createdDateTime":"2021-09-08T19:14:36Z","apiVersion":"2021-07-30-preview"},{"modelId":"copySource163276670072007263","createdDateTime":"2021-09-27T18:18:25Z","apiVersion":"2021-07-30-preview"},{"modelId":"copyTarget163113178892705722","createdDateTime":"2021-09-08T20:09:40Z","apiVersion":"2021-07-30-preview"},{"modelId":"modelName163113224080708951","createdDateTime":"2021-09-08T20:17:24Z","apiVersion":"2021-07-30-preview"},{"modelId":"modelName163113251396006996","createdDateTime":"2021-09-08T20:21:57Z","apiVersion":"2021-07-30-preview"},{"modelId":"customFormModelName163112305042003145","createdDateTime":"2021-09-08T17:44:14Z","apiVersion":"2021-07-30-preview"},{"modelId":"input2163237517970202623","createdDateTime":"2021-09-23T05:33:04Z","apiVersion":"2021-07-30-preview"},{"modelId":"customFormModelName163113042103203979","createdDateTime":"2021-09-08T19:47:08Z","apiVersion":"2021-07-30-preview"},{"modelId":"input1164375297070908728","createdDateTime":"2022-02-01T22:02:56Z","apiVersion":"2022-01-30-preview"},{"modelId":"modelName163225913999500856","createdDateTime":"2021-09-21T21:19:04Z","apiVersion":"2021-07-30-preview"}],"nextLink":"https://endpoint/formrecognizer/documentModels?api-version=2022-01-30-preview&nextLink=2!236!MDAwMTMyIXN1YnNjcmlwdGlvbnMvYzVhMWYyNjJhOTFhNGFlOThkMDY0NTBmODRjMWU4ZDYvbW9kZWxzL2M2M2ZmZGRiLTNkY2UtNGU5OC04YWUzLTE5MjhmMjQ0ZmFlNi9jNjNmZmRkYi0zZGNlLTRlOTgtOGFlMy0xOTI4ZjI0NGZhZTYuanNvbiEwMDAwMjghOTk5OS0xMi0zMVQyMzo1OTo1OS45OTk5OTk5WiE-"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '3620',
  'apim-request-id',
  '1ec6c5f7-5a00-4243-9f9f-b45b53d210cd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 01 Feb 2022 22:03:29 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/documentModels')
  .query(true)
  .reply(200, {"value":[{"modelId":"customFormModelName163112464878604944","createdDateTime":"2021-09-08T18:10:53Z","apiVersion":"2021-07-30-preview"},{"modelId":"modelName163113224956204639","createdDateTime":"2021-09-08T20:17:33Z","apiVersion":"2021-07-30-preview"},{"modelId":"modelName163113251106503518","createdDateTime":"2021-09-08T20:21:54Z","apiVersion":"2021-07-30-preview"},{"modelId":"input2163113102723108943","createdDateTime":"2021-09-08T19:57:11Z","apiVersion":"2021-07-30-preview"},{"modelId":"modelName163113247890700964","createdDateTime":"2021-09-08T20:21:23Z","apiVersion":"2021-07-30-preview"},{"modelId":"input1163276996196908714","createdDateTime":"2021-09-27T19:12:46Z","apiVersion":"2021-07-30-preview"},{"modelId":"copyTarget163113182721707820","createdDateTime":"2021-09-08T20:10:18Z","apiVersion":"2021-07-30-preview"},{"modelId":"copyTarget163225989374906515","createdDateTime":"2021-09-21T21:31:30Z","apiVersion":"2021-07-30-preview"},{"modelId":"customFormModelName163237501876602714","createdDateTime":"2021-09-23T05:30:23Z","apiVersion":"2021-07-30-preview"},{"modelId":"copyTarget163237547705804505","createdDateTime":"2021-09-23T05:37:53Z","apiVersion":"2021-07-30-preview"},{"modelId":"input2163113104421600270","createdDateTime":"2021-09-08T19:57:28Z","apiVersion":"2021-07-30-preview"},{"modelId":"modelName163112895494409499","createdDateTime":"2021-09-08T19:22:39Z","apiVersion":"2021-07-30-preview"},{"modelId":"composedModelName163226011835200563","createdDateTime":"2021-09-21T21:35:19Z","apiVersion":"2021-07-30-preview"},{"modelId":"input1163225943337503817","createdDateTime":"2021-09-21T21:23:57Z","apiVersion":"2021-07-30-preview"},{"modelId":"modelName163113248682903636","createdDateTime":"2021-09-08T20:21:30Z","apiVersion":"2021-07-30-preview"},{"modelId":"copySource163237546900508648","createdDateTime":"2021-09-23T05:37:53Z","apiVersion":"2021-07-30-preview"},{"modelId":"customFormModelName163276987016300913","createdDateTime":"2021-09-27T19:11:15Z","apiVersion":"2021-07-30-preview"},{"modelId":"input1163276938676901359","createdDateTime":"2021-09-27T19:03:11Z","apiVersion":"2021-07-30-preview"},{"modelId":"modelName163113250443206564","createdDateTime":"2021-09-08T20:21:48Z","apiVersion":"2021-07-30-preview"},{"modelId":"customFormModelName163113045991103212","createdDateTime":"2021-09-08T19:47:44Z","apiVersion":"2021-07-30-preview"},{"modelId":"modelName163113222677708677","createdDateTime":"2021-09-08T20:17:11Z","apiVersion":"2021-07-30-preview"},{"modelId":"customFormModelName163112418588201206","createdDateTime":"2021-09-08T18:03:16Z","apiVersion":"2021-07-30-preview"},{"modelId":"composedModelName163276669493908323","createdDateTime":"2021-09-27T18:18:15Z","apiVersion":"2021-07-30-preview"},{"modelId":"modelName163113247633902560","createdDateTime":"2021-09-08T20:21:20Z","apiVersion":"2021-07-30-preview"},{"modelId":"modelName163113223237904494","createdDateTime":"2021-09-08T20:17:16Z","apiVersion":"2021-07-30-preview"},{"modelId":"modelName163113224316903714","createdDateTime":"2021-09-08T20:17:30Z","apiVersion":"2021-07-30-preview"},{"modelId":"input2163237539114300092","createdDateTime":"2021-09-23T05:36:35Z","apiVersion":"2021-07-30-preview"},{"modelId":"customFormModelName163112096427000002","createdDateTime":"2021-09-08T17:09:28Z","apiVersion":"2021-07-30-preview"},{"modelId":"copyTarget163237513819905508","createdDateTime":"2021-09-23T05:32:14Z","apiVersion":"2021-07-30-preview"},{"modelId":"copyTarget163237541299002306","createdDateTime":"2021-09-23T05:36:50Z","apiVersion":"2021-07-30-preview"},{"modelId":"composedModelName163237512492301028","createdDateTime":"2021-09-23T05:32:05Z","apiVersion":"2021-07-30-preview"},{"modelId":"customFormModelName163717682748501437","createdDateTime":"2021-11-17T19:20:33Z","apiVersion":"2021-07-30-preview"},{"modelId":"copySource163226012433106028","createdDateTime":"2021-09-21T21:35:28Z","apiVersion":"2021-07-30-preview"},{"modelId":"composedModelName163225944139304482","createdDateTime":"2021-09-21T21:24:02Z","apiVersion":"2021-07-30-preview"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '2649',
  'apim-request-id',
  '0d3d1d64-5422-4354-be23-3f065211bb04',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 01 Feb 2022 22:03:32 GMT'
]);
