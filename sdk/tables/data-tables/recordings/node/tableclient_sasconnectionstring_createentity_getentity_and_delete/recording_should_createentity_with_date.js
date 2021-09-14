let nock = require('nock');

module.exports.hash = "40113f7a007204ac74b06c1c82ae2bfd";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/tableClientTestSASConnectionStringnode', {"PartitionKey":"P2_node","RowKey":"R2","testField":"2020-09-17T00:00:00.111Z","testField@odata.type":"Edm.DateTime"})
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Content-Length',
  '0',
  'ETag',
  `W/"datetime'2021-09-14T21%3A24%3A00.6231834Z'"`,
  'Location',
  "https://fakeaccount.table.core.windows.net/tableClientTestSASConnectionStringnode(PartitionKey='P2_node',RowKey='R2')",
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6ced23d4-0002-0039-61ae-a9c11b000000',
  'x-ms-client-request-id',
  '0ed08975-9d0e-4a51-8756-dc34e81d2ec3',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Preference-Applied',
  'return-no-content',
  'DataServiceId',
  "https://fakeaccount.table.core.windows.net/tableClientTestSASConnectionStringnode(PartitionKey='P2_node',RowKey='R2')",
  'Date',
  'Tue, 14 Sep 2021 21:24:00 GMT'
]);

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .get('/tableClientTestSASConnectionStringnode(PartitionKey=\'P2_node\',RowKey=\'R2\')')
  .query(true)
  .reply(200, {"odata.metadata":"https://fakeaccount.table.core.windows.net/$metadata#tableClientTestSASConnectionStringnode/@Element","odata.etag":"W/\"datetime'2021-09-14T21%3A24%3A00.6231834Z'\"","PartitionKey":"P2_node","RowKey":"R2","Timestamp":"2021-09-14T21:24:00.6231834Z","testField@odata.type":"Edm.DateTime","testField":"2020-09-17T00:00:00.111Z"}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'ETag',
  `W/"datetime'2021-09-14T21%3A24%3A00.6231834Z'"`,
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6ced23e1-0002-0039-6cae-a9c11b000000',
  'x-ms-client-request-id',
  '60be2bfb-9742-4d90-bce0-77523bfe968f',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,X-Content-Type-Options,Cache-Control,ETag,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 14 Sep 2021 21:24:00 GMT'
]);

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/tableClientTestSASConnectionStringnode(PartitionKey=\'P2_node\',RowKey=\'R2\')')
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6ced23f5-0002-0039-7fae-a9c11b000000',
  'x-ms-client-request-id',
  'da907d05-7cd5-4674-b0a5-9333d1554ec4',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 14 Sep 2021 21:24:00 GMT'
]);
