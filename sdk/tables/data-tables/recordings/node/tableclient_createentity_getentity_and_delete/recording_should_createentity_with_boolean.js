let nock = require('nock');

module.exports.hash = "f52cd0bcbfcfb042fe9fa27951bab1db";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://fakestorageaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/tableClientTestnode', {"PartitionKey":"P6_node","RowKey":"R6","testField":true,"testField@odata.type":"Edm.Boolean"})
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Content-Length',
  '0',
  'ETag',
  `W/"datetime'2020-10-01T00%3A38%3A38.1314286Z'"`,
  'Location',
  "https://fakestorageaccount.table.core.windows.net/tableClientTestnode(PartitionKey='P6_node',RowKey='R6')",
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '96adfb34-3002-0063-798b-97efdc000000',
  'x-ms-client-request-id',
  '3fe62825-b4a7-4931-90db-59a3af843572',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Preference-Applied',
  'return-no-content',
  'DataServiceId',
  "https://fakestorageaccount.table.core.windows.net/tableClientTestnode(PartitionKey='P6_node',RowKey='R6')",
  'Date',
  'Thu, 01 Oct 2020 00:38:38 GMT'
]);

nock('https://fakestorageaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .get('/tableClientTestnode(PartitionKey=%27P6_node%27,RowKey=%27R6%27)')
  .query(true)
  .reply(200, {"odata.metadata":"https://fakestorageaccount.table.core.windows.net/$metadata#tableClientTestnode/@Element","odata.etag":"W/\"datetime'2020-10-01T00%3A38%3A38.1314286Z'\"","PartitionKey":"P6_node","RowKey":"R6","Timestamp":"2020-10-01T00:38:38.1314286Z","testField":true}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'ETag',
  `W/"datetime'2020-10-01T00%3A38%3A38.1314286Z'"`,
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '96adfb3a-3002-0063-7d8b-97efdc000000',
  'x-ms-client-request-id',
  'd359b44a-e58b-4a83-b014-95ef5b7dc6c0',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,X-Content-Type-Options,Cache-Control,ETag,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 01 Oct 2020 00:38:38 GMT'
]);

nock('https://fakestorageaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/tableClientTestnode(PartitionKey=%27P6_node%27,RowKey=%27R6%27)')
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '96adfb3d-3002-0063-808b-97efdc000000',
  'x-ms-client-request-id',
  '9091f082-9f2e-4ea7-bef2-31edae91341e',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 01 Oct 2020 00:38:38 GMT'
]);
