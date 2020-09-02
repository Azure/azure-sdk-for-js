let nock = require('nock');

module.exports.hash = "66464384b06d60aadae20e953197423f";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://joherediteststorage.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/integration', {"PartitionKey":"P2__node","RowKey":"R2","testField":"2020-09-17T00:00:00.000Z","testField@odata.type":"Edm.DateTime"})
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Content-Length',
  '0',
  'ETag',
  `W/"datetime'2020-08-21T19%3A09%3A58.7696874Z'"`,
  'Location',
  "https://joherediteststorage.table.core.windows.net/integration(PartitionKey='P2__node',RowKey='R2')",
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5d2a3e33-6002-00e0-23ee-77b25c000000',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Preference-Applied',
  'return-no-content',
  'DataServiceId',
  "https://joherediteststorage.table.core.windows.net/integration(PartitionKey='P2__node',RowKey='R2')",
  'Date',
  'Fri, 21 Aug 2020 19:09:57 GMT',
  'Connection',
  'close'
]);

nock('https://joherediteststorage.table.core.windows.net:443', {"encodedQueryParams":true})
  .get('/integration(PartitionKey=%27P2__node%27,RowKey=%27R2%27)')
  .query(true)
  .reply(200, {"odata.metadata":"https://joherediteststorage.table.core.windows.net/$metadata#integration/@Element","odata.etag":"W/\"datetime'2020-08-21T19%3A09%3A58.7696874Z'\"","PartitionKey":"P2__node","RowKey":"R2","Timestamp":"2020-08-21T19:09:58.7696874Z","testField@odata.type":"Edm.DateTime","testField":"2020-09-17T00:00:00Z"}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'ETag',
  `W/"datetime'2020-08-21T19%3A09%3A58.7696874Z'"`,
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e6fbf2e5-f002-0088-31ee-77ec0d000000',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,X-Content-Type-Options,Cache-Control,ETag,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 21 Aug 2020 19:09:58 GMT',
  'Connection',
  'close'
]);
