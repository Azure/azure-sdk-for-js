let nock = require('nock');

module.exports.hash = "4e142f0b08bb4cc710c91bf4a64aa4b9";

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
  '54d4de93-04fa-42b5-8de4-5f95138a3500',
  'x-ms-ests-server',
  '2.1.12249.14 - KRSLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AgsbNztfeAhIg6jL80PIJbg; expires=Fri, 31-Dec-2021 07:14:42 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrmQDkzYISRao_jmQvviQueBaLukki62DNeXxa1JsfawZ8RDTNR2_3iXiOlh2h6bxDWm3mc4_3wrBPovTIRyTRhQ6qYY_KetW13voa7TrWtjXeSE_lwFvu-but2gnzNKN32voji6cZPVVfa6FjvySf85YP_QxA1HUN_zW8HZrq48MgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 01 Dec 2021 07:14:41 GMT',
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
  '5c20cdd3-2e65-4999-871b-c93666983500',
  'x-ms-ests-server',
  '2.1.12249.14 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=Ag2RLWYjxAVHkzMHUIW_fwU; expires=Fri, 31-Dec-2021 07:14:42 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrMFtKpZjGTFnUkdAiq5mk5Ff-LNaPC1B7pXSSMnACfv18kEZKleHCnkPQ4141wJUjcfRaKt8hDsiYgEDl2IAUbEYQM7fQNYIzNheYRuPERdllbJz_a3CHDNe1Ggh4gbWvUrjH4S2vXlhUHBbSXL2IxPNlmDVyysfF4shDnJpsyn8gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 01 Dec 2021 07:14:41 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.3&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=3cc114ce-7f09-43e4-8b2f-92e3ae772399&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '74e93c75-7e31-4cc2-85bf-63998e9d4b00',
  'x-ms-ests-server',
  '2.1.12249.14 - SEASLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Asuqy1kifl9CjexnAkIvTY8WPr5BAQAAAOIXOdkOAAAA; expires=Fri, 31-Dec-2021 07:14:42 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 01 Dec 2021 07:14:41 GMT',
  'Content-Length',
  '1374'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .patch('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.CognitiveServices/accounts/myaccountxxx', {"tags":{"tag1":"value1"}})
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147c5eca3471fdd6dd693665a17abb6a896cddd877be70fefcf0eceb7ef4d3f7db0bdbfbbb7bffd7077fa60fb607abef3603a9b9cefedefdeadf3a65ad7d3fcf3ba5aaf9abb8beb9f6edabc69efaeeaeab298e57573f78b625a574d75de8e4faa8b65d11697f9ebbcbe2ca67973379b4eabf5b2c57bfaebbb77ef3e1a7db4cc163921d4f9b4bd5ee1d3db00a4d6799b5d50ebdff7a3fbf777f677f207f9f60e3ddb3bbbf8879eed4f77b3077b3bf93efdbef3fb7e446f34d784fbe269d6661f3dfac51f4deb3c6bf3d9936b02729eed3fc876efed6c9f67f7a7dbfbb3c9cef6c3e9f4fef664fae9fd9dfbd383fd07fb0f08807de58d607abc5a95c5340339ddb7c72d7db3b7b3b7bbbdbb47d8bcd979f06877ffd1bdfdf1c1ce83877bfb0f7f8a9a9659d37e51cd8af302d0a8fd2d1108df8b62e13789a3b2bf3fdedddd7b78ffd39ffae89750fb4a5f7df4514eafae41dae6ed1a14d2597abd83766f8b2578a83725d49c26a2417bfab94b4d2eb3729defe21d6292555eb705b5a2aff3e56c55154be0346fdb55f3e8ee5de9719cad8af1d4001e2fecfc4fabc55d824f602e8b86702c9617af5ba2314178bd9e4ef37c96cfe87b8299d7cbac3c0382fb937de2ddddfb07d383837dfaf1f0d3fd879fdedb9f1d1c3cf874729eef53fb19813891c9a2177af4b9f7e9f8e1bd073b0f0f76315584db4b7f1834ac695696afe8ede7c5a2a0d1fce28fea7589efbef78b3f7a9bf36c56f5a2ce79443fc8ebf174ddb4d562dcd6598119aaf3657e95952ff3baa808814f77082298faa347bb84db3551bd98be99d755db9634e0d365362981e8795636f9e8a345d64ee72fb31643963e57593bef757a573abd6b3a5de4ed1cbd7df4ad8f7ec9f77fc96833a6d36a75bda8667989d9fda1a22bbddefdc5fcf36cf64bee021542e2bdd0e7979bf145ded29b1bd0a75f7f76f0a76e2dc29f9fbed98472467c7bfd831c9fd25b1d6489c006d7fb3f5bb87ab4565c080f8bfdcb2f5fdf16fd31998a751921b9378a9d9f3592f787f18ad1a12f042ffa8650b303eb4e8b00133523924a98d10b1bc6f22143f1bbbb7b796fbc23824a20ee7e8b7ab56812bb138a032fed7e9d97f6bece4bf7bece4bfbdbab3abf2cf2abe1978726805e9c1553364b3fc42970bdf6102534075edbddf49a37be6695e7d3f9b8b95eb6f3bc2106a6a68323dbfb304191beee067d6d464b4755c1a2fb6ffd2c6338d4ed666497f9bacecafe5b3fcbc80e75bb195919e2d0bb3fcb286feefc06c4abe525f9f7ec1c92002f6de4406f0ea2fd811a5ebabedbd03b25fd922d977999ad6745b509197f18348810d482547f7113a449971a3d3088756ef76a9f90f2a3addafc5dcc3a12c1be49e2493fb7d04468d656f20735fe5943cbefe71668d18fec6d5eab9d07a92ff7e8a52e7a16bbbd0f424e7bfb7a78edd24b83787d90c3d6ac8ad9269c66d574912fdb3760c292f991da0ea2f26124624ea74eaafa2ea6f2ee040d37218756b7c4ec43594b7b31a86d42aa7a9bff6ca2d290a779b94b4ec4061c9e17149a93777a9163f2a8dd30321fc43da4a75aea000e71cdc429a9e39bd1a3ac01da43a10d22f661acd4434c7fcb6fc4ed153b92f4fd0f0b33f55c6fc2ab5c17cdd8263636a077ff83d043373d340809ffebdbb9a15755fdf6bcacae2cd2e355d5b4c868206aeda0ef05cbf8f5ebe37fb7cc96176b62fcbb8f88ff119d6d13c5ad3145d703f842ae8ff10a59f166bc5e4a5e6b4d6d6b4280de1b46f90325daa20c14ee66a64b660913d990f7bf81d678711877e4276ea6fb0f63107be120baa1315edd308cf50af9b4db8ce4873d90f79a8d69b9c68c9cdc621cf4fb373010f1cdc9130f44211cc17b4e05c620d3719b61fcd046b1691ee4fd37f419bdb1095bfafdeba38b3e252f844e396cb74c336d498af9bb1fe4b7c69b9a6d4496fef8c6b0dd80d32f5ad35a0cd19bdca02bc2e30685f8e987a1f58be845b8c09b10529634ec31fea122687abd4bbdd6d7db6f97d515bd77914fb286968eba5813ceddf71ec98bdd96def824ef43a94e8e027e90c719d799fd7b1f3420e98d7c91b0378b9b646709b9b03df8e74b5ab16051ec0c9c354aef0d5a0cd9186f4833fa7e70a01fe6b10afc4d189c67d38d8ee987f50fe89b7a9f10b09f2c9a7556beceb33a1a2f5b4c3e6ccad1d3ddcb07e475160b6249d255dc6d93a3db9b50bc19b9bd0ff343d1c94d489cb046bf1995dd0f47458cc7cdb421d3d452069ad62b2645895ea869172f424611bbff615a48bbd884cf2c3fcf282f450dba5858243e2c9ce9f44d7d53ef1f15cd17c50569050fc26a3da1b5e317798bb8e09896541b82f391e987b0c956190d88f21dbac0491861f9f5c45094daf07a2f7df68c8468fcad11ffc03fa3936ab15a136e243924ddf455e7839f4452cd9ad411b49bfd8b5a877f7f3bcfca763ecdeabcf3c5ef955fafe635a9f8a1cf7f72afffcd4bfee6cb172f7eefce77cfd5163ca395697c33f0f5c0c7bdae5e53505920da1ffa7cf88d9fbc37fccd4bf15d46cfbf3a7b3dc63f445a0e603586af6aa59f9787a14f5e732acbacdcd307cf6845ed95b12ef40e9b0633c565b5060b98e90538878c371d3fa136fe986dfcf8b82c8f5745333234d1eec66133e266b422b1187d644251e2b05ffcd113fa262597b66ad617a4ff48143e9ab7edaa7974f76e4e73b26ec6b4224fc96942b92d2ef33109485d35d5794b9f2dee12be0c80465a96e9c93c9fbefd7a004e89d6ed75aa6aec6b81388302ff20082ff2abe68300b0847d1084efe6930f7a9f449dccd707811083f275414013bdf74b4651017d62d9f77e1fb2925a6179efd78de890184864f7de10481dd8602c2b0dbcaf96a41d9a365bcebe01985fbd224345fae8bde1fcc4f2f80bc411effd62bbfe5ab478c3afa54ff37cf5ddbaa0fce6fb02e869aef78600153dfefab389d7dffba5af2414832a24a5ffdeafd36cc3a0a4d6a2a4dba96661bf0950fafbfb4f460c1812eba997597f5f981057cf526e7f5e5693acf4c00cbcefd61fe8db18240fc4ed30795a4dd718c287c078c34b1deffb16e82a1eddfbbe290c46fa99ed3c192cf9bbad525023bddc1bef7ce330effdacc07449a1dd0f86ae56eb27b1eafec1c0e86f68ccf42749fd9c17d3afc71704240af46c460cf7f5c1ca407f7fb194bf3f79a6ba0af1fb7f9d39da00ecfda724044622552c49fb7eb3a0f6be3950f7de1b54e8bebfe7ebbf0411214f7d4b3129858e649aa6c52a2bcf283cfc687fffc1fd7b07f9fef6c36c32d9dedf994eb7b3d9fea7db7bfbe7d307f7777726079fee1006a48ab365cb6f3cd83b7f78703039df3ef8f47c777b7f373bdf7eb89b4db6f7660fa6b39dddddd964ff01deb85e411e5e5f376dbe386e9ae2629923cc5837796dfe148e9498f317ff925ff2","4bfe1f5f76d3b5c02e0000"], [
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
  'ETag',
  '"55040e7e-0000-0100-0000-61a720e40000"',
  'Vary',
  'Accept-Encoding',
  'X-Content-Type-Options',
  'nosniff',
  'x-ms-request-id',
  'c10fd3f0-4f00-4559-8437-6d5b0f7aa213',
  'x-envoy-upstream-service-time',
  '40',
  'Server',
  'istio-envoy',
  'x-ms-ratelimit-remaining-subscription-writes',
  '1198',
  'x-ms-correlation-request-id',
  '139d3c1e-c1c3-4c9c-931f-d7656a3797b0',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211201T071446Z:139d3c1e-c1c3-4c9c-931f-d7656a3797b0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'Date',
  'Wed, 01 Dec 2021 07:14:46 GMT'
]);
