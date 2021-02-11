let nock = require('nock');

module.exports.hash = "a363dca9d96bee4fe118b520069b4340";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://fakestorageaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/Tables', {"TableName":"batchTableTestnode"})
  .query(true)
  .reply(409, {"odata.error":{"code":"TableAlreadyExists","message":{"lang":"en-US","value":"The table specified already exists.\nRequestId:d63fa434-2002-00b8-03dd-f8a3cb000000\nTime:2021-02-01T20:58:54.5361789Z"}}}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd63fa434-2002-00b8-03dd-f8a3cb000000',
  'x-ms-client-request-id',
  '443362e4-04bc-424e-b730-cf3675546ceb',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 01 Feb 2021 20:58:53 GMT'
]);

nock('https://fakestorageaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/$batch', "--batch_fakeId\r\ncontent-type: multipart/mixed; boundary=changeset_fakeId\r\n\r\n\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPOST https://fakestorageaccount.table.core.windows.net/noExistingTable HTTP/1.1\r\ncontent-type: application/json;odata=nometadata\r\naccept: application/json;odata=minimalmetadata\r\ndataserviceversion: 3.0\r\nprefer: return-no-content\r\n\r\n\r\n{\"PartitionKey\":\"batchTest\",\"RowKey\":\"1\",\"name\":\"first\"}\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPOST https://fakestorageaccount.table.core.windows.net/noExistingTable HTTP/1.1\r\ncontent-type: application/json;odata=nometadata\r\naccept: application/json;odata=minimalmetadata\r\ndataserviceversion: 3.0\r\nprefer: return-no-content\r\n\r\n\r\n{\"PartitionKey\":\"batchTest\",\"RowKey\":\"2\",\"name\":\"second\"}\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPOST https://fakestorageaccount.table.core.windows.net/noExistingTable HTTP/1.1\r\ncontent-type: application/json;odata=nometadata\r\naccept: application/json;odata=minimalmetadata\r\ndataserviceversion: 3.0\r\nprefer: return-no-content\r\n\r\n\r\n{\"PartitionKey\":\"batchTest\",\"RowKey\":\"3\",\"name\":\"third\"}\r\n--changeset_fakeId--\r\n--batch_fakeId\r\n")
  .query(true)
  .reply(202, "--batchresponse_6073cbc9-0aba-4b17-97ff-fe51ec032950\r\nContent-Type: multipart/mixed; boundary=changesetresponse_af5190e7-7bae-497c-b18d-9427225406f3\r\n\r\n--changesetresponse_af5190e7-7bae-497c-b18d-9427225406f3\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 404 Not Found\r\nX-Content-Type-Options: nosniff\r\nDataServiceVersion: 3.0;\r\nContent-Type: application/json;odata=minimalmetadata;streaming=true;charset=utf-8\r\n\r\n{\"odata.error\":{\"code\":\"TableNotFound\",\"message\":{\"lang\":\"en-US\",\"value\":\"0:The table specified does not exist.\\nRequestId:d63fa445-2002-00b8-13dd-f8a3cb000000\\nTime:2021-02-01T20:58:54.6152347Z\"}}}\r\n--changesetresponse_af5190e7-7bae-497c-b18d-9427225406f3--\r\n--batchresponse_6073cbc9-0aba-4b17-97ff-fe51ec032950--\r\n", [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'multipart/mixed; boundary=batchresponse_6073cbc9-0aba-4b17-97ff-fe51ec032950',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd63fa445-2002-00b8-13dd-f8a3cb000000',
  'x-ms-client-request-id',
  'd60f83f4-f4f1-4870-ac57-47115f8e8050',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 01 Feb 2021 20:58:53 GMT'
]);
