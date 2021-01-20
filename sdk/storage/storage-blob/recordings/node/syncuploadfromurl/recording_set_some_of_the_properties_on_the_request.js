let nock = require('nock');

module.exports.hash = "9951c8b08d88b32c9e15d241d4a107ea";

module.exports.testInfo = {"uniqueName":{"container":"container160635997841503156","blockblob":"blockblob160635997871504072","srcblob/%2+%2F":"srcblob/%2+%2F160635997871502265"},"newDate":{"expiry":"2020-11-26T03:06:19.019Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container160635997841503156')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 26 Nov 2020 03:06:18 GMT',
  'ETag',
  '"0x8D891B83EBFC477"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'fbc8109b-c01e-0085-2ca1-c37820000000',
  'x-ms-client-request-id',
  'bee02441-7517-46c4-84ab-abf1b8376b97',
  'x-ms-version',
  '2020-04-08',
  'Date',
  'Thu, 26 Nov 2020 03:06:18 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container160635997841503156/srcblob%2F%252%2B%252F160635997871502265', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Thu, 26 Nov 2020 03:06:18 GMT',
  'ETag',
  '"0x8D891B83EEE2287"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'fbc81110-c01e-0085-17a1-c37820000000',
  'x-ms-client-request-id',
  '186afb11-6cc8-4dd7-9da8-56a67d5f200d',
  'x-ms-version',
  '2020-04-08',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-11-26T03:06:18.8728967Z',
  'Date',
  'Thu, 26 Nov 2020 03:06:18 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container160635997841503156/blockblob160635997871504072')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 26 Nov 2020 03:06:19 GMT',
  'ETag',
  '"0x8D891B83F1F266E"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'fbc81186-c01e-0085-03a1-c37820000000',
  'x-ms-client-request-id',
  '123ef5a0-ff3f-48ee-bf72-c47dc8ac8cdb',
  'x-ms-version',
  '2020-04-08',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-version-id',
  '2020-11-26T03:06:19.1941230Z',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 26 Nov 2020 03:06:19 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container160635997841503156/blockblob160635997871504072')
  .reply(200, ["48656c6c6f20576f726c64"], [
  'Cache-Control',
  'blobCacheControl',
  'Content-Length',
  '11',
  'Content-Type',
  'blobContentType1',
  'Content-Encoding',
  'blobContentEncoding',
  'Content-Language',
  'blobContentLanguage1',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Thu, 26 Nov 2020 03:06:19 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D891B83F1F266E"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'fbc811e5-c01e-0085-59a1-c37820000000',
  'x-ms-client-request-id',
  'ff1f8fab-1d98-426b-a33c-64c7660e85f6',
  'x-ms-version',
  '2020-04-08',
  'x-ms-tag-count',
  '1',
  'x-ms-version-id',
  '2020-11-26T03:06:19.1941230Z',
  'x-ms-is-current-version',
  'true',
  'x-ms-creation-time',
  'Thu, 26 Nov 2020 03:06:19 GMT',
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
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-tag-count,x-ms-version-id,x-ms-is-current-version,Content-Type,Content-Encoding,Content-Language,Cache-Control,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,Content-Disposition,x-ms-server-encrypted,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 26 Nov 2020 03:06:19 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container160635997841503156/blockblob160635997871504072')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<Tags><TagSet><Tag><Key>tag1</Key><Value>val1</Value></Tag></TagSet></Tags>", [
  'Content-Length',
  '117',
  'Content-Type',
  'application/xml',
  'Vary',
  'Origin',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'fbc81241-c01e-0085-2ea1-c37820000000',
  'x-ms-version',
  '2020-04-08',
  'x-ms-client-request-id',
  'a47eadb4-11a8-43b9-8a8e-444cf80ce5f3',
  'Date',
  'Thu, 26 Nov 2020 03:06:19 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container160635997841503156')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'fbc812c1-c01e-0085-1ea1-c37820000000',
  'x-ms-client-request-id',
  '277c0f33-a35c-4e47-bbb8-356fdde24933',
  'x-ms-version',
  '2020-04-08',
  'Date',
  'Thu, 26 Nov 2020 03:06:19 GMT'
]);
