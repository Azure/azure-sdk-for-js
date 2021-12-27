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
  '35c844ca-d564-432c-ba13-b3e90d2c2100',
  'x-ms-ests-server',
  '2.1.12261.14 - KRSLR2 ProdSlices',
  'Set-Cookie',
  'fpc=Au52ibCsv1xEqkrVT1pvJ3I; expires=Wed, 12-Jan-2022 08:38:24 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevrdup15ObKroXA7tHLTxPAAKh7B-pqCSKeBhTLhqYsPa2kI05G8uwxPPIqB2IIcURUmqEPwPVY5WUVn6uOzywOOSPt8XuNQRtm36TwWY7a2rcc6XFZazqsYjEwmL-HkRcxn6l80Qj0L1FAScH2iuY932FjflkR6kbZvq9IoCwOTNsgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 13 Dec 2021 08:38:23 GMT',
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
  '6e42cbf6-77fe-4524-bb47-09aa6e541f00',
  'x-ms-ests-server',
  '2.1.12261.14 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=ApnVCB4tAYBBoeacCfmGM18; expires=Wed, 12-Jan-2022 08:38:24 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrBA0QkKSHgIDtJfBFg0ari0VLOEfoqLqeDs3JBnPuVucJNb1f6WBJrZyW1tcBaVXO4-6H0-l69Q0qBJs4iRs43e67FLNls1N8Aci6vm_UFHfaRiehW7NMO8kMgDLSYSiFzM7niYCQ4BeYAJEXCMcatP2E-8snmwvzsqpCLVGK598gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 13 Dec 2021 08:38:23 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.3&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=c9260c47-9972-4710-84e5-9b8608bd85a1&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '6e42cbf6-77fe-4524-bb47-09aa72541f00',
  'x-ms-ests-server',
  '2.1.12261.14 - SEASLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Av2W2g2iw55GnWPNfkU54TgWPr5BAQAAAID9SNkOAAAA; expires=Wed, 12-Jan-2022 08:38:24 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 13 Dec 2021 08:38:24 GMT',
  'Content-Length',
  '1374'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Web/sites/mysitexxxx')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147c5eca3471fdd6dd693665a17abb6a896cddd877be70fefcf0eceb7ef4d3f7db0bdbfbbb7bffd7077fa60fb607abef3603a9b9cefedefdeadf3a65ad7d3fcf3ba5aaf9abb8beb9f6edabc69efaeeaeab298e57573f78b625a574d75de8ebf9b4fee36057d4dcdf0f31d3d1f8d3e5a668b9c7a0f3e6baf57f82cf22e7df9b65802dd6cb5a23fca6a9a015ffae0346bdaf4abd7f421f5becaebb6a0e68f7e71b483a6cd5a7cf86abd5c16cb0bfa645e35ed0b6a49af7ccf6b3bce7eb0aef3ab7c820f9af1326f3ffafee823fafbf52a9b028219f236baffea357dd3f037d4475e9e3f2f966fa9d1bc6d57cda3bb77afb2ab669bb09b6d4fcaf5f6dec1bd71b62a3a5d5cd1f0aa2beeead1fefdfdbb5f6356000b4880d251ec8496f42d7ed22841923a5f55f467555fbfa60f410a423c68515d2df3faa347cb75598e3e5a37d945fe5ac9f8a2aa1759494df2653629739a9eb65ee7a38fb2d9a2589e869f69936fdf9ade23ffeb66ba8834a129c11f2f83795fe46d36cbdacc604c74b7df7ecfb205cdd0faddb3773f49bc4a04a6ce2eb3728d2f3efa2523dbe8bb3227916600fd4ba87be2c6d779db122f1174fe903ebbcc8a329b1465d15ef728d534e509b0392f888181125e1a7d346d6afafd7b04714a5d994f31b82faa190190bf0db3be6e4a064c0ddd883c6af52945b0f41d6af9b468782ee8d362f5246bf219017c9537ebb2353d5d1675bbcecab397e68376be5e4c5675b1b44ddaeaab15d19900867f9f5990e61bd789c1e045d59e54cbf3e282f0041a18d81b117e6ab29c65f5cc9f076f687146f8ffcef05e5971fb08fc33ad16ab7538c94d5e5fe6f5b3ac5ef43f392371fae1286ceef29cba4463e2727c504cf355992d691a684c04913ea2e13d3acfca8604bc687eef7c493262fe9ed380eb9fb47f9659d3d23089f1f3d99b62917fd54e692c7b3b7bbbdbbb7bdbbbf7deec1c3cba77f068e7d3f1de7d02df108948d3bccaa7152172fd343fcf68fe0c819dfe9e56cb365fb6c79b64ae5e2f5bea71631b9a935ce60c3a6449dc90d75f9e7fb7aadf12713e7ab43bfa6826283cada6eb05f5481fcaec10ff3dab894fafa8add113fad56abeea7e72ddceab65e7c325cd7ee7a3557595d7afe7795976be2843bd45fa8acc52574d69db3aff456b9ae43775362562597d6cbe5c546dfe349fac2f2e6efcb6031876ed79c5df74de63d1fca25a82c3a9c50951f9a2aa59f76a8369fd55937f912d69726767332224cdc6098909b5504e912675a7cdd95303a2ac2e9aa7459d4fa90f325a3fc89f178bc2caed8cd47f41189dd635a3104172b59e944533a72fd08fe898ee372fb3a6a119b5ef9008848a9ecc13f5441ac11a1a62c5252145747add9226f11a66530299ff5ef9b5f9644e3aaec410572bbfe14c79eb5555d9f190c213d5217fae9bfcdede93a215ce24cb47e6debe4f3af175357d9bb74d67c45979955d375fd2042a8d7f9a8c546752f111490051cf33f7c1879d1708f9936ab1a0a19031b508d2df98b697c52a275e255e709a4db5eef16a55c2fa11288779b13c5eb7f363380e2a9bc1176fc87d581af1976fa66bd2110b02f6b2aa4ac3257d00d166117046493c054f443fecb2445965b3271929444897f990f42b98e4d5ba743c9fbf234d48603ca5518265ed5fd9baadbe9d676577d6f4e300582bd2fca5687ff3e92569217806fedfaf0895fcb8ec42c5572febe292c6feb2aadbe6a4a2419a2f5900a62ff29606faf678ea33d7b4822294df57eb666e7e275796b47341224f08791f8afc62d4c440ac57f52b1ad5ebab6cf5baac0294e1d2975f5cbffe455d8495a35e93b9210b64a610a650be7f273d0d37789b5fff2454f7abfc3caff3a56b621a1424dbd3754d9f909b40b2cb426c074b1278f6f51a10d77c419263da416deeedd8d1895f4cfcfaa66c3aa24510bf887d7edeae9a806b5775fe5d32d2f9ec6c49b10d0d2d98cdf3f5921121ee7f4dc4358a72875021b66ae727f37cfaf665d6dab93c27cd7942cae9223f5ecf8ad6a2aadf2ab886cc2fc48261aab22796ecb4266504a30a5bff53d5d2624ce32d16ebc529fc8162da419b30630bf29a20d2941203e2734b68212029bd77d7cfcacc7214ba012b9bbf49b40bd235eb8610746108be23ef7c463e4c750db604837ce45c4b32a44d872549d6cec95117feaabdd045be6edeae0902cd8738acf4c1748120eab86c2a1ac16a856e55e1b6597d91b786ef0d0438864c3942b75a02a9e16f68d8981ed3605a16f4e131e147f4bfb6a314a6922f1168d82f140ff78d686672487fd19a8c29d077df9dbe9b966b301e98c38e17383101ac876da0ceaa05f139312bb977a2d945c4c8d9734a4334f1d3485342e3fefd677ba7fbfbf7ee1f7ffa60ffe0d9cec9bde3fd4f3ffdf4fecefd27f73e7db0b7bfffe9f143faeff4d9d3a7277b3bcf1e1e9c3e3b3ddd7f72ffe9c9c983839d07a7847e9020289613629dd9d9ea783623579590205f73bcff70bcbbb33fbebf432dc80f6f0a1ac559a725e6b7db96e48e64595d058f677edfdff777737f48bbc6b00935c49fd1f09fbee8443164e7e0c3219ae128fdeed5d5550d3780e2ef751bc1f0fede786f6f7ffce0607c7f6f0444f7ef8f771f10cebbfb23feee531ec1831def2f8a04cc5ff777fc96f86b7f6fd419b5a1d0973f3404bcbf1e3cb0400f76c77b3bf7cd97fb0763fa4effa0967bf7dc7bbb84bcffc7ee81ffd7fd87fe5f0ffcbf3cf8f86bcf7db737f6f0da1b7ffaa9f78707626ffcd041a03f1c867be3dd3dfd8ba8f570fcc06fb7fba90f62f7a1230ffdd8711ddf1bbbb7ee05e3a2bf1efa7f512fdd7924c7541c3838cbac6467e4225f7f413e7e7d0dfdfc13eb0a6e2c7dd1ac9b55be9c21442b6d800b7e3422ff2acf1ad8236a6bccc1e93b327df8e52bd244cd0939bbd489bcb9c8debde88652f2cdbc22fbd1668b1571524f3e80734976657971b63cafdc2b5d9508cd21dfb599f3a289435dac4be04db04b503586f344d4896f47204910e905580456da6474d7b607d821f2a64b7220540192025d9315584eaf55adbe80c9831a22b57d4118355f920f68d59d80b9c82b222b790b13269f054f79087867a7cbd9aaa28c04b94f1a57500ba48826eba29c9106858236ef887d7912f966515c48c71803a1269f92737e01d9a608c90fd23e82ab207e14fd465f3623fa693e814fd0f98c906b2a06e37ffaed376f5e763e3a7b491e520cc2cb326bcf290ce78f61b1f10b918e8c85e703583365284e4c8060425dd5d7eb094d9823ed0697efa3d7d7c40e8b63d26d174b02f84b7e","c9ff03966ac7c009170000"], [
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
  '"1D7EFFCBFFC50A0"',
  'Vary',
  'Accept-Encoding',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '7bf5a5fb-59ad-4090-9462-e2ad4ca42640',
  'Server',
  'Microsoft-IIS/10.0',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11998',
  'x-ms-correlation-request-id',
  'fe5d6135-2b4b-4ea7-a36b-e3f76c1979ad',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T083825Z:fe5d6135-2b4b-4ea7-a36b-e3f76c1979ad',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 08:38:24 GMT'
]);
