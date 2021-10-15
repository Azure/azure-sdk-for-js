let nock = require('nock');

module.exports.hash = "7d9af0ee8cf4fe3f2960151a3e397df0";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/Tables', {"TableName":"batchTableTestSASConnectionStringnode"})
  .query(true)
  .reply(409, {"odata.error":{"code":"TableAlreadyExists","message":{"lang":"en-US","value":"The table specified already exists.\nRequestId:5af80769-c002-000d-3bdf-c16eb3000000\nTime:2021-10-15T16:13:23.5680666Z"}}}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5af80769-c002-000d-3bdf-c16eb3000000',
  'x-ms-client-request-id',
  '52e24e49-ded9-4905-bb08-0a801338fcae',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 15 Oct 2021 16:13:23 GMT'
]);

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/$batch', "--batch_fakeId\r\ncontent-type: multipart/mixed; boundary=changeset_fakeId\r\n\r\n\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPUT https://fakeaccount.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='batchTest',RowKey='1') HTTP/1.1\r\ncontent-type: application/json\r\ndataserviceversion: 3.0\r\naccept: application/json\r\nif-match: *\r\n\r\n\r\n{\"PartitionKey\":\"batchTest\",\"RowKey\":\"1\",\"name\":\"updated\"}\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPUT https://fakeaccount.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='batchTest',RowKey='2') HTTP/1.1\r\ncontent-type: application/json\r\ndataserviceversion: 3.0\r\naccept: application/json\r\nif-match: *\r\n\r\n\r\n{\"PartitionKey\":\"batchTest\",\"RowKey\":\"2\",\"name\":\"updated\"}\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPUT https://fakeaccount.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='batchTest',RowKey='3') HTTP/1.1\r\ncontent-type: application/json\r\ndataserviceversion: 3.0\r\naccept: application/json\r\nif-match: *\r\n\r\n\r\n{\"PartitionKey\":\"batchTest\",\"RowKey\":\"3\",\"name\":\"updated\"}\r\n--changeset_fakeId--\r\n--batch_fakeId--\r\n")
  .query(true)
  .reply(202, "--batchresponse_3618ccc5-f0e3-48af-a139-48e88185a6c3\r\nContent-Type: multipart/mixed; boundary=changesetresponse_9439eaa0-54e2-4c6c-9738-a9a9142f4665\r\n\r\n--changesetresponse_9439eaa0-54e2-4c6c-9738-a9a9142f4665\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nDataServiceVersion: 1.0;\r\nETag: W/\"datetime'2021-10-15T16%3A13%3A23.6410363Z'\"\r\n\r\n\r\n--changesetresponse_9439eaa0-54e2-4c6c-9738-a9a9142f4665\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nDataServiceVersion: 1.0;\r\nETag: W/\"datetime'2021-10-15T16%3A13%3A23.6420366Z'\"\r\n\r\n\r\n--changesetresponse_9439eaa0-54e2-4c6c-9738-a9a9142f4665\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nDataServiceVersion: 1.0;\r\nETag: W/\"datetime'2021-10-15T16%3A13%3A23.6420366Z'\"\r\n\r\n\r\n--changesetresponse_9439eaa0-54e2-4c6c-9738-a9a9142f4665--\r\n--batchresponse_3618ccc5-f0e3-48af-a139-48e88185a6c3--\r\n", [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'multipart/mixed; boundary=batchresponse_3618ccc5-f0e3-48af-a139-48e88185a6c3',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5af80797-c002-000d-65df-c16eb3000000',
  'x-ms-client-request-id',
  'd2ca2574-feef-4272-9386-92c51e4bbeb2',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 15 Oct 2021 16:13:23 GMT'
]);

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .get('/batchTableTestSASConnectionStringnode()')
  .query(true)
  .reply(200, {"odata.metadata":"https://fakeaccount.table.core.windows.net/$metadata#batchTableTestSASConnectionStringnode","value":[{"odata.etag":"W/\"datetime'2021-10-15T16%3A13%3A23.6410363Z'\"","PartitionKey":"batchTest","RowKey":"1","Timestamp":"2021-10-15T16:13:23.6410363Z","name":"updated"},{"odata.etag":"W/\"datetime'2021-10-15T16%3A13%3A23.6420366Z'\"","PartitionKey":"batchTest","RowKey":"2","Timestamp":"2021-10-15T16:13:23.6420366Z","name":"updated"},{"odata.etag":"W/\"datetime'2021-10-15T16%3A13%3A23.6420366Z'\"","PartitionKey":"batchTest","RowKey":"3","Timestamp":"2021-10-15T16:13:23.6420366Z","name":"updated"}]}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5af807cc-c002-000d-19df-c16eb3000000',
  'x-ms-client-request-id',
  '31a0bad1-6631-4259-a806-c830b950aa91',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,X-Content-Type-Options,Cache-Control,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 15 Oct 2021 16:13:23 GMT'
]);
