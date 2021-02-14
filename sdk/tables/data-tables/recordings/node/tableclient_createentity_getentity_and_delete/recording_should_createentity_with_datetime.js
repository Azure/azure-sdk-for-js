let nock = require('nock');

module.exports.hash = "5ecfde59f77d9fc9785b51fc9d62d08e";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://fakestorageaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/tableClientTestnode', {"PartitionKey":"P7_node","RowKey":"R7","testField":"2020-09-17T00:00:00.99999Z","testField@odata.type":"Edm.DateTime"})
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Content-Length',
  '0',
  'ETag',
  `W/"datetime'2020-11-20T20%3A39%3A32.4994263Z'"`,
  'Location',
  "https://fakestorageaccount.table.core.windows.net/tableClientTestnode(PartitionKey='P7_node',RowKey='R7')",
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b2eb0e9a-6002-0016-487d-bf6867000000',
  'x-ms-client-request-id',
  '79589036-b885-418f-9c9d-47f90b623959',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Preference-Applied',
  'return-no-content',
  'DataServiceId',
  "https://fakestorageaccount.table.core.windows.net/tableClientTestnode(PartitionKey='P7_node',RowKey='R7')",
  'Date',
  'Fri, 20 Nov 2020 20:39:31 GMT'
]);

nock('https://fakestorageaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .get('/tableClientTestnode(PartitionKey=%27P7_node%27,RowKey=%27R7%27)')
  .query(true)
  .reply(200, {"odata.metadata":"https://fakestorageaccount.table.core.windows.net/$metadata#tableClientTestnode/@Element","odata.etag":"W/\"datetime'2020-11-20T20%3A39%3A32.4994263Z'\"","PartitionKey":"P7_node","RowKey":"R7","Timestamp":"2020-11-20T20:39:32.4994263Z","testField@odata.type":"Edm.DateTime","testField":"2020-09-17T00:00:00.99999Z"}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'ETag',
  `W/"datetime'2020-11-20T20%3A39%3A32.4994263Z'"`,
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b2eb0ebb-6002-0016-677d-bf6867000000',
  'x-ms-client-request-id',
  '09f3b6db-a037-4360-9bbe-eed53b3b3544',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,X-Content-Type-Options,Cache-Control,ETag,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 20 Nov 2020 20:39:31 GMT'
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
  'b2eb0ecb-6002-0016-777d-bf6867000000',
  'x-ms-client-request-id',
  '79e449ee-5b1d-449f-86f9-a92f6f4d46e4',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 20:39:31 GMT'
]);
