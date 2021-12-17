let nock = require('nock');

module.exports.hash = "37a08100ed6592cd54bb718b89d4b663";

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
  'cea5795e-3301-4fb9-b860-184052d40a00',
  'x-ms-ests-server',
  '2.1.12261.15 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=Aq-n9fw1I9lAnnHpXxcbZ7I; expires=Sun, 16-Jan-2022 05:44:25 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrlDJRwP4f6T3ubSSZig-njyz6AnmJM6wrlyP3j6A0_62e_9pUHm20_9caoyVOj92aJrS-T9HLIH9gl6LIEppoA8ifAHfxL6wulkJpGy83T-bGIL48qcpylrrvceFT9A34Zrc20l2evwXWASY7HENW1Rts-s4JN7ojF9dsZ18MQLkgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 17 Dec 2021 05:44:25 GMT',
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
  '6edbaf0b-a0a4-49c7-852a-1809faff0f00',
  'x-ms-ests-server',
  '2.1.12261.15 - KRSLR1 ProdSlices',
  'Set-Cookie',
  'fpc=As9PMncAfQRGmspzXoFLZ7U; expires=Sun, 16-Jan-2022 05:44:26 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrEMCTuLTVGH3rAEXknwfxO2mASVziGzzQU8qsEIXAs6bNb1Jn4B98CaaGdkG3eEr-eogpfEyxmSqmk2wWEVRm7FEtWF40CGK3lWTT4E4cmXZv8HXVaqzlR9cpMazWwfLyUgEXtq7_JlEWy6JIfrUQcuGzBY49hWBcMckM6PjdN4YgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 17 Dec 2021 05:44:25 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.3&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=d1008652-a559-403c-8e07-9ad8c515f0b2&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '653645f0-3ec7-4ea4-98be-8ae4f2a80a00',
  'x-ms-ests-server',
  '2.1.12261.15 - KRSLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AhfH_yx2D9ZBgNtpL33cXxgWPr5BAQAAALkaTtkOAAAA; expires=Sun, 16-Jan-2022 05:44:26 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 17 Dec 2021 05:44:25 GMT',
  'Content-Length',
  '1393'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Devices/IotHubs/myiothubxxxxyyyjjrr')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147c5eca3471fdd6dd693665a17abb6a896cddd877be70fefcf0eceb7ef4d3f7db0bdbfbbb7bffd7077fa60fb607abef3603a9b9cefedefdeadf3a65ad7d3fcf3ba5aaf9abb8beb9f6edabc69efaeeaeab298e57573f78b625a574d75de8e9fe697c5346fee9e55edb7a9276a5c54ed7c3d7947cff5f5f54fff745d7f34fa68992d724226fe657bbdc2978330a949594d330c809ae559d3aef1599b5d341f3dfac51fbdcdafe9e3cbac5ce7bb1ffd92d147fe809904b71933c133a3bec0a8e935336cfa2aa7bee893637a9e3efb74f1f4a7af3ea34f891cabbc6e8b9cd13028d21fdf737fd15ba78470fad56b7aa1ae4a0c7455178bacbe265c8376dfa5be82764d3ead96336ef97d1a569bb5f8f478da169739b5a2ee2f8b86de2d9617aff5cbd7ebe934cf67f98cbe2f56cf8ab2cdeb57eb12181252e7fcf78b8ce7a2a68f31ec8ce071ffc7f4ea0aa32d565f64cd5bfa64f7deee7877f7c178f7fec3f1fd7b8cc5326fafaafa2d60bece5b02fb8b3f9ae5e7d9ba6c8117c3799a2faf094ab65a95d76faa276beaf46c797a992f3199a7cbd9aa2a96ed478fda7a9da32f80223837a35796d5157d308c1dcdfdbc6a5a0510e1b571f683759d6fcf84bdc6341682977730235c7eb17cc8bfd5794bbf120a6f8a457eb67c9a5dd3c7bb44fd8c661e9f9f546b0c67cffbe86c466dbef7d10e41dffd8888b6cada791c236a916bbfd4a0993cba7b57da6c2f9b6dd77e7bf7d3fd7bbb0f1e3ed87e907dfa290d7ababb3f6ef21ae398ac9bf155b19c55573ca2bb1ffd12a203b1704b6c810118f884d22ffe48df79b26e7e629daf99ee849ffbf44db52aa6fa29d38008a37f366d556717f949b56cb362494a001f6b5706d0795696936cfaf6153e437f2af7bf9bf982c62b42461f8a947f91370d81854083db997ef425b8833e32c8634ed18720d580a84573bacc2625b1fa2382dee418b6e2184ce5efa6fc89df9bac79d396c7cd59531d7cbab34bfdbc7cb3fb6dea87ba5ee6cc69afdb9a09f7917c2a6345f7f8087d10228430b5097a21decd5f546d715e883cf38724dc6f9fae6bfea0d3e91704be8da2b2c8de3dcd4b12f1fa5a596b7707fde63c5a12e9fcab555965b34e6f4c0342b9acd6b33795d01638c4c08d8cccc689714e1a84278b5eff4687709e672d092061fbd18b6a89f95d14cb3765f393c44d049f3ede1defd1a7c42cd5553e7bf68b66cbe7052960e22d7abb79bb0646ca52afa11cda22aff17b9b414f42e94db355362d5ab208bbf40a192b925dfcf58b8d95e18e7fc92f","f97f000c67db051e070000"], [
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
  'Vary',
  'Accept-Encoding',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11935',
  'x-ms-request-id',
  '044e7468-8c37-4f15-bc34-c5d396da840f',
  'x-ms-correlation-request-id',
  '044e7468-8c37-4f15-bc34-c5d396da840f',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T054426Z:044e7468-8c37-4f15-bc34-c5d396da840f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 05:44:26 GMT'
]);
