let nock = require('nock');

module.exports.hash = "f97d0e2677f37fff27545bf8dd03a58d";

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
  'fb5a535c-34a8-46f1-8d9b-3f1e14651c00',
  'x-ms-ests-server',
  '2.1.12821.9 - SEASLR2 ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=Ag_6fQ7VM31FmW0iphxiQzU; expires=Thu, 30-Jun-2022 03:48:54 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrPKG6YqrYuvoTziTYzmnJ4R8W_QFuyJ4XsHGD4nBVKEo9FaAl4j9YL0458G_ksR7Kf8qdVhhyHHYclM7-eaQ414RPc-QprPe_q626J_59TdSmrtTZwt294AhbQtC1Vlv2j_wT0464JunjfnVF25qndOsR_D-Zvox6C8CKmrZNfj8gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 31 May 2022 03:48:53 GMT',
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
  '90421fa0-e33c-4f15-bc0d-232ea6b71a00',
  'x-ms-ests-server',
  '2.1.12821.9 - SEASLR1 ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=Av0iRWA0Z8VMlr_hWpaqUXw; expires=Thu, 30-Jun-2022 03:48:54 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevre62I9kpO6PSC-S5qPLzzwVcdo8bdTRpkAAgtGrdl-WRyffiIrzn1rEbSZqo2XW4odogweYw_xKKzDEIsoE9LrN64mHDUPc19wJTyMdx1JqGChRVqY6JwlwHEJaqoN_R5_fHMDugmqkEVtcSQSO5NMemvxskelcxGxT-NI9hMq7UgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 31 May 2022 03:48:53 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.9.0&x-client-OS=darwin&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=b62e8e0c-811b-4e26-b7fa-d08eda3b1626&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '614c8838-21b7-400e-be31-a5ddb31c1900',
  'x-ms-ests-server',
  '2.1.12821.9 - SEASLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AoPIKuqDfKdFj0KEumTbdRsX6p3SAQAAACaHJ9oOAAAA; expires=Thu, 30-Jun-2022 03:48:54 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 31 May 2022 03:48:53 GMT',
  'Content-Length',
  '1393'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Web/sites')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef1479759b9ce3f7af4bd5ffc5131fbe8d147779bf5a499d6c5aa2daa6573f7e1def9c3fbb383f3ed7bd34f1f6cefefeeed6f3fdc9d3ed83e989eef3c98ce26e77bfbbb77ebbca9d6f534ffbcaed6abe6eee2faa79b366fdabbabbaba2c6679dddcfda298d655539db7e3efe693bb4d415f5333fc7c47cf47a38f96d98290f828f8acbd5ee1b3c8bbf4e5db620974b3d58afe28ab69067ce983d3ac69d3af5ed387d4fb2aafdb829a3ffac5d10e9a366bf1e1abf572592c2fe89379d5b42fa825bdf23dafed38fbc1baceaff2093e68c6cbbcfde8fba38fe8efd7ab6c0a0866c8dbe8feabd7f44dc3df501f7979febc58bea546f3b65d358feedebdcaae9a6dc26eb63d29d7dbf7761e8cb355d1e9e28a86575d71578ff6efefdffd1ab302584002948e6227b4a46ff193460992d4f9aaa23fabfafa357d085210e2418bea6a99d71f3d5aaecb72f4d1bac92ef2d74ac61755bdc84a6a922fb34999d3f4b4f53a1f7d94cd16c5f234fc4c9b7cfbd6f41ef95f37d345a4094d09fe7819ccfb226fb359d6660663a2bbfd96785ed9826668fdeed9bb9f245e250253672a151f7df44b46b6d177654e22cd00fa9750f7c48daff3b6255e22e8fc217d769915653629caa2bdee51aa69ca1360735e1003334a0465dad4e637ea480051531ada17d50caf3f2f16f4c78cde37fcfaba291936b57683f208d6271601d477a8e5d3a2e1e9a04f8bd593acc96704f055deaccbd6747f59d4ed3a2bcf5e9a0fdaf97a3159d5c5d23669abaf56446a0218fe7d66419a6f5c27068317557b522dcf8b0bc2136860606f44fea9c97296d5337f2abca1c579e1ff3bc37b6525ee23b0d0b45aacd676a69fe633e60cbcd3e4f5655e3fcbea85e9c77d724682f5c351dddce5397589c6c4eff8a098e6ab325bd26c109a04913e228c1f9d676543a25e34bf77be2469317fcf69dcf54fda3fcbac6969b42402f9ec4db1c8bf6aa73496bd9dbdbded9dfbdbf776dfecdc7bb47ff0e8defdf1fe3e816f8852a4735ee5d38a10b97e9a9f67348d86ce4e934fab659b2fdbe34dd257af972df5b8b14d934febbc6d4eaab2cca7202c49184dd32531d9ab8a26eab82cad6ad311d16ce632db50404be2a3bcfef2fcbb55fd96e8f9d1a3ddd14733c1fa69355d2f0849fa502694803eab89c3afa8ad5132fad56abeea7e72ddceab65e7c325f14de7a3557595d7afe7795976be2843a547ca8e6c5a57c769db3aff456be28b37753625fada119b2f17559b3fcd27eb8b8b1bbfed0086517c5ef1379df758a8bfa896900d6a7142137351d5acb8b5c1b4feaac9bfc896c40fb3b319119226f084048c5ae8544893bad3e6eca901515617cdd3a2a69925f97b5dfc2067d56abe9d91ed2808a3d3ba66142248aed693b268e6f405fa11edd4fde665d63434a3f61d929ad04a906da39e4897582b45dcbb24a4884eaf5bd2415ec36c4a20f3df2bbf369fcc493b9618e26ae5379c296fbdaa2a3b1e5295a274e4cf7593dfdb7b52b4c2996436c957b0ef93367d5d4ddf12eb77469c9557d975f3254da0d2f8a7c9c27526151f910410f53c5f21f8b0f302217f522d163414b2c41641fa1bd3f6b258e5c4abc40bd089f295eaebe3d5aa848224500ef36279bc6ee7c7f03a549c832fde90efb1341a43be99ae49ad2c08d8cbaa2a0d97f401449b45c019bdf2143c11fdb0cb126595cd9e64a443215de64352c9609257ebd2f17cfe8e942781f194460996b57f65ebb6fa769e39a5147e1c006b459abf1483613e856a834fe1ffdd5375eeab97757149637f59d5d0923448f3250bc0f445ded240df1e4f7de69a565084f2fb6addcccdefe40793422f48e40921ef43915f8c9a1888f5aa7e45a37a7d95ad5e97558032e281f28bebd7bfa88bb072d46bb25064b4cc14c27acaf7efa4a7e1066ff3eb9f84ea7e959fe775be744d4c8382647bbaaee913723048765988ed604902cfbe5e03e29a2f48724c3ba8cdbd1d3b3a71aa895fdf944d47b4e4c3936235272bb026d364be68d6ab154d1a59dde06b1f952ff8dd0ec0f376d504ecbeaaf3ef924390cfce961451114d0236385f2f79042436af69568c86dda131103fb6f393793e7dfb326b2d139c93ca3d21ad76911faf67456bc7a8df2ab8864c3de48961aa95205eeeb4262d066b0cbfe2a7aaa5c59868522cd68b53f81ec5b4833661c6a6e73541245e20cec5e7962c4279d296efae9f95996545740319307f934e284849ad1b42d0053ff21d69114076ba98c28419b950d535581cccf6917370c928371df626b93da7884178b5f66228f9ba79bb26083445e236d307d305a2b9e3b2a96850ab153051e5dd66f545de1a193210e09e32316904d512480d7f4394c08c9906d3b2a00f8f093f9a926b3b706150f912118ffd42f170df889627b7f817adc930037df7dde9bb69b9062f825fec78811313c0faf906eaac5a90cc10ff9277295642c4957c4da78044ab3f8d342534eedf7fb677babf7feffef1a70ff60f9eed9cdc3bdefff4d34fefefdc7f72efd3077bfbfb9f1e3fa4ff4e9f3d7d7ab2b7f3ece1c1e9b3d3d3fd27f79f9e9c3c38d879704ae807998a6239216e9a9dad8e6733f29409097275c7bbbb0fc7f42f7d4fb14053d018ce3aed30bb614b1243d209ea7278fcf2fbfebebf9bfb43da358645a821fe8ce620e88b4e1c45f612be20e2294e15dcbdbabaaae14e501260ddc6f13bb83fdebbbf3fdefdf4d391fb6b6f77c7ff6b6fdfffeb5ed0f2fe3dfbd7fdf103fcee466c68f3e50faf73fd7dd7ff63cf6f75efa1f7c7fdfbfe1f0e34fde137fb74d7ffc36ff6c0ffe6c19efd83c6ffd07db53bde3d38b07fdd1bef0648dc7348ecd0707d207b01ea4458fb177d77cf7db74b2dfd3fdc377be3bd1d474042cb7db54bf199ff07a3417de8e491472b9e1fbc6c56b233f2adafbfa0e0a0be867efe897505ff97be68d6cd2a5fcec83015a58da9c18046be5fe559037b446d8d39387d473613bf7c456aa739212f993a913717d9bb17dd184cbe9957643fda6cb122f6e90904702ec9ae2c2fce96e7957ba5abffa026e4bb3673ee37b1a58bab09bc09ac09aa067f9e4c3a79ed4820491ebd00f5cf1a9a8ceedaf6003b446e78499e876a3bd2966b52f9cbe9b5ead0173079d039a4a32f08a3e64b721ead6e133017794564253763c2e4b3e029f501b7ee74395b55940421bf4b0312d762d8bf9bac8b7246ba14aada7c2696e649e49b45712158618084b77c4a2eff05a49de22e3ff4fb087e847867f41b7dd98ce8a7f9040e43e733c2bca9188cffe9b7dfbc79d9f9e8ec25f95d31082fcbac3da77c007f0c738e5f88ae643660c669e8a48dc823548365a6833804218a12e8f57a42b3e9e8bec191fce8f535f1cae298b4ddc59200fe925ff2fd5ff2ff004eea961da8170000"], [
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
  'x-ms-request-id',
  '7fd4f7a6-1612-4265-a85e-a2406a70ec17',
  'x-ms-correlation-request-id',
  '7fd4f7a6-1612-4265-a85e-a2406a70ec17',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220531T034855Z:7fd4f7a6-1612-4265-a85e-a2406a70ec17',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 31 May 2022 03:48:54 GMT',
  'Content-Length',
  '2537'
]);
