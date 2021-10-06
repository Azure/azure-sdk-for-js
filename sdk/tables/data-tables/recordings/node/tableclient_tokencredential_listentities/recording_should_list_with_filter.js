let nock = require('nock');

module.exports.hash = "f5ed124a4d96fcaafa13bf1086da293e";

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
  'a718436b-add0-47ff-a054-e6bf63a1d500',
  'x-ms-ests-server',
  '2.1.12011.8 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AljqGnT7gHpAuO1fdB1RedQ; expires=Thu, 07-Oct-2021 16:23:57 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrjX6vPGFApWV8VwAtwizUbZALDyfj77_5GuKG9pe_LmiPtbuxTtR4Scve5H0gcRT0e3-q8kjK4CAZUS90skh8WYUXIc9QLw559tugcz0Z_j421BBVtcfRdpK8G7ZodBP3W0ADCX4tsfXLmLxQ_lu6SmCW-d_vw3m_78F1eZ75OI4gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 07 Sep 2021 16:23:56 GMT',
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
  '55d1c179-c7a6-4f1d-9f79-5f926fe1e100',
  'x-ms-ests-server',
  '2.1.12025.12 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AnWBXyA2A9BBrLuNY-XUy68; expires=Thu, 07-Oct-2021 16:23:57 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevrm0AmrC36GxS8USDmggLzlYllXwmfygoJHLAPWdQwrTMtrLf0wefTRlf3yDKKViSTRkX2DMxNslLPnl0vjf2S8h7YFHosVosYwl3kgh2_vdvzp2SRWepd1L5qG7rhJAKw35bHDi11MjWG-qyDTWHHkvuqKiirh0qlK8ZUguXf7_cgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 07 Sep 2021 16:23:56 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=a185dbb2-a9c9-4cdc-9341-a4027c5a6220&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  '8b623168-d12c-4e3a-bcf8-d3dc6d12d500',
  'x-ms-ests-server',
  '2.1.12025.12 - NCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=ApBM2lxc-aNPk8gU45m_0A3JVDEwAQAAAB2JydgOAAAA; expires=Thu, 07-Oct-2021 16:23:57 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 07 Sep 2021 16:23:57 GMT',
  'Content-Length',
  '1318'
]);

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .get('/tableClientTestTokenCredentialnode()')
  .query(true)
  .reply(200, {"odata.metadata":"https://fakeaccount.table.core.windows.net/$metadata#tableClientTestTokenCredentialnode","value":[{"odata.etag":"W/\"datetime'2021-09-07T16%3A23%3A54.4285549Z'\"","PartitionKey":"listEntitiesTest","RowKey":"0","Timestamp":"2021-09-07T16:23:54.4285549Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-09-07T16%3A23%3A54.5096122Z'\"","PartitionKey":"listEntitiesTest","RowKey":"1","Timestamp":"2021-09-07T16:23:54.5096122Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-09-07T16%3A23%3A55.2511401Z'\"","PartitionKey":"listEntitiesTest","RowKey":"10","Timestamp":"2021-09-07T16:23:55.2511401Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-09-07T16%3A23%3A55.330196Z'\"","PartitionKey":"listEntitiesTest","RowKey":"11","Timestamp":"2021-09-07T16:23:55.330196Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-09-07T16%3A23%3A55.4052499Z'\"","PartitionKey":"listEntitiesTest","RowKey":"12","Timestamp":"2021-09-07T16:23:55.4052499Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-09-07T16%3A23%3A55.4783015Z'\"","PartitionKey":"listEntitiesTest","RowKey":"13","Timestamp":"2021-09-07T16:23:55.4783015Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-09-07T16%3A23%3A55.5543556Z'\"","PartitionKey":"listEntitiesTest","RowKey":"14","Timestamp":"2021-09-07T16:23:55.5543556Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-09-07T16%3A23%3A55.629409Z'\"","PartitionKey":"listEntitiesTest","RowKey":"15","Timestamp":"2021-09-07T16:23:55.629409Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-09-07T16%3A23%3A55.7134693Z'\"","PartitionKey":"listEntitiesTest","RowKey":"16","Timestamp":"2021-09-07T16:23:55.7134693Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-09-07T16%3A23%3A55.8235477Z'\"","PartitionKey":"listEntitiesTest","RowKey":"17","Timestamp":"2021-09-07T16:23:55.8235477Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-09-07T16%3A23%3A55.9006025Z'\"","PartitionKey":"listEntitiesTest","RowKey":"18","Timestamp":"2021-09-07T16:23:55.9006025Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-09-07T16%3A23%3A55.9766571Z'\"","PartitionKey":"listEntitiesTest","RowKey":"19","Timestamp":"2021-09-07T16:23:55.9766571Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-09-07T16%3A23%3A54.5876678Z'\"","PartitionKey":"listEntitiesTest","RowKey":"2","Timestamp":"2021-09-07T16:23:54.5876678Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-09-07T16%3A23%3A54.6627208Z'\"","PartitionKey":"listEntitiesTest","RowKey":"3","Timestamp":"2021-09-07T16:23:54.6627208Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-09-07T16%3A23%3A54.7447796Z'\"","PartitionKey":"listEntitiesTest","RowKey":"4","Timestamp":"2021-09-07T16:23:54.7447796Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-09-07T16%3A23%3A54.8208338Z'\"","PartitionKey":"listEntitiesTest","RowKey":"5","Timestamp":"2021-09-07T16:23:54.8208338Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-09-07T16%3A23%3A54.8988894Z'\"","PartitionKey":"listEntitiesTest","RowKey":"6","Timestamp":"2021-09-07T16:23:54.8988894Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-09-07T16%3A23%3A54.9779456Z'\"","PartitionKey":"listEntitiesTest","RowKey":"7","Timestamp":"2021-09-07T16:23:54.9779456Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-09-07T16%3A23%3A55.0870233Z'\"","PartitionKey":"listEntitiesTest","RowKey":"8","Timestamp":"2021-09-07T16:23:55.0870233Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-09-07T16%3A23%3A55.1740849Z'\"","PartitionKey":"listEntitiesTest","RowKey":"9","Timestamp":"2021-09-07T16:23:55.1740849Z","foo":"testEntity"}]}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '00764d8a-e002-0038-0204-a4c0e6000000',
  'x-ms-client-request-id',
  '217ee68a-5b96-4368-a7e1-1d751ff69dc1',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,X-Content-Type-Options,Cache-Control,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 07 Sep 2021 16:23:57 GMT'
]);
