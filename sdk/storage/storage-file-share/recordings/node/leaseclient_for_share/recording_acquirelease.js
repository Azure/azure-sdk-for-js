let nock = require('nock');

module.exports.hash = "e7c6728c194646a0b741653675f3b017";

module.exports.testInfo = {"uniqueName":{"share":"share160121913625009003"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share160121913625009003')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 27 Sep 2020 15:05:37 GMT',
  'ETag',
  '"0x8D862F6CACD7503"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '09ab19a1-701a-006b-7ddf-94e952000000',
  'x-ms-client-request-id',
  'e03af896-ca88-4ea2-a6c1-9c26c9c3b70d',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Sun, 27 Sep 2020 15:05:36 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share160121913625009003')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 27 Sep 2020 15:05:37 GMT',
  'ETag',
  '"0x8D862F6CACD7503"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '09ab19a7-701a-006b-7fdf-94e952000000',
  'x-ms-client-request-id',
  '24d20fc5-657b-4412-b319-304b70ef4622',
  'x-ms-version',
  '2020-02-10',
  'x-ms-lease-id',
  'e9890485-bf47-4d9a-b3d0-aceb18506124',
  'Date',
  'Sun, 27 Sep 2020 15:05:37 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share160121913625009003')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 27 Sep 2020 15:05:37 GMT',
  'ETag',
  '"0x8D862F6CACD7503"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '09ab19a8-701a-006b-80df-94e952000000',
  'x-ms-client-request-id',
  '1f46739f-e596-4bf7-bba9-cf4a2e5952f1',
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
  'Sun, 27 Sep 2020 15:05:37 GMT',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Last-Modified,ETag,x-ms-lease-status,x-ms-lease-state,x-ms-lease-duration,x-ms-has-immutability-policy,x-ms-has-legal-hold,x-ms-share-quota,x-ms-access-tier,x-ms-access-tier-change-time,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Sun, 27 Sep 2020 15:05:37 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share160121913625009003')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 27 Sep 2020 15:05:37 GMT',
  'ETag',
  '"0x8D862F6CACD7503"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '09ab19ab-701a-006b-01df-94e952000000',
  'x-ms-client-request-id',
  '83ca9df5-68d9-4a20-854b-2367addddfec',
  'x-ms-version',
  '2020-02-10',
  'x-ms-lease-time',
  '0',
  'Date',
  'Sun, 27 Sep 2020 15:05:37 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share160121913625009003')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '09ab19ac-701a-006b-02df-94e952000000',
  'x-ms-client-request-id',
  '512f26c8-4153-4710-91d6-c6b880f23fe2',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Sun, 27 Sep 2020 15:05:38 GMT'
]);
