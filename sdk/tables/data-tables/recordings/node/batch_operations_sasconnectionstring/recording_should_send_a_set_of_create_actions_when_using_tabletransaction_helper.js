let nock = require('nock');

module.exports.hash = "7fe804a6bdf9f14679c93ca16293cd63";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/Tables', {"TableName":"batchTableTestSASConnectionStringnode"})
  .query(true)
  .reply(201, {"odata.metadata":"https://fakeaccount.table.core.windows.net/$metadata#Tables/@Element","TableName":"batchTableTestSASConnectionStringnode"}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Location',
  "https://fakeaccount.table.core.windows.net/Tables('batchTableTestSASConnectionStringnode')",
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5af806c7-c002-000d-1fdf-c16eb3000000',
  'x-ms-client-request-id',
  'cf6c8ad4-5ebb-4492-abed-854828fabc5b',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 15 Oct 2021 16:13:22 GMT'
]);

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/$batch', "--batch_fakeId\r\ncontent-type: multipart/mixed; boundary=changeset_fakeId\r\n\r\n\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPOST https://fakeaccount.table.core.windows.net/batchTableTestSASConnectionStringnode HTTP/1.1\r\ncontent-type: application/json;odata=nometadata\r\naccept: application/json;odata=minimalmetadata\r\ndataserviceversion: 3.0\r\nprefer: return-no-content\r\n\r\n\r\n{\"PartitionKey\":\"helper\",\"RowKey\":\"1\",\"value\":\"t1\"}\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPOST https://fakeaccount.table.core.windows.net/batchTableTestSASConnectionStringnode HTTP/1.1\r\ncontent-type: application/json;odata=nometadata\r\naccept: application/json;odata=minimalmetadata\r\ndataserviceversion: 3.0\r\nprefer: return-no-content\r\n\r\n\r\n{\"PartitionKey\":\"helper\",\"RowKey\":\"2\",\"value\":\"t2\"}\r\n--changeset_fakeId--\r\n--batch_fakeId--\r\n")
  .query(true)
  .reply(202, "--batchresponse_20c0ab58-7afd-464b-b896-bec98e265bb9\r\nContent-Type: multipart/mixed; boundary=changesetresponse_8059702b-3bb1-4437-94ca-fb8c6ea190e5\r\n\r\n--changesetresponse_8059702b-3bb1-4437-94ca-fb8c6ea190e5\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nPreference-Applied: return-no-content\r\nDataServiceVersion: 3.0;\r\nLocation: https://fakeaccount.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='helper',RowKey='1')\r\nDataServiceId: https://fakeaccount.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='helper',RowKey='1')\r\nETag: W/\"datetime'2021-10-15T16%3A13%3A23.39995Z'\"\r\n\r\n\r\n--changesetresponse_8059702b-3bb1-4437-94ca-fb8c6ea190e5\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nPreference-Applied: return-no-content\r\nDataServiceVersion: 3.0;\r\nLocation: https://fakeaccount.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='helper',RowKey='2')\r\nDataServiceId: https://fakeaccount.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='helper',RowKey='2')\r\nETag: W/\"datetime'2021-10-15T16%3A13%3A23.39995Z'\"\r\n\r\n\r\n--changesetresponse_8059702b-3bb1-4437-94ca-fb8c6ea190e5--\r\n--batchresponse_20c0ab58-7afd-464b-b896-bec98e265bb9--\r\n", [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'multipart/mixed; boundary=batchresponse_20c0ab58-7afd-464b-b896-bec98e265bb9',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5af806f8-c002-000d-4edf-c16eb3000000',
  'x-ms-client-request-id',
  '167f08dd-311a-46e2-8711-886c1315ce87',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 15 Oct 2021 16:13:23 GMT'
]);
