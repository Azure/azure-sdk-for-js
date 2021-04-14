let nock = require('nock');

module.exports.hash = "bf88218244062aa1ea20aaa77af979c6";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://fakestorageaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/Tables', {"TableName":"batchTableTestnode"})
  .query(true)
  .reply(201, {"odata.metadata":"https://fakestorageaccount.table.core.windows.net/$metadata#Tables/@Element","TableName":"batchTableTestnode"}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Location',
  "https://fakestorageaccount.table.core.windows.net/Tables('batchTableTestnode')",
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '35853a80-7002-0046-4810-2c776f000000',
  'x-ms-client-request-id',
  '2d58726e-902f-42f0-8240-9c36da89c07a',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 08 Apr 2021 00:49:13 GMT'
]);

nock('https://fakestorageaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/$batch', "--batch_fakeId\r\ncontent-type: multipart/mixed; boundary=changeset_fakeId\r\n\r\n\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPUT https://fakestorageaccount.table.core.windows.net/batchTableTestnode(PartitionKey='batchTest',RowKey='1') HTTP/1.1\r\ncontent-type: application/json\r\ndataserviceversion: 3.0\r\naccept: application/json\r\n\r\n\r\n{\"PartitionKey\":\"batchTest\",\"RowKey\":\"1\",\"name\":\"upserted\"}\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPUT https://fakestorageaccount.table.core.windows.net/batchTableTestnode(PartitionKey='batchTest',RowKey='2') HTTP/1.1\r\ncontent-type: application/json\r\ndataserviceversion: 3.0\r\naccept: application/json\r\n\r\n\r\n{\"PartitionKey\":\"batchTest\",\"RowKey\":\"2\",\"name\":\"upserted\"}\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPUT https://fakestorageaccount.table.core.windows.net/batchTableTestnode(PartitionKey='batchTest',RowKey='3') HTTP/1.1\r\ncontent-type: application/json\r\ndataserviceversion: 3.0\r\naccept: application/json\r\n\r\n\r\n{\"PartitionKey\":\"batchTest\",\"RowKey\":\"3\",\"name\":\"upserted\"}\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPUT https://fakestorageaccount.table.core.windows.net/batchTableTestnode(PartitionKey='batchTest',RowKey='4') HTTP/1.1\r\ncontent-type: application/json\r\ndataserviceversion: 3.0\r\naccept: application/json\r\n\r\n\r\n{\"PartitionKey\":\"batchTest\",\"RowKey\":\"4\",\"name\":\"upserted\"}\r\n--changeset_fakeId--\r\n--batch_fakeId\r\n")
  .query(true)
  .reply(202, "--batchresponse_0dab2773-11a8-4191-91f2-322605422e9a\r\nContent-Type: multipart/mixed; boundary=changesetresponse_8c96610d-ae3c-4955-8469-5a451e4444a8\r\n\r\n--changesetresponse_8c96610d-ae3c-4955-8469-5a451e4444a8\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nDataServiceVersion: 1.0;\r\nETag: W/\"datetime'2021-04-08T00%3A49%3A13.6349993Z'\"\r\n\r\n\r\n--changesetresponse_8c96610d-ae3c-4955-8469-5a451e4444a8\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nDataServiceVersion: 1.0;\r\nETag: W/\"datetime'2021-04-08T00%3A49%3A13.6349993Z'\"\r\n\r\n\r\n--changesetresponse_8c96610d-ae3c-4955-8469-5a451e4444a8\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nDataServiceVersion: 1.0;\r\nETag: W/\"datetime'2021-04-08T00%3A49%3A13.6349993Z'\"\r\n\r\n\r\n--changesetresponse_8c96610d-ae3c-4955-8469-5a451e4444a8\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nDataServiceVersion: 1.0;\r\nETag: W/\"datetime'2021-04-08T00%3A49%3A13.6349993Z'\"\r\n\r\n\r\n--changesetresponse_8c96610d-ae3c-4955-8469-5a451e4444a8--\r\n--batchresponse_0dab2773-11a8-4191-91f2-322605422e9a--\r\n", [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'multipart/mixed; boundary=batchresponse_0dab2773-11a8-4191-91f2-322605422e9a',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '35853a9a-7002-0046-6010-2c776f000000',
  'x-ms-client-request-id',
  '88db4f74-9740-464a-b9be-14c1fe09310a',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 08 Apr 2021 00:49:13 GMT'
]);

nock('https://fakestorageaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .get('/batchTableTestnode()')
  .query(true)
  .reply(200, {"odata.metadata":"https://fakestorageaccount.table.core.windows.net/$metadata#batchTableTestnode","value":[{"odata.etag":"W/\"datetime'2021-04-08T00%3A49%3A13.6349993Z'\"","PartitionKey":"batchTest","RowKey":"1","Timestamp":"2021-04-08T00:49:13.6349993Z","name":"upserted"},{"odata.etag":"W/\"datetime'2021-04-08T00%3A49%3A13.6349993Z'\"","PartitionKey":"batchTest","RowKey":"2","Timestamp":"2021-04-08T00:49:13.6349993Z","name":"upserted"},{"odata.etag":"W/\"datetime'2021-04-08T00%3A49%3A13.6349993Z'\"","PartitionKey":"batchTest","RowKey":"3","Timestamp":"2021-04-08T00:49:13.6349993Z","name":"upserted"},{"odata.etag":"W/\"datetime'2021-04-08T00%3A49%3A13.6349993Z'\"","PartitionKey":"batchTest","RowKey":"4","Timestamp":"2021-04-08T00:49:13.6349993Z","name":"upserted"}]}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '35853ab0-7002-0046-7610-2c776f000000',
  'x-ms-client-request-id',
  'f8a9a2c1-ab7a-4f31-b649-5ffc2f8834b2',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,X-Content-Type-Options,Cache-Control,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 08 Apr 2021 00:49:13 GMT'
]);
