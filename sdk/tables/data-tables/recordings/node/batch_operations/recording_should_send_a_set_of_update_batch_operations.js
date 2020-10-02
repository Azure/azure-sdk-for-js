let nock = require('nock');

module.exports.hash = "909b116b20d82a456c337dffff84331e";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://fakestorageaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/Tables', {"TableName":"batchTableTestnode"})
  .query(true)
  .reply(409, {"odata.error":{"code":"TableAlreadyExists","message":{"lang":"en-US","value":"The table specified already exists.\nRequestId:37675746-4002-0001-1711-99a804000000\nTime:2020-10-02T23:12:22.6009403Z"}}}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '37675746-4002-0001-1711-99a804000000',
  'x-ms-client-request-id',
  'e807b528-0e1d-4a1d-89bf-e2bded7bb450',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 02 Oct 2020 23:12:21 GMT'
]);

nock('https://fakestorageaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/$batch', "--batch_fakeId\r\ncontent-type: multipart/mixed; boundary=changeset_fakeId\r\n\r\n\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPUT https://fakestorageaccount.table.core.windows.net/batchTableTestnode(PartitionKey='batchTest',RowKey='1') HTTP/1.1\r\nContent-Type: application/json\r\nDataServiceVersion: 3.0\r\nAccept: application/json\r\nIf-Match: *\r\n\r\n{\"PartitionKey\":\"batchTest\",\"RowKey\":\"1\",\"name\":\"updated\"}\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPUT https://fakestorageaccount.table.core.windows.net/batchTableTestnode(PartitionKey='batchTest',RowKey='2') HTTP/1.1\r\nContent-Type: application/json\r\nDataServiceVersion: 3.0\r\nAccept: application/json\r\nIf-Match: *\r\n\r\n{\"PartitionKey\":\"batchTest\",\"RowKey\":\"2\",\"name\":\"updated\"}\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPUT https://fakestorageaccount.table.core.windows.net/batchTableTestnode(PartitionKey='batchTest',RowKey='3') HTTP/1.1\r\nContent-Type: application/json\r\nDataServiceVersion: 3.0\r\nAccept: application/json\r\nIf-Match: *\r\n\r\n{\"PartitionKey\":\"batchTest\",\"RowKey\":\"3\",\"name\":\"updated\"}\r\n--changeset_fakeId--\r\n--batch_fakeId\r\n")
  .query(true)
  .reply(202, "--batchresponse_5ac28fb8-a85c-42ad-9bbc-8900f355ddea\r\nContent-Type: multipart/mixed; boundary=changesetresponse_53d67dd4-f247-4e86-8961-2eef5492779c\r\n\r\n--changesetresponse_53d67dd4-f247-4e86-8961-2eef5492779c\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nDataServiceVersion: 1.0;\r\nETag: W/\"datetime'2020-10-02T23%3A12%3A22.7093775Z'\"\r\n\r\n\r\n--changesetresponse_53d67dd4-f247-4e86-8961-2eef5492779c\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nDataServiceVersion: 1.0;\r\nETag: W/\"datetime'2020-10-02T23%3A12%3A22.710378Z'\"\r\n\r\n\r\n--changesetresponse_53d67dd4-f247-4e86-8961-2eef5492779c\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nDataServiceVersion: 1.0;\r\nETag: W/\"datetime'2020-10-02T23%3A12%3A22.710378Z'\"\r\n\r\n\r\n--changesetresponse_53d67dd4-f247-4e86-8961-2eef5492779c--\r\n--batchresponse_5ac28fb8-a85c-42ad-9bbc-8900f355ddea--\r\n", [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'multipart/mixed; boundary=batchresponse_5ac28fb8-a85c-42ad-9bbc-8900f355ddea',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'df9cbd29-5002-0037-5011-990556000000',
  'x-ms-client-request-id',
  'dcb19c5a-6fa9-476b-8925-53c158342432',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 02 Oct 2020 23:12:22 GMT'
]);

nock('https://fakestorageaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .get('/batchTableTestnode()')
  .query(true)
  .reply(200, {"odata.metadata":"https://fakestorageaccount.table.core.windows.net/$metadata#batchTableTestnode","value":[{"odata.etag":"W/\"datetime'2020-10-02T23%3A12%3A22.7093775Z'\"","PartitionKey":"batchTest","RowKey":"1","Timestamp":"2020-10-02T23:12:22.7093775Z","name":"updated"},{"odata.etag":"W/\"datetime'2020-10-02T23%3A12%3A22.710378Z'\"","PartitionKey":"batchTest","RowKey":"2","Timestamp":"2020-10-02T23:12:22.710378Z","name":"updated"},{"odata.etag":"W/\"datetime'2020-10-02T23%3A12%3A22.710378Z'\"","PartitionKey":"batchTest","RowKey":"3","Timestamp":"2020-10-02T23:12:22.710378Z","name":"updated"}]}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3767576b-4002-0001-3511-99a804000000',
  'x-ms-client-request-id',
  '6f4f6a32-812a-472c-9638-374e05381d2f',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,X-Content-Type-Options,Cache-Control,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 02 Oct 2020 23:12:21 GMT'
]);
