let nock = require('nock');

module.exports.hash = "0a9173b80791b623c75dea636aa6e551";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://fakestorageaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/tableClientTestnode', {"PartitionKey":"P8_node","RowKey":"R8","integerNumber":3,"floatingPointNumber":3.14})
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Content-Length',
  '0',
  'ETag',
  `W/"datetime'2021-02-01T20%3A58%3A58.3738734Z'"`,
  'Location',
  "https://fakestorageaccount.table.core.windows.net/tableClientTestnode(PartitionKey='P8_node',RowKey='R8')",
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd63fa751-2002-00b8-58dd-f8a3cb000000',
  'x-ms-client-request-id',
  'eb889658-06d4-47d0-90af-88a8ad3be07c',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Preference-Applied',
  'return-no-content',
  'DataServiceId',
  "https://fakestorageaccount.table.core.windows.net/tableClientTestnode(PartitionKey='P8_node',RowKey='R8')",
  'Date',
  'Mon, 01 Feb 2021 20:58:57 GMT'
]);

nock('https://fakestorageaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .get(`/tableClientTestnode(PartitionKey='P8_node',RowKey='R8')`)
  .query(true)
  .reply(200, {"odata.metadata":"https://fakestorageaccount.table.core.windows.net/$metadata#tableClientTestnode/@Element","odata.etag":"W/\"datetime'2021-02-01T20%3A58%3A58.3738734Z'\"","PartitionKey":"P8_node","RowKey":"R8","Timestamp":"2021-02-01T20:58:58.3738734Z","integerNumber":3,"floatingPointNumber":3.14}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'ETag',
  `W/"datetime'2021-02-01T20%3A58%3A58.3738734Z'"`,
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd63fa75b-2002-00b8-62dd-f8a3cb000000',
  'x-ms-client-request-id',
  '11234886-aea5-4f59-934f-acaa44b4ecd0',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,X-Content-Type-Options,Cache-Control,ETag,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 01 Feb 2021 20:58:57 GMT'
]);

nock('https://fakestorageaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .delete(`/tableClientTestnode(PartitionKey='P8_node',RowKey='R8')`)
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd63fa77d-2002-00b8-03dd-f8a3cb000000',
  'x-ms-client-request-id',
  '5165694c-51cf-41e7-84ed-cc141570c22e',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 01 Feb 2021 20:58:57 GMT'
]);
