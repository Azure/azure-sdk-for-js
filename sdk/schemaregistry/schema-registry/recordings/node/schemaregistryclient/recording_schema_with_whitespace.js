let nock = require('nock');

module.exports.hash = "35625a575b7c8d82c9ac838b8b50c1b0";

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
  '085000a0-d0c2-4327-bc57-073a800f5e00',
  'x-ms-ests-server',
  '2.1.12025.15 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AkasTIs8XslGkdzlBwixbQI; expires=Sun, 17-Oct-2021 22:36:24 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrBQW399zfluRoqmGJfQ4PDoqt1kNkStjKLhmoNAL333lHhF9t0lAIDSiHLtA0WNYwD-0D13WNvYOtKb_K5bY-G-jKMKwr4r8pt-JcEhfyHKW_NT-_kp2H95H6Lkl9fr6aAXqbLe-Q9WlI_mHtFFvybdpKSzZUMLh-U_PClfuaLBogAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 17 Sep 2021 22:36:23 GMT',
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
  'fb73c479-24ee-4348-b36c-9be049402100',
  'x-ms-ests-server',
  '2.1.12071.7 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AtKwNTdHP_JLjSgjA58IDlg; expires=Sun, 17-Oct-2021 22:36:24 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr5odae1OtYoNPO8BPcnSLdRVN-abTMF6RdY5kzFnm5muKZN1FCy-_Yg2-bUDjmVFdHY95sWZbTup6b0Bz7Tt1GiKKNhf7N4PT0BYGTwHrV4qpnLll_w7VreXiw6czW4GbUSSt4zgllKyr2Z_i7nx0bIendTRx3_ltJZOucZhpdT0gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 17 Sep 2021 22:36:23 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azuretenantid/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.1&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=9c187b55-4869-41f4-a157-32f84c69a07e&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  'fde4e467-3d95-474b-9987-9d457ccd5800',
  'x-ms-ests-server',
  '2.1.12071.7 - SCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AlhUORWVyeNMvtaBW0TAacs; expires=Sun, 17-Oct-2021 22:36:24 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 17 Sep 2021 22:36:23 GMT',
  'Content-Length',
  '1321'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .put('/$schemagroups/group-1/schemas/azsdk_js_test2', {"type":"record","name":"Test","fields":[{"name":"X","type":{"type":"string"}}]})
  .query(true)
  .reply(200, {"id":"24972ebfc1bf46a1a6e29f1845794f85"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json',
  'Location',
  'https://endpoint:443/$schemagroups/group-1/schemas/azsdk_js_test2/versions/1?api-version=2020-09-01-preview',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'Schema-Id',
  '24972ebfc1bf46a1a6e29f1845794f85',
  'Schema-Id-Location',
  'https://endpoint:443/$schemagroups/getschemabyid/24972ebfc1bf46a1a6e29f1845794f85?api-version=2020-09-01-preview',
  'Serialization-Type',
  'Avro',
  'Schema-Version',
  '1',
  'Schema-Versions-Location',
  'https://endpoint:443/$schemagroups/group-1/schemas/azsdk_js_test2/versions?api-version=2020-09-01-preview',
  'Strict-Transport-Security',
  'max-age=31536000',
  'Date',
  'Fri, 17 Sep 2021 22:36:24 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/$schemagroups/getSchemaById/24972ebfc1bf46a1a6e29f1845794f85')
  .query(true)
  .reply(200, {"type":"record","name":"Test","fields":[{"name":"X","type":{"type":"string"}}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json',
  'Location',
  'https://endpoint:443/$schemagroups/group-1/schemas/azsdk_js_test2/versions/1?api-version=2020-09-01-preview',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'Schema-Id',
  '24972ebfc1bf46a1a6e29f1845794f85',
  'Schema-Id-Location',
  'https://endpoint:443/$schemagroups/getschemabyid/24972ebfc1bf46a1a6e29f1845794f85?api-version=2020-09-01-preview',
  'Serialization-Type',
  'Avro',
  'Schema-Version',
  '1',
  'Schema-Versions-Location',
  'https://endpoint:443/$schemagroups/group-1/schemas/azsdk_js_test2/versions?api-version=2020-09-01-preview',
  'Strict-Transport-Security',
  'max-age=31536000',
  'Date',
  'Fri, 17 Sep 2021 22:36:25 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/$schemagroups/group-1/schemas/azsdk_js_test2', {"type":"record","name":"Test","fields":[{"name":"X","type":{"type":"string"}}]})
  .query(true)
  .reply(200, {"id":"24972ebfc1bf46a1a6e29f1845794f85"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json',
  'Location',
  'https://endpoint:443/$schemagroups/group-1/schemas/azsdk_js_test2/versions/1?api-version=2020-09-01-preview',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'Schema-Id',
  '24972ebfc1bf46a1a6e29f1845794f85',
  'Schema-Id-Location',
  'https://endpoint:443/$schemagroups/getschemabyid/24972ebfc1bf46a1a6e29f1845794f85?api-version=2020-09-01-preview',
  'Serialization-Type',
  'Avro',
  'Schema-Version',
  '1',
  'Schema-Versions-Location',
  'https://endpoint:443/$schemagroups/group-1/schemas/azsdk_js_test2/versions?api-version=2020-09-01-preview',
  'Strict-Transport-Security',
  'max-age=31536000',
  'Date',
  'Fri, 17 Sep 2021 22:36:25 GMT'
]);
