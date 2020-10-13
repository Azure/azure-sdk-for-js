let nock = require('nock');

module.exports.hash = "97606f0e609c7dd5b3f6d2632d8e969f";

module.exports.testInfo = {"uniqueName":{"share":"share160223286522402314"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share160223286522402314')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 09 Oct 2020 08:41:05 GMT',
  'ETag',
  '"0x8D86C2F0F99CE13"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '99321f04-901a-003e-0417-9ef9d9000000',
  'x-ms-client-request-id',
  'caeb897f-b0ee-4f12-b4c6-7aea17f48b80',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Fri, 09 Oct 2020 08:41:04 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share160223286522402314')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 09 Oct 2020 08:41:05 GMT',
  'ETag',
  '"0x8D86C2F0FCA822C"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '99321f07-901a-003e-0617-9ef9d9000000',
  'x-ms-client-request-id',
  '4c684016-8e01-4c45-b31e-2d32e05936d5',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Fri, 09 Oct 2020 08:41:04 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share160223286522402314')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 09 Oct 2020 08:41:05 GMT',
  'ETag',
  '"0x8D86C2F0FCA822C"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '99321f08-901a-003e-0717-9ef9d9000000',
  'x-ms-client-request-id',
  '876b515a-7d8e-4f3d-84e3-d7deef1b3a3c',
  'x-ms-version',
  '2020-02-10',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-has-immutability-policy',
  'false',
  'x-ms-has-legal-hold',
  'false',
  'x-ms-share-quota',
  '5120',
  'x-ms-access-tier',
  'Hot',
  'x-ms-access-tier-change-time',
  'Fri, 09 Oct 2020 08:41:05 GMT',
  'x-ms-access-tier-transition-state',
  'pending-from-transactionOptimized',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Last-Modified,ETag,x-ms-lease-status,x-ms-lease-state,x-ms-has-immutability-policy,x-ms-has-legal-hold,x-ms-share-quota,x-ms-access-tier,x-ms-access-tier-change-time,x-ms-access-tier-transition-state,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 09 Oct 2020 08:41:05 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share160223286522402314')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '99321f0a-901a-003e-0917-9ef9d9000000',
  'x-ms-client-request-id',
  '29dc1124-d0e4-4bdb-9b81-10b487fef1bd',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Fri, 09 Oct 2020 08:41:05 GMT'
]);
