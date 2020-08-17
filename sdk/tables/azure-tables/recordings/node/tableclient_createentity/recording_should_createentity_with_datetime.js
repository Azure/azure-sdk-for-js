let nock = require('nock');

module.exports.hash = "855e691a42f784f7e3f2ac3555e431d9";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://joherediteststorage.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/integration', {"PartitionKey":"P7","RowKey":"R7","testField":"2020-09-17T00:00:00.000Z","testField@odata.type":"Edm.DateTime"})
  .reply(201, {"odata.metadata":"https://joherediteststorage.table.core.windows.net/$metadata#integration/@Element","odata.etag":"W/\"datetime'2020-08-17T22%3A44%3A36.1162412Z'\"","PartitionKey":"P7","RowKey":"R7","Timestamp":"2020-08-17T22:44:36.1162412Z","testField@odata.type":"Edm.DateTime","testField":"2020-09-17T00:00:00Z"}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'ETag',
  `W/"datetime'2020-08-17T22%3A44%3A36.1162412Z'"`,
  'Location',
  "https://joherediteststorage.table.core.windows.net/integration(PartitionKey='P7',RowKey='R7')",
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '25e1199f-b002-0103-7ee7-741186000000',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 17 Aug 2020 22:44:35 GMT',
  'Connection',
  'close'
]);
