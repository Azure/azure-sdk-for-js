let nock = require('nock');

module.exports.hash = "277cb008ce1553035c5b1341205b6458";

module.exports.testInfo = {"uniqueName":{"container":"container166787495690903623","blob":"blob166787495923008836","coldtierblob":"coldtierblob166787495975807225"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container166787495690903623')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 08 Nov 2022 02:35:58 GMT',
  'ETag',
  '"0x8DAC131F84369CB"',
  'x-ms-request-id',
  '04001b88-201e-0000-351a-f3e568000000',
  'x-ms-client-request-id',
  '02bb6e80-f6ba-4b44-a7b4-bcbb3004c293',
  'x-ms-version',
  '2021-12-02',
  'Date',
  'Tue, 08 Nov 2022 02:35:59 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container166787495690903623/blob166787495923008836', "Hello World")
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Tue, 08 Nov 2022 02:35:59 GMT',
  'ETag',
  '"0x8DAC131F8D3461B"',
  'x-ms-request-id',
  '04001b8c-201e-0000-361a-f3e568000000',
  'x-ms-client-request-id',
  '885893ec-2d1a-4fb7-abcf-a49cf7756a16',
  'x-ms-version',
  '2021-12-02',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 08 Nov 2022 02:35:59 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container166787495690903623/coldtierblob166787495975807225', "Hello World")
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Tue, 08 Nov 2022 02:36:00 GMT',
  'ETag',
  '"0x8DAC131F90AECCC"',
  'x-ms-request-id',
  '04001b8d-201e-0000-371a-f3e568000000',
  'x-ms-client-request-id',
  'c72e4d21-497c-4537-8c87-fb70c86c3695',
  'x-ms-version',
  '2021-12-02',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 08 Nov 2022 02:35:59 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container166787495690903623/coldtierblob166787495975807225')
  .reply(200, "Hello World", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Tue, 08 Nov 2022 02:36:00 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DAC131F90AECCC"',
  'x-ms-request-id',
  '04001b8e-201e-0000-381a-f3e568000000',
  'x-ms-client-request-id',
  'c7ef3ebd-707d-44db-842a-6c9b2847f43c',
  'x-ms-version',
  '2021-12-02',
  'x-ms-resource-type',
  'file',
  'x-ms-creation-time',
  'Tue, 08 Nov 2022 02:36:00 GMT',
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
  'Tue, 08 Nov 2022 02:36:00 GMT',
  'x-ms-owner',
  '$superuser',
  'x-ms-group',
  '$superuser',
  'x-ms-permissions',
  'rw-r-----',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-resource-type,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-change-time,Accept-Ranges,x-ms-owner,x-ms-group,x-ms-permissions',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 08 Nov 2022 02:36:00 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container166787495690903623/coldtierblob166787495975807225')
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Tue, 08 Nov 2022 02:36:00 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DAC131F90AECCC"',
  'x-ms-request-id',
  '04001b8f-201e-0000-391a-f3e568000000',
  'x-ms-client-request-id',
  'abc468c0-3536-4bbe-8c35-7ada37231b76',
  'x-ms-version',
  '2021-12-02',
  'x-ms-resource-type',
  'file',
  'x-ms-creation-time',
  'Tue, 08 Nov 2022 02:36:00 GMT',
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
  'Tue, 08 Nov 2022 02:36:00 GMT',
  'x-ms-owner',
  '$superuser',
  'x-ms-group',
  '$superuser',
  'x-ms-permissions',
  'rw-r-----',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-resource-type,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-change-time,Accept-Ranges,x-ms-owner,x-ms-group,x-ms-permissions',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 08 Nov 2022 02:36:00 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container166787495690903623')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '04001b90-201e-0000-3a1a-f3e568000000',
  'x-ms-client-request-id',
  'ed78da55-f112-49ab-b1d8-4f2145f02d97',
  'x-ms-version',
  '2021-12-02',
  'Date',
  'Tue, 08 Nov 2022 02:36:00 GMT'
]);
