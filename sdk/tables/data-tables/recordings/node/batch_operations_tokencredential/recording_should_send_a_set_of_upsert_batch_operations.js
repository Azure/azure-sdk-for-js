let nock = require('nock');

module.exports.hash = "db96ff2bce0bb30fef64fe7c843bf74a";

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
  'e7cefc10-6930-4951-b294-bd0c25b7cc00',
  'x-ms-ests-server',
  '2.1.12011.8 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=ApR9ak1XzzxBixcq9Rr-p14; expires=Thu, 07-Oct-2021 16:24:20 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrPHWYh9FQR1MkoUJWmQ0_ujAOJSrDMKEjGYNYM1OPGdVbygLm5JCEQP6fj4jiSPX6hfVyuen5nZb-acb5cji2bLQFpSJ16Xzov-FLWOYxi0lKDbP5nyeoCsRjaEpw4jwwC9fC81yl0k6GJwGImXN7BsCVwE5RewdicXYEK_YcntsgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 07 Sep 2021 16:24:19 GMT',
  'Content-Length',
  '980'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/88888888-8888-8888-8888-888888888888/v2.0/.well-known/openid-configuration')
  .reply(200, {"token_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/authorize","device_authorization_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/devicecode","http_logout_supported":true,"frontchannel_logout_supported":true,"end_session_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"kerberos_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/kerberos","tenant_region_scope":"WW","cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}, [
  'Cache-Control',
  'max-age=86400, private',
  'Content-Length',
  '1753',
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
  'c3900f77-94db-440f-a455-102c3ebbda00',
  'x-ms-ests-server',
  '2.1.12025.12 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AnIotSIBGYJMrTJcty140M4; expires=Thu, 07-Oct-2021 16:24:20 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrKB0kbXOjXcCl1yJazG7MBfXZZS64IFrC1M-IN3E0TR_-M4NkLww-JlWhlYUih8mh7Ch2qkZRPAz-vitns8zXNV_ER8LWVBhk5OTltCS2XQT_YPKcUeTJtdL8qGOlj8eCGfs-m_larjFiLiFrVMAL9h9PYi09MwLrte4dtXwSfyAgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 07 Sep 2021 16:24:19 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=898d7c30-214b-4773-a00a-f030ada3cf46&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  '30fc36de-5362-4435-8a48-495178c1c900',
  'x-ms-ests-server',
  '2.1.12025.12 - NCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Ar5P74FoCKdBl5BVmU82UgU; expires=Thu, 07-Oct-2021 16:24:20 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 07 Sep 2021 16:24:19 GMT',
  'Content-Length',
  '1318'
]);

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/Tables', {"TableName":"batchTableTestTokenCredentialnode"})
  .reply(409, {"odata.error":{"code":"TableAlreadyExists","message":{"lang":"en-US","value":"The table specified already exists.\nRequestId:00765e32-e002-0038-7204-a4c0e6000000\nTime:2021-09-07T16:24:20.5941899Z"}}}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '00765e32-e002-0038-7204-a4c0e6000000',
  'x-ms-client-request-id',
  '7b284ee5-c2ab-4924-ac7b-f3e4b8b93508',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 07 Sep 2021 16:24:20 GMT'
]);

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/$batch', "--batch_fakeId\r\ncontent-type: multipart/mixed; boundary=changeset_fakeId\r\n\r\n\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPUT https://fakeaccount.table.core.windows.net/batchTableTestTokenCredentialnode(PartitionKey='batchTest',RowKey='1') HTTP/1.1\r\ncontent-type: application/json\r\ndataserviceversion: 3.0\r\naccept: application/json\r\n\r\n\r\n{\"PartitionKey\":\"batchTest\",\"RowKey\":\"1\",\"name\":\"upserted\"}\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPUT https://fakeaccount.table.core.windows.net/batchTableTestTokenCredentialnode(PartitionKey='batchTest',RowKey='2') HTTP/1.1\r\ncontent-type: application/json\r\ndataserviceversion: 3.0\r\naccept: application/json\r\n\r\n\r\n{\"PartitionKey\":\"batchTest\",\"RowKey\":\"2\",\"name\":\"upserted\"}\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPUT https://fakeaccount.table.core.windows.net/batchTableTestTokenCredentialnode(PartitionKey='batchTest',RowKey='3') HTTP/1.1\r\ncontent-type: application/json\r\ndataserviceversion: 3.0\r\naccept: application/json\r\n\r\n\r\n{\"PartitionKey\":\"batchTest\",\"RowKey\":\"3\",\"name\":\"upserted\"}\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPUT https://fakeaccount.table.core.windows.net/batchTableTestTokenCredentialnode(PartitionKey='batchTest',RowKey='4') HTTP/1.1\r\ncontent-type: application/json\r\ndataserviceversion: 3.0\r\naccept: application/json\r\n\r\n\r\n{\"PartitionKey\":\"batchTest\",\"RowKey\":\"4\",\"name\":\"upserted\"}\r\n--changeset_fakeId--\r\n--batch_fakeId--\r\n")
  .reply(202, "--batchresponse_64c845db-56b0-4628-a335-a5296afd6aa6\r\nContent-Type: multipart/mixed; boundary=changesetresponse_5f82d95a-739d-4df5-b6fe-63a6257b3d83\r\n\r\n--changesetresponse_5f82d95a-739d-4df5-b6fe-63a6257b3d83\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nDataServiceVersion: 1.0;\r\nETag: W/\"datetime'2021-09-07T16%3A24%3A20.7057563Z'\"\r\n\r\n\r\n--changesetresponse_5f82d95a-739d-4df5-b6fe-63a6257b3d83\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nDataServiceVersion: 1.0;\r\nETag: W/\"datetime'2021-09-07T16%3A24%3A20.7057563Z'\"\r\n\r\n\r\n--changesetresponse_5f82d95a-739d-4df5-b6fe-63a6257b3d83\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nDataServiceVersion: 1.0;\r\nETag: W/\"datetime'2021-09-07T16%3A24%3A20.7057563Z'\"\r\n\r\n\r\n--changesetresponse_5f82d95a-739d-4df5-b6fe-63a6257b3d83\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nDataServiceVersion: 1.0;\r\nETag: W/\"datetime'2021-09-07T16%3A24%3A20.7067566Z'\"\r\n\r\n\r\n--changesetresponse_5f82d95a-739d-4df5-b6fe-63a6257b3d83--\r\n--batchresponse_64c845db-56b0-4628-a335-a5296afd6aa6--\r\n", [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'multipart/mixed; boundary=batchresponse_64c845db-56b0-4628-a335-a5296afd6aa6',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '00765e42-e002-0038-8004-a4c0e6000000',
  'x-ms-client-request-id',
  'a3a96f23-a591-445f-8c65-e7c282ef645d',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 07 Sep 2021 16:24:20 GMT'
]);

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .get('/batchTableTestTokenCredentialnode()')
  .query(true)
  .reply(200, {"odata.metadata":"https://fakeaccount.table.core.windows.net/$metadata#batchTableTestTokenCredentialnode","value":[{"odata.etag":"W/\"datetime'2021-09-07T16%3A24%3A20.7057563Z'\"","PartitionKey":"batchTest","RowKey":"1","Timestamp":"2021-09-07T16:24:20.7057563Z","name":"upserted"},{"odata.etag":"W/\"datetime'2021-09-07T16%3A24%3A20.7057563Z'\"","PartitionKey":"batchTest","RowKey":"2","Timestamp":"2021-09-07T16:24:20.7057563Z","name":"upserted"},{"odata.etag":"W/\"datetime'2021-09-07T16%3A24%3A20.7057563Z'\"","PartitionKey":"batchTest","RowKey":"3","Timestamp":"2021-09-07T16:24:20.7057563Z","name":"upserted"},{"odata.etag":"W/\"datetime'2021-09-07T16%3A24%3A20.7067566Z'\"","PartitionKey":"batchTest","RowKey":"4","Timestamp":"2021-09-07T16:24:20.7067566Z","name":"upserted"}]}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '00765e51-e002-0038-0e04-a4c0e6000000',
  'x-ms-client-request-id',
  '16e8768a-c3a8-41f3-af93-80660191cef6',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,X-Content-Type-Options,Cache-Control,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 07 Sep 2021 16:24:20 GMT'
]);
