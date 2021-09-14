let nock = require('nock');

module.exports.hash = "ed676a3b36db8a9446e03369e600e4c9";

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
  '4d58e6f5-1119-4301-b8a7-52593af1ce00',
  'x-ms-ests-server',
  '2.1.12025.15 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AuhV48zb9SZLn5GjC3dSDUM; expires=Thu, 14-Oct-2021 21:23:54 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrSQlZ5623o2e7yxgUA3NzP6vmtR8cqo-qjztaYKD3omZsrnTH2VCqBfa4-s4HCbSQ0DOvj6htlp1bGjmcAIrENJF8xqsJvgBgnYE9vUhewHUch1_xbl9aSUtuWSIQLFaWbHDUbG70yHlxhTIX95gJ3-PSe8fcR1bKytcGpAU1lOcgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 14 Sep 2021 21:23:53 GMT',
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
  'c172dd2e-f670-409c-ba8f-b0e5a0fc5401',
  'x-ms-ests-server',
  '2.1.12025.15 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=Ag7p7p29eFFMje6Evw7GTq0; expires=Thu, 14-Oct-2021 21:23:54 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrDCH7IKX149ZAMClykzkaFh-U0j9ZzuS32cXBH_pcKGzAqvmYmk5qfmTJM0OWecPmr9GzmgJ_kHzOklmUGf3RziZB7CMJH-sXSnPF6D6fhZ4WOs-lXNcrMxCRhIE7uC5T87SRI6HCvlJqjJKtUQB1szZB6LC_W-l6BA25ooZBCBQgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 14 Sep 2021 21:23:54 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.1&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=9e870009-0122-41f3-86b6-3cafb5cc43f5&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  'a6cda39c-ff34-4160-957f-df7652944a00',
  'x-ms-ests-server',
  '2.1.12025.15 - SCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=ArTBQaKIbFVMmz7tyYWabPs; expires=Thu, 14-Oct-2021 21:23:54 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 14 Sep 2021 21:23:54 GMT',
  'Content-Length',
  '1318'
]);

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/tableClientTestTokenCredentialnode', {"PartitionKey":"P7_node","RowKey":"R7","testField":"2020-09-17T00:00:00.99999Z","testField@odata.type":"Edm.DateTime"})
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Content-Length',
  '0',
  'ETag',
  `W/"datetime'2021-09-14T21%3A23%3A54.7339752Z'"`,
  'Location',
  "https://fakeaccount.table.core.windows.net/tableClientTestTokenCredentialnode(PartitionKey='P7_node',RowKey='R7')",
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6ced1f3a-0002-0039-17ae-a9c11b000000',
  'x-ms-client-request-id',
  '1e7bb0bb-d876-48fb-b576-fb2aeb7c4af8',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Preference-Applied',
  'return-no-content',
  'DataServiceId',
  "https://fakeaccount.table.core.windows.net/tableClientTestTokenCredentialnode(PartitionKey='P7_node',RowKey='R7')",
  'Date',
  'Tue, 14 Sep 2021 21:23:54 GMT'
]);

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .get('/tableClientTestTokenCredentialnode(PartitionKey=\'P7_node\',RowKey=\'R7\')')
  .reply(200, {"odata.metadata":"https://fakeaccount.table.core.windows.net/$metadata#tableClientTestTokenCredentialnode/@Element","odata.etag":"W/\"datetime'2021-09-14T21%3A23%3A54.7339752Z'\"","PartitionKey":"P7_node","RowKey":"R7","Timestamp":"2021-09-14T21:23:54.7339752Z","testField@odata.type":"Edm.DateTime","testField":"2020-09-17T00:00:00.99999Z"}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'ETag',
  `W/"datetime'2021-09-14T21%3A23%3A54.7339752Z'"`,
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6ced1f50-0002-0039-2cae-a9c11b000000',
  'x-ms-client-request-id',
  'd8a237f7-9f67-44d1-bc70-416cbc4eb07b',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,X-Content-Type-Options,Cache-Control,ETag,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 14 Sep 2021 21:23:54 GMT'
]);

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/tableClientTestTokenCredentialnode(PartitionKey=\'P7_node\',RowKey=\'R7\')')
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6ced1f62-0002-0039-3bae-a9c11b000000',
  'x-ms-client-request-id',
  '0a54ccb3-8a0b-4d2d-b954-6bb4ab791947',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 14 Sep 2021 21:23:54 GMT'
]);
