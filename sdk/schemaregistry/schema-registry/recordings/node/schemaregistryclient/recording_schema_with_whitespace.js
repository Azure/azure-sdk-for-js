let nock = require('nock');

module.exports.hash = "0b3c28a040a75094ce119c3183f3ec05";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/common/discovery/instance')
  .query(true)
  .reply(200, {"tenant_discovery_endpoint":"https://login.microsoftonline.com/azuretenantid/v2.0/.well-known/openid-configuration","api-version":"1.1","metadata":[{"preferred_network":"login.microsoftonline.com","preferred_cache":"login.windows.net","aliases":["login.microsoftonline.com","login.windows.net","login.microsoft.com","sts.windows.net"]},{"preferred_network":"login.partner.microsoftonline.cn","preferred_cache":"login.partner.microsoftonline.cn","aliases":["login.partner.microsoftonline.cn","login.chinacloudapi.cn"]},{"preferred_network":"login.microsoftonline.de","preferred_cache":"login.microsoftonline.de","aliases":["login.microsoftonline.de"]},{"preferred_network":"login.microsoftonline.us","preferred_cache":"login.microsoftonline.us","aliases":["login.microsoftonline.us","login.usgovcloudapi.net"]},{"preferred_network":"login-us.microsoftonline.com","preferred_cache":"login-us.microsoftonline.com","aliases":["login-us.microsoftonline.com"]}]}, [
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
  'f584f9e8-9676-44f8-9f03-e5b3503f0c00',
  'x-ms-ests-server',
  '2.1.12197.4 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=Aov3p4wl7rdLvps9vkc-Ddg; expires=Mon, 06-Dec-2021 00:40:23 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrUyxkRF6JtyPL0o1PTLIcK_ZHEOgW9CAoXarE0T_rfpvkEIQKlXHt6819BRFmYNLsI1L9xpqxuJJGcIcy5ouI6YZDjThYjyLJOMJZQT3k2yOQCXFhvgj3NwHkBdim-4nXIXMbNmBBfy7n7PpMgIHPe_YGBsLhELukyxL8JONxUA4gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sat, 06 Nov 2021 00:40:22 GMT',
  'Content-Length',
  '980'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/azuretenantid/v2.0/.well-known/openid-configuration')
  .reply(200, {"token_endpoint":"https://login.microsoftonline.com/azuretenantid/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/azuretenantid/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/azuretenantid/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/azuretenantid/oauth2/v2.0/authorize","device_authorization_endpoint":"https://login.microsoftonline.com/azuretenantid/oauth2/v2.0/devicecode","http_logout_supported":true,"frontchannel_logout_supported":true,"end_session_endpoint":"https://login.microsoftonline.com/azuretenantid/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"kerberos_endpoint":"https://login.microsoftonline.com/azuretenantid/kerberos","tenant_region_scope":"WW","cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}, [
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
  'fa2354e4-e9dc-4e53-a8f7-2cc9fa9e4400',
  'x-ms-ests-server',
  '2.1.12197.4 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AofbvpRGO3lKqcOpfEW4wzE; expires=Mon, 06-Dec-2021 00:40:23 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrO5HcclYTnNIyO1kPknYEzJ7MIsD_iz5kEmtiygDqxkoa4_opX0WyJGFizFeZ-V6uu9T4Xv-k-K7xBp1CEOEsOS2D48gLvVDN9E9vUDjYXnHJK-HWfEqRLlWC_uUKqXr4CY87NHZo0iwxFU1IKrYSg06CPuGFkIPuGfKUNEPfFEIgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sat, 06 Nov 2021 00:40:22 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azuretenantid/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.2&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=55e129e1-68b5-4a30-8db8-46dbfae99ca7&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  '275624f1-0225-4e3f-af0b-7c18ca775300',
  'x-ms-ests-server',
  '2.1.12197.4 - WUS2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AlI1fEUKkqBKr8wKcTMyCobmLYaiAQAAAPfFF9kOAAAA; expires=Mon, 06-Dec-2021 00:40:23 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sat, 06 Nov 2021 00:40:23 GMT',
  'Content-Length',
  '1321'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .put('/$schemaGroups/group-1/schemas/azsdk_js_test2', {"type":"record","name":"Test","fields":[{"name":"X","type":{"type":"string"}}]})
  .query(true)
  .reply(204, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint:443/$schemagroups/group-1/schemas/azsdk_js_test2/versions/1?api-version=2021-10',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'Schema-Group-Name',
  'group-1',
  'Schema-Name',
  'azsdk_js_test2',
  'Schema-Id',
  '24972ebfc1bf46a1a6e29f1845794f85',
  'Schema-Id-Location',
  'https://endpoint:443/$schemagroups/$schemas/24972ebfc1bf46a1a6e29f1845794f85?api-version=2021-10',
  'Schema-Version',
  '1',
  'Schema-Versions-Location',
  'https://endpoint:443/$schemagroups/group-1/schemas/azsdk_js_test2/versions?api-version=2021-10',
  'Strict-Transport-Security',
  'max-age=31536000',
  'Date',
  'Sat, 06 Nov 2021 00:40:24 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/$schemaGroups/$schemas/24972ebfc1bf46a1a6e29f1845794f85')
  .query(true)
  .reply(200, {"type":"record","name":"Test","fields":[{"name":"X","type":{"type":"string"}}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;serialization=Avro',
  'Location',
  'https://endpoint:443/$schemagroups/group-1/schemas/azsdk_js_test2/versions/1?api-version=2021-10',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'Schema-Group-Name',
  'group-1',
  'Schema-Name',
  'azsdk_js_test2',
  'Schema-Id',
  '24972ebfc1bf46a1a6e29f1845794f85',
  'Schema-Id-Location',
  'https://endpoint:443/$schemagroups/$schemas/24972ebfc1bf46a1a6e29f1845794f85?api-version=2021-10',
  'Schema-Version',
  '1',
  'Schema-Versions-Location',
  'https://endpoint:443/$schemagroups/group-1/schemas/azsdk_js_test2/versions?api-version=2021-10',
  'Strict-Transport-Security',
  'max-age=31536000',
  'Date',
  'Sat, 06 Nov 2021 00:40:25 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/$schemaGroups/group-1/schemas/azsdk_js_test2:get-id', {"type":"record","name":"Test","fields":[{"name":"X","type":{"type":"string"}}]})
  .query(true)
  .reply(204, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint:443/$schemagroups/group-1/schemas/azsdk_js_test2/versions/1?api-version=2021-10',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'Schema-Group-Name',
  'group-1',
  'Schema-Name',
  'azsdk_js_test2',
  'Schema-Id',
  '24972ebfc1bf46a1a6e29f1845794f85',
  'Schema-Id-Location',
  'https://endpoint:443/$schemagroups/$schemas/24972ebfc1bf46a1a6e29f1845794f85?api-version=2021-10',
  'Schema-Version',
  '1',
  'Schema-Versions-Location',
  'https://endpoint:443/$schemagroups/group-1/schemas/azsdk_js_test2/versions?api-version=2021-10',
  'Strict-Transport-Security',
  'max-age=31536000',
  'Date',
  'Sat, 06 Nov 2021 00:40:25 GMT'
]);
