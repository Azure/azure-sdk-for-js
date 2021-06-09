let nock = require('nock');

module.exports.hash = "becb76946bc37fae7579f4e894e576cc";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://joheredistorage2.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/Tables', {"TableName":"batchTableTestSASConnectionStringnode"})
  .query(true)
  .reply(409, {"odata.error":{"code":"TableAlreadyExists","message":{"lang":"en-US","value":"The table specified already exists.\nRequestId:2c0d8629-7002-00b5-48cd-5c8c40000000\nTime:2021-06-09T01:17:13.6483721Z"}}}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2c0d8629-7002-00b5-48cd-5c8c40000000',
  'x-ms-client-request-id',
  '25b240ed-79ee-4565-babf-7b313d6c8403',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 09 Jun 2021 01:17:13 GMT'
]);

nock('https://joheredistorage2.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/$batch', "--batch_fakeId\r\ncontent-type: multipart/mixed; boundary=changeset_fakeId\r\n\r\n\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPOST https://joheredistorage2.table.core.windows.net/batchTableTestSASConnectionStringnode HTTP/1.1\r\ncontent-type: application/json;odata=nometadata\r\naccept: application/json;odata=minimalmetadata\r\ndataserviceversion: 3.0\r\nprefer: return-no-content\r\n\r\n\r\n{\"PartitionKey\":\"multiBatch1\",\"RowKey\":\"r1\",\"value\":\"1\"}\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPOST https://joheredistorage2.table.core.windows.net/batchTableTestSASConnectionStringnode HTTP/1.1\r\ncontent-type: application/json;odata=nometadata\r\naccept: application/json;odata=minimalmetadata\r\ndataserviceversion: 3.0\r\nprefer: return-no-content\r\n\r\n\r\n{\"PartitionKey\":\"multiBatch1\",\"RowKey\":\"r2\",\"value\":\"2\"}\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPOST https://joheredistorage2.table.core.windows.net/batchTableTestSASConnectionStringnode HTTP/1.1\r\ncontent-type: application/json;odata=nometadata\r\naccept: application/json;odata=minimalmetadata\r\ndataserviceversion: 3.0\r\nprefer: return-no-content\r\n\r\n\r\n{\"PartitionKey\":\"multiBatch1\",\"RowKey\":\"r3\",\"value\":\"3\"}\r\n--changeset_fakeId--\r\n--batch_fakeId--\r\n")
  .query(true)
  .reply(202, "--batchresponse_42ff522f-f400-4d61-97ce-9ff19ff69f53\r\nContent-Type: multipart/mixed; boundary=changesetresponse_c7d3768d-bec8-4770-9f64-b7d6bd31cfd4\r\n\r\n--changesetresponse_c7d3768d-bec8-4770-9f64-b7d6bd31cfd4\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nPreference-Applied: return-no-content\r\nDataServiceVersion: 3.0;\r\nLocation: https://joheredistorage2.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='multiBatch1',RowKey='r1')\r\nDataServiceId: https://joheredistorage2.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='multiBatch1',RowKey='r1')\r\nETag: W/\"datetime'2021-06-09T01%3A17%3A13.7034123Z'\"\r\n\r\n\r\n--changesetresponse_c7d3768d-bec8-4770-9f64-b7d6bd31cfd4\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nPreference-Applied: return-no-content\r\nDataServiceVersion: 3.0;\r\nLocation: https://joheredistorage2.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='multiBatch1',RowKey='r2')\r\nDataServiceId: https://joheredistorage2.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='multiBatch1',RowKey='r2')\r\nETag: W/\"datetime'2021-06-09T01%3A17%3A13.7034123Z'\"\r\n\r\n\r\n--changesetresponse_c7d3768d-bec8-4770-9f64-b7d6bd31cfd4\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nPreference-Applied: return-no-content\r\nDataServiceVersion: 3.0;\r\nLocation: https://joheredistorage2.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='multiBatch1',RowKey='r3')\r\nDataServiceId: https://joheredistorage2.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='multiBatch1',RowKey='r3')\r\nETag: W/\"datetime'2021-06-09T01%3A17%3A13.7034123Z'\"\r\n\r\n\r\n--changesetresponse_c7d3768d-bec8-4770-9f64-b7d6bd31cfd4--\r\n--batchresponse_42ff522f-f400-4d61-97ce-9ff19ff69f53--\r\n", [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'multipart/mixed; boundary=batchresponse_42ff522f-f400-4d61-97ce-9ff19ff69f53',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2c0d8638-7002-00b5-57cd-5c8c40000000',
  'x-ms-client-request-id',
  '9c31a31a-e5fd-4ecd-9c3e-fb7943a61be6',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 09 Jun 2021 01:17:13 GMT'
]);

nock('https://joheredistorage2.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/$batch', "--batch_fakeId\r\ncontent-type: multipart/mixed; boundary=changeset_fakeId\r\n\r\n\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPOST https://joheredistorage2.table.core.windows.net/batchTableTestSASConnectionStringnode HTTP/1.1\r\ncontent-type: application/json;odata=nometadata\r\naccept: application/json;odata=minimalmetadata\r\ndataserviceversion: 3.0\r\nprefer: return-no-content\r\n\r\n\r\n{\"PartitionKey\":\"multiBatch1\",\"RowKey\":\"r4\",\"value\":\"4\"}\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPOST https://joheredistorage2.table.core.windows.net/batchTableTestSASConnectionStringnode HTTP/1.1\r\ncontent-type: application/json;odata=nometadata\r\naccept: application/json;odata=minimalmetadata\r\ndataserviceversion: 3.0\r\nprefer: return-no-content\r\n\r\n\r\n{\"PartitionKey\":\"multiBatch1\",\"RowKey\":\"r5\",\"value\":\"5\"}\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPOST https://joheredistorage2.table.core.windows.net/batchTableTestSASConnectionStringnode HTTP/1.1\r\ncontent-type: application/json;odata=nometadata\r\naccept: application/json;odata=minimalmetadata\r\ndataserviceversion: 3.0\r\nprefer: return-no-content\r\n\r\n\r\n{\"PartitionKey\":\"multiBatch1\",\"RowKey\":\"r6\",\"value\":\"6\"}\r\n--changeset_fakeId--\r\n--batch_fakeId--\r\n")
  .query(true)
  .reply(202, "--batchresponse_26eb6b6d-9248-42cd-ad4d-c33b8b10232e\r\nContent-Type: multipart/mixed; boundary=changesetresponse_e3fd3b64-fb0e-4720-9483-98bf0236ea12\r\n\r\n--changesetresponse_e3fd3b64-fb0e-4720-9483-98bf0236ea12\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nPreference-Applied: return-no-content\r\nDataServiceVersion: 3.0;\r\nLocation: https://joheredistorage2.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='multiBatch1',RowKey='r4')\r\nDataServiceId: https://joheredistorage2.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='multiBatch1',RowKey='r4')\r\nETag: W/\"datetime'2021-06-09T01%3A17%3A13.7794673Z'\"\r\n\r\n\r\n--changesetresponse_e3fd3b64-fb0e-4720-9483-98bf0236ea12\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nPreference-Applied: return-no-content\r\nDataServiceVersion: 3.0;\r\nLocation: https://joheredistorage2.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='multiBatch1',RowKey='r5')\r\nDataServiceId: https://joheredistorage2.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='multiBatch1',RowKey='r5')\r\nETag: W/\"datetime'2021-06-09T01%3A17%3A13.7794673Z'\"\r\n\r\n\r\n--changesetresponse_e3fd3b64-fb0e-4720-9483-98bf0236ea12\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nPreference-Applied: return-no-content\r\nDataServiceVersion: 3.0;\r\nLocation: https://joheredistorage2.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='multiBatch1',RowKey='r6')\r\nDataServiceId: https://joheredistorage2.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='multiBatch1',RowKey='r6')\r\nETag: W/\"datetime'2021-06-09T01%3A17%3A13.7794673Z'\"\r\n\r\n\r\n--changesetresponse_e3fd3b64-fb0e-4720-9483-98bf0236ea12--\r\n--batchresponse_26eb6b6d-9248-42cd-ad4d-c33b8b10232e--\r\n", [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'multipart/mixed; boundary=batchresponse_26eb6b6d-9248-42cd-ad4d-c33b8b10232e',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2c0d8649-7002-00b5-67cd-5c8c40000000',
  'x-ms-client-request-id',
  '942506a3-7833-4012-9e1a-c4b5b93327a9',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 09 Jun 2021 01:17:13 GMT'
]);

nock('https://joheredistorage2.table.core.windows.net:443', {"encodedQueryParams":true})
  .get('/batchTableTestSASConnectionStringnode()')
  .query(true)
  .reply(200, {"odata.metadata":"https://joheredistorage2.table.core.windows.net/$metadata#batchTableTestSASConnectionStringnode","value":[{"odata.etag":"W/\"datetime'2021-06-09T01%3A17%3A13.7034123Z'\"","PartitionKey":"multiBatch1","RowKey":"r1","Timestamp":"2021-06-09T01:17:13.7034123Z","value":"1"},{"odata.etag":"W/\"datetime'2021-06-09T01%3A17%3A13.7034123Z'\"","PartitionKey":"multiBatch1","RowKey":"r2","Timestamp":"2021-06-09T01:17:13.7034123Z","value":"2"},{"odata.etag":"W/\"datetime'2021-06-09T01%3A17%3A13.7034123Z'\"","PartitionKey":"multiBatch1","RowKey":"r3","Timestamp":"2021-06-09T01:17:13.7034123Z","value":"3"},{"odata.etag":"W/\"datetime'2021-06-09T01%3A17%3A13.7794673Z'\"","PartitionKey":"multiBatch1","RowKey":"r4","Timestamp":"2021-06-09T01:17:13.7794673Z","value":"4"},{"odata.etag":"W/\"datetime'2021-06-09T01%3A17%3A13.7794673Z'\"","PartitionKey":"multiBatch1","RowKey":"r5","Timestamp":"2021-06-09T01:17:13.7794673Z","value":"5"},{"odata.etag":"W/\"datetime'2021-06-09T01%3A17%3A13.7794673Z'\"","PartitionKey":"multiBatch1","RowKey":"r6","Timestamp":"2021-06-09T01:17:13.7794673Z","value":"6"}]}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2c0d8672-7002-00b5-0bcd-5c8c40000000',
  'x-ms-client-request-id',
  'bdb69fb7-954f-45ae-9ff5-77e50c3ce38e',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,X-Content-Type-Options,Cache-Control,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 09 Jun 2021 01:17:13 GMT'
]);
