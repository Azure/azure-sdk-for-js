let nock = require('nock');

module.exports.hash = "19faa959b3c40d8f8b5f217ad855c37e";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://fakestorageaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/Tables', {"TableName":"batchTableTestnode"})
  .query(true)
  .reply(409, {"odata.error":{"code":"TableAlreadyExists","message":{"lang":"en-US","value":"The table specified already exists.\nRequestId:a29189b4-8002-0053-7f76-98b5f6000000\nTime:2020-10-02T04:44:43.7153166Z"}}}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a29189b4-8002-0053-7f76-98b5f6000000',
  'x-ms-client-request-id',
  'a45e3e39-e3cb-4a7d-bd0c-77f2fa48cf71',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 02 Oct 2020 04:44:42 GMT'
]);

nock('https://fakestorageaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/$batch', "--batch_mockBatchId\r\ncontent-type: multipart/mixed; boundary=changeset_mockChangesetId\r\n\r\n\r\n--changeset_mockChangesetId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nDELETE https://fakestorageaccount.table.core.windows.net/batchTableTestnode(PartitionKey='batchTest',RowKey='1') HTTP/1.1\r\nContent-Type: application/json; charset=utf-8\r\nAccept: application/json;odata=minimalmetadata\r\nDataServiceVersion: 3.0\r\nIf-Match: *\r\n\r\nundefined\r\n--changeset_mockChangesetId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nDELETE https://fakestorageaccount.table.core.windows.net/batchTableTestnode(PartitionKey='batchTest',RowKey='2') HTTP/1.1\r\nContent-Type: application/json; charset=utf-8\r\nAccept: application/json;odata=minimalmetadata\r\nDataServiceVersion: 3.0\r\nIf-Match: *\r\n\r\nundefined\r\n--changeset_mockChangesetId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nDELETE https://fakestorageaccount.table.core.windows.net/batchTableTestnode(PartitionKey='batchTest',RowKey='3') HTTP/1.1\r\nContent-Type: application/json; charset=utf-8\r\nAccept: application/json;odata=minimalmetadata\r\nDataServiceVersion: 3.0\r\nIf-Match: *\r\n\r\nundefined\r\n--changeset_mockChangesetId--\r\n--batch_mockBatchId\r\n")
  .query(true)
  .reply(202, "--batchresponse_5b7783f2-9631-44d9-90d4-582740f22696\r\nContent-Type: multipart/mixed; boundary=changesetresponse_883ee6fc-afa7-41ea-a4b1-dd70c8ec8081\r\n\r\n--changesetresponse_883ee6fc-afa7-41ea-a4b1-dd70c8ec8081\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nDataServiceVersion: 1.0;\r\n\r\n\r\n--changesetresponse_883ee6fc-afa7-41ea-a4b1-dd70c8ec8081\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nDataServiceVersion: 1.0;\r\n\r\n\r\n--changesetresponse_883ee6fc-afa7-41ea-a4b1-dd70c8ec8081\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nDataServiceVersion: 1.0;\r\n\r\n\r\n--changesetresponse_883ee6fc-afa7-41ea-a4b1-dd70c8ec8081--\r\n--batchresponse_5b7783f2-9631-44d9-90d4-582740f22696--\r\n", [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'multipart/mixed; boundary=batchresponse_5b7783f2-9631-44d9-90d4-582740f22696',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e7212b3e-2002-0033-3e76-98f0d4000000',
  'x-ms-client-request-id',
  'aee57a68-341c-4d98-b064-3e124e71220d',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 02 Oct 2020 04:44:43 GMT'
]);
