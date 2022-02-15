let nock = require('nock');

module.exports.hash = "8be490d3f5bcda545b6684bcfa373fa8";

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
  '5fcb7147-2b4a-4d90-859f-7619e7ac0600',
  'x-ms-ests-server',
  '2.1.12470.11 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=Ao6e6R8E5alJjUZDM-IThVs; expires=Thu, 17-Mar-2022 09:31:56 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrEHPvexei3_M4jHV4P3J_iiwT1nrJMlMjyDVol-89MO9OJ4yDKeSCKkhpUv8MpiAt7WCeASAcwdLqFkhvGmymibsqCg4jzqpGQBpTOKBVdz9ajuWRFuVysTfjDXJTWoNjT3ba1OHADWVBEgUtmGsaEoNKGKVCmQKU8XaGZaMNS1wgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 15 Feb 2022 09:31:55 GMT',
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
  '9e514e18-708c-4cef-8f33-a6d780c61a00',
  'x-ms-ests-server',
  '2.1.12470.11 - KRSLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AogFanc7qpJKoaC2lgaAg1w; expires=Thu, 17-Mar-2022 09:31:56 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr5YXQNPRPz_gO3D_KUuSb0PH1igG1MU5fiJew_cXXJrm21MpviMEotG_OP5Sr-GAXVNQXq9knNWdFWR5lsKuo22uGbcvXXlJpCgHsVUySZbjEr6eHfGY8yQaPhGgZq1CuIyzaZan71X0X8MyVX4nlipA0vIuYzmsp77Pnm-5OLhwgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 15 Feb 2022 09:31:55 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.5.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=59dcf20b-53d7-41a6-8723-13903b94d2fa&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  'f8b09e25-bac5-4fb7-b3ba-3e008fa40600',
  'x-ms-ests-server',
  '2.1.12470.11 - SEASLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Arcd_L6kMhZCoEVekT8tOzzLj78gAQAAAAxqndkOAAAA; expires=Thu, 17-Mar-2022 09:31:56 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 15 Feb 2022 09:31:55 GMT',
  'Content-Length',
  '1393'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .put('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Storage/storageAccounts/storageaccountzzzxxx', {"sku":{"name":"Standard_GRS"},"kind":"StorageV2","location":"westeurope","tags":{"key1":"value1","key2":"value2"},"properties":{"encryption":{"services":{"blob":{"enabled":true,"keyType":"Account"},"file":{"enabled":true,"keyType":"Account"}},"keySource":"Microsoft.Storage"}}})
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'text/plain; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Storage/locations/westeurope/asyncoperations/577c7748-dd16-4833-9372-72fb3a245662?monitor=true&api-version=2021-08-01',
  'Retry-After',
  '0',
  'x-ms-request-id',
  '577c7748-dd16-4833-9372-72fb3a245662',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'Server',
  'Microsoft-Azure-Storage-Resource-Provider/1.0,Microsoft-HTTPAPI/2.0 Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-writes',
  '1199',
  'x-ms-correlation-request-id',
  '3c64c169-3abf-4ffe-a150-ca5ab26eb526',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220215T093206Z:3c64c169-3abf-4ffe-a150-ca5ab26eb526',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 15 Feb 2022 09:32:06 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Storage/locations/westeurope/asyncoperations/577c7748-dd16-4833-9372-72fb3a245662')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'text/plain; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.Storage/locations/westeurope/asyncoperations/577c7748-dd16-4833-9372-72fb3a245662?monitor=true&api-version=2021-08-01',
  'Retry-After',
  '0',
  'x-ms-request-id',
  'fe66358a-bc6c-4a46-9c65-b5a12aa1b483',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'Server',
  'Microsoft-Azure-Storage-Resource-Provider/1.0,Microsoft-HTTPAPI/2.0 Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11999',
  'x-ms-correlation-request-id',
  '2a35cf0b-76de-4d9d-a2ba-02f12dea6e62',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220215T093206Z:2a35cf0b-76de-4d9d-a2ba-02f12dea6e62',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 15 Feb 2022 09:32:06 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Storage/locations/westeurope/asyncoperations/577c7748-dd16-4833-9372-72fb3a245662')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147cddbf5478f7ef147cb6c917ff4e8a3d76db69c65f5ecf7fffcd5eb8f461fb5455e7b9f7ef44b461fbd2d9633fea8aab38bfc27f7a855810fee36eb4933ad8b555b54cbe6eec3bdf387f76707e7dbf7a69f3ed8dedfdddbdf7eb83b7db07d303ddf79309d4dcef7f677efd67953adeb69fe795dad57cdddc5f54f376ddeb47757757559ccf2bab9fb4531adaba63a6fc7dae1dd467e1e4fa7d57ad936e6ef4cfefec10f7ef0eedd3bc249c733f06d7bbdc2b73742a7a66535cd30246a7e45b8e5ebbaa277094476d180706ff3eb5dfaee322bd7f92e7d4e7fef99bff740301acc2aaf8992a6f9499d33c4370550e48f00616f676f6f7b676f7bf7fe9b9d878feeed3ddad91fdfdfbbbf7b70efde4f39b81b5b716fc565d6e6a7cbd9aa2a96ed49b55ce653f446bd7feffba38f16c5b258ac176fcae62789bef439c17cf3fcf5eeefbf437d6465595d3d29abc9cbf5a42ca64485bca1f7da7a9d1345f3f6aaaadf1e4f4bfae8177f34b95e65f8f2a3e31facebfc755e5f16d49a805c1675bbceca17d2fcd5baa44fb9eb62e5fd31cbcfb375d91e336e8082ae318066bd5a5575db7cbb6d57cd9b3a3b3f2fa65f2ecb6b8346be9cd6d7cc64c0a231fdd2efe74569e8f946e69706806924a4f265362973e2530152664d7b2a1fc92cdc48d70951e56709384127a8af5912a8718f29d13d31304dc51b11c76f57e895f8eab2c00c16cb0b12d016efbe5e53bb7c46b88c3e9a066c16c5e1dec1fefdfb0f77c05ec4378bacbe367cc3049d9dd38f8fe6988847778d68102618b688d2989a8ca7559d8faf482d5457cd98b8e42e81bbca895a9b5ffdc1a7636a157d5b88bdf975b489befc8bd6f91a03def836378abede62e26e7a9d1b455f1726dcfc36da445ea669d659783ea0731a9ae675f3e5f94b69465f6797595102197c9b4f2ba869fff52589d2bcf7fe6bd3925a3808bfe4","97fc3f7d19cddf0e060000"], [
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
  '8981bac3-a35b-409c-b75e-0d44058bdac2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'Server',
  'Microsoft-Azure-Storage-Resource-Provider/1.0,Microsoft-HTTPAPI/2.0 Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11998',
  'x-ms-correlation-request-id',
  '7d3e47c7-e743-45bb-a7be-081280b43fe2',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220215T093224Z:7d3e47c7-e743-45bb-a7be-081280b43fe2',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 15 Feb 2022 09:32:23 GMT'
]);
