let nock = require('nock');

module.exports.hash = "020dba36ceb1f9f86a6f9c36487580ad";

module.exports.testInfo = {"uniqueName":{"container":"container159210827964706686","blob":"blob159210827964700661"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159210827964706686')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:17:59 GMT',
  'ETag',
  '"0x8D81019EC3C7D06"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c13099c6-201e-003e-6402-42dadf000000',
  'x-ms-client-request-id',
  'b3a56ba5-cce0-405c-a018-9434c99df38d',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Sun, 14 Jun 2020 04:17:58 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159210827964706686/blob159210827964700661', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:17:59 GMT',
  'ETag',
  '"0x8D81019EC3F0A3B"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c13099cd-201e-003e-6a02-42dadf000000',
  'x-ms-client-request-id',
  '926eb463-b203-4ab8-9e37-127e4a400a2c',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-06-14T04:17:59.6716371Z',
  'Date',
  'Sun, 14 Jun 2020 04:17:58 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159210827964706686/blob159210827964700661')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:17:59 GMT',
  'ETag',
  '"0x8D81019EC415495"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c13099d3-201e-003e-7002-42dadf000000',
  'x-ms-client-request-id',
  '98b67ab3-07aa-4494-a7af-5d0de89e4a58',
  'x-ms-version',
  '2019-12-12',
  'x-ms-version-id',
  '2020-06-14T04:17:59.6876472Z',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Sun, 14 Jun 2020 04:17:58 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container159210827964706686/blob159210827964700661')
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:17:59 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D81019EC415495"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c13099d8-201e-003e-7502-42dadf000000',
  'x-ms-client-request-id',
  '861ddf30-c730-485f-8740-8f0294886972',
  'x-ms-version',
  '2019-12-12',
  'x-ms-version-id',
  '2020-06-14T04:17:59.6876472Z',
  'x-ms-is-current-version',
  'true',
  'x-ms-meta-a',
  'a',
  'x-ms-meta-b',
  'b',
  'x-ms-creation-time',
  'Sun, 14 Jun 2020 04:17:59 GMT',
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
  'Sun, 14 Jun 2020 04:17:58 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159210827964706686')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c13099da-201e-003e-7702-42dadf000000',
  'x-ms-client-request-id',
  '30b0884a-04f0-4eb8-b59d-b8bd16b18a12',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Sun, 14 Jun 2020 04:17:58 GMT'
]);
