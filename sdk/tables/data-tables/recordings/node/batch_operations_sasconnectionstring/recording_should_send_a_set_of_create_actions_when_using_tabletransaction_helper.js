let nock = require('nock');

module.exports.hash = "7fe804a6bdf9f14679c93ca16293cd63";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/Tables', {"TableName":"batchTableTestSASConnectionStringnode"})
  .query(true)
  .reply(201, {"odata.metadata":"https://fakeaccount.table.core.windows.net/$metadata#Tables/@Element","TableName":"batchTableTestSASConnectionStringnode"}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Location',
  "https://fakeaccount.table.core.windows.net/Tables('batchTableTestSASConnectionStringnode')",
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '00765fcc-e002-0038-6504-a4c0e6000000',
  'x-ms-client-request-id',
  'cec44605-4985-4d4e-820d-c78099fa9126',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 07 Sep 2021 16:24:22 GMT'
]);

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/$batch', "--batch_fakeId\r\ncontent-type: multipart/mixed; boundary=changeset_fakeId\r\n\r\n\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPOST https://fakeaccount.table.core.windows.net/batchTableTestSASConnectionStringnode HTTP/1.1\r\nContent-Type: application/json;odata=nometadata\r\nAccept: application/json;odata=minimalmetadata\r\nDataServiceVersion: 3.0\r\nPrefer: return-no-content\r\n\r\n\r\n{\"PartitionKey\":\"helper\",\"RowKey\":\"1\",\"value\":\"t1\"}\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPOST https://fakeaccount.table.core.windows.net/batchTableTestSASConnectionStringnode HTTP/1.1\r\nContent-Type: application/json;odata=nometadata\r\nAccept: application/json;odata=minimalmetadata\r\nDataServiceVersion: 3.0\r\nPrefer: return-no-content\r\n\r\n\r\n{\"PartitionKey\":\"helper\",\"RowKey\":\"2\",\"value\":\"t2\"}\r\n--changeset_fakeId--\r\n--batch_fakeId--\r\n")
  .query(true)
  .reply(202, "--batchresponse_3988b6db-3240-47e4-abdd-050caf62ce73\r\nContent-Type: multipart/mixed; boundary=changesetresponse_30e60553-c82e-4544-9a86-5b2a157a112c\r\n\r\n--changesetresponse_30e60553-c82e-4544-9a86-5b2a157a112c\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nPreference-Applied: return-no-content\r\nDataServiceVersion: 3.0;\r\nLocation: https://fakeaccount.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='helper',RowKey='1')\r\nDataServiceId: https://fakeaccount.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='helper',RowKey='1')\r\nETag: W/\"datetime'2021-09-07T16%3A24%3A23.2050484Z'\"\r\n\r\n\r\n--changesetresponse_30e60553-c82e-4544-9a86-5b2a157a112c\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nPreference-Applied: return-no-content\r\nDataServiceVersion: 3.0;\r\nLocation: https://fakeaccount.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='helper',RowKey='2')\r\nDataServiceId: https://fakeaccount.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='helper',RowKey='2')\r\nETag: W/\"datetime'2021-09-07T16%3A24%3A23.2050484Z'\"\r\n\r\n\r\n--changesetresponse_30e60553-c82e-4544-9a86-5b2a157a112c--\r\n--batchresponse_3988b6db-3240-47e4-abdd-050caf62ce73--\r\n", [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'multipart/mixed; boundary=batchresponse_3988b6db-3240-47e4-abdd-050caf62ce73',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '00765fd6-e002-0038-6d04-a4c0e6000000',
  'x-ms-client-request-id',
  '02b487af-f7a0-4a35-908a-522ae3db12ef',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 07 Sep 2021 16:24:22 GMT'
]);
