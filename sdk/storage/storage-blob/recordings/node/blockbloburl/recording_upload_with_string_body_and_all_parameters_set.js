let nock = require('nock');

module.exports.testInfo = {"container":"container155873882442000955","blob":"blob155873882482504600","randomstring":"randomstring155873882482606822"}

nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container155873882442000955')
  .query({"restype":"container"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 24 May 2019 23:00:24 GMT',
  'ETag',
  '"0x8D6E09B9B01B3EC"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '87577372-001e-001c-4c84-12454f000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 24 May 2019 23:00:24 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container155873882442000955/blob155873882482504600', "randomstring155873882482606822")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'AfSvlU21U7n0ZfjJX9qoFA==',
  'Last-Modified',
  'Fri, 24 May 2019 23:00:24 GMT',
  'ETag',
  '"0x8D6E09B9B3111DE"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f4d2478c-801e-0006-2e84-126a20000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 24 May 2019 23:00:23 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container155873882442000955/blob155873882482504600')
  .reply(200, ["72616e646f6d737472696e67313535383733383832343832363036383232"], [ 'Cache-Control',
  'blobCacheControl',
  'Content-Length',
  '30',
  'Content-Type',
  'blobContentType',
  'Content-Encoding',
  'blobContentEncoding',
  'Content-Language',
  'blobContentLanguage',
  'Content-MD5',
  'AfSvlU21U7n0ZfjJX9qoFA==',
  'Last-Modified',
  'Fri, 24 May 2019 23:00:24 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D6E09B9B3111DE"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '16c91084-b01e-0041-3484-12b54b000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-meta-keya',
  'vala',
  'x-ms-meta-keyb',
  'valb',
  'x-ms-creation-time',
  'Fri, 24 May 2019 23:00:24 GMT',
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
  'x-ms-request-id,Server,x-ms-version,x-ms-meta-keya,x-ms-meta-keyb,Content-Type,Content-Encoding,Content-Language,Cache-Control,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,Content-Disposition,x-ms-server-encrypted,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 24 May 2019 23:00:24 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container155873882442000955')
  .query({"restype":"container"})
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ec055235-401e-0054-0584-1277d2000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 24 May 2019 23:00:24 GMT',
  'Connection',
  'close' ]);

