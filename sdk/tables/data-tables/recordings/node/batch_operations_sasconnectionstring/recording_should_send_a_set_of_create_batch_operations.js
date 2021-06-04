let nock = require('nock');

module.exports.hash = "a26eff0b9879ad0705c563ed11cf8106";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://fakestorageaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/Tables', {"TableName":"batchTableTestSASConnectionStringnode"})
  .query(true)
  .reply(409, {"odata.error":{"code":"TableAlreadyExists","message":{"lang":"en-US","value":"The table specified already exists.\nRequestId:6e9d0df7-c002-0024-278c-5918f1000000\nTime:2021-06-04T21:59:53.7446523Z"}}}, [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6e9d0df7-c002-0024-278c-5918f1000000',
  'x-ms-client-request-id',
  '7942122b-be6f-4ebf-831a-5afa0d82d645',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 04 Jun 2021 21:59:52 GMT' ]);

nock('https://fakestorageaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/$batch', "--batch_fakeId\r\ncontent-type: multipart/mixed; boundary=changeset_fakeId\r\n\r\n\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPOST https://fakestorageaccount.table.core.windows.net/batchTableTestSASConnectionStringnode HTTP/1.1\r\ncontent-type: application/json;odata=nometadata\r\naccept: application/json;odata=minimalmetadata\r\ndataserviceversion: 3.0\r\nprefer: return-no-content\r\n\r\n\r\n{\"PartitionKey\":\"batchTest\",\"RowKey\":\"1\",\"name\":\"first\"}\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPOST https://fakestorageaccount.table.core.windows.net/batchTableTestSASConnectionStringnode HTTP/1.1\r\ncontent-type: application/json;odata=nometadata\r\naccept: application/json;odata=minimalmetadata\r\ndataserviceversion: 3.0\r\nprefer: return-no-content\r\n\r\n\r\n{\"PartitionKey\":\"batchTest\",\"RowKey\":\"2\",\"name\":\"second\"}\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPOST https://fakestorageaccount.table.core.windows.net/batchTableTestSASConnectionStringnode HTTP/1.1\r\ncontent-type: application/json;odata=nometadata\r\naccept: application/json;odata=minimalmetadata\r\ndataserviceversion: 3.0\r\nprefer: return-no-content\r\n\r\n\r\n{\"PartitionKey\":\"batchTest\",\"RowKey\":\"3\",\"name\":\"third\"}\r\n--changeset_fakeId--\r\n--batch_fakeId\r\n")
  .query(true)
  .reply(202, "--batchresponse_d22a5c62-a401-422d-b668-76c216a17730\r\nContent-Type: multipart/mixed; boundary=changesetresponse_5fdfc54d-e6e2-42dd-b2f3-fb593bcb684a\r\n\r\n--changesetresponse_5fdfc54d-e6e2-42dd-b2f3-fb593bcb684a\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nPreference-Applied: return-no-content\r\nDataServiceVersion: 3.0;\r\nLocation: https://fakestorageaccount.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='batchTest',RowKey='1')\r\nDataServiceId: https://fakestorageaccount.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='batchTest',RowKey='1')\r\nETag: W/\"datetime'2021-06-04T21%3A59%3A53.7776758Z'\"\r\n\r\n\r\n--changesetresponse_5fdfc54d-e6e2-42dd-b2f3-fb593bcb684a\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nPreference-Applied: return-no-content\r\nDataServiceVersion: 3.0;\r\nLocation: https://fakestorageaccount.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='batchTest',RowKey='2')\r\nDataServiceId: https://fakestorageaccount.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='batchTest',RowKey='2')\r\nETag: W/\"datetime'2021-06-04T21%3A59%3A53.7776758Z'\"\r\n\r\n\r\n--changesetresponse_5fdfc54d-e6e2-42dd-b2f3-fb593bcb684a\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nPreference-Applied: return-no-content\r\nDataServiceVersion: 3.0;\r\nLocation: https://fakestorageaccount.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='batchTest',RowKey='3')\r\nDataServiceId: https://fakestorageaccount.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='batchTest',RowKey='3')\r\nETag: W/\"datetime'2021-06-04T21%3A59%3A53.7776758Z'\"\r\n\r\n\r\n--changesetresponse_5fdfc54d-e6e2-42dd-b2f3-fb593bcb684a--\r\n--batchresponse_d22a5c62-a401-422d-b668-76c216a17730--\r\n", [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'multipart/mixed; boundary=batchresponse_d22a5c62-a401-422d-b668-76c216a17730',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6e9d0dff-c002-0024-2d8c-5918f1000000',
  'x-ms-client-request-id',
  '232054be-b9aa-4660-86f7-48d097302859',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 04 Jun 2021 21:59:52 GMT' ]);
