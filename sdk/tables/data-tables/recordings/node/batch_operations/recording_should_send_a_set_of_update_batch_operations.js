let nock = require('nock');

module.exports.hash = "87571f0534206b8f122cd46cfad4aea1";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://fakestorageaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/Tables', {"TableName":"batchTableTestnode"})
  .query(true)
  .reply(409, {"odata.error":{"code":"TableAlreadyExists","message":{"lang":"en-US","value":"The table specified already exists.\nRequestId:85f1d8dc-e002-0048-1176-989b64000000\nTime:2020-10-02T04:44:43.4575772Z"}}}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '85f1d8dc-e002-0048-1176-989b64000000',
  'x-ms-client-request-id',
  '213e1541-5673-490c-88fa-c4d86ec73351',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 02 Oct 2020 04:44:42 GMT'
]);

nock('https://fakestorageaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/$batch', "--batch_mockBatchId\r\ncontent-type: multipart/mixed; boundary=changeset_mockChangesetId\r\n\r\n\r\n--changeset_mockChangesetId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPUT https://fakestorageaccount.table.core.windows.net/batchTableTestnode(PartitionKey='batchTest',RowKey='1') HTTP/1.1\r\nContent-Type: application/json\r\nDataServiceVersion: 3.0\r\nAccept: application/json\r\nIf-Match: *\r\n\r\n{\"PartitionKey\":\"batchTest\",\"RowKey\":\"1\",\"name\":\"updated\"}\r\n--changeset_mockChangesetId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPUT https://fakestorageaccount.table.core.windows.net/batchTableTestnode(PartitionKey='batchTest',RowKey='2') HTTP/1.1\r\nContent-Type: application/json\r\nDataServiceVersion: 3.0\r\nAccept: application/json\r\nIf-Match: *\r\n\r\n{\"PartitionKey\":\"batchTest\",\"RowKey\":\"2\",\"name\":\"updated\"}\r\n--changeset_mockChangesetId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPUT https://fakestorageaccount.table.core.windows.net/batchTableTestnode(PartitionKey='batchTest',RowKey='3') HTTP/1.1\r\nContent-Type: application/json\r\nDataServiceVersion: 3.0\r\nAccept: application/json\r\nIf-Match: *\r\n\r\n{\"PartitionKey\":\"batchTest\",\"RowKey\":\"3\",\"name\":\"updated\"}\r\n--changeset_mockChangesetId--\r\n--batch_mockBatchId\r\n")
  .query(true)
  .reply(202, "--batchresponse_06b97347-b58c-478f-8844-b467bcf02243\r\nContent-Type: multipart/mixed; boundary=changesetresponse_eb8dd609-a5a9-462a-b766-6993c9c81669\r\n\r\n--changesetresponse_eb8dd609-a5a9-462a-b766-6993c9c81669\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nDataServiceVersion: 1.0;\r\nETag: W/\"datetime'2020-10-02T04%3A44%3A43.5716665Z'\"\r\n\r\n\r\n--changesetresponse_eb8dd609-a5a9-462a-b766-6993c9c81669\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nDataServiceVersion: 1.0;\r\nETag: W/\"datetime'2020-10-02T04%3A44%3A43.5716665Z'\"\r\n\r\n\r\n--changesetresponse_eb8dd609-a5a9-462a-b766-6993c9c81669\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nDataServiceVersion: 1.0;\r\nETag: W/\"datetime'2020-10-02T04%3A44%3A43.5726674Z'\"\r\n\r\n\r\n--changesetresponse_eb8dd609-a5a9-462a-b766-6993c9c81669--\r\n--batchresponse_06b97347-b58c-478f-8844-b467bcf02243--\r\n", [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'multipart/mixed; boundary=batchresponse_06b97347-b58c-478f-8844-b467bcf02243',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '21000e55-9002-004c-4b76-986ee6000000',
  'x-ms-client-request-id',
  '19305aca-8e7c-4c03-88e3-56418351e278',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 02 Oct 2020 04:44:43 GMT'
]);

nock('https://fakestorageaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .get('/batchTableTestnode()')
  .query(true)
  .reply(200, {"odata.metadata":"https://fakestorageaccount.table.core.windows.net/$metadata#batchTableTestnode","value":[{"odata.etag":"W/\"datetime'2020-10-02T04%3A44%3A43.5716665Z'\"","PartitionKey":"batchTest","RowKey":"1","Timestamp":"2020-10-02T04:44:43.5716665Z","name":"updated"},{"odata.etag":"W/\"datetime'2020-10-02T04%3A44%3A43.5716665Z'\"","PartitionKey":"batchTest","RowKey":"2","Timestamp":"2020-10-02T04:44:43.5716665Z","name":"updated"},{"odata.etag":"W/\"datetime'2020-10-02T04%3A44%3A43.5726674Z'\"","PartitionKey":"batchTest","RowKey":"3","Timestamp":"2020-10-02T04:44:43.5726674Z","name":"updated"}]}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '85f1d8e5-e002-0048-1876-989b64000000',
  'x-ms-client-request-id',
  '7ee4da01-5bb1-465e-a8a2-572a4f2f7af0',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,X-Content-Type-Options,Cache-Control,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 02 Oct 2020 04:44:42 GMT'
]);
