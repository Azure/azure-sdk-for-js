let nock = require('nock');

module.exports.hash = "3bf3d3a7eb6b3ad211fad9ad1ab86a40";

module.exports.testInfo = {"uniqueName":{"container":"container159218740266103668","blob":"blob159218740294704363"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159218740266103668')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 15 Jun 2020 02:16:42 GMT',
  'ETag',
  '"0x8D810D22546E810"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd80326ea-501e-0069-3ebb-4274ec000000',
  'x-ms-client-request-id',
  '5f90e77b-4e83-4b12-bb95-640458e12222',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Mon, 15 Jun 2020 02:16:42 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159218740266103668/blob159218740294704363', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Mon, 15 Jun 2020 02:16:43 GMT',
  'ETag',
  '"0x8D810D22572AC59"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd80327a6-501e-0069-74bb-4274ec000000',
  'x-ms-client-request-id',
  'd8c0e6fd-1964-44f5-892e-c778be63dd45',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-06-15T02:16:43.0383984Z',
  'Date',
  'Mon, 15 Jun 2020 02:16:42 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159218740266103668/blob159218740294704363')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Mon, 15 Jun 2020 02:16:43 GMT',
  'ETag',
  '"0x8D810D2259F1B8D"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd80328c6-501e-0069-09bb-4274ec000000',
  'x-ms-client-request-id',
  'b88f5854-3648-4dae-b1cf-5c7d1251c97c',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-06-15T02:16:43.3296029Z',
  'Date',
  'Mon, 15 Jun 2020 02:16:42 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159218740266103668')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd803298e-501e-0069-49bb-4274ec000000',
  'x-ms-client-request-id',
  'd542ad46-d4a3-492f-b7c9-4a3f6a4fe93b',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Mon, 15 Jun 2020 02:16:43 GMT'
]);
