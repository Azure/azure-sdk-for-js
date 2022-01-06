let nock = require('nock');

module.exports.hash = "70ec8467e7075a5d02bc0495319607cd";

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
  '948dac8e-7f55-4dd2-9362-a225ae0b2604',
  'x-ms-ests-server',
  '2.1.12261.17 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AtyBkJNxRh5ClkPscieZ-zo; expires=Sat, 05-Feb-2022 21:36:55 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrYXba-4nAZRa8uQLOtWGQxpxcETk9Z_K5wTWzTMM42M7Ky9GgnQc9CqYjwqpGQsjQrs6Kuv4ZP0fzJS4G2GXwHHGNB97CiIUWeRqeOj-W7eMvao1qvw-4M-IEc3XkhWWQOvWHu21kaqJBeZktQk0J9SjcpxkQjO44IpMJAUPem8wgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 06 Jan 2022 21:36:55 GMT',
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
  '554e7adf-29bd-4a47-9f87-518c301cda01',
  'x-ms-ests-server',
  '2.1.12261.17 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AiY-xha6vdxBv83o1vYBACw; expires=Sat, 05-Feb-2022 21:36:55 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrNBaA8bwIE16S2cb6N5-_QuvkUpw_y1MrELsWkE_zFtJpcPpPJOFYDw3mwOURYcwUuE2tD74tVs6e77l72_vDP7GSY21BwG6_tzU-lFYLviCQS38sFJqw4-VQz3QvZyOH5g5Q3b_DQ0s6ckFoX_PdqhpzTTxBdCdOlcGqHE4GakggAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 06 Jan 2022 21:36:55 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azuretenantid/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.4.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=665df302-8162-4c24-a7d8-ff549930309b&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  'ef3ee9c4-1f6e-4c33-b117-fc0e7f64dd00',
  'x-ms-ests-server',
  '2.1.12261.17 - WUS2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AobBU3msdWNOuHJp-m5luOYawS9yAQAAAPdXadkOAAAA; expires=Sat, 05-Feb-2022 21:36:55 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 06 Jan 2022 21:36:55 GMT',
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
  '052e7046f99f4a6a82f38b5902ebf5e3',
  'Schema-Id-Location',
  'https://endpoint:443/$schemagroups/$schemas/052e7046f99f4a6a82f38b5902ebf5e3?api-version=2021-10',
  'Schema-Version',
  '1',
  'Schema-Versions-Location',
  'https://endpoint:443/$schemagroups/group-1/schemas/azsdk_js_test2/versions?api-version=2021-10',
  'Strict-Transport-Security',
  'max-age=31536000',
  'Date',
  'Thu, 06 Jan 2022 21:36:56 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/$schemaGroups/$schemas/052e7046f99f4a6a82f38b5902ebf5e3')
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
  '052e7046f99f4a6a82f38b5902ebf5e3',
  'Schema-Id-Location',
  'https://endpoint:443/$schemagroups/$schemas/052e7046f99f4a6a82f38b5902ebf5e3?api-version=2021-10',
  'Schema-Version',
  '1',
  'Schema-Versions-Location',
  'https://endpoint:443/$schemagroups/group-1/schemas/azsdk_js_test2/versions?api-version=2021-10',
  'Strict-Transport-Security',
  'max-age=31536000',
  'Date',
  'Thu, 06 Jan 2022 21:36:56 GMT'
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
  '052e7046f99f4a6a82f38b5902ebf5e3',
  'Schema-Id-Location',
  'https://endpoint:443/$schemagroups/$schemas/052e7046f99f4a6a82f38b5902ebf5e3?api-version=2021-10',
  'Schema-Version',
  '1',
  'Schema-Versions-Location',
  'https://endpoint:443/$schemagroups/group-1/schemas/azsdk_js_test2/versions?api-version=2021-10',
  'Strict-Transport-Security',
  'max-age=31536000',
  'Date',
  'Thu, 06 Jan 2022 21:36:56 GMT'
]);
