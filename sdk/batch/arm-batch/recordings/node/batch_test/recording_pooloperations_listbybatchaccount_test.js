let nock = require('nock');

module.exports.hash = "dfff136b7698a0f933dd0b5724169444";

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
  'b001a4e6-9622-43bd-bc73-28bd4061d801',
  'x-ms-ests-server',
  '2.1.12231.7 - KRSLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AhnxXo6lCdhOh6bDPELVq0g; expires=Sun, 19-Dec-2021 07:07:42 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrEyYZSQOPn_cpGDhxq6ISHJRIoHz6NtrpuKxoJEhOHCw4FGf59EwJ19-q9eP0NLTx6DpW3WKpEjvDKYeBFJfbCxFEncIqgwzSBmjCGr2HHDV6BfcSqiDRzwJ8Ji99YrKfJnMZAECBm5tPtVURjs4Em06ncvAmkwzFvPW_kQK_bQsgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 19 Nov 2021 07:07:41 GMT',
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
  'cb0f8a18-9cf2-4235-8927-6ea96a573e00',
  'x-ms-ests-server',
  '2.1.12231.8 - KRSLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AoH2xSao4fpLtw_A2VUafH0; expires=Sun, 19-Dec-2021 07:07:42 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrQQV4wg5Kzm8_PbtZyKxkYnjMInkFgIsDASgIAPfo13xahDYaz1yM6mz5Y_pcd5XNXt34Xar6HxOa0SeXAKE4e1-J7TsUfiC9x-eV41cx1AxRtccvxkmRcq6hWixRlB3AGO5zYyDN65jxyMi82Ew-tyFemU4ccT-tft4G4YzEg5AgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 19 Nov 2021 07:07:41 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.3&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=5f6a2d40-55f9-4492-a893-d2d5f6c6082f&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  'a7763080-2c94-4c8e-a565-c4ea3aa84300',
  'x-ms-ests-server',
  '2.1.12231.8 - KRSLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=ArxJFTvAvE1BtsGbbbNiap8WPr5BAQAAAD1EKdkOAAAA; expires=Sun, 19-Dec-2021 07:07:42 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 19 Nov 2021 07:07:41 GMT',
  'Content-Length',
  '1351'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/pools')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef1479759b9ce3f7af4bd5ffc5131fbe8d147779bf5a499d6c5aa2daa6573f7e1def9c3fbb383f3ed7bd34f1f6cefefeeed6f3fdc9d3ed83e989eef3c98ce26e77bfbbb77ebbca9d6f534ffbcaed6abe6eee2faa79b366fdabbabbaba2c6679dddcfda298d655539db7e327593b9ddf9de0dfe3e9b45a2f5bbc90c9afefdebdbbbbaaaa121fe127fdfdd1e8a365b620043ff23f6aaf57f8683358346fa871de6617d4f8bb777fdf8f76de1d3c7d78fc64efc9fea727c74f4e9f9cfcbe1f5103c27395d76d91371f3dfac51f9559d37e51cd8af3220741f676f676b777e97f0fdfec3c7844ffdbdf193fdc7bb0bb7fb0ff53f4eeb4ce3390ea4dc148ded09a7aba2c1a6a5e2c2f5eb7598b575eafa7d33c9f516791efdfd4d9b2296edf415696d59411e2d7e985d76d9ecdaefb5fdd02f2de78ffdeceee8387007cb9785dfc00cd5ebf397ef1f4f8d5d3dfffe93e7d5c2cdbbc7e51cdf2936ab1582f0be9809a3d2d9a6c52f2a0daac79fbbaacdae6a534fde8d1ae7e389de7b37549637d5995c5f41ad45f5283674559be91197ebd22face3efa25a38f66f9aaacae17f9b23da996e7c5c5bad6ae7ef147d3b25acf5ee7f56531253c3a5f56cdb36c519404fca3fb844cd5fc2431247ff7d1b73efa2504b8996665fe3a6f5bc28319e0bc7897cf5ee353fcd566f545de3ecd67185b3ec300a8d53d8c005f3cafae5ed6455517edb57eb533fa8804828805ba56eb963a7af966f7fe17dc997cf325b11b23889958d33b1bba01419ee66ef2be64c924a0aff25fb4ce49740dd06e77343202dae263faac3fbb01dfe4755dd5d421a9812975482fa818fde4174458928c93aace7f625db5d9ab3cc3b4d13b8bbc69b20bb47d33cfd366954f59665215e6749e3529cd1e5aa73ff945da309c744a80d25f0448e97955a784e37296d5b3a73a4bbfe4fb44a5e9baae69a2bbd420caea3711aaff925ff2fd","5ff2ff00a1aa14fece040000"], [
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
  'x-ms-ratelimit-remaining-subscription-reads',
  '11975',
  'x-ms-request-id',
  '32b16566-6a5b-45c1-b3f7-07322250f817',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-correlation-request-id',
  'cf28641c-9bb0-43ef-b013-2d41a8eb0d4b',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070742Z:cf28641c-9bb0-43ef-b013-2d41a8eb0d4b',
  'Date',
  'Fri, 19 Nov 2021 07:07:42 GMT'
]);
