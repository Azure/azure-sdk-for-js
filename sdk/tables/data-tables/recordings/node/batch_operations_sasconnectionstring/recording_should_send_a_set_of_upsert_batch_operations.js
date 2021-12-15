let nock = require('nock');

module.exports.hash = "db96ff2bce0bb30fef64fe7c843bf74a";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/Tables', {"TableName":"batchTableTestSASConnectionStringnode"})
  .query(true)
  .reply(409, {"odata.error":{"code":"TableAlreadyExists","message":{"lang":"en-US","value":"The table specified already exists.\nRequestId:00766028-e002-0038-3804-a4c0e6000000\nTime:2021-09-07T16:24:23.7484357Z"}}}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '00766028-e002-0038-3804-a4c0e6000000',
  'x-ms-client-request-id',
  '1860ff99-7a94-4451-b8d9-3a97569abd76',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 07 Sep 2021 16:24:23 GMT'
]);

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/$batch', "--batch_fakeId\r\ncontent-type: multipart/mixed; boundary=changeset_fakeId\r\n\r\n\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPUT https://fakeaccount.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='batchTest',RowKey='1') HTTP/1.1\r\nContent-Type: application/json\r\nDataServiceVersion: 3.0\r\nAccept: application/json\r\n\r\n\r\n{\"PartitionKey\":\"batchTest\",\"RowKey\":\"1\",\"name\":\"upserted\"}\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPUT https://fakeaccount.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='batchTest',RowKey='2') HTTP/1.1\r\nContent-Type: application/json\r\nDataServiceVersion: 3.0\r\nAccept: application/json\r\n\r\n\r\n{\"PartitionKey\":\"batchTest\",\"RowKey\":\"2\",\"name\":\"upserted\"}\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPUT https://fakeaccount.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='batchTest',RowKey='3') HTTP/1.1\r\nContent-Type: application/json\r\nDataServiceVersion: 3.0\r\nAccept: application/json\r\n\r\n\r\n{\"PartitionKey\":\"batchTest\",\"RowKey\":\"3\",\"name\":\"upserted\"}\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPUT https://fakeaccount.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='batchTest',RowKey='4') HTTP/1.1\r\nContent-Type: application/json\r\nDataServiceVersion: 3.0\r\nAccept: application/json\r\n\r\n\r\n{\"PartitionKey\":\"batchTest\",\"RowKey\":\"4\",\"name\":\"upserted\"}\r\n--changeset_fakeId--\r\n--batch_fakeId--\r\n")
  .query(true)
  .reply(202, "--batchresponse_781ab287-0a5d-42ae-a285-d0f84ce1ac0b\r\nContent-Type: multipart/mixed; boundary=changesetresponse_c9bf07e9-2d9a-4454-9f72-fadbacaa509d\r\n\r\n--changesetresponse_c9bf07e9-2d9a-4454-9f72-fadbacaa509d\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nDataServiceVersion: 1.0;\r\nETag: W/\"datetime'2021-09-07T16%3A24%3A23.8249829Z'\"\r\n\r\n\r\n--changesetresponse_c9bf07e9-2d9a-4454-9f72-fadbacaa509d\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nDataServiceVersion: 1.0;\r\nETag: W/\"datetime'2021-09-07T16%3A24%3A23.8249829Z'\"\r\n\r\n\r\n--changesetresponse_c9bf07e9-2d9a-4454-9f72-fadbacaa509d\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nDataServiceVersion: 1.0;\r\nETag: W/\"datetime'2021-09-07T16%3A24%3A23.825984Z'\"\r\n\r\n\r\n--changesetresponse_c9bf07e9-2d9a-4454-9f72-fadbacaa509d\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nDataServiceVersion: 1.0;\r\nETag: W/\"datetime'2021-09-07T16%3A24%3A23.825984Z'\"\r\n\r\n\r\n--changesetresponse_c9bf07e9-2d9a-4454-9f72-fadbacaa509d--\r\n--batchresponse_781ab287-0a5d-42ae-a285-d0f84ce1ac0b--\r\n", [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'multipart/mixed; boundary=batchresponse_781ab287-0a5d-42ae-a285-d0f84ce1ac0b',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0076602e-e002-0038-3e04-a4c0e6000000',
  'x-ms-client-request-id',
  '534f6558-0b5f-4ca1-8f44-a33f87c0ce91',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 07 Sep 2021 16:24:23 GMT'
]);

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .get('/batchTableTestSASConnectionStringnode()')
  .query(true)
  .reply(200, {"odata.metadata":"https://fakeaccount.table.core.windows.net/$metadata#batchTableTestSASConnectionStringnode","value":[{"odata.etag":"W/\"datetime'2021-09-07T16%3A24%3A23.8249829Z'\"","PartitionKey":"batchTest","RowKey":"1","Timestamp":"2021-09-07T16:24:23.8249829Z","name":"upserted"},{"odata.etag":"W/\"datetime'2021-09-07T16%3A24%3A23.8249829Z'\"","PartitionKey":"batchTest","RowKey":"2","Timestamp":"2021-09-07T16:24:23.8249829Z","name":"upserted"},{"odata.etag":"W/\"datetime'2021-09-07T16%3A24%3A23.825984Z'\"","PartitionKey":"batchTest","RowKey":"3","Timestamp":"2021-09-07T16:24:23.825984Z","name":"upserted"},{"odata.etag":"W/\"datetime'2021-09-07T16%3A24%3A23.825984Z'\"","PartitionKey":"batchTest","RowKey":"4","Timestamp":"2021-09-07T16:24:23.825984Z","name":"upserted"}]}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '00766036-e002-0038-4504-a4c0e6000000',
  'x-ms-client-request-id',
  '0502708d-b959-4056-aba3-f5e427359342',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,X-Content-Type-Options,Cache-Control,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 07 Sep 2021 16:24:23 GMT'
]);
