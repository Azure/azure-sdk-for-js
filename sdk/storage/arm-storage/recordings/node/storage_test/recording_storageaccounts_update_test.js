let nock = require('nock');

module.exports.hash = "c95868bd80f1ad87a57a2fda182303e9";

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
  'a8f86547-d252-4116-9a96-079880f30100',
  'x-ms-ests-server',
  '2.1.12231.10 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AiKer9INiNJJmZMxV3Ws-gI; expires=Sat, 01-Jan-2022 06:14:29 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrqVGemteXSwaJLLqvMzRc_QB6mV0UVcgaxzknzXujkgDxGmyRuYagVfQSB6DBKKcijYWZtyp5Gg_Cpzm1s855yuE_a8RXRZyms9IQ7GYrTDCp5eBL2fBMJ-9y1hZPnRm3BIOnMQsBsEF5AUwS42CGAqj9Hq7LjOt2cf2xUqNU0CcgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 02 Dec 2021 06:14:28 GMT',
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
  '671db2aa-032a-476a-861e-4035a35d0200',
  'x-ms-ests-server',
  '2.1.12231.10 - KRSLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AnnPDmTRB4RIqLwjXSEu4ok; expires=Sat, 01-Jan-2022 06:14:30 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr-z2J1wrFDKTwEqo5pu2m-qdfmGNP5f2Vxsdz7x9hEk-AJs7ot38zb_bEhNhmQDuaQrRbJi12ilyejhEtODXTJ5CKpLT-Tb9ArB6m7ReM0VB4t9CspM-7ny_ZxU1siZx6vsLHou8BM9RTcz0n_0g_hejXpuMfDYi6ZzOOJ_vcT6sgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 02 Dec 2021 06:14:29 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.3&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=cfedd0a1-cea8-4a00-be39-5abfc8ccbc57&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '78434e2b-f6d4-4f30-a1e5-2c4523800300',
  'x-ms-ests-server',
  '2.1.12231.10 - KRSLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=At4C-hSNwV5FoK8M7LIn3rMWPr5BAQAAAEVbOtkOAAAA; expires=Sat, 01-Jan-2022 06:14:30 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 02 Dec 2021 06:14:29 GMT',
  'Content-Length',
  '1351'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .patch('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Storage/storageAccounts/storageaccountzzzxxx', {"tags":{"tag1":"value1"}})
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147cddbf5478f7ef147cb6c917ff4e8a3d76db69c65f5ecf7fffcd5eb8f461fb5455e7b9f7ef44b461fbd2d9633fea8aab38bfc27f7a855810fee36eb4933ad8b555b54cbe6eec3bdf387f76707e7dbf7a69f3ed8dedfdddbdf7eb83b7db07d303ddf79309d4dcef7f677efd67953adeb69fe795dad57cdddc5f54f376ddeb47757757559ccf2bab9fb4531adaba63a6fc7dae1dd467e1e4fa7d57ad936e6ef4cfefec10f7ef0eedd3bc249c733f06d7bbdc2b73742a7a66535cd30246a7e45b8e5ebbaa277094476d18070f47397bebbccca75be0b0211f2abbc26caf1d76ff3eb933a67086f0aa0c41fe18dbd9dbdddedddbded9dbd373b9f3edadd7fb4737fbcfb60e7e0d37bf77e8ae053abbd9b5a716fc565d6e6a7cbd9aa2a96ed49b55ce653f446bd7feffba38f16c5b258ac176fcae627899ef439c17cf3fcf5eeefbf437d6465595d3d29abc9cbf5a42ca634eabca1f7da7a9d1305f3f6aaaadf1e4f4bfae8177f34b95e65f8f2a3e31facebfc755e5f16d49a805c1675bbceca17d2fcd5baa44fb9eb62e5fd31cbcfb375d91e336e8082ae318066bd5a5575db7cbb6d57cd9b3a3b3f2fa65f2ecb6b8346be9cd6d7cc54c0a231fdd2efe74569e8f946e69306806923a4f265362973e24b0152664d7b2a1fc92cdc48d70951e56709384127a8af99f3a9718f09d13d312c4dc51b11bf6f57e895f8eab2c00c16cb0b12c816efbe5e53bb7c46b88c3e9a066c16c1617ffc70e7fedecec33db017f1cd22abaf0ddf304167e7f4e3a33926e2d15d230a8409862da233a626e36955e7e32b5203d55533262eb94be0ae72a2d6e6577ff0e9985a45df16626f7e1d6da22fffa275bec68037becd8da2afb798b89b5ee746d1d7850937bf8d369197699a75169e0fe89886a679dd7c79fe529ad1d7d96556944006dfe6d30a6ad97f7d49a234efbdffdab4a4160ec22ff925","ff0ff4853516fe050000"], [
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
  'x-ms-request-id',
  'b5a0ff8c-ec30-4bc4-aa59-f8e3b761d4b5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'Server',
  'Microsoft-Azure-Storage-Resource-Provider/1.0,Microsoft-HTTPAPI/2.0 Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-writes',
  '1197',
  'x-ms-correlation-request-id',
  '31da2f40-463d-4687-a9e9-72e9e1a8e198',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211202T061434Z:31da2f40-463d-4687-a9e9-72e9e1a8e198',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Dec 2021 06:14:33 GMT'
]);
