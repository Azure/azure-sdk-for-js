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
  '32ea23f5-8af6-4214-946f-0c6968ad0200',
  'x-ms-ests-server',
  '2.1.12261.17 - KRSLR2 ProdSlices',
  'Set-Cookie',
  'fpc=ApQHF6iWZN1Lg2xTm7_0Iqg; expires=Wed, 19-Jan-2022 06:52:16 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrPG3NwPBfq2GCiwtF-shx7_3COs6pA-EZ2T8DYYo-Bfvj4Oor_mUYVttAKCNFPf5_hV7_dymQbwpiPjopcnUmGwN8mnBdg6IE32vCt_Ds1zwNdxPecUzkXjX6LknrSr8vJNumzXN3sa60O91z-99d4kF0P1TNh-m_7lMxKRd3hLEgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 20 Dec 2021 06:52:15 GMT',
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
  '602ed568-d106-4528-988f-2d6737f40800',
  'x-ms-ests-server',
  '2.1.12261.17 - KRSLR1 ProdSlices',
  'Set-Cookie',
  'fpc=Atq_gKzgJ9hCvZN6F6dCF24; expires=Wed, 19-Jan-2022 06:52:16 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrE3sxhHrhpVBfvKwdbYNNVDfSMDU4QLHPFBedAgJ81uxIgPPMwDz11IUnQEiMcc7awZPDyDy2U-25XcYmuoXnAMDB7vyg0yh5MUxc0gUCQucLgEoWUQ6dJPKBRQck0UsNYPTJsy2wDSeYQG-ZCJ3ncq9kgKksfBV9oB7xLLztgiIgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 20 Dec 2021 06:52:15 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.4.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=1c7f2899-ed43-4786-a6e6-7113ed27094c&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  'c7025f87-5230-4b1b-a3d3-5a8eb6580800',
  'x-ms-ests-server',
  '2.1.12261.17 - SEASLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Aox0GISIt25Dktx_aHGyJIXLj78gAQAAACAfUtkOAAAA; expires=Wed, 19-Jan-2022 06:52:16 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 20 Dec 2021 06:52:16 GMT',
  'Content-Length',
  '1393'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .patch('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.CognitiveServices/accounts/myaccountxxx', {"tags":{"tag1":"value1"}})
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147c5eca3471fdd6dd693665a17abb6a896cddd877be70fefcf0eceb7ef4d3f7db0bdbfbbb7bffd7077fa60fb607abef3603a9b9cefedefdeadf3a65ad7d3fcf3ba5aaf9abb8beb9f6edabc69efaeeaeab298e57573f78b625a574d75de8e4faa8b65d11697f9ebbcbe2ca67973379b4eabf5b2c57bfaebbb77ef3e1a7db4cc163921d4f9b4bd5ee1d3db00a4d6799b5d50ebdff7a3fbd39d9d6c67966defd0b3bdb38b7fe8d9fe7477bab377b0477fefecfcbe1fd11bcd35e1be789ab5d9478f7ef147d33acfda7cf6e49a80e43b198df71e11805edade9fedee6d1f9c7f3add26c23cb8bfb3b33bbd3fcd08807de58d607abc5a95c5340339ddb7c72d7db3b7b3b7bb4d50f676deec7cfae8fedea39d07e34ff777efefeeecff14352db3a6fda29a15e705a051fb5b2210be17c5c26f124765f7c1f8dec3ddfb9feeeffdd447bf845ea8f45dc282de5d83b6cddb3548a4d3f47a07edde164b30516f4ea839cd4483f6f473979a5c66e53adfc53bc425abbc6e0b6a455fe7cbd9aa2a96406adeb6abe6d1ddbbd2e3385b15e3a9013c5e580698568bbb049fc05c160de1582c2f5eb7446482f07a3d9de6f92c9fd1f70433af97597906040fee7ffa60e7c1ce746fefe183fd7bd9ec602fdbdbfbf4d37b0f26e7b37bf71f1e50fb19813891d9a217fa04da197ffae97de2fe5dcc15e1f6d21f060d6b9a95e52b7afb79b1286834bff8a37a5de2bbeffde28fdee698cef3aa5ed4398fe807793d9eae9bb65a8cdb3a2b304575beccafb2f2655e171521f0e90e4104577ff4689770bb26aa17d337f3ba6adb92067cbacc2625103dcfca261f7db4c8dae9fc65d662c8d2e72a6be7bd4eef4aa7774da78bbc9da3b78fbef5d12ff9fe2f196dc6745aadae17d52c2f31bb3f5474a5d7bbbf987f9ecd7ec95da04248bc17fafc7233bec85b7a7303faf4ebcf0efed4ad45f8f3d3379b50ce886faf7f90e3537aab832c11d8e07aff670b578fd68a0be161b17ff9e5ebdba23f265bb12e2324f746b1f3b346f2fe305e313af485e045df106a7660dd691160a266445209337a61c3583e64287e77772fef8d77445009c4dd6f51af164d62774271e0a5ddaff3d2ded779e9ded779697f7b55e797457e35fcf2d004d08bb362ca66e9873805aed71ea284e6c06bbb9b5ef3c6d7acf27c3a1f37d7cb769e37c4c0d47470647b1f2628d2d7dda0afcd68e9a82a5874ffad9f650c87badd8cec325fd759d97feb6719d9a16e37232b431c7af76719e5cd9ddf8078b5bc24079f9d4312e0a50d1de8cd41b43f50c34bd7771b7aa7a45fb2e5322fb3f5aca83621e30f830611825a90ea2f6e8234e952a30706c1ceed5eed13527eb4559bbf8b594722d837493ce9e7169a08cdda4afea0c63f6b68f9fddc022dfa91bdcd6bb5f320f5e51ebdd445cf62b7f741c8696f5f0faf5d7a6910af0f72d89a5531db84d3ac9a2ef265fb064c58323f52db41543e8c44cce9d44955dfc554de9da0e126e4d0ea96987d286b692f06b54d48556ff39f4d541af2342f77c989d880c3f3826273f24e2f724c1eb51b46e683b887f4544b1dc021ae993825757c337a9436407b28b441c43e8c957a88e96ff98db8bd624792beff6161a69eeb4d7895eba219dbc4c606f4ee7f107ae8a6870621e17f7d3b37f4aaaadf9e97d595457abcaa9a16190d44ad1df4bd6019bf7e7dfcef96d9f2624d8c7ff711f13fa2b36da2b835a6e87a005fc8f5315e212bde8cd74b496cada96d4d08d07bc3287fa0445b9481c2ddcc74c92c61221bf2fe37d01a2f0ee38efcc4cd74ff610c622f1c443734c6ab1b86b15e219f769b91fcb007f25eb3312dd79891935b8c837eff060622be3979e28128842378cfa9c018643a6e338c1fda2836cd83bcff863ea33736614bbf7f7d74d1a7e485d02987ed9669a62d49317ff783fcf678eb0bd47c18e97bdf38d2f267044fc272f0ad3d3bd40f7d7f4fbe88bc3f48a7799e95ed7c9ad53f7452913927379d168d04851eca84f0e0db6ec8bb1ff6faded0eb4304a366c3542229a03fbe31326dc0e917ad69958f0499fceb2bc2e3064bfbe987a1f58be845c4569b10525d67f4cef8878aa0e9f52ef55a5f6fbf5d5657f4de453ec91ae2af2ed68473f7bd47f262b7a5373e4928520e9dc3cb1fe4718de8fcc97b1f3420e98d9cdcb0378b9ba4fd09b9b03df8e74b5a0a631ddf19389baade1bb4cab631909566f4fde0403f2c1412f89b3038cfa611d5f44df50fe89b7a9f10b09f2c9a7556beceb33a9a88b1987ced29674cd0d3ddcb0714ce140b6249d253dc6dc3ddde84e2cdc8ed7d5880834e6e42e2845d859b51d9fd7054c42bb99936e4f3b4b4b4410b6193a2442fd4b48b1721a388d14afe8721c65d6cc267969f6794f0a4065d2c2c121f1627f7fba6de3f2a9a2f8a0bd20a1e84d57a5216d317798b80f398d6ea1b82f391e987b0c956190d882d34774018615dffc45094da5c66e51a9f3d23211a7f6bc43ff0cfe8a45aacd6841b490e49377dd5f9e02791adb5267504ed66ffa2d6e1dfdf66030d0fa5f3c5ef955fafe635a9f8a1cf7f72afffcd4bfee6cb172f7eefce77cfd5163ccb9a16df0c7c3df071afabd7706f90461afa7cf88d9fbc37fccd4bf15b46cfbf3a7b3dc63f445ace8c6872a8aa957e5e828f3e79cd39d2d7797d893506fae0192dd5be32d685de61d360a6b8acd6600133bd00e790199c0efeed07f9e827d4f21fb3e51f1f97e5f1aa684686528ac4386c463c8e56c4b0a38f4ce683f8ee177ff484be492982aa9af505694512908fe66dbb6a1eddbd9bd34cadc9d35f15b4164203698bcb7c4c6253574d75ded2678bbb340a0640e32fcbf4649e4fdf7e3d00a73403ed75aacaed6b8138835aff20082ff2abe68300b0dc7d1084efe6930f7a9f140019b50f022166e6eb82807e7aef978cfa02fac4b2effd3e042565f980a4bcf7eb4674480c2491f0de104849d8d83f2b0dbcaf96a4339a365bcebe01985fbd22f3455aeabde1fcc4f2f80b4417effd62bbfe5ab478c3afa54ff37cf5ddbaa074fafb02e869aef78600c53dfefab389d7dffba5af2440832a2453f0deafd36cc3cca4d6cea4dba926fdbf0950fafbfb4f460c18d671526f21e77d61425c3dfbb9fd79594db2d20333f0be5beea26f63903c10b7c3e469355d63081f02e30dafacbdef5ba0abf879effba63018e967b6f364b0e4efb64a418df4726fbcf38dc3bcf7b302d3e520773f18ba5aad9face8af0f0676bc9e15558a2922de484f2888ff5a9cd1054b7f4311a73f495aedbc987eb340cf6684ebd7072bf4fbfdc500fffee406eb5adaefff75a67e03b0f79fe91018496ab124a5fecd82dafbe640dd7b6f5061acf09eafff12849f3cf52d05c014a792c59b16abac3ca358f4a3bdf38307d9ce2cdfbef7e0def9f67efe20df3e983e78b8bd7b3e997e7aef60b23b9921122136cf962dbff160effce1c1c1e47cfbe0d3f3ddedfdddec7cfbe16e36d9de9b3d98ce7676776793fd0778e37a05317b7dddb4f9e2b8698a8b650e48eb26afcd9fc29112e0fee25ff24b","7ec9ff03112b9c3487310000"], [
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
  '"5c00a0da-0000-0100-0000-61c028210000"',
  'Vary',
  'Accept-Encoding',
  'X-Content-Type-Options',
  'nosniff',
  'x-ms-request-id',
  '75a68d6d-6e72-4ac1-be71-46bc15010d97',
  'x-envoy-upstream-service-time',
  '38',
  'Server',
  'istio-envoy',
  'x-ms-ratelimit-remaining-subscription-writes',
  '1198',
  'x-ms-correlation-request-id',
  '3de86679-5f67-4dec-ab15-4ee1e20e1ef0',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211220T065219Z:3de86679-5f67-4dec-ab15-4ee1e20e1ef0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'Date',
  'Mon, 20 Dec 2021 06:52:19 GMT'
]);
