let nock = require('nock');

module.exports.hash = "66ef399cdf4441f8f0dd3573b6306e76";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://fakestorageaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/$batch', "--batch_mockBatchId\r\ncontent-type: multipart/mixed; boundary=changeset_mockChangesetId\r\n\r\n\r\n--changeset_mockChangesetId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nDELETE https://fakestorageaccount.table.core.windows.net/tableClientTestnode(PartitionKey='batchTest',RowKey='1') HTTP/1.1\r\nContent-Type: application/json; charset=utf-8\r\nAccept: application/json;odata=minimalmetadata\r\nDataServiceVersion: 3.0\r\nIf-Match: *\r\n\r\nundefined\r\n--changeset_mockChangesetId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nDELETE https://fakestorageaccount.table.core.windows.net/tableClientTestnode(PartitionKey='batchTest',RowKey='2') HTTP/1.1\r\nContent-Type: application/json; charset=utf-8\r\nAccept: application/json;odata=minimalmetadata\r\nDataServiceVersion: 3.0\r\nIf-Match: *\r\n\r\nundefined\r\n--changeset_mockChangesetId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nDELETE https://fakestorageaccount.table.core.windows.net/tableClientTestnode(PartitionKey='batchTest',RowKey='3') HTTP/1.1\r\nContent-Type: application/json; charset=utf-8\r\nAccept: application/json;odata=minimalmetadata\r\nDataServiceVersion: 3.0\r\nIf-Match: *\r\n\r\nundefined\r\n--changeset_mockChangesetId--\r\n--batch_mockBatchId\r\n")
  .query(true)
  .reply(202, "--batchresponse_5e1fe29a-f9ff-46e3-aa45-846325d881f9\r\nContent-Type: multipart/mixed; boundary=changesetresponse_dffb316e-10d5-436a-959a-b47c978ff8d4\r\n\r\n--changesetresponse_dffb316e-10d5-436a-959a-b47c978ff8d4\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nDataServiceVersion: 1.0;\r\n\r\n\r\n--changesetresponse_dffb316e-10d5-436a-959a-b47c978ff8d4\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nDataServiceVersion: 1.0;\r\n\r\n\r\n--changesetresponse_dffb316e-10d5-436a-959a-b47c978ff8d4\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nDataServiceVersion: 1.0;\r\n\r\n\r\n--changesetresponse_dffb316e-10d5-436a-959a-b47c978ff8d4--\r\n--batchresponse_5e1fe29a-f9ff-46e3-aa45-846325d881f9--\r\n", [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'multipart/mixed; boundary=batchresponse_5e1fe29a-f9ff-46e3-aa45-846325d881f9',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a265b971-5002-001e-5268-987314000000',
  'x-ms-client-request-id',
  '3b616b0f-041d-4bda-829b-e94ef7536da6',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 02 Oct 2020 02:59:56 GMT',
  'Connection',
  'close'
]);
