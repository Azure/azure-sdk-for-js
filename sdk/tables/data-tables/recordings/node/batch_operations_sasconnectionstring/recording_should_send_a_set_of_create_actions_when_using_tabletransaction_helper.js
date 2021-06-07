let nock = require('nock');

module.exports.hash = "96979cc2cad83eb2b4913ce06a759d84";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://fakestorageaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/Tables', {"TableName":"batchTableTestSASConnectionStringnode"})
  .query(true)
  .reply(201, {"odata.metadata":"https://fakestorageaccount.table.core.windows.net/$metadata#Tables/@Element","TableName":"batchTableTestSASConnectionStringnode"}, [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Location',
  'https://fakestorageaccount.table.core.windows.net/Tables(\'batchTableTestSASConnectionStringnode\')',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6e9d0de7-c002-0024-1a8c-5918f1000000',
  'x-ms-client-request-id',
  '8d978d1f-a7ee-4fe6-aaf9-4cf40eddd28c',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 04 Jun 2021 21:59:52 GMT' ]);

nock('https://fakestorageaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/$batch', "--batch_fakeId\r\ncontent-type: multipart/mixed; boundary=changeset_fakeId\r\n\r\n\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPOST https://fakestorageaccount.table.core.windows.net/batchTableTestSASConnectionStringnode HTTP/1.1\r\ncontent-type: application/json;odata=nometadata\r\naccept: application/json;odata=minimalmetadata\r\ndataserviceversion: 3.0\r\nprefer: return-no-content\r\n\r\n\r\n{\"PartitionKey\":\"helper\",\"RowKey\":\"1\",\"value\":\"t1\"}\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPOST https://fakestorageaccount.table.core.windows.net/batchTableTestSASConnectionStringnode HTTP/1.1\r\ncontent-type: application/json;odata=nometadata\r\naccept: application/json;odata=minimalmetadata\r\ndataserviceversion: 3.0\r\nprefer: return-no-content\r\n\r\n\r\n{\"PartitionKey\":\"helper\",\"RowKey\":\"2\",\"value\":\"t2\"}\r\n--changeset_fakeId--\r\n--batch_fakeId--\r\n")
  .query(true)
  .reply(202, "--batchresponse_178ef4bb-7b15-42a9-a3d2-dd96682f91f0\r\nContent-Type: multipart/mixed; boundary=changesetresponse_0bebd7f0-7f73-4008-8b78-7ae64766a407\r\n\r\n--changesetresponse_0bebd7f0-7f73-4008-8b78-7ae64766a407\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nPreference-Applied: return-no-content\r\nDataServiceVersion: 3.0;\r\nLocation: https://fakestorageaccount.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='helper',RowKey='1')\r\nDataServiceId: https://fakestorageaccount.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='helper',RowKey='1')\r\nETag: W/\"datetime'2021-06-04T21%3A59%3A53.7036231Z'\"\r\n\r\n\r\n--changesetresponse_0bebd7f0-7f73-4008-8b78-7ae64766a407\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nPreference-Applied: return-no-content\r\nDataServiceVersion: 3.0;\r\nLocation: https://fakestorageaccount.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='helper',RowKey='2')\r\nDataServiceId: https://fakestorageaccount.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='helper',RowKey='2')\r\nETag: W/\"datetime'2021-06-04T21%3A59%3A53.7036231Z'\"\r\n\r\n\r\n--changesetresponse_0bebd7f0-7f73-4008-8b78-7ae64766a407--\r\n--batchresponse_178ef4bb-7b15-42a9-a3d2-dd96682f91f0--\r\n", [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'multipart/mixed; boundary=batchresponse_178ef4bb-7b15-42a9-a3d2-dd96682f91f0',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6e9d0def-c002-0024-1f8c-5918f1000000',
  'x-ms-client-request-id',
  'cc3a142d-e284-4997-881f-55dbd675d733',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 04 Jun 2021 21:59:52 GMT' ]);
