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
  '35d14e93-4096-4c0b-a8b1-aabbc77a8500',
  'x-ms-ests-server',
  '2.1.12108.10 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AsAbfGZD8eRBt3lMiERwcos; expires=Sun, 14-Nov-2021 16:13:03 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrpdpawTGBCtjT-wtFC7nAenD_8G2a-QItKJom-fIMpFTzSWN5uD-80muSZbVatPK-IaC5Bj7_SxUUfrsPQOLXB4C9crH3JBsx6byHJnVtM_f_0X5rU94vLEGrVAbEm77KcuY5bTvfGKkXxv_D-9Th0Wlcszu_h0MiacfPoXHtlpkgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 15 Oct 2021 16:13:03 GMT',
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
  'abf1f623-a8df-4d59-97ee-1018051c0b00',
  'x-ms-ests-server',
  '2.1.12158.6 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AkURrlb-w1NDmRJiMFdHAT8; expires=Sun, 14-Nov-2021 16:13:03 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrdjcMvm8lpCM63GY9SywYXsJI9nanFRQvg3K2JYu-73YwKuhAFs9VZoI5hIbUvDvYZ8DDUOO6N72l24UUwLF51ft0_jh54h9iLlMOI3HwIf-vpyug-GAKhfMIkDY6xnANNREc8Lf6tcFG_pp1DTuAqV02s3Mbv2cGGWWVls_Mj0wgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 15 Oct 2021 16:13:03 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.2&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=99c7450c-d030-438e-be82-65679f9ed653&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  '3d888375-66ed-4f17-b6c4-973caf520a00',
  'x-ms-ests-server',
  '2.1.12158.6 - EUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Ak0fNE5lSCVLlW-LTDbClJrJVDEwAQAAAI6f-9gOAAAA; expires=Sun, 14-Nov-2021 16:13:03 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 15 Oct 2021 16:13:03 GMT',
  'Content-Length',
  '1318'
]);

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .get('/tableClientTestTokenCredentialnode()')
  .query(true)
  .reply(200, {"odata.metadata":"https://fakeaccount.table.core.windows.net/$metadata#tableClientTestTokenCredentialnode","value":[{"odata.etag":"W/\"datetime'2021-10-15T16%3A13%3A01.0283022Z'\"","PartitionKey":"listEntitiesTest","RowKey":"0","Timestamp":"2021-10-15T16:13:01.0283022Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-10-15T16%3A13%3A01.0753352Z'\"","PartitionKey":"listEntitiesTest","RowKey":"1","Timestamp":"2021-10-15T16:13:01.0753352Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-10-15T16%3A13%3A01.4906261Z'\"","PartitionKey":"listEntitiesTest","RowKey":"10","Timestamp":"2021-10-15T16:13:01.4906261Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-10-15T16%3A13%3A01.5286527Z'\"","PartitionKey":"listEntitiesTest","RowKey":"11","Timestamp":"2021-10-15T16:13:01.5286527Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-10-15T16%3A13%3A01.5656786Z'\"","PartitionKey":"listEntitiesTest","RowKey":"12","Timestamp":"2021-10-15T16:13:01.5656786Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-10-15T16%3A13%3A01.6127111Z'\"","PartitionKey":"listEntitiesTest","RowKey":"13","Timestamp":"2021-10-15T16:13:01.6127111Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-10-15T16%3A13%3A01.6517384Z'\"","PartitionKey":"listEntitiesTest","RowKey":"14","Timestamp":"2021-10-15T16:13:01.6517384Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-10-15T16%3A13%3A01.6917664Z'\"","PartitionKey":"listEntitiesTest","RowKey":"15","Timestamp":"2021-10-15T16:13:01.6917664Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-10-15T16%3A13%3A01.7648179Z'\"","PartitionKey":"listEntitiesTest","RowKey":"16","Timestamp":"2021-10-15T16:13:01.7648179Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-10-15T16%3A13%3A01.8018438Z'\"","PartitionKey":"listEntitiesTest","RowKey":"17","Timestamp":"2021-10-15T16:13:01.8018438Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-10-15T16%3A13%3A01.8458746Z'\"","PartitionKey":"listEntitiesTest","RowKey":"18","Timestamp":"2021-10-15T16:13:01.8458746Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-10-15T16%3A13%3A01.8829001Z'\"","PartitionKey":"listEntitiesTest","RowKey":"19","Timestamp":"2021-10-15T16:13:01.8829001Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-10-15T16%3A13%3A01.1283723Z'\"","PartitionKey":"listEntitiesTest","RowKey":"2","Timestamp":"2021-10-15T16:13:01.1283723Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-10-15T16%3A13%3A01.1784077Z'\"","PartitionKey":"listEntitiesTest","RowKey":"3","Timestamp":"2021-10-15T16:13:01.1784077Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-10-15T16%3A13%3A01.2204367Z'\"","PartitionKey":"listEntitiesTest","RowKey":"4","Timestamp":"2021-10-15T16:13:01.2204367Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-10-15T16%3A13%3A01.2614658Z'\"","PartitionKey":"listEntitiesTest","RowKey":"5","Timestamp":"2021-10-15T16:13:01.2614658Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-10-15T16%3A13%3A01.307498Z'\"","PartitionKey":"listEntitiesTest","RowKey":"6","Timestamp":"2021-10-15T16:13:01.307498Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-10-15T16%3A13%3A01.3465253Z'\"","PartitionKey":"listEntitiesTest","RowKey":"7","Timestamp":"2021-10-15T16:13:01.3465253Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-10-15T16%3A13%3A01.3975606Z'\"","PartitionKey":"listEntitiesTest","RowKey":"8","Timestamp":"2021-10-15T16:13:01.3975606Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-10-15T16%3A13%3A01.449597Z'\"","PartitionKey":"listEntitiesTest","RowKey":"9","Timestamp":"2021-10-15T16:13:01.449597Z","foo":"testEntity"}]}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5af7cd79-c002-000d-0bdf-c16eb3000000',
  'x-ms-client-request-id',
  '2aaf1ed3-ffa2-4079-ae96-abe40fd5054b',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,X-Content-Type-Options,Cache-Control,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 15 Oct 2021 16:13:03 GMT'
]);
