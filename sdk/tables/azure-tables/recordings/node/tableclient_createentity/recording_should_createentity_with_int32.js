let nock = require('nock');

module.exports.hash = "0330b9098dbf61a61ac02cdd4372ccea";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://joherediteststorage.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/integration', {"PartitionKey":"P5","RowKey":"R5","testField":123,"testField@odata.type":"Edm.Int32"})
  .reply(201, {"odata.metadata":"https://joherediteststorage.table.core.windows.net/$metadata#integration/@Element","odata.etag":"W/\"datetime'2020-08-17T22%3A44%3A35.8796938Z'\"","PartitionKey":"P5","RowKey":"R5","Timestamp":"2020-08-17T22:44:35.8796938Z","testField":123}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'ETag',
  `W/"datetime'2020-08-17T22%3A44%3A35.8796938Z'"`,
  'Location',
  "https://joherediteststorage.table.core.windows.net/integration(PartitionKey='P5',RowKey='R5')",
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7142577e-9002-0032-39e7-740c04000000',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 17 Aug 2020 22:44:35 GMT',
  'Connection',
  'close'
]);
