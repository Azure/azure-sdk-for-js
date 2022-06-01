let nock = require('nock');

module.exports.hash = "4e47848003a4f74b73262cd4a838afa8";

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
  'e407fa4b-b48e-461f-b002-2dafea840a00',
  'x-ms-ests-server',
  '2.1.12261.14 - KRSLR1 ProdSlices',
  'Set-Cookie',
  'fpc=Amg943MzMhxNgs1uCMyFv30; expires=Sun, 09-Jan-2022 03:24:08 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrUXHlnLjf4WH8rcRm1R1GjDXvwpVQHBvEnyIvzWbg1zkBWBFBjmtsWGfki-c_IyBN_myBVN_OgEz9iTRuw9MMGFJqNOuKKa-7P9acx6f4IQwROzDXbiOaVQTw0_BT4udbG9aLNs-k5y0as44TWOXSSj9obcME4-Jfpzzi9k1zOG8gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 10 Dec 2021 03:24:07 GMT',
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
  '7ecc1bd0-d9b5-4967-95f8-4a44c6440a00',
  'x-ms-ests-server',
  '2.1.12261.14 - KRSLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AnK4sFiP9rxMlarisdRgdLM; expires=Sun, 09-Jan-2022 03:24:08 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrvPKP5nbgpiZQgPIeQWarWMkmWgk180JTP2klU7I5zcqb8gtBOiuXfwjc_lMTx6XLJjyZdcUosdJsy-eAIgyQ42IJ_4A_QXZVkcAhJsQT88JYZdxdWLkz9I4r67Fq1wzmkgRfuvsDHXlZ0RcZKTc2gUMmOKIg94dctJTAlZSxE-UgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 10 Dec 2021 03:24:07 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.3&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=b5ca312a-db08-49c1-b61a-2fa821e7b98c&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '7ecc1bd0-d9b5-4967-95f8-4a44c8440a00',
  'x-ms-ests-server',
  '2.1.12261.14 - KRSLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AlQVIQtWPD1OtGwqKcfd_98WPr5BAQAAAFe_RNkOAAAA; expires=Sun, 09-Jan-2022 03:24:08 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 10 Dec 2021 03:24:07 GMT',
  'Content-Length',
  '1374'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.DocumentDB/databaseAccounts/myaccountxxyy2')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147c5eca3471fdd6dd693665a17abb6a896cddd877be70fefcf0eceb7ef4d3f7db0bdbfbbb7bffd7077fa60fb607abef3603a9b9cefedefdeadf3a65ad7d3fcf3ba5aaf9abb8beb9f6edabc69efaeeaeab298e57573f78b625a574d75de8e9f56d3f5225fb64f9fdc9d656d36c99afc783aadd6cb162f66f2ebbb77d7d77b1f8d3e5a668b9c70ea7d5e56d30cf8d177a759d3a65fbda60fdbeb151adfaa2b6afeb65862bc9f97d5242b5d53faa6cd2e9a8f1efde25f32faa8b9a6812c9ed2cbf4f747d33acfda7c76dcd26b7b3b7bbbdbbb7bdbbb3b6f76ee3ddadb79b4b33fdeddfff4dedefd7b3ff511bd49435fe5755be48084bf2e8b86102e9617af5b0242105eafa7d33c9fe533ea71a6dd9f2e67abaa58a28379dbae9a47773b34199b96cd38fbc1bacec7d36af1687fffde5d02b25a4fca62fa226fafaafa2d0d346fa8ef8f4e97d9a4e44e72feed78dd560b22def4595694d5655e7ff4e83c2b9bdc7cffc5ba6c8b55997fb72edafcb9d29900058d5e6634347cf17be5d75fd0a8daca81299a9f2cea769d958ac9b3a26cf3daa0615a5d066d5ead4b10ea7bdf1f197c8f57c51b9a4ffaf0a3d7bfa824ec6745832fa8c327348fb32ff236c3a4329a66b00a5b707c56e7f99ba237bee365565ed3f0b3f235619d5dd054e8f759f79b936a795e5cac6b2601a6b199cef34506bc08adefe665f9343f2f96342a9af062d9b4d9729a9fd1183f9aee7c3a3998ee3fd87ef8804467ffe1a7b3edc9f4fe6c7b677f67b2973db83ffb347f8831d1003caefcf2fc3caf153a71c97296d598b7597e9ed1a49ccd68da8bf69abe7c56d44d8b39b8b61f92ac08298fa7e593eb5506727cf4a25ae6f48d920e9359d2f4cfed88a734b30571f8727afdb222de21d8bfd874478337df3dcf2ff392c0bd26228312a38f16d9bbb325cdea65569e2d5fe7046746fddde72f08f3325f52d3973551e7dd478f767776883ed4c611f34be2bb9a3403bd0431bbc224023d7c479f7d4f7551c8fbdb57a453d6105d23fe2f443d7c973e171560a4e3463952581bc5e906993d57f979591715e14fb4db212e687e8a68fe2a9fad69f6d03f53fa97105f93ee98fdff7988a3f880f20c4810acce809cda36f8dd3c2081f5cd0e68f77d074496ae9d4fa9fb3a2b63037b8defd31369f0be230c817fb323dd1b1c2971a719c48f38f3479c191d6108fc9b1de946ceb4cd61a0d89dfada0c6a41d99ec930c581c984d23b1d608e39fac076878085b4a3773b402313d387be07624cab1a04c06fd92a9b142539614c12faa458795ed4249bbe5daf9866f4ee2f36bef1cb9ce0cd8a29f540de29fffa4535cb5f06ceaabcebecfb17c5724dee3ca1b04f4226dfbecac933c0105cb36f5308408d0e4c1375a2cc9c028f8f3ecfab8f7e0919fcaeaff24a038833b811dffb3eb520e780e063e01679f6667ec9","2ff97f00750755a4a80c0000"], [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json',
  'Content-Encoding',
  'gzip',
  'Vary',
  'Accept-Encoding',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-gatewayversion',
  'version=2.14.0',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11181',
  'x-ms-request-id',
  'dea19a86-cd5d-46d7-aaff-34352e7d3600',
  'x-ms-correlation-request-id',
  'dea19a86-cd5d-46d7-aaff-34352e7d3600',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T032408Z:dea19a86-cd5d-46d7-aaff-34352e7d3600',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 10 Dec 2021 03:24:07 GMT'
]);
