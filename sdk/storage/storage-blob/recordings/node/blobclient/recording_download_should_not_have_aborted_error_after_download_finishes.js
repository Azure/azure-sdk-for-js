let nock = require('nock');

module.exports.hash = "2509bb39d84a16e3dd2e6d6fea15c3d0";

module.exports.testInfo = {"uniqueName":{"container":"container159210827205505642","blob":"blob159210827207108865"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159210827205505642')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:17:52 GMT',
  'ETag',
  '"0x8D81019E7B5FB0C"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1308e25-201e-003e-0a02-42dadf000000',
  'x-ms-client-request-id',
  'ddeeab90-c194-4faa-a189-0e853f10ebf5',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Sun, 14 Jun 2020 04:17:51 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159210827205505642/blob159210827207108865', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:17:52 GMT',
  'ETag',
  '"0x8D81019E7B8B103"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1308e2d-201e-003e-1002-42dadf000000',
  'x-ms-client-request-id',
  '033a1250-6608-48af-8f94-b39f366452ea',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-06-14T04:17:52.0792835Z',
  'Date',
  'Sun, 14 Jun 2020 04:17:51 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container159210827205505642/blob159210827207108865')
  .reply(200, "Hello World", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:17:52 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D81019E7B8B103"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1308e3f-201e-003e-1c02-42dadf000000',
  'x-ms-client-request-id',
  '070f325e-75d1-4177-9e65-61c1653362a5',
  'x-ms-version',
  '2019-12-12',
  'x-ms-version-id',
  '2020-06-14T04:17:52.0792835Z',
  'x-ms-is-current-version',
  'true',
  'x-ms-creation-time',
  'Sun, 14 Jun 2020 04:17:52 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'Date',
  'Sun, 14 Jun 2020 04:17:51 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159210827205505642')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1308e42-201e-003e-1f02-42dadf000000',
  'x-ms-client-request-id',
  'c14a081e-07e7-419b-9674-e1c0c2a65cc9',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Sun, 14 Jun 2020 04:17:51 GMT'
]);
