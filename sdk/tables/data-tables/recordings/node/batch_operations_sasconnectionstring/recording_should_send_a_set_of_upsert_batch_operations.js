let nock = require('nock');

module.exports.hash = "db96ff2bce0bb30fef64fe7c843bf74a";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/Tables', {"TableName":"batchTableTestSASConnectionStringnode"})
  .query(true)
  .reply(409, {"odata.error":{"code":"TableAlreadyExists","message":{"lang":"en-US","value":"The table specified already exists.\nRequestId:5af80807-c002-000d-4fdf-c16eb3000000\nTime:2021-10-15T16:13:23.7742090Z"}}}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5af80807-c002-000d-4fdf-c16eb3000000',
  'x-ms-client-request-id',
  '9d086fcc-b4b9-4786-91a4-2d0fcb3a2265',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 15 Oct 2021 16:13:23 GMT'
]);

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/$batch', "--batch_fakeId\r\ncontent-type: multipart/mixed; boundary=changeset_fakeId\r\n\r\n\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPUT https://fakeaccount.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='batchTest',RowKey='1') HTTP/1.1\r\ncontent-type: application/json\r\ndataserviceversion: 3.0\r\naccept: application/json\r\n\r\n\r\n{\"PartitionKey\":\"batchTest\",\"RowKey\":\"1\",\"name\":\"upserted\"}\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPUT https://fakeaccount.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='batchTest',RowKey='2') HTTP/1.1\r\ncontent-type: application/json\r\ndataserviceversion: 3.0\r\naccept: application/json\r\n\r\n\r\n{\"PartitionKey\":\"batchTest\",\"RowKey\":\"2\",\"name\":\"upserted\"}\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPUT https://fakeaccount.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='batchTest',RowKey='3') HTTP/1.1\r\ncontent-type: application/json\r\ndataserviceversion: 3.0\r\naccept: application/json\r\n\r\n\r\n{\"PartitionKey\":\"batchTest\",\"RowKey\":\"3\",\"name\":\"upserted\"}\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPUT https://fakeaccount.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='batchTest',RowKey='4') HTTP/1.1\r\ncontent-type: application/json\r\ndataserviceversion: 3.0\r\naccept: application/json\r\n\r\n\r\n{\"PartitionKey\":\"batchTest\",\"RowKey\":\"4\",\"name\":\"upserted\"}\r\n--changeset_fakeId--\r\n--batch_fakeId--\r\n")
  .query(true)
  .reply(202, "--batchresponse_fb1a810c-a75d-4fbc-a980-0535decc3769\r\nContent-Type: multipart/mixed; boundary=changesetresponse_d29a49ed-ad7c-4ad8-8c68-b4a3bca4da23\r\n\r\n--changesetresponse_d29a49ed-ad7c-4ad8-8c68-b4a3bca4da23\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nDataServiceVersion: 1.0;\r\nETag: W/\"datetime'2021-10-15T16%3A13%3A23.8191636Z'\"\r\n\r\n\r\n--changesetresponse_d29a49ed-ad7c-4ad8-8c68-b4a3bca4da23\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nDataServiceVersion: 1.0;\r\nETag: W/\"datetime'2021-10-15T16%3A13%3A23.8201647Z'\"\r\n\r\n\r\n--changesetresponse_d29a49ed-ad7c-4ad8-8c68-b4a3bca4da23\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nDataServiceVersion: 1.0;\r\nETag: W/\"datetime'2021-10-15T16%3A13%3A23.8201647Z'\"\r\n\r\n\r\n--changesetresponse_d29a49ed-ad7c-4ad8-8c68-b4a3bca4da23\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nDataServiceVersion: 1.0;\r\nETag: W/\"datetime'2021-10-15T16%3A13%3A23.8201647Z'\"\r\n\r\n\r\n--changesetresponse_d29a49ed-ad7c-4ad8-8c68-b4a3bca4da23--\r\n--batchresponse_fb1a810c-a75d-4fbc-a980-0535decc3769--\r\n", [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'multipart/mixed; boundary=batchresponse_fb1a810c-a75d-4fbc-a980-0535decc3769',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5af8082b-c002-000d-73df-c16eb3000000',
  'x-ms-client-request-id',
  '76f7c607-931a-4eb6-84cf-77f63eba34cd',
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
  .reply(200, {"odata.metadata":"https://fakeaccount.table.core.windows.net/$metadata#batchTableTestSASConnectionStringnode","value":[{"odata.etag":"W/\"datetime'2021-10-15T16%3A13%3A23.8191636Z'\"","PartitionKey":"batchTest","RowKey":"1","Timestamp":"2021-10-15T16:13:23.8191636Z","name":"upserted"},{"odata.etag":"W/\"datetime'2021-10-15T16%3A13%3A23.8201647Z'\"","PartitionKey":"batchTest","RowKey":"2","Timestamp":"2021-10-15T16:13:23.8201647Z","name":"upserted"},{"odata.etag":"W/\"datetime'2021-10-15T16%3A13%3A23.8201647Z'\"","PartitionKey":"batchTest","RowKey":"3","Timestamp":"2021-10-15T16:13:23.8201647Z","name":"upserted"},{"odata.etag":"W/\"datetime'2021-10-15T16%3A13%3A23.8201647Z'\"","PartitionKey":"batchTest","RowKey":"4","Timestamp":"2021-10-15T16:13:23.8201647Z","name":"upserted"}]}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5af80851-c002-000d-17df-c16eb3000000',
  'x-ms-client-request-id',
  '9fc54bd2-3b43-4e9d-b0fd-521889f21ce6',
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
