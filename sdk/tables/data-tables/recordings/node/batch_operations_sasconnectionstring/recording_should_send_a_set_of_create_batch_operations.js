let nock = require('nock');

module.exports.hash = "659ac4694c40f47f27cde9bb7ae0d0b9";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/Tables', {"TableName":"batchTableTestSASConnectionStringnode"})
  .query(true)
  .reply(409, {"odata.error":{"code":"TableAlreadyExists","message":{"lang":"en-US","value":"The table specified already exists.\nRequestId:00765fe5-e002-0038-7904-a4c0e6000000\nTime:2021-09-07T16:24:23.2861065Z"}}}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '00765fe5-e002-0038-7904-a4c0e6000000',
  'x-ms-client-request-id',
  'd0453cba-9fbe-42ed-9f13-5aff954e1ba4',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 07 Sep 2021 16:24:22 GMT'
]);

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/$batch', "--batch_fakeId\r\ncontent-type: multipart/mixed; boundary=changeset_fakeId\r\n\r\n\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPOST https://fakeaccount.table.core.windows.net/batchTableTestSASConnectionStringnode HTTP/1.1\r\nContent-Type: application/json;odata=nometadata\r\nAccept: application/json;odata=minimalmetadata\r\nDataServiceVersion: 3.0\r\nPrefer: return-no-content\r\n\r\n\r\n{\"PartitionKey\":\"batchTest\",\"RowKey\":\"1\",\"name\":\"first\"}\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPOST https://fakeaccount.table.core.windows.net/batchTableTestSASConnectionStringnode HTTP/1.1\r\nContent-Type: application/json;odata=nometadata\r\nAccept: application/json;odata=minimalmetadata\r\nDataServiceVersion: 3.0\r\nPrefer: return-no-content\r\n\r\n\r\n{\"PartitionKey\":\"batchTest\",\"RowKey\":\"2\",\"name\":\"second\"}\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPOST https://fakeaccount.table.core.windows.net/batchTableTestSASConnectionStringnode HTTP/1.1\r\nContent-Type: application/json;odata=nometadata\r\nAccept: application/json;odata=minimalmetadata\r\nDataServiceVersion: 3.0\r\nPrefer: return-no-content\r\n\r\n\r\n{\"PartitionKey\":\"batchTest\",\"RowKey\":\"3\",\"name\":\"third\"}\r\n--changeset_fakeId--\r\n--batch_fakeId--\r\n")
  .query(true)
  .reply(202, "--batchresponse_0e82ceb7-bd55-4603-aaef-37af2ba46b07\r\nContent-Type: multipart/mixed; boundary=changesetresponse_c381a1fa-5df3-4253-ac2f-f0a97830a645\r\n\r\n--changesetresponse_c381a1fa-5df3-4253-ac2f-f0a97830a645\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nPreference-Applied: return-no-content\r\nDataServiceVersion: 3.0;\r\nLocation: https://fakeaccount.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='batchTest',RowKey='1')\r\nDataServiceId: https://fakeaccount.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='batchTest',RowKey='1')\r\nETag: W/\"datetime'2021-09-07T16%3A24%3A23.3581582Z'\"\r\n\r\n\r\n--changesetresponse_c381a1fa-5df3-4253-ac2f-f0a97830a645\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nPreference-Applied: return-no-content\r\nDataServiceVersion: 3.0;\r\nLocation: https://fakeaccount.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='batchTest',RowKey='2')\r\nDataServiceId: https://fakeaccount.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='batchTest',RowKey='2')\r\nETag: W/\"datetime'2021-09-07T16%3A24%3A23.3581582Z'\"\r\n\r\n\r\n--changesetresponse_c381a1fa-5df3-4253-ac2f-f0a97830a645\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nPreference-Applied: return-no-content\r\nDataServiceVersion: 3.0;\r\nLocation: https://fakeaccount.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='batchTest',RowKey='3')\r\nDataServiceId: https://fakeaccount.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='batchTest',RowKey='3')\r\nETag: W/\"datetime'2021-09-07T16%3A24%3A23.3581582Z'\"\r\n\r\n\r\n--changesetresponse_c381a1fa-5df3-4253-ac2f-f0a97830a645--\r\n--batchresponse_0e82ceb7-bd55-4603-aaef-37af2ba46b07--\r\n", [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'multipart/mixed; boundary=batchresponse_0e82ceb7-bd55-4603-aaef-37af2ba46b07',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '00765ff5-e002-0038-0704-a4c0e6000000',
  'x-ms-client-request-id',
  'e14c0970-8bf1-4ca6-92c2-5620f6dfeaf0',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 07 Sep 2021 16:24:23 GMT'
]);
