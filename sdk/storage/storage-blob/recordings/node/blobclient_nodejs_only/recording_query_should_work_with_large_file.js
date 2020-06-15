let nock = require('nock');

module.exports.hash = "d3f0ebebf3dcd28ed374f37ebe29b4a8";

module.exports.testInfo = {"uniqueName":{"container":"container159210828019402829","blob":"blob159210828022206926"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159210828019402829')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:18:00 GMT',
  'ETag',
  '"0x8D81019EC91FF95"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1309aa9-201e-003e-3502-42dadf000000',
  'x-ms-client-request-id',
  '544d0ca6-802d-4389-9243-58eafcb33f3c',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Sun, 14 Jun 2020 04:17:59 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159210828019402829/blob159210828022206926', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:18:00 GMT',
  'ETag',
  '"0x8D81019EC948CAB"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1309ab6-201e-003e-4102-42dadf000000',
  'x-ms-client-request-id',
  'fd989b6b-5e28-4af2-bde7-aba51177b587',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-06-14T04:18:00.2310315Z',
  'Date',
  'Sun, 14 Jun 2020 04:17:59 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159210828019402829')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1309abc-201e-003e-4702-42dadf000000',
  'x-ms-client-request-id',
  '7d199c47-6cda-41fc-a28d-6fd02624abeb',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Sun, 14 Jun 2020 04:17:59 GMT'
]);
