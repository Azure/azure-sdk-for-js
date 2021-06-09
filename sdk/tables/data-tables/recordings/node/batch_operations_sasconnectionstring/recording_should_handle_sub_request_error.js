let nock = require('nock');

module.exports.hash = "96b7aa7277e4dfb35e0a81fee76ed9e0";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://joheredistorage2.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/Tables', {"TableName":"batchTableTestSASConnectionStringnode"})
  .query(true)
  .reply(409, {"odata.error":{"code":"TableAlreadyExists","message":{"lang":"en-US","value":"The table specified already exists.\nRequestId:2c0d8604-7002-00b5-26cd-5c8c40000000\nTime:2021-06-09T01:17:13.5212803Z"}}}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2c0d8604-7002-00b5-26cd-5c8c40000000',
  'x-ms-client-request-id',
  'c1a81443-6e4f-4710-a54c-7460a0d5f32a',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 09 Jun 2021 01:17:13 GMT'
]);

nock('https://joheredistorage2.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/$batch', "--batch_fakeId\r\ncontent-type: multipart/mixed; boundary=changeset_fakeId\r\n\r\n\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPOST https://joheredistorage2.table.core.windows.net/noExistingTable HTTP/1.1\r\ncontent-type: application/json;odata=nometadata\r\naccept: application/json;odata=minimalmetadata\r\ndataserviceversion: 3.0\r\nprefer: return-no-content\r\n\r\n\r\n{\"PartitionKey\":\"batchTest\",\"RowKey\":\"1\",\"name\":\"first\"}\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPOST https://joheredistorage2.table.core.windows.net/noExistingTable HTTP/1.1\r\ncontent-type: application/json;odata=nometadata\r\naccept: application/json;odata=minimalmetadata\r\ndataserviceversion: 3.0\r\nprefer: return-no-content\r\n\r\n\r\n{\"PartitionKey\":\"batchTest\",\"RowKey\":\"2\",\"name\":\"second\"}\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPOST https://joheredistorage2.table.core.windows.net/noExistingTable HTTP/1.1\r\ncontent-type: application/json;odata=nometadata\r\naccept: application/json;odata=minimalmetadata\r\ndataserviceversion: 3.0\r\nprefer: return-no-content\r\n\r\n\r\n{\"PartitionKey\":\"batchTest\",\"RowKey\":\"3\",\"name\":\"third\"}\r\n--changeset_fakeId--\r\n--batch_fakeId--\r\n")
  .query(true)
  .reply(202, "--batchresponse_1690ba47-3476-4cdb-9979-e889ef351a01\r\nContent-Type: multipart/mixed; boundary=changesetresponse_63ff3d7c-c0ab-48af-9629-2a995cce5a78\r\n\r\n--changesetresponse_63ff3d7c-c0ab-48af-9629-2a995cce5a78\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 404 Not Found\r\nX-Content-Type-Options: nosniff\r\nDataServiceVersion: 3.0;\r\nContent-Type: application/json;odata=minimalmetadata;streaming=true;charset=utf-8\r\n\r\n{\"odata.error\":{\"code\":\"TableNotFound\",\"message\":{\"lang\":\"en-US\",\"value\":\"0:The table specified does not exist.\\nRequestId:2c0d8616-7002-00b5-38cd-5c8c40000000\\nTime:2021-06-09T01:17:13.5943330Z\"}}}\r\n--changesetresponse_63ff3d7c-c0ab-48af-9629-2a995cce5a78--\r\n--batchresponse_1690ba47-3476-4cdb-9979-e889ef351a01--\r\n", [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'multipart/mixed; boundary=batchresponse_1690ba47-3476-4cdb-9979-e889ef351a01',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2c0d8616-7002-00b5-38cd-5c8c40000000',
  'x-ms-client-request-id',
  '7279ddb9-f7dd-417b-b68d-78a8f4952cf6',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 09 Jun 2021 01:17:13 GMT'
]);
