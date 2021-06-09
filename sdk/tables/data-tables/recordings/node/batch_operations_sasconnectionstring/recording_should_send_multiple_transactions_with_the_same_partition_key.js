let nock = require('nock');

module.exports.hash = "becb76946bc37fae7579f4e894e576cc";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/Tables', {"TableName":"batchTableTestSASConnectionStringnode"})
  .query(true)
  .reply(409, {"odata.error":{"code":"TableAlreadyExists","message":{"lang":"en-US","value":"The table specified already exists.\nRequestId:654ef4c1-9002-001e-7a4b-5d5b52000000\nTime:2021-06-09T16:21:48.8378041Z"}}}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '654ef4c1-9002-001e-7a4b-5d5b52000000',
  'x-ms-client-request-id',
  'ca0c0fea-f0a2-477a-b81e-0d1143f5a62e',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 09 Jun 2021 16:21:48 GMT'
]);

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/$batch', "--batch_fakeId\r\ncontent-type: multipart/mixed; boundary=changeset_fakeId\r\n\r\n\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPOST https://fakeaccount.table.core.windows.net/batchTableTestSASConnectionStringnode HTTP/1.1\r\ncontent-type: application/json;odata=nometadata\r\naccept: application/json;odata=minimalmetadata\r\ndataserviceversion: 3.0\r\nprefer: return-no-content\r\n\r\n\r\n{\"PartitionKey\":\"multiBatch1\",\"RowKey\":\"r1\",\"value\":\"1\"}\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPOST https://fakeaccount.table.core.windows.net/batchTableTestSASConnectionStringnode HTTP/1.1\r\ncontent-type: application/json;odata=nometadata\r\naccept: application/json;odata=minimalmetadata\r\ndataserviceversion: 3.0\r\nprefer: return-no-content\r\n\r\n\r\n{\"PartitionKey\":\"multiBatch1\",\"RowKey\":\"r2\",\"value\":\"2\"}\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPOST https://fakeaccount.table.core.windows.net/batchTableTestSASConnectionStringnode HTTP/1.1\r\ncontent-type: application/json;odata=nometadata\r\naccept: application/json;odata=minimalmetadata\r\ndataserviceversion: 3.0\r\nprefer: return-no-content\r\n\r\n\r\n{\"PartitionKey\":\"multiBatch1\",\"RowKey\":\"r3\",\"value\":\"3\"}\r\n--changeset_fakeId--\r\n--batch_fakeId--\r\n")
  .query(true)
  .reply(202, "--batchresponse_e02a9f38-3f8f-4089-8164-834e5b01ff5c\r\nContent-Type: multipart/mixed; boundary=changesetresponse_ed8546e0-7f66-4457-b65d-29950b8cca56\r\n\r\n--changesetresponse_ed8546e0-7f66-4457-b65d-29950b8cca56\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nPreference-Applied: return-no-content\r\nDataServiceVersion: 3.0;\r\nLocation: https://fakeaccount.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='multiBatch1',RowKey='r1')\r\nDataServiceId: https://fakeaccount.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='multiBatch1',RowKey='r1')\r\nETag: W/\"datetime'2021-06-09T16%3A21%3A48.8698269Z'\"\r\n\r\n\r\n--changesetresponse_ed8546e0-7f66-4457-b65d-29950b8cca56\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nPreference-Applied: return-no-content\r\nDataServiceVersion: 3.0;\r\nLocation: https://fakeaccount.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='multiBatch1',RowKey='r2')\r\nDataServiceId: https://fakeaccount.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='multiBatch1',RowKey='r2')\r\nETag: W/\"datetime'2021-06-09T16%3A21%3A48.8698269Z'\"\r\n\r\n\r\n--changesetresponse_ed8546e0-7f66-4457-b65d-29950b8cca56\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nPreference-Applied: return-no-content\r\nDataServiceVersion: 3.0;\r\nLocation: https://fakeaccount.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='multiBatch1',RowKey='r3')\r\nDataServiceId: https://fakeaccount.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='multiBatch1',RowKey='r3')\r\nETag: W/\"datetime'2021-06-09T16%3A21%3A48.8698269Z'\"\r\n\r\n\r\n--changesetresponse_ed8546e0-7f66-4457-b65d-29950b8cca56--\r\n--batchresponse_e02a9f38-3f8f-4089-8164-834e5b01ff5c--\r\n", [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'multipart/mixed; boundary=batchresponse_e02a9f38-3f8f-4089-8164-834e5b01ff5c',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '654ef4ca-9002-001e-034b-5d5b52000000',
  'x-ms-client-request-id',
  '408974f2-df46-4b91-9cc3-b4ac420b66fe',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 09 Jun 2021 16:21:48 GMT'
]);

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/$batch', "--batch_fakeId\r\ncontent-type: multipart/mixed; boundary=changeset_fakeId\r\n\r\n\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPOST https://fakeaccount.table.core.windows.net/batchTableTestSASConnectionStringnode HTTP/1.1\r\ncontent-type: application/json;odata=nometadata\r\naccept: application/json;odata=minimalmetadata\r\ndataserviceversion: 3.0\r\nprefer: return-no-content\r\n\r\n\r\n{\"PartitionKey\":\"multiBatch1\",\"RowKey\":\"r4\",\"value\":\"4\"}\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPOST https://fakeaccount.table.core.windows.net/batchTableTestSASConnectionStringnode HTTP/1.1\r\ncontent-type: application/json;odata=nometadata\r\naccept: application/json;odata=minimalmetadata\r\ndataserviceversion: 3.0\r\nprefer: return-no-content\r\n\r\n\r\n{\"PartitionKey\":\"multiBatch1\",\"RowKey\":\"r5\",\"value\":\"5\"}\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPOST https://fakeaccount.table.core.windows.net/batchTableTestSASConnectionStringnode HTTP/1.1\r\ncontent-type: application/json;odata=nometadata\r\naccept: application/json;odata=minimalmetadata\r\ndataserviceversion: 3.0\r\nprefer: return-no-content\r\n\r\n\r\n{\"PartitionKey\":\"multiBatch1\",\"RowKey\":\"r6\",\"value\":\"6\"}\r\n--changeset_fakeId--\r\n--batch_fakeId--\r\n")
  .query(true)
  .reply(202, "--batchresponse_790fc7e9-9d42-40d1-a211-d08d60162812\r\nContent-Type: multipart/mixed; boundary=changesetresponse_a219b0ee-39cf-4c0c-bdda-854319c6fa17\r\n\r\n--changesetresponse_a219b0ee-39cf-4c0c-bdda-854319c6fa17\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nPreference-Applied: return-no-content\r\nDataServiceVersion: 3.0;\r\nLocation: https://fakeaccount.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='multiBatch1',RowKey='r4')\r\nDataServiceId: https://fakeaccount.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='multiBatch1',RowKey='r4')\r\nETag: W/\"datetime'2021-06-09T16%3A21%3A48.92987Z'\"\r\n\r\n\r\n--changesetresponse_a219b0ee-39cf-4c0c-bdda-854319c6fa17\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nPreference-Applied: return-no-content\r\nDataServiceVersion: 3.0;\r\nLocation: https://fakeaccount.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='multiBatch1',RowKey='r5')\r\nDataServiceId: https://fakeaccount.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='multiBatch1',RowKey='r5')\r\nETag: W/\"datetime'2021-06-09T16%3A21%3A48.92987Z'\"\r\n\r\n\r\n--changesetresponse_a219b0ee-39cf-4c0c-bdda-854319c6fa17\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nPreference-Applied: return-no-content\r\nDataServiceVersion: 3.0;\r\nLocation: https://fakeaccount.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='multiBatch1',RowKey='r6')\r\nDataServiceId: https://fakeaccount.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='multiBatch1',RowKey='r6')\r\nETag: W/\"datetime'2021-06-09T16%3A21%3A48.92987Z'\"\r\n\r\n\r\n--changesetresponse_a219b0ee-39cf-4c0c-bdda-854319c6fa17--\r\n--batchresponse_790fc7e9-9d42-40d1-a211-d08d60162812--\r\n", [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'multipart/mixed; boundary=batchresponse_790fc7e9-9d42-40d1-a211-d08d60162812',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '654ef4d9-9002-001e-104b-5d5b52000000',
  'x-ms-client-request-id',
  'e0876b4d-c2f9-49ad-957e-9b3e528fc79f',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 09 Jun 2021 16:21:48 GMT'
]);

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .get('/batchTableTestSASConnectionStringnode()')
  .query(true)
  .reply(200, {"odata.metadata":"https://fakeaccount.table.core.windows.net/$metadata#batchTableTestSASConnectionStringnode","value":[{"odata.etag":"W/\"datetime'2021-06-09T16%3A21%3A48.8698269Z'\"","PartitionKey":"multiBatch1","RowKey":"r1","Timestamp":"2021-06-09T16:21:48.8698269Z","value":"1"},{"odata.etag":"W/\"datetime'2021-06-09T16%3A21%3A48.8698269Z'\"","PartitionKey":"multiBatch1","RowKey":"r2","Timestamp":"2021-06-09T16:21:48.8698269Z","value":"2"},{"odata.etag":"W/\"datetime'2021-06-09T16%3A21%3A48.8698269Z'\"","PartitionKey":"multiBatch1","RowKey":"r3","Timestamp":"2021-06-09T16:21:48.8698269Z","value":"3"},{"odata.etag":"W/\"datetime'2021-06-09T16%3A21%3A48.92987Z'\"","PartitionKey":"multiBatch1","RowKey":"r4","Timestamp":"2021-06-09T16:21:48.92987Z","value":"4"},{"odata.etag":"W/\"datetime'2021-06-09T16%3A21%3A48.92987Z'\"","PartitionKey":"multiBatch1","RowKey":"r5","Timestamp":"2021-06-09T16:21:48.92987Z","value":"5"},{"odata.etag":"W/\"datetime'2021-06-09T16%3A21%3A48.92987Z'\"","PartitionKey":"multiBatch1","RowKey":"r6","Timestamp":"2021-06-09T16:21:48.92987Z","value":"6"}]}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '654ef4ef-9002-001e-234b-5d5b52000000',
  'x-ms-client-request-id',
  'bc87a2af-66f4-4fab-a9d1-31df0db49bc7',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,X-Content-Type-Options,Cache-Control,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 09 Jun 2021 16:21:48 GMT'
]);
