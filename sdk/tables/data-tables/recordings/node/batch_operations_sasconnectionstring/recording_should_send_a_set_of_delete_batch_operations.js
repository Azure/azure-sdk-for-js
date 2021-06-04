let nock = require('nock');

module.exports.hash = "5c9ccc57e9e838c39a5ac8e049fa0b69";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://fakestorageaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/Tables', {"TableName":"batchTableTestSASConnectionStringnode"})
  .query(true)
  .reply(409, {"odata.error":{"code":"TableAlreadyExists","message":{"lang":"en-US","value":"The table specified already exists.\nRequestId:6e9d0e21-c002-0024-4c8c-5918f1000000\nTime:2021-06-04T21:59:54.0558735Z"}}}, [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6e9d0e21-c002-0024-4c8c-5918f1000000',
  'x-ms-client-request-id',
  '29ba676d-2fca-410a-a2be-7ec3e9499022',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 04 Jun 2021 21:59:53 GMT' ]);

nock('https://fakestorageaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/$batch', "--batch_fakeId\r\ncontent-type: multipart/mixed; boundary=changeset_fakeId\r\n\r\n\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nDELETE https://fakestorageaccount.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='batchTest',RowKey='1') HTTP/1.1\r\naccept: application/json;odata=minimalmetadata\r\ndataserviceversion: 3.0\r\nif-match: *\r\n\r\n\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nDELETE https://fakestorageaccount.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='batchTest',RowKey='2') HTTP/1.1\r\naccept: application/json;odata=minimalmetadata\r\ndataserviceversion: 3.0\r\nif-match: *\r\n\r\n\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nDELETE https://fakestorageaccount.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='batchTest',RowKey='3') HTTP/1.1\r\naccept: application/json;odata=minimalmetadata\r\ndataserviceversion: 3.0\r\nif-match: *\r\n\r\n\r\n--changeset_fakeId--\r\n--batch_fakeId\r\n")
  .query(true)
  .reply(202, "--batchresponse_0e4a8e7e-c06b-41f1-93e5-3a84801abeb2\r\nContent-Type: multipart/mixed; boundary=changesetresponse_9f199607-e070-4712-a44f-eb57a93bf295\r\n\r\n--changesetresponse_9f199607-e070-4712-a44f-eb57a93bf295\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nDataServiceVersion: 1.0;\r\n\r\n\r\n--changesetresponse_9f199607-e070-4712-a44f-eb57a93bf295\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nDataServiceVersion: 1.0;\r\n\r\n\r\n--changesetresponse_9f199607-e070-4712-a44f-eb57a93bf295\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nDataServiceVersion: 1.0;\r\n\r\n\r\n--changesetresponse_9f199607-e070-4712-a44f-eb57a93bf295--\r\n--batchresponse_0e4a8e7e-c06b-41f1-93e5-3a84801abeb2--\r\n", [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'multipart/mixed; boundary=batchresponse_0e4a8e7e-c06b-41f1-93e5-3a84801abeb2',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6e9d0e27-c002-0024-508c-5918f1000000',
  'x-ms-client-request-id',
  '5f6080ef-3c27-410c-a136-c743d49107de',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 04 Jun 2021 21:59:53 GMT' ]);
