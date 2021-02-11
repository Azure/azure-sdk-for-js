let nock = require('nock');

module.exports.hash = "04d43cdff6474fb113bc340d22a8b474";

module.exports.testInfo = {"uniqueName":{"container":"container159210827219305138","blob":"blob159210827220900386"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159210827219305138')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:17:52 GMT',
  'ETag',
  '"0x8D81019E7CC946D"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1308e73-201e-003e-4d02-42dadf000000',
  'x-ms-client-request-id',
  'e4e5da98-a911-4fa5-82ac-26b3c5a39997',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Sun, 14 Jun 2020 04:17:51 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159210827219305138/blob159210827220900386', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:17:52 GMT',
  'ETag',
  '"0x8D81019E7CF4A53"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1308e79-201e-003e-5202-42dadf000000',
  'x-ms-client-request-id',
  '1e94ebb8-3364-44c0-be60-5f952f245919',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-06-14T04:17:52.2273875Z',
  'Date',
  'Sun, 14 Jun 2020 04:17:51 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159210827219305138/blob159210827220900386')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:17:52 GMT',
  'ETag',
  '"0x8D81019E7D194B1"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1308e7f-201e-003e-5802-42dadf000000',
  'x-ms-client-request-id',
  '5e3cc9b5-b5ed-463c-8d4d-1dd16b352aca',
  'x-ms-version',
  '2019-12-12',
  'x-ms-version-id',
  '2020-06-14T04:17:52.2433985Z',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Sun, 14 Jun 2020 04:17:51 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container159210827219305138/blob159210827220900386')
  .reply(200, "", [
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
  '"0x8D81019E7D194B1"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1308e87-201e-003e-6002-42dadf000000',
  'x-ms-client-request-id',
  '4bacd54b-9d6f-4805-b327-9f7c3c20dcb9',
  'x-ms-version',
  '2019-12-12',
  'x-ms-version-id',
  '2020-06-14T04:17:52.2433985Z',
  'x-ms-is-current-version',
  'true',
  'x-ms-meta-a',
  'a',
  'x-ms-meta-b',
  'b',
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
  'x-ms-access-tier',
  'Hot',
  'x-ms-access-tier-inferred',
  'true',
  'Date',
  'Sun, 14 Jun 2020 04:17:51 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159210827219305138')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1308e89-201e-003e-6202-42dadf000000',
  'x-ms-client-request-id',
  '2d958419-7fa7-481a-a1a2-41978dab1fff',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Sun, 14 Jun 2020 04:17:51 GMT'
]);
