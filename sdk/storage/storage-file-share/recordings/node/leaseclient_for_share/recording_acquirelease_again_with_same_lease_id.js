let nock = require('nock');

module.exports.hash = "9bb69300bde42a870db6ff1116d04dd1";

module.exports.testInfo = {"uniqueName":{"share":"share160121914509202924"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share160121914509202924')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 27 Sep 2020 15:05:45 GMT',
  'ETag',
  '"0x8D862F6CF4EC55A"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '09ab19cc-701a-006b-16df-94e952000000',
  'x-ms-client-request-id',
  'c98c28ed-9d83-4e19-a967-fed3be225172',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Sun, 27 Sep 2020 15:05:44 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share160121914509202924')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 27 Sep 2020 15:05:45 GMT',
  'ETag',
  '"0x8D862F6CF4EC55A"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '09ab19ce-701a-006b-17df-94e952000000',
  'x-ms-client-request-id',
  '26938b2b-582a-4369-af7a-8b17a6b58072',
  'x-ms-version',
  '2020-02-10',
  'x-ms-lease-id',
  'e9890485-bf47-4d9a-b3d0-aceb18506124',
  'Date',
  'Sun, 27 Sep 2020 15:05:44 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share160121914509202924')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 27 Sep 2020 15:05:45 GMT',
  'ETag',
  '"0x8D862F6CF4EC55A"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '09ab19d0-701a-006b-18df-94e952000000',
  'x-ms-client-request-id',
  'f9ca9d53-824f-4ae7-bc5b-7cc7f0c36fde',
  'x-ms-version',
  '2020-02-10',
  'x-ms-lease-id',
  'e9890485-bf47-4d9a-b3d0-aceb18506124',
  'Date',
  'Sun, 27 Sep 2020 15:05:45 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share160121914509202924')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 27 Sep 2020 15:05:45 GMT',
  'ETag',
  '"0x8D862F6CF4EC55A"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1029340b-d01a-0000-0bdf-946ea6000000',
  'x-ms-client-request-id',
  '8c5511e9-264e-4671-9209-78c5c2b3b5a4',
  'x-ms-version',
  '2020-02-10',
  'x-ms-lease-time',
  '0',
  'Date',
  'Sun, 27 Sep 2020 15:05:46 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share160121914509202924')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '09ab19d9-701a-006b-1cdf-94e952000000',
  'x-ms-client-request-id',
  'c1f93a25-8697-4fe9-a0f8-b2225fe4facf',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Sun, 27 Sep 2020 15:05:46 GMT'
]);
