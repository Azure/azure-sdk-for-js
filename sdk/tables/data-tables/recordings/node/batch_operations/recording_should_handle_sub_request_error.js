let nock = require('nock');

module.exports.hash = "095b0df362273370b396798642a53e62";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://fakestorageaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/Tables', {"TableName":"batchTableTestnode"})
  .query(true)
  .reply(409, {"odata.error":{"code":"TableAlreadyExists","message":{"lang":"en-US","value":"The table specified already exists.\nRequestId:8a1d10c0-0002-006b-3511-99f4af000000\nTime:2020-10-02T23:12:23.0807201Z"}}}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8a1d10c0-0002-006b-3511-99f4af000000',
  'x-ms-client-request-id',
  '8a992ff2-61e9-45d2-89a3-724706fccadb',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 02 Oct 2020 23:12:22 GMT'
]);

nock('https://fakestorageaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/$batch', "--batch_fakeId\r\ncontent-type: multipart/mixed; boundary=changeset_fakeId\r\n\r\n\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPOST https://fakestorageaccount.table.core.windows.net/noExistingTable HTTP/1.1\r\nContent-Type: application/json;odata=nometadata\r\nDataServiceVersion: 3.0\r\nAccept: application/json;odata=minimalmetadata\r\nPrefer: return-no-content\r\n\r\n{\"PartitionKey\":\"batchTest\",\"RowKey\":\"1\",\"name\":\"first\"}\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPOST https://fakestorageaccount.table.core.windows.net/noExistingTable HTTP/1.1\r\nContent-Type: application/json;odata=nometadata\r\nDataServiceVersion: 3.0\r\nAccept: application/json;odata=minimalmetadata\r\nPrefer: return-no-content\r\n\r\n{\"PartitionKey\":\"batchTest\",\"RowKey\":\"2\",\"name\":\"second\"}\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPOST https://fakestorageaccount.table.core.windows.net/noExistingTable HTTP/1.1\r\nContent-Type: application/json;odata=nometadata\r\nDataServiceVersion: 3.0\r\nAccept: application/json;odata=minimalmetadata\r\nPrefer: return-no-content\r\n\r\n{\"PartitionKey\":\"batchTest\",\"RowKey\":\"3\",\"name\":\"third\"}\r\n--changeset_fakeId--\r\n--batch_fakeId\r\n")
  .query(true)
  .reply(202, "--batchresponse_b836c2da-e5cd-4392-a662-41fac40bc137\r\nContent-Type: multipart/mixed; boundary=changesetresponse_93e24565-e456-4bd1-917f-246c970a4614\r\n\r\n--changesetresponse_93e24565-e456-4bd1-917f-246c970a4614\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 404 Not Found\r\nX-Content-Type-Options: nosniff\r\nDataServiceVersion: 3.0;\r\nContent-Type: application/json;odata=minimalmetadata;streaming=true;charset=utf-8\r\n\r\n{\"odata.error\":{\"code\":\"TableNotFound\",\"message\":{\"lang\":\"en-US\",\"value\":\"0:The table specified does not exist.\\nRequestId:9111bcc8-a002-0044-0211-997595000000\\nTime:2020-10-02T23:12:23.1938601Z\"}}}\r\n--changesetresponse_93e24565-e456-4bd1-917f-246c970a4614--\r\n--batchresponse_b836c2da-e5cd-4392-a662-41fac40bc137--\r\n", [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'multipart/mixed; boundary=batchresponse_b836c2da-e5cd-4392-a662-41fac40bc137',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9111bcc8-a002-0044-0211-997595000000',
  'x-ms-client-request-id',
  '9f34f8db-2e32-4197-b565-0d6dc476b61e',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 02 Oct 2020 23:12:22 GMT'
]);
