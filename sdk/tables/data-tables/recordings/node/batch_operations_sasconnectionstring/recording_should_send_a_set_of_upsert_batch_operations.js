let nock = require('nock');

module.exports.hash = "11d1d7464f0791a574f683efa04b7a31";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://joheredistorage2.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/Tables', {"TableName":"batchTableTestSASConnectionStringnode"})
  .query(true)
  .reply(409, {"odata.error":{"code":"TableAlreadyExists","message":{"lang":"en-US","value":"The table specified already exists.\nRequestId:2c0d8598-7002-00b5-45cd-5c8c40000000\nTime:2021-06-09T01:17:13.2530877Z"}}}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2c0d8598-7002-00b5-45cd-5c8c40000000',
  'x-ms-client-request-id',
  '930c11cb-458c-489c-bd93-4c609a767aa5',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 09 Jun 2021 01:17:12 GMT'
]);

nock('https://joheredistorage2.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/$batch', "--batch_fakeId\r\ncontent-type: multipart/mixed; boundary=changeset_fakeId\r\n\r\n\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPUT https://joheredistorage2.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='batchTest',RowKey='1') HTTP/1.1\r\ncontent-type: application/json\r\ndataserviceversion: 3.0\r\naccept: application/json\r\n\r\n\r\n{\"PartitionKey\":\"batchTest\",\"RowKey\":\"1\",\"name\":\"upserted\"}\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPUT https://joheredistorage2.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='batchTest',RowKey='2') HTTP/1.1\r\ncontent-type: application/json\r\ndataserviceversion: 3.0\r\naccept: application/json\r\n\r\n\r\n{\"PartitionKey\":\"batchTest\",\"RowKey\":\"2\",\"name\":\"upserted\"}\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPUT https://joheredistorage2.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='batchTest',RowKey='3') HTTP/1.1\r\ncontent-type: application/json\r\ndataserviceversion: 3.0\r\naccept: application/json\r\n\r\n\r\n{\"PartitionKey\":\"batchTest\",\"RowKey\":\"3\",\"name\":\"upserted\"}\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPUT https://joheredistorage2.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='batchTest',RowKey='4') HTTP/1.1\r\ncontent-type: application/json\r\ndataserviceversion: 3.0\r\naccept: application/json\r\n\r\n\r\n{\"PartitionKey\":\"batchTest\",\"RowKey\":\"4\",\"name\":\"upserted\"}\r\n--changeset_fakeId--\r\n--batch_fakeId--\r\n")
  .query(true)
  .reply(202, "--batchresponse_d44f8613-5651-46d8-bc46-dcd1046908c1\r\nContent-Type: multipart/mixed; boundary=changesetresponse_2660d9bb-02a8-425c-8b8d-6bebb641ee49\r\n\r\n--changesetresponse_2660d9bb-02a8-425c-8b8d-6bebb641ee49\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nDataServiceVersion: 1.0;\r\nETag: W/\"datetime'2021-06-09T01%3A17%3A13.2924321Z'\"\r\n\r\n\r\n--changesetresponse_2660d9bb-02a8-425c-8b8d-6bebb641ee49\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nDataServiceVersion: 1.0;\r\nETag: W/\"datetime'2021-06-09T01%3A17%3A13.2924321Z'\"\r\n\r\n\r\n--changesetresponse_2660d9bb-02a8-425c-8b8d-6bebb641ee49\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nDataServiceVersion: 1.0;\r\nETag: W/\"datetime'2021-06-09T01%3A17%3A13.2924321Z'\"\r\n\r\n\r\n--changesetresponse_2660d9bb-02a8-425c-8b8d-6bebb641ee49\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nDataServiceVersion: 1.0;\r\nETag: W/\"datetime'2021-06-09T01%3A17%3A13.2934337Z'\"\r\n\r\n\r\n--changesetresponse_2660d9bb-02a8-425c-8b8d-6bebb641ee49--\r\n--batchresponse_d44f8613-5651-46d8-bc46-dcd1046908c1--\r\n", [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'multipart/mixed; boundary=batchresponse_d44f8613-5651-46d8-bc46-dcd1046908c1',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2c0d85b5-7002-00b5-5ecd-5c8c40000000',
  'x-ms-client-request-id',
  'a56e1930-2c33-4b4e-b581-4a3e1bbd673e',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 09 Jun 2021 01:17:13 GMT'
]);

nock('https://joheredistorage2.table.core.windows.net:443', {"encodedQueryParams":true})
  .get('/batchTableTestSASConnectionStringnode()')
  .query(true)
  .reply(200, {"odata.metadata":"https://joheredistorage2.table.core.windows.net/$metadata#batchTableTestSASConnectionStringnode","value":[{"odata.etag":"W/\"datetime'2021-06-09T01%3A17%3A13.2924321Z'\"","PartitionKey":"batchTest","RowKey":"1","Timestamp":"2021-06-09T01:17:13.2924321Z","name":"upserted"},{"odata.etag":"W/\"datetime'2021-06-09T01%3A17%3A13.2924321Z'\"","PartitionKey":"batchTest","RowKey":"2","Timestamp":"2021-06-09T01:17:13.2924321Z","name":"upserted"},{"odata.etag":"W/\"datetime'2021-06-09T01%3A17%3A13.2924321Z'\"","PartitionKey":"batchTest","RowKey":"3","Timestamp":"2021-06-09T01:17:13.2924321Z","name":"upserted"},{"odata.etag":"W/\"datetime'2021-06-09T01%3A17%3A13.2934337Z'\"","PartitionKey":"batchTest","RowKey":"4","Timestamp":"2021-06-09T01:17:13.2934337Z","name":"upserted"}]}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2c0d85c4-7002-00b5-6bcd-5c8c40000000',
  'x-ms-client-request-id',
  'c883d095-66be-4697-b1e0-b7844962a8fe',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,X-Content-Type-Options,Cache-Control,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 09 Jun 2021 01:17:13 GMT'
]);
