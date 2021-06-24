let nock = require('nock');

module.exports.hash = "c2facf3a7e0d5911aa36b9d39d9eb8cf";

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
  '45c47fb6-4f74-4c6a-8265-c5950d605500',
  'x-ms-ests-server',
  '2.1.11829.4 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=Am7dTJW8_JpAtBhW6bg0-FLJVDEwDwAAAII3X9gOAAAA; expires=Mon, 19-Jul-2021 00:55:46 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrnIzGMCeF5tlg7DnKX5NXGi-hEkSZflFLExb_NLEOvAbZDBUhEyp7mShIy0m3-zgsMX1te1UfzUTFrxc2NPo_rkJGDL4XTvvJasXw8viSMYwMfnA0CeqwfU6RrPTVzBwJsHCbJO_RDe0uKqFlrI0xKolzTrJaM4vYWp4vpJrY-u0gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sat, 19 Jun 2021 00:55:46 GMT',
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
  '44b0c367-333b-40ac-9544-a604c4680900',
  'x-ms-ests-server',
  '2.1.11829.8 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=Am7dTJW8_JpAtBhW6bg0-FLJVDEwDwAAAII3X9gOAAAA; expires=Mon, 19-Jul-2021 00:55:46 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrhdQ2u9MQoQUdhNx1cnbe4P2Nr739Lrsdds-1eC1n9jBwzFOHwSIJSfzoURdk6qj1bwi2x-UkP69o9WhZt0uXLyuVjT216mVHRiY7h76a28vVaLbDTebhSVZjTrEYEvgfoZ0PBLJXCF7i4raHN1J4IQ4xisKRviyzX-IoQgrk8p8gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sat, 19 Jun 2021 00:55:46 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.1.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=2|771,0|,&x-client-last-telemetry=2|0|||0,0&client-request-id=7cf02e95-fd29-40de-8bad-67fbfd515f8f&client_secret=azure_client_secret")
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
  'b50a8c45-56e2-453b-9c5c-02e8a2350400',
  'x-ms-ests-server',
  '2.1.11829.8 - EUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Am7dTJW8_JpAtBhW6bg0-FLJVDEwDwAAAII3X9gOAAAA; expires=Mon, 19-Jul-2021 00:55:46 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sat, 19 Jun 2021 00:55:46 GMT',
  'Content-Length',
  '1318'
]);

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/Tables', {"TableName":"batchTableTestTokenCredentialnode"})
  .reply(409, {"odata.error":{"code":"TableAlreadyExists","message":{"lang":"en-US","value":"The table specified already exists.\nRequestId:7c53051d-1002-0129-30a5-64b1a8000000\nTime:2021-06-19T00:55:46.9790951Z"}}}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7c53051d-1002-0129-30a5-64b1a8000000',
  'x-ms-client-request-id',
  'd8ffba2c-db36-4046-a300-a06adcaf33a1',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sat, 19 Jun 2021 00:55:46 GMT'
]);

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/$batch', "--batch_fakeId\r\ncontent-type: multipart/mixed; boundary=changeset_fakeId\r\n\r\n\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPOST https://fakeaccount.table.core.windows.net/batchTableTestTokenCredentialnode HTTP/1.1\r\ncontent-type: application/json;odata=nometadata\r\naccept: application/json;odata=minimalmetadata\r\ndataserviceversion: 3.0\r\nprefer: return-no-content\r\n\r\n\r\n{\"PartitionKey\":\"multiBatch1\",\"RowKey\":\"r1\",\"value\":\"1\"}\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPOST https://fakeaccount.table.core.windows.net/batchTableTestTokenCredentialnode HTTP/1.1\r\ncontent-type: application/json;odata=nometadata\r\naccept: application/json;odata=minimalmetadata\r\ndataserviceversion: 3.0\r\nprefer: return-no-content\r\n\r\n\r\n{\"PartitionKey\":\"multiBatch1\",\"RowKey\":\"r2\",\"value\":\"2\"}\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPOST https://fakeaccount.table.core.windows.net/batchTableTestTokenCredentialnode HTTP/1.1\r\ncontent-type: application/json;odata=nometadata\r\naccept: application/json;odata=minimalmetadata\r\ndataserviceversion: 3.0\r\nprefer: return-no-content\r\n\r\n\r\n{\"PartitionKey\":\"multiBatch1\",\"RowKey\":\"r3\",\"value\":\"3\"}\r\n--changeset_fakeId--\r\n--batch_fakeId--\r\n")
  .reply(202, "--batchresponse_3fd4af7b-bf26-49ba-83fc-23e984b58cce\r\nContent-Type: multipart/mixed; boundary=changesetresponse_92e62f1f-20c9-4fd6-a23a-9df6bbd87382\r\n\r\n--changesetresponse_92e62f1f-20c9-4fd6-a23a-9df6bbd87382\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nPreference-Applied: return-no-content\r\nDataServiceVersion: 3.0;\r\nLocation: https://fakeaccount.table.core.windows.net/batchTableTestTokenCredentialnode(PartitionKey='multiBatch1',RowKey='r1')\r\nDataServiceId: https://fakeaccount.table.core.windows.net/batchTableTestTokenCredentialnode(PartitionKey='multiBatch1',RowKey='r1')\r\nETag: W/\"datetime'2021-06-19T00%3A55%3A47.0221264Z'\"\r\n\r\n\r\n--changesetresponse_92e62f1f-20c9-4fd6-a23a-9df6bbd87382\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nPreference-Applied: return-no-content\r\nDataServiceVersion: 3.0;\r\nLocation: https://fakeaccount.table.core.windows.net/batchTableTestTokenCredentialnode(PartitionKey='multiBatch1',RowKey='r2')\r\nDataServiceId: https://fakeaccount.table.core.windows.net/batchTableTestTokenCredentialnode(PartitionKey='multiBatch1',RowKey='r2')\r\nETag: W/\"datetime'2021-06-19T00%3A55%3A47.0221264Z'\"\r\n\r\n\r\n--changesetresponse_92e62f1f-20c9-4fd6-a23a-9df6bbd87382\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nPreference-Applied: return-no-content\r\nDataServiceVersion: 3.0;\r\nLocation: https://fakeaccount.table.core.windows.net/batchTableTestTokenCredentialnode(PartitionKey='multiBatch1',RowKey='r3')\r\nDataServiceId: https://fakeaccount.table.core.windows.net/batchTableTestTokenCredentialnode(PartitionKey='multiBatch1',RowKey='r3')\r\nETag: W/\"datetime'2021-06-19T00%3A55%3A47.0221264Z'\"\r\n\r\n\r\n--changesetresponse_92e62f1f-20c9-4fd6-a23a-9df6bbd87382--\r\n--batchresponse_3fd4af7b-bf26-49ba-83fc-23e984b58cce--\r\n", [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'multipart/mixed; boundary=batchresponse_3fd4af7b-bf26-49ba-83fc-23e984b58cce',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7c530522-1002-0129-35a5-64b1a8000000',
  'x-ms-client-request-id',
  '2d76e5be-901b-4095-823f-1c411a3ea45a',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sat, 19 Jun 2021 00:55:46 GMT'
]);

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/$batch', "--batch_fakeId\r\ncontent-type: multipart/mixed; boundary=changeset_fakeId\r\n\r\n\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPOST https://fakeaccount.table.core.windows.net/batchTableTestTokenCredentialnode HTTP/1.1\r\ncontent-type: application/json;odata=nometadata\r\naccept: application/json;odata=minimalmetadata\r\ndataserviceversion: 3.0\r\nprefer: return-no-content\r\n\r\n\r\n{\"PartitionKey\":\"multiBatch1\",\"RowKey\":\"r4\",\"value\":\"4\"}\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPOST https://fakeaccount.table.core.windows.net/batchTableTestTokenCredentialnode HTTP/1.1\r\ncontent-type: application/json;odata=nometadata\r\naccept: application/json;odata=minimalmetadata\r\ndataserviceversion: 3.0\r\nprefer: return-no-content\r\n\r\n\r\n{\"PartitionKey\":\"multiBatch1\",\"RowKey\":\"r5\",\"value\":\"5\"}\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPOST https://fakeaccount.table.core.windows.net/batchTableTestTokenCredentialnode HTTP/1.1\r\ncontent-type: application/json;odata=nometadata\r\naccept: application/json;odata=minimalmetadata\r\ndataserviceversion: 3.0\r\nprefer: return-no-content\r\n\r\n\r\n{\"PartitionKey\":\"multiBatch1\",\"RowKey\":\"r6\",\"value\":\"6\"}\r\n--changeset_fakeId--\r\n--batch_fakeId--\r\n")
  .reply(202, "--batchresponse_edd0e207-7dee-4fd7-b851-6779b29e31f5\r\nContent-Type: multipart/mixed; boundary=changesetresponse_5792fcb9-7908-42ec-8ca9-270ef367f61a\r\n\r\n--changesetresponse_5792fcb9-7908-42ec-8ca9-270ef367f61a\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nPreference-Applied: return-no-content\r\nDataServiceVersion: 3.0;\r\nLocation: https://fakeaccount.table.core.windows.net/batchTableTestTokenCredentialnode(PartitionKey='multiBatch1',RowKey='r4')\r\nDataServiceId: https://fakeaccount.table.core.windows.net/batchTableTestTokenCredentialnode(PartitionKey='multiBatch1',RowKey='r4')\r\nETag: W/\"datetime'2021-06-19T00%3A55%3A47.0961792Z'\"\r\n\r\n\r\n--changesetresponse_5792fcb9-7908-42ec-8ca9-270ef367f61a\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nPreference-Applied: return-no-content\r\nDataServiceVersion: 3.0;\r\nLocation: https://fakeaccount.table.core.windows.net/batchTableTestTokenCredentialnode(PartitionKey='multiBatch1',RowKey='r5')\r\nDataServiceId: https://fakeaccount.table.core.windows.net/batchTableTestTokenCredentialnode(PartitionKey='multiBatch1',RowKey='r5')\r\nETag: W/\"datetime'2021-06-19T00%3A55%3A47.0961792Z'\"\r\n\r\n\r\n--changesetresponse_5792fcb9-7908-42ec-8ca9-270ef367f61a\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nPreference-Applied: return-no-content\r\nDataServiceVersion: 3.0;\r\nLocation: https://fakeaccount.table.core.windows.net/batchTableTestTokenCredentialnode(PartitionKey='multiBatch1',RowKey='r6')\r\nDataServiceId: https://fakeaccount.table.core.windows.net/batchTableTestTokenCredentialnode(PartitionKey='multiBatch1',RowKey='r6')\r\nETag: W/\"datetime'2021-06-19T00%3A55%3A47.0961792Z'\"\r\n\r\n\r\n--changesetresponse_5792fcb9-7908-42ec-8ca9-270ef367f61a--\r\n--batchresponse_edd0e207-7dee-4fd7-b851-6779b29e31f5--\r\n", [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'multipart/mixed; boundary=batchresponse_edd0e207-7dee-4fd7-b851-6779b29e31f5',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7c530541-1002-0129-53a5-64b1a8000000',
  'x-ms-client-request-id',
  'a102889b-4183-48f1-99d3-13907bcdad34',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sat, 19 Jun 2021 00:55:46 GMT'
]);

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .get('/batchTableTestTokenCredentialnode()')
  .query(true)
  .reply(200, {"odata.metadata":"https://fakeaccount.table.core.windows.net/$metadata#batchTableTestTokenCredentialnode","value":[{"odata.etag":"W/\"datetime'2021-06-19T00%3A55%3A47.0221264Z'\"","PartitionKey":"multiBatch1","RowKey":"r1","Timestamp":"2021-06-19T00:55:47.0221264Z","value":"1"},{"odata.etag":"W/\"datetime'2021-06-19T00%3A55%3A47.0221264Z'\"","PartitionKey":"multiBatch1","RowKey":"r2","Timestamp":"2021-06-19T00:55:47.0221264Z","value":"2"},{"odata.etag":"W/\"datetime'2021-06-19T00%3A55%3A47.0221264Z'\"","PartitionKey":"multiBatch1","RowKey":"r3","Timestamp":"2021-06-19T00:55:47.0221264Z","value":"3"},{"odata.etag":"W/\"datetime'2021-06-19T00%3A55%3A47.0961792Z'\"","PartitionKey":"multiBatch1","RowKey":"r4","Timestamp":"2021-06-19T00:55:47.0961792Z","value":"4"},{"odata.etag":"W/\"datetime'2021-06-19T00%3A55%3A47.0961792Z'\"","PartitionKey":"multiBatch1","RowKey":"r5","Timestamp":"2021-06-19T00:55:47.0961792Z","value":"5"},{"odata.etag":"W/\"datetime'2021-06-19T00%3A55%3A47.0961792Z'\"","PartitionKey":"multiBatch1","RowKey":"r6","Timestamp":"2021-06-19T00:55:47.0961792Z","value":"6"}]}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7c530553-1002-0129-64a5-64b1a8000000',
  'x-ms-client-request-id',
  'b207bee1-8fc2-4026-9105-aa10dc4788f7',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,X-Content-Type-Options,Cache-Control,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Sat, 19 Jun 2021 00:55:47 GMT'
]);
