let nock = require('nock');

module.exports.hash = "7c5c883034ac8c8bd0bdd6e94ebe47d7";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://joherediteststorage.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/integration', {"PartitionKey":"P6","RowKey":"R6","testField":true,"testField@odata.type":"Edm.Boolean"})
  .reply(201, {"odata.metadata":"https://joherediteststorage.table.core.windows.net/$metadata#integration/@Element","odata.etag":"W/\"datetime'2020-08-17T22%3A44%3A36.0037966Z'\"","PartitionKey":"P6","RowKey":"R6","Timestamp":"2020-08-17T22:44:36.0037966Z","testField":true}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'ETag',
  `W/"datetime'2020-08-17T22%3A44%3A36.0037966Z'"`,
  'Location',
  "https://joherediteststorage.table.core.windows.net/integration(PartitionKey='P6',RowKey='R6')",
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ffe9f7e4-9002-0054-31e7-74be5e000000',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 17 Aug 2020 22:44:35 GMT',
  'Connection',
  'close'
]);
