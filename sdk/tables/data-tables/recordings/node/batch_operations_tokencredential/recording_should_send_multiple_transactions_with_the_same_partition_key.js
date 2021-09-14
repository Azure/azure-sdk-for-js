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
  '931b8fce-97b6-47e5-b355-ce171faf0900',
  'x-ms-ests-server',
  '2.1.12025.15 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=Ag0TcaTEYcVHpsBKdSMR9ZQ; expires=Thu, 14-Oct-2021 21:24:19 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr9OQfQBw0suSEv4Enk_t889fhGV150wLQKtuWENlTR2r6sfAyu8U8Gc3QARtoa1UIdX0xGH68WoMUUtSjr4MQhUvnWP8IPo3aAQXWny6Rw1cttIJtftsNvFrrM0atC71cKVbz-iIQrur8SXcTQYrZE3yecp1DifiUXAZoclrDZaggAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 14 Sep 2021 21:24:18 GMT',
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
  'c2b95c08-c71a-4fe7-b62c-094a47d22b01',
  'x-ms-ests-server',
  '2.1.12025.15 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AtypHgbo_hhAhzNRAioqvLA; expires=Thu, 14-Oct-2021 21:24:19 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrZtSTOToASEIczIBB9B42GSA-v-pOJHOQYoMY7ej8JfH-euBcpVeTI_V9Az70yWXujXz6jHaafjehZyVEhODxQepeRXHZI598inXZdSO3Er1vuKevwxBHkfDlMqx9vQFyj_AiQFGVHamp_mQ_15xHTnS1nz7BvVi_DHQ9hu2SvksgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 14 Sep 2021 21:24:19 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.1&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=48c6df6b-4fa4-4553-a602-98252236ea61&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  '6ef55fbb-5c33-4c92-b76f-08b008a71a01',
  'x-ms-ests-server',
  '2.1.12025.15 - WUS2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AnwXK39Mz3dMjsAUbxMlMXs; expires=Thu, 14-Oct-2021 21:24:19 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 14 Sep 2021 21:24:19 GMT',
  'Content-Length',
  '1318'
]);

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/Tables', {"TableName":"batchTableTestTokenCredentialnode"})
  .reply(409, {"odata.error":{"code":"TableAlreadyExists","message":{"lang":"en-US","value":"The table specified already exists.\nRequestId:6ced312d-0002-0039-7cae-a9c11b000000\nTime:2021-09-14T21:24:19.7988935Z"}}}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6ced312d-0002-0039-7cae-a9c11b000000',
  'x-ms-client-request-id',
  '610847d3-9cd1-44fd-ba2d-1e04cfc6055a',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 14 Sep 2021 21:24:19 GMT'
]);

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/$batch', "--batch_fakeId\r\ncontent-type: multipart/mixed; boundary=changeset_fakeId\r\n\r\n\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPOST https://fakeaccount.table.core.windows.net/batchTableTestTokenCredentialnode HTTP/1.1\r\ncontent-type: application/json;odata=nometadata\r\naccept: application/json;odata=minimalmetadata\r\ndataserviceversion: 3.0\r\nprefer: return-no-content\r\n\r\n\r\n{\"PartitionKey\":\"multiBatch1\",\"RowKey\":\"r1\",\"value\":\"1\"}\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPOST https://fakeaccount.table.core.windows.net/batchTableTestTokenCredentialnode HTTP/1.1\r\ncontent-type: application/json;odata=nometadata\r\naccept: application/json;odata=minimalmetadata\r\ndataserviceversion: 3.0\r\nprefer: return-no-content\r\n\r\n\r\n{\"PartitionKey\":\"multiBatch1\",\"RowKey\":\"r2\",\"value\":\"2\"}\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPOST https://fakeaccount.table.core.windows.net/batchTableTestTokenCredentialnode HTTP/1.1\r\ncontent-type: application/json;odata=nometadata\r\naccept: application/json;odata=minimalmetadata\r\ndataserviceversion: 3.0\r\nprefer: return-no-content\r\n\r\n\r\n{\"PartitionKey\":\"multiBatch1\",\"RowKey\":\"r3\",\"value\":\"3\"}\r\n--changeset_fakeId--\r\n--batch_fakeId--\r\n")
  .reply(202, "--batchresponse_d7f28744-a0db-4822-95d3-6c37399adfb1\r\nContent-Type: multipart/mixed; boundary=changesetresponse_bcf40070-133b-4b8f-bf80-7005d9693993\r\n\r\n--changesetresponse_bcf40070-133b-4b8f-bf80-7005d9693993\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nPreference-Applied: return-no-content\r\nDataServiceVersion: 3.0;\r\nLocation: https://fakeaccount.table.core.windows.net/batchTableTestTokenCredentialnode(PartitionKey='multiBatch1',RowKey='r1')\r\nDataServiceId: https://fakeaccount.table.core.windows.net/batchTableTestTokenCredentialnode(PartitionKey='multiBatch1',RowKey='r1')\r\nETag: W/\"datetime'2021-09-14T21%3A24%3A19.9910312Z'\"\r\n\r\n\r\n--changesetresponse_bcf40070-133b-4b8f-bf80-7005d9693993\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nPreference-Applied: return-no-content\r\nDataServiceVersion: 3.0;\r\nLocation: https://fakeaccount.table.core.windows.net/batchTableTestTokenCredentialnode(PartitionKey='multiBatch1',RowKey='r2')\r\nDataServiceId: https://fakeaccount.table.core.windows.net/batchTableTestTokenCredentialnode(PartitionKey='multiBatch1',RowKey='r2')\r\nETag: W/\"datetime'2021-09-14T21%3A24%3A19.9910312Z'\"\r\n\r\n\r\n--changesetresponse_bcf40070-133b-4b8f-bf80-7005d9693993\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nPreference-Applied: return-no-content\r\nDataServiceVersion: 3.0;\r\nLocation: https://fakeaccount.table.core.windows.net/batchTableTestTokenCredentialnode(PartitionKey='multiBatch1',RowKey='r3')\r\nDataServiceId: https://fakeaccount.table.core.windows.net/batchTableTestTokenCredentialnode(PartitionKey='multiBatch1',RowKey='r3')\r\nETag: W/\"datetime'2021-09-14T21%3A24%3A19.9910312Z'\"\r\n\r\n\r\n--changesetresponse_bcf40070-133b-4b8f-bf80-7005d9693993--\r\n--batchresponse_d7f28744-a0db-4822-95d3-6c37399adfb1--\r\n", [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'multipart/mixed; boundary=batchresponse_d7f28744-a0db-4822-95d3-6c37399adfb1',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6ced3151-0002-0039-1dae-a9c11b000000',
  'x-ms-client-request-id',
  '0d9eae3b-18de-4001-9073-09cbe5285f56',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 14 Sep 2021 21:24:19 GMT'
]);

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/$batch', "--batch_fakeId\r\ncontent-type: multipart/mixed; boundary=changeset_fakeId\r\n\r\n\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPOST https://fakeaccount.table.core.windows.net/batchTableTestTokenCredentialnode HTTP/1.1\r\ncontent-type: application/json;odata=nometadata\r\naccept: application/json;odata=minimalmetadata\r\ndataserviceversion: 3.0\r\nprefer: return-no-content\r\n\r\n\r\n{\"PartitionKey\":\"multiBatch1\",\"RowKey\":\"r4\",\"value\":\"4\"}\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPOST https://fakeaccount.table.core.windows.net/batchTableTestTokenCredentialnode HTTP/1.1\r\ncontent-type: application/json;odata=nometadata\r\naccept: application/json;odata=minimalmetadata\r\ndataserviceversion: 3.0\r\nprefer: return-no-content\r\n\r\n\r\n{\"PartitionKey\":\"multiBatch1\",\"RowKey\":\"r5\",\"value\":\"5\"}\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPOST https://fakeaccount.table.core.windows.net/batchTableTestTokenCredentialnode HTTP/1.1\r\ncontent-type: application/json;odata=nometadata\r\naccept: application/json;odata=minimalmetadata\r\ndataserviceversion: 3.0\r\nprefer: return-no-content\r\n\r\n\r\n{\"PartitionKey\":\"multiBatch1\",\"RowKey\":\"r6\",\"value\":\"6\"}\r\n--changeset_fakeId--\r\n--batch_fakeId--\r\n")
  .reply(202, "--batchresponse_4073fccd-c452-4546-85cd-b44f958536cb\r\nContent-Type: multipart/mixed; boundary=changesetresponse_c176aafb-7908-4907-9c99-fbc2993b10fd\r\n\r\n--changesetresponse_c176aafb-7908-4907-9c99-fbc2993b10fd\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nPreference-Applied: return-no-content\r\nDataServiceVersion: 3.0;\r\nLocation: https://fakeaccount.table.core.windows.net/batchTableTestTokenCredentialnode(PartitionKey='multiBatch1',RowKey='r4')\r\nDataServiceId: https://fakeaccount.table.core.windows.net/batchTableTestTokenCredentialnode(PartitionKey='multiBatch1',RowKey='r4')\r\nETag: W/\"datetime'2021-09-14T21%3A24%3A20.1941772Z'\"\r\n\r\n\r\n--changesetresponse_c176aafb-7908-4907-9c99-fbc2993b10fd\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nPreference-Applied: return-no-content\r\nDataServiceVersion: 3.0;\r\nLocation: https://fakeaccount.table.core.windows.net/batchTableTestTokenCredentialnode(PartitionKey='multiBatch1',RowKey='r5')\r\nDataServiceId: https://fakeaccount.table.core.windows.net/batchTableTestTokenCredentialnode(PartitionKey='multiBatch1',RowKey='r5')\r\nETag: W/\"datetime'2021-09-14T21%3A24%3A20.1941772Z'\"\r\n\r\n\r\n--changesetresponse_c176aafb-7908-4907-9c99-fbc2993b10fd\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nPreference-Applied: return-no-content\r\nDataServiceVersion: 3.0;\r\nLocation: https://fakeaccount.table.core.windows.net/batchTableTestTokenCredentialnode(PartitionKey='multiBatch1',RowKey='r6')\r\nDataServiceId: https://fakeaccount.table.core.windows.net/batchTableTestTokenCredentialnode(PartitionKey='multiBatch1',RowKey='r6')\r\nETag: W/\"datetime'2021-09-14T21%3A24%3A20.1941772Z'\"\r\n\r\n\r\n--changesetresponse_c176aafb-7908-4907-9c99-fbc2993b10fd--\r\n--batchresponse_4073fccd-c452-4546-85cd-b44f958536cb--\r\n", [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'multipart/mixed; boundary=batchresponse_4073fccd-c452-4546-85cd-b44f958536cb',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6ced3189-0002-0039-52ae-a9c11b000000',
  'x-ms-client-request-id',
  'bef2325c-25f2-438e-98dc-4807c45cf000',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 14 Sep 2021 21:24:19 GMT'
]);

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .get('/batchTableTestTokenCredentialnode()')
  .query(true)
  .reply(200, {"odata.metadata":"https://fakeaccount.table.core.windows.net/$metadata#batchTableTestTokenCredentialnode","value":[{"odata.etag":"W/\"datetime'2021-09-14T21%3A24%3A19.9910312Z'\"","PartitionKey":"multiBatch1","RowKey":"r1","Timestamp":"2021-09-14T21:24:19.9910312Z","value":"1"},{"odata.etag":"W/\"datetime'2021-09-14T21%3A24%3A19.9910312Z'\"","PartitionKey":"multiBatch1","RowKey":"r2","Timestamp":"2021-09-14T21:24:19.9910312Z","value":"2"},{"odata.etag":"W/\"datetime'2021-09-14T21%3A24%3A19.9910312Z'\"","PartitionKey":"multiBatch1","RowKey":"r3","Timestamp":"2021-09-14T21:24:19.9910312Z","value":"3"},{"odata.etag":"W/\"datetime'2021-09-14T21%3A24%3A20.1941772Z'\"","PartitionKey":"multiBatch1","RowKey":"r4","Timestamp":"2021-09-14T21:24:20.1941772Z","value":"4"},{"odata.etag":"W/\"datetime'2021-09-14T21%3A24%3A20.1941772Z'\"","PartitionKey":"multiBatch1","RowKey":"r5","Timestamp":"2021-09-14T21:24:20.1941772Z","value":"5"},{"odata.etag":"W/\"datetime'2021-09-14T21%3A24%3A20.1941772Z'\"","PartitionKey":"multiBatch1","RowKey":"r6","Timestamp":"2021-09-14T21:24:20.1941772Z","value":"6"}]}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6ced31b8-0002-0039-7cae-a9c11b000000',
  'x-ms-client-request-id',
  '03c3ca8a-46f9-4c44-bd15-f7b343f3c9a2',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,X-Content-Type-Options,Cache-Control,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 14 Sep 2021 21:24:20 GMT'
]);
