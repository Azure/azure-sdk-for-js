let nock = require('nock');

module.exports.hash = "9b1f648b9d2d41a7bd9932eaf6933bad";

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
  '59116ad3-9ebb-4758-b576-daba99c92300',
  'x-ms-ests-server',
  '2.1.12261.14 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AiA_OjsFkzNPosaq-5rnl5Y; expires=Wed, 12-Jan-2022 08:17:37 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr38VEd4v8frx1Ls0Awzyv9CxcO_xBamI-1qS678e0YeEqom4HOpS5VKh5yuuc7JsW7Gv9DlHddi6A0jU2AeGiULiILVkKUDqdvKm4uOw62o6Hg1u0tZY6fBDPbVCtHZ05XrIksRSf3s-zetPO_-IC0usUSBMKDNO7LamqLQurANAgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 13 Dec 2021 08:17:37 GMT',
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
  'd23ce388-4b2d-4a91-bf43-5a2ddb222300',
  'x-ms-ests-server',
  '2.1.12261.14 - KRSLR1 ProdSlices',
  'Set-Cookie',
  'fpc=Al1uG01hVGNJjF9lYwajFrY; expires=Wed, 12-Jan-2022 08:17:38 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrBj-4MgAIp3WRwZd1xjh2u-S0-yPgvF60DeXPSH-ltvT-R5IUkVlp78wfXl-R2i84uYCbQH298xwgv_LNVzRzsvUWECJ3rKtLE2GKmcYzb7yQg5Hny9huIOYRTGdy5nWuhyhp47O0iPr8jajCjWrhPxUUwSJrZQ3jxla_glpbt4AgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 13 Dec 2021 08:17:37 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.3&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=fde18fe9-d866-4909-9095-716205dc348a&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '59116ad3-9ebb-4758-b576-dabaa0c92300',
  'x-ms-ests-server',
  '2.1.12261.14 - SEASLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AuSkT1lxnG9Lo8cvzf1jmIQWPr5BAQAAAKH4SNkOAAAA; expires=Wed, 12-Jan-2022 08:17:38 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 13 Dec 2021 08:17:37 GMT',
  'Content-Length',
  '1374'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .put('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Web/sites/mysitexxxx', {"location":"eastus","properties":{"serverFarmId":"/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Web/serverfarms/myappserviceplanxxx","reserved":false,"isXenon":false,"hyperV":false,"siteConfig":{"netFrameworkVersion":"v4.6","appSettings":[{"name":"WEBSITE_NODE_DEFAULT_VERSION","value":"10.14"}],"localMySqlEnabled":false,"http20Enabled":true},"scmSiteAlsoStopped":false,"httpsOnly":false}})
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147c5eca3471fdd6dd693665a17abb6a896cddd877be70fefcf0eceb7ef4d3f7db0bdbfbbb7bffd7077fa60fb607abef3603a9b9cefedefdeadf3a65ad7d3fcf3ba5aaf9abb8beb9f6edabc69efaeeaeab298e57573f78b625a574d75de8ebf9b4fee36057d4dcdf0f31d3d1f8d3e5a668b9c7a0f3e6baf57f82cf22e7df9b65802dd6cb5a23fca6a9a015ffa20cf9a768d06d4f92aafdb825a3ffac551f84d9bb5f8f0d57ab92c9617f4c9bc6ada17d4925ef99ed7769cfd605de757f9041f34e365de7ef4fdd147f4f7eb5536050433e2ed53eafdabd7f44dc3df501f7979febc58bea546f3b65d358feedebdcaae9a6dc26eb63d29d7db7b0fef8db355d1e9e28a46575d71578ff6efefdffd1a9302584002848e6227a4a46ff193460992d4f9aaa23fabfafa357d085210e2418bea6a99d71f3d5aaecb72f4d1bac92ef2d74ac61755bdc84a6a922fb34999d3ecb4f53a1f7d94cd16c5f234fc4c9b7cfbd6f41ef95f37d345a4094d09fe7819ccfb226fb359d6660663a2bbfdf67b962d6886d6ef9ebdfb4962552230757699956b7cf1d12f19d946df9539893403e85f42dd1333becedb967889a0f387f4d9655694d9a4288bf6ba47a9a6294f80cd7941fc0b94f0d2e8a36953d3efdf238853eaca7c8ac17d51cd0880fc6d98f5755332606ae846e451ab4f2982a5ef50cba745c373419f16ab275993cf08e0abbc5997ade9e9b2a8db75569ebd341fb4f3f562b2aa8ba56dd2565fad88ce0430fcfbcc8234dfb84e0c062faaf6a45a9e17178427d0c0c0de88ec5393e52cab67fe3c78438b33c2ff7786f7ca8adb47e09f69b558adc3496ef2fa32af9f65f5a2ffc91989d30f475f7397e7d4251a1397e383629aafca6c49d340632288f4110defd179563624e045f37be74b9211f3f79c065cffa4fdb3cc9a9686498c9fcfde148bfcab764a63d9dbd9dbdddedddbdebdf766e7e0d1ee8347fb7be387f73ea5e701f5d1109d48ddbccaa7156173fd343fcf68120d959d129f56cb365fb6c79b04af5e2f5bea76631b9a985c260e8a64492c91d75f9e7fb7aadf12853e7ab43bfa6826283cada6eb05f5481fca1411133eab8959afa8ad5116fad56abeea7e72ddceab65e7c325b140e7a3557595d7afe7795976be2843e5454a8b6c53575769db3aff456b9ae9377536256259a56cbe5c546dfe349fac2f2e6efcb60318c6ed79c5df74de63f9fca25a82cda9c50951f9a2aa59016b8369fd55937f912d69726767332224cdc609c90ab55076912675a7cdd95303a2ac2e9aa7459d4fa90fb25c3fc89f178bc20aef8c6c4041189dd635a3104172b59e944533a72fd08f289aee372fb3a6a119b5ef901c84da9e6c14f5446ac15a1b62c5252145747add923af11a66530299ff5ef9b5f9644e8aaec410572bbfe14c79eb5555d9f190d613fd217fae9bfcdede93a215ce24f34736dfbe4f8af175357d9bb74d67c45979955d375fd2042a8d7f9a2c556752f111490051cfb3f9c1879d1708f9936ab1a0a19045b508d2df98b697c52a275e255e70ea4d55eff16a55c20412288779b13c5eb7f363780f2a9bc1176fc887581af1976fa66bd2110b02f6b2aa4ac3257d00d166117046493c054f443fecb2445965b3271969454897f990942c98e4d5ba743c9fbf237548603ca5518265ed5fd9baadbe9d676577d6f4e300582bd2fca59800f3e9256921b807fedfaf0895fcb8ec42c5572febe292c6feb2aadbe6a4a2419a2f5900a62ff29606faf678ea33d7b4822294df57eb666e7e277f96b47341224f08791f8afc62d4c440ac57f52b1ad5ebab6cf5baac0294e1d6975f5cbffe455d8495a35e93cd213364a610f650be7f273d0d37789b5fff2454f7abfc3caff3a56b621a1424dbd3754d9f90af40b2cb424c83250fab581dcf6664f0e8af8f8e97d7a46d33fe167f966575451f90ef402a0ed0c84a883691efd2ac846999e5d664fbdfa4999017be0009f9d9ff6b7120deff82e4df100bca7f6fc7ce912a1412bb3765d3d11004f28bd8e7e7edaa09846f55e7df2587239f9d2d294ea3190a98f27cbd644c48885f138f187dbf43b89074b4f393793e7dfb326b2d4b9e930138211d7b911faf67456b71d56f155c435e04a49b61aacd22c9eab4269d0adf007ecb4f554b8b318db758ac17a7f06d8a69076dc28c0de16b82489c497284cf69fae45da120e9ee77d7cfcacc0a06ba81449abf494315a432d70d21e8422a7c4791c68cfcb1ea1ad2053effc8b9c934d94d47b248659c53d02162527b61987cddbc5d13049a0f71bee983e90201e171d9543482d50addea34b7597d91b7467c0d0438b94c3942b75a02a9e16f68d8981ed3605a16f4e131e147f4bfb6a394c051be44d064bf503cdc376260c8b9fe456bf20980befbeef4ddb45c83f1c01c76bcc0890960a3050375562d88d18959c9551503259a821c57a7fbc4a03c8d342534eedf7fb677babf7feffef1a70ff60f9eed9cdc3bde278ff6fecefd27f73e7db0b7bfffe9f143faeff4d9d3a7277b3bcf1e1e9c3e3b3ddd7f72ffe9c9c983839d07a7847e90eb289613629dd999a701f676c6fb0fc7bb3bfbe3fb9f520b8a299a824671d66989f9edb625b92361568fc7e399dff7f7fddddc1fd2ae316c420df1673495415f74223232d77045119971c6e1eed5d5550d6f867209eb368ee1eecede78f7d3f1eec3fb23f3d7c17877cfffc3ffe6feaef7c7a77eb307f7f0873f60439c2f7f487d9b3ff6fd3f3ef5fe3878e8fdf1d0ff6677c787bdbbe377bb7bcf87be7b2ff84e7a3ed81d7fba3bbe17407cc0edf0cdde786fef01feb05f057f1dec047ff9d8efed3078fb1783347fedb9d13c1c3b6a3c1c3be8980cfb0711fa53c61038edd0fbfe3bbbdcad3f7be4508be309279fb5ea8c5cfbeb2f2836a9afa1907f625dc1fda62f9a75b3ca9733c49764ef5452c18046c65f51aa100688da1afd7ffa8e8c1d7ef98a544f73424e3a75226f2eb2772fba21a07c33afc860b4d96245fcd31308e05c9221595e9c2dcf2bf74a57074255c8776de6bc7fe24b17a8137813a913548d3d3d9974f2da9140923c7a012680b53459594a906a0f303c140594e426a8c6238db926b5bf9c5eab1e7d011b07bd437afa82306abe24dfd5ea37017391574456f20f264c3e0b9e9c107895a7cbd9aaa2740ab97d1a0fd916937551ce486942279bcfc4a43c897cb3282ea46b8c8290934f29acb8804c536ce787971fc13b100f907ea32f9b11fd349fc00de87c46e8351583f13ffdf69b372f3b1f9dbd24af2806e16599b5e79440e08f61a4f10b118fec8367f6ad65323427364018a44ef6ebf584a6cc117783b3fad1eb6b6288c531e9b48b2501fc25bf","e4ff01f5330aaac7170000"], [
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
  'f14ef457-fc0d-4045-a34b-ec340a469791',
  'Server',
  'Microsoft-IIS/10.0',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'x-ms-ratelimit-remaining-subscription-resource-requests',
  '499',
  'x-ms-correlation-request-id',
  'bd172629-2c1a-4d13-bfe2-52d8dfbf49ac',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T081801Z:bd172629-2c1a-4d13-bfe2-52d8dfbf49ac',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 08:18:00 GMT'
]);
