let nock = require('nock');

module.exports.hash = "f101936bc4c21ff8258648b64093a17f";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://fakestorageaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/tableClientTestnode', {"PartitionKey":"P4_node","RowKey":"R4","testField":"12345543221","testField@odata.type":"Edm.Int64"})
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Content-Length',
  '0',
  'ETag',
  `W/"datetime'2021-02-01T20%3A58%3A57.2400773Z'"`,
  'Location',
  "https://fakestorageaccount.table.core.windows.net/tableClientTestnode(PartitionKey='P4_node',RowKey='R4')",
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd63fa64b-2002-00b8-6cdd-f8a3cb000000',
  'x-ms-client-request-id',
  'c2a507b2-db2c-4abd-9f35-a90de00f5429',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Preference-Applied',
  'return-no-content',
  'DataServiceId',
  "https://fakestorageaccount.table.core.windows.net/tableClientTestnode(PartitionKey='P4_node',RowKey='R4')",
  'Date',
  'Mon, 01 Feb 2021 20:58:56 GMT'
]);

nock('https://fakestorageaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .get(`/tableClientTestnode(PartitionKey='P4_node',RowKey='R4')`)
  .query(true)
  .reply(200, {"odata.metadata":"https://fakestorageaccount.table.core.windows.net/$metadata#tableClientTestnode/@Element","odata.etag":"W/\"datetime'2021-02-01T20%3A58%3A57.2400773Z'\"","PartitionKey":"P4_node","RowKey":"R4","Timestamp":"2021-02-01T20:58:57.2400773Z","testField@odata.type":"Edm.Int64","testField":"12345543221"}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'ETag',
  `W/"datetime'2021-02-01T20%3A58%3A57.2400773Z'"`,
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd63fa66a-2002-00b8-04dd-f8a3cb000000',
  'x-ms-client-request-id',
  'd3571316-a34c-4262-a03c-9f449a88655e',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,X-Content-Type-Options,Cache-Control,ETag,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 01 Feb 2021 20:58:56 GMT'
]);

nock('https://fakestorageaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .delete(`/tableClientTestnode(PartitionKey='P4_node',RowKey='R4')`)
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd63fa679-2002-00b8-13dd-f8a3cb000000',
  'x-ms-client-request-id',
  '61f26e7d-55e7-42c1-b6a4-53c53afd7547',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 01 Feb 2021 20:58:56 GMT'
]);
