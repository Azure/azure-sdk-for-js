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
  '2d0a7618-bccf-409b-8455-37bc27397e00',
  'x-ms-ests-server',
  '2.1.12071.16 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=As99Q8xnEIVImIJwSNsudcU; expires=Thu, 28-Oct-2021 00:32:39 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevremSbD5eCPm72fxIN5Y8X0g_CYJFcRZf7kGQUJ5OLnfjkVnNp8Zb0L2t2NA9lc5-QOb1rmFFF9AMyxGRv-0kB-NIXhRTApZlpzcLnbGne6N2Lvf8jWFstMdKb3zqGdKsaIZMdpMbdISlXT21NMVR_xrkSh7373iVBlX-7Z-aLjTAgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 28 Sep 2021 00:32:39 GMT',
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
  'b0a6628d-9427-44e8-9128-1113f1ea8300',
  'x-ms-ests-server',
  '2.1.12071.16 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AhWcyIeJn5FAqwyliQziRSo; expires=Thu, 28-Oct-2021 00:32:40 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrKDrKeufqmALIAm6a_T0ZcLYrYNYoAx5ZqGP7v8IsAnlf4Igf85z6Ww1HiAr2LY5QxMd5NjD3EB3pe6Ay81EqSyWnszw8s8ddMwYGMhD3Hv18P8WMI7Z0Csp06CCB8D9WPW5KaN5OJRIRNmVnoqreRTYqtlm5PHIggykpLF5uMu4gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 28 Sep 2021 00:32:39 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/98123456-7614-3456-5678-789980112547/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.1&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=8cad4731-c57e-40d7-b92d-700f4068d7da&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  '55154da3-3be6-4c9d-a470-21696a906d00',
  'x-ms-ests-server',
  '2.1.12071.16 - WUS2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Ap0vaVGksPtLnuQZOUZ2jeLKBMGnAQAAAKdZ5NgOAAAA; expires=Thu, 28-Oct-2021 00:32:40 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 28 Sep 2021 00:32:40 GMT',
  'Content-Length',
  '1321'
]);

nock('https://api.loganalytics.io:443', {"encodedQueryParams":true})
  .post('/v1/workspaces/%3Cworkspace-id%3E/query', {"query":"AppEvents | limit 1","timespan":"P1D"})
  .reply(200, ["1f8b0800000000000003","95955f4fdb3010c0bf8b9f4b9538699be68db512aa10b46a80072634b9c9895a244e663b8c0ce5bbefeca6a4081477a8128efd3bdffff33bd16c978322f1cf7722580124261bc90b269b2da83ad76444d232af0bf109b903c1845e6578aa9bcaec282db97826eda8677801572040320d2760869f1a8f4ed15bf36fe0aa8d2c2b909aa39dfd3d0d1ef2f414bb01a66a0905083d0cae2b63152f854bf10738ecea86497085236984dea3e76952d6321dd49a80524e9df70aa49bb8ac51a940ad260967e0695ad62e4f2eabea01a4b1d0416dcb1c5c11eeb095509a89e1b02c728eaedc99632775536690bbb175e266561b37b3e0ba715389c62cac2556f32b3fcbd78549866cd6720bcf8e701f047ec8f20fa67108c4b6b6057875bf5a0e71ab6b187429595e9f51052b0d85f5a287387e9cde63ad491a85e4e03871e4fdd7d1b1ef8af769444c6470843d9935d69ae60abb0277dec9ef1a646316f006696dbadd8c2e127b63df9b87be8fb2ddd5f78a3d83215396eeeda280a23c08ef390e9dd8f746a4e04a99898a4b5d6a969bdd764432ae5e7af05bce606acf6466edda97bae3778d865ea6ff9280fec12b1c775a3bacb3ff97da3515eb91d6dc53d5e69ada54534c3c2fb6bfb14f271efe61845f400a6cb1fe8c746e2c8ce45709bcb30f5605ec6503f216bb14a313fa532f0ca851cb4555eb25d34c816d973e4bf0a6ed5cc7e5475429862b6542e0fb12f7eb1b2e96c7472626d4a3fe8537bfa0b33b7f1a87b338f0c7d49fcfa6943e925e86bd7d2f438338a471301947d37910d0e8d13872a8a50f43826842c379149e58134ca3298d3a5497122cdf1d6fadb8ef53535bddde03cb6b5009ff6b031206133a8b3e5583a9527c00ed8b8aaf994964b79554907296a368d6252ffb1a407cbbed4b8fba0ffd68cbceec1c747aed53dbb6ff008192b86f0f080000"], [
  'Date',
  'Tue, 28 Sep 2021 00:32:40 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'keep-alive',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'via',
  '1.1 draft-oms-65975698db-lhwlt',
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
