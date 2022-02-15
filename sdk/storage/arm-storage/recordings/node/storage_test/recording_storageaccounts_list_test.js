let nock = require('nock');

module.exports.hash = "1aba59bbf2d8aca7e007575928258017";

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
  '4696e003-6b80-43c2-915c-43b9266c1900',
  'x-ms-ests-server',
  '2.1.12470.11 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AuCUaweCwA1Hul7WSfCouA8; expires=Thu, 17-Mar-2022 09:32:26 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrvJugbu9E7N9LKPrBgNJ1qKjRleCrbAvaCEH4tbN8m0LLfyUY9FU8HXGGSBv-_LJrPSk1wNMc_aKBldwYkccv3QU1nW2ehUd-VHQXiSm60n8V9Cy-dyRUJcI13qhS1t3tDxidLMCQTGau_gKHXulqOAIaw8jRjH-1BArnYp2F85sgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 15 Feb 2022 09:32:26 GMT',
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
  '2189fb2e-1297-411d-804d-517648301900',
  'x-ms-ests-server',
  '2.1.12470.11 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AlJ_xDL6QjVKgBX7ackgK3o; expires=Thu, 17-Mar-2022 09:32:27 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrH5RZN-KojAhP0Q3EToQauPLlXIEakU101bDXvB5AuoT-Sdh4gIvY3iVjqOE6aR-QvBwU40HxANs_6n2JOx_65GXuBSO3XPLTG09GKdw8LKoOzmz2c9EbTN382RDn4zBMPQar-7yhz70EoEFJTNk6O9Fp8F2ExClY55tOEvyUdQggAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 15 Feb 2022 09:32:26 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.5.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=bf57dcf1-3a89-47fb-8881-d143d4a25aa8&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '32c813b3-0ddf-4cd7-96a4-b8ec9c1f1a00',
  'x-ms-ests-server',
  '2.1.12470.11 - KRSLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AnHTXthixHlDpoS28QeHkBDLj78gAQAAACpqndkOAAAA; expires=Thu, 17-Mar-2022 09:32:27 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 15 Feb 2022 09:32:26 GMT',
  'Content-Length',
  '1393'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Storage/storageAccounts')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef1479759b9ce3f7af4bd5ffc51f376fdd1a35ffcd1325bd0df1fbd6eb3e52cab67bfffe7af5e7f34faa82df2dafbf4a35f32fae86db19cf147559d5de43fb947ad0a7c70b7594f9a695dacdaa25a36771fee9d3fbc3f3b38dfbe37fdf4c1f6feeedefef6c3dde983ed83e9f9ce83e96c72beb7bf7bb7ce9b6a5d4ff3cfeb6abd6aee2eae7fba69f3a6bdbbaaabcb6296d7cddd2f8a695d35d5793bd60eef36f2f3783aadd6cb162fe927997cf2eedd3b42498713ffb2bd5ee1cb1b6153d3b29a66181035cfb3a65de3b336bb688864440bc27395d74424fcfdd1dbfcfaa4ceb9f99b02ddf347bbf4eadecedeeef6eedef6cec3373b9f3ebab7ffe8dec1f8e1a7fbbbbb077b3f4500a9d5de4dadb8b7e2326bf3d3e56c5515cbf6a45a2ef3297aa3debff7fdd1478b62592cd68b3765f393443afa9c60be79fe7af7f7dfa13eb2b2acae9e94d5e4e57a5216531a62ded07b6dbdce895a797b55d56f8fa7257df48b3f9a5caf327cf9d1f10fd675fe3aaf2f0b6a4d402e8bba5d67e50b69fe6a5dd2a7dc75b1f2fe98e5e7d9ba6c8f19374041d71840b35eadaaba6dbeddb6abe64d9d9d9f17d32f97e5b541235f4eeb6be61f60d1987ee9f7f3a234f47c23934703c01c1152f9329b9439b1a00029699a4ee5239985385d1f3c7c70b0f390e93a21aafc2c0127e804f535333935ee711cba27d6a4a9782392f6ed0abd125f5d1698c1627941b2d7e2ddd76b6a97cf0897d147d380cda2381c3cd8b9b7f76017ec457cb3c8ea6bc3374cd0d939fdf8688e897874372643636a319e56753ebe2281afae9a3131c95d82769513b136bef983dd7b636a157d5b68bdf1753489befb8bd63974d6c697b94df4ed16b376c3dbdc26fab630e0c697d124f22ecdb04ec0f3882e696876d7cd97e72fa5097d955d6645093cf06d3eada078fd57af484106afbe368de84bf732b11e89d0ffc775bbfead44fec10f7e4074269c743c03df7e3ded0eb2e66be873fa5c353c6417ea9b8de52e7d4e7f4351f3df7b20180de6b60680c4736f7bf7fe9b9d878feeed3ddad91fdfdfbbbf7b70ef1e24945a01eec656dcdb8f0cc0d7d4d11be90a8df3b3049ca013d41f8201e8e170ef60fffefd873b602fe21b2817c3374c5052eff4a2d1672a1a8409862da2744b0b107df5079fded602445f479be8cbacde6f7a9b1b455f6f317137bdce8da2af0b136e7e1b6d222fd334eb2c7454b9d539469ddfde122c4994e6bdf787ccc1f77fc9ff0344d6596df60b0000"], [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Encoding',
  'gzip',
  'Expires',
  '-1',
  'Vary',
  'Accept-Encoding',
  'x-ms-original-request-ids',
  '13ae23c9-f34e-4077-8ca0-83294ac31236',
  'x-ms-original-request-ids',
  '94d0811f-dfd9-4da2-946e-77b39d2876af',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11995',
  'x-ms-request-id',
  'b4e21aff-9c7f-4657-89ae-4f579cc46635',
  'x-ms-correlation-request-id',
  'b4e21aff-9c7f-4657-89ae-4f579cc46635',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220215T093227Z:b4e21aff-9c7f-4657-89ae-4f579cc46635',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 15 Feb 2022 09:32:27 GMT',
  'Content-Length',
  '1011'
]);
