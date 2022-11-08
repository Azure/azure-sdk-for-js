let nock = require('nock');

module.exports.hash = "d1ed948a05669987545e7856bba6ddba";

module.exports.testInfo = {"uniqueName":{"container":"container166787497014507761","blob":"blob166787497041904007"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container166787497014507761')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 08 Nov 2022 02:36:10 GMT',
  'ETag',
  '"0x8DAC131FF2E3B4A"',
  'x-ms-request-id',
  '04001bc2-201e-0000-661a-f3e568000000',
  'x-ms-client-request-id',
  'f69d3c71-7119-49bf-9cf1-8d98f9f974e3',
  'x-ms-version',
  '2021-12-02',
  'Date',
  'Tue, 08 Nov 2022 02:36:09 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container166787497014507761/blob166787497041904007')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 08 Nov 2022 02:36:10 GMT',
  'ETag',
  '"0x8DAC131FF611D64"',
  'x-ms-request-id',
  '04001bc4-201e-0000-671a-f3e568000000',
  'x-ms-client-request-id',
  '6aadd72e-c220-413f-ba2a-e5c2c3ed7bc0',
  'x-ms-version',
  '2021-12-02',
  'x-ms-content-crc64',
  'fvS2Y1AyfLM=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 08 Nov 2022 02:36:10 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container166787497014507761/blob166787497041904007')
  .reply(200, "", [
  'Cache-Control',
  'max-age=600',
  'Content-Length',
  '11321',
  'Content-Type',
  'text/html; charset=utf-8',
  'Content-MD5',
  'YMLwxPtWs3QcCtMbdRGckg==',
  'Last-Modified',
  'Tue, 08 Nov 2022 02:36:10 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DAC131FF611D64"',
  'x-ms-request-id',
  '04001bc5-201e-0000-681a-f3e568000000',
  'x-ms-client-request-id',
  'e8c1eb13-29b5-463c-b655-1b59b6c4c99e',
  'x-ms-version',
  '2021-12-02',
  'x-ms-resource-type',
  'file',
  'x-ms-creation-time',
  'Tue, 08 Nov 2022 02:36:10 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Cold',
  'x-ms-access-tier-change-time',
  'Tue, 08 Nov 2022 02:36:10 GMT',
  'x-ms-owner',
  '$superuser',
  'x-ms-group',
  '$superuser',
  'x-ms-permissions',
  'rw-r-----',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-resource-type,Content-Type,Cache-Control,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-change-time,Accept-Ranges,x-ms-owner,x-ms-group,x-ms-permissions',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 08 Nov 2022 02:36:10 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container166787497014507761')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '04001bc6-201e-0000-691a-f3e568000000',
  'x-ms-client-request-id',
  '48bd6248-970f-49b1-a884-aa08556285b1',
  'x-ms-version',
  '2021-12-02',
  'Date',
  'Tue, 08 Nov 2022 02:36:10 GMT'
]);
