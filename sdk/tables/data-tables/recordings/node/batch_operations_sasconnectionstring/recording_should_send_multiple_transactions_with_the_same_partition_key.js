let nock = require('nock');

module.exports.hash = "becb76946bc37fae7579f4e894e576cc";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://fakestorageaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/Tables', {"TableName":"batchTableTestSASConnectionStringnode"})
  .query(true)
  .reply(409, {"odata.error":{"code":"TableAlreadyExists","message":{"lang":"en-US","value":"The table specified already exists.\nRequestId:6e9d0e37-c002-0024-5d8c-5918f1000000\nTime:2021-06-04T21:59:54.1969742Z"}}}, [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6e9d0e37-c002-0024-5d8c-5918f1000000',
  'x-ms-client-request-id',
  '14a26608-6061-47e5-9102-8c9dfbec8cc6',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 04 Jun 2021 21:59:53 GMT' ]);

nock('https://fakestorageaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/$batch', "--batch_fakeId\r\ncontent-type: multipart/mixed; boundary=changeset_fakeId\r\n\r\n\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPOST https://fakestorageaccount.table.core.windows.net/batchTableTestSASConnectionStringnode HTTP/1.1\r\ncontent-type: application/json;odata=nometadata\r\naccept: application/json;odata=minimalmetadata\r\ndataserviceversion: 3.0\r\nprefer: return-no-content\r\n\r\n\r\n{\"PartitionKey\":\"multiBatch1\",\"RowKey\":\"r1\",\"value\":\"1\"}\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPOST https://fakestorageaccount.table.core.windows.net/batchTableTestSASConnectionStringnode HTTP/1.1\r\ncontent-type: application/json;odata=nometadata\r\naccept: application/json;odata=minimalmetadata\r\ndataserviceversion: 3.0\r\nprefer: return-no-content\r\n\r\n\r\n{\"PartitionKey\":\"multiBatch1\",\"RowKey\":\"r2\",\"value\":\"2\"}\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPOST https://fakestorageaccount.table.core.windows.net/batchTableTestSASConnectionStringnode HTTP/1.1\r\ncontent-type: application/json;odata=nometadata\r\naccept: application/json;odata=minimalmetadata\r\ndataserviceversion: 3.0\r\nprefer: return-no-content\r\n\r\n\r\n{\"PartitionKey\":\"multiBatch1\",\"RowKey\":\"r3\",\"value\":\"3\"}\r\n--changeset_fakeId--\r\n--batch_fakeId--\r\n")
  .query(true)
  .reply(202, "--batchresponse_e899eb63-a09a-4bb9-84c0-0d1f5863e2be\r\nContent-Type: multipart/mixed; boundary=changesetresponse_7d94efc8-866f-4734-a300-76141ef54bc7\r\n\r\n--changesetresponse_7d94efc8-866f-4734-a300-76141ef54bc7\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nPreference-Applied: return-no-content\r\nDataServiceVersion: 3.0;\r\nLocation: https://fakestorageaccount.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='multiBatch1',RowKey='r1')\r\nDataServiceId: https://fakestorageaccount.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='multiBatch1',RowKey='r1')\r\nETag: W/\"datetime'2021-06-04T21%3A59%3A54.2560157Z'\"\r\n\r\n\r\n--changesetresponse_7d94efc8-866f-4734-a300-76141ef54bc7\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nPreference-Applied: return-no-content\r\nDataServiceVersion: 3.0;\r\nLocation: https://fakestorageaccount.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='multiBatch1',RowKey='r2')\r\nDataServiceId: https://fakestorageaccount.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='multiBatch1',RowKey='r2')\r\nETag: W/\"datetime'2021-06-04T21%3A59%3A54.2560157Z'\"\r\n\r\n\r\n--changesetresponse_7d94efc8-866f-4734-a300-76141ef54bc7\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nPreference-Applied: return-no-content\r\nDataServiceVersion: 3.0;\r\nLocation: https://fakestorageaccount.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='multiBatch1',RowKey='r3')\r\nDataServiceId: https://fakestorageaccount.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='multiBatch1',RowKey='r3')\r\nETag: W/\"datetime'2021-06-04T21%3A59%3A54.2560157Z'\"\r\n\r\n\r\n--changesetresponse_7d94efc8-866f-4734-a300-76141ef54bc7--\r\n--batchresponse_e899eb63-a09a-4bb9-84c0-0d1f5863e2be--\r\n", [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'multipart/mixed; boundary=batchresponse_e899eb63-a09a-4bb9-84c0-0d1f5863e2be',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6e9d0e41-c002-0024-678c-5918f1000000',
  'x-ms-client-request-id',
  '6b85023d-3bc5-4b67-9852-133c5e724546',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 04 Jun 2021 21:59:53 GMT' ]);

nock('https://fakestorageaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/$batch', "--batch_fakeId\r\ncontent-type: multipart/mixed; boundary=changeset_fakeId\r\n\r\n\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPOST https://fakestorageaccount.table.core.windows.net/batchTableTestSASConnectionStringnode HTTP/1.1\r\ncontent-type: application/json;odata=nometadata\r\naccept: application/json;odata=minimalmetadata\r\ndataserviceversion: 3.0\r\nprefer: return-no-content\r\n\r\n\r\n{\"PartitionKey\":\"multiBatch1\",\"RowKey\":\"r4\",\"value\":\"4\"}\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPOST https://fakestorageaccount.table.core.windows.net/batchTableTestSASConnectionStringnode HTTP/1.1\r\ncontent-type: application/json;odata=nometadata\r\naccept: application/json;odata=minimalmetadata\r\ndataserviceversion: 3.0\r\nprefer: return-no-content\r\n\r\n\r\n{\"PartitionKey\":\"multiBatch1\",\"RowKey\":\"r5\",\"value\":\"5\"}\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPOST https://fakestorageaccount.table.core.windows.net/batchTableTestSASConnectionStringnode HTTP/1.1\r\ncontent-type: application/json;odata=nometadata\r\naccept: application/json;odata=minimalmetadata\r\ndataserviceversion: 3.0\r\nprefer: return-no-content\r\n\r\n\r\n{\"PartitionKey\":\"multiBatch1\",\"RowKey\":\"r6\",\"value\":\"6\"}\r\n--changeset_fakeId--\r\n--batch_fakeId--\r\n")
  .query(true)
  .reply(202, "--batchresponse_4f067297-7a14-46e6-977c-884b6a791b86\r\nContent-Type: multipart/mixed; boundary=changesetresponse_819351da-b71f-4b3a-ac27-a645c59f62d5\r\n\r\n--changesetresponse_819351da-b71f-4b3a-ac27-a645c59f62d5\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nPreference-Applied: return-no-content\r\nDataServiceVersion: 3.0;\r\nLocation: https://fakestorageaccount.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='multiBatch1',RowKey='r4')\r\nDataServiceId: https://fakestorageaccount.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='multiBatch1',RowKey='r4')\r\nETag: W/\"datetime'2021-06-04T21%3A59%3A54.3140569Z'\"\r\n\r\n\r\n--changesetresponse_819351da-b71f-4b3a-ac27-a645c59f62d5\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nPreference-Applied: return-no-content\r\nDataServiceVersion: 3.0;\r\nLocation: https://fakestorageaccount.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='multiBatch1',RowKey='r5')\r\nDataServiceId: https://fakestorageaccount.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='multiBatch1',RowKey='r5')\r\nETag: W/\"datetime'2021-06-04T21%3A59%3A54.3140569Z'\"\r\n\r\n\r\n--changesetresponse_819351da-b71f-4b3a-ac27-a645c59f62d5\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nPreference-Applied: return-no-content\r\nDataServiceVersion: 3.0;\r\nLocation: https://fakestorageaccount.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='multiBatch1',RowKey='r6')\r\nDataServiceId: https://fakestorageaccount.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='multiBatch1',RowKey='r6')\r\nETag: W/\"datetime'2021-06-04T21%3A59%3A54.3140569Z'\"\r\n\r\n\r\n--changesetresponse_819351da-b71f-4b3a-ac27-a645c59f62d5--\r\n--batchresponse_4f067297-7a14-46e6-977c-884b6a791b86--\r\n", [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'multipart/mixed; boundary=batchresponse_4f067297-7a14-46e6-977c-884b6a791b86',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6e9d0e47-c002-0024-6d8c-5918f1000000',
  'x-ms-client-request-id',
  'ed3cd0f9-da11-4499-8ea3-444b2058a811',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 04 Jun 2021 21:59:53 GMT' ]);

nock('https://fakestorageaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .get('/batchTableTestSASConnectionStringnode()')
  .query(true)
  .reply(200, {"odata.metadata":"https://fakestorageaccount.table.core.windows.net/$metadata#batchTableTestSASConnectionStringnode","value":[{"odata.etag":"W/\"datetime'2021-06-04T21%3A59%3A54.2560157Z'\"","PartitionKey":"multiBatch1","RowKey":"r1","Timestamp":"2021-06-04T21:59:54.2560157Z","value":"1"},{"odata.etag":"W/\"datetime'2021-06-04T21%3A59%3A54.2560157Z'\"","PartitionKey":"multiBatch1","RowKey":"r2","Timestamp":"2021-06-04T21:59:54.2560157Z","value":"2"},{"odata.etag":"W/\"datetime'2021-06-04T21%3A59%3A54.2560157Z'\"","PartitionKey":"multiBatch1","RowKey":"r3","Timestamp":"2021-06-04T21:59:54.2560157Z","value":"3"},{"odata.etag":"W/\"datetime'2021-06-04T21%3A59%3A54.3140569Z'\"","PartitionKey":"multiBatch1","RowKey":"r4","Timestamp":"2021-06-04T21:59:54.3140569Z","value":"4"},{"odata.etag":"W/\"datetime'2021-06-04T21%3A59%3A54.3140569Z'\"","PartitionKey":"multiBatch1","RowKey":"r5","Timestamp":"2021-06-04T21:59:54.3140569Z","value":"5"},{"odata.etag":"W/\"datetime'2021-06-04T21%3A59%3A54.3140569Z'\"","PartitionKey":"multiBatch1","RowKey":"r6","Timestamp":"2021-06-04T21:59:54.3140569Z","value":"6"}]}, [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6e9d0e55-c002-0024-7a8c-5918f1000000',
  'x-ms-client-request-id',
  '2a1c00c2-6988-494b-a821-f72cc7702cba',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,X-Content-Type-Options,Cache-Control,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 04 Jun 2021 21:59:53 GMT' ]);
