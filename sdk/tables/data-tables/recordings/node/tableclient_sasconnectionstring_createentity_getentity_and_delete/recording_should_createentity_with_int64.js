let nock = require('nock');

module.exports.hash = "9328941615eb80fa4e895157041f336e";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/tableClientTestSASConnectionStringnode', {"PartitionKey":"P4_node","RowKey":"R4","testField":"12345543221","testField@odata.type":"Edm.Int64"})
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Content-Length',
  '0',
  'ETag',
  `W/"datetime'2021-09-14T21%3A24%3A01.1875879Z'"`,
  'Location',
  "https://fakeaccount.table.core.windows.net/tableClientTestSASConnectionStringnode(PartitionKey='P4_node',RowKey='R4')",
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6ced2437-0002-0039-3bae-a9c11b000000',
  'x-ms-client-request-id',
  'a0815cb4-35a1-4056-9c27-5a1fecde0ffb',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Preference-Applied',
  'return-no-content',
  'DataServiceId',
  "https://fakeaccount.table.core.windows.net/tableClientTestSASConnectionStringnode(PartitionKey='P4_node',RowKey='R4')",
  'Date',
  'Tue, 14 Sep 2021 21:24:00 GMT'
]);

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .get('/tableClientTestSASConnectionStringnode(PartitionKey=\'P4_node\',RowKey=\'R4\')')
  .query(true)
  .reply(200, {"odata.metadata":"https://fakeaccount.table.core.windows.net/$metadata#tableClientTestSASConnectionStringnode/@Element","odata.etag":"W/\"datetime'2021-09-14T21%3A24%3A01.1875879Z'\"","PartitionKey":"P4_node","RowKey":"R4","Timestamp":"2021-09-14T21:24:01.1875879Z","testField@odata.type":"Edm.Int64","testField":"12345543221"}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'ETag',
  `W/"datetime'2021-09-14T21%3A24%3A01.1875879Z'"`,
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6ced245b-0002-0039-5dae-a9c11b000000',
  'x-ms-client-request-id',
  '0386c7d0-cba6-4715-abc0-15a1413758e8',
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
  .delete('/tableClientTestSASConnectionStringnode(PartitionKey=\'P4_node\',RowKey=\'R4\')')
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6ced246d-0002-0039-6fae-a9c11b000000',
  'x-ms-client-request-id',
  'c462eedf-dfa0-48cd-8bd2-26c6af4a1f18',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 14 Sep 2021 21:24:01 GMT'
]);
