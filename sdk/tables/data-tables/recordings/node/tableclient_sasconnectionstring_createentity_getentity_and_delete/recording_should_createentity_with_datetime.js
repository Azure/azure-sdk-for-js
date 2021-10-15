let nock = require('nock');

module.exports.hash = "ed676a3b36db8a9446e03369e600e4c9";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/tableClientTestSASConnectionStringnode', {"PartitionKey":"P7_node","RowKey":"R7","testField":"2020-09-17T00:00:00.99999Z","testField@odata.type":"Edm.DateTime"})
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Content-Length',
  '0',
  'ETag',
  `W/"datetime'2021-10-15T16%3A13%3A12.6104048Z'"`,
  'Location',
  "https://fakeaccount.table.core.windows.net/tableClientTestSASConnectionStringnode(PartitionKey='P7_node',RowKey='R7')",
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5af7e7e0-c002-000d-78df-c16eb3000000',
  'x-ms-client-request-id',
  '1936cab9-1554-4e9b-b41f-a64708bee768',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Preference-Applied',
  'return-no-content',
  'DataServiceId',
  "https://fakeaccount.table.core.windows.net/tableClientTestSASConnectionStringnode(PartitionKey='P7_node',RowKey='R7')",
  'Date',
  'Fri, 15 Oct 2021 16:13:12 GMT'
]);

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .get(`/tableClientTestSASConnectionStringnode(PartitionKey='P7_node',RowKey='R7')`)
  .query(true)
  .reply(200, {"odata.metadata":"https://fakeaccount.table.core.windows.net/$metadata#tableClientTestSASConnectionStringnode/@Element","odata.etag":"W/\"datetime'2021-10-15T16%3A13%3A12.6104048Z'\"","PartitionKey":"P7_node","RowKey":"R7","Timestamp":"2021-10-15T16:13:12.6104048Z","testField@odata.type":"Edm.DateTime","testField":"2020-09-17T00:00:00.99999Z"}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'ETag',
  `W/"datetime'2021-10-15T16%3A13%3A12.6104048Z'"`,
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5af7e7fe-c002-000d-13df-c16eb3000000',
  'x-ms-client-request-id',
  '7d9aee1d-2a92-4ed2-a81a-cb23b4ed09ce',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,X-Content-Type-Options,Cache-Control,ETag,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 15 Oct 2021 16:13:12 GMT'
]);

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .delete(`/tableClientTestSASConnectionStringnode(PartitionKey='P7_node',RowKey='R7')`)
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5af7e815-c002-000d-2adf-c16eb3000000',
  'x-ms-client-request-id',
  '5be99948-09e4-47a7-bbca-e898938339df',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 15 Oct 2021 16:13:12 GMT'
]);
