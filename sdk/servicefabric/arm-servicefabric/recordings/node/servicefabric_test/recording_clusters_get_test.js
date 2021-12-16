let nock = require('nock');

module.exports.hash = "fce818aafeae983ee9f8248fc2c124fb";

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
  '518e4bd1-1302-465e-a88a-d334b0f51f00',
  'x-ms-ests-server',
  '2.1.12261.14 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AgMK2urLXpZCritmtGfciJI; expires=Wed, 12-Jan-2022 06:38:55 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrCCDQGeolohsDJc_yd3H_LRCclNktfAc0z6gO0rOfpY2TNh9drpBvP2nnWgilyhK6JPkRl5GypYCqQvxp1CUwtRKMh3tP1lBabAIswIX8GAI6LQCJNsXfQ06FjzyvipWa2LdTHnvfnVqe-Ojl3QfLx0ai7vTpwSPFa7e1Mkn7mnsgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 13 Dec 2021 06:38:54 GMT',
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
  'ce3fce6e-e1c9-4d21-a5ce-788a796a2000',
  'x-ms-ests-server',
  '2.1.12261.14 - KRSLR1 ProdSlices',
  'Set-Cookie',
  'fpc=Ag9X36_6DyRIj5qiYifecZE; expires=Wed, 12-Jan-2022 06:38:56 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrwK5ExkHrsqJJDzkikl3lZSbrlEuU4AzhtasPv26bBjZxBJg1XFtIlcx53latpPsp6kLHJxQ8Tui3UZHL0LQwBX74fiKho75Uea-FVCjouNaDFE34bAqxhxdN4PiQrcDn1WBrV4knKiWwHDNrzE4rTVVO0xlxLc9uoaJuHdMXO5sgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 13 Dec 2021 06:38:55 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.3&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=30e719c2-1396-42be-8516-57caf1062dff&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  '35c844ca-d564-432c-ba13-b3e937fa1f00',
  'x-ms-ests-server',
  '2.1.12261.14 - KRSLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AneaY18qWQhNv8e-ZkYf4X0WPr5BAQAAAH_hSNkOAAAA; expires=Wed, 12-Jan-2022 06:38:56 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 13 Dec 2021 06:38:55 GMT',
  'Content-Length',
  '1374'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ServiceFabric/clusters/myclusterxxxy')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef16f9ca4e947edf52affe851fad117c5b4ae9aeabc1dbfceebcb629a3fcb267531bd3b2dd74d9bd7cd47236e5e56d3ac2daa255ec9b3a65d9b2f8a193ebadbac27cdb42e5668d3dc7db877fef0feece07cfbdef4d307dbfbbb7bfbdb0f77a70fb60fa6e73b0fa6b3c9f9defeeedd3a6faa753dcd2fea6abd6aee2eae7f9a3a6cdabbabbaba2c66d4f5dd9b70a377f4d777efde5d2b42cb6cc1038b7d97b7d905befbeedddff7a34fef3d78b0fff0c1febd7bf708bf83bd9d9ddff7236dd65cd37b8ba7599b516326177d38adf3accd674faee9b38fceb3fd07d9eebd9dedf3ecfe747b7f36d9d97e389ddedf9e4c3fbdbf737f7ab0ff60ff8100f3df7ca3343f5eadca42e9d96974dca2c1decedeeef6eedef6eebd373b9f3eba77f0e8feeef8e0dedefd83079fecec3cdad9b16f9534155f54b3e2bc007cbcfa5e9885af6f42cf6f794b1cf1e62fe1f73fa2295de5755be40dbd69084a1f5e160d75522c2f5eb73478faeea3d7ebe934cf67f9ccf6acb378c67cf66092e7f7f3fbbbdbf7b2731addc3dd4fb72707b36c3b7f309bdebf3f399f4ef6a6dd374faa59fe93c42dd413401c8cf7c6bb7bf7ee8f1fde7fe808a96d2d1edfcd8a96f07a56d52fe87565766ab7c896d945bec897ede972b6aa8a25d362deb6ab4777891d4f04cc5844643c2dabf52c5badc6d90fd6753e9e568b47bb0f770e7add766135044c4134c2f9e71938dfc1b95baf976db1c89d2cbc27690a1ac209e6e41c539dbf99af1793554d38608abef7fdc18627d562512d5f9090850d05c1d7790bb2f157f2456ae61b8f15ceaf56177536cb55ac0d5a783e5a653535c290a8a10582c70384c702237e7d5995e5d9925ebacce8e7eb7c5a2d6776d2ccf3117db9e6373e15ee34cf2f717f7cdffcaa9fd9f1d579596493a22cdaebe7f9655e02cceba2bccc6bd3cd474be214c85080b887b44578d9ee5e2ecc6b780c99abe5329f42ee0c43bcac6a300531cdce8edf1e4cf239cdc655761d69fac06f4aec67a4194d809c87133568daac366f93160c3aa2aff3e54cbfbc47dfedb8ef44b6e5f9285fcd492aeaac44dbcd7dec1386837d7cba4f5fbaef823e8ae6655d2cb21a7aaeadd7b9ffdd6c5d7767e7495d2d7f10f2d6e5e26c49a82ca7c4c6243fd4eabeff75d1b0fc977983119c6765939b6fbbec302bb28b65d5b4c594dea96ad209c7d32960d21c9e17303296003478bf014487be66080e39d2863c346a44bdff5e39c6a8e608cf470db3f48606a44d5be29d7c460dd00db5303d8508d217bbde7b93b29a181642637016d40fd01be34bd236a472ae8ae5acba6ac6cbbcbdebbdfd8bd6f93a1f7c9dbfddf87e9b4dcae1f7f9db8def0f8c7a0fa054c40d0b7db4169d43568ca972bc6eab058985538ad9655694e852b5b81a0df042549ca70449db5093b861c1f351b35ead88bd4fdfad8afafaab768ad60fe981f9bcb7fb66efdea3fb0fe97f63fa084ff06ebebc2c88916171f0da77850e3a361a9dfc62f95207f9ddec9207899fa2eba8e1","2ff97f007bf38e15fa090000"], [
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
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11999',
  'x-ms-request-id',
  '1a44c841-e343-45bd-9859-2c85dfb8b45a',
  'x-ms-correlation-request-id',
  '1a44c841-e343-45bd-9859-2c85dfb8b45a',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T063856Z:1a44c841-e343-45bd-9859-2c85dfb8b45a',
  'Date',
  'Mon, 13 Dec 2021 06:38:56 GMT'
]);
