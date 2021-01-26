let nock = require('nock');

module.exports.hash = "c58df3dc32772b799386b2bc18bba91b";

module.exports.testInfo = {"uniqueName":{"container":"container160507564316308893","blob":"blob160507564346409795","copiedblob":"copiedblob160507564375708862"},"newDate":{"expiry":"2020-11-11T06:20:43.758Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container160507564316308893')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Nov 2020 06:20:43 GMT',
  'ETag',
  '"0x8D88609EB487CC0"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '22b56f6c-b01e-006b-2df2-b7d209000000',
  'x-ms-client-request-id',
  '334affc6-deb0-4751-9c2b-4725b98fa51d',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Wed, 11 Nov 2020 06:20:42 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container160507564316308893/blob160507564346409795', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Wed, 11 Nov 2020 06:20:43 GMT',
  'ETag',
  '"0x8D88609EB771A22"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '22b56fbb-b01e-006b-70f2-b7d209000000',
  'x-ms-client-request-id',
  '83b06473-1ed3-4406-a4e0-66b5da26733c',
  'x-ms-version',
  '2020-02-10',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-11-11T06:20:43.6204066Z',
  'Date',
  'Wed, 11 Nov 2020 06:20:43 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container160507564316308893/copiedblob160507564375708862')
  .reply(202, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Nov 2020 06:20:43 GMT',
  'ETag',
  '"0x8D88609EBA63E28"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '22b5700a-b01e-006b-39f2-b7d209000000',
  'x-ms-client-request-id',
  '56b274ed-5367-4635-a0b3-832632b9cc77',
  'x-ms-version',
  '2020-02-10',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-version-id',
  '2020-11-11T06:20:43.9426282Z',
  'x-ms-copy-id',
  '1b577a5c-a914-409d-a942-92921391194e',
  'x-ms-copy-status',
  'success',
  'Date',
  'Wed, 11 Nov 2020 06:20:43 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container160507564316308893/blob160507564346409795')
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Wed, 11 Nov 2020 06:20:43 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D88609EB771A22"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '22b5705a-b01e-006b-08f2-b7d209000000',
  'x-ms-client-request-id',
  'efd258de-6239-44be-9f42-66884f8bfb3b',
  'x-ms-version',
  '2020-02-10',
  'x-ms-version-id',
  '2020-11-11T06:20:43.6204066Z',
  'x-ms-is-current-version',
  'true',
  'x-ms-creation-time',
  'Wed, 11 Nov 2020 06:20:43 GMT',
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
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-version-id,x-ms-is-current-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 11 Nov 2020 06:20:43 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container160507564316308893/copiedblob160507564375708862')
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Wed, 11 Nov 2020 06:20:43 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D88609EBA63E28"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '22b570a0-b01e-006b-4af2-b7d209000000',
  'x-ms-client-request-id',
  'b7293803-ed0f-4936-9932-e0c7515f537c',
  'x-ms-version',
  '2020-02-10',
  'x-ms-version-id',
  '2020-11-11T06:20:43.9426282Z',
  'x-ms-is-current-version',
  'true',
  'x-ms-creation-time',
  'Wed, 11 Nov 2020 06:20:43 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-copy-id',
  '1b577a5c-a914-409d-a942-92921391194e',
  'x-ms-copy-source',
  'https://fakestorageaccount.blob.core.windows.net/container160507564316308893/blob160507564346409795?sv=2020-02-10&se=2020-11-12T06%3A20%3A43Z&sr=b&sp=racwd',
  'x-ms-copy-status',
  'success',
  'x-ms-copy-progress',
  '11/11',
  'x-ms-copy-completion-time',
  'Wed, 11 Nov 2020 06:20:43 GMT',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Hot',
  'x-ms-access-tier-inferred',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-version-id,x-ms-is-current-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-copy-id,x-ms-copy-source,x-ms-copy-status,x-ms-copy-progress,x-ms-copy-completion-time,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 11 Nov 2020 06:20:44 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container160507564316308893')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '22b570e1-b01e-006b-08f2-b7d209000000',
  'x-ms-client-request-id',
  'c67ff3b7-8927-422e-8db5-e407e10d29b7',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Wed, 11 Nov 2020 06:20:44 GMT'
]);
