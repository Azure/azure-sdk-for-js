let nock = require('nock');

module.exports.hash = "15fc01e92b66d0fad95cdec90863c146";

module.exports.testInfo = {"uniqueName":{"container":"container159210827355702452","blob":"blob159210827357206198"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159210827355702452')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:17:53 GMT',
  'ETag',
  '"0x8D81019E89BA2D9"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c130900c-201e-003e-4002-42dadf000000',
  'x-ms-client-request-id',
  '83234f10-c839-4825-82f8-241659f49cd9',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Sun, 14 Jun 2020 04:17:52 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159210827355702452/blob159210827357206198', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:17:53 GMT',
  'ETag',
  '"0x8D81019E89E315C"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1309011-201e-003e-4202-42dadf000000',
  'x-ms-client-request-id',
  'f3039aab-4380-44d4-82cc-86761411f4c9',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-06-14T04:17:53.5833436Z',
  'Date',
  'Sun, 14 Jun 2020 04:17:52 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159210827355702452/blob159210827357206198')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c130901a-201e-003e-4b02-42dadf000000',
  'x-ms-client-request-id',
  '6b06b4f5-c023-465c-96c6-5d94c67ab0bb',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Sun, 14 Jun 2020 04:17:52 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container159210827355702452/blob159210827357206198')
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:17:53 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D81019E89E315C"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1309053-201e-003e-0202-42dadf000000',
  'x-ms-client-request-id',
  '4887641e-46c2-4896-b6d7-725a673ded4d',
  'x-ms-version',
  '2019-12-12',
  'x-ms-version-id',
  '2020-06-14T04:17:53.5833436Z',
  'x-ms-is-current-version',
  'true',
  'x-ms-creation-time',
  'Sun, 14 Jun 2020 04:17:53 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Archive',
  'x-ms-access-tier-change-time',
  'Sun, 14 Jun 2020 04:17:53 GMT',
  'Date',
  'Sun, 14 Jun 2020 04:17:52 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159210827355702452/blob159210827357206198')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1309058-201e-003e-0702-42dadf000000',
  'x-ms-client-request-id',
  '12199b34-da8b-4b81-b6d6-f5fde153113b',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Sun, 14 Jun 2020 04:17:52 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container159210827355702452/blob159210827357206198')
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:17:53 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D81019E89E315C"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1309062-201e-003e-1102-42dadf000000',
  'x-ms-client-request-id',
  'da4b3bbf-a05d-47b1-9353-36793120b6c9',
  'x-ms-version',
  '2019-12-12',
  'x-ms-version-id',
  '2020-06-14T04:17:53.5833436Z',
  'x-ms-is-current-version',
  'true',
  'x-ms-creation-time',
  'Sun, 14 Jun 2020 04:17:53 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Archive',
  'x-ms-access-tier-change-time',
  'Sun, 14 Jun 2020 04:17:53 GMT',
  'x-ms-archive-status',
  'rehydrate-pending-to-hot',
  'x-ms-rehydrate-priority',
  'Standard',
  'Date',
  'Sun, 14 Jun 2020 04:17:52 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159210827355702452')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1309064-201e-003e-1302-42dadf000000',
  'x-ms-client-request-id',
  '40fcd1f7-9ae8-4778-8312-14ac3b57f44a',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Sun, 14 Jun 2020 04:17:52 GMT'
]);
