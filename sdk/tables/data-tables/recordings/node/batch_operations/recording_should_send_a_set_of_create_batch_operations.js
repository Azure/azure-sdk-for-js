let nock = require('nock');

module.exports.hash = "9768ffbe5237cad2fd661d323ad4f15a";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://fakestorageaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/Tables', {"TableName":"batchTableTestnode"})
  .query(true)
  .reply(201, {"odata.metadata":"https://fakestorageaccount.table.core.windows.net/$metadata#Tables/@Element","TableName":"batchTableTestnode"}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Location',
  "https://fakestorageaccount.table.core.windows.net/Tables('batchTableTestnode')",
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd63fa350-2002-00b8-34dd-f8a3cb000000',
  'x-ms-client-request-id',
  '95b741aa-22b8-4996-8ef8-84b067a1977e',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 01 Feb 2021 20:58:52 GMT'
]);

nock('https://fakestorageaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/$batch', "--batch_fakeId\r\ncontent-type: multipart/mixed; boundary=changeset_fakeId\r\n\r\n\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPOST https://fakestorageaccount.table.core.windows.net/batchTableTestnode HTTP/1.1\r\ncontent-type: application/json;odata=nometadata\r\naccept: application/json;odata=minimalmetadata\r\ndataserviceversion: 3.0\r\nprefer: return-no-content\r\n\r\n\r\n{\"PartitionKey\":\"batchTest\",\"RowKey\":\"1\",\"name\":\"first\"}\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPOST https://fakestorageaccount.table.core.windows.net/batchTableTestnode HTTP/1.1\r\ncontent-type: application/json;odata=nometadata\r\naccept: application/json;odata=minimalmetadata\r\ndataserviceversion: 3.0\r\nprefer: return-no-content\r\n\r\n\r\n{\"PartitionKey\":\"batchTest\",\"RowKey\":\"2\",\"name\":\"second\"}\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPOST https://fakestorageaccount.table.core.windows.net/batchTableTestnode HTTP/1.1\r\ncontent-type: application/json;odata=nometadata\r\naccept: application/json;odata=minimalmetadata\r\ndataserviceversion: 3.0\r\nprefer: return-no-content\r\n\r\n\r\n{\"PartitionKey\":\"batchTest\",\"RowKey\":\"3\",\"name\":\"third\"}\r\n--changeset_fakeId--\r\n--batch_fakeId\r\n")
  .query(true)
  .reply(202, "--batchresponse_470a679b-3acc-4329-8a7d-5d34950e4f87\r\nContent-Type: multipart/mixed; boundary=changesetresponse_b9aede6c-aa55-4b2d-afc2-4a76be83fd2e\r\n\r\n--changesetresponse_b9aede6c-aa55-4b2d-afc2-4a76be83fd2e\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nPreference-Applied: return-no-content\r\nDataServiceVersion: 3.0;\r\nLocation: https://fakestorageaccount.table.core.windows.net/batchTableTestnode(PartitionKey='batchTest',RowKey='1')\r\nDataServiceId: https://fakestorageaccount.table.core.windows.net/batchTableTestnode(PartitionKey='batchTest',RowKey='1')\r\nETag: W/\"datetime'2021-02-01T20%3A58%3A53.7196078Z'\"\r\n\r\n\r\n--changesetresponse_b9aede6c-aa55-4b2d-afc2-4a76be83fd2e\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nPreference-Applied: return-no-content\r\nDataServiceVersion: 3.0;\r\nLocation: https://fakestorageaccount.table.core.windows.net/batchTableTestnode(PartitionKey='batchTest',RowKey='2')\r\nDataServiceId: https://fakestorageaccount.table.core.windows.net/batchTableTestnode(PartitionKey='batchTest',RowKey='2')\r\nETag: W/\"datetime'2021-02-01T20%3A58%3A53.7196078Z'\"\r\n\r\n\r\n--changesetresponse_b9aede6c-aa55-4b2d-afc2-4a76be83fd2e\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nPreference-Applied: return-no-content\r\nDataServiceVersion: 3.0;\r\nLocation: https://fakestorageaccount.table.core.windows.net/batchTableTestnode(PartitionKey='batchTest',RowKey='3')\r\nDataServiceId: https://fakestorageaccount.table.core.windows.net/batchTableTestnode(PartitionKey='batchTest',RowKey='3')\r\nETag: W/\"datetime'2021-02-01T20%3A58%3A53.7196078Z'\"\r\n\r\n\r\n--changesetresponse_b9aede6c-aa55-4b2d-afc2-4a76be83fd2e--\r\n--batchresponse_470a679b-3acc-4329-8a7d-5d34950e4f87--\r\n", [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'multipart/mixed; boundary=batchresponse_470a679b-3acc-4329-8a7d-5d34950e4f87',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd63fa368-2002-00b8-48dd-f8a3cb000000',
  'x-ms-client-request-id',
  'ae4670f7-2671-46c3-acd3-48f883b67ff8',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 01 Feb 2021 20:58:52 GMT'
]);
