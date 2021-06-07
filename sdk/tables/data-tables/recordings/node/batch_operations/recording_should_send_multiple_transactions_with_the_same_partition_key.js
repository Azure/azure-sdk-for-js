let nock = require('nock');

module.exports.hash = "f0a834722cfc3432a47a34ce99f2bdd6";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://fakestorageaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/Tables', {"TableName":"batchTableTestnode"})
  .query(true)
  .reply(201, {"odata.metadata":"https://fakestorageaccount.table.core.windows.net/$metadata#Tables/@Element","TableName":"batchTableTestnode"}, [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Location',
  'https://fakestorageaccount.table.core.windows.net/Tables(\'batchTableTestnode\')',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '31cc3a90-8002-0127-6807-575da3000000',
  'x-ms-client-request-id',
  '938b5a21-d8b5-45cf-86d0-19df3bc334f9',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 01 Jun 2021 16:56:15 GMT' ]);

nock('https://fakestorageaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/$batch', "--batch_fakeId\r\ncontent-type: multipart/mixed; boundary=changeset_fakeId\r\n\r\n\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPOST https://fakestorageaccount.table.core.windows.net/batchTableTestnode HTTP/1.1\r\ncontent-type: application/json;odata=nometadata\r\naccept: application/json;odata=minimalmetadata\r\ndataserviceversion: 3.0\r\nprefer: return-no-content\r\n\r\n\r\n{\"PartitionKey\":\"multiBatch1\",\"RowKey\":\"r1\",\"value\":\"1\"}\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPOST https://fakestorageaccount.table.core.windows.net/batchTableTestnode HTTP/1.1\r\ncontent-type: application/json;odata=nometadata\r\naccept: application/json;odata=minimalmetadata\r\ndataserviceversion: 3.0\r\nprefer: return-no-content\r\n\r\n\r\n{\"PartitionKey\":\"multiBatch1\",\"RowKey\":\"r2\",\"value\":\"2\"}\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPOST https://fakestorageaccount.table.core.windows.net/batchTableTestnode HTTP/1.1\r\ncontent-type: application/json;odata=nometadata\r\naccept: application/json;odata=minimalmetadata\r\ndataserviceversion: 3.0\r\nprefer: return-no-content\r\n\r\n\r\n{\"PartitionKey\":\"multiBatch1\",\"RowKey\":\"r3\",\"value\":\"3\"}\r\n--changeset_fakeId--\r\n--batch_fakeId\r\n")
  .query(true)
  .reply(202, "--batchresponse_66ac1a09-28b5-474d-821f-d993ec447cac\r\nContent-Type: multipart/mixed; boundary=changesetresponse_7d8d1546-0848-442f-9284-7dc35897a6a4\r\n\r\n--changesetresponse_7d8d1546-0848-442f-9284-7dc35897a6a4\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nPreference-Applied: return-no-content\r\nDataServiceVersion: 3.0;\r\nLocation: https://fakestorageaccount.table.core.windows.net/batchTableTestnode(PartitionKey='multiBatch1',RowKey='r1')\r\nDataServiceId: https://fakestorageaccount.table.core.windows.net/batchTableTestnode(PartitionKey='multiBatch1',RowKey='r1')\r\nETag: W/\"datetime'2021-06-01T16%3A56%3A15.9634213Z'\"\r\n\r\n\r\n--changesetresponse_7d8d1546-0848-442f-9284-7dc35897a6a4\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nPreference-Applied: return-no-content\r\nDataServiceVersion: 3.0;\r\nLocation: https://fakestorageaccount.table.core.windows.net/batchTableTestnode(PartitionKey='multiBatch1',RowKey='r2')\r\nDataServiceId: https://fakestorageaccount.table.core.windows.net/batchTableTestnode(PartitionKey='multiBatch1',RowKey='r2')\r\nETag: W/\"datetime'2021-06-01T16%3A56%3A15.9634213Z'\"\r\n\r\n\r\n--changesetresponse_7d8d1546-0848-442f-9284-7dc35897a6a4\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nPreference-Applied: return-no-content\r\nDataServiceVersion: 3.0;\r\nLocation: https://fakestorageaccount.table.core.windows.net/batchTableTestnode(PartitionKey='multiBatch1',RowKey='r3')\r\nDataServiceId: https://fakestorageaccount.table.core.windows.net/batchTableTestnode(PartitionKey='multiBatch1',RowKey='r3')\r\nETag: W/\"datetime'2021-06-01T16%3A56%3A15.9634213Z'\"\r\n\r\n\r\n--changesetresponse_7d8d1546-0848-442f-9284-7dc35897a6a4--\r\n--batchresponse_66ac1a09-28b5-474d-821f-d993ec447cac--\r\n", [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'multipart/mixed; boundary=batchresponse_66ac1a09-28b5-474d-821f-d993ec447cac',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '31cc3a98-8002-0127-6e07-575da3000000',
  'x-ms-client-request-id',
  '801cfcef-beeb-4ddb-ae0f-08745153b408',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 01 Jun 2021 16:56:15 GMT' ]);

nock('https://fakestorageaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/$batch', "--batch_fakeId\r\ncontent-type: multipart/mixed; boundary=changeset_fakeId\r\n\r\n\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPOST https://fakestorageaccount.table.core.windows.net/batchTableTestnode HTTP/1.1\r\ncontent-type: application/json;odata=nometadata\r\naccept: application/json;odata=minimalmetadata\r\ndataserviceversion: 3.0\r\nprefer: return-no-content\r\n\r\n\r\n{\"PartitionKey\":\"multiBatch1\",\"RowKey\":\"r4\",\"value\":\"4\"}\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPOST https://fakestorageaccount.table.core.windows.net/batchTableTestnode HTTP/1.1\r\ncontent-type: application/json;odata=nometadata\r\naccept: application/json;odata=minimalmetadata\r\ndataserviceversion: 3.0\r\nprefer: return-no-content\r\n\r\n\r\n{\"PartitionKey\":\"multiBatch1\",\"RowKey\":\"r5\",\"value\":\"5\"}\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPOST https://fakestorageaccount.table.core.windows.net/batchTableTestnode HTTP/1.1\r\ncontent-type: application/json;odata=nometadata\r\naccept: application/json;odata=minimalmetadata\r\ndataserviceversion: 3.0\r\nprefer: return-no-content\r\n\r\n\r\n{\"PartitionKey\":\"multiBatch1\",\"RowKey\":\"r6\",\"value\":\"6\"}\r\n--changeset_fakeId--\r\n--batch_fakeId\r\n")
  .query(true)
  .reply(202, "--batchresponse_7049d189-952f-4d8e-b1c7-3de49034e04d\r\nContent-Type: multipart/mixed; boundary=changesetresponse_6e0c0b9a-34a2-4588-a351-15a6d5081de6\r\n\r\n--changesetresponse_6e0c0b9a-34a2-4588-a351-15a6d5081de6\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nPreference-Applied: return-no-content\r\nDataServiceVersion: 3.0;\r\nLocation: https://fakestorageaccount.table.core.windows.net/batchTableTestnode(PartitionKey='multiBatch1',RowKey='r4')\r\nDataServiceId: https://fakestorageaccount.table.core.windows.net/batchTableTestnode(PartitionKey='multiBatch1',RowKey='r4')\r\nETag: W/\"datetime'2021-06-01T16%3A56%3A16.0124566Z'\"\r\n\r\n\r\n--changesetresponse_6e0c0b9a-34a2-4588-a351-15a6d5081de6\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nPreference-Applied: return-no-content\r\nDataServiceVersion: 3.0;\r\nLocation: https://fakestorageaccount.table.core.windows.net/batchTableTestnode(PartitionKey='multiBatch1',RowKey='r5')\r\nDataServiceId: https://fakestorageaccount.table.core.windows.net/batchTableTestnode(PartitionKey='multiBatch1',RowKey='r5')\r\nETag: W/\"datetime'2021-06-01T16%3A56%3A16.0124566Z'\"\r\n\r\n\r\n--changesetresponse_6e0c0b9a-34a2-4588-a351-15a6d5081de6\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nPreference-Applied: return-no-content\r\nDataServiceVersion: 3.0;\r\nLocation: https://fakestorageaccount.table.core.windows.net/batchTableTestnode(PartitionKey='multiBatch1',RowKey='r6')\r\nDataServiceId: https://fakestorageaccount.table.core.windows.net/batchTableTestnode(PartitionKey='multiBatch1',RowKey='r6')\r\nETag: W/\"datetime'2021-06-01T16%3A56%3A16.0124566Z'\"\r\n\r\n\r\n--changesetresponse_6e0c0b9a-34a2-4588-a351-15a6d5081de6--\r\n--batchresponse_7049d189-952f-4d8e-b1c7-3de49034e04d--\r\n", [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'multipart/mixed; boundary=batchresponse_7049d189-952f-4d8e-b1c7-3de49034e04d',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '31cc3aa1-8002-0127-7607-575da3000000',
  'x-ms-client-request-id',
  '12b685e5-8477-448f-a58c-e0f290f3ce63',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 01 Jun 2021 16:56:15 GMT' ]);

nock('https://fakestorageaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .get('/batchTableTestnode()')
  .query(true)
  .reply(200, {"odata.metadata":"https://fakestorageaccount.table.core.windows.net/$metadata#batchTableTestnode","value":[{"odata.etag":"W/\"datetime'2021-06-01T16%3A56%3A15.9634213Z'\"","PartitionKey":"multiBatch1","RowKey":"r1","Timestamp":"2021-06-01T16:56:15.9634213Z","value":"1"},{"odata.etag":"W/\"datetime'2021-06-01T16%3A56%3A15.9634213Z'\"","PartitionKey":"multiBatch1","RowKey":"r2","Timestamp":"2021-06-01T16:56:15.9634213Z","value":"2"},{"odata.etag":"W/\"datetime'2021-06-01T16%3A56%3A15.9634213Z'\"","PartitionKey":"multiBatch1","RowKey":"r3","Timestamp":"2021-06-01T16:56:15.9634213Z","value":"3"},{"odata.etag":"W/\"datetime'2021-06-01T16%3A56%3A16.0124566Z'\"","PartitionKey":"multiBatch1","RowKey":"r4","Timestamp":"2021-06-01T16:56:16.0124566Z","value":"4"},{"odata.etag":"W/\"datetime'2021-06-01T16%3A56%3A16.0124566Z'\"","PartitionKey":"multiBatch1","RowKey":"r5","Timestamp":"2021-06-01T16:56:16.0124566Z","value":"5"},{"odata.etag":"W/\"datetime'2021-06-01T16%3A56%3A16.0124566Z'\"","PartitionKey":"multiBatch1","RowKey":"r6","Timestamp":"2021-06-01T16:56:16.0124566Z","value":"6"}]}, [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '31cc3aac-8002-0127-0107-575da3000000',
  'x-ms-client-request-id',
  '8b307953-6478-46ba-b437-7f3324803d70',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 01 Jun 2021 16:56:15 GMT' ]);
