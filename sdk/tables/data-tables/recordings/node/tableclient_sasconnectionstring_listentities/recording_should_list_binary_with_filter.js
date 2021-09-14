let nock = require('nock');

module.exports.hash = "0b8688e3662d6b682cad3000dc0e7d0b";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .get('/tableClientTestSASConnectionStringnode()')
  .query(true)
  .reply(200, {"odata.metadata":"https://fakeaccount.table.core.windows.net/$metadata#tableClientTestSASConnectionStringnode","value":[{"odata.etag":"W/\"datetime'2021-09-14T21%3A23%3A56.9315446Z'\"","PartitionKey":"listEntitiesTest","RowKey":"binary1","Timestamp":"2021-09-14T21:23:56.9315446Z","foo@odata.type":"Edm.Binary","foo":"QmFy"}]}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6ced2367-0002-0039-7aae-a9c11b000000',
  'x-ms-client-request-id',
  '53f47acd-91bb-4ce7-b3e8-b588637d5b9d',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,X-Content-Type-Options,Cache-Control,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 14 Sep 2021 21:23:59 GMT'
]);
