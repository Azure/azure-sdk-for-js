let nock = require('nock');

module.exports.hash = "dc5da3094ca5f35040a8e7541cfa5754";

module.exports.testInfo = {"uniqueName":{"share":"share160121914170908383"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share160121914170908383')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 27 Sep 2020 15:05:41 GMT',
  'ETag',
  '"0x8D862F6CD4A3321"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '09ab19b9-701a-006b-09df-94e952000000',
  'x-ms-client-request-id',
  '7f0b60d7-9d8a-412c-9565-452c41b0efe7',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Sun, 27 Sep 2020 15:05:41 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share160121914170908383')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 27 Sep 2020 15:05:41 GMT',
  'ETag',
  '"0x8D862F6CD4A3321"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '09ab19bb-701a-006b-0adf-94e952000000',
  'x-ms-client-request-id',
  '0dfa5371-08c1-4a36-ab85-ced76c0b7bba',
  'x-ms-version',
  '2020-02-10',
  'x-ms-lease-id',
  'e58a14e2-562c-43af-a486-939fa5ce51a4',
  'Date',
  'Sun, 27 Sep 2020 15:05:41 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share160121914170908383')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 27 Sep 2020 15:05:41 GMT',
  'ETag',
  '"0x8D862F6CD4A3321"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '09ab19bf-701a-006b-0cdf-94e952000000',
  'x-ms-client-request-id',
  '699db084-bcbb-4c61-9349-ac266e352b30',
  'x-ms-version',
  '2020-02-10',
  'x-ms-lease-status',
  'locked',
  'x-ms-lease-state',
  'leased',
  'x-ms-lease-duration',
  'fixed',
  'x-ms-has-immutability-policy',
  'false',
  'x-ms-has-legal-hold',
  'false',
  'x-ms-share-quota',
  '5120',
  'x-ms-access-tier',
  'TransactionOptimized',
  'x-ms-access-tier-change-time',
  'Sun, 27 Sep 2020 15:05:41 GMT',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Last-Modified,ETag,x-ms-lease-status,x-ms-lease-state,x-ms-lease-duration,x-ms-has-immutability-policy,x-ms-has-legal-hold,x-ms-share-quota,x-ms-access-tier,x-ms-access-tier-change-time,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Sun, 27 Sep 2020 15:05:41 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share160121914170908383')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 27 Sep 2020 15:05:41 GMT',
  'ETag',
  '"0x8D862F6CD4A3321"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '09ab19c1-701a-006b-0edf-94e952000000',
  'x-ms-client-request-id',
  '990b4663-d4c0-4db1-bde8-b3785c2b4721',
  'x-ms-version',
  '2020-02-10',
  'x-ms-lease-time',
  '0',
  'Date',
  'Sun, 27 Sep 2020 15:05:42 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share160121914170908383')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '09ab19c2-701a-006b-0fdf-94e952000000',
  'x-ms-client-request-id',
  '31daab21-08f5-403d-ac01-bd6c8d40135d',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Sun, 27 Sep 2020 15:05:42 GMT'
]);
