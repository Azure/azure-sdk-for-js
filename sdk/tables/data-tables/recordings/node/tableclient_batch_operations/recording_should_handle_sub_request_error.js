let nock = require('nock');

module.exports.hash = "3fd14206f9c68e3bd4f5e7a9c97d5033";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://fakestorageaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/$batch', "--batch_mockBatchId\r\ncontent-type: multipart/mixed; boundary=changeset_mockChangesetId\r\n\r\n\r\n--changeset_mockChangesetId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPOST https://fakestorageaccount.table.core.windows.net/noExistingTable HTTP/1.1\r\nContent-Type: application/json;odata=nometadata\r\nDataServiceVersion: 3.0\r\nAccept: application/json;odata=minimalmetadata\r\nPrefer: return-no-content\r\n\r\n{\"PartitionKey\":\"batchTest\",\"RowKey\":\"1\",\"name\":\"first\"}\r\n--changeset_mockChangesetId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPOST https://fakestorageaccount.table.core.windows.net/noExistingTable HTTP/1.1\r\nContent-Type: application/json;odata=nometadata\r\nDataServiceVersion: 3.0\r\nAccept: application/json;odata=minimalmetadata\r\nPrefer: return-no-content\r\n\r\n{\"PartitionKey\":\"batchTest\",\"RowKey\":\"2\",\"name\":\"second\"}\r\n--changeset_mockChangesetId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPOST https://fakestorageaccount.table.core.windows.net/noExistingTable HTTP/1.1\r\nContent-Type: application/json;odata=nometadata\r\nDataServiceVersion: 3.0\r\nAccept: application/json;odata=minimalmetadata\r\nPrefer: return-no-content\r\n\r\n{\"PartitionKey\":\"batchTest\",\"RowKey\":\"3\",\"name\":\"third\"}\r\n--changeset_mockChangesetId--\r\n--batch_mockBatchId\r\n")
  .query(true)
  .reply(202, "--batchresponse_152b7348-6ccc-46b4-95b0-f1b3b54263f9\r\nContent-Type: multipart/mixed; boundary=changesetresponse_c98b4db1-408f-44e6-8e30-4be404d1a293\r\n\r\n--changesetresponse_c98b4db1-408f-44e6-8e30-4be404d1a293\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 404 Not Found\r\nX-Content-Type-Options: nosniff\r\nDataServiceVersion: 3.0;\r\nContent-Type: application/json;odata=minimalmetadata;streaming=true;charset=utf-8\r\n\r\n{\"odata.error\":{\"code\":\"TableNotFound\",\"message\":{\"lang\":\"en-US\",\"value\":\"0:The table specified does not exist.\\nRequestId:e66fec74-9002-0047-2a68-987692000000\\nTime:2020-10-02T02:59:57.1695648Z\"}}}\r\n--changesetresponse_c98b4db1-408f-44e6-8e30-4be404d1a293--\r\n--batchresponse_152b7348-6ccc-46b4-95b0-f1b3b54263f9--\r\n", [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'multipart/mixed; boundary=batchresponse_152b7348-6ccc-46b4-95b0-f1b3b54263f9',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e66fec74-9002-0047-2a68-987692000000',
  'x-ms-client-request-id',
  'a1f4afba-7b50-475b-8e13-1f530ecf2109',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 02 Oct 2020 02:59:56 GMT',
  'Connection',
  'close'
]);
