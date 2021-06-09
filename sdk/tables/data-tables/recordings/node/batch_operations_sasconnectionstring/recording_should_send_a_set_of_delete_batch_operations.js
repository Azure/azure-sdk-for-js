let nock = require('nock');

module.exports.hash = "5c9ccc57e9e838c39a5ac8e049fa0b69";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://joheredistorage2.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/Tables', {"TableName":"batchTableTestSASConnectionStringnode"})
  .query(true)
  .reply(409, {"odata.error":{"code":"TableAlreadyExists","message":{"lang":"en-US","value":"The table specified already exists.\nRequestId:2c0d85d9-7002-00b5-7fcd-5c8c40000000\nTime:2021-06-09T01:17:13.4071990Z"}}}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2c0d85d9-7002-00b5-7fcd-5c8c40000000',
  'x-ms-client-request-id',
  '5ac218ea-aa8a-4f87-a8eb-a410769ca4e8',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 09 Jun 2021 01:17:13 GMT'
]);

nock('https://joheredistorage2.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/$batch', "--batch_fakeId\r\ncontent-type: multipart/mixed; boundary=changeset_fakeId\r\n\r\n\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nDELETE https://joheredistorage2.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='batchTest',RowKey='1') HTTP/1.1\r\naccept: application/json;odata=minimalmetadata\r\ndataserviceversion: 3.0\r\nif-match: *\r\n\r\n\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nDELETE https://joheredistorage2.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='batchTest',RowKey='2') HTTP/1.1\r\naccept: application/json;odata=minimalmetadata\r\ndataserviceversion: 3.0\r\nif-match: *\r\n\r\n\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nDELETE https://joheredistorage2.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='batchTest',RowKey='3') HTTP/1.1\r\naccept: application/json;odata=minimalmetadata\r\ndataserviceversion: 3.0\r\nif-match: *\r\n\r\n\r\n--changeset_fakeId--\r\n--batch_fakeId--\r\n")
  .query(true)
  .reply(202, "--batchresponse_9cb1d17d-570e-47cf-af54-cdf09c9f55b6\r\nContent-Type: multipart/mixed; boundary=changesetresponse_2641df82-a8a1-4a98-abe4-781fd5352530\r\n\r\n--changesetresponse_2641df82-a8a1-4a98-abe4-781fd5352530\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nDataServiceVersion: 1.0;\r\n\r\n\r\n--changesetresponse_2641df82-a8a1-4a98-abe4-781fd5352530\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nDataServiceVersion: 1.0;\r\n\r\n\r\n--changesetresponse_2641df82-a8a1-4a98-abe4-781fd5352530\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nDataServiceVersion: 1.0;\r\n\r\n\r\n--changesetresponse_2641df82-a8a1-4a98-abe4-781fd5352530--\r\n--batchresponse_9cb1d17d-570e-47cf-af54-cdf09c9f55b6--\r\n", [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'multipart/mixed; boundary=batchresponse_9cb1d17d-570e-47cf-af54-cdf09c9f55b6',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2c0d85ec-7002-00b5-10cd-5c8c40000000',
  'x-ms-client-request-id',
  'a0173d94-5d52-4154-849d-a8a54e28abc9',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 09 Jun 2021 01:17:13 GMT'
]);
