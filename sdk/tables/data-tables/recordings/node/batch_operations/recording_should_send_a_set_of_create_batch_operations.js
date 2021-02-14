let nock = require('nock');

module.exports.hash = "8e93e5c16ed2b7396217f6886cbee21f";

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
  'c7f9d210-2002-0011-2711-999ee2000000',
  'x-ms-client-request-id',
  '2cfaabb3-f916-494b-9ace-54c23f11bafa',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 02 Oct 2020 23:12:21 GMT'
]);

nock('https://fakestorageaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/$batch', "--batch_fakeId\r\ncontent-type: multipart/mixed; boundary=changeset_fakeId\r\n\r\n\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPOST https://fakestorageaccount.table.core.windows.net/batchTableTestnode HTTP/1.1\r\nContent-Type: application/json;odata=nometadata\r\nDataServiceVersion: 3.0\r\nAccept: application/json;odata=minimalmetadata\r\nPrefer: return-no-content\r\n\r\n{\"PartitionKey\":\"batchTest\",\"RowKey\":\"1\",\"name\":\"first\"}\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPOST https://fakestorageaccount.table.core.windows.net/batchTableTestnode HTTP/1.1\r\nContent-Type: application/json;odata=nometadata\r\nDataServiceVersion: 3.0\r\nAccept: application/json;odata=minimalmetadata\r\nPrefer: return-no-content\r\n\r\n{\"PartitionKey\":\"batchTest\",\"RowKey\":\"2\",\"name\":\"second\"}\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPOST https://fakestorageaccount.table.core.windows.net/batchTableTestnode HTTP/1.1\r\nContent-Type: application/json;odata=nometadata\r\nDataServiceVersion: 3.0\r\nAccept: application/json;odata=minimalmetadata\r\nPrefer: return-no-content\r\n\r\n{\"PartitionKey\":\"batchTest\",\"RowKey\":\"3\",\"name\":\"third\"}\r\n--changeset_fakeId--\r\n--batch_fakeId\r\n")
  .query(true)
  .reply(202, "--batchresponse_cc03b4d3-f290-45da-8205-59c4489dbffe\r\nContent-Type: multipart/mixed; boundary=changesetresponse_39e50adf-df4a-42a3-ab13-c31ab52baa8a\r\n\r\n--changesetresponse_39e50adf-df4a-42a3-ab13-c31ab52baa8a\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nPreference-Applied: return-no-content\r\nDataServiceVersion: 3.0;\r\nLocation: https://fakestorageaccount.table.core.windows.net/batchTableTestnode(PartitionKey='batchTest',RowKey='1')\r\nDataServiceId: https://fakestorageaccount.table.core.windows.net/batchTableTestnode(PartitionKey='batchTest',RowKey='1')\r\nETag: W/\"datetime'2020-10-02T23%3A12%3A22.4833905Z'\"\r\n\r\n\r\n--changesetresponse_39e50adf-df4a-42a3-ab13-c31ab52baa8a\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nPreference-Applied: return-no-content\r\nDataServiceVersion: 3.0;\r\nLocation: https://fakestorageaccount.table.core.windows.net/batchTableTestnode(PartitionKey='batchTest',RowKey='2')\r\nDataServiceId: https://fakestorageaccount.table.core.windows.net/batchTableTestnode(PartitionKey='batchTest',RowKey='2')\r\nETag: W/\"datetime'2020-10-02T23%3A12%3A22.4833905Z'\"\r\n\r\n\r\n--changesetresponse_39e50adf-df4a-42a3-ab13-c31ab52baa8a\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nPreference-Applied: return-no-content\r\nDataServiceVersion: 3.0;\r\nLocation: https://fakestorageaccount.table.core.windows.net/batchTableTestnode(PartitionKey='batchTest',RowKey='3')\r\nDataServiceId: https://fakestorageaccount.table.core.windows.net/batchTableTestnode(PartitionKey='batchTest',RowKey='3')\r\nETag: W/\"datetime'2020-10-02T23%3A12%3A22.4833905Z'\"\r\n\r\n\r\n--changesetresponse_39e50adf-df4a-42a3-ab13-c31ab52baa8a--\r\n--batchresponse_cc03b4d3-f290-45da-8205-59c4489dbffe--\r\n", [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'multipart/mixed; boundary=batchresponse_cc03b4d3-f290-45da-8205-59c4489dbffe',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '53ed73fd-a002-000b-1611-99b18d000000',
  'x-ms-client-request-id',
  '150554fc-986f-46d1-a9a7-1f6eaf951de9',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 02 Oct 2020 23:12:22 GMT'
]);
