let nock = require('nock');

module.exports.hash = "11d1d7464f0791a574f683efa04b7a31";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://fakestorageaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/Tables', {"TableName":"batchTableTestSASConnectionStringnode"})
  .query(true)
  .reply(409, {"odata.error":{"code":"TableAlreadyExists","message":{"lang":"en-US","value":"The table specified already exists.\nRequestId:6e9d0e13-c002-0024-3f8c-5918f1000000\nTime:2021-06-04T21:59:53.9477967Z"}}}, [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6e9d0e13-c002-0024-3f8c-5918f1000000',
  'x-ms-client-request-id',
  '86d0cfd1-d1b0-4e4a-98c6-5d2b35d95986',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 04 Jun 2021 21:59:53 GMT' ]);

nock('https://fakestorageaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/$batch', "--batch_fakeId\r\ncontent-type: multipart/mixed; boundary=changeset_fakeId\r\n\r\n\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPUT https://fakestorageaccount.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='batchTest',RowKey='1') HTTP/1.1\r\ncontent-type: application/json\r\ndataserviceversion: 3.0\r\naccept: application/json\r\n\r\n\r\n{\"PartitionKey\":\"batchTest\",\"RowKey\":\"1\",\"name\":\"upserted\"}\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPUT https://fakestorageaccount.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='batchTest',RowKey='2') HTTP/1.1\r\ncontent-type: application/json\r\ndataserviceversion: 3.0\r\naccept: application/json\r\n\r\n\r\n{\"PartitionKey\":\"batchTest\",\"RowKey\":\"2\",\"name\":\"upserted\"}\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPUT https://fakestorageaccount.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='batchTest',RowKey='3') HTTP/1.1\r\ncontent-type: application/json\r\ndataserviceversion: 3.0\r\naccept: application/json\r\n\r\n\r\n{\"PartitionKey\":\"batchTest\",\"RowKey\":\"3\",\"name\":\"upserted\"}\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPUT https://fakestorageaccount.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='batchTest',RowKey='4') HTTP/1.1\r\ncontent-type: application/json\r\ndataserviceversion: 3.0\r\naccept: application/json\r\n\r\n\r\n{\"PartitionKey\":\"batchTest\",\"RowKey\":\"4\",\"name\":\"upserted\"}\r\n--changeset_fakeId--\r\n--batch_fakeId\r\n")
  .query(true)
  .reply(202, "--batchresponse_25236d84-1ce2-4e7e-8d8e-98e421d3d82b\r\nContent-Type: multipart/mixed; boundary=changesetresponse_e29f3652-253b-4f67-93de-83e811efc59b\r\n\r\n--changesetresponse_e29f3652-253b-4f67-93de-83e811efc59b\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nDataServiceVersion: 1.0;\r\nETag: W/\"datetime'2021-06-04T21%3A59%3A53.984598Z'\"\r\n\r\n\r\n--changesetresponse_e29f3652-253b-4f67-93de-83e811efc59b\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nDataServiceVersion: 1.0;\r\nETag: W/\"datetime'2021-06-04T21%3A59%3A53.984598Z'\"\r\n\r\n\r\n--changesetresponse_e29f3652-253b-4f67-93de-83e811efc59b\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nDataServiceVersion: 1.0;\r\nETag: W/\"datetime'2021-06-04T21%3A59%3A53.9855996Z'\"\r\n\r\n\r\n--changesetresponse_e29f3652-253b-4f67-93de-83e811efc59b\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nDataServiceVersion: 1.0;\r\nETag: W/\"datetime'2021-06-04T21%3A59%3A53.9855996Z'\"\r\n\r\n\r\n--changesetresponse_e29f3652-253b-4f67-93de-83e811efc59b--\r\n--batchresponse_25236d84-1ce2-4e7e-8d8e-98e421d3d82b--\r\n", [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'multipart/mixed; boundary=batchresponse_25236d84-1ce2-4e7e-8d8e-98e421d3d82b',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6e9d0e16-c002-0024-428c-5918f1000000',
  'x-ms-client-request-id',
  '514f0ba4-f4bd-414f-9958-c7de74b5cc5d',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 04 Jun 2021 21:59:53 GMT' ]);

nock('https://fakestorageaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .get('/batchTableTestSASConnectionStringnode()')
  .query(true)
  .reply(200, {"odata.metadata":"https://fakestorageaccount.table.core.windows.net/$metadata#batchTableTestSASConnectionStringnode","value":[{"odata.etag":"W/\"datetime'2021-06-04T21%3A59%3A53.984598Z'\"","PartitionKey":"batchTest","RowKey":"1","Timestamp":"2021-06-04T21:59:53.984598Z","name":"upserted"},{"odata.etag":"W/\"datetime'2021-06-04T21%3A59%3A53.984598Z'\"","PartitionKey":"batchTest","RowKey":"2","Timestamp":"2021-06-04T21:59:53.984598Z","name":"upserted"},{"odata.etag":"W/\"datetime'2021-06-04T21%3A59%3A53.9855996Z'\"","PartitionKey":"batchTest","RowKey":"3","Timestamp":"2021-06-04T21:59:53.9855996Z","name":"upserted"},{"odata.etag":"W/\"datetime'2021-06-04T21%3A59%3A53.9855996Z'\"","PartitionKey":"batchTest","RowKey":"4","Timestamp":"2021-06-04T21:59:53.9855996Z","name":"upserted"}]}, [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6e9d0e1b-c002-0024-478c-5918f1000000',
  'x-ms-client-request-id',
  '0a5f7597-a7d9-4f0f-9628-990e3c62f2c1',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,X-Content-Type-Options,Cache-Control,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 04 Jun 2021 21:59:53 GMT' ]);
