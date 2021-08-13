let nock = require('nock');

module.exports.hash = "73515af9958108f6acd31f0ae1ac34e6";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/tableClientTestSASConnectionStringnode', {"PartitionKey":"P5_node","RowKey":"R5","testField":123,"testField@odata.type":"Edm.Int32"})
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Content-Length',
  '0',
  'ETag',
  `W/"datetime'2021-06-09T16%3A21%3A45.4624057Z'"`,
  'Location',
  "https://fakeaccount.table.core.windows.net/tableClientTestSASConnectionStringnode(PartitionKey='P5_node',RowKey='R5')",
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '654ef0e5-9002-001e-0b4b-5d5b52000000',
  'x-ms-client-request-id',
  'd7f882b9-558f-4ae6-b9b5-22c7de8d9b76',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Preference-Applied',
  'return-no-content',
  'DataServiceId',
  "https://fakeaccount.table.core.windows.net/tableClientTestSASConnectionStringnode(PartitionKey='P5_node',RowKey='R5')",
  'Date',
  'Wed, 09 Jun 2021 16:21:45 GMT'
]);

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .get(`/tableClientTestSASConnectionStringnode(PartitionKey='P5_node',RowKey='R5')`)
  .query(true)
  .reply(200, {"odata.metadata":"https://fakeaccount.table.core.windows.net/$metadata#tableClientTestSASConnectionStringnode/@Element","odata.etag":"W/\"datetime'2021-06-09T16%3A21%3A45.4624057Z'\"","PartitionKey":"P5_node","RowKey":"R5","Timestamp":"2021-06-09T16:21:45.4624057Z","testField":123}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'ETag',
  `W/"datetime'2021-06-09T16%3A21%3A45.4624057Z'"`,
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '654ef0f1-9002-001e-164b-5d5b52000000',
  'x-ms-client-request-id',
  '5f3b13c9-53bf-46d1-a6ab-acc7aa915d03',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,X-Content-Type-Options,Cache-Control,ETag,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 09 Jun 2021 16:21:45 GMT'
]);

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .delete(`/tableClientTestSASConnectionStringnode(PartitionKey='P5_node',RowKey='R5')`)
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '654ef0fd-9002-001e-224b-5d5b52000000',
  'x-ms-client-request-id',
  '6992b849-0dd5-4b05-89ee-29ede33144fb',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 09 Jun 2021 16:21:45 GMT'
]);
