let nock = require('nock');

module.exports.hash = "493a7c86cc031356282fbce76c3dcfab";

module.exports.testInfo = {"uniqueName":{"share":"share160121915624906007"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share160121915624906007')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 27 Sep 2020 15:05:56 GMT',
  'ETag',
  '"0x8D862F6D5F4DFB1"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '09ab19f9-701a-006b-2fdf-94e952000000',
  'x-ms-client-request-id',
  'dba7c700-2c80-4264-baab-6b8ed85a6e25',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Sun, 27 Sep 2020 15:05:55 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share160121915624906007')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 27 Sep 2020 15:05:56 GMT',
  'ETag',
  '"0x8D862F6D5F4DFB1"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1029342e-d01a-0000-1fdf-946ea6000000',
  'x-ms-client-request-id',
  'ef03b1fe-bcc4-42c2-a79b-2a8d6aba56a0',
  'x-ms-version',
  '2020-02-10',
  'x-ms-lease-id',
  '03388176-4f73-4aa8-9fec-4b26cb744063',
  'Date',
  'Sun, 27 Sep 2020 15:05:56 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share160121915624906007')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 27 Sep 2020 15:05:56 GMT',
  'ETag',
  '"0x8D862F6D5F4DFB1"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '09ab19fc-701a-006b-30df-94e952000000',
  'x-ms-client-request-id',
  'a326809d-dcca-4c54-8a81-6af8dbe824e4',
  'x-ms-version',
  '2020-02-10',
  'x-ms-lease-time',
  '14',
  'Date',
  'Sun, 27 Sep 2020 15:05:56 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share160121915624906007')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 27 Sep 2020 15:05:56 GMT',
  'ETag',
  '"0x8D862F6D5F4DFB1"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '10293431-d01a-0000-20df-946ea6000000',
  'x-ms-client-request-id',
  '8c31cf4f-f0a8-4fb6-98e4-28a06be1f6ed',
  'x-ms-version',
  '2020-02-10',
  'x-ms-lease-time',
  '14',
  'Date',
  'Sun, 27 Sep 2020 15:05:57 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share160121915624906007')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 27 Sep 2020 15:05:56 GMT',
  'ETag',
  '"0x8D862F6D5F4DFB1"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '09ab19ff-701a-006b-32df-94e952000000',
  'x-ms-client-request-id',
  'd8712741-8fd5-42f1-8f62-303ff6fb4951',
  'x-ms-version',
  '2020-02-10',
  'x-ms-lease-time',
  '0',
  'Date',
  'Sun, 27 Sep 2020 15:05:57 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share160121915624906007')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '10293434-d01a-0000-22df-946ea6000000',
  'x-ms-client-request-id',
  '1f96c557-c69f-49cc-b4e8-34ee8bf5700e',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Sun, 27 Sep 2020 15:05:58 GMT'
]);
