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
  '2f52e792-7a04-45a9-ad07-1e91face2700',
  'x-ms-ests-server',
  '2.1.12171.14 - KRSLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AoKIa56yEjlHuAFWSBvUDl0; expires=Fri, 26-Nov-2021 06:38:24 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrJqP-cGtwPZqSDjnjuj0DkQw7Kgz4xJvcPH7XfCNodF79QBRfsxw71B16_tWKWfJH6gt5XqsQseXctMlIg9vV6MkKeyaD4ARQwVqFFdUEL5WZli2CafTPPQDZH0CINKJhgvBQkfkAzArjkBhsi80QajXnzqUmPuT3fC7iQ6hjU6kgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 27 Oct 2021 06:38:24 GMT',
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
  '7a197833-c317-4824-a670-b94f0a1a2d00',
  'x-ms-ests-server',
  '2.1.12171.14 - KRSLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AiBD99UZiBRLuoIZmfcUNmE; expires=Fri, 26-Nov-2021 06:38:24 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrRaoIVYM8XZ-Udbcezbv2q5lWxRWhFyCXH8HoEyTPyWFjzaKGNV7g8TRratJy1vEpX8zeMJ9ikdITfp_-ontDPpJf9PNG86towH1JcgcTf8mE6j4QHUHcMBnF_79VtrX4DfcbuchfF6bguvHjifUpKS3ikfU3-XkRlQUUPbGmigQgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 27 Oct 2021 06:38:24 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.2&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=937e0f3d-ba82-4b57-8e05-fd10b9eac549&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  '7e6cbce9-7147-4087-8ec6-63785d5f2c00',
  'x-ms-ests-server',
  '2.1.12171.14 - KRSLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AoFD5T8hCLFCnC52FSQO7IsWPr5BAQAAAN_qCtkOAAAA; expires=Fri, 26-Nov-2021 06:38:24 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 27 Oct 2021 06:38:24 GMT',
  'Content-Length',
  '1351'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ContainerService/managedClusters')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227e7192a61f5d66e53affe851fa3dfa23c527f45931a30f3ebadbac27cdb42e566d512d9bbb0ff7ce1fde9f1d9c6fdf9b7efa607b7f776f7ffbe1eef4c1f6c1f47ce7c1743639dfdbdfbd5be74db5aea7f9455dad57cdddc5f54f376ddeb47757757559ccf2bab9fb4531adaba63a6fc727d5b2cd8a655ebfceebcb629adf5d64cbec229f9d946b7a899a2eaeeb9ca1bdbbfec1472341adaca619f0018279d6b4ebc67cb3cc1618c747b1b7daeb157fb7a1f32fc2cecd9b84f82aafdb226fe87d210f7f7859348445b1bc78dd662dc37ebd9e4ef37c96cff4556a565d117cfd5edf4d3f9a5633fcfdd1abf512ef7f249fff12f3d2dbf524af973951ed27090dea036d77c77b3be38716f06cd9bcacf3f3e21dbecbde363fdd34b3b7f6dbf35f34e397cc173457e7b3dd4ff7a6e3f9743516a28db31f2cde1e34e3a2b2af653f58d7f9cbaa6eb3f2d94f3c7d1187b0e2ef6f0074912fdb975555beacabf3a264ca3177d163a8e0a68bfae017ccebf4d5b45ad3df8fd25df7d1e5e275f1036e4ff45cceb27af6fb3f7dbdf7fb5fee79af55cdd3a2798b769f3fa196bb7b07ddefde183690b9f6de05d5cbbcf51b7df9dafb7e91bd7b59cd3092dddd1df7b1e1ab9f2cea769d955f64d339f1d4eb6956e6aff3d630113d00706286b5e34158144bfbb9fb345f6693323f5eb71560814b1ea56dbdce5d8bdbb1201ac698903e8fb3a163446a52d5d339096f9db5553dc88cd46ea1a05e5f93e82cbc2faac610f379b15cbf0bbe79fd7b7d852fbe9ad0e0d7de374b0276b6a0e9f17a3cfebd5e4bbbeddd839d7de296bda911dfd9f6decedeee787767bc7bcf8322047c76f6f235bd7f9e954dae5ffd12f9f97d6dfa5123e2ffb22e96d36295199ea5b70cad3e9a9605f1e719ebc4f36cff41b67b6f67fb3cbb3fddde9f4d76b61f4ea7f7b727d34fefefdc9f1eec3fd87fa0a43484e411bd52bdf8794d7a1180be38f9fd8d72a45f9cc6fafd45accc507420af9e1c9fd05b1e0b7c442ae2aaaadf46f035df94eb8b82c907e6a60f0d4c28d16cf6242bb3e59458e3ed1a6d884358ace28dfabdd0ac8b107db96e27c4c0b3b397900efb35918d3e65b6361f1982d077f9f9793e6d8bcb3c7cdb68094f4f50e30fb7464c75323d9b691e35522f84987757eb49594ccf5e1ecf6604b5c99bbbf7ef4da70fcecf27dbf77677ee112b9cef6c4f66070fb6ef3fc82679766f6ff7e0feb9b2023dca77c479fa8ba50649e8eca498d51824b1f1defefe7867bc7377f7533715caa45e2bfe2f684336414dd9d94bafd1ee8ed7a49abecdeb277531bb70b01eec8d771fa06100add27931f2eb33830eca0c8018e1dd31c924ab7ccca2d36f1f09d59486c7a49c1a34f8e894997a268014ce470d33a24ebc350f4fb2a6981abc3e223bcc583fabf35cdfc6bff887e8fa","4bfe1fa0081dacd1080000"], [
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
  'SOUTHEASTASIA:20211027T063825Z:8c867abc-a534-4370-8caa-a48f653f22fc',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11930',
  'x-ms-correlation-request-id',
  '8c867abc-a534-4370-8caa-a48f653f22fc',
  'x-ms-request-id',
  '9f61dde0-a24d-44ca-bbdc-4e8b30526440',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'nginx',
  'Date',
  'Wed, 27 Oct 2021 06:38:25 GMT'
]);
