let nock = require('nock');

module.exports.hash = "d5502ae98d701eb6230929f447f1bdc5";

module.exports.testInfo = {"uniqueName":{"container":"container159218739516209928","blob":"blob159218739652208622"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159218739516209928')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 15 Jun 2020 02:16:36 GMT',
  'ETag',
  '"0x8D810D2216F8A59"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd8031701-501e-0069-04ba-4274ec000000',
  'x-ms-client-request-id',
  '1c78e532-ccae-49ab-9bf5-28a7205cc7be',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Mon, 15 Jun 2020 02:16:35 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159218739516209928/blob159218739652208622', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Mon, 15 Jun 2020 02:16:36 GMT',
  'ETag',
  '"0x8D810D2219F96F7"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd80317f1-501e-0069-6cba-4274ec000000',
  'x-ms-client-request-id',
  '28aa8421-db2b-4748-a545-c6c71f015e50',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-06-15T02:16:36.6208759Z',
  'Date',
  'Mon, 15 Jun 2020 02:16:36 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159218739516209928/blob159218739652208622')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 15 Jun 2020 02:16:36 GMT',
  'ETag',
  '"0x8D810D2219F96F7"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd8031890-501e-0069-08ba-4274ec000000',
  'x-ms-client-request-id',
  '475ac35d-c255-4e87-aaa8-7969751404d8',
  'x-ms-version',
  '2019-12-12',
  'x-ms-lease-id',
  '618d9b5d-7dd8-422d-ab72-4432f320af0c',
  'Date',
  'Mon, 15 Jun 2020 02:16:36 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container159218739516209928/blob159218739652208622')
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Mon, 15 Jun 2020 02:16:36 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D810D2219F96F7"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd803196a-501e-0069-55ba-4274ec000000',
  'x-ms-client-request-id',
  '303d4224-17d8-425f-8296-d5f02ea95084',
  'x-ms-version',
  '2019-12-12',
  'x-ms-version-id',
  '2020-06-15T02:16:36.6208759Z',
  'x-ms-is-current-version',
  'true',
  'x-ms-creation-time',
  'Mon, 15 Jun 2020 02:16:36 GMT',
  'x-ms-lease-status',
  'locked',
  'x-ms-lease-state',
  'leased',
  'x-ms-lease-duration',
  'fixed',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Hot',
  'x-ms-access-tier-inferred',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-version-id,x-ms-is-current-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-lease-status,x-ms-lease-state,x-ms-lease-duration,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 15 Jun 2020 02:16:36 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container159218739516209928/blob159218739652208622')
  .reply(412, "", [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd8031a0b-501e-0069-70ba-4274ec000000',
  'x-ms-client-request-id',
  'ae805336-ecae-485d-b26e-985dfcdb8940',
  'x-ms-version',
  '2019-12-12',
  'x-ms-error-code',
  'LeaseIdMismatchWithBlobOperation',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 15 Jun 2020 02:16:36 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159218739516209928')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd8031a9e-501e-0069-7bba-4274ec000000',
  'x-ms-client-request-id',
  '48d0bb6f-5420-4899-9699-50169bcd8212',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Mon, 15 Jun 2020 02:16:37 GMT'
]);
