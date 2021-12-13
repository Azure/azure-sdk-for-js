let nock = require('nock');

module.exports.hash = "f2d87a377b87fe0ff04c8b0a51a3451c";

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
  '59116ad3-9ebb-4758-b576-daba1ecb2300',
  'x-ms-ests-server',
  '2.1.12261.14 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=Avqrjhadt4dPhNgF5VTMKGc; expires=Wed, 12-Jan-2022 08:18:02 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevry1spEV6fOea86OT8LyDwIKzODJU-TXErUiUlSBcV-9H3Z82TCNfAGH2Qr-ukldkbH4NBykE0Cx5zqx7RVxzwxH2e5WpEzhvqH4CMCzFh3Eg2zCSLpU_2EkLaSjIGJJe5_Jy-12P1FUaNsbbvL2j_-KYyBNKaxodEbFEs2Udl6SwgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 13 Dec 2021 08:18:01 GMT',
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
  '32f80083-0b31-4244-a179-32a9348b2100',
  'x-ms-ests-server',
  '2.1.12261.14 - KRSLR2 ProdSlices',
  'Set-Cookie',
  'fpc=Am0zhxEOb1pHsuzrGHGNLyM; expires=Wed, 12-Jan-2022 08:18:02 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr6IKr7x5GaJ_oefm9xo8ft0dU6JOksCwIOAJP0JvtWDaDrtMH8AWDjwpPQGIPE8zlw09Lj9BngMfmuVtXJ8-BCz4TZXsF2Wxkc2K2vN-kYEwcIp2v72dMEmlww3T0vDcwgDYqNtDz9RwdDI9p3RQUcRrI86rKjUpn4VmbiQ3vJRkgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 13 Dec 2021 08:18:01 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.3&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=f5135972-8b44-4551-9b4d-04d095e9244a&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '1306231f-1899-4d48-aeca-9001266c2200',
  'x-ms-ests-server',
  '2.1.12261.14 - SEASLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AhlEAMkK369GkT0NzR0ib0sWPr5BAQAAALr4SNkOAAAA; expires=Wed, 12-Jan-2022 08:18:03 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 13 Dec 2021 08:18:02 GMT',
  'Content-Length',
  '1374'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Web/sites/mysitexxxx')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147c5eca3471fdd6dd693665a17abb6a896cddd877be70fefcf0eceb7ef4d3f7db0bdbfbbb7bffd7077fa60fb607abef3603a9b9cefedefdeadf3a65ad7d3fcf3ba5aaf9abb8beb9f6edabc69efaeeaeab298e57573f78b625a574d75de8ebf9b4fee36057d4dcdf0f31d3d1f8d3e5a668b9c7a0f3e6baf57f82cf22e7df9b65802dd6cb5a23fca6a9a015ffae0346bdaf4abd7f421f5becaebb6a0e68f7e71b483a6cd5a7cf86abd5c16cb0bfa645e35ed0b6a49af7ccf6b3bce7eb0aef3ab7c820f9af1326f3ffafee823fafbf52a9b028219f236baffea357dd3f037d4475e9e3f2f966fa9d1bc6d57cda3bb77afb2ab669bb09b6d4fcaf5f6dec37be36c5574bab8a2e15557dcd5a3fdfbfb77bfc6ac00169000a5a3d8092de95bfca451822475beaae8cfaabe7e4d1f82148478d0a2ba5ae6f5478f96ebb21c7db46eb28bfcb592f145552fb2929ae4cb6c52e6343d6dbdce471f65b345b13c0d3fd326dfbe35bd47fed7cd7411694253823f5e06f3bec8db6c96b599c198e86ebffd9e650b9aa1f5bb67ef7e927895084c9d5d66e51a5f7cf44b46b6d177654e22cd00fa9750f7c48daff3b6255e22e8fc217d769915653629caa2bdee51aa69ca1360735e10030325bc34fa68dad4f4fbf708e294ba329f62705f543302207f1b667ddd940c981aba1179d4ea538a60e93bd4f269d1f05cd0a7c5ea49d6e43302f82a6fd6656b7aba2cea769d95672fcd07ed7cbd98acea62699bb4d5572ba233010cff3eb320cd37ae1383c18baa3da996e7c505e1093430b03722fcd46439cbea993f0fded0e28cf0ff9de1bdb2e2f611f8675a2d56eb70929bbcbecceb6759bde87f7246e2f4c351d8dce5397589c6c4e5f8a098e6ab325bd234d09808227d44c37b749e950d0978d1fcdef99264c4fc3da701d73f69ff2cb3a6a56112e3e7b337c522ffaa9dd258f676f676b777f7b677efbdd93978b4fbe0d1febdf1a7f7087c4324224df32a9f5684c8f5d3fc3ca3f9330476fa7b5a2ddb7cd91e6f92b97abd6ca9c78d6d684e729933e8902571435e7f79feddaa7e4bc4f9e8d1eee8a399a0f0b49aae17d4237d28b343fcf7ac263ebda2b6464fe857abf9aafbc9753baf969d0f9734fb9d8f56d5555ebf9ee765d9f9a20cf516e92b324b5d35a56debfc17ad6992dfd4d9948865f5b1f97251b5f9d37cb2beb8b8f1db0e60d8b5e7157fd3798f45f38b6a090ea7162744e58baa66ddab0da6f5574dfe45b6a4c99d9dcd8890341b272426d44239459ad49d36674f0d88b2ba689e16753ea53ec868fd207f5e2c0a2bb73352ff0561745ad78c4204c9d57a5216cd9cbe403fa263badfbccc9a8666d4be4322102a7a324fd41369046b688815978414d1e9754b9ac46b984d0964fe7be5d7e69339e9b812435cadfc8633e5ad575565c7430a4f5487fcb96ef27b7b4f8a5638932c1f997bfb3ee9c4d7d5f46dde369d1167e55576dd7c4913a834fe6932529d49c5472401443dcfdc071f765e20e44faac5828642c6d422487f63da5e16ab9c789578c16936d5bac7ab5509eb47a01ce6c5f278ddce8fe138a86c065fbc21f76169c45fbe99ae49472c08d8cbaa2a0d97f401449b45c01925f1143c11fdb0cb126595cd9e64a410215de643d2af609257ebd2f17cfe8e342181f194460996b57f65ebb6fa769e95dd59d38f0360ad48f397a2fdcda797a485e019f87fbf2254f2e3b20b155fbdac8b4b1afbcbaa6e9b938a0669be640198bec85b1ae8dbe3a9cf5cd30a8a507e5fad9bb9f99d5c59d2ce05893c21e47d28f28b511303b15ed5af6854afafb2d5ebb20a50864b5f7e71fdfa177511568e7a4de6862c9099429842f9fe9df434dce06d7efd9350ddaff2f3bcce97ae896950906c4fd7357d426e02c92e0bb11d2c49e0d9d76b405cf305498e6907b5b9b76347277e31f1eb9bb2e9881641fc22f6f979bb6a02ae5dd5f977c948e7b3b325c53634b46036cfd74b4684b8ff3511d728ca1d4285d8aa9d9fccf3e9db97596be7f29c34e70929a78bfc783d2b5a8baa7eabe01a32bf100b86a9ca9e58b2d39a94118c2a6cfd4f554b8b318db758ac17a7f0078a69076dc28c2dc86b8248534a0c88cf2da18580a4f4de5d3f2b33cb51e806ac6cfe26d12e48d7ac1b42d08521f88ebcf319f930d535d8120cf291732dc990361d9624593b27475df8abf64217f9ba79bb2608341fe2b0d207d30582a8e3b2a96804ab15ba5585db66f545de1abe3710e01832e508dd6a09a486bfa161637a4c836959d087c7841fd1ffda8e52984abe44a061bf503cdc37a299c921fd456b32a640df7d77fa6e5aaec178600e3b5ee0c404b01eb6813aab16c4e7c4ace4de896617112367cf290dd1c44f234d098dfbf79fed9deeefdfbb7ffce983fd83673b27f78ef73ffdf4d3fb3bf79fdcfbf4c1defefea7c70fe9bfd3674f9f9eeced3c7b7870faecf474ffc9fda727270f0e761e9c12fa4182a0584e88756667abe3d98c5c5542827ccdf1fec3f1eecefef8fea7d482fcf0a6a0519c755a627ebb6d49ee4896d555f078e6f7fd7d7f37f787b46b0c9b5043fc190dffe98b4e1443760e3e1ca2198ed2ef5e5d5dd5700328fe5eb7710c7777f6c6bb9f8e771fde1f99bf0ec6bb7bfe1ffe37f777bd3f3ef59b3db8873ffc011be27cf943eadbfcb1effff1a9f7c7c143ef8f87fe37bb3b3eecdd1dbfdbdd7b3ef4dd7bc177d2f3c1eef8d3ddf1bd00e2036e876ff6c67b7b0ff087fd2af8eb6027f8cbc77e6f87c1dbbf18a4f96bcf8de6e1d851e3e1d841c764d83f88d09f3286c06987def7dfd9e56efdd9234f543c3678c7ac5567e4135f7f414e7d7d0d85fc13eb0a7e2b7dd1ac9b55be9c21262b6d440b063432fe2acf1a18206a6bf4ffe93bb275f8e52b523dcd0979b7d489bcb9c8debde8c64ef2cdbc2283d1668b15f14f4f2080734986647971b63cafdc2b5d1d085521dfb599739b892f5d704be04d744b503568f364d2c96b470249f2e8059800d6d26465d7b607181e729f4bf21854e391c65c93da5f4eaf558fbe808d83de213d7d4118355f92d367f59b80b9c82b222bb90713269f054f8907b863a7cbd9aaa21404f94b1a48500be48426eba29c91ca844636ef88417912f966515c48c71803a1269f92377e0189a690c88fca3e826f208e13fd465f3623fa693e8113d0f98c906b2a06e37ffaed376f5e763e3a7b492e510cc2cb326bcf29eee68f61a2f10b918eac8367f4ad5d3214272640f4a0bee9ebf58426cc9176838ff7d1eb6b6287c53169b48b2501fc25","bfe4ff017e2fd3bcfa160000"], [
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
  'ETag',
  '"1D7EFF9E73F4EE0"',
  'Vary',
  'Accept-Encoding',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'cd289bc9-9a73-40a8-b8b2-b6f4d54ba98d',
  'Server',
  'Microsoft-IIS/10.0',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11998',
  'x-ms-correlation-request-id',
  '4e659efc-9f63-4a8b-939b-df6c66aed9d6',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T081803Z:4e659efc-9f63-4a8b-939b-df6c66aed9d6',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 08:18:02 GMT'
]);
