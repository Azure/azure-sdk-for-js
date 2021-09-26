let nock = require('nock');

module.exports.hash = "e1fbb8bf640bc71422d415d0d29fd399";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/common/discovery/instance')
  .query(true)
  .reply(200, {"tenant_discovery_endpoint":"https://login.microsoftonline.com/azure_tenant_id/v2.0/.well-known/openid-configuration","api-version":"1.1","metadata":[{"preferred_network":"login.microsoftonline.com","preferred_cache":"login.windows.net","aliases":["login.microsoftonline.com","login.windows.net","login.microsoft.com","sts.windows.net"]},{"preferred_network":"login.partner.microsoftonline.cn","preferred_cache":"login.partner.microsoftonline.cn","aliases":["login.partner.microsoftonline.cn","login.chinacloudapi.cn"]},{"preferred_network":"login.microsoftonline.de","preferred_cache":"login.microsoftonline.de","aliases":["login.microsoftonline.de"]},{"preferred_network":"login.microsoftonline.us","preferred_cache":"login.microsoftonline.us","aliases":["login.microsoftonline.us","login.usgovcloudapi.net"]},{"preferred_network":"login-us.microsoftonline.com","preferred_cache":"login-us.microsoftonline.com","aliases":["login-us.microsoftonline.com"]}]}, [
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
  '4f7b159b-44d5-4e49-98b6-0b99c5291f00',
  'x-ms-ests-server',
  '2.1.12071.16 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=Akc5Y5GY9NxBraa-F50iCdM; expires=Tue, 26-Oct-2021 01:02:52 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrdfkRw67o57hnBX8dZE1mfiYwS9SWFtsdbRNn06g-PTdOp-3pWjkdQFGrHMffJZbXTNlfr5XdNPIw2wQu2PI0Z077TLY70AmPi6A1wd84g1TRwefKyItS79v7CBz13GuPjG8QdCuk0uTgSjS3JQajoBcsHKDViYJmtK9s-T_CozAgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sun, 26 Sep 2021 01:02:52 GMT',
  'Content-Length',
  '980'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/azure_tenant_id/v2.0/.well-known/openid-configuration')
  .reply(200, {"token_endpoint":"https://login.microsoftonline.com/azure_tenant_id/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/azure_tenant_id/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/azure_tenant_id/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/azure_tenant_id/oauth2/v2.0/authorize","device_authorization_endpoint":"https://login.microsoftonline.com/azure_tenant_id/oauth2/v2.0/devicecode","http_logout_supported":true,"frontchannel_logout_supported":true,"end_session_endpoint":"https://login.microsoftonline.com/azure_tenant_id/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"kerberos_endpoint":"https://login.microsoftonline.com/azure_tenant_id/kerberos","tenant_region_scope":"WW","cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}, [
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
  '13fd8d15-cc8b-4a5c-820a-a5e97ea42200',
  'x-ms-ests-server',
  '2.1.12071.16 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=Ar2fL64rvHlEqPxteZrVYzA; expires=Tue, 26-Oct-2021 01:02:52 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrCm0iMAgLq36sSlG5vZJcXY2kdHVUFTwbdZrYJFuWfn545UKmNOeK9FZacz_r8_kSvnZIynoOqw9CIRhlHxTIZ_7w6cLCkwaHH6Ns_--EQp35XjXO2pmk19cR59E5inllBfuN8eZeRpfSk1SojSchIRzQjeMSOn68PnoQGb9SZk8gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sun, 26 Sep 2021 01:02:52 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.1&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=bcaa2420-1d61-4b1c-a6d8-1b81a4d529bd&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  '1dab35f3-45d2-4073-82e1-741c69642000',
  'x-ms-ests-server',
  '2.1.12071.16 - NCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AmYt5dkURhRPrl9g7ztnPk_KBMGnAQAAALu94dgOAAAA; expires=Tue, 26-Oct-2021 01:02:52 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sun, 26 Sep 2021 01:02:52 GMT',
  'Content-Length',
  '1321'
]);

nock('https://api.loganalytics.io:443', {"encodedQueryParams":true})
  .post('/v1/workspaces/%3Cworkspace-id%3E/query', {"query":"AppEvents | limit 1","timespan":"P1D"})
  .reply(200, ["1f8b0800000000000003","95556d6fda3010fe2ffecca64053d6e55b075215551444a01f3aa1c92427b048eccc2f1d19ca7fdfd9090d55ab98a1489c7dcfbddff94e44d36d0e8a443f4f84d302484416921554564b5026d7644052919b82bf83ac8053aee30cb9ba2aed8dd292f11da9071d8615f0001c24d57001ccf0a89175097db27f3daa1652942035433f3b3d1532597a099b01554642015cf703e7a5f58a09ee33fc06ec0f754125f8d291545cef31f2341146a6bd561350ca6b73ad40fa11f7068d72b46a8b70053c4d85f145725f96cf20ad871ed452e4e0cb700b8bb9d294f7a76592330c6565d95ed44c6490fb61f3c48f89177ecc84e9ca8f4a3456612eb19b5fd955b14e6c316435974bd879d2dd08fc90e20f96b10f8863ed1af0611d4ffb70f123f486944c1fafe8825843e1a2e8400c0f977a9c3749a510d9fb9c78eafeeb1cd867cdbb19109b197cc23696c65ed34ce154e0cd89fc36202b4bc0115263a7dd3e5d240abe06e1f8eedb7088c2adeeb5a23bb0d094a67b47145088467acff0d5898201299852d0905a689a23550f48c6d4e10a98da539939b7f642b7f86da5a193e94e12303c7885f34deddeeaecffa5b655493b486df594c6aa31b69922120491fb9a84dc0698e003488e13d6f1481bc6c44a7e94409d5daa4aa08705c8271c52120d47c138bcb90bad59c64ba3a75453056e5aba22c151bb671dc973b6305929e51c97cb053d637c7ade30d68d60f8c57dabcea3e6f7423a197abc56a63e37d2e76eb46c2d24384ccb593a919bd1387c033fd3dc804ad85f34791b8ebe8fc2f1bbeadba6c47de716282e2f6ba6bd4a4a4819cd51326b8b957d4c18ae6ab7d8d172337eaecdec4d6332a837755dff03290e04b5fe070000"], [
  'Date',
  'Sun, 26 Sep 2021 01:02:53 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'keep-alive',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'via',
  '1.1 draft-oms-65975698db-q47st',
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
