let nock = require('nock');

module.exports.hash = "aff5e790ac70fb8a3626de9f7734e800";

module.exports.testInfo = {"uniqueName":{"container":"container159210827854300126","blob":"blob159210827855903755","copiedblob":"copiedblob159210827857404795"},"newDate":{"undefined":"2020-06-14T04:17:58.574Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159210827854300126')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:17:58 GMT',
  'ETag',
  '"0x8D81019EB94ACCE"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1309874-201e-003e-2c02-42dadf000000',
  'x-ms-client-request-id',
  '90c960d0-518e-46a2-8389-7b001068f611',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Sun, 14 Jun 2020 04:17:57 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159210827854300126/blob159210827855903755', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:17:58 GMT',
  'ETag',
  '"0x8D81019EB973A41"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c130987c-201e-003e-3202-42dadf000000',
  'x-ms-client-request-id',
  '015cab40-a1c6-40b3-81ec-d69ee8d749b4',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-06-14T04:17:58.5708609Z',
  'Date',
  'Sun, 14 Jun 2020 04:17:57 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159210827854300126/copiedblob159210827857404795')
  .reply(202, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:17:58 GMT',
  'ETag',
  '"0x8D81019EBAEF055"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1309881-201e-003e-3702-42dadf000000',
  'x-ms-client-request-id',
  'b2d25a81-3c3f-4bce-b375-cb4f41876461',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-version-id',
  '2020-06-14T04:17:58.7309733Z',
  'x-ms-copy-id',
  '3a9897d2-6f20-4c6c-9cb3-45f851205a22',
  'x-ms-copy-status',
  'success',
  'Date',
  'Sun, 14 Jun 2020 04:17:57 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container159210827854300126/blob159210827855903755')
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:17:58 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D81019EB973A41"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c130989f-201e-003e-5402-42dadf000000',
  'x-ms-client-request-id',
  'ea34de71-99d7-479f-9544-fa414c7ee85f',
  'x-ms-version',
  '2019-12-12',
  'x-ms-version-id',
  '2020-06-14T04:17:58.5708609Z',
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
  .head('/container159210827854300126/copiedblob159210827857404795')
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:17:58 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D81019EBAEF055"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c13098a3-201e-003e-5802-42dadf000000',
  'x-ms-client-request-id',
  '8ea3e8cc-757d-4cbe-868f-1d270064bbba',
  'x-ms-version',
  '2019-12-12',
  'x-ms-version-id',
  '2020-06-14T04:17:58.7309733Z',
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
  'x-ms-copy-id',
  '3a9897d2-6f20-4c6c-9cb3-45f851205a22',
  'x-ms-copy-source',
  'https://fakestorageaccount.blob.core.windows.net/container159210827854300126/blob159210827855903755?sv=2019-12-12&se=2020-06-15T04%3A17%3A58Z&sr=b&sp=racwd',
  'x-ms-copy-status',
  'success',
  'x-ms-copy-progress',
  '11/11',
  'x-ms-copy-completion-time',
  'Sun, 14 Jun 2020 04:17:58 GMT',
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
  .delete('/container159210827854300126')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c13098a7-201e-003e-5c02-42dadf000000',
  'x-ms-client-request-id',
  '7363a034-0afa-43cd-8094-74adc3c0e648',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Sun, 14 Jun 2020 04:17:58 GMT'
]);
