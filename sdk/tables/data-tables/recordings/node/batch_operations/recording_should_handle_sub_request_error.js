let nock = require('nock');

module.exports.hash = "efabed6507d7b7683d890e6343a3a3bc";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://fakestorageaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/Tables', {"TableName":"batchTableTestnode"})
  .query(true)
  .reply(409, {"odata.error":{"code":"TableAlreadyExists","message":{"lang":"en-US","value":"The table specified already exists.\nRequestId:a1f0788a-b002-0072-5276-98d8c7000000\nTime:2020-10-02T04:44:43.9542700Z"}}}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a1f0788a-b002-0072-5276-98d8c7000000',
  'x-ms-client-request-id',
  '067b5d73-ea5f-4960-8a25-d91c31a8bab6',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 02 Oct 2020 04:44:43 GMT'
]);

nock('https://fakestorageaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/$batch', "--batch_mockBatchId\r\ncontent-type: multipart/mixed; boundary=changeset_mockChangesetId\r\n\r\n\r\n--changeset_mockChangesetId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPOST https://fakestorageaccount.table.core.windows.net/noExistingTable HTTP/1.1\r\nContent-Type: application/json;odata=nometadata\r\nDataServiceVersion: 3.0\r\nAccept: application/json;odata=minimalmetadata\r\nPrefer: return-no-content\r\n\r\n{\"PartitionKey\":\"batchTest\",\"RowKey\":\"1\",\"name\":\"first\"}\r\n--changeset_mockChangesetId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPOST https://fakestorageaccount.table.core.windows.net/noExistingTable HTTP/1.1\r\nContent-Type: application/json;odata=nometadata\r\nDataServiceVersion: 3.0\r\nAccept: application/json;odata=minimalmetadata\r\nPrefer: return-no-content\r\n\r\n{\"PartitionKey\":\"batchTest\",\"RowKey\":\"2\",\"name\":\"second\"}\r\n--changeset_mockChangesetId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPOST https://fakestorageaccount.table.core.windows.net/noExistingTable HTTP/1.1\r\nContent-Type: application/json;odata=nometadata\r\nDataServiceVersion: 3.0\r\nAccept: application/json;odata=minimalmetadata\r\nPrefer: return-no-content\r\n\r\n{\"PartitionKey\":\"batchTest\",\"RowKey\":\"3\",\"name\":\"third\"}\r\n--changeset_mockChangesetId--\r\n--batch_mockBatchId\r\n")
  .query(true)
  .reply(202, "--batchresponse_78d1f87d-f77f-4c3d-ba0e-e84f1627fd44\r\nContent-Type: multipart/mixed; boundary=changesetresponse_77edc21f-2b59-4d25-8dc0-7427c7a25e40\r\n\r\n--changesetresponse_77edc21f-2b59-4d25-8dc0-7427c7a25e40\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 404 Not Found\r\nX-Content-Type-Options: nosniff\r\nDataServiceVersion: 3.0;\r\nContent-Type: application/json;odata=minimalmetadata;streaming=true;charset=utf-8\r\n\r\n{\"odata.error\":{\"code\":\"TableNotFound\",\"message\":{\"lang\":\"en-US\",\"value\":\"0:The table specified does not exist.\\nRequestId:678247da-6002-003f-5376-981e25000000\\nTime:2020-10-02T04:44:44.0585931Z\"}}}\r\n--changesetresponse_77edc21f-2b59-4d25-8dc0-7427c7a25e40--\r\n--batchresponse_78d1f87d-f77f-4c3d-ba0e-e84f1627fd44--\r\n", [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'multipart/mixed; boundary=batchresponse_78d1f87d-f77f-4c3d-ba0e-e84f1627fd44',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '678247da-6002-003f-5376-981e25000000',
  'x-ms-client-request-id',
  'a18f18a1-1c74-44c5-b3eb-eb4790cdacd9',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 02 Oct 2020 04:44:43 GMT'
]);
