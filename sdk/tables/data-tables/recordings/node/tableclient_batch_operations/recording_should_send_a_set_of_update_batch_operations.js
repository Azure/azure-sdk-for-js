let nock = require('nock');

module.exports.hash = "4dde11584c13814230b65fbe34dc0d2c";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://fakestorageaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/$batch', "--batch_mockBatchId\r\ncontent-type: multipart/mixed; boundary=changeset_mockChangesetId\r\n\r\n\r\n--changeset_mockChangesetId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPUT https://fakestorageaccount.table.core.windows.net/tableClientTestnode(PartitionKey='batchTest',RowKey='1') HTTP/1.1\r\nContent-Type: application/json\r\nDataServiceVersion: 3.0\r\nAccept: application/json\r\nIf-Match: *\r\n\r\n{\"PartitionKey\":\"batchTest\",\"RowKey\":\"1\",\"name\":\"updated\"}\r\n--changeset_mockChangesetId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPUT https://fakestorageaccount.table.core.windows.net/tableClientTestnode(PartitionKey='batchTest',RowKey='2') HTTP/1.1\r\nContent-Type: application/json\r\nDataServiceVersion: 3.0\r\nAccept: application/json\r\nIf-Match: *\r\n\r\n{\"PartitionKey\":\"batchTest\",\"RowKey\":\"2\",\"name\":\"updated\"}\r\n--changeset_mockChangesetId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPUT https://fakestorageaccount.table.core.windows.net/tableClientTestnode(PartitionKey='batchTest',RowKey='3') HTTP/1.1\r\nContent-Type: application/json\r\nDataServiceVersion: 3.0\r\nAccept: application/json\r\nIf-Match: *\r\n\r\n{\"PartitionKey\":\"batchTest\",\"RowKey\":\"3\",\"name\":\"updated\"}\r\n--changeset_mockChangesetId--\r\n--batch_mockBatchId\r\n")
  .query(true)
  .reply(202, "--batchresponse_6eb367c7-3d19-495d-8b3f-8f203fa6351d\r\nContent-Type: multipart/mixed; boundary=changesetresponse_307614a2-8ea3-46a9-9cc3-587df2253945\r\n\r\n--changesetresponse_307614a2-8ea3-46a9-9cc3-587df2253945\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nDataServiceVersion: 1.0;\r\nETag: W/\"datetime'2020-10-02T02%3A59%3A56.8207201Z'\"\r\n\r\n\r\n--changesetresponse_307614a2-8ea3-46a9-9cc3-587df2253945\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nDataServiceVersion: 1.0;\r\nETag: W/\"datetime'2020-10-02T02%3A59%3A56.8207201Z'\"\r\n\r\n\r\n--changesetresponse_307614a2-8ea3-46a9-9cc3-587df2253945\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nDataServiceVersion: 1.0;\r\nETag: W/\"datetime'2020-10-02T02%3A59%3A56.8217206Z'\"\r\n\r\n\r\n--changesetresponse_307614a2-8ea3-46a9-9cc3-587df2253945--\r\n--batchresponse_6eb367c7-3d19-495d-8b3f-8f203fa6351d--\r\n", [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'multipart/mixed; boundary=batchresponse_6eb367c7-3d19-495d-8b3f-8f203fa6351d',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '896d99d6-0002-0006-5968-985e81000000',
  'x-ms-client-request-id',
  'e0dfcaa7-c0a6-4ce1-bb91-400a0ff3a6f2',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 02 Oct 2020 02:59:56 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .get('/tableClientTestnode()')
  .query(true)
  .reply(200, {"odata.metadata":"https://fakestorageaccount.table.core.windows.net/$metadata#tableClientTestnode","value":[{"odata.etag":"W/\"datetime'2020-10-02T02%3A59%3A56.8207201Z'\"","PartitionKey":"batchTest","RowKey":"1","Timestamp":"2020-10-02T02:59:56.8207201Z","name":"updated"},{"odata.etag":"W/\"datetime'2020-10-02T02%3A59%3A56.8207201Z'\"","PartitionKey":"batchTest","RowKey":"2","Timestamp":"2020-10-02T02:59:56.8207201Z","name":"updated"},{"odata.etag":"W/\"datetime'2020-10-02T02%3A59%3A56.8217206Z'\"","PartitionKey":"batchTest","RowKey":"3","Timestamp":"2020-10-02T02:59:56.8217206Z","name":"updated"}]}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8dff7152-e002-0007-1068-985f7c000000',
  'x-ms-client-request-id',
  'b43549d3-91ce-4951-8f9d-71507ef1b090',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,X-Content-Type-Options,Cache-Control,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 02 Oct 2020 02:59:56 GMT'
]);
