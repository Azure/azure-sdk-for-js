let nock = require('nock');

module.exports.hash = "1c0214dcc469fd0e372f2d91fcff6ced";

module.exports.testInfo = {"uniqueName":{"container":"container160635998026500016","blockblob":"blockblob160635998056505491","srcblob/%2+%2F":"srcblob/%2+%2F160635998056605057"},"newDate":{"expiry":"2020-11-26T03:06:20.874Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container160635998026500016')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 26 Nov 2020 03:06:20 GMT',
  'ETag',
  '"0x8D891B83FD9F2AA"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'fbc8134b-c01e-0085-16a1-c37820000000',
  'x-ms-client-request-id',
  'd170e2e1-d458-4bce-8af6-7a50fa870e16',
  'x-ms-version',
  '2020-04-08',
  'Date',
  'Thu, 26 Nov 2020 03:06:20 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container160635998026500016/srcblob%2F%252%2B%252F160635998056605057', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Thu, 26 Nov 2020 03:06:20 GMT',
  'ETag',
  '"0x8D891B840093B99"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'fbc813ea-c01e-0085-27a1-c37820000000',
  'x-ms-client-request-id',
  '1d42eb93-6630-4092-b180-46c4d98c9e5d',
  'x-ms-version',
  '2020-04-08',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-11-26T03:06:20.7282073Z',
  'Date',
  'Thu, 26 Nov 2020 03:06:20 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container160635998026500016/blockblob160635998056505491')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 26 Nov 2020 03:06:21 GMT',
  'ETag',
  '"0x8D891B8403A3F8C"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'fbc81464-c01e-0085-17a1-c37820000000',
  'x-ms-client-request-id',
  '31cb7280-4da6-4fca-99ed-44ba9010e101',
  'x-ms-version',
  '2020-04-08',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-version-id',
  '2020-11-26T03:06:21.0494348Z',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 26 Nov 2020 03:06:20 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container160635998026500016/blockblob160635998056505491')
  .reply(200, "Hello World", [
  'Content-Length',
  '11',
  'Content-Type',
  'blobContentType1',
  'Content-Language',
  'blobContentLanguage1',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Thu, 26 Nov 2020 03:06:21 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D891B8403A3F8C"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'fbc814d6-c01e-0085-7ea1-c37820000000',
  'x-ms-client-request-id',
  '395975a7-de3b-438c-86d7-42e5dd1cf09b',
  'x-ms-version',
  '2020-04-08',
  'x-ms-version-id',
  '2020-11-26T03:06:21.0494348Z',
  'x-ms-is-current-version',
  'true',
  'x-ms-creation-time',
  'Thu, 26 Nov 2020 03:06:21 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-version-id,x-ms-is-current-version,Content-Type,Content-Language,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 26 Nov 2020 03:06:21 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container160635998026500016')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'fbc81534-c01e-0085-55a1-c37820000000',
  'x-ms-client-request-id',
  'e5f0dceb-6018-43e2-b876-7c35debfdc79',
  'x-ms-version',
  '2020-04-08',
  'Date',
  'Thu, 26 Nov 2020 03:06:21 GMT'
]);
