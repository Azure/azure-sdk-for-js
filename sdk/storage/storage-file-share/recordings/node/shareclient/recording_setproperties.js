let nock = require('nock');

module.exports.hash = "9b7ca4d84244be16ba8f69c9a51c4d47";

module.exports.testInfo = {"uniqueName":{"share":"share160378660814408877"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share160378660814408877')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 27 Oct 2020 08:16:49 GMT',
  'ETag',
  '"0x8D87A50A7210F65"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a58e8190-b01a-0009-2d39-ac102e000000',
  'x-ms-client-request-id',
  'dd905004-de24-4ae9-b031-d1ee50324ba9',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Tue, 27 Oct 2020 08:16:49 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share160378660814408877')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 27 Oct 2020 08:16:49 GMT',
  'ETag',
  '"0x8D87A50A7620BD1"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a58e8193-b01a-0009-2e39-ac102e000000',
  'x-ms-client-request-id',
  'b8682f4f-d0e9-4fcb-8e55-4fc67423bfd6',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Tue, 27 Oct 2020 08:16:49 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share160378660814408877')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 27 Oct 2020 08:16:49 GMT',
  'ETag',
  '"0x8D87A50A7620BD1"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a58e8196-b01a-0009-3139-ac102e000000',
  'x-ms-client-request-id',
  '4a2e0ac7-13a0-4d51-84a4-91f999405a7a',
  'x-ms-version',
  '2020-02-10',
  'x-ms-has-immutability-policy',
  'false',
  'x-ms-has-legal-hold',
  'false',
  'x-ms-share-quota',
  '20',
  'x-ms-access-tier',
  'Hot',
  'x-ms-access-tier-change-time',
  'Tue, 27 Oct 2020 08:16:49 GMT',
  'x-ms-access-tier-transition-state',
  'pending-from-transactionOptimized',
  'Date',
  'Tue, 27 Oct 2020 08:16:49 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share160378660814408877')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a58e819a-b01a-0009-3439-ac102e000000',
  'x-ms-client-request-id',
  '47f8d99e-caae-4b43-9ca2-d1000627fe16',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Tue, 27 Oct 2020 08:16:50 GMT'
]);
