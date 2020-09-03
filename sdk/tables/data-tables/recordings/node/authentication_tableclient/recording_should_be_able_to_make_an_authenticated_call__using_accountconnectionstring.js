let nock = require('nock');

module.exports.hash = "1624039077a07682102f11811cd3ed98";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://fakestorageaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/integration', {"PartitionKey":"AuthTest","RowKey":"1599148530464","foo":1599148530464})
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Content-Length',
  '0',
  'ETag',
  `W/"datetime'2020-09-03T15%3A55%3A30.5523482Z'"`,
  'Location',
  "https://fakestorageaccount.table.core.windows.net/integration(PartitionKey='AuthTest',RowKey='1599148530464')",
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f6b1bc2f-4002-00b8-2f0a-82b627000000',
  'x-ms-client-request-id',
  '56f7a58b-3646-4b36-a656-5968aded0b12',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Preference-Applied',
  'return-no-content',
  'DataServiceId',
  "https://fakestorageaccount.table.core.windows.net/integration(PartitionKey='AuthTest',RowKey='1599148530464')",
  'Date',
  'Thu, 03 Sep 2020 15:55:29 GMT'
]);
