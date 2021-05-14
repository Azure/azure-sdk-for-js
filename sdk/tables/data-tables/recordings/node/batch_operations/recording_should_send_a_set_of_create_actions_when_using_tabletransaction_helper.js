let nock = require('nock');

module.exports.hash = "d220744cab2f052f56e8618a70c7277d";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://fakestorageaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/Tables', {"TableName":"batchTableTestnode"})
  .query(true)
  .reply(201, {"odata.metadata":"https://fakestorageaccount.table.core.windows.net/$metadata#Tables/@Element","TableName":"batchTableTestnode"}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Location',
  "https://fakestorageaccount.table.core.windows.net/Tables('batchTableTestnode')",
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '51900b50-7002-0046-616c-47776f000000',
  'x-ms-client-request-id',
  'f3912c84-28ae-4eb3-b8cb-0a2a4ab4d1f8',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 20:22:00 GMT'
]);

nock('https://fakestorageaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/$batch', "--batch_fakeId\r\ncontent-type: multipart/mixed; boundary=changeset_fakeId\r\n\r\n\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPOST https://fakestorageaccount.table.core.windows.net/batchTableTestnode HTTP/1.1\r\ncontent-type: application/json;odata=nometadata\r\naccept: application/json;odata=minimalmetadata\r\ndataserviceversion: 3.0\r\nprefer: return-no-content\r\n\r\n\r\n{\"PartitionKey\":\"helper\",\"RowKey\":\"1\",\"value\":\"t1\"}\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPOST https://fakestorageaccount.table.core.windows.net/batchTableTestnode HTTP/1.1\r\ncontent-type: application/json;odata=nometadata\r\naccept: application/json;odata=minimalmetadata\r\ndataserviceversion: 3.0\r\nprefer: return-no-content\r\n\r\n\r\n{\"PartitionKey\":\"helper\",\"RowKey\":\"2\",\"value\":\"t2\"}\r\n--changeset_fakeId--\r\n--batch_fakeId\r\n")
  .query(true)
  .reply(202, "--batchresponse_50b7b03b-a9b3-4d2f-a59b-a28e88363e50\r\nContent-Type: multipart/mixed; boundary=changesetresponse_6a29ba66-a12d-4feb-b4f1-ba591dd3fa72\r\n\r\n--changesetresponse_6a29ba66-a12d-4feb-b4f1-ba591dd3fa72\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nPreference-Applied: return-no-content\r\nDataServiceVersion: 3.0;\r\nLocation: https://fakestorageaccount.table.core.windows.net/batchTableTestnode(PartitionKey='helper',RowKey='1')\r\nDataServiceId: https://fakestorageaccount.table.core.windows.net/batchTableTestnode(PartitionKey='helper',RowKey='1')\r\nETag: W/\"datetime'2021-05-12T20%3A22%3A00.9442384Z'\"\r\n\r\n\r\n--changesetresponse_6a29ba66-a12d-4feb-b4f1-ba591dd3fa72\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nPreference-Applied: return-no-content\r\nDataServiceVersion: 3.0;\r\nLocation: https://fakestorageaccount.table.core.windows.net/batchTableTestnode(PartitionKey='helper',RowKey='2')\r\nDataServiceId: https://fakestorageaccount.table.core.windows.net/batchTableTestnode(PartitionKey='helper',RowKey='2')\r\nETag: W/\"datetime'2021-05-12T20%3A22%3A00.9442384Z'\"\r\n\r\n\r\n--changesetresponse_6a29ba66-a12d-4feb-b4f1-ba591dd3fa72--\r\n--batchresponse_50b7b03b-a9b3-4d2f-a59b-a28e88363e50--\r\n", [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'multipart/mixed; boundary=batchresponse_50b7b03b-a9b3-4d2f-a59b-a28e88363e50',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '51900b75-7002-0046-016c-47776f000000',
  'x-ms-client-request-id',
  '90e195c8-60a4-49d1-bb4c-7e3b00dc71f5',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 20:22:00 GMT'
]);
