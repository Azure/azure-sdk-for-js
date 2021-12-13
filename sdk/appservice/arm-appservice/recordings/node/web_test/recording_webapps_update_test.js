let nock = require('nock');

module.exports.hash = "92d7bf919355037888d4505297dfc444";

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
  '515b7f7a-a6ec-4d9d-a61d-90fd8cc62200',
  'x-ms-ests-server',
  '2.1.12261.14 - KRSLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AnBM-zSrzzZPuq7F0hSMFlg; expires=Wed, 12-Jan-2022 08:18:06 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr7w4M00PVJayNw9r2IYPMtNcZF2Ue1MUkBCsS1RxE2PY0fBAxL0Qqz0i5q1_n4qV6--luXe-lJnA4FeoKTOFc4OrkZ_TXbK87KkdJ2kBA3bNBce6LcxEd7vL1n8ddlZjaD-Fn_THEdP4IP6EkEcg-uOOZSjASJLCsDH62hCUZv6YgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 13 Dec 2021 08:18:05 GMT',
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
  '59116ad3-9ebb-4758-b576-daba43cb2300',
  'x-ms-ests-server',
  '2.1.12261.14 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AmabHQ_p2J9IqGwZA3HKIDM; expires=Wed, 12-Jan-2022 08:18:06 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrrAMgQk0Qq6Iml2XQzomUDB4-5pASYd8ko9Cy9qSPV_VJBmsXbqDUI8W1HdhmtLnbmBRmyYgA_C2ibKP5ysQL4SbPC1iYqwt8Bif6xQAbkQ_w68bDAQZj8_N3suMUYmeF-Y6_Tv9lIdG3cV5GkDQk3KsefWOhsb_e-Z78XVzFgTIgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 13 Dec 2021 08:18:05 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.3&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=fd9a268c-72bf-4123-b179-0f73c38cc976&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '515b7f7a-a6ec-4d9d-a61d-90fd96c62200',
  'x-ms-ests-server',
  '2.1.12261.14 - KRSLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AqWuDBthCh5Hsjrf5VzhEPoWPr5BAQAAAL74SNkOAAAA; expires=Wed, 12-Jan-2022 08:18:06 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 13 Dec 2021 08:18:05 GMT',
  'Content-Length',
  '1374'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .patch('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Web/sites/mysitexxxx', {"properties":{"serverFarmId":"/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Web/serverfarms/myappserviceplanxxx","reserved":false,"isXenon":false,"hyperV":false,"siteConfig":{"netFrameworkVersion":"v4.6","localMySqlEnabled":false,"http20Enabled":true},"scmSiteAlsoStopped":false}})
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147c5eca3471fdd6dd693665a17abb6a896cddd877be70fefcf0eceb7ef4d3f7db0bdbfbbb7bffd7077fa60fb607abef3603a9b9cefedefdeadf3a65ad7d3fcf3ba5aaf9abb8beb9f6edabc69efaeeaeab298e57573f78b625a574d75de8ebf9b4fee36057d4dcdf0f31d3d1f8d3e5a668b9c7a0f3e6baf57f82cf22e7df9b65802dd6cb5a23fca6a9a015ffae0346bdaf4abd7f421f5becaebb6a0e68f7e71b483a6cd5a7cf86abd5c16cb0bfa645e35ed0b6a49af7ccf6b3bce7eb0aef3ab7c820f9af1326f3ffafee823fafbf52a9b028219f236baffea357dd3f037d4475e9e3f2f966fa9d1bc6d57cda3bb77afb2ab669bb09b6d4fcaf5f6dec37be36c5574bab8a2e15557dcd5a3fdfbfb77bfc6ac00169000a5a3d8092de95bfca451822475beaae8cfaabe7e4d1f82148478d0a2ba5ae6f5478f96ebb21c7db46eb28bfcb592f145552fb2929ae4cb6c52e6343d6dbdce471f65b345b13c0d3fd326dfbe35bd47fed7cd7411694253823f5e06f3bec8db6c96b599c198e86ebffd9e650b9aa1f5bb67ef7e927895084c9d5d66e51a5f7cf44b46b6d177654e22cd00fa9750f7c48daff3b6255e22e8fc217d769915653629caa2bdee51aa69ca1360735e10030325bc34fa68dad4f4fbf708e294ba329f62705f543302207f1b667ddd940c981aba1179d4ea538a60e93bd4f269d1f05cd0a7c5ea49d6e43302f82a6fd6656b7aba2cea769d95672fcd07ed7cbd98acea62699bb4d5572ba233010cff3eb320cd37ae1383c18baa3da996e7c505e1093430b03722fcd46439cbea993f0fded0e28cf0ff9de1bdb2e2f611f8675a2d56eb70929bbcbecceb6759bde87f7246e2f4c351d8dce5397589c6c4e5f8a098e6ab325bd234d09808227d44c37b749e950d0978d1fcdef99264c4fc3da701d73f69ff2cb3a6a56112e3e7b337c522ffaa9dd258f676f676b777f7b677efbdd93978b47bf068e760bc4fd01ba210299a57f9b4223cae9fe6e7194d9fa1af53dfd36ad9e6cbf67893c8d5eb654b1d6e6c435392cb9441852c8919f2facbf3ef56f55ba2cd478f76471fcd0485a7d574bda01ee943991c62bf6735b1e915b5356a42bf5acd57dd4faedb79b5ec7cb8a4c9ef7cb4aaaef2faf53c2fcbce1765a8b6485d9155ea6a296d5be7bf684d73fca6cea6442cab8ecd978baacd9fe693f5c5c58ddf7600c3ac3daff89bce7b2c995f544b3038b538212a5f5435ab5e6d30adbf6af22fb2254deeec6c4684a4d9382129a116ca28d2a4eeb4397b6a4094d545f3b4a8f329f54136eb07f9f3625158b19d91f62f08a3d3ba66142248aed693b268e6f405fa1115d3fde665d63434a3f61d928050cf9375a29e4821583b43acb824a4884eaf5b52245ec36c4a20f3df2bbf369fcc49c59518e26ae5379c296fbdaa2a3b1ed277a239e4cf7593dfdb7b52b4c29964f8c8dadbf74925beaea66ff3b6e98c382bafb2ebe64b9a40a5f14f938dea4c2a3e220920ea79d63ef8b0f302217f522d163414b2a51641fa1bd3f6b258e5c4abc40b4eb1a9d23d5ead4a183f02e5302f96c7eb767e0cbf416533f8e20d790f4b23fef2cd744d3a6241c05e565569b8a40f20da2c02ce2889a7e089e8875d9628ab6cf624237d08e9321f927a0593bc5a978ee7f377a408098ca7344ab0acfd2b5bb7d5b7f3acecce9a7e1c006b459abf14e56f3ebd242d04c7c0fffb15a1921f975da8f8ea655d5cd2d85f5675db9c543448f3250bc0f445ded240df1e4f7de69a565084f2fb6addcccdefe4c992762e48e40921ef43915f8c9a1888f5aa7e45a37a7d95ad5e975580323cfaf28bebd7bfa88bb072d46bb2366480cc14c212caf7efa4a7e1066ff3eb9f84ea7e959fe775be744d4c8382647bbaaee913f2124876598869b0e45b15abe3d98c4c1dfdf5d1f1f29ab46dc6dfe2cfb2acaee803f21a48c5011a5909d126f25d9a95302db3dc1a6bff9b3413f2c20b20213ffb7f2d0ec4fb5f90fc1b6241f9efedd83912e79ea4ee4dd974140441fc22f6f979bb6a02d95bd5f977c9d3c867674b0ad06882029e3c5f2f191192e1d7c42246ddef102a241cedfc649e4fdfbecc5acb91e7a4ff4f48c55ee4c7eb59d15a54f55b05d7901301e166986ab248b03aad49a5c23580c3f253d5d2624ce32d16ebc5299c9a62da419b30633bf89a2012639218e1739a3d79570848aafbddf5b332b372816e2090e66f52500569cc754308ba580adf5188312347acba867081cd3f72fe31cd75d3112cd218e7146d8894d45efc255f376fd70481e643bc6efa60ba4024785c36158d60b542b76a36daacbec85b23bd0602bc5ba61ca15b2d81d4f037346c4c8f69302d0bfaf098f023fa5fdb510a53c9978896ec178a87fb46ec0b79d5bf684d2e01d077df9dbe9b966b301e98c38e173831016c9860a0ceaa05f139312bf9a8629f445190c7ea549fd893a791a684c6fdfbcff64ef7f7efdd3ffef4c1fec1b39d937bc7fb9f7efae9fd9dfb4fee7dfa606f7fffd3e387f4dfe9b3a74f4ff6769e3d3c387d767abaffe4fed3939307073b0f4e09fd20cb512c27c43ab3334f01eced8cf71f8e7777f6c7f73fa516144c34058de2acd312f3db6d4b7247b2ac0e8fc733bfefeffbbbb93fa45d63d8841ae2cf680e83bee8846264ade1892224e354c3ddababab1ace0c2511d66d1cc3dd9dbdf1eea7e3dd87f747e6af83f1ee9eff87ffcdfd5def8f4ffd660feee10f7fc086385ffe90fa367fecfb7f7ceafd71f0d0fbe3a1ffcdee8e0f7b77c7ef76f79e0f7df75ef09df47cb03bfe74777c2f80f880dbe19bbdf1dede03fc61bf0afe3ad809fef2b1dfdb61f0f62f0669feda73a3793876d4783876d03119f60f22f4a78c2170daa1f7fd7776b95b7ff6c89f16bf133e3e6bd51979f6d75f5068525f4321ffc4ba82f74d5f34eb66952f67082cc9dca9a482018d8cbfcab3060688da1afd7ffa8e6c1d7ef98a544f73423e3a75226f2eb2772fba11a07c33afc860b4d96245fcd31308e05c9221595e9c2dcf2bf74a57074255c8776de69c7fe24b17a1137813a213540d3d3d9974f2da9140923c7a012680b53459d9b5ed018687828092bc04d578a431d7a4f697d36bd5a32f60e3a077484f5f1046cd97e4ba5afd26602ef28ac84aeec184c967c1930f02a7f274395b55944721af4fc321db62b22eca19294de864f399989427916f16c585748d511072f22945151790690aedfce8f2237807e200d26ff46533a29fe613b8019dcf08bda66230fea7df7ef3e665e7a3b397e414c520bc2cb3f69cf207fc318c347e21e2917df0ccbeb54c86e6c4068882d4c77ebd9ed09439e26ef0553f7a7d4d0cb138269d76b12480bfe4","97fc3f9d0721bcc1170000"], [
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
  '848ad041-2d92-453d-9e57-ca465545c739',
  'Server',
  'Microsoft-IIS/10.0',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'x-ms-ratelimit-remaining-subscription-resource-requests',
  '498',
  'x-ms-correlation-request-id',
  'f4531d60-6094-4ab5-8b74-4b138ec31123',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T081811Z:f4531d60-6094-4ab5-8b74-4b138ec31123',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 08:18:10 GMT'
]);
