let nock = require('nock');

module.exports.hash = "605aa7c32fc39d9cef1923e874e73573";

module.exports.testInfo = {"uniqueName":{"share":"share160121913935406942"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share160121913935406942')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 27 Sep 2020 15:05:39 GMT',
  'ETag',
  '"0x8D862F6CBE30EE1"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '09ab19ae-701a-006b-03df-94e952000000',
  'x-ms-client-request-id',
  '989c429b-eff5-4ad5-b6fa-92bdb27c3fa1',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Sun, 27 Sep 2020 15:05:38 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share160121913935406942')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 27 Sep 2020 15:05:39 GMT',
  'ETag',
  '"0x8D862F6CBE30EE1"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '09ab19b0-701a-006b-04df-94e952000000',
  'x-ms-client-request-id',
  '8ca972b5-5c7f-4c70-9883-f6ef73c41657',
  'x-ms-version',
  '2020-02-10',
  'x-ms-snapshot',
  '2020-09-27T15:05:39.0000000Z',
  'Date',
  'Sun, 27 Sep 2020 15:05:39 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share160121913935406942')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 27 Sep 2020 15:05:39 GMT',
  'ETag',
  '"0x8D862F6CBE30EE1"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '09ab19b1-701a-006b-05df-94e952000000',
  'x-ms-client-request-id',
  'bd6b7325-2e67-4d9e-a523-6c8fc329cae9',
  'x-ms-version',
  '2020-02-10',
  'x-ms-lease-id',
  'e9890485-bf47-4d9a-b3d0-aceb18506124',
  'Date',
  'Sun, 27 Sep 2020 15:05:39 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share160121913935406942')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 27 Sep 2020 15:05:39 GMT',
  'ETag',
  '"0x8D862F6CBE30EE1"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '09ab19b3-701a-006b-06df-94e952000000',
  'x-ms-client-request-id',
  'a0782773-a8d9-40d8-9f81-5d1bc9b9a568',
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
  'Sun, 27 Sep 2020 15:05:39 GMT',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Last-Modified,ETag,x-ms-lease-status,x-ms-lease-state,x-ms-lease-duration,x-ms-has-immutability-policy,x-ms-has-legal-hold,x-ms-share-quota,x-ms-access-tier,x-ms-access-tier-change-time,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Sun, 27 Sep 2020 15:05:39 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share160121913935406942')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 27 Sep 2020 15:05:39 GMT',
  'ETag',
  '"0x8D862F6CBE30EE1"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '09ab19b6-701a-006b-07df-94e952000000',
  'x-ms-client-request-id',
  'e34ff711-1b5b-4d8b-9876-0d6a0c5d6b4e',
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
  'Sun, 27 Sep 2020 15:05:39 GMT',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Last-Modified,ETag,x-ms-lease-status,x-ms-lease-state,x-ms-has-immutability-policy,x-ms-has-legal-hold,x-ms-share-quota,x-ms-access-tier,x-ms-access-tier-change-time,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Sun, 27 Sep 2020 15:05:40 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share160121913935406942')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '09ab19b7-701a-006b-08df-94e952000000',
  'x-ms-client-request-id',
  '526d4b18-9d40-4816-b1e2-d47879e50506',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Sun, 27 Sep 2020 15:05:40 GMT'
]);
