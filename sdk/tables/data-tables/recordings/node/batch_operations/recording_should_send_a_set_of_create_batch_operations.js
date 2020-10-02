let nock = require('nock');

module.exports.hash = "1932303fd7f92e72e01c01705622bbfb";

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
  '6b22ff13-c002-0010-7076-989f1f000000',
  'x-ms-client-request-id',
  '7209b8a6-40c9-47f7-a9e3-d693a115dfa9',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 02 Oct 2020 04:44:43 GMT'
]);

nock('https://fakestorageaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/$batch', "--batch_mockBatchId\r\ncontent-type: multipart/mixed; boundary=changeset_mockChangesetId\r\n\r\n\r\n--changeset_mockChangesetId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPOST https://fakestorageaccount.table.core.windows.net/batchTableTestnode HTTP/1.1\r\nContent-Type: application/json;odata=nometadata\r\nDataServiceVersion: 3.0\r\nAccept: application/json;odata=minimalmetadata\r\nPrefer: return-no-content\r\n\r\n{\"PartitionKey\":\"batchTest\",\"RowKey\":\"1\",\"name\":\"first\"}\r\n--changeset_mockChangesetId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPOST https://fakestorageaccount.table.core.windows.net/batchTableTestnode HTTP/1.1\r\nContent-Type: application/json;odata=nometadata\r\nDataServiceVersion: 3.0\r\nAccept: application/json;odata=minimalmetadata\r\nPrefer: return-no-content\r\n\r\n{\"PartitionKey\":\"batchTest\",\"RowKey\":\"2\",\"name\":\"second\"}\r\n--changeset_mockChangesetId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPOST https://fakestorageaccount.table.core.windows.net/batchTableTestnode HTTP/1.1\r\nContent-Type: application/json;odata=nometadata\r\nDataServiceVersion: 3.0\r\nAccept: application/json;odata=minimalmetadata\r\nPrefer: return-no-content\r\n\r\n{\"PartitionKey\":\"batchTest\",\"RowKey\":\"3\",\"name\":\"third\"}\r\n--changeset_mockChangesetId--\r\n--batch_mockBatchId\r\n")
  .query(true)
  .reply(202, "--batchresponse_b6ca00f3-8d33-4969-a884-718e5676eb3a\r\nContent-Type: multipart/mixed; boundary=changesetresponse_19c742dc-5a3f-4624-9b7d-a475dffea13e\r\n\r\n--changesetresponse_19c742dc-5a3f-4624-9b7d-a475dffea13e\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nPreference-Applied: return-no-content\r\nDataServiceVersion: 3.0;\r\nLocation: https://fakestorageaccount.table.core.windows.net/batchTableTestnode(PartitionKey='batchTest',RowKey='1')\r\nDataServiceId: https://fakestorageaccount.table.core.windows.net/batchTableTestnode(PartitionKey='batchTest',RowKey='1')\r\nETag: W/\"datetime'2020-10-02T04%3A44%3A43.3349118Z'\"\r\n\r\n\r\n--changesetresponse_19c742dc-5a3f-4624-9b7d-a475dffea13e\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nPreference-Applied: return-no-content\r\nDataServiceVersion: 3.0;\r\nLocation: https://fakestorageaccount.table.core.windows.net/batchTableTestnode(PartitionKey='batchTest',RowKey='2')\r\nDataServiceId: https://fakestorageaccount.table.core.windows.net/batchTableTestnode(PartitionKey='batchTest',RowKey='2')\r\nETag: W/\"datetime'2020-10-02T04%3A44%3A43.3349118Z'\"\r\n\r\n\r\n--changesetresponse_19c742dc-5a3f-4624-9b7d-a475dffea13e\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nPreference-Applied: return-no-content\r\nDataServiceVersion: 3.0;\r\nLocation: https://fakestorageaccount.table.core.windows.net/batchTableTestnode(PartitionKey='batchTest',RowKey='3')\r\nDataServiceId: https://fakestorageaccount.table.core.windows.net/batchTableTestnode(PartitionKey='batchTest',RowKey='3')\r\nETag: W/\"datetime'2020-10-02T04%3A44%3A43.3349118Z'\"\r\n\r\n\r\n--changesetresponse_19c742dc-5a3f-4624-9b7d-a475dffea13e--\r\n--batchresponse_b6ca00f3-8d33-4969-a884-718e5676eb3a--\r\n", [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'multipart/mixed; boundary=batchresponse_b6ca00f3-8d33-4969-a884-718e5676eb3a',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '420193fe-3002-002c-5476-982bc4000000',
  'x-ms-client-request-id',
  '49014467-2683-4b6a-bb33-ee80502ff0ef',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 02 Oct 2020 04:44:42 GMT'
]);
