let nock = require('nock');

module.exports.hash = "85fbe000f3551220a1f100ccbc8f255f";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://fakestorageaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/$batch', "--batch_mockBatchId\r\ncontent-type: multipart/mixed; boundary=changeset_mockChangesetId\r\n\r\n\r\n--changeset_mockChangesetId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPOST https://fakestorageaccount.table.core.windows.net/tableClientTestnode HTTP/1.1\r\nContent-Type: application/json;odata=nometadata\r\nDataServiceVersion: 3.0\r\nAccept: application/json;odata=minimalmetadata\r\nPrefer: return-no-content\r\n\r\n{\"PartitionKey\":\"batchTest\",\"RowKey\":\"1\",\"name\":\"first\"}\r\n--changeset_mockChangesetId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPOST https://fakestorageaccount.table.core.windows.net/tableClientTestnode HTTP/1.1\r\nContent-Type: application/json;odata=nometadata\r\nDataServiceVersion: 3.0\r\nAccept: application/json;odata=minimalmetadata\r\nPrefer: return-no-content\r\n\r\n{\"PartitionKey\":\"batchTest\",\"RowKey\":\"2\",\"name\":\"second\"}\r\n--changeset_mockChangesetId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPOST https://fakestorageaccount.table.core.windows.net/tableClientTestnode HTTP/1.1\r\nContent-Type: application/json;odata=nometadata\r\nDataServiceVersion: 3.0\r\nAccept: application/json;odata=minimalmetadata\r\nPrefer: return-no-content\r\n\r\n{\"PartitionKey\":\"batchTest\",\"RowKey\":\"3\",\"name\":\"third\"}\r\n--changeset_mockChangesetId--\r\n--batch_mockBatchId\r\n")
  .query(true)
  .reply(202, "--batchresponse_9c4e2d61-bbd2-49ed-b27b-e4ec060a84f8\r\nContent-Type: multipart/mixed; boundary=changesetresponse_bc0b7efe-fbb9-4639-a771-9e0a8ba556ad\r\n\r\n--changesetresponse_bc0b7efe-fbb9-4639-a771-9e0a8ba556ad\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nPreference-Applied: return-no-content\r\nDataServiceVersion: 3.0;\r\nLocation: https://fakestorageaccount.table.core.windows.net/tableClientTestnode(PartitionKey='batchTest',RowKey='1')\r\nDataServiceId: https://fakestorageaccount.table.core.windows.net/tableClientTestnode(PartitionKey='batchTest',RowKey='1')\r\nETag: W/\"datetime'2020-10-02T02%3A59%3A56.6592278Z'\"\r\n\r\n\r\n--changesetresponse_bc0b7efe-fbb9-4639-a771-9e0a8ba556ad\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nPreference-Applied: return-no-content\r\nDataServiceVersion: 3.0;\r\nLocation: https://fakestorageaccount.table.core.windows.net/tableClientTestnode(PartitionKey='batchTest',RowKey='2')\r\nDataServiceId: https://fakestorageaccount.table.core.windows.net/tableClientTestnode(PartitionKey='batchTest',RowKey='2')\r\nETag: W/\"datetime'2020-10-02T02%3A59%3A56.6592278Z'\"\r\n\r\n\r\n--changesetresponse_bc0b7efe-fbb9-4639-a771-9e0a8ba556ad\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nPreference-Applied: return-no-content\r\nDataServiceVersion: 3.0;\r\nLocation: https://fakestorageaccount.table.core.windows.net/tableClientTestnode(PartitionKey='batchTest',RowKey='3')\r\nDataServiceId: https://fakestorageaccount.table.core.windows.net/tableClientTestnode(PartitionKey='batchTest',RowKey='3')\r\nETag: W/\"datetime'2020-10-02T02%3A59%3A56.6592278Z'\"\r\n\r\n\r\n--changesetresponse_bc0b7efe-fbb9-4639-a771-9e0a8ba556ad--\r\n--batchresponse_9c4e2d61-bbd2-49ed-b27b-e4ec060a84f8--\r\n", [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'multipart/mixed; boundary=batchresponse_9c4e2d61-bbd2-49ed-b27b-e4ec060a84f8',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1f592a61-f002-0018-4068-98846c000000',
  'x-ms-client-request-id',
  '3d8d4a24-8c6a-42d8-b28e-fb3f0ef0fb52',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 02 Oct 2020 02:59:56 GMT',
  'Connection',
  'close'
]);
