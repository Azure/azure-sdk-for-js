let nock = require('nock');

module.exports.hash = "c2facf3a7e0d5911aa36b9d39d9eb8cf";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/Tables', {"TableName":"batchTableTestSASConnectionStringnode"})
  .query(true)
  .reply(409, {"odata.error":{"code":"TableAlreadyExists","message":{"lang":"en-US","value":"The table specified already exists.\nRequestId:5af808de-c002-000d-1ddf-c16eb3000000\nTime:2021-10-15T16:13:24.0584075Z"}}}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5af808de-c002-000d-1ddf-c16eb3000000',
  'x-ms-client-request-id',
  'f049d569-b2ec-4b5c-8936-55f6f01014d2',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 15 Oct 2021 16:13:23 GMT'
]);

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/$batch', "--batch_fakeId\r\ncontent-type: multipart/mixed; boundary=changeset_fakeId\r\n\r\n\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPOST https://fakeaccount.table.core.windows.net/batchTableTestSASConnectionStringnode HTTP/1.1\r\ncontent-type: application/json;odata=nometadata\r\naccept: application/json;odata=minimalmetadata\r\ndataserviceversion: 3.0\r\nprefer: return-no-content\r\n\r\n\r\n{\"PartitionKey\":\"multiBatch1\",\"RowKey\":\"r1\",\"value\":\"1\"}\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPOST https://fakeaccount.table.core.windows.net/batchTableTestSASConnectionStringnode HTTP/1.1\r\ncontent-type: application/json;odata=nometadata\r\naccept: application/json;odata=minimalmetadata\r\ndataserviceversion: 3.0\r\nprefer: return-no-content\r\n\r\n\r\n{\"PartitionKey\":\"multiBatch1\",\"RowKey\":\"r2\",\"value\":\"2\"}\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPOST https://fakeaccount.table.core.windows.net/batchTableTestSASConnectionStringnode HTTP/1.1\r\ncontent-type: application/json;odata=nometadata\r\naccept: application/json;odata=minimalmetadata\r\ndataserviceversion: 3.0\r\nprefer: return-no-content\r\n\r\n\r\n{\"PartitionKey\":\"multiBatch1\",\"RowKey\":\"r3\",\"value\":\"3\"}\r\n--changeset_fakeId--\r\n--batch_fakeId--\r\n")
  .query(true)
  .reply(202, "--batchresponse_b043601e-e784-496d-8276-4c447311879d\r\nContent-Type: multipart/mixed; boundary=changesetresponse_f44ac90e-3817-46b4-849d-0fbb548c586f\r\n\r\n--changesetresponse_f44ac90e-3817-46b4-849d-0fbb548c586f\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nPreference-Applied: return-no-content\r\nDataServiceVersion: 3.0;\r\nLocation: https://fakeaccount.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='multiBatch1',RowKey='r1')\r\nDataServiceId: https://fakeaccount.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='multiBatch1',RowKey='r1')\r\nETag: W/\"datetime'2021-10-15T16%3A13%3A24.0914302Z'\"\r\n\r\n\r\n--changesetresponse_f44ac90e-3817-46b4-849d-0fbb548c586f\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nPreference-Applied: return-no-content\r\nDataServiceVersion: 3.0;\r\nLocation: https://fakeaccount.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='multiBatch1',RowKey='r2')\r\nDataServiceId: https://fakeaccount.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='multiBatch1',RowKey='r2')\r\nETag: W/\"datetime'2021-10-15T16%3A13%3A24.0914302Z'\"\r\n\r\n\r\n--changesetresponse_f44ac90e-3817-46b4-849d-0fbb548c586f\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nPreference-Applied: return-no-content\r\nDataServiceVersion: 3.0;\r\nLocation: https://fakeaccount.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='multiBatch1',RowKey='r3')\r\nDataServiceId: https://fakeaccount.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='multiBatch1',RowKey='r3')\r\nETag: W/\"datetime'2021-10-15T16%3A13%3A24.0914302Z'\"\r\n\r\n\r\n--changesetresponse_f44ac90e-3817-46b4-849d-0fbb548c586f--\r\n--batchresponse_b043601e-e784-496d-8276-4c447311879d--\r\n", [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'multipart/mixed; boundary=batchresponse_b043601e-e784-496d-8276-4c447311879d',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5af808f7-c002-000d-33df-c16eb3000000',
  'x-ms-client-request-id',
  '5b88ef02-3d8d-4716-84c8-d75e24479ebe',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 15 Oct 2021 16:13:23 GMT'
]);

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/$batch', "--batch_fakeId\r\ncontent-type: multipart/mixed; boundary=changeset_fakeId\r\n\r\n\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPOST https://fakeaccount.table.core.windows.net/batchTableTestSASConnectionStringnode HTTP/1.1\r\ncontent-type: application/json;odata=nometadata\r\naccept: application/json;odata=minimalmetadata\r\ndataserviceversion: 3.0\r\nprefer: return-no-content\r\n\r\n\r\n{\"PartitionKey\":\"multiBatch1\",\"RowKey\":\"r4\",\"value\":\"4\"}\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPOST https://fakeaccount.table.core.windows.net/batchTableTestSASConnectionStringnode HTTP/1.1\r\ncontent-type: application/json;odata=nometadata\r\naccept: application/json;odata=minimalmetadata\r\ndataserviceversion: 3.0\r\nprefer: return-no-content\r\n\r\n\r\n{\"PartitionKey\":\"multiBatch1\",\"RowKey\":\"r5\",\"value\":\"5\"}\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPOST https://fakeaccount.table.core.windows.net/batchTableTestSASConnectionStringnode HTTP/1.1\r\ncontent-type: application/json;odata=nometadata\r\naccept: application/json;odata=minimalmetadata\r\ndataserviceversion: 3.0\r\nprefer: return-no-content\r\n\r\n\r\n{\"PartitionKey\":\"multiBatch1\",\"RowKey\":\"r6\",\"value\":\"6\"}\r\n--changeset_fakeId--\r\n--batch_fakeId--\r\n")
  .query(true)
  .reply(202, "--batchresponse_d38e3377-da58-4149-9a7d-713e00368c5e\r\nContent-Type: multipart/mixed; boundary=changesetresponse_a100fb89-5e4a-43d7-97ce-f241d2fca6b2\r\n\r\n--changesetresponse_a100fb89-5e4a-43d7-97ce-f241d2fca6b2\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nPreference-Applied: return-no-content\r\nDataServiceVersion: 3.0;\r\nLocation: https://fakeaccount.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='multiBatch1',RowKey='r4')\r\nDataServiceId: https://fakeaccount.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='multiBatch1',RowKey='r4')\r\nETag: W/\"datetime'2021-10-15T16%3A13%3A24.1614792Z'\"\r\n\r\n\r\n--changesetresponse_a100fb89-5e4a-43d7-97ce-f241d2fca6b2\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nPreference-Applied: return-no-content\r\nDataServiceVersion: 3.0;\r\nLocation: https://fakeaccount.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='multiBatch1',RowKey='r5')\r\nDataServiceId: https://fakeaccount.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='multiBatch1',RowKey='r5')\r\nETag: W/\"datetime'2021-10-15T16%3A13%3A24.1614792Z'\"\r\n\r\n\r\n--changesetresponse_a100fb89-5e4a-43d7-97ce-f241d2fca6b2\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nPreference-Applied: return-no-content\r\nDataServiceVersion: 3.0;\r\nLocation: https://fakeaccount.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='multiBatch1',RowKey='r6')\r\nDataServiceId: https://fakeaccount.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='multiBatch1',RowKey='r6')\r\nETag: W/\"datetime'2021-10-15T16%3A13%3A24.1614792Z'\"\r\n\r\n\r\n--changesetresponse_a100fb89-5e4a-43d7-97ce-f241d2fca6b2--\r\n--batchresponse_d38e3377-da58-4149-9a7d-713e00368c5e--\r\n", [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'multipart/mixed; boundary=batchresponse_d38e3377-da58-4149-9a7d-713e00368c5e',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5af80926-c002-000d-60df-c16eb3000000',
  'x-ms-client-request-id',
  '94624ffc-9ad9-409b-b09c-a6f30d3b02ff',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 15 Oct 2021 16:13:23 GMT'
]);

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .get('/batchTableTestSASConnectionStringnode()')
  .query(true)
  .reply(200, {"odata.metadata":"https://fakeaccount.table.core.windows.net/$metadata#batchTableTestSASConnectionStringnode","value":[{"odata.etag":"W/\"datetime'2021-10-15T16%3A13%3A24.0914302Z'\"","PartitionKey":"multiBatch1","RowKey":"r1","Timestamp":"2021-10-15T16:13:24.0914302Z","value":"1"},{"odata.etag":"W/\"datetime'2021-10-15T16%3A13%3A24.0914302Z'\"","PartitionKey":"multiBatch1","RowKey":"r2","Timestamp":"2021-10-15T16:13:24.0914302Z","value":"2"},{"odata.etag":"W/\"datetime'2021-10-15T16%3A13%3A24.0914302Z'\"","PartitionKey":"multiBatch1","RowKey":"r3","Timestamp":"2021-10-15T16:13:24.0914302Z","value":"3"},{"odata.etag":"W/\"datetime'2021-10-15T16%3A13%3A24.1614792Z'\"","PartitionKey":"multiBatch1","RowKey":"r4","Timestamp":"2021-10-15T16:13:24.1614792Z","value":"4"},{"odata.etag":"W/\"datetime'2021-10-15T16%3A13%3A24.1614792Z'\"","PartitionKey":"multiBatch1","RowKey":"r5","Timestamp":"2021-10-15T16:13:24.1614792Z","value":"5"},{"odata.etag":"W/\"datetime'2021-10-15T16%3A13%3A24.1614792Z'\"","PartitionKey":"multiBatch1","RowKey":"r6","Timestamp":"2021-10-15T16:13:24.1614792Z","value":"6"}]}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5af8095b-c002-000d-14df-c16eb3000000',
  'x-ms-client-request-id',
  'adceb73b-c5f4-4b3c-ac6e-59b5bb681ddf',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,X-Content-Type-Options,Cache-Control,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 15 Oct 2021 16:13:23 GMT'
]);
