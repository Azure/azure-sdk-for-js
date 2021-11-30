let nock = require('nock');

module.exports.hash = "16a7761419d838f6802e5dab46f2456e";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/tableClientTestSASConnectionStringnode', {"PartitionKey":"P2_node","RowKey":"R1","foo":"testEntity","bar":123,"baz":true})
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Content-Length',
  '0',
  'ETag',
  `W/"datetime'2021-10-15T16%3A13%3A11.9719581Z'"`,
  'Location',
  "https://fakeaccount.table.core.windows.net/tableClientTestSASConnectionStringnode(PartitionKey='P2_node',RowKey='R1')",
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5af7e58a-c002-000d-3cdf-c16eb3000000',
  'x-ms-client-request-id',
  'e38189a2-5a3b-4df2-9bae-08bb06177f94',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Preference-Applied',
  'return-no-content',
  'DataServiceId',
  "https://fakeaccount.table.core.windows.net/tableClientTestSASConnectionStringnode(PartitionKey='P2_node',RowKey='R1')",
  'Date',
  'Fri, 15 Oct 2021 16:13:11 GMT'
]);

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .get(`/tableClientTestSASConnectionStringnode(PartitionKey='P2_node',RowKey='R1')`)
  .query(true)
  .reply(200, {"odata.metadata":"https://fakeaccount.table.core.windows.net/$metadata#tableClientTestSASConnectionStringnode/@Element&$select=baz,PartitionKey,RowKey","odata.etag":"W/\"datetime'2021-10-15T16%3A13%3A11.9719581Z'\"","PartitionKey":"P2_node","RowKey":"R1","baz":true}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'ETag',
  `W/"datetime'2021-10-15T16%3A13%3A11.9719581Z'"`,
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5af7e5b7-c002-000d-68df-c16eb3000000',
  'x-ms-client-request-id',
  'e216844f-b682-471a-9c40-c14cf4cc6317',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,X-Content-Type-Options,Cache-Control,ETag,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 15 Oct 2021 16:13:11 GMT'
]);
