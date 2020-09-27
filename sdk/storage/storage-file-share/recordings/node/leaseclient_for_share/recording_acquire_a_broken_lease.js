let nock = require('nock');

module.exports.hash = "6d5f59db24f5eaf5cfa76f90ceae5b63";

module.exports.testInfo = {"uniqueName":{"share":"share160121915870707782"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share160121915870707782')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 27 Sep 2020 15:05:58 GMT',
  'ETag',
  '"0x8D862F6D76BBE40"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '09ab1a02-701a-006b-34df-94e952000000',
  'x-ms-client-request-id',
  'ff0fc7e4-c258-4727-a4cc-05e520da9b77',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Sun, 27 Sep 2020 15:05:57 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share160121915870707782')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 27 Sep 2020 15:05:58 GMT',
  'ETag',
  '"0x8D862F6D76BBE40"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '10293435-d01a-0000-23df-946ea6000000',
  'x-ms-client-request-id',
  '919e03e9-f503-4e20-85c9-2dd6b67de9ce',
  'x-ms-version',
  '2020-02-10',
  'x-ms-lease-id',
  '99c58d68-34fa-4a19-b6f6-ed6a85b7bf9a',
  'Date',
  'Sun, 27 Sep 2020 15:05:58 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share160121915870707782')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 27 Sep 2020 15:05:58 GMT',
  'ETag',
  '"0x8D862F6D76BBE40"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '09ab1a05-701a-006b-35df-94e952000000',
  'x-ms-client-request-id',
  '262b8833-c5e5-4e24-a88e-daef62dfcc25',
  'x-ms-version',
  '2020-02-10',
  'x-ms-lease-time',
  '0',
  'Date',
  'Sun, 27 Sep 2020 15:05:58 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share160121915870707782')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 27 Sep 2020 15:05:58 GMT',
  'ETag',
  '"0x8D862F6D76BBE40"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '10293439-d01a-0000-25df-946ea6000000',
  'x-ms-client-request-id',
  '03a8877b-7bde-4bd8-9948-72f6578d59c6',
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
  'Sun, 27 Sep 2020 15:05:58 GMT',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Last-Modified,ETag,x-ms-lease-status,x-ms-lease-state,x-ms-has-immutability-policy,x-ms-has-legal-hold,x-ms-share-quota,x-ms-access-tier,x-ms-access-tier-change-time,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Sun, 27 Sep 2020 15:05:59 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share160121915870707782')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 27 Sep 2020 15:05:58 GMT',
  'ETag',
  '"0x8D862F6D76BBE40"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '09ab1a06-701a-006b-36df-94e952000000',
  'x-ms-client-request-id',
  '377bc8c4-ffdb-4e25-9495-159b0a4bc567',
  'x-ms-version',
  '2020-02-10',
  'x-ms-lease-id',
  '99c58d68-34fa-4a19-b6f6-ed6a85b7bf9a',
  'Date',
  'Sun, 27 Sep 2020 15:05:59 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share160121915870707782')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 27 Sep 2020 15:05:58 GMT',
  'ETag',
  '"0x8D862F6D76BBE40"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1029343b-d01a-0000-26df-946ea6000000',
  'x-ms-client-request-id',
  '2c773a78-2c4e-444c-9e40-cb2606595233',
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
  'Sun, 27 Sep 2020 15:05:58 GMT',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Last-Modified,ETag,x-ms-lease-status,x-ms-lease-state,x-ms-lease-duration,x-ms-has-immutability-policy,x-ms-has-legal-hold,x-ms-share-quota,x-ms-access-tier,x-ms-access-tier-change-time,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Sun, 27 Sep 2020 15:06:00 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share160121915870707782')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 27 Sep 2020 15:05:58 GMT',
  'ETag',
  '"0x8D862F6D76BBE40"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '09ab1a0a-701a-006b-38df-94e952000000',
  'x-ms-client-request-id',
  '188634eb-e2e7-4062-ac72-bc6dc0c786dc',
  'x-ms-version',
  '2020-02-10',
  'x-ms-lease-time',
  '0',
  'Date',
  'Sun, 27 Sep 2020 15:06:00 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share160121915870707782')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1029343f-d01a-0000-27df-946ea6000000',
  'x-ms-client-request-id',
  '1477e25d-d679-4630-aa28-66ff023369f7',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Sun, 27 Sep 2020 15:06:01 GMT'
]);
