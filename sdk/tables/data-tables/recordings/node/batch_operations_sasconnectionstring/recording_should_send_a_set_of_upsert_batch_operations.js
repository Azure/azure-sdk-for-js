let nock = require('nock');

module.exports.hash = "db96ff2bce0bb30fef64fe7c843bf74a";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/Tables', {"TableName":"batchTableTestSASConnectionStringnode"})
  .query(true)
  .reply(409, {"odata.error":{"code":"TableAlreadyExists","message":{"lang":"en-US","value":"The table specified already exists.\nRequestId:6ced329e-0002-0039-54ae-a9c11b000000\nTime:2021-09-14T21:24:21.4010367Z"}}}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6ced329e-0002-0039-54ae-a9c11b000000',
  'x-ms-client-request-id',
  '02e82d7a-4584-48b4-8ecf-1312aeda6b2e',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 14 Sep 2021 21:24:21 GMT'
]);

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/$batch', "--batch_fakeId\r\ncontent-type: multipart/mixed; boundary=changeset_fakeId\r\n\r\n\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPUT https://fakeaccount.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='batchTest',RowKey='1') HTTP/1.1\r\ncontent-type: application/json\r\ndataserviceversion: 3.0\r\naccept: application/json\r\n\r\n\r\n{\"PartitionKey\":\"batchTest\",\"RowKey\":\"1\",\"name\":\"upserted\"}\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPUT https://fakeaccount.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='batchTest',RowKey='2') HTTP/1.1\r\ncontent-type: application/json\r\ndataserviceversion: 3.0\r\naccept: application/json\r\n\r\n\r\n{\"PartitionKey\":\"batchTest\",\"RowKey\":\"2\",\"name\":\"upserted\"}\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPUT https://fakeaccount.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='batchTest',RowKey='3') HTTP/1.1\r\ncontent-type: application/json\r\ndataserviceversion: 3.0\r\naccept: application/json\r\n\r\n\r\n{\"PartitionKey\":\"batchTest\",\"RowKey\":\"3\",\"name\":\"upserted\"}\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPUT https://fakeaccount.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='batchTest',RowKey='4') HTTP/1.1\r\ncontent-type: application/json\r\ndataserviceversion: 3.0\r\naccept: application/json\r\n\r\n\r\n{\"PartitionKey\":\"batchTest\",\"RowKey\":\"4\",\"name\":\"upserted\"}\r\n--changeset_fakeId--\r\n--batch_fakeId--\r\n")
  .query(true)
  .reply(202, "--batchresponse_8cd85d4d-7449-40ba-9bb6-ce88afdbe588\r\nContent-Type: multipart/mixed; boundary=changesetresponse_712a07ec-24c8-4302-b6cb-5201d4f25253\r\n\r\n--changesetresponse_712a07ec-24c8-4302-b6cb-5201d4f25253\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nDataServiceVersion: 1.0;\r\nETag: W/\"datetime'2021-09-14T21%3A24%3A21.816492Z'\"\r\n\r\n\r\n--changesetresponse_712a07ec-24c8-4302-b6cb-5201d4f25253\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nDataServiceVersion: 1.0;\r\nETag: W/\"datetime'2021-09-14T21%3A24%3A21.8174923Z'\"\r\n\r\n\r\n--changesetresponse_712a07ec-24c8-4302-b6cb-5201d4f25253\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nDataServiceVersion: 1.0;\r\nETag: W/\"datetime'2021-09-14T21%3A24%3A21.8174923Z'\"\r\n\r\n\r\n--changesetresponse_712a07ec-24c8-4302-b6cb-5201d4f25253\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nDataServiceVersion: 1.0;\r\nETag: W/\"datetime'2021-09-14T21%3A24%3A21.8174923Z'\"\r\n\r\n\r\n--changesetresponse_712a07ec-24c8-4302-b6cb-5201d4f25253--\r\n--batchresponse_8cd85d4d-7449-40ba-9bb6-ce88afdbe588--\r\n", [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'multipart/mixed; boundary=batchresponse_8cd85d4d-7449-40ba-9bb6-ce88afdbe588',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6ced32e6-0002-0039-17ae-a9c11b000000',
  'x-ms-client-request-id',
  '9b166512-73f6-43b6-b925-96624d066f91',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 14 Sep 2021 21:24:21 GMT'
]);

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .get('/batchTableTestSASConnectionStringnode()')
  .query(true)
  .reply(200, {"odata.metadata":"https://fakeaccount.table.core.windows.net/$metadata#batchTableTestSASConnectionStringnode","value":[{"odata.etag":"W/\"datetime'2021-09-14T21%3A24%3A21.816492Z'\"","PartitionKey":"batchTest","RowKey":"1","Timestamp":"2021-09-14T21:24:21.816492Z","name":"upserted"},{"odata.etag":"W/\"datetime'2021-09-14T21%3A24%3A21.8174923Z'\"","PartitionKey":"batchTest","RowKey":"2","Timestamp":"2021-09-14T21:24:21.8174923Z","name":"upserted"},{"odata.etag":"W/\"datetime'2021-09-14T21%3A24%3A21.8174923Z'\"","PartitionKey":"batchTest","RowKey":"3","Timestamp":"2021-09-14T21:24:21.8174923Z","name":"upserted"},{"odata.etag":"W/\"datetime'2021-09-14T21%3A24%3A21.8174923Z'\"","PartitionKey":"batchTest","RowKey":"4","Timestamp":"2021-09-14T21:24:21.8174923Z","name":"upserted"}]}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6ced32ee-0002-0039-1dae-a9c11b000000',
  'x-ms-client-request-id',
  'd6d10ba3-c3ed-4734-9754-912afd01f4c0',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,X-Content-Type-Options,Cache-Control,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 14 Sep 2021 21:24:21 GMT'
]);
