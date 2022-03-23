let nock = require('nock');

module.exports.hash = "be8b70b1cabdd7abecf0ed222b77007a";

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
  'f480e226-70a1-4283-a533-9f5e47ea0900',
  'x-ms-ests-server',
  '2.1.12261.17 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AimzkkBKk7NHmHJ4OAV5JMo; expires=Thu, 20-Jan-2022 01:09:36 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrwdEzVP5bFTb0k6gEt_sA2ylhp2w7OATp8Urp9wWF2G0LKc8mfFUqdKdh1QHmF4Y8Hsu35Xy96bFrTYUu4Wunqh_FhYfAv7tVJrc5N2xPCb4x-q3cTQTCMgBSDMTHpMweGcWYBYwUcaUDKNwtXhBYi5YNNxFanfv_W-B333WtLRUgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 21 Dec 2021 01:09:36 GMT',
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
  'c7025f87-5230-4b1b-a3d3-5a8e72c80d00',
  'x-ms-ests-server',
  '2.1.12261.17 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AgvBMZONOZZNjkpXLCDzi8s; expires=Thu, 20-Jan-2022 01:09:37 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevrz1h4_Cp_cZgEaEVRgYkZ8YNEzB-iDm3bA-SSSbKyefqCOnv3M1b9y4Zog8VGsq58nl_LX3I974_j2vWIm0SRKklNK_P-LBvhDTiphC62HMNQpyJT1Mr_BLEFAmsGOyqCuQE4sVOqSu4LTNB4mdWiJ9-jhhLWmahqxVXuipB0EOwgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 21 Dec 2021 01:09:37 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.4.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=3ca54be3-fdd9-43af-b166-0aad51bb1e54&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  'f9d8b77c-5495-4058-a16d-afdd5f9a0a00',
  'x-ms-ests-server',
  '2.1.12261.17 - SEASLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AuMP2tykBOxBsud3GV31tlbLj78gAQAAAFAgU9kOAAAA; expires=Thu, 20-Jan-2022 01:09:37 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 21 Dec 2021 01:09:37 GMT',
  'Content-Length',
  '1393'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .put('//subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Logic/workflows/myworkflowxxx/providers/Microsoft.Insights/diagnosticSettings/mydiagnosticxxxx', {"properties":{"storageAccountId":"/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Storage/storageAccounts/mystorageaccountyyy","eventHubAuthorizationRuleId":"/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.EventHub/namespaces/mynamespacexxx/authorizationRules/myauthorizationRulexxx","eventHubName":"myeventhubxxx","metrics":[],"logs":[{"category":"WorkflowRuntime","enabled":true,"retentionPolicy":{"enabled":false,"days":0}}],"workspaceId":"/subscriptions/azure_subscription_id/resourcegroups/myjstest/providers/microsoft.operationalinsights/workspaces/myworkspacexxx"}})
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147c5eca3471fdd6dd693665a17abb6a896cddd877be70fefcf0eceb7ef4d3f7db0bdbfbbb7bffd7077fa60fb607abef3603a9b9cefedefdeadf3a65ad7d3fca2aed6abe6eee2faa79b366fdabbabbaba2c66794d1f15d3ba6aaaf3765c5617c5f4ee5555bf3d2fab2bfae6dafcfeeeddbbe81bc5b2292ee66d7377566417cbaa698be9ebbc6d8be505b5ba761fd2fbef3e1a7dd45eaf721ac717f6fdb3e1f7a9f9325ba0790450594d3310e1a347cb75598e3e7a5b2c8940f27b9bd1cbfa3be1bccaebb6c8e9935ffc51d3567576911f4fa7d57ad99ed11b1f44d2cf0749ea06f85ababc1b768d97f4934c3eb9bebea66135797d594cf327ebe6d5bacc81a00c03d3d0acb2297ff44138df860d4032a66e56daf9b5185043e60afe432623bfcc97edb7d793e3753bafeae207fcae19c007617b1b0a9f6aef77c12d8c155eb07f108a77b32e6268d1fb905a7a8379410008fbc5357f305f4fe4eb45ded6c594b8e97bdf071782d3bef78b3f2266cc2faafa9a5ef82ed10612f38a26b5201023fb250fc6cc68becc26654ef469eb753efaa8ce5bea8510795995c594e0fc62d7e23c2b1b6a32cbaea9b39d5ff24ba4e3639a9d6b1288e62911a658f228deb078a1835f32228d01882dc1e20f","fe1ffd84939e43040000"], [
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
  'x-ms-request-id',
  '3673d1eb-6c44-4670-9975-3d54d4dc52d5',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-ratelimit-remaining-subscription-resource-requests',
  '149',
  'x-ms-correlation-request-id',
  '3519146d-a248-46a0-9a15-94551eb3f81c',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211221T010945Z:3519146d-a248-46a0-9a15-94551eb3f81c',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 21 Dec 2021 01:09:45 GMT'
]);
