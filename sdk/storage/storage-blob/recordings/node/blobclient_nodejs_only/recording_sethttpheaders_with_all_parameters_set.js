let nock = require('nock');

module.exports.hash = "6e9aff9d8b2a110f39c9310185ef114d";

module.exports.testInfo = {"uniqueName":{"container":"container159210827815100500","blob":"blob159210827816709968"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159210827815100500')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:17:58 GMT',
  'ETag',
  '"0x8D81019EB588340"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c13097f0-201e-003e-2f02-42dadf000000',
  'x-ms-client-request-id',
  'da2797a4-0387-402b-96da-521136ffe642',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Sun, 14 Jun 2020 04:17:57 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159210827815100500/blob159210827816709968', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:17:58 GMT',
  'ETag',
  '"0x8D81019EB5B5EEE"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c13097fc-201e-003e-3a02-42dadf000000',
  'x-ms-client-request-id',
  '1c1870b7-0df3-4b4d-8d01-ddb67ddc52a1',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-06-14T04:17:58.1785838Z',
  'Date',
  'Sun, 14 Jun 2020 04:17:57 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159210827815100500/blob159210827816709968')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:17:58 GMT',
  'ETag',
  '"0x8D81019EB5DD063"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1309803-201e-003e-4102-42dadf000000',
  'x-ms-client-request-id',
  '531f6976-bfa1-4f6d-835d-9eadba60ebfb',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Sun, 14 Jun 2020 04:17:57 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container159210827815100500/blob159210827816709968')
  .reply(200, [], [
  'Cache-Control',
  'blobCacheControl',
  'Content-Length',
  '11',
  'Content-Type',
  'blobContentType',
  'Content-Encoding',
  'blobContentEncoding',
  'Content-Language',
  'blobContentLanguage',
  'Content-MD5',
  'AQIDBA==',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:17:58 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D81019EB5DD063"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1309809-201e-003e-4702-42dadf000000',
  'x-ms-client-request-id',
  '1546fea1-01d0-4363-a035-6efb9f35a199',
  'x-ms-version',
  '2019-12-12',
  'x-ms-version-id',
  '2020-06-14T04:17:58.1785838Z',
  'x-ms-is-current-version',
  'true',
  'x-ms-creation-time',
  'Sun, 14 Jun 2020 04:17:58 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'Content-Disposition',
  'blobContentDisposition',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Hot',
  'x-ms-access-tier-inferred',
  'true',
  'Date',
  'Sun, 14 Jun 2020 04:17:57 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159210827815100500')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c130980c-201e-003e-4a02-42dadf000000',
  'x-ms-client-request-id',
  '691835a6-8289-45b7-b02e-bfbf26b166e3',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Sun, 14 Jun 2020 04:17:57 GMT'
]);
