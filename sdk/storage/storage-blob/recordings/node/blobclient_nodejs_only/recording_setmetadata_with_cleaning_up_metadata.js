let nock = require('nock');

module.exports.hash = "5fcb62eeaa74c436ad1c241b97d08805";

module.exports.testInfo = {"uniqueName":{"container":"container159210827790005161","blob":"blob159210827791505055"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159210827790005161')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:17:57 GMT',
  'ETag',
  '"0x8D81019EB322F93"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1309795-201e-003e-5a02-42dadf000000',
  'x-ms-client-request-id',
  '17b4f5a7-fdf0-4713-9aea-850063ca4871',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Sun, 14 Jun 2020 04:17:56 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159210827790005161/blob159210827791505055', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:17:57 GMT',
  'ETag',
  '"0x8D81019EB34BD25"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c130979b-201e-003e-5f02-42dadf000000',
  'x-ms-client-request-id',
  '44c3b451-e7a7-435b-8313-02c308e0f2ef',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-06-14T04:17:57.9264060Z',
  'Date',
  'Sun, 14 Jun 2020 04:17:56 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159210827790005161/blob159210827791505055')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:17:57 GMT',
  'ETag',
  '"0x8D81019EB372E96"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c13097a1-201e-003e-6502-42dadf000000',
  'x-ms-client-request-id',
  '3d17bcbd-bc7a-43e6-99ba-dab4b8ef3084',
  'x-ms-version',
  '2019-12-12',
  'x-ms-version-id',
  '2020-06-14T04:17:57.9424166Z',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Sun, 14 Jun 2020 04:17:56 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container159210827790005161/blob159210827791505055')
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:17:57 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D81019EB372E96"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c13097a7-201e-003e-6b02-42dadf000000',
  'x-ms-client-request-id',
  'a175e48e-7fc8-4326-ba5d-238d82e88902',
  'x-ms-version',
  '2019-12-12',
  'x-ms-version-id',
  '2020-06-14T04:17:57.9424166Z',
  'x-ms-is-current-version',
  'true',
  'x-ms-meta-a',
  'a',
  'x-ms-meta-b',
  'b',
  'x-ms-creation-time',
  'Sun, 14 Jun 2020 04:17:57 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Hot',
  'x-ms-access-tier-inferred',
  'true',
  'Date',
  'Sun, 14 Jun 2020 04:17:56 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159210827790005161/blob159210827791505055')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:17:57 GMT',
  'ETag',
  '"0x8D81019EB3AFFD6"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c13097a9-201e-003e-6d02-42dadf000000',
  'x-ms-client-request-id',
  '7e888835-f900-417d-8bd5-0da0a7059cb5',
  'x-ms-version',
  '2019-12-12',
  'x-ms-version-id',
  '2020-06-14T04:17:57.9674342Z',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Sun, 14 Jun 2020 04:17:57 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container159210827790005161/blob159210827791505055')
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:17:57 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D81019EB3AFFD6"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c13097ac-201e-003e-7002-42dadf000000',
  'x-ms-client-request-id',
  'efaf3045-55ac-432c-9b84-d0445fcf9d8c',
  'x-ms-version',
  '2019-12-12',
  'x-ms-version-id',
  '2020-06-14T04:17:57.9674342Z',
  'x-ms-is-current-version',
  'true',
  'x-ms-creation-time',
  'Sun, 14 Jun 2020 04:17:57 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
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
  .delete('/container159210827790005161')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c13097ad-201e-003e-7102-42dadf000000',
  'x-ms-client-request-id',
  '872c81c1-f9f6-496b-889d-e2326b9f6071',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Sun, 14 Jun 2020 04:17:57 GMT'
]);
