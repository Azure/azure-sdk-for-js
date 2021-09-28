let nock = require('nock');

module.exports.hash = "e1fbb8bf640bc71422d415d0d29fd399";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/common/discovery/instance')
  .query(true)
  .reply(200, {"tenant_discovery_endpoint":"https://login.microsoftonline.com/98123456-7614-3456-5678-789980112547/v2.0/.well-known/openid-configuration","api-version":"1.1","metadata":[{"preferred_network":"login.microsoftonline.com","preferred_cache":"login.windows.net","aliases":["login.microsoftonline.com","login.windows.net","login.microsoft.com","sts.windows.net"]},{"preferred_network":"login.partner.microsoftonline.cn","preferred_cache":"login.partner.microsoftonline.cn","aliases":["login.partner.microsoftonline.cn","login.chinacloudapi.cn"]},{"preferred_network":"login.microsoftonline.de","preferred_cache":"login.microsoftonline.de","aliases":["login.microsoftonline.de"]},{"preferred_network":"login.microsoftonline.us","preferred_cache":"login.microsoftonline.us","aliases":["login.microsoftonline.us","login.usgovcloudapi.net"]},{"preferred_network":"login-us.microsoftonline.com","preferred_cache":"login-us.microsoftonline.com","aliases":["login-us.microsoftonline.com"]}]}, [
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
  '16b89e07-7054-48a4-8bb5-2a93d1337800',
  'x-ms-ests-server',
  '2.1.12071.16 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=Aj2NbgiZotNLgS1Ci9352ls; expires=Thu, 28-Oct-2021 19:18:35 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrMsDBCFDF7FhPPhsrq1PtwHvoHxh3Vt7q3iqiXAFCOBi4EtAV6Gafabe_N2vNKYvxsRuj_M5yBTsZLlWjsWIsz9wfqT3kwhmPL22r2B27MZDYLC2RWTWIViRLJuXU-KDmQZFEwHWrgFck9eM63zwSLkG-iIpTp5qrJNOLVak_QX8gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 28 Sep 2021 19:18:34 GMT',
  'Content-Length',
  '980'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/98123456-7614-3456-5678-789980112547/v2.0/.well-known/openid-configuration')
  .reply(200, {"token_endpoint":"https://login.microsoftonline.com/98123456-7614-3456-5678-789980112547/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/98123456-7614-3456-5678-789980112547/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/98123456-7614-3456-5678-789980112547/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/98123456-7614-3456-5678-789980112547/oauth2/v2.0/authorize","device_authorization_endpoint":"https://login.microsoftonline.com/98123456-7614-3456-5678-789980112547/oauth2/v2.0/devicecode","http_logout_supported":true,"frontchannel_logout_supported":true,"end_session_endpoint":"https://login.microsoftonline.com/98123456-7614-3456-5678-789980112547/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"kerberos_endpoint":"https://login.microsoftonline.com/98123456-7614-3456-5678-789980112547/kerberos","tenant_region_scope":"WW","cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}, [
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
  'e035c53e-f1e5-4276-8054-f03843e7c300',
  'x-ms-ests-server',
  '2.1.12071.16 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AkvqyNDgfI9Cu7Sp3qsfaAE; expires=Thu, 28-Oct-2021 19:18:35 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrVyCLNeSWQS4DkakHIbsG9oALZxx5lMom1z7kCDLXqq-8VETIc7sCBSK1-4mznMGVkFu8Y11rGAMiM4qeO-98ekIvG5ILBz7YFd4BCpwwUtz9J9xLVh5CA3tEWLYlljTYrT3LWhWyUkCNr6IGRarx1qwXEIv5TDUUT3rNk5xf0UYgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 28 Sep 2021 19:18:34 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/98123456-7614-3456-5678-789980112547/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.1&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=251cb156-ac08-4aa4-b54c-39018555418b&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  '0b71a627-6b50-4abe-8966-433ee564c000',
  'x-ms-ests-server',
  '2.1.12071.16 - SCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AoT660AGI-pDqyAeXh4pBK3KBMGnAQAAAIth5dgOAAAA; expires=Thu, 28-Oct-2021 19:18:35 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 28 Sep 2021 19:18:34 GMT',
  'Content-Length',
  '1321'
]);

nock('https://api.loganalytics.io:443', {"encodedQueryParams":true})
  .post('/v1/workspaces/%3Cworkspace-id%3E/query', {"query":"AppEvents | limit 1","timespan":"P1D"})
  .reply(200, ["1f8b080000000000000395556d6fda3010fe2ffeccaaa4838ee55b075215551444a01f3aa1c92427b048eccc2f1d19ca7fdfd9090d55ab98a1489c7dcfbddff94e44d36d0e8a443f4f84d302484416921554564b5026d7644052919b82bf83ac8053aee30cb9ba2aed8dd292f11da9071d8615f0001c24d57001ccf0a89175097db27f3daa1652942035433f3b3d1532597a099b01554642015cf703e7a5f58a09ee33fc06ec0f754125f8d291545cef31f2341146a6bd561350ca6b73ad40fa11f7068d72b46a8b70053c4d85f145725f96cf20ad871ed452e4e0cb700b8bb9d294f7a76592330c6565d95ed44c6490fb61f3c48f89177ecc84e9ca8f4a3456612eb19b5fd955b14e6c316435974bd879d2dd08fc90e20f96b10f8863ed1af0611d4ffb70f123f486944c1fafe8825843e1a2e8400c0f977a9c3749a510d9fb9c78eafeeb1cd867cdbb19109b197cc23696c65ed34ce154e0cd89fc36202b4bc0115263a7dd3e5d240a6e82afe1ed3044d956f55ad11d58644ad3bd230a284423bc67f8e844c180144c2968482d34cd91aa072463ea70054ceda9cc9c577ba15bfcb6d2d0c9742709181dbcc2f9a6764f75f6ff52dbaaa41da4b67a4a63d518db4b110982c87d374138babb1d0598df03488e03d6f1481bc6c44a7e94409d5daa4aa08705c8279c511285b7a3f138089c59c64ba3a75453056e58ba1ac151bb571dc973b6305929e51c77cb053d637c7a5e30d68d20fce2be55e751f37b219d0c3d5e2b539ffbe873375ab616121ca6e52c9dc87874f7867da6b90195b0bf3601c361f8edfbf85df16d4be2b673eb135797b5d25e2525a48ce62899b5b5ca3ee60b17b55beb68b8193ed765f6a63119d49bbaaeff01a0a33b9ffc070000"], [
  'Date',
  'Tue, 28 Sep 2021 19:18:36 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'keep-alive',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'via',
  '1.1 draft-oms-65975698db-5kf8t',
  'X-Content-Type-Options',
  'nosniff',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Expose-Headers',
  'Retry-After,Age,WWW-Authenticate,x-resource-identities,x-ms-status-location',
  'Vary',
  'Accept-Encoding',
  'Content-Encoding',
  'gzip'
]);
