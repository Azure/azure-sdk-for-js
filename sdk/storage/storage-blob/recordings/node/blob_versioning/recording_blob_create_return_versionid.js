let nock = require('nock');

module.exports.hash = "451c6fd62c81383c6e0cce46649063e6";

module.exports.testInfo = {"uniqueName":{"container":"container159218742502502412","blob":"blob159218742531004748","appendblob":"appendblob159218742588203170","pageblob":"pageblob159218742616903229"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159218742502502412')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 15 Jun 2020 02:17:05 GMT',
  'ETag',
  '"0x8D810D2329B5347"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0f470730-701e-006e-35bb-42188f000000',
  'x-ms-client-request-id',
  '7d1aed3f-3a2e-4ed6-8c7b-9739e3003eb6',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Mon, 15 Jun 2020 02:17:04 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159218742502502412/blob159218742531004748', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Mon, 15 Jun 2020 02:17:05 GMT',
  'ETag',
  '"0x8D810D232C71FC1"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4bfa9c68-e01e-0021-64bb-4269db000000',
  'x-ms-client-request-id',
  'afebd812-009f-4eeb-a895-0351224b8ca7',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-06-15T02:17:05.4012353Z',
  'Date',
  'Mon, 15 Jun 2020 02:17:04 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159218742502502412/blob159218742531004748')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Mon, 15 Jun 2020 02:17:05 GMT',
  'ETag',
  '"0x8D810D232F27D5D"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0f470876-701e-006e-61bb-42188f000000',
  'x-ms-client-request-id',
  'ab511444-0a3b-4b2d-b111-71a11a619c32',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-06-15T02:17:05.6874363Z',
  'Date',
  'Mon, 15 Jun 2020 02:17:04 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159218742502502412/appendblob159218742588203170')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 15 Jun 2020 02:17:05 GMT',
  'ETag',
  '"0x8D810D2331E7743"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4bfa9d5b-e01e-0021-4fbb-4269db000000',
  'x-ms-client-request-id',
  '70e17d29-64fd-466d-9911-6f97523752ce',
  'x-ms-version',
  '2019-12-12',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-06-15T02:17:05.9736387Z',
  'Date',
  'Mon, 15 Jun 2020 02:17:05 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159218742502502412/pageblob159218742616903229')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 15 Jun 2020 02:17:06 GMT',
  'ETag',
  '"0x8D810D2334A7141"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0f4709e9-701e-006e-41bb-42188f000000',
  'x-ms-client-request-id',
  '8e15403d-329d-4e6c-895f-b05e37fa9b7d',
  'x-ms-version',
  '2019-12-12',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-06-15T02:17:06.2618433Z',
  'Date',
  'Mon, 15 Jun 2020 02:17:05 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159218742502502412')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4bfa9dff-e01e-0021-67bb-4269db000000',
  'x-ms-client-request-id',
  '03879b11-a81a-44d0-b7c5-bf5f895e0605',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Mon, 15 Jun 2020 02:17:05 GMT'
]);
