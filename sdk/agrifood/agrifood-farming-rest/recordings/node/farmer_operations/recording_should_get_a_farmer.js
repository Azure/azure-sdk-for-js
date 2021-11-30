let nock = require('nock');

module.exports.hash = "80af99833f85dc0620102e8d29425bf0";

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
  '12acbf4c-020a-4c83-9837-b97185504000',
  'x-ms-ests-server',
  '2.1.12171.14 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AvlQ9I_QSKVMsT6OmVtQzzk; expires=Sat, 04-Dec-2021 17:00:24 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr_86C39qhmQLcyOXHvnB6EWFHFxZ9bTKT9XnbPCNdOv_RtYBbdq_3-yIG_ZGgVoyH5o2bM4elfw4g09gcssfS_dIbsIRCIWjcyyohC3_6Ub0Ij0ICMXpC_hj4GVh-e4OjZUEobVxMwPnQUhxugKpYQtf4_H-nsi1MVMYd0AGSzpggAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 04 Nov 2021 17:00:24 GMT',
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
  'd70e0fcb-48e0-4fb0-912b-403ec5bd2100',
  'x-ms-ests-server',
  '2.1.12197.4 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AhmmcLdBYlZLm84LweKOWxI; expires=Sat, 04-Dec-2021 17:00:24 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrD9DpjPkt03cgRbvKdDG7_sVl19M4hBR0Eyl3lvYnKH9O9ImKUAUrmSTpJB0sybzz_R05-tm-rbhDuJ2UALn6HXT2Y7-L3wizfYIkxFanPbETSwIfjxQ07Xkpwqk1DK33csJIsTA4EVzouWurBMIA_A6hSQGWfikJhIRdtvbcv9kgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 04 Nov 2021 17:00:24 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.2&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=d603c919-560a-408b-a5a7-369dc917ac5e&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  '9828d674-9b69-4755-b4e1-38b256ce2200',
  'x-ms-ests-server',
  '2.1.12197.4 - EUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=An7VkXawiUhLl6d_702Ee0F4ycTJAQAAAKgIFtkOAAAA; expires=Sat, 04-Dec-2021 17:00:25 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 04 Nov 2021 17:00:25 GMT',
  'Content-Length',
  '1321'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/farmers/tst103node')
  .query(true)
  .reply(200, ["1f8b0800000000000403648fc16ac3300c865fc5f8bc80e585acf83656f604b96c37d756363162055b198cd277af5c1814ea8390ffffd36ff96c29db60a509b8e7c219ed93c5397ea9e6f42c98e2d09bc14dbdf46e82c308100ffda27493287b53fe3509fdf6f954310ae6a396995654cb3b0f9a30783fc3144617003e155c39d3428f24283ccef0129c0b7eec6489b79c372ec28dcd7bac2b56d533b6546913e2a2cf7cf05e4dda9bf06a961b62ee00f38db5afb755deb00aa12e7db6a07365d7344ae607ffd45f98553bc59effef70d16fc0e572050000ffff","0300150b7f4f2f010000"], [
  'Date',
  'Thu, 04 Nov 2021 17:00:25 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'keep-alive',
  'Vary',
  'Accept-Encoding',
  'x-ms-request-id',
  '0HMCT639406F1:00000001',
  'api-supported-versions',
  '2021-03-31-preview, 2021-07-31-preview',
  'x-ms-throttle-information',
  '1',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Content-Encoding',
  'gzip'
]);
