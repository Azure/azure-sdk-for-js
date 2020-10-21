let nock = require('nock');

module.exports.hash = "45a503815008d0a93ed1c23b7485cdfa";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://fakestorageaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/tableClientTestnode', {"PartitionKey":"P7_node","RowKey":"R7","testField":"2020-09-17T00:00:00.000Z","testField@odata.type":"Edm.DateTime"})
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Content-Length',
  '0',
  'ETag',
  `W/"datetime'2020-10-01T00%3A38%3A38.2994773Z'"`,
  'Location',
  "https://fakestorageaccount.table.core.windows.net/tableClientTestnode(PartitionKey='P7_node',RowKey='R7')",
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f29ad480-e002-0043-568b-978310000000',
  'x-ms-client-request-id',
  '466a47b1-9a38-4e50-8bf0-376f15608475',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Preference-Applied',
  'return-no-content',
  'DataServiceId',
  "https://fakestorageaccount.table.core.windows.net/tableClientTestnode(PartitionKey='P7_node',RowKey='R7')",
  'Date',
  'Thu, 01 Oct 2020 00:38:38 GMT'
]);

nock('https://fakestorageaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .get('/tableClientTestnode(PartitionKey=%27P7_node%27,RowKey=%27R7%27)')
  .query(true)
  .reply(200, {"odata.metadata":"https://fakestorageaccount.table.core.windows.net/$metadata#tableClientTestnode/@Element","odata.etag":"W/\"datetime'2020-10-01T00%3A38%3A38.2994773Z'\"","PartitionKey":"P7_node","RowKey":"R7","Timestamp":"2020-10-01T00:38:38.2994773Z","testField@odata.type":"Edm.DateTime","testField":"2020-09-17T00:00:00Z"}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'ETag',
  `W/"datetime'2020-10-01T00%3A38%3A38.2994773Z'"`,
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f29ad486-e002-0043-5a8b-978310000000',
  'x-ms-client-request-id',
  '03d98c40-557c-4ea4-a9e4-e53d0b1b6fc1',
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
  .delete('/tableClientTestnode(PartitionKey=%27P7_node%27,RowKey=%27R7%27)')
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f29ad489-e002-0043-5d8b-978310000000',
  'x-ms-client-request-id',
  'de84d211-378f-43df-99e0-af754f8201ad',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 01 Oct 2020 00:38:38 GMT'
]);
