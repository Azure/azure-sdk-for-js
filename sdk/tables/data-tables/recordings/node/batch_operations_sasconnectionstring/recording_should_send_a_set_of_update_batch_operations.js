let nock = require('nock');

module.exports.hash = "8bf5d6dfb6d1d0abe653df9b19c8b0cf";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://joheredistorage2.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/Tables', {"TableName":"batchTableTestSASConnectionStringnode"})
  .query(true)
  .reply(409, {"odata.error":{"code":"TableAlreadyExists","message":{"lang":"en-US","value":"The table specified already exists.\nRequestId:2c0d855e-7002-00b5-10cd-5c8c40000000\nTime:2021-06-09T01:17:13.1330020Z"}}}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2c0d855e-7002-00b5-10cd-5c8c40000000',
  'x-ms-client-request-id',
  'b178b46f-37d0-4689-88c6-2fdc073b8788',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 09 Jun 2021 01:17:12 GMT'
]);

nock('https://joheredistorage2.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/$batch', "--batch_fakeId\r\ncontent-type: multipart/mixed; boundary=changeset_fakeId\r\n\r\n\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPUT https://joheredistorage2.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='batchTest',RowKey='1') HTTP/1.1\r\ncontent-type: application/json\r\ndataserviceversion: 3.0\r\naccept: application/json\r\nif-match: *\r\n\r\n\r\n{\"PartitionKey\":\"batchTest\",\"RowKey\":\"1\",\"name\":\"updated\"}\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPUT https://joheredistorage2.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='batchTest',RowKey='2') HTTP/1.1\r\ncontent-type: application/json\r\ndataserviceversion: 3.0\r\naccept: application/json\r\nif-match: *\r\n\r\n\r\n{\"PartitionKey\":\"batchTest\",\"RowKey\":\"2\",\"name\":\"updated\"}\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPUT https://joheredistorage2.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='batchTest',RowKey='3') HTTP/1.1\r\ncontent-type: application/json\r\ndataserviceversion: 3.0\r\naccept: application/json\r\nif-match: *\r\n\r\n\r\n{\"PartitionKey\":\"batchTest\",\"RowKey\":\"3\",\"name\":\"updated\"}\r\n--changeset_fakeId--\r\n--batch_fakeId--\r\n")
  .query(true)
  .reply(202, "--batchresponse_64f857ae-7f4c-4298-91f5-130ab9a9c589\r\nContent-Type: multipart/mixed; boundary=changesetresponse_04089be3-7059-4efa-893c-4f0cfea9061c\r\n\r\n--changesetresponse_04089be3-7059-4efa-893c-4f0cfea9061c\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nDataServiceVersion: 1.0;\r\nETag: W/\"datetime'2021-06-09T01%3A17%3A13.1693448Z'\"\r\n\r\n\r\n--changesetresponse_04089be3-7059-4efa-893c-4f0cfea9061c\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nDataServiceVersion: 1.0;\r\nETag: W/\"datetime'2021-06-09T01%3A17%3A13.1703459Z'\"\r\n\r\n\r\n--changesetresponse_04089be3-7059-4efa-893c-4f0cfea9061c\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nDataServiceVersion: 1.0;\r\nETag: W/\"datetime'2021-06-09T01%3A17%3A13.1703459Z'\"\r\n\r\n\r\n--changesetresponse_04089be3-7059-4efa-893c-4f0cfea9061c--\r\n--batchresponse_64f857ae-7f4c-4298-91f5-130ab9a9c589--\r\n", [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'multipart/mixed; boundary=batchresponse_64f857ae-7f4c-4298-91f5-130ab9a9c589',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2c0d856f-7002-00b5-20cd-5c8c40000000',
  'x-ms-client-request-id',
  'c076a0b4-2936-4f0c-96c2-25f062b2b195',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 09 Jun 2021 01:17:12 GMT'
]);

nock('https://joheredistorage2.table.core.windows.net:443', {"encodedQueryParams":true})
  .get('/batchTableTestSASConnectionStringnode()')
  .query(true)
  .reply(200, {"odata.metadata":"https://joheredistorage2.table.core.windows.net/$metadata#batchTableTestSASConnectionStringnode","value":[{"odata.etag":"W/\"datetime'2021-06-09T01%3A17%3A13.1693448Z'\"","PartitionKey":"batchTest","RowKey":"1","Timestamp":"2021-06-09T01:17:13.1693448Z","name":"updated"},{"odata.etag":"W/\"datetime'2021-06-09T01%3A17%3A13.1703459Z'\"","PartitionKey":"batchTest","RowKey":"2","Timestamp":"2021-06-09T01:17:13.1703459Z","name":"updated"},{"odata.etag":"W/\"datetime'2021-06-09T01%3A17%3A13.1703459Z'\"","PartitionKey":"batchTest","RowKey":"3","Timestamp":"2021-06-09T01:17:13.1703459Z","name":"updated"}]}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2c0d858a-7002-00b5-38cd-5c8c40000000',
  'x-ms-client-request-id',
  '3dbdb3f9-8845-4c40-83b9-ba4fcd5b4211',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,X-Content-Type-Options,Cache-Control,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 09 Jun 2021 01:17:12 GMT'
]);
