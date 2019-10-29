let nock = require('nock');

module.exports.testInfo = {"container":"container157169617848406103","blob":"blob157169617853507178","copiedblobrehydrate":"copiedblobrehydrate157169617860605526"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157169617848406103')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 21 Oct 2019 22:16:18 GMT',
  'ETag',
  '"0x8D756744BD625AA"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3151a8c2-b01e-00b4-175d-889f3a000000',
  'x-ms-client-request-id',
  'f7ebd112-9a1d-49e3-af13-46a3a13cc461',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Mon, 21 Oct 2019 22:16:17 GMT',
  'Connection',
  'close'
]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157169617848406103/blob157169617853507178', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Mon, 21 Oct 2019 22:16:18 GMT',
  'ETag',
  '"0x8D756744BE0FB8A"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4f70332a-501e-00e1-335d-888fb1000000',
  'x-ms-client-request-id',
  '7b5b93c1-15a8-43a2-8721-d0d32a2367fd',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 21 Oct 2019 22:16:17 GMT',
  'Connection',
  'close'
]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157169617848406103/copiedblobrehydrate157169617860605526')
  .reply(202, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 21 Oct 2019 22:16:18 GMT',
  'ETag',
  '"0x8D756744BEB5DB4"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd8089df3-701e-00bb-115d-88e956000000',
  'x-ms-client-request-id',
  'e632b839-a86a-4abf-a160-334429e6b89a',
  'x-ms-version',
  '2019-02-02',
  'x-ms-copy-id',
  '0e9c54d9-e953-4393-a149-80a623a1a290',
  'x-ms-copy-status',
  'success',
  'Date',
  'Mon, 21 Oct 2019 22:16:17 GMT',
  'Connection',
  'close'
]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container157169617848406103/blob157169617853507178')
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Mon, 21 Oct 2019 22:16:18 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D756744BE0FB8A"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e96d7c63-501e-0005-095d-88812f000000',
  'x-ms-client-request-id',
  '307a43f4-d012-42e2-a096-b6d1405c8ced',
  'x-ms-version',
  '2019-02-02',
  'x-ms-creation-time',
  'Mon, 21 Oct 2019 22:16:18 GMT',
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
  'Mon, 21 Oct 2019 22:16:18 GMT',
  'Connection',
  'close'
]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container157169617848406103/copiedblobrehydrate157169617860605526')
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Mon, 21 Oct 2019 22:16:18 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D756744BEB5DB4"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '49e679b4-101e-0014-1c5d-881b9b000000',
  'x-ms-client-request-id',
  '381c1da3-0986-48f9-8182-ac289f464851',
  'x-ms-version',
  '2019-02-02',
  'x-ms-creation-time',
  'Mon, 21 Oct 2019 22:16:18 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-copy-id',
  '0e9c54d9-e953-4393-a149-80a623a1a290',
  'x-ms-copy-source',
  'https://fakestorageaccount.blob.core.windows.net/container157169617848406103/blob157169617853507178',
  'x-ms-copy-status',
  'success',
  'x-ms-copy-progress',
  '11/11',
  'x-ms-copy-completion-time',
  'Mon, 21 Oct 2019 22:16:18 GMT',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Archive',
  'x-ms-access-tier-change-time',
  'Mon, 21 Oct 2019 22:16:18 GMT',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-copy-id,x-ms-copy-source,x-ms-copy-status,x-ms-copy-progress,x-ms-copy-completion-time,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-change-time,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 21 Oct 2019 22:16:18 GMT',
  'Connection',
  'close'
]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157169617848406103/copiedblobrehydrate157169617860605526')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1d09da17-b01e-00d6-585d-885d1d000000',
  'x-ms-client-request-id',
  '80f9f38a-2c10-4f1c-972f-a6168327d714',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Mon, 21 Oct 2019 22:16:17 GMT',
  'Connection',
  'close'
]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container157169617848406103/copiedblobrehydrate157169617860605526')
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Mon, 21 Oct 2019 22:16:18 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D756744BEB5DB4"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ccdc561f-401e-007b-045d-881168000000',
  'x-ms-client-request-id',
  '7cb5b517-d65e-4d31-8c11-badd038637e6',
  'x-ms-version',
  '2019-02-02',
  'x-ms-creation-time',
  'Mon, 21 Oct 2019 22:16:18 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-copy-id',
  '0e9c54d9-e953-4393-a149-80a623a1a290',
  'x-ms-copy-source',
  'https://fakestorageaccount.blob.core.windows.net/container157169617848406103/blob157169617853507178',
  'x-ms-copy-status',
  'success',
  'x-ms-copy-progress',
  '11/11',
  'x-ms-copy-completion-time',
  'Mon, 21 Oct 2019 22:16:18 GMT',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Archive',
  'x-ms-access-tier-change-time',
  'Mon, 21 Oct 2019 22:16:18 GMT',
  'x-ms-archive-status',
  'rehydrate-pending-to-hot',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-copy-id,x-ms-copy-source,x-ms-copy-status,x-ms-copy-progress,x-ms-copy-completion-time,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-change-time,x-ms-archive-status,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 21 Oct 2019 22:16:18 GMT',
  'Connection',
  'close'
]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container157169617848406103')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'eddcd12a-101e-0004-805d-88def3000000',
  'x-ms-client-request-id',
  '606f9cee-d0d5-456c-9a18-19634e841916',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Mon, 21 Oct 2019 22:16:18 GMT',
  'Connection',
  'close'
]);

