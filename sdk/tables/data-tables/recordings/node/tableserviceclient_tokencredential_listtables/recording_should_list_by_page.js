let nock = require('nock');

module.exports.hash = "0645e2b17e9dfa27243e0947f4d8fed4";

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
  '5ae1895b-8b4e-4bec-95da-085cbfbcf200',
  'x-ms-ests-server',
  '2.1.12011.8 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=ArdR4qqOlJRBu93_BBxrmSM; expires=Thu, 07-Oct-2021 16:24:11 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevrm86p6qXLgKWen5Cs52EUnpcR2Cf3czxF-zbYJZzBnTZU2MDJFMQf2sAA3dHWxPvX7r_3Dq-Jop_KJKAn58pq6_CmvoOrWW-DhaHbbkzbSk6WGBbNygWxQ7SJ-g0BrOoRw7KrwP1QvDhLvvRu-lXu0iNTxzNs7QfsFDgg7erj2j0gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 07 Sep 2021 16:24:11 GMT',
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
  '0c1e8605-1d40-486a-8441-85bab24ac800',
  'x-ms-ests-server',
  '2.1.12025.12 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AgvSDWN8iO5GiG1XsUq49B0; expires=Thu, 07-Oct-2021 16:24:11 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrKjiQsDKh-sak_fkaD_vwCTHKVxiVGwK0iZspKhqBtjvr0eo-JqcJCQBJFn67CP69-rzURm5bcPQCdrC-kgREsIo4GceS-NLgwrB8lmx17dYR_UbHc-LsGXNCGIn7DrBMVl67CWXldlGXoVp1U_FL0O-DrznkK3gX8YcR4Qd1kWEgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 07 Sep 2021 16:24:11 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=48b4e63d-ab47-45c6-a022-ee829fdc61b8&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  '1e835f92-f254-434b-b330-e219ff1ad200',
  'x-ms-ests-server',
  '2.1.12025.12 - SCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AkVCMB-EwRtLvPQv1A8jlR8; expires=Thu, 07-Oct-2021 16:24:11 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 07 Sep 2021 16:24:11 GMT',
  'Content-Length',
  '1318'
]);

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .get('/Tables')
  .query(true)
  .reply(200, {"odata.metadata":"https://fakeaccount.table.core.windows.net/$metadata#Tables","value":[{"TableName":"CreateSimpleEntityBatchPerf"},{"TableName":"createTableNew"},{"TableName":"createTableNew2"},{"TableName":"createTableOld"},{"TableName":"ListTableTestTokenCredentialnode0"}]}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0076578e-e002-0038-6704-a4c0e6000000',
  'x-ms-client-request-id',
  '30c66194-4bd2-4c16-9a07-3cad380856ed',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'x-ms-continuation-NextTableName',
  '1!68!bGlzdHRhYmxldGVzdHRva2VuY3JlZGVudGlhbG5vZGUxATAxZDdhNDA0Yzk1OTY5NGY-',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,X-Content-Type-Options,Cache-Control,x-ms-continuation-NextTableName,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 07 Sep 2021 16:24:11 GMT'
]);

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .get('/Tables')
  .query(true)
  .reply(200, {"odata.metadata":"https://fakeaccount.table.core.windows.net/$metadata#Tables","value":[{"TableName":"ListTableTestTokenCredentialnode1"},{"TableName":"ListTableTestTokenCredentialnode10"},{"TableName":"ListTableTestTokenCredentialnode11"},{"TableName":"ListTableTestTokenCredentialnode12"},{"TableName":"ListTableTestTokenCredentialnode13"}]}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '007657a8-e002-0038-7d04-a4c0e6000000',
  'x-ms-client-request-id',
  '6d3f126b-3232-4da9-837e-fd81d3238607',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'x-ms-continuation-NextTableName',
  '1!68!bGlzdHRhYmxldGVzdHRva2VuY3JlZGVudGlhbG5vZGUxNAEwMWQ3YTQwNGNhMDM4M2I2',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,X-Content-Type-Options,Cache-Control,x-ms-continuation-NextTableName,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 07 Sep 2021 16:24:11 GMT'
]);

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .get('/Tables')
  .query(true)
  .reply(200, {"odata.metadata":"https://fakeaccount.table.core.windows.net/$metadata#Tables","value":[{"TableName":"ListTableTestTokenCredentialnode14"},{"TableName":"ListTableTestTokenCredentialnode15"},{"TableName":"ListTableTestTokenCredentialnode16"},{"TableName":"ListTableTestTokenCredentialnode17"},{"TableName":"ListTableTestTokenCredentialnode18"}]}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '007657ba-e002-0038-0e04-a4c0e6000000',
  'x-ms-client-request-id',
  'e1e758a7-dff2-4fc1-8715-941818a9c862',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'x-ms-continuation-NextTableName',
  '1!68!bGlzdHRhYmxldGVzdHRva2VuY3JlZGVudGlhbG5vZGUxOQEwMWQ3YTQwNGNhNDQ0MWVi',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,X-Content-Type-Options,Cache-Control,x-ms-continuation-NextTableName,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 07 Sep 2021 16:24:11 GMT'
]);

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .get('/Tables')
  .query(true)
  .reply(200, {"odata.metadata":"https://fakeaccount.table.core.windows.net/$metadata#Tables","value":[{"TableName":"ListTableTestTokenCredentialnode19"},{"TableName":"ListTableTestTokenCredentialnode2"},{"TableName":"ListTableTestTokenCredentialnode3"},{"TableName":"ListTableTestTokenCredentialnode4"},{"TableName":"ListTableTestTokenCredentialnode5"}]}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '007657cf-e002-0038-2204-a4c0e6000000',
  'x-ms-client-request-id',
  '432a9589-e709-46f8-951f-b9d82760b78b',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'x-ms-continuation-NextTableName',
  '1!68!bGlzdHRhYmxldGVzdHRva2VuY3JlZGVudGlhbG5vZGU2ATAxZDdhNDA0Yzk5YmQ1ODI-',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,X-Content-Type-Options,Cache-Control,x-ms-continuation-NextTableName,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 07 Sep 2021 16:24:11 GMT'
]);

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .get('/Tables')
  .query(true)
  .reply(200, {"odata.metadata":"https://fakeaccount.table.core.windows.net/$metadata#Tables","value":[{"TableName":"ListTableTestTokenCredentialnode6"},{"TableName":"ListTableTestTokenCredentialnode7"},{"TableName":"ListTableTestTokenCredentialnode8"},{"TableName":"ListTableTestTokenCredentialnode9"},{"TableName":"testTable"}]}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '007657ea-e002-0038-3904-a4c0e6000000',
  'x-ms-client-request-id',
  'b5c34f1f-6e66-4b3a-8ec3-7ea757120731',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'x-ms-continuation-NextTableName',
  '1!60!dGVzdHRhYmxldG9rZW5jcmVkZW50aWFsbm9kZQEwMWQ3YTQwNGM5MjJlNjI3',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,X-Content-Type-Options,Cache-Control,x-ms-continuation-NextTableName,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 07 Sep 2021 16:24:11 GMT'
]);

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .get('/Tables')
  .query(true)
  .reply(200, {"odata.metadata":"https://fakeaccount.table.core.windows.net/$metadata#Tables","value":[{"TableName":"TestTestTest"}]}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '007657fa-e002-0038-4704-a4c0e6000000',
  'x-ms-client-request-id',
  '36cdfb1b-ff99-4dad-97fc-65e35370f1a2',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,X-Content-Type-Options,Cache-Control,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 07 Sep 2021 16:24:11 GMT'
]);
