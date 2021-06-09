let nock = require('nock');

module.exports.hash = "96979cc2cad83eb2b4913ce06a759d84";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://joheredistorage2.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/Tables', {"TableName":"batchTableTestSASConnectionStringnode"})
  .query(true)
  .reply(201, {"odata.metadata":"https://joheredistorage2.table.core.windows.net/$metadata#Tables/@Element","TableName":"batchTableTestSASConnectionStringnode"}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Location',
  "https://joheredistorage2.table.core.windows.net/Tables('batchTableTestSASConnectionStringnode')",
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2c0d84ef-7002-00b5-27cd-5c8c40000000',
  'x-ms-client-request-id',
  '69f0aa74-74a2-4c14-ab64-90a0191ec53d',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 09 Jun 2021 01:17:12 GMT'
]);

nock('https://joheredistorage2.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/$batch', "--batch_fakeId\r\ncontent-type: multipart/mixed; boundary=changeset_fakeId\r\n\r\n\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPOST https://joheredistorage2.table.core.windows.net/batchTableTestSASConnectionStringnode HTTP/1.1\r\ncontent-type: application/json;odata=nometadata\r\naccept: application/json;odata=minimalmetadata\r\ndataserviceversion: 3.0\r\nprefer: return-no-content\r\n\r\n\r\n{\"PartitionKey\":\"helper\",\"RowKey\":\"1\",\"value\":\"t1\"}\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPOST https://joheredistorage2.table.core.windows.net/batchTableTestSASConnectionStringnode HTTP/1.1\r\ncontent-type: application/json;odata=nometadata\r\naccept: application/json;odata=minimalmetadata\r\ndataserviceversion: 3.0\r\nprefer: return-no-content\r\n\r\n\r\n{\"PartitionKey\":\"helper\",\"RowKey\":\"2\",\"value\":\"t2\"}\r\n--changeset_fakeId--\r\n--batch_fakeId--\r\n")
  .query(true)
  .reply(202, "--batchresponse_a6300377-d5d9-42e5-9cb6-6983a022b712\r\nContent-Type: multipart/mixed; boundary=changesetresponse_49d0e4ef-837f-4392-ac7d-624748c9d2dc\r\n\r\n--changesetresponse_49d0e4ef-837f-4392-ac7d-624748c9d2dc\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nPreference-Applied: return-no-content\r\nDataServiceVersion: 3.0;\r\nLocation: https://joheredistorage2.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='helper',RowKey='1')\r\nDataServiceId: https://joheredistorage2.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='helper',RowKey='1')\r\nETag: W/\"datetime'2021-06-09T01%3A17%3A12.93486Z'\"\r\n\r\n\r\n--changesetresponse_49d0e4ef-837f-4392-ac7d-624748c9d2dc\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nPreference-Applied: return-no-content\r\nDataServiceVersion: 3.0;\r\nLocation: https://joheredistorage2.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='helper',RowKey='2')\r\nDataServiceId: https://joheredistorage2.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='helper',RowKey='2')\r\nETag: W/\"datetime'2021-06-09T01%3A17%3A12.93486Z'\"\r\n\r\n\r\n--changesetresponse_49d0e4ef-837f-4392-ac7d-624748c9d2dc--\r\n--batchresponse_a6300377-d5d9-42e5-9cb6-6983a022b712--\r\n", [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'multipart/mixed; boundary=batchresponse_a6300377-d5d9-42e5-9cb6-6983a022b712',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2c0d8502-7002-00b5-38cd-5c8c40000000',
  'x-ms-client-request-id',
  'e76462d1-17a6-4dc0-9229-d62b983f2473',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 09 Jun 2021 01:17:12 GMT'
]);
