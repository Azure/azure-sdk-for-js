let nock = require('nock');

module.exports.hash = "6fd9c6cc5f35aa6d79bc6c7e49850a95";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://joherediteststorage.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/integration', {"PartitionKey":"P5__node","RowKey":"R5","testField":123,"testField@odata.type":"Edm.Int32"})
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Content-Length',
  '0',
  'ETag',
  `W/"datetime'2020-08-21T19%3A09%3A59.4353765Z'"`,
  'Location',
  "https://joherediteststorage.table.core.windows.net/integration(PartitionKey='P5__node',RowKey='R5')",
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd468ecf4-9002-00b1-35ee-77aca9000000',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Preference-Applied',
  'return-no-content',
  'DataServiceId',
  "https://joherediteststorage.table.core.windows.net/integration(PartitionKey='P5__node',RowKey='R5')",
  'Date',
  'Fri, 21 Aug 2020 19:09:58 GMT',
  'Connection',
  'close'
]);

nock('https://joherediteststorage.table.core.windows.net:443', {"encodedQueryParams":true})
  .get('/integration(PartitionKey=%27P5__node%27,RowKey=%27R5%27)')
  .query(true)
  .reply(200, {"odata.metadata":"https://joherediteststorage.table.core.windows.net/$metadata#integration/@Element","odata.etag":"W/\"datetime'2020-08-21T19%3A09%3A59.4353765Z'\"","PartitionKey":"P5__node","RowKey":"R5","Timestamp":"2020-08-21T19:09:59.4353765Z","testField":123}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'ETag',
  `W/"datetime'2020-08-21T19%3A09%3A59.4353765Z'"`,
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd4ae72a6-1002-000a-7cee-774d5d000000',
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
