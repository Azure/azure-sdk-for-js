let nock = require('nock');

module.exports.hash = "7d9af0ee8cf4fe3f2960151a3e397df0";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/Tables', {"TableName":"batchTableTestSASConnectionStringnode"})
  .query(true)
  .reply(409, {"odata.error":{"code":"TableAlreadyExists","message":{"lang":"en-US","value":"The table specified already exists.\nRequestId:6ced325e-0002-0039-1aae-a9c11b000000\nTime:2021-09-14T21:24:21.0898161Z"}}}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6ced325e-0002-0039-1aae-a9c11b000000',
  'x-ms-client-request-id',
  '54d5a775-cd9d-4692-b4a1-0993d73ba30c',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 14 Sep 2021 21:24:20 GMT'
]);

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/$batch', "--batch_fakeId\r\ncontent-type: multipart/mixed; boundary=changeset_fakeId\r\n\r\n\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPUT https://fakeaccount.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='batchTest',RowKey='1') HTTP/1.1\r\ncontent-type: application/json\r\ndataserviceversion: 3.0\r\naccept: application/json\r\nif-match: *\r\n\r\n\r\n{\"PartitionKey\":\"batchTest\",\"RowKey\":\"1\",\"name\":\"updated\"}\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPUT https://fakeaccount.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='batchTest',RowKey='2') HTTP/1.1\r\ncontent-type: application/json\r\ndataserviceversion: 3.0\r\naccept: application/json\r\nif-match: *\r\n\r\n\r\n{\"PartitionKey\":\"batchTest\",\"RowKey\":\"2\",\"name\":\"updated\"}\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPUT https://fakeaccount.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='batchTest',RowKey='3') HTTP/1.1\r\ncontent-type: application/json\r\ndataserviceversion: 3.0\r\naccept: application/json\r\nif-match: *\r\n\r\n\r\n{\"PartitionKey\":\"batchTest\",\"RowKey\":\"3\",\"name\":\"updated\"}\r\n--changeset_fakeId--\r\n--batch_fakeId--\r\n")
  .query(true)
  .reply(202, "--batchresponse_d98ea607-0bda-41ca-aefa-91ae79742e7c\r\nContent-Type: multipart/mixed; boundary=changesetresponse_36f34e13-3723-43d4-9382-82f745bd93b9\r\n\r\n--changesetresponse_36f34e13-3723-43d4-9382-82f745bd93b9\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nDataServiceVersion: 1.0;\r\nETag: W/\"datetime'2021-09-14T21%3A24%3A21.2090682Z'\"\r\n\r\n\r\n--changesetresponse_36f34e13-3723-43d4-9382-82f745bd93b9\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nDataServiceVersion: 1.0;\r\nETag: W/\"datetime'2021-09-14T21%3A24%3A21.2090682Z'\"\r\n\r\n\r\n--changesetresponse_36f34e13-3723-43d4-9382-82f745bd93b9\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nDataServiceVersion: 1.0;\r\nETag: W/\"datetime'2021-09-14T21%3A24%3A21.2090682Z'\"\r\n\r\n\r\n--changesetresponse_36f34e13-3723-43d4-9382-82f745bd93b9--\r\n--batchresponse_d98ea607-0bda-41ca-aefa-91ae79742e7c--\r\n", [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'multipart/mixed; boundary=batchresponse_d98ea607-0bda-41ca-aefa-91ae79742e7c',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6ced3279-0002-0039-32ae-a9c11b000000',
  'x-ms-client-request-id',
  'ec5e3ca0-47eb-44c8-8828-0a54b1ae842e',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 14 Sep 2021 21:24:20 GMT'
]);

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .get('/batchTableTestSASConnectionStringnode()')
  .query(true)
  .reply(200, {"odata.metadata":"https://fakeaccount.table.core.windows.net/$metadata#batchTableTestSASConnectionStringnode","value":[{"odata.etag":"W/\"datetime'2021-09-14T21%3A24%3A21.2090682Z'\"","PartitionKey":"batchTest","RowKey":"1","Timestamp":"2021-09-14T21:24:21.2090682Z","name":"updated"},{"odata.etag":"W/\"datetime'2021-09-14T21%3A24%3A21.2090682Z'\"","PartitionKey":"batchTest","RowKey":"2","Timestamp":"2021-09-14T21:24:21.2090682Z","name":"updated"},{"odata.etag":"W/\"datetime'2021-09-14T21%3A24%3A21.2090682Z'\"","PartitionKey":"batchTest","RowKey":"3","Timestamp":"2021-09-14T21:24:21.2090682Z","name":"updated"}]}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6ced328f-0002-0039-47ae-a9c11b000000',
  'x-ms-client-request-id',
  '95a5220a-b6ac-4674-bca7-78f16567bc9e',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,X-Content-Type-Options,Cache-Control,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 14 Sep 2021 21:24:20 GMT'
]);
