let nock = require('nock');

module.exports.testInfo = {"container":"container157172179611307230","blob":"blob157172179634708876","dest-container":"dest-container157172179642504169","copiedblob":"copiedblob157172179649704386"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157172179611307230')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 22 Oct 2019 05:23:16 GMT',
  'ETag',
  '"0x8D756AFF117F253"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b644f6a2-d01e-00c0-3398-88abca000000',
  'x-ms-client-request-id',
  'd504aad2-c9d0-4db3-a79b-da9ae11faccf',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 22 Oct 2019 05:23:15 GMT'
]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157172179611307230/blob157172179634708876', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Tue, 22 Oct 2019 05:23:16 GMT',
  'ETag',
  '"0x8D756AFF1259CD2"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd9297060-b01e-000d-3498-889b20000000',
  'x-ms-client-request-id',
  '6466b242-aaac-4d89-a5a7-d79b99bed665',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 22 Oct 2019 05:23:15 GMT'
]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/dest-container157172179642504169')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 22 Oct 2019 05:23:16 GMT',
  'ETag',
  '"0x8D756AFF13037E4"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '406693ae-201e-000f-7c98-882598000000',
  'x-ms-client-request-id',
  '033bb563-ae03-4ca2-b7e3-62a391d60c60',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 22 Oct 2019 05:23:16 GMT'
]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/dest-container157172179642504169/copiedblob157172179649704386')
  .reply(202, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 22 Oct 2019 05:23:16 GMT',
  'ETag',
  '"0x8D756AFF13D9616"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd593f65e-d01e-0024-3e98-88a554000000',
  'x-ms-client-request-id',
  '9faceeeb-0d0d-4098-91c3-d0e536de09df',
  'x-ms-version',
  '2019-02-02',
  'x-ms-copy-id',
  'aaeb7c8e-2ff3-4e94-b223-aaea3ef506c0',
  'x-ms-copy-status',
  'success',
  'Date',
  'Tue, 22 Oct 2019 05:23:15 GMT'
]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container157172179611307230/blob157172179634708876')
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Tue, 22 Oct 2019 05:23:16 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D756AFF1259CD2"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '00ba0ea0-701e-0012-5298-882824000000',
  'x-ms-client-request-id',
  '9184ed49-bf64-44e3-824b-640ed8ecc813',
  'x-ms-version',
  '2019-02-02',
  'x-ms-creation-time',
  'Tue, 22 Oct 2019 05:23:16 GMT',
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
  'Tue, 22 Oct 2019 05:23:15 GMT'
]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/dest-container157172179642504169/copiedblob157172179649704386')
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Tue, 22 Oct 2019 05:23:16 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D756AFF13D9616"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd593f6d3-d01e-0024-2598-88a554000000',
  'x-ms-client-request-id',
  'a76e1b60-8ce7-4924-80e3-b257db0f6278',
  'x-ms-version',
  '2019-02-02',
  'x-ms-creation-time',
  'Tue, 22 Oct 2019 05:23:16 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-copy-id',
  'aaeb7c8e-2ff3-4e94-b223-aaea3ef506c0',
  'x-ms-copy-source',
  'https://fakestorageaccount.blob.core.windows.net/container157172179611307230/blob157172179634708876',
  'x-ms-copy-status',
  'success',
  'x-ms-copy-progress',
  '11/11',
  'x-ms-copy-completion-time',
  'Tue, 22 Oct 2019 05:23:16 GMT',
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
  'Tue, 22 Oct 2019 05:23:15 GMT'
]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container157172179611307230')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b644f829-d01e-00c0-0a98-88abca000000',
  'x-ms-client-request-id',
  '47db0f04-8b03-4665-8915-f86e389307f5',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 22 Oct 2019 05:23:15 GMT'
]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/dest-container157172179642504169')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4066948a-201e-000f-3b98-882598000000',
  'x-ms-client-request-id',
  '8fc8a509-4457-4405-bc58-bb177a619b6e',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 22 Oct 2019 05:23:16 GMT'
]);

