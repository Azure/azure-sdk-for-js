let nock = require('nock');

module.exports.hash = "6ba62f21b59c8e526f266ea02d551e9d";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/Tables', {"TableName":"batchTableTestSASConnectionStringnode"})
  .query(true)
  .reply(409, {"odata.error":{"code":"TableAlreadyExists","message":{"lang":"en-US","value":"The table specified already exists.\nRequestId:5af808ad-c002-000d-70df-c16eb3000000\nTime:2021-10-15T16:13:23.9873574Z"}}}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5af808ad-c002-000d-70df-c16eb3000000',
  'x-ms-client-request-id',
  'ccfe06a8-5ef7-4bfb-ade6-24c7b521f357',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 15 Oct 2021 16:13:23 GMT'
]);

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/$batch', "--batch_fakeId\r\ncontent-type: multipart/mixed; boundary=changeset_fakeId\r\n\r\n\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPOST https://fakeaccount.table.core.windows.net/noExistingTable HTTP/1.1\r\ncontent-type: application/json;odata=nometadata\r\naccept: application/json;odata=minimalmetadata\r\ndataserviceversion: 3.0\r\nprefer: return-no-content\r\n\r\n\r\n{\"PartitionKey\":\"batchTest\",\"RowKey\":\"1\",\"name\":\"first\"}\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPOST https://fakeaccount.table.core.windows.net/noExistingTable HTTP/1.1\r\ncontent-type: application/json;odata=nometadata\r\naccept: application/json;odata=minimalmetadata\r\ndataserviceversion: 3.0\r\nprefer: return-no-content\r\n\r\n\r\n{\"PartitionKey\":\"batchTest\",\"RowKey\":\"2\",\"name\":\"second\"}\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPOST https://fakeaccount.table.core.windows.net/noExistingTable HTTP/1.1\r\ncontent-type: application/json;odata=nometadata\r\naccept: application/json;odata=minimalmetadata\r\ndataserviceversion: 3.0\r\nprefer: return-no-content\r\n\r\n\r\n{\"PartitionKey\":\"batchTest\",\"RowKey\":\"3\",\"name\":\"third\"}\r\n--changeset_fakeId--\r\n--batch_fakeId--\r\n")
  .query(true)
  .reply(202, "--batchresponse_3bcda1dd-6816-4dcd-b08f-73e36e909421\r\nContent-Type: multipart/mixed; boundary=changesetresponse_32f34f7c-478c-4d5f-bb15-0c8f103fd05b\r\n\r\n--changesetresponse_32f34f7c-478c-4d5f-bb15-0c8f103fd05b\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 404 Not Found\r\nX-Content-Type-Options: nosniff\r\nDataServiceVersion: 3.0;\r\nContent-Type: application/json;odata=minimalmetadata;streaming=true;charset=utf-8\r\n\r\n{\"odata.error\":{\"code\":\"TableNotFound\",\"message\":{\"lang\":\"en-US\",\"value\":\"0:The table specified does not exist.\\nRequestId:5af808c3-c002-000d-06df-c16eb3000000\\nTime:2021-10-15T16:13:24.0233826Z\"}}}\r\n--changesetresponse_32f34f7c-478c-4d5f-bb15-0c8f103fd05b--\r\n--batchresponse_3bcda1dd-6816-4dcd-b08f-73e36e909421--\r\n", [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'multipart/mixed; boundary=batchresponse_3bcda1dd-6816-4dcd-b08f-73e36e909421',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5af808c3-c002-000d-06df-c16eb3000000',
  'x-ms-client-request-id',
  '2e7ad3d3-fd03-472f-a37b-0fc1ae7a6535',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 15 Oct 2021 16:13:23 GMT'
]);
