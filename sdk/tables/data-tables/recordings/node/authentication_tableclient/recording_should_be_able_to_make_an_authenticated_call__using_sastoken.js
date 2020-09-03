let nock = require('nock');

module.exports.hash = "8b0e97aaee8c26df4f50b3dee1e969b2";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://fakestorageaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/integration', {"PartitionKey":"AuthTest","RowKey":"1599148530242","foo":1599148530242})
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Content-Length',
  '0',
  'ETag',
  `W/"datetime'2020-09-03T15%3A55%3A30.3253585Z'"`,
  'Location',
  "https://fakestorageaccount.table.core.windows.net/integration(PartitionKey='AuthTest',RowKey='1599148530242')",
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a2c70d39-f002-00e5-0e0a-824623000000',
  'x-ms-client-request-id',
  'db2d6dd1-8b38-4a84-9748-acfc04e4684a',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Preference-Applied',
  'return-no-content',
  'DataServiceId',
  "https://fakestorageaccount.table.core.windows.net/integration(PartitionKey='AuthTest',RowKey='1599148530242')",
  'Date',
  'Thu, 03 Sep 2020 15:55:30 GMT'
]);
