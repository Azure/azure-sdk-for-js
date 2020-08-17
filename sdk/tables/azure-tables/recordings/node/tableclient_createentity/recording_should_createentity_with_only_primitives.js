let nock = require('nock');

module.exports.hash = "389078ebc1532242e610c149e2a3532b";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://joherediteststorage.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/integration', {"PartitionKey":"P99","RowKey":"R1","testField":"testEntity"})
  .reply(201, {"odata.metadata":"https://joherediteststorage.table.core.windows.net/$metadata#integration/@Element","odata.etag":"W/\"datetime'2020-08-17T22%3A44%3A35.4183385Z'\"","PartitionKey":"P99","RowKey":"R1","Timestamp":"2020-08-17T22:44:35.4183385Z","testField":"testEntity"}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'ETag',
  `W/"datetime'2020-08-17T22%3A44%3A35.4183385Z'"`,
  'Location',
  "https://joherediteststorage.table.core.windows.net/integration(PartitionKey='P99',RowKey='R1')",
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f8acb334-0002-0138-6ee7-7453d8000000',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 17 Aug 2020 22:44:34 GMT',
  'Connection',
  'close'
]);
