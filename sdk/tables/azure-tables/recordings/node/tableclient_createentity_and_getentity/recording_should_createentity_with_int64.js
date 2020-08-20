let nock = require('nock');

module.exports.hash = "dba70ec24c6eb4f4a56b89d2edfd3b2b";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://joherediteststorage.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/integration', {"PartitionKey":"P4__node","RowKey":"R4","testField":"12345543221","testField@odata.type":"Edm.Int64"})
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Content-Length',
  '0',
  'ETag',
  `W/"datetime'2020-08-20T19%3A14%3A23.1652811Z'"`,
  'Location',
  "https://joherediteststorage.table.core.windows.net/integration(PartitionKey='P4__node',RowKey='R4')",
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '291db0d7-1002-00c6-1026-7729e8000000',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Preference-Applied',
  'return-no-content',
  'DataServiceId',
  "https://joherediteststorage.table.core.windows.net/integration(PartitionKey='P4__node',RowKey='R4')",
  'Date',
  'Thu, 20 Aug 2020 19:14:22 GMT',
  'Connection',
  'close'
]);

nock('https://joherediteststorage.table.core.windows.net:443', {"encodedQueryParams":true})
  .get('/integration(PartitionKey=%27P4__node%27,RowKey=%27R4%27)')
  .query(true)
  .reply(200, {"odata.metadata":"https://joherediteststorage.table.core.windows.net/$metadata#integration/@Element","odata.etag":"W/\"datetime'2020-08-20T19%3A14%3A23.1652811Z'\"","PartitionKey":"P4__node","RowKey":"R4","Timestamp":"2020-08-20T19:14:23.1652811Z","testField@odata.type":"Edm.Int64","testField":"12345543221"}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'ETag',
  `W/"datetime'2020-08-20T19%3A14%3A23.1652811Z'"`,
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'eacac47d-5002-00c1-3026-77df6d000000',
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
