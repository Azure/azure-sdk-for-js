let nock = require('nock');

module.exports.hash = "b5a9b61cf0b8af30094d4da8bfb7dda7";

module.exports.testInfo = {"uniqueName":{"container":"container166787496111602453","blob":"blob166787496139100156","copiedblob":"copiedblob166787496172405018"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container166787496111602453')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 08 Nov 2022 02:36:01 GMT',
  'ETag',
  '"0x8DAC131F9CC2EA1"',
  'x-ms-request-id',
  '04001b91-201e-0000-3b1a-f3e568000000',
  'x-ms-client-request-id',
  '7901d395-c4f3-4c5b-acf2-b1089616feec',
  'x-ms-version',
  '2021-12-02',
  'Date',
  'Tue, 08 Nov 2022 02:36:00 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container166787496111602453/blob166787496139100156', "Hello World")
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Tue, 08 Nov 2022 02:36:01 GMT',
  'ETag',
  '"0x8DAC131FA026DA1"',
  'x-ms-request-id',
  '04001b93-201e-0000-3c1a-f3e568000000',
  'x-ms-client-request-id',
  '6f59300b-6ad3-4df4-b967-b28d00997d25',
  'x-ms-version',
  '2021-12-02',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 08 Nov 2022 02:36:01 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container166787496111602453/copiedblob166787496172405018')
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 08 Nov 2022 02:36:02 GMT',
  'ETag',
  '"0x8DAC131FA697D5C"',
  'x-ms-request-id',
  '04001b94-201e-0000-3d1a-f3e568000000',
  'x-ms-client-request-id',
  'bf76cba5-ef21-4d3b-9228-2df3a7d22373',
  'x-ms-version',
  '2021-12-02',
  'x-ms-content-crc64',
  'fvS2Y1AyfLM=',
  'x-ms-copy-id',
  'd2d720d7-9fc1-4fad-b09c-d37260a6a2d9',
  'x-ms-copy-status',
  'success',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 08 Nov 2022 02:36:01 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container166787496111602453/copiedblob166787496172405018')
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
  'Tue, 08 Nov 2022 02:36:02 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DAC131FA697D5C"',
  'x-ms-request-id',
  '04001b95-201e-0000-3e1a-f3e568000000',
  'x-ms-client-request-id',
  '658c71b3-f19f-4382-ac1b-25411e13e235',
  'x-ms-version',
  '2021-12-02',
  'x-ms-resource-type',
  'file',
  'x-ms-creation-time',
  'Tue, 08 Nov 2022 02:36:02 GMT',
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
  'Tue, 08 Nov 2022 02:36:02 GMT',
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
  'Tue, 08 Nov 2022 02:36:01 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container166787496111602453')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '04001b96-201e-0000-3f1a-f3e568000000',
  'x-ms-client-request-id',
  '535d3880-57f7-4e8f-b930-8371dc76d8c3',
  'x-ms-version',
  '2021-12-02',
  'Date',
  'Tue, 08 Nov 2022 02:36:03 GMT'
]);
