let nock = require('nock');

module.exports.hash = "ace451a3a15db6364709f9d848d931d8";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://joheredistorage2.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/Tables', {"TableName":"testTableSASConnectionStringnode"})
  .query(true)
  .reply(201, {"odata.metadata":"https://joheredistorage2.table.core.windows.net/$metadata#Tables/@Element","TableName":"testTableSASConnectionStringnode"}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Location',
  "https://joheredistorage2.table.core.windows.net/Tables('testTableSASConnectionStringnode')",
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2c0d80f3-7002-00b5-02cd-5c8c40000000',
  'x-ms-client-request-id',
  'f241f692-a6ba-4bb0-819e-c735cc58d80e',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Preference-Applied',
  'return-content',
  'Date',
  'Wed, 09 Jun 2021 01:17:10 GMT'
]);

nock('https://joheredistorage2.table.core.windows.net:443', {"encodedQueryParams":true})
  .get('/Tables')
  .query(true)
  .reply(200, {"odata.metadata":"https://joheredistorage2.table.core.windows.net/$metadata#Tables","value":[{"TableName":"testTableSASConnectionStringnode"}]}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2c0d810c-7002-00b5-18cd-5c8c40000000',
  'x-ms-client-request-id',
  'b9e5d704-b990-49a9-ab61-f4a5fd9764ec',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,X-Content-Type-Options,Cache-Control,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 09 Jun 2021 01:17:10 GMT'
]);

nock('https://joheredistorage2.table.core.windows.net:443', {"encodedQueryParams":true})
  .delete(`/Tables('testTableSASConnectionStringnode')`)
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2c0d811d-7002-00b5-28cd-5c8c40000000',
  'x-ms-client-request-id',
  '1d6ee690-b73f-4038-ac98-42ef378f1112',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 09 Jun 2021 01:17:10 GMT'
]);
