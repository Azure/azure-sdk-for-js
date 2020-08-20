let nock = require('nock');

module.exports.hash = "57fa50b1d0db0644ff3d7914b8f49a00";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://joherediteststorage.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/integration', {"PartitionKey":"P6__node","RowKey":"R6","testField":true,"testField@odata.type":"Edm.Boolean"})
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Content-Length',
  '0',
  'ETag',
  `W/"datetime'2020-08-20T19%3A14%3A23.595134Z'"`,
  'Location',
  "https://joherediteststorage.table.core.windows.net/integration(PartitionKey='P6__node',RowKey='R6')",
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd12d17ad-1002-00a0-3826-779bb2000000',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Preference-Applied',
  'return-no-content',
  'DataServiceId',
  "https://joherediteststorage.table.core.windows.net/integration(PartitionKey='P6__node',RowKey='R6')",
  'Date',
  'Thu, 20 Aug 2020 19:14:22 GMT',
  'Connection',
  'close'
]);

nock('https://joherediteststorage.table.core.windows.net:443', {"encodedQueryParams":true})
  .get('/integration(PartitionKey=%27P6__node%27,RowKey=%27R6%27)')
  .query(true)
  .reply(200, {"odata.metadata":"https://joherediteststorage.table.core.windows.net/$metadata#integration/@Element","odata.etag":"W/\"datetime'2020-08-20T19%3A14%3A23.595134Z'\"","PartitionKey":"P6__node","RowKey":"R6","Timestamp":"2020-08-20T19:14:23.595134Z","testField":true}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'ETag',
  `W/"datetime'2020-08-20T19%3A14%3A23.595134Z'"`,
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '04de2749-8002-000f-3526-77b922000000',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,X-Content-Type-Options,Cache-Control,ETag,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 20 Aug 2020 19:14:23 GMT',
  'Connection',
  'close'
]);
