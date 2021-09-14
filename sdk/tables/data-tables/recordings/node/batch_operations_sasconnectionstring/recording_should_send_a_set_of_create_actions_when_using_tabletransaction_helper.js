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
  '6ced31e6-0002-0039-29ae-a9c11b000000',
  'x-ms-client-request-id',
  '609e39c6-7d91-4551-8e32-0c25c9543372',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 14 Sep 2021 21:24:20 GMT'
]);

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/$batch', "--batch_fakeId\r\ncontent-type: multipart/mixed; boundary=changeset_fakeId\r\n\r\n\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPOST https://fakeaccount.table.core.windows.net/batchTableTestSASConnectionStringnode HTTP/1.1\r\ncontent-type: application/json;odata=nometadata\r\naccept: application/json;odata=minimalmetadata\r\ndataserviceversion: 3.0\r\nprefer: return-no-content\r\n\r\n\r\n{\"PartitionKey\":\"helper\",\"RowKey\":\"1\",\"value\":\"t1\"}\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPOST https://fakeaccount.table.core.windows.net/batchTableTestSASConnectionStringnode HTTP/1.1\r\ncontent-type: application/json;odata=nometadata\r\naccept: application/json;odata=minimalmetadata\r\ndataserviceversion: 3.0\r\nprefer: return-no-content\r\n\r\n\r\n{\"PartitionKey\":\"helper\",\"RowKey\":\"2\",\"value\":\"t2\"}\r\n--changeset_fakeId--\r\n--batch_fakeId--\r\n")
  .query(true)
  .reply(202, "--batchresponse_f305949d-8805-4512-b12b-b8b831482213\r\nContent-Type: multipart/mixed; boundary=changesetresponse_d912df56-9043-4e92-a0f5-3d9c03e63228\r\n\r\n--changesetresponse_d912df56-9043-4e92-a0f5-3d9c03e63228\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nPreference-Applied: return-no-content\r\nDataServiceVersion: 3.0;\r\nLocation: https://fakeaccount.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='helper',RowKey='1')\r\nDataServiceId: https://fakeaccount.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='helper',RowKey='1')\r\nETag: W/\"datetime'2021-09-14T21%3A24%3A20.6975371Z'\"\r\n\r\n\r\n--changesetresponse_d912df56-9043-4e92-a0f5-3d9c03e63228\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nPreference-Applied: return-no-content\r\nDataServiceVersion: 3.0;\r\nLocation: https://fakeaccount.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='helper',RowKey='2')\r\nDataServiceId: https://fakeaccount.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='helper',RowKey='2')\r\nETag: W/\"datetime'2021-09-14T21%3A24%3A20.6975371Z'\"\r\n\r\n\r\n--changesetresponse_d912df56-9043-4e92-a0f5-3d9c03e63228--\r\n--batchresponse_f305949d-8805-4512-b12b-b8b831482213--\r\n", [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'multipart/mixed; boundary=batchresponse_f305949d-8805-4512-b12b-b8b831482213',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6ced31fd-0002-0039-3cae-a9c11b000000',
  'x-ms-client-request-id',
  'cfa91089-3265-4e2e-821c-2d40483c0633',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 14 Sep 2021 21:24:20 GMT'
]);
