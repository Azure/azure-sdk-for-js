let nock = require('nock');

module.exports.hash = "7aa71a635212d34deb91c361e82cba81";

module.exports.testInfo = {"uniqueName":{"container":"container160635997567005508","blockblob":"blockblob160635997710607246","srcblob/%2+%2F":"srcblob/%2+%2F160635997710902497"},"newDate":{"expiry":"2020-11-26T03:06:17.431Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container160635997567005508')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 26 Nov 2020 03:06:16 GMT',
  'ETag',
  '"0x8D891B83DC72DDD"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'fbc80cef-c01e-0085-40a1-c37820000000',
  'x-ms-client-request-id',
  '8564f6d0-18da-4ea5-ba54-e9781312a606',
  'x-ms-version',
  '2020-04-08',
  'Date',
  'Thu, 26 Nov 2020 03:06:16 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container160635997567005508/srcblob%2F%252%2B%252F160635997710902497', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Thu, 26 Nov 2020 03:06:17 GMT',
  'ETag',
  '"0x8D891B83DFB8023"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'fbc80de5-c01e-0085-2ba1-c37820000000',
  'x-ms-client-request-id',
  '1848c2bb-90f2-44c3-8baf-8d13b602aeef',
  'x-ms-version',
  '2020-04-08',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-11-26T03:06:17.2827683Z',
  'Date',
  'Thu, 26 Nov 2020 03:06:17 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container160635997567005508/blockblob160635997710607246')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 26 Nov 2020 03:06:17 GMT',
  'ETag',
  '"0x8D891B83E318E11"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'fbc80ec6-c01e-0085-01a1-c37820000000',
  'x-ms-client-request-id',
  '10d25230-d2bb-461b-b138-79738de242a1',
  'x-ms-version',
  '2020-04-08',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-version-id',
  '2020-11-26T03:06:17.6370193Z',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 26 Nov 2020 03:06:17 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container160635997567005508/blockblob160635997710607246')
  .reply(200, ["48656c6c6f20576f726c64"], [
  'Cache-Control',
  'blobCacheControl',
  'Content-Length',
  '11',
  'Content-Type',
  'blobContentType',
  'Content-Encoding',
  'blobContentEncoding',
  'Content-Language',
  'blobContentLanguage',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Thu, 26 Nov 2020 03:06:17 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D891B83E318E11"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'fbc80fa6-c01e-0085-54a1-c37820000000',
  'x-ms-client-request-id',
  '4e009627-ee82-4f2e-a419-2006e6e5d44c',
  'x-ms-version',
  '2020-04-08',
  'x-ms-version-id',
  '2020-11-26T03:06:17.6370193Z',
  'x-ms-is-current-version',
  'true',
  'x-ms-creation-time',
  'Thu, 26 Nov 2020 03:06:17 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'Content-Disposition',
  'blobContentDisposition',
  'x-ms-server-encrypted',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-version-id,x-ms-is-current-version,Content-Type,Content-Encoding,Content-Language,Cache-Control,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,Content-Disposition,x-ms-server-encrypted,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 26 Nov 2020 03:06:17 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container160635997567005508')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'fbc81036-c01e-0085-57a1-c37820000000',
  'x-ms-client-request-id',
  '1fa5cbaf-4923-4703-8f93-f5918ea60cab',
  'x-ms-version',
  '2020-04-08',
  'Date',
  'Thu, 26 Nov 2020 03:06:18 GMT'
]);
