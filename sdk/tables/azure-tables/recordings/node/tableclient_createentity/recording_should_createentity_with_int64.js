let nock = require('nock');

module.exports.hash = "2cdd34d6a5e5f4e3406bc8ddb1cc4d09";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://joherediteststorage.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/integration', {"PartitionKey":"P4","RowKey":"R4","testField":"12345543221","testField@odata.type":"Edm.Int64"})
  .reply(201, {"odata.metadata":"https://joherediteststorage.table.core.windows.net/$metadata#integration/@Element","odata.etag":"W/\"datetime'2020-08-17T22%3A44%3A35.7711874Z'\"","PartitionKey":"P4","RowKey":"R4","Timestamp":"2020-08-17T22:44:35.7711874Z","testField@odata.type":"Edm.Int64","testField":"12345543221"}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'ETag',
  `W/"datetime'2020-08-17T22%3A44%3A35.7711874Z'"`,
  'Location',
  "https://joherediteststorage.table.core.windows.net/integration(PartitionKey='P4',RowKey='R4')",
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ff948156-8002-000f-2de7-74b922000000',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 17 Aug 2020 22:44:35 GMT',
  'Connection',
  'close'
]);
