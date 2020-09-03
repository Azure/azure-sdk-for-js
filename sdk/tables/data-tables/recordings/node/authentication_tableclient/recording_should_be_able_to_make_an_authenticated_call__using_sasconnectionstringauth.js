let nock = require('nock');

module.exports.hash = "8a54c067c299fd0590f902671d020e68";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://fakestorageaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/integration', {"PartitionKey":"AuthTest","RowKey":"1599148530067","foo":1599148530067})
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Content-Length',
  '0',
  'ETag',
  `W/"datetime'2020-09-03T15%3A55%3A30.1828054Z'"`,
  'Location',
  "https://fakestorageaccount.table.core.windows.net/integration(PartitionKey='AuthTest',RowKey='1599148530067')",
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'dd03eb20-f002-0029-5c0a-822296000000',
  'x-ms-client-request-id',
  'db348c24-0c05-4b9b-819c-0dbe80b7f348',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Preference-Applied',
  'return-no-content',
  'DataServiceId',
  "https://fakestorageaccount.table.core.windows.net/integration(PartitionKey='AuthTest',RowKey='1599148530067')",
  'Date',
  'Thu, 03 Sep 2020 15:55:29 GMT'
]);
