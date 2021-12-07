let nock = require('nock');

module.exports.hash = "da175dcb796641a7d5ce170197d3482f";

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
  '520943dc-6691-43eb-be90-3cdf58511900',
  'x-ms-ests-server',
  '2.1.12249.17 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AgtPQBOP41VDuLM1caRGhB0; expires=Thu, 06-Jan-2022 08:31:40 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr5VQe6rBZeySnIzr5TCmm_QdN0PQwf_Yfr9pTgKn_v4xb6MQYSp1qXjVeLJsgww7Xat6Tg3aNmvbhzQgsZgpQMMXgNhiQHauSD3iXT9D2dMl_7mS5tRjY1CVANLWpNJk-2__A7ekwuv-s0AmhYQYHG1USC7p2WhKvs9oGqI1ORUUgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 07 Dec 2021 08:31:39 GMT',
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
  '0d090063-8c60-4813-a018-a9e44ef61d00',
  'x-ms-ests-server',
  '2.1.12249.17 - KRSLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AjlmoNLP37ZJuYbv8J6eyHw; expires=Thu, 06-Jan-2022 08:31:40 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrAH27SbKBBK-cf_NeHCXcqAcPRpfNP7p1_0RrToUgU3iaIo_7K5qIs5sthspUP_TuGNOFJR1qZ7nnpnNAZid_wsjHovOwWjJMsN9rMPPUnAtVM-Uj7_y-YhYIXf4gapZJl0erN09TFKgIIqvW1jGYwA4NfLNOEgps5tcx6RJ1fbkgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 07 Dec 2021 08:31:39 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.3&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=687edbde-e0fa-4d53-b107-a42536d42b5e&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '10d1faf5-4b8b-4906-8c7a-7d1cc08a1900',
  'x-ms-ests-server',
  '2.1.12249.17 - SEASLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AhfoZhL60U1As4BTT-MxChwWPr5BAQAAAOwSQdkOAAAA; expires=Thu, 06-Jan-2022 08:31:40 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 07 Dec 2021 08:31:40 GMT',
  'Content-Length',
  '1374'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('//providers/Microsoft.Management/managementgroups/20000000-0001-0000-0000-000000000123//providers/Microsoft.Authorization/policyAssignments/passigment')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147abba5ae5755be4cd478fe8afaa2ca6d74ff3f36259b445b53c9b7df4e8a3bbd4e6b298e57573f78b625a574d75de8ebfc896d945bec897eddd85fdf5f3ba5aaf9abb7b3bf26cd3ff77f10fff26fff0b3bb772f0af478ddceabbaf84186beef769169eefe74239f7d34faa89912deef85dcc5ed9123f88bbccd66599b812ad33acfda7cf6e49afa3b7ff0e9f9c1dea7f7b73fcd1ee4dbfbd9def9f6c3ddd9c1f6fd9dbd49fee9f9cefeec7c9f5ed757be5cd22b7b3b7bbbdbbb7bdb3b0fdeec1c3cbab7fbe8dec3f1a7f7f63edd7bb0ff53d474bda27e04fa725d96f603bc8b0f7ec9e8a37c795ed5531ec517d50cc326aa64ebb2fd88be2cde6f8ede830c51a0b1393a6e9ae26209e8cddd55863ff03b8dadbde649baf5dbf4ca325be095004c73ddb4f9e2696c3ab2fd07d9eebd9dedf3ecfe747b7f36d9d97e389ddedf9e4c3fbdbf737f7ab0ff60ff0101b0afbc11848e572bea999170df1eb7f44d74b27676773fddbb8fc92ab30653509c178046ed6f8940f85e140bbfc9cda8fc92","5ff2ff00d394cf29bc030000"], [
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
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'Server',
  'Kestrel',
  'x-ms-ratelimit-remaining-tenant-reads',
  '11987',
  'x-ms-request-id',
  'dd9a1c1f-9786-4d06-843b-fcb179307000',
  'x-ms-correlation-request-id',
  'dd9a1c1f-9786-4d06-843b-fcb179307000',
  'x-ms-routing-request-id',
  'JAPANEAST:20211207T083141Z:dd9a1c1f-9786-4d06-843b-fcb179307000',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 07 Dec 2021 08:31:40 GMT'
]);
