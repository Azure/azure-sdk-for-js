let nock = require('nock');

module.exports.hash = "5c4a67be36e56d2e3cb4a259494f8673";

module.exports.testInfo = {"uniqueName":{"container":"container159210827319002581","blob":"blob159210827320608908"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159210827319002581')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:17:53 GMT',
  'ETag',
  '"0x8D81019E86398B6"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1308f9b-201e-003e-5802-42dadf000000',
  'x-ms-client-request-id',
  '0a41d011-7362-42c2-9141-7972b462aa53',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Sun, 14 Jun 2020 04:17:52 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159210827319002581/blob159210827320608908', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:17:53 GMT',
  'ETag',
  '"0x8D81019E866274E"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1308fa1-201e-003e-5d02-42dadf000000',
  'x-ms-client-request-id',
  'e3f14504-1df4-4cd3-b19b-a812ebf5402f',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-06-14T04:17:53.2160846Z',
  'Date',
  'Sun, 14 Jun 2020 04:17:52 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159210827319002581/blob159210827320608908')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1308fa4-201e-003e-6002-42dadf000000',
  'x-ms-client-request-id',
  'd2f822df-467c-48ca-9e1f-3a271b518594',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Sun, 14 Jun 2020 04:17:52 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container159210827319002581/blob159210827320608908')
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
  '"0x8D81019E866274E"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1308fff-201e-003e-3302-42dadf000000',
  'x-ms-client-request-id',
  '23f5ff40-bfcd-4a34-b5dc-6cf5694e434f',
  'x-ms-version',
  '2019-12-12',
  'x-ms-version-id',
  '2020-06-14T04:17:53.2160846Z',
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
  'Cool',
  'x-ms-access-tier-change-time',
  'Sun, 14 Jun 2020 04:17:53 GMT',
  'Date',
  'Sun, 14 Jun 2020 04:17:52 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159210827319002581')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1309006-201e-003e-3a02-42dadf000000',
  'x-ms-client-request-id',
  '10d70f40-e2d1-4eea-9eb9-1d20f2996c85',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Sun, 14 Jun 2020 04:17:52 GMT'
]);
