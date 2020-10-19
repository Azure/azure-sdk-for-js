let nock = require('nock');

module.exports.hash = "c44ff11ca905a9bc01bf763e55c36b6b";

module.exports.testInfo = {"uniqueName":{"share":"share160121916168004389"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share160121916168004389')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 27 Sep 2020 15:06:01 GMT',
  'ETag',
  '"0x8D862F6D9316731"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '09ab1a0d-701a-006b-3adf-94e952000000',
  'x-ms-client-request-id',
  'ccb474c2-2540-4dac-a45b-5d97360013aa',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Sun, 27 Sep 2020 15:06:00 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share160121916168004389')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 27 Sep 2020 15:06:01 GMT',
  'ETag',
  '"0x8D862F6D9316731"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '10293444-d01a-0000-29df-946ea6000000',
  'x-ms-client-request-id',
  '9d9081c1-1910-4df6-a11f-e47542dfb0d9',
  'x-ms-version',
  '2020-02-10',
  'x-ms-lease-id',
  'e9890485-bf47-4d9a-b3d0-aceb18506124',
  'Date',
  'Sun, 27 Sep 2020 15:06:01 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share160121916168004389')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 27 Sep 2020 15:06:01 GMT',
  'ETag',
  '"0x8D862F6D9316731"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '09ab1a14-701a-006b-3cdf-94e952000000',
  'x-ms-client-request-id',
  '2f91c9e9-d4fc-4ec3-94f4-83fc8e85cd61',
  'x-ms-version',
  '2020-02-10',
  'x-ms-lease-id',
  'e9890485-bf47-4d9a-b3d0-aceb18506124',
  'Date',
  'Sun, 27 Sep 2020 15:06:01 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share160121916168004389')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 27 Sep 2020 15:06:01 GMT',
  'ETag',
  '"0x8D862F6D9316731"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '10293448-d01a-0000-2adf-946ea6000000',
  'x-ms-client-request-id',
  '7960eb34-b6f4-4248-9617-7c62580717f8',
  'x-ms-version',
  '2020-02-10',
  'x-ms-lease-time',
  '0',
  'Date',
  'Sun, 27 Sep 2020 15:06:02 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share160121916168004389')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '09ab1a16-701a-006b-3ddf-94e952000000',
  'x-ms-client-request-id',
  '32b0d990-b5ed-4dbc-8f37-1ede76caf127',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Sun, 27 Sep 2020 15:06:02 GMT'
]);
