let nock = require('nock');

module.exports.hash = "10564c0369135bb56c3a21a46e67619c";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/tableClientTestSASConnectionStringnode', {"PartitionKey":"P6_node","RowKey":"R6","testField":true,"testField@odata.type":"Edm.Boolean"})
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Content-Length',
  '0',
  'ETag',
  `W/"datetime'2021-09-14T21%3A24%3A01.8320497Z'"`,
  'Location',
  "https://fakeaccount.table.core.windows.net/tableClientTestSASConnectionStringnode(PartitionKey='P6_node',RowKey='R6')",
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6ced24d2-0002-0039-4dae-a9c11b000000',
  'x-ms-client-request-id',
  'b3b041be-335b-47ac-9d96-d47857b4d92a',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Preference-Applied',
  'return-no-content',
  'DataServiceId',
  "https://fakeaccount.table.core.windows.net/tableClientTestSASConnectionStringnode(PartitionKey='P6_node',RowKey='R6')",
  'Date',
  'Tue, 14 Sep 2021 21:24:01 GMT'
]);

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .get('/tableClientTestSASConnectionStringnode(PartitionKey=\'P6_node\',RowKey=\'R6\')')
  .query(true)
  .reply(200, {"odata.metadata":"https://fakeaccount.table.core.windows.net/$metadata#tableClientTestSASConnectionStringnode/@Element","odata.etag":"W/\"datetime'2021-09-14T21%3A24%3A01.8320497Z'\"","PartitionKey":"P6_node","RowKey":"R6","Timestamp":"2021-09-14T21:24:01.8320497Z","testField":true}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'ETag',
  `W/"datetime'2021-09-14T21%3A24%3A01.8320497Z'"`,
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6ced24e7-0002-0039-60ae-a9c11b000000',
  'x-ms-client-request-id',
  'ff3ef117-7043-4da7-88f6-17c9daa6b875',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,X-Content-Type-Options,Cache-Control,ETag,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 14 Sep 2021 21:24:01 GMT'
]);

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/tableClientTestSASConnectionStringnode(PartitionKey=\'P6_node\',RowKey=\'R6\')')
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6ced2500-0002-0039-76ae-a9c11b000000',
  'x-ms-client-request-id',
  'f6235beb-c956-42ae-929c-51fdadea1a60',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 14 Sep 2021 21:24:01 GMT'
]);
