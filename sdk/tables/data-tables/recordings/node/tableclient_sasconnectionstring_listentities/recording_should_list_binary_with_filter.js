let nock = require('nock');

module.exports.hash = "6566803ab2a3896ab65260ddd4fbe15e";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://joheredistorage2.table.core.windows.net:443', {"encodedQueryParams":true})
  .get('/tableClientTestSASConnectionStringnode()')
  .query(true)
  .reply(200, {"odata.metadata":"https://joheredistorage2.table.core.windows.net/$metadata#tableClientTestSASConnectionStringnode","value":[{"odata.etag":"W/\"datetime'2021-06-09T01%3A17%3A08.3345567Z'\"","PartitionKey":"listEntitiesTest","RowKey":"binary1","Timestamp":"2021-06-09T01:17:08.3345567Z","foo@odata.type":"Edm.Binary","foo":"QmFy"}]}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2c0d7f2c-7002-00b5-4fcd-5c8c40000000',
  'x-ms-client-request-id',
  'b5cf3965-d2b1-4b19-88bf-7a568de8c4cf',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,X-Content-Type-Options,Cache-Control,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 09 Jun 2021 01:17:09 GMT'
]);
