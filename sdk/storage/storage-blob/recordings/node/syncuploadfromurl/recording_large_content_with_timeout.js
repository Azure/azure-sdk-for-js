let nock = require('nock');

module.exports.hash = "7fa7e6c7cc64795c138dee9b9094d35d";

module.exports.testInfo = {"uniqueName":{"container":"container160636021979206718","blockblob":"blockblob160636022118302096","srcblob/%2+%2F":"srcblob/%2+%2F160636022118401150"},"newDate":{"expiry":"2020-11-26T03:10:21.490Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container160636021979206718')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 26 Nov 2020 03:10:21 GMT',
  'ETag',
  '"0x8D891B8CF44C91D"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7e2064b9-f01e-0027-38a1-c34239000000',
  'x-ms-client-request-id',
  'e0f2ba4a-bd75-4aaa-9ac1-65b8567d357a',
  'x-ms-version',
  '2020-04-08',
  'Date',
  'Thu, 26 Nov 2020 03:10:20 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container160636021979206718/srcblob%2F%252%2B%252F160636022118401150', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Thu, 26 Nov 2020 03:10:21 GMT',
  'ETag',
  '"0x8D891B8CF7605F8"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7e206534-f01e-0027-29a1-c34239000000',
  'x-ms-client-request-id',
  'b972cd6d-1b23-4a53-9c57-5441375f7b4f',
  'x-ms-version',
  '2020-04-08',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-11-26T03:10:21.3553656Z',
  'Date',
  'Thu, 26 Nov 2020 03:10:20 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container160636021979206718')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7e2066c2-f01e-0027-11a1-c34239000000',
  'x-ms-client-request-id',
  'ee5bc8d4-c583-4fcf-9d68-aeac8e6b7eba',
  'x-ms-version',
  '2020-04-08',
  'Date',
  'Thu, 26 Nov 2020 03:10:22 GMT'
]);
