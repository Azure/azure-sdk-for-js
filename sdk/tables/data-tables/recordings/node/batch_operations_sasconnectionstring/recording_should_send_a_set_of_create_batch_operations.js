let nock = require('nock');

module.exports.hash = "659ac4694c40f47f27cde9bb7ae0d0b9";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/Tables', {"TableName":"batchTableTestSASConnectionStringnode"})
  .query(true)
  .reply(409, {"odata.error":{"code":"TableAlreadyExists","message":{"lang":"en-US","value":"The table specified already exists.\nRequestId:6ced3217-0002-0039-54ae-a9c11b000000\nTime:2021-09-14T21:24:20.8126192Z"}}}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6ced3217-0002-0039-54ae-a9c11b000000',
  'x-ms-client-request-id',
  '1e325c82-e45e-45a7-bdd5-3b904c69acd8',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 14 Sep 2021 21:24:20 GMT'
]);

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/$batch', "--batch_fakeId\r\ncontent-type: multipart/mixed; boundary=changeset_fakeId\r\n\r\n\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPOST https://fakeaccount.table.core.windows.net/batchTableTestSASConnectionStringnode HTTP/1.1\r\ncontent-type: application/json;odata=nometadata\r\naccept: application/json;odata=minimalmetadata\r\ndataserviceversion: 3.0\r\nprefer: return-no-content\r\n\r\n\r\n{\"PartitionKey\":\"batchTest\",\"RowKey\":\"1\",\"name\":\"first\"}\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPOST https://fakeaccount.table.core.windows.net/batchTableTestSASConnectionStringnode HTTP/1.1\r\ncontent-type: application/json;odata=nometadata\r\naccept: application/json;odata=minimalmetadata\r\ndataserviceversion: 3.0\r\nprefer: return-no-content\r\n\r\n\r\n{\"PartitionKey\":\"batchTest\",\"RowKey\":\"2\",\"name\":\"second\"}\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPOST https://fakeaccount.table.core.windows.net/batchTableTestSASConnectionStringnode HTTP/1.1\r\ncontent-type: application/json;odata=nometadata\r\naccept: application/json;odata=minimalmetadata\r\ndataserviceversion: 3.0\r\nprefer: return-no-content\r\n\r\n\r\n{\"PartitionKey\":\"batchTest\",\"RowKey\":\"3\",\"name\":\"third\"}\r\n--changeset_fakeId--\r\n--batch_fakeId--\r\n")
  .query(true)
  .reply(202, "--batchresponse_00f92fca-6db3-4e8c-a822-d8aab281ae49\r\nContent-Type: multipart/mixed; boundary=changesetresponse_78fdce8c-5337-4766-a12b-0f712fc5dff6\r\n\r\n--changesetresponse_78fdce8c-5337-4766-a12b-0f712fc5dff6\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nPreference-Applied: return-no-content\r\nDataServiceVersion: 3.0;\r\nLocation: https://fakeaccount.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='batchTest',RowKey='1')\r\nDataServiceId: https://fakeaccount.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='batchTest',RowKey='1')\r\nETag: W/\"datetime'2021-09-14T21%3A24%3A20.908687Z'\"\r\n\r\n\r\n--changesetresponse_78fdce8c-5337-4766-a12b-0f712fc5dff6\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nPreference-Applied: return-no-content\r\nDataServiceVersion: 3.0;\r\nLocation: https://fakeaccount.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='batchTest',RowKey='2')\r\nDataServiceId: https://fakeaccount.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='batchTest',RowKey='2')\r\nETag: W/\"datetime'2021-09-14T21%3A24%3A20.908687Z'\"\r\n\r\n\r\n--changesetresponse_78fdce8c-5337-4766-a12b-0f712fc5dff6\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nPreference-Applied: return-no-content\r\nDataServiceVersion: 3.0;\r\nLocation: https://fakeaccount.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='batchTest',RowKey='3')\r\nDataServiceId: https://fakeaccount.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='batchTest',RowKey='3')\r\nETag: W/\"datetime'2021-09-14T21%3A24%3A20.908687Z'\"\r\n\r\n\r\n--changesetresponse_78fdce8c-5337-4766-a12b-0f712fc5dff6--\r\n--batchresponse_00f92fca-6db3-4e8c-a822-d8aab281ae49--\r\n", [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'multipart/mixed; boundary=batchresponse_00f92fca-6db3-4e8c-a822-d8aab281ae49',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6ced3234-0002-0039-70ae-a9c11b000000',
  'x-ms-client-request-id',
  '69cb4751-15b4-453c-90f5-bef934891087',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 14 Sep 2021 21:24:20 GMT'
]);
