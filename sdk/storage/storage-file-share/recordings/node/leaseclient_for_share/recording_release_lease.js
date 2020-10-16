let nock = require('nock');

module.exports.hash = "a65d31233d61e48fa43a445144fb1bd3";

module.exports.testInfo = {"uniqueName":{"share":"share160121915174409919"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share160121915174409919')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 27 Sep 2020 15:05:51 GMT',
  'ETag',
  '"0x8D862F6D34596BD"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '09ab19e9-701a-006b-25df-94e952000000',
  'x-ms-client-request-id',
  '5df9990a-4985-4c0c-8e89-80eac0e902d6',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Sun, 27 Sep 2020 15:05:51 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share160121915174409919')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 27 Sep 2020 15:05:51 GMT',
  'ETag',
  '"0x8D862F6D34596BD"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1029341e-d01a-0000-15df-946ea6000000',
  'x-ms-client-request-id',
  '9cae3085-e564-44d1-8551-9645498da9de',
  'x-ms-version',
  '2020-02-10',
  'x-ms-lease-id',
  '0dbae786-d3e1-44dc-bf8d-b204f15f8798',
  'Date',
  'Sun, 27 Sep 2020 15:05:51 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share160121915174409919')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 27 Sep 2020 15:05:51 GMT',
  'ETag',
  '"0x8D862F6D34596BD"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '09ab19ef-701a-006b-29df-94e952000000',
  'x-ms-client-request-id',
  '0186484b-1d66-4a49-9d1e-ee7c9cd6ab57',
  'x-ms-version',
  '2020-02-10',
  'x-ms-lease-time',
  '0',
  'Date',
  'Sun, 27 Sep 2020 15:05:51 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share160121915174409919')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 27 Sep 2020 15:05:51 GMT',
  'ETag',
  '"0x8D862F6D34596BD"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '10293422-d01a-0000-17df-946ea6000000',
  'x-ms-client-request-id',
  '12b70c9f-ff6e-4371-bc0b-684279e9a84a',
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
  'TransactionOptimized',
  'x-ms-access-tier-change-time',
  'Sun, 27 Sep 2020 15:05:51 GMT',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Last-Modified,ETag,x-ms-lease-status,x-ms-lease-state,x-ms-has-immutability-policy,x-ms-has-legal-hold,x-ms-share-quota,x-ms-access-tier,x-ms-access-tier-change-time,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Sun, 27 Sep 2020 15:05:52 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share160121915174409919')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '09ab19f0-701a-006b-2adf-94e952000000',
  'x-ms-client-request-id',
  '3bad43e7-1b4d-4963-aac5-20ca9aa74bc0',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Sun, 27 Sep 2020 15:05:52 GMT'
]);
