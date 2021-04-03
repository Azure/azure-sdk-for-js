let nock = require('nock');

module.exports.hash = "546b6ab160dcc687312be0d8a817f7cf";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://fakestorageaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/Tables', {"TableName":"batchTableTestnode"})
  .query(true)
  .reply(409, {"odata.error":{"code":"TableAlreadyExists","message":{"lang":"en-US","value":"The table specified already exists.\nRequestId:d63fa385-2002-00b8-64dd-f8a3cb000000\nTime:2021-02-01T20:58:53.8356891Z"}}}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd63fa385-2002-00b8-64dd-f8a3cb000000',
  'x-ms-client-request-id',
  '7d35540c-6a8a-4de8-88d5-f902fb9c3899',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 01 Feb 2021 20:58:53 GMT'
]);

nock('https://fakestorageaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/$batch', "--batch_fakeId\r\ncontent-type: multipart/mixed; boundary=changeset_fakeId\r\n\r\n\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPUT https://fakestorageaccount.table.core.windows.net/batchTableTestnode(PartitionKey='batchTest',RowKey='1') HTTP/1.1\r\ncontent-type: application/json\r\ndataserviceversion: 3.0\r\naccept: application/json\r\nif-match: *\r\n\r\n\r\n{\"PartitionKey\":\"batchTest\",\"RowKey\":\"1\",\"name\":\"updated\"}\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPUT https://fakestorageaccount.table.core.windows.net/batchTableTestnode(PartitionKey='batchTest',RowKey='2') HTTP/1.1\r\ncontent-type: application/json\r\ndataserviceversion: 3.0\r\naccept: application/json\r\nif-match: *\r\n\r\n\r\n{\"PartitionKey\":\"batchTest\",\"RowKey\":\"2\",\"name\":\"updated\"}\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPUT https://fakestorageaccount.table.core.windows.net/batchTableTestnode(PartitionKey='batchTest',RowKey='3') HTTP/1.1\r\ncontent-type: application/json\r\ndataserviceversion: 3.0\r\naccept: application/json\r\nif-match: *\r\n\r\n\r\n{\"PartitionKey\":\"batchTest\",\"RowKey\":\"3\",\"name\":\"updated\"}\r\n--changeset_fakeId--\r\n--batch_fakeId\r\n")
  .query(true)
  .reply(202, "--batchresponse_873775a0-9bc4-4f43-875d-63e703226f20\r\nContent-Type: multipart/mixed; boundary=changesetresponse_615b0ed9-fb5e-4ec3-976b-ff1bbc92c416\r\n\r\n--changesetresponse_615b0ed9-fb5e-4ec3-976b-ff1bbc92c416\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nDataServiceVersion: 1.0;\r\nETag: W/\"datetime'2021-02-01T20%3A58%3A53.8930248Z'\"\r\n\r\n\r\n--changesetresponse_615b0ed9-fb5e-4ec3-976b-ff1bbc92c416\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nDataServiceVersion: 1.0;\r\nETag: W/\"datetime'2021-02-01T20%3A58%3A53.8930248Z'\"\r\n\r\n\r\n--changesetresponse_615b0ed9-fb5e-4ec3-976b-ff1bbc92c416\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nDataServiceVersion: 1.0;\r\nETag: W/\"datetime'2021-02-01T20%3A58%3A53.8940259Z'\"\r\n\r\n\r\n--changesetresponse_615b0ed9-fb5e-4ec3-976b-ff1bbc92c416--\r\n--batchresponse_873775a0-9bc4-4f43-875d-63e703226f20--\r\n", [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'multipart/mixed; boundary=batchresponse_873775a0-9bc4-4f43-875d-63e703226f20',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd63fa38f-2002-00b8-6edd-f8a3cb000000',
  'x-ms-client-request-id',
  'c17d7e2d-b9c2-48ae-b682-6324763d9b19',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 01 Feb 2021 20:58:53 GMT'
]);

nock('https://fakestorageaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .get('/batchTableTestnode()')
  .query(true)
  .reply(200, {"odata.metadata":"https://fakestorageaccount.table.core.windows.net/$metadata#batchTableTestnode","value":[{"odata.etag":"W/\"datetime'2021-02-01T20%3A58%3A53.8930248Z'\"","PartitionKey":"batchTest","RowKey":"1","Timestamp":"2021-02-01T20:58:53.8930248Z","name":"updated"},{"odata.etag":"W/\"datetime'2021-02-01T20%3A58%3A53.8930248Z'\"","PartitionKey":"batchTest","RowKey":"2","Timestamp":"2021-02-01T20:58:53.8930248Z","name":"updated"},{"odata.etag":"W/\"datetime'2021-02-01T20%3A58%3A53.8940259Z'\"","PartitionKey":"batchTest","RowKey":"3","Timestamp":"2021-02-01T20:58:53.8940259Z","name":"updated"}]}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd63fa3bd-2002-00b8-18dd-f8a3cb000000',
  'x-ms-client-request-id',
  '4d118737-eb68-477f-93fb-712f49a7cd42',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,X-Content-Type-Options,Cache-Control,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 01 Feb 2021 20:58:53 GMT'
]);
