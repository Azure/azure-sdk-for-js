let nock = require('nock');

module.exports.hash = "6fa7639224ac9ce55e652c9a8eec01c6";

module.exports.testInfo = {"uniqueName":{"container":"container166787496610506641","blob":"blob166787496638600743","copiedblob":"copiedblob166787496667400448"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container166787496610506641')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 08 Nov 2022 02:36:06 GMT',
  'ETag',
  '"0x8DAC131FCC59C88"',
  'x-ms-request-id',
  '04001bb2-201e-0000-591a-f3e568000000',
  'x-ms-client-request-id',
  'b702acf4-4d70-4113-84cb-26952bea9a80',
  'x-ms-version',
  '2021-12-02',
  'Date',
  'Tue, 08 Nov 2022 02:36:06 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container166787496610506641/blob166787496638600743', "Hello World")
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Tue, 08 Nov 2022 02:36:06 GMT',
  'ETag',
  '"0x8DAC131FCF5F75C"',
  'x-ms-request-id',
  '04001bb4-201e-0000-5a1a-f3e568000000',
  'x-ms-client-request-id',
  '01f7c2e4-0d53-4f48-9a00-317950b00453',
  'x-ms-version',
  '2021-12-02',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 08 Nov 2022 02:36:06 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container166787496610506641/copiedblob166787496667400448')
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 08 Nov 2022 02:36:07 GMT',
  'ETag',
  '"0x8DAC131FD5A9BEA"',
  'x-ms-request-id',
  '04001bb5-201e-0000-5b1a-f3e568000000',
  'x-ms-client-request-id',
  '8654ed21-18d1-4fc7-8b18-5c3ed12b7102',
  'x-ms-version',
  '2021-12-02',
  'x-ms-copy-id',
  'f55e9831-6ecd-44f5-bda5-c2eaec6fe0b8',
  'x-ms-copy-status',
  'success',
  'Date',
  'Tue, 08 Nov 2022 02:36:07 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container166787496610506641/blob166787496638600743')
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Tue, 08 Nov 2022 02:36:06 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DAC131FCF5F75C"',
  'x-ms-request-id',
  '04001bb6-201e-0000-5c1a-f3e568000000',
  'x-ms-client-request-id',
  'd4adc7b7-a759-4b5f-a827-c994eb81c7bb',
  'x-ms-version',
  '2021-12-02',
  'x-ms-resource-type',
  'file',
  'x-ms-creation-time',
  'Tue, 08 Nov 2022 02:36:06 GMT',
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
  'x-ms-access-tier-inferred',
  'true',
  'x-ms-owner',
  '$superuser',
  'x-ms-group',
  '$superuser',
  'x-ms-permissions',
  'rw-r-----',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-resource-type,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,x-ms-owner,x-ms-group,x-ms-permissions',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 08 Nov 2022 02:36:07 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container166787496610506641/copiedblob166787496667400448')
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Tue, 08 Nov 2022 02:36:07 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DAC131FD5A9BEA"',
  'x-ms-request-id',
  '04001bb7-201e-0000-5d1a-f3e568000000',
  'x-ms-client-request-id',
  '9257e118-7024-433c-b10e-df7ea03744d1',
  'x-ms-version',
  '2021-12-02',
  'x-ms-resource-type',
  'file',
  'x-ms-creation-time',
  'Tue, 08 Nov 2022 02:36:07 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-copy-id',
  'f55e9831-6ecd-44f5-bda5-c2eaec6fe0b8',
  'x-ms-copy-source',
  'https://fakestorageaccount.blob.core.windows.net/container166787496610506641/blob166787496638600743',
  'x-ms-copy-status',
  'success',
  'x-ms-copy-progress',
  '11/11',
  'x-ms-copy-completion-time',
  'Tue, 08 Nov 2022 02:36:07 GMT',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Cold',
  'x-ms-access-tier-change-time',
  'Tue, 08 Nov 2022 02:36:07 GMT',
  'x-ms-owner',
  '$superuser',
  'x-ms-group',
  '$superuser',
  'x-ms-permissions',
  'rw-r-----',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-resource-type,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-copy-id,x-ms-copy-source,x-ms-copy-status,x-ms-copy-progress,x-ms-copy-completion-time,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-change-time,Accept-Ranges,x-ms-owner,x-ms-group,x-ms-permissions',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 08 Nov 2022 02:36:07 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container166787496610506641')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '04001bb9-201e-0000-5e1a-f3e568000000',
  'x-ms-client-request-id',
  '1f60b5ea-58b2-4a37-8efc-338ec7af42c8',
  'x-ms-version',
  '2021-12-02',
  'Date',
  'Tue, 08 Nov 2022 02:36:07 GMT'
]);
