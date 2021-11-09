let nock = require('nock');

module.exports.hash = "1aa68a918ecb32fa9fcc4e9eda4f3f45";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/Tables', {"TableName":"batchTableTestSASConnectionStringnode"})
  .query(true)
  .reply(201, {"odata.metadata":"https://fakeaccount.table.core.windows.net/$metadata#Tables/@Element","TableName":"batchTableTestSASConnectionStringnode"}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Location',
  "https://fakeaccount.table.core.windows.net/Tables('batchTableTestSASConnectionStringnode')",
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '58e1c53d-9002-0133-6c0b-d59ec7000000',
  'x-ms-client-request-id',
  '4084d65e-ae4d-4c90-ad5f-31eece0a18b9',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 09 Nov 2021 01:43:40 GMT'
]);

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/$batch', "--batch_fakeId\r\ncontent-type: multipart/mixed; boundary=changeset_fakeId\r\n\r\n\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPOST https://fakeaccount.table.core.windows.net/batchTableTestSASConnectionStringnode HTTP/1.1\r\nContent-Type: application/json;odata=nometadata\r\nAccept: application/json;odata=minimalmetadata\r\nDataServiceVersion: 3.0\r\nPrefer: return-no-content\r\n\r\n\r\n{\"PartitionKey\":\"\",\"RowKey\":\"\",\"value\":\"\"}\r\n--changeset_fakeId--\r\n--batch_fakeId--\r\n")
  .query(true)
  .reply(202, "--batchresponse_371d892f-7b5e-4b82-9cfa-f75276cc91ac\r\nContent-Type: multipart/mixed; boundary=changesetresponse_3fc01029-ca4e-4125-b602-5dbe2fdb4ddd\r\n\r\n--changesetresponse_3fc01029-ca4e-4125-b602-5dbe2fdb4ddd\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nPreference-Applied: return-no-content\r\nDataServiceVersion: 3.0;\r\nLocation: https://fakeaccount.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='',RowKey='')\r\nDataServiceId: https://fakeaccount.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='',RowKey='')\r\nETag: W/\"datetime'2021-11-09T01%3A43%3A40.8051516Z'\"\r\n\r\n\r\n--changesetresponse_3fc01029-ca4e-4125-b602-5dbe2fdb4ddd--\r\n--batchresponse_371d892f-7b5e-4b82-9cfa-f75276cc91ac--\r\n", [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'multipart/mixed; boundary=batchresponse_371d892f-7b5e-4b82-9cfa-f75276cc91ac',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '58e1c560-9002-0133-0c0b-d59ec7000000',
  'x-ms-client-request-id',
  '081dd516-30c0-4367-aa1a-ff9606bb8277',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 09 Nov 2021 01:43:40 GMT'
]);

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/$batch', "--batch_fakeId\r\ncontent-type: multipart/mixed; boundary=changeset_fakeId\r\n\r\n\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPATCH https://fakeaccount.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='',RowKey='') HTTP/1.1\r\nContent-Type: application/json\r\nDataServiceVersion: 3.0\r\nAccept: application/json\r\nIf-Match: *\r\n\r\n\r\n{\"PartitionKey\":\"\",\"RowKey\":\"\",\"value\":\"updated\"}\r\n--changeset_fakeId--\r\n--batch_fakeId--\r\n")
  .query(true)
  .reply(202, "--batchresponse_07ec33a5-6718-4402-bc42-551e9dfe8660\r\nContent-Type: multipart/mixed; boundary=changesetresponse_7d5b7ade-0150-411c-bfd3-40e0699bb2fe\r\n\r\n--changesetresponse_7d5b7ade-0150-411c-bfd3-40e0699bb2fe\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nDataServiceVersion: 1.0;\r\nETag: W/\"datetime'2021-11-09T01%3A43%3A40.8413527Z'\"\r\n\r\n\r\n--changesetresponse_7d5b7ade-0150-411c-bfd3-40e0699bb2fe--\r\n--batchresponse_07ec33a5-6718-4402-bc42-551e9dfe8660--\r\n", [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'multipart/mixed; boundary=batchresponse_07ec33a5-6718-4402-bc42-551e9dfe8660',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '58e1c576-9002-0133-210b-d59ec7000000',
  'x-ms-client-request-id',
  'e8457e6a-7459-41fb-8c68-2ab304f532c0',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 09 Nov 2021 01:43:40 GMT'
]);

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .get(`/batchTableTestSASConnectionStringnode(PartitionKey='',RowKey='')`)
  .query(true)
  .reply(200, {"odata.metadata":"https://fakeaccount.table.core.windows.net/$metadata#batchTableTestSASConnectionStringnode/@Element","odata.etag":"W/\"datetime'2021-11-09T01%3A43%3A40.8413527Z'\"","PartitionKey":"","RowKey":"","Timestamp":"2021-11-09T01:43:40.8413527Z","value":"updated"}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'ETag',
  `W/"datetime'2021-11-09T01%3A43%3A40.8413527Z'"`,
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '58e1c587-9002-0133-320b-d59ec7000000',
  'x-ms-client-request-id',
  'c1662e8c-bb6d-4181-8a2c-3c49c28f191c',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,X-Content-Type-Options,Cache-Control,ETag,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 09 Nov 2021 01:43:40 GMT'
]);

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/$batch', "--batch_fakeId\r\ncontent-type: multipart/mixed; boundary=changeset_fakeId\r\n\r\n\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nPATCH https://fakeaccount.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='',RowKey='') HTTP/1.1\r\nContent-Type: application/json\r\nDataServiceVersion: 3.0\r\nAccept: application/json\r\n\r\n\r\n{\"PartitionKey\":\"\",\"RowKey\":\"\",\"value\":\"upserted\"}\r\n--changeset_fakeId--\r\n--batch_fakeId--\r\n")
  .query(true)
  .reply(202, "--batchresponse_941691c7-93bd-4b80-b624-0d50b1d2ad8f\r\nContent-Type: multipart/mixed; boundary=changesetresponse_28a45cab-7502-424c-8c15-e7dc4212f588\r\n\r\n--changesetresponse_28a45cab-7502-424c-8c15-e7dc4212f588\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nDataServiceVersion: 1.0;\r\nETag: W/\"datetime'2021-11-09T01%3A43%3A40.9153114Z'\"\r\n\r\n\r\n--changesetresponse_28a45cab-7502-424c-8c15-e7dc4212f588--\r\n--batchresponse_941691c7-93bd-4b80-b624-0d50b1d2ad8f--\r\n", [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'multipart/mixed; boundary=batchresponse_941691c7-93bd-4b80-b624-0d50b1d2ad8f',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '58e1c59c-9002-0133-450b-d59ec7000000',
  'x-ms-client-request-id',
  'f61d90bd-8d63-4ee5-a9c8-18f6afcd0458',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 09 Nov 2021 01:43:40 GMT'
]);

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .get(`/batchTableTestSASConnectionStringnode(PartitionKey='',RowKey='')`)
  .query(true)
  .reply(200, {"odata.metadata":"https://fakeaccount.table.core.windows.net/$metadata#batchTableTestSASConnectionStringnode/@Element","odata.etag":"W/\"datetime'2021-11-09T01%3A43%3A40.9153114Z'\"","PartitionKey":"","RowKey":"","Timestamp":"2021-11-09T01:43:40.9153114Z","value":"upserted"}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'ETag',
  `W/"datetime'2021-11-09T01%3A43%3A40.9153114Z'"`,
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '58e1c5b2-9002-0133-590b-d59ec7000000',
  'x-ms-client-request-id',
  '0a92f140-ab46-49e9-9b87-6d47d1466183',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,X-Content-Type-Options,Cache-Control,ETag,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 09 Nov 2021 01:43:40 GMT'
]);
