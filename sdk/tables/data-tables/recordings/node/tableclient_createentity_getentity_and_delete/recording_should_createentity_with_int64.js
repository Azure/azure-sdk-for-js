let nock = require('nock');

module.exports.hash = "3f0aacc05ac7affa4c73629a7f0c2536";

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
  `W/"datetime'2020-10-01T00%3A38%3A37.7897751Z'"`,
  'Location',
  "https://fakestorageaccount.table.core.windows.net/tableClientTestnode(PartitionKey='P4_node',RowKey='R4')",
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c4fd3126-e002-0007-028b-975f7c000000',
  'x-ms-client-request-id',
  '6fd23317-cb1b-47ba-af20-9d8bb6aec32f',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Preference-Applied',
  'return-no-content',
  'DataServiceId',
  "https://fakestorageaccount.table.core.windows.net/tableClientTestnode(PartitionKey='P4_node',RowKey='R4')",
  'Date',
  'Thu, 01 Oct 2020 00:38:37 GMT'
]);

nock('https://fakestorageaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .get('/tableClientTestnode(PartitionKey=%27P4_node%27,RowKey=%27R4%27)')
  .query(true)
  .reply(200, {"odata.metadata":"https://fakestorageaccount.table.core.windows.net/$metadata#tableClientTestnode/@Element","odata.etag":"W/\"datetime'2020-10-01T00%3A38%3A37.7897751Z'\"","PartitionKey":"P4_node","RowKey":"R4","Timestamp":"2020-10-01T00:38:37.7897751Z","testField@odata.type":"Edm.Int64","testField":"12345543221"}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'ETag',
  `W/"datetime'2020-10-01T00%3A38%3A37.7897751Z'"`,
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c4fd312a-e002-0007-048b-975f7c000000',
  'x-ms-client-request-id',
  '1d8978d4-7e9d-485a-9614-d0f458213369',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,X-Content-Type-Options,Cache-Control,ETag,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 01 Oct 2020 00:38:37 GMT'
]);

nock('https://fakestorageaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/tableClientTestnode(PartitionKey=%27P4_node%27,RowKey=%27R4%27)')
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c4fd312b-e002-0007-058b-975f7c000000',
  'x-ms-client-request-id',
  '2b382c20-ce96-432c-86cd-d1268f8fafa2',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 01 Oct 2020 00:38:37 GMT'
]);
