let nock = require('nock');

module.exports.hash = "c5539b7a52feaddf2607d7a7a7cd9fed";

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
  '6e42cbf6-77fe-4524-bb47-09aab75d0000',
  'x-ms-ests-server',
  '2.1.12261.14 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=Av3XV-IlputKhpO7CVW8G14; expires=Sat, 08-Jan-2022 02:14:45 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrNSZPgcI8YDgouvhBz7MVUg4jl-dGNXfgIn3HO-ffL63RAHUyovQ1nQfC_ZZNzsGt-if22vAEhNpRKERQskDlZB1B9lG1ts7xUFeKzMbtG_qhr7iu5LVHjIadxjEq7S_E61Ns1Uh3ICg35crqJz3LTeBLuDwcqQ347SJyabSh3asgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 09 Dec 2021 02:14:45 GMT',
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
  '861ea296-1c2c-49dd-984c-64b14c840000',
  'x-ms-ests-server',
  '2.1.12261.14 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=ArJ0U6qc1QJOmYpRsZk9PKc; expires=Sat, 08-Jan-2022 02:14:46 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevriE2L32CNdRTJZYvK7S0hS9_yHhPQwR3njKhethwXwIMX7LuGDyFaVC9R3oD73BHLsEJTqao9EshVHnLxqWJstUvnvpFzox_tu2ilaztdmmooNa54IN8WkCSn2VAOTZc2fAR4VG7X4aereJ2f0A_-Y6piUjUY92BucQwQd0ceNqsgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 09 Dec 2021 02:14:45 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.3&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=8d2ad945-55b6-412d-8758-61ca8f5b1111&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '89baab6e-fe24-4d4d-94c1-3b250f790000',
  'x-ms-ests-server',
  '2.1.12261.14 - SEASLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AgcgOrlx0ppMqz1usFHXtikWPr5BAQAAAJVdQ9kOAAAA; expires=Sat, 08-Jan-2022 02:14:46 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 09 Dec 2021 02:14:46 GMT',
  'Content-Length',
  '1374'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ContainerService/managedClusters')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227e7192a61f5d66e53affe851fa3dfa23c527f45931a30f3ebadbac27cdb42e566d512d9bbb0ff7ce1fde9f1d9c6fdf9b7efa607b7f776f7ffbe1eef4c1f6c1f47ce7c1743639dfdbdfbd5be74db5aea7f9455dad57cdddc5f54f376ddeb47757757559ccf2bab9fb4531adaba63a6fc727d5b2cd8a655ebfceebcb629adf5d64cbec229f9d946b7a899a2eaeeb9ca1bdbbfec1472341adaca619f0018279d6b4ebc67cb3cc1618c747b1b7daeb157fb7a1f32fc2cecd9b84f82aafdb226fe87d210f7f7859348445b1bc78dd662dc37ebd9e4ef37c96cff4556a565d117cfd5edf4d3f9a5633fcfdd1abf512ef7f249fff12f3d2dbf524af973951ed27090dea036d77c77b3be38716f06cd9bcacf3f3e21dbecbde363fdd34b3b7f6dbf35f34e397cc17db3bf7efe7938707e7e3f9743516a28db31f2cde1e34e3a2b2af653f58d7f9cbaa6eb3f2d94f3c7d1187b0e2ef6f0074912fdb975555beacabf3a264ca3177d163a8e0a68bfae017ccebf4d5b45ad3df8fd25df7d1e5e275f1036e4ff45cceb27af6fb3f7dbdf7fb5fee79af55cdd3a2798b769f3fa196bb7b07ddefde183690b9f6de05d5cbbcf51b7df9dafb7e91bd7b59cd3092dddd1df7b1e1ab9f2cea769d955f64d339f1d4eb6956e6aff3d630113d00706286b5e34158144bfbb9fb345f6693323f5eb71560814b1ea56dbdce5d8bdbb1201ac698903e8fb3a163446a52d5d339096f9db5553dc88cd46ea1a05e5f93e82cbc2faac610f379b15cbf0bbe79fd7b7d852fbe9ad0e0d7de374b0276b6a0e9f17a3cfebd5e4bbbeddd839d7de296bda911dfd9f6decedeee787777bcf3a9074508f8ecece56b7aff3c2b9b5cbffa25f2f3fbdaf4a346c4ff655d2ca7c52a333c4b6f195a7d342d0be2cf33d689e7d9fe836cf7decef679767fbabd3f9bec6c3f9c4eef6f4fa69fdedfb93f3dd87fb0ff40496908c9237aa57af1f39af422007d71f2fb1be548bf388df5fb8b5899a1e8405e3d393ea1b73c16f88854c45555bf8de06bbe29d71705930fcc4d1f1a9850a2d9ec495666cb29b1c6db35da1087b058c51bf57ba1591721fa72dd4e888167672f211df66b221b7dca6c6d3e3204a1eff2f3f37cda169779f8b6d1129e9ea0c61f6e8d98ea647a36d33c6aa45e0831efaed693b2989ebd3c9ecd086a933777b3fbe7d37bf71e12060ff667dbfbfb3be7c40a9fdedbdedbdfdbcd6659bebb931b56a047f98e384f7fb1d420099d9d14b31a83dcdd19efedef8f77c63b77771d3b1b26f55af17f411bb2096acace5e7a8d7677bc26d5f46d5e3fa98bd98583f5606fbcfb000d036895ce8b915f9f195c2bc53c983a74ec8d413f36f2168ca5f71eff177dab583dcb16050962f8ced9cbcb7ddb587e1aba127fbe3b2655c196086f91dae56fb4c1470d33be329a35474fb2a6989a117e44769fa9f4acce73e987e711ff5077bf","e4ff01b71d135841090000"], [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json',
  'Content-Encoding',
  'gzip',
  'Expires',
  '-1',
  'Vary',
  'Accept-Encoding',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211209T021447Z:b764227e-0d67-459d-8607-5c16e5fb6616',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11904',
  'x-ms-correlation-request-id',
  'b764227e-0d67-459d-8607-5c16e5fb6616',
  'x-ms-request-id',
  '41abe2c8-57ab-4a2e-bc7a-4c9e92b5b783',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'nginx',
  'Date',
  'Thu, 09 Dec 2021 02:14:46 GMT'
]);
