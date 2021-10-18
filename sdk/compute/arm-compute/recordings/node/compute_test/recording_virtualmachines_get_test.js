let nock = require('nock');

module.exports.hash = "cb48336e656aaa8b24cf36942322a1e9";

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
  'b337dc1f-cf49-42cb-831f-bd2e98a51100',
  'x-ms-ests-server',
  '2.1.12158.6 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AiKJp7DaKCJAgA26ql-82xY; expires=Wed, 17-Nov-2021 07:36:50 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrHYWICxPsh6zIdU-enRP3yvzHsmMDU0p78U_y5zU138zHVJ3aVY1fidugdrWpJs71PRC5wqn1iPRUIN_y9i-O7ucWNbXLBkEXKBLEQUB1yMe04VikYoVyHuBx9Lm5rXtdZapi0SkWNNnl3XJRKeluQdwad90gB1uhn5MpixKaM1IgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 18 Oct 2021 07:36:49 GMT',
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
  'dc166749-de8d-4169-86e2-e69f9c931100',
  'x-ms-ests-server',
  '2.1.12158.6 - KRSLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AreDaO0HT5ZGtGrzT4fyB6Q; expires=Wed, 17-Nov-2021 07:36:50 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr-I-o56aarqpijcol_uHDKoIApEJIolIFxqMLC5Np1avXidZmRjkl21gs0ffXA50GZBrgZ3axz0VwooLRVqvfsJI2zlxX7wVKu0yA65rWtxHYxUTBLGYnbb4hLpfF4M2oLVQ7TwUBk9Ccu_NAG-x_C8FLn2HHzU_292OYIXhO248gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 18 Oct 2021 07:36:49 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.2&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=83af3fef-46bc-46e8-a012-354ee3b22f8c&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  '9ea55952-2798-4ab6-b940-678a97d21000',
  'x-ms-ests-server',
  '2.1.12158.6 - SEASLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AnLJkYH6_URPjY5nF3dXpNQWPr5BAQAAABEb_9gOAAAA; expires=Wed, 17-Nov-2021 07:36:50 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 18 Oct 2021 07:36:49 GMT',
  'Content-Length',
  '1351'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Compute/virtualMachines/virtualmachinex')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef16f9ca4e947cb6c917ff428fde8b2a8db75562eb2e9bc58e6ef3e1af1b7c50cdfdd6dd693665a17abb6a896cddd877be70fefcf0eceb7ef4d3f7db0bdbfbbb7bffd7077fa60fb607abef3603a9b9cefedefdeadf3a65ad7d3fcf3ba5aaf9abb8beb9f6edabc69efaeeaeab298e57573f78b625a574d75de8e4faac56adde67715872f0487c6fcddc1a9bd5e31c637beafedcb6a9a0171bc93674dbb365fb4d945431f321de8cfec074d3e5d65d3b7f4d947cb6a4998cea4257db92ab3f6bcaa174ddeb6c5f2a219cfaba6fdfdf32575592d17f9b21d37797d594cf3b169f9fb57ab369f15cbdf9ffef8fdebaa6aa779dda2bf8fda7a9d7f04b8bf84a17f441dade8bb823076d85c2ece98f65976be33cd3eddd99e3c98dedfde3fbf3fdb7e783efb747b277f904d1f7cfae9c1fd7d87e53cab6757599dbfacabf3a20495141c7d77b9785dfc001f7df4bacd96336af9fb3fddfbfd2ff71813830bb56bdaaace2ea2208a057df12a3fcfeb7c390dbea22f57eb495934f3bca6cfdddc7cb758ceaaabe6351187bed13ef07c549d131cb41d6ed2bc5da3c1deceeea7db4fb3369b129d3b4de89546e796e84e0c167c9bbfcba6ed4fba26bbfbf71ede1bef3fd8d91fefedeeeeec7c4aff7eaa047024a017abe669d18011fc1156cd1b653d4539e8cb08d2e2fa27bfa89a195ef7bf9ed639e1f7258b109a3dababc519e819b662d6bd4083577936fb6e5db4618345b6a477667dece83b9db9e3e9b45a2f5b83ab9dede7af5efba0e8851fae748324686ac9e370719427ac667999fb947a9ad3cccf7dd43fc2ebe0e6cf9f5083ddbd07e62b07e7a319f10ba80499fa9ef934ed50ac5ca3871dfb161e3b9124dad02646fbfcfee874eff7bff77092edefec4e1f4ef2fbfbf73fbd974df7f63e7db897ef9c4f1eeeec1f4c7c3c095877da4f17abf6badb867be0497f512d83f9a66f37cc387dfbbe734eaffc5cccfad7a4a58fb99b5b3cb7e01234a26e1c9fececdd0bbf6eab27b9bc978326e759d9e4ae81df614076659b5def7bfa7013dbdcfbfd67b39d7b7bf7688cbbd3ddfddd4f771f9eef9e3f9c3e7c48aae8fcd36976d041fc476c4378c7d9e616b4f431f7679146f143601bf3ebf7e5178300998f984d9dca80eb17ca3ed08f0e9d8fb2d9a2587e45be85612f506e4d7f7b6daec41a9d54cbf3e2625d1b67c7f6414d98d4b0823ff9c5f1055951fa1a5e8885414df2653629f3e3755b2d08c2f4ab156950f648ba0d57593b9dbf563f88bef7fa31df7e51cd18590bedc9f5971d8efa286b9abc69e03a99d66c0e9fe6e7d9ba6cbd39b4043594a497c953ab73f6a6bef77df7695696d5d5e9bb365f62a85f9253457d139b52b360101fd5f92f5a1775fef99a88499322a4795d5c2cb352db4a53d3e347cbbcbdaaeab7d4d64ca0f9e80c2ec939b926d4cbf77e314bc9cfba90bc90aeeff650b85b985fc959c6a41309c4affcc5f417b96ff5f5478f30bc5ff24bbe6fc746cd8400349fa401c8e1a0b978bd9e4ef37c460c8e563405bf","e4ff01bbdeb9622f0c0000"], [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Encoding',
  'gzip',
  'Expires',
  '-1',
  'Vary',
  'Accept-Encoding',
  'x-ms-ratelimit-remaining-resource',
  'Microsoft.Compute/LowCostGet3Min;3996,Microsoft.Compute/LowCostGet30Min;31996',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '56980aa5-fe38-46c6-828c-4df9ae260ffa',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11812',
  'x-ms-correlation-request-id',
  '26306033-faaf-44cd-89d8-a15ece231bbf',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211018T073651Z:26306033-faaf-44cd-89d8-a15ece231bbf',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 18 Oct 2021 07:36:50 GMT'
]);
