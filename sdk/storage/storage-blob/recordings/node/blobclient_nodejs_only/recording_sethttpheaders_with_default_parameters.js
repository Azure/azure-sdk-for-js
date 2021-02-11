let nock = require('nock');

module.exports.hash = "2a72af782365f9ee677dc96b13236ba0";

module.exports.testInfo = {"uniqueName":{"container":"container159210827799401548","blob":"blob159210827805109492"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159210827799401548')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:17:58 GMT',
  'ETag',
  '"0x8D81019EB41C2C8"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c13097b5-201e-003e-7902-42dadf000000',
  'x-ms-client-request-id',
  '3c262f6b-5cfd-4a15-9e2a-730d8e10fc37',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Sun, 14 Jun 2020 04:17:57 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159210827799401548/blob159210827805109492', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:17:58 GMT',
  'ETag',
  '"0x8D81019EB498169"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c13097bf-201e-003e-0202-42dadf000000',
  'x-ms-client-request-id',
  '86af19fb-29be-4383-8110-305b268c7b45',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-06-14T04:17:58.0615017Z',
  'Date',
  'Sun, 14 Jun 2020 04:17:57 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159210827799401548/blob159210827805109492')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:17:58 GMT',
  'ETag',
  '"0x8D81019EB4BCBBF"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c13097c6-201e-003e-0902-42dadf000000',
  'x-ms-client-request-id',
  '27725b8c-101a-45ef-83ac-55ec148282be',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Sun, 14 Jun 2020 04:17:57 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container159210827799401548/blob159210827805109492')
  .reply(200, "", [
  'Content-Length',
  '11',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:17:58 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D81019EB4BCBBF"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c13097cd-201e-003e-1002-42dadf000000',
  'x-ms-client-request-id',
  '48bf8e75-8627-401a-bcad-b57e52206c04',
  'x-ms-version',
  '2019-12-12',
  'x-ms-version-id',
  '2020-06-14T04:17:58.0615017Z',
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
  .delete('/container159210827799401548')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c13097d5-201e-003e-1802-42dadf000000',
  'x-ms-client-request-id',
  'ac99586d-0df9-49f6-ad3d-92a1e81ac44a',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Sun, 14 Jun 2020 04:17:57 GMT'
]);
