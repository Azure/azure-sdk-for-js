let nock = require('nock');

module.exports.hash = "06f02e2a00cbaa57eef49620135556c5";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://joherediteststorage.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/integration', {"PartitionKey":"P2","RowKey":"R2","testField":"2020-09-17T00:00:00.000Z","testField@odata.type":"Edm.DateTime"})
  .reply(201, {"odata.metadata":"https://joherediteststorage.table.core.windows.net/$metadata#integration/@Element","odata.etag":"W/\"datetime'2020-08-17T22%3A44%3A35.5481964Z'\"","PartitionKey":"P2","RowKey":"R2","Timestamp":"2020-08-17T22:44:35.5481964Z","testField@odata.type":"Edm.DateTime","testField":"2020-09-17T00:00:00Z"}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'ETag',
  `W/"datetime'2020-08-17T22%3A44%3A35.5481964Z'"`,
  'Location',
  "https://joherediteststorage.table.core.windows.net/integration(PartitionKey='P2',RowKey='R2')",
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd342a26f-5002-006b-1be7-740982000000',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 17 Aug 2020 22:44:35 GMT',
  'Connection',
  'close'
]);
