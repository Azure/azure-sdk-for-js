let nock = require('nock');

module.exports.hash = "c2facf3a7e0d5911aa36b9d39d9eb8cf";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/Tables', {"TableName":"batchTableTestSASConnectionStringnode"})
  .query(true)
  .reply(409, {"odata.error":{"code":"TableAlreadyExists","message":{"lang":"en-US","value":"The table specified already exists.\nRequestId:6ced3360-0002-0039-04ae-a9c11b000000\nTime:2021-09-14T21:24:22.5538615Z"}}}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6ced3360-0002-0039-04ae-a9c11b000000',
  'x-ms-client-request-id',
  '4215bfc2-7e1d-49d7-96fb-97561a061f0c',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 14 Sep 2021 21:24:22 GMT'
]);

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/$batch', "--batch_fakeId\r\ncontent-type: multipart/mixed; boundary=changeset_fakeId\r\n\r\n\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPOST https://fakeaccount.table.core.windows.net/batchTableTestSASConnectionStringnode HTTP/1.1\r\ncontent-type: application/json;odata=nometadata\r\naccept: application/json;odata=minimalmetadata\r\ndataserviceversion: 3.0\r\nprefer: return-no-content\r\n\r\n\r\n{\"PartitionKey\":\"multiBatch1\",\"RowKey\":\"r1\",\"value\":\"1\"}\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPOST https://fakeaccount.table.core.windows.net/batchTableTestSASConnectionStringnode HTTP/1.1\r\ncontent-type: application/json;odata=nometadata\r\naccept: application/json;odata=minimalmetadata\r\ndataserviceversion: 3.0\r\nprefer: return-no-content\r\n\r\n\r\n{\"PartitionKey\":\"multiBatch1\",\"RowKey\":\"r2\",\"value\":\"2\"}\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPOST https://fakeaccount.table.core.windows.net/batchTableTestSASConnectionStringnode HTTP/1.1\r\ncontent-type: application/json;odata=nometadata\r\naccept: application/json;odata=minimalmetadata\r\ndataserviceversion: 3.0\r\nprefer: return-no-content\r\n\r\n\r\n{\"PartitionKey\":\"multiBatch1\",\"RowKey\":\"r3\",\"value\":\"3\"}\r\n--changeset_fakeId--\r\n--batch_fakeId--\r\n")
  .query(true)
  .reply(202, "--batchresponse_15089519-026c-4f52-aca2-11997285eeab\r\nContent-Type: multipart/mixed; boundary=changesetresponse_96227b1c-430e-42b1-b3ff-4f53eb2949b5\r\n\r\n--changesetresponse_96227b1c-430e-42b1-b3ff-4f53eb2949b5\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nPreference-Applied: return-no-content\r\nDataServiceVersion: 3.0;\r\nLocation: https://fakeaccount.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='multiBatch1',RowKey='r1')\r\nDataServiceId: https://fakeaccount.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='multiBatch1',RowKey='r1')\r\nETag: W/\"datetime'2021-09-14T21%3A24%3A22.7429979Z'\"\r\n\r\n\r\n--changesetresponse_96227b1c-430e-42b1-b3ff-4f53eb2949b5\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nPreference-Applied: return-no-content\r\nDataServiceVersion: 3.0;\r\nLocation: https://fakeaccount.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='multiBatch1',RowKey='r2')\r\nDataServiceId: https://fakeaccount.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='multiBatch1',RowKey='r2')\r\nETag: W/\"datetime'2021-09-14T21%3A24%3A22.7429979Z'\"\r\n\r\n\r\n--changesetresponse_96227b1c-430e-42b1-b3ff-4f53eb2949b5\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nPreference-Applied: return-no-content\r\nDataServiceVersion: 3.0;\r\nLocation: https://fakeaccount.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='multiBatch1',RowKey='r3')\r\nDataServiceId: https://fakeaccount.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='multiBatch1',RowKey='r3')\r\nETag: W/\"datetime'2021-09-14T21%3A24%3A22.7429979Z'\"\r\n\r\n\r\n--changesetresponse_96227b1c-430e-42b1-b3ff-4f53eb2949b5--\r\n--batchresponse_15089519-026c-4f52-aca2-11997285eeab--\r\n", [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'multipart/mixed; boundary=batchresponse_15089519-026c-4f52-aca2-11997285eeab',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6ced3379-0002-0039-1bae-a9c11b000000',
  'x-ms-client-request-id',
  '2fbb6c39-a646-4cd5-9bac-aacaa4d3db40',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 14 Sep 2021 21:24:22 GMT'
]);

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/$batch', "--batch_fakeId\r\ncontent-type: multipart/mixed; boundary=changeset_fakeId\r\n\r\n\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPOST https://fakeaccount.table.core.windows.net/batchTableTestSASConnectionStringnode HTTP/1.1\r\ncontent-type: application/json;odata=nometadata\r\naccept: application/json;odata=minimalmetadata\r\ndataserviceversion: 3.0\r\nprefer: return-no-content\r\n\r\n\r\n{\"PartitionKey\":\"multiBatch1\",\"RowKey\":\"r4\",\"value\":\"4\"}\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPOST https://fakeaccount.table.core.windows.net/batchTableTestSASConnectionStringnode HTTP/1.1\r\ncontent-type: application/json;odata=nometadata\r\naccept: application/json;odata=minimalmetadata\r\ndataserviceversion: 3.0\r\nprefer: return-no-content\r\n\r\n\r\n{\"PartitionKey\":\"multiBatch1\",\"RowKey\":\"r5\",\"value\":\"5\"}\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPOST https://fakeaccount.table.core.windows.net/batchTableTestSASConnectionStringnode HTTP/1.1\r\ncontent-type: application/json;odata=nometadata\r\naccept: application/json;odata=minimalmetadata\r\ndataserviceversion: 3.0\r\nprefer: return-no-content\r\n\r\n\r\n{\"PartitionKey\":\"multiBatch1\",\"RowKey\":\"r6\",\"value\":\"6\"}\r\n--changeset_fakeId--\r\n--batch_fakeId--\r\n")
  .query(true)
  .reply(202, "--batchresponse_69ee4cc3-72c6-4b8c-bd3e-8039320217f3\r\nContent-Type: multipart/mixed; boundary=changesetresponse_97b05172-4ac5-41de-90ff-3bb82d0c5961\r\n\r\n--changesetresponse_97b05172-4ac5-41de-90ff-3bb82d0c5961\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nPreference-Applied: return-no-content\r\nDataServiceVersion: 3.0;\r\nLocation: https://fakeaccount.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='multiBatch1',RowKey='r4')\r\nDataServiceId: https://fakeaccount.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='multiBatch1',RowKey='r4')\r\nETag: W/\"datetime'2021-09-14T21%3A24%3A22.9221258Z'\"\r\n\r\n\r\n--changesetresponse_97b05172-4ac5-41de-90ff-3bb82d0c5961\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nPreference-Applied: return-no-content\r\nDataServiceVersion: 3.0;\r\nLocation: https://fakeaccount.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='multiBatch1',RowKey='r5')\r\nDataServiceId: https://fakeaccount.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='multiBatch1',RowKey='r5')\r\nETag: W/\"datetime'2021-09-14T21%3A24%3A22.9221258Z'\"\r\n\r\n\r\n--changesetresponse_97b05172-4ac5-41de-90ff-3bb82d0c5961\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nPreference-Applied: return-no-content\r\nDataServiceVersion: 3.0;\r\nLocation: https://fakeaccount.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='multiBatch1',RowKey='r6')\r\nDataServiceId: https://fakeaccount.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='multiBatch1',RowKey='r6')\r\nETag: W/\"datetime'2021-09-14T21%3A24%3A22.9221258Z'\"\r\n\r\n\r\n--changesetresponse_97b05172-4ac5-41de-90ff-3bb82d0c5961--\r\n--batchresponse_69ee4cc3-72c6-4b8c-bd3e-8039320217f3--\r\n", [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'multipart/mixed; boundary=batchresponse_69ee4cc3-72c6-4b8c-bd3e-8039320217f3',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6ced339a-0002-0039-39ae-a9c11b000000',
  'x-ms-client-request-id',
  '95c011bb-f58f-4e43-8fd4-1045fe1ae1fd',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 14 Sep 2021 21:24:22 GMT'
]);

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .get('/batchTableTestSASConnectionStringnode()')
  .query(true)
  .reply(200, {"odata.metadata":"https://fakeaccount.table.core.windows.net/$metadata#batchTableTestSASConnectionStringnode","value":[{"odata.etag":"W/\"datetime'2021-09-14T21%3A24%3A22.7429979Z'\"","PartitionKey":"multiBatch1","RowKey":"r1","Timestamp":"2021-09-14T21:24:22.7429979Z","value":"1"},{"odata.etag":"W/\"datetime'2021-09-14T21%3A24%3A22.7429979Z'\"","PartitionKey":"multiBatch1","RowKey":"r2","Timestamp":"2021-09-14T21:24:22.7429979Z","value":"2"},{"odata.etag":"W/\"datetime'2021-09-14T21%3A24%3A22.7429979Z'\"","PartitionKey":"multiBatch1","RowKey":"r3","Timestamp":"2021-09-14T21:24:22.7429979Z","value":"3"},{"odata.etag":"W/\"datetime'2021-09-14T21%3A24%3A22.9221258Z'\"","PartitionKey":"multiBatch1","RowKey":"r4","Timestamp":"2021-09-14T21:24:22.9221258Z","value":"4"},{"odata.etag":"W/\"datetime'2021-09-14T21%3A24%3A22.9221258Z'\"","PartitionKey":"multiBatch1","RowKey":"r5","Timestamp":"2021-09-14T21:24:22.9221258Z","value":"5"},{"odata.etag":"W/\"datetime'2021-09-14T21%3A24%3A22.9221258Z'\"","PartitionKey":"multiBatch1","RowKey":"r6","Timestamp":"2021-09-14T21:24:22.9221258Z","value":"6"}]}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6ced33b1-0002-0039-50ae-a9c11b000000',
  'x-ms-client-request-id',
  '4488a66c-95cb-4b15-b4a3-4c9e40392bdf',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,X-Content-Type-Options,Cache-Control,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 14 Sep 2021 21:24:22 GMT'
]);
