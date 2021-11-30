let nock = require('nock');

module.exports.hash = "acc8c9b7c4ca3916109d26480aa58a80";

module.exports.testInfo = {"uniqueName":{"container":"container162546564102400923","blob":"blob162546564220207426","copiedblob":"copiedblob162546564337009608"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container162546564102400923')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 05 Jul 2021 06:14:02 GMT',
  'ETag',
  '"0x8D93F7C15C98350"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '62593465-501e-001c-0964-71e384000000',
  'x-ms-client-request-id',
  'd7338515-90e0-4d60-b843-8f12d9c31419',
  'x-ms-version',
  '2020-10-02',
  'Date',
  'Mon, 05 Jul 2021 06:14:02 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container162546564102400923/blob162546564220207426', "Hello World")
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Mon, 05 Jul 2021 06:14:03 GMT',
  'ETag',
  '"0x8D93F7C167C5C75"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1c2d08d2-601e-0013-2e64-714833000000',
  'x-ms-client-request-id',
  'b5430701-a846-4d6f-90ba-f0c53dff5f63',
  'x-ms-version',
  '2020-10-02',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 05 Jul 2021 06:14:03 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container162546564102400923/copiedblob162546564337009608')
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 05 Jul 2021 06:14:04 GMT',
  'ETag',
  '"0x8D93F7C17496D40"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b5fd4425-901e-0015-0464-710902000000',
  'x-ms-client-request-id',
  '0937c6b2-c4f3-4687-9473-0f9e5857d647',
  'x-ms-version',
  '2020-10-02',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-copy-id',
  'd595be9b-37df-45f5-8cad-01fe4f823f0e',
  'x-ms-copy-status',
  'success',
  'Date',
  'Mon, 05 Jul 2021 06:14:04 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container162546564102400923/blob162546564220207426')
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Mon, 05 Jul 2021 06:14:03 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D93F7C167C5C75"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '618e2f02-801e-0028-6064-71510b000000',
  'x-ms-client-request-id',
  '1dd85100-3060-4e40-87d6-88473c47a2c9',
  'x-ms-version',
  '2020-10-02',
  'x-ms-creation-time',
  'Mon, 05 Jul 2021 06:14:03 GMT',
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
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 05 Jul 2021 06:14:05 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container162546564102400923/copiedblob162546564337009608')
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Mon, 05 Jul 2021 06:14:04 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D93F7C17496D40"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '515d552d-901e-000a-3f64-714957000000',
  'x-ms-client-request-id',
  'c774181c-0dcb-43d6-a87e-acb605de7867',
  'x-ms-version',
  '2020-10-02',
  'x-ms-creation-time',
  'Mon, 05 Jul 2021 06:14:04 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-copy-id',
  'd595be9b-37df-45f5-8cad-01fe4f823f0e',
  'x-ms-copy-source',
  'https://fakestorageaccount.blob.core.windows.net/container162546564102400923/blob162546564220207426',
  'x-ms-copy-status',
  'success',
  'x-ms-copy-progress',
  '11/11',
  'x-ms-copy-completion-time',
  'Mon, 05 Jul 2021 06:14:04 GMT',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Hot',
  'x-ms-access-tier-inferred',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-copy-id,x-ms-copy-source,x-ms-copy-status,x-ms-copy-progress,x-ms-copy-completion-time,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 05 Jul 2021 06:14:07 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container162546564102400923')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9002982d-301e-0029-6f64-71b647000000',
  'x-ms-client-request-id',
  'b8148178-c078-467e-8d26-aedaa833e248',
  'x-ms-version',
  '2020-10-02',
  'Date',
  'Mon, 05 Jul 2021 06:14:08 GMT',
  'Connection',
  'close'
]);
