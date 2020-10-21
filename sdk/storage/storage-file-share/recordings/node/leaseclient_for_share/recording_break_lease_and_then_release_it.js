let nock = require('nock');

module.exports.hash = "9a059dd3de5d823392423f909fdac826";

module.exports.testInfo = {"uniqueName":{"share":"share160121915369200772"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share160121915369200772')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 27 Sep 2020 15:05:53 GMT',
  'ETag',
  '"0x8D862F6D46E9B2F"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '10293423-d01a-0000-18df-946ea6000000',
  'x-ms-client-request-id',
  '0041fd5b-fc0b-467d-a60f-008c594ee5e3',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Sun, 27 Sep 2020 15:05:53 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share160121915369200772')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 27 Sep 2020 15:05:53 GMT',
  'ETag',
  '"0x8D862F6D46E9B2F"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '09ab19f2-701a-006b-2bdf-94e952000000',
  'x-ms-client-request-id',
  '222b1a4d-8e7b-4414-8f4f-37b5f6773801',
  'x-ms-version',
  '2020-02-10',
  'x-ms-lease-id',
  '79efc86e-c051-4696-9c60-eee1a9f93e2a',
  'Date',
  'Sun, 27 Sep 2020 15:05:53 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share160121915369200772')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 27 Sep 2020 15:05:53 GMT',
  'ETag',
  '"0x8D862F6D46E9B2F"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '10293425-d01a-0000-19df-946ea6000000',
  'x-ms-client-request-id',
  '8b02749a-66b9-45a5-8607-1dd50df0e26a',
  'x-ms-version',
  '2020-02-10',
  'x-ms-lease-status',
  'locked',
  'x-ms-lease-state',
  'leased',
  'x-ms-lease-duration',
  'infinite',
  'x-ms-has-immutability-policy',
  'false',
  'x-ms-has-legal-hold',
  'false',
  'x-ms-share-quota',
  '5120',
  'x-ms-access-tier',
  'TransactionOptimized',
  'x-ms-access-tier-change-time',
  'Sun, 27 Sep 2020 15:05:53 GMT',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Last-Modified,ETag,x-ms-lease-status,x-ms-lease-state,x-ms-lease-duration,x-ms-has-immutability-policy,x-ms-has-legal-hold,x-ms-share-quota,x-ms-access-tier,x-ms-access-tier-change-time,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Sun, 27 Sep 2020 15:05:54 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share160121915369200772')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 27 Sep 2020 15:05:53 GMT',
  'ETag',
  '"0x8D862F6D46E9B2F"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '09ab19f5-701a-006b-2cdf-94e952000000',
  'x-ms-client-request-id',
  '3f43de1d-caef-4f80-a649-a17addb83668',
  'x-ms-version',
  '2020-02-10',
  'x-ms-lease-time',
  '0',
  'Date',
  'Sun, 27 Sep 2020 15:05:54 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share160121915369200772')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 27 Sep 2020 15:05:53 GMT',
  'ETag',
  '"0x8D862F6D46E9B2F"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '10293428-d01a-0000-1adf-946ea6000000',
  'x-ms-client-request-id',
  'bf08638b-5f88-4f36-8bc8-5d65812fea43',
  'x-ms-version',
  '2020-02-10',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'broken',
  'x-ms-has-immutability-policy',
  'false',
  'x-ms-has-legal-hold',
  'false',
  'x-ms-share-quota',
  '5120',
  'x-ms-access-tier',
  'TransactionOptimized',
  'x-ms-access-tier-change-time',
  'Sun, 27 Sep 2020 15:05:53 GMT',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Last-Modified,ETag,x-ms-lease-status,x-ms-lease-state,x-ms-has-immutability-policy,x-ms-has-legal-hold,x-ms-share-quota,x-ms-access-tier,x-ms-access-tier-change-time,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Sun, 27 Sep 2020 15:05:55 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share160121915369200772')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 27 Sep 2020 15:05:53 GMT',
  'ETag',
  '"0x8D862F6D46E9B2F"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '09ab19f7-701a-006b-2edf-94e952000000',
  'x-ms-client-request-id',
  '8abe0e10-10f4-4008-9051-40b2c0218664',
  'x-ms-version',
  '2020-02-10',
  'x-ms-lease-time',
  '0',
  'Date',
  'Sun, 27 Sep 2020 15:05:54 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share160121915369200772')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1029342b-d01a-0000-1ddf-946ea6000000',
  'x-ms-client-request-id',
  '9c8799f3-c8b6-4428-a7e6-ea7324e481e1',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Sun, 27 Sep 2020 15:05:55 GMT'
]);
