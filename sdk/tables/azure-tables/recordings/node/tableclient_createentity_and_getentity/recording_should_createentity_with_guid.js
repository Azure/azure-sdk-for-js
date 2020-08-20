let nock = require('nock');

module.exports.hash = "073a610d0f43809bedd9bc8f45c197c4";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://joherediteststorage.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/integration', {"PartitionKey":"P3__node","RowKey":"R3","testField":"cf8ef051-1b7d-4e93-a1e5-a3944d7e441c","testField@odata.type":"Edm.Guid"})
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Content-Length',
  '0',
  'ETag',
  `W/"datetime'2020-08-20T19%3A14%3A22.9175492Z'"`,
  'Location',
  "https://joherediteststorage.table.core.windows.net/integration(PartitionKey='P3__node',RowKey='R3')",
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8dedf791-4002-007f-2126-77cae6000000',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Preference-Applied',
  'return-no-content',
  'DataServiceId',
  "https://joherediteststorage.table.core.windows.net/integration(PartitionKey='P3__node',RowKey='R3')",
  'Date',
  'Thu, 20 Aug 2020 19:14:22 GMT',
  'Connection',
  'close'
]);

nock('https://joherediteststorage.table.core.windows.net:443', {"encodedQueryParams":true})
  .get('/integration(PartitionKey=%27P3__node%27,RowKey=%27R3%27)')
  .query(true)
  .reply(200, {"odata.metadata":"https://joherediteststorage.table.core.windows.net/$metadata#integration/@Element","odata.etag":"W/\"datetime'2020-08-20T19%3A14%3A22.9175492Z'\"","PartitionKey":"P3__node","RowKey":"R3","Timestamp":"2020-08-20T19:14:22.9175492Z","testField@odata.type":"Edm.Guid","testField":"cf8ef051-1b7d-4e93-a1e5-a3944d7e441c"}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'ETag',
  `W/"datetime'2020-08-20T19%3A14%3A22.9175492Z'"`,
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6ca807c8-d002-00f2-6a26-778640000000',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,X-Content-Type-Options,Cache-Control,ETag,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 20 Aug 2020 19:14:22 GMT',
  'Connection',
  'close'
]);
