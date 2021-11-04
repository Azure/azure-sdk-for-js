let nock = require('nock');

module.exports.hash = "c949a802b1ef34ee1123cf022964eeee";

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
  'e1d52355-3b41-4b32-9463-4c3f39451e00',
  'x-ms-ests-server',
  '2.1.12171.15 - KRSLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AkkjX3wDs81PoFxl3XdFE5I; expires=Thu, 02-Dec-2021 06:35:58 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrFJRNILoWkERLWMHRCvPZtvuz7vRb3L32hP45n7I73v8N1flhnCFMdY2e9R277a6Mu1HsbtnGsvbqHr5EE-mIu9-mBSdZ8VUv2S0oGRrBOtp2_Hb6RW2bPuZuAvzdkDkpJkv3ZQsq7JwOptAv1RnBHoFTvw0gPBTlBTtqjBpXzI8gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 02 Nov 2021 06:35:58 GMT',
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
  'da72c021-5610-4913-b51e-bdcf9c3b2000',
  'x-ms-ests-server',
  '2.1.12171.15 - KRSLR2 ProdSlices',
  'Set-Cookie',
  'fpc=Amneho2sPyVOuAu8nbG-ieI; expires=Thu, 02-Dec-2021 06:35:59 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevryZ9Ww0NZyxlGziJBomBB4AnJggBgP4cCN-Pvj0JuO2S93jBxZbsxv1LQVvqoSeskIoAWR_uuYH-bto6U5pHvDsCdFtEOgPX0Q4ewitKn83JiGbqlJpyRB9gbLy8m3HHvwoFEYorolbrCFh_lhNpNasxelLPFkjONPfp0ya-LKiQgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 02 Nov 2021 06:35:58 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.2&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=5449f48c-1a68-4eb9-8fb4-102183ee61c1&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  'da72c021-5610-4913-b51e-bdcfa13b2000',
  'x-ms-ests-server',
  '2.1.12171.15 - KRSLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Av6OjOHG0IdJnZiJwDEshNYWPr5BAQAAAE7TEtkOAAAA; expires=Thu, 02-Dec-2021 06:35:59 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 02 Nov 2021 06:35:59 GMT',
  'Content-Length',
  '1351'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Network/virtualNetworks/virtualnetworkzzz')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef16f9ca4e947cb6c917ff428fde8b2a8db75562ef3f6aaaadffee0073ff868c4df17337c7bb7594f9a695dacdaa25a36771fee9d3fbc3f3b38dfbe37fdf4c1f6feeedefef6c3dde983ed83e9f9ce83e96c72beb7bf7bb7ce9b6a5d4ff3cfeb6abd6aee2eae7fba69f3a6bdbbaaabcb6296d7cddd2f8a695d35d5793b7e21ddde552cf4cfc6fcddc32a6fb30be0f5ddbbbfef470f26b307f9ec7c777bf6e9e47c7bff60e7de76f6309f6edfdbd99b4ef3bdbddd9df39ddff7237db1bd5ef1706fec5adb97d534c398f14e9e35edda7c41a358e5755be40d7dc5a4940f2f8b869a17cb8bd76dd67257afd784463ecb67f22635b394590b75b3fbf9eede83f3c9f683870fb2edfd4f3fa511eceeec6fdfcfce77a7e707e7e70f1fba97b3d98cde6f5eafb229c06bd7ee8b97757e5ebc63b4be67bea36f7777c6fcdfdddd4f3f321f7f5f7ef92506344d32513a78d382a7af0dab48333b19f2fcbf8d51ee1222f457a33fe99300dbafcb40f260a27bb32f0fbeba050fc813ce191ada69dadbef349de5657ec1bc883ebff7fdf0db555d5c525fa7cbd9aa2a96add2e56555165341f2a3d36536297b08e87bcf8be5dbd7797d594cf30dafba370dcbe0b9bd4ce95c3416d02f915fcc588c12d2f62ff3bc262202053bdc8f72c6e5e9ac22a2556d3e0541a8c1795636399a10c8","5ff2ff0058f53310da040000"], [
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
  'W/"7bd7edf1-d6bf-4803-a9ec-302cce2210f0"',
  'Vary',
  'Accept-Encoding',
  'x-ms-request-id',
  '04107583-e2cf-45b8-832a-417431c8cefc',
  'x-ms-correlation-request-id',
  '6a598cdc-602d-4f8e-8eff-efa24985c933',
  'x-ms-arm-service-request-id',
  'a36dc09f-58d4-4f93-aa4f-476d89b7efb1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11996',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211102T063559Z:6a598cdc-602d-4f8e-8eff-efa24985c933',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 02 Nov 2021 06:35:59 GMT'
]);
