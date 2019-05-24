let nock = require('nock');

module.exports.testInfo = {"container":"container155873875396401610","blob":"blob155873875437107023"}

nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container155873875396401610')
  .query({"restype":"container"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 24 May 2019 22:59:14 GMT',
  'ETag',
  '"0x8D6E09B71025CC2"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ff70fff4-d01e-0073-2e84-12ed9b000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 24 May 2019 22:59:13 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container155873875396401610/blob155873875437107023')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 24 May 2019 22:59:14 GMT',
  'ETag',
  '"0x8D6E09B714BD53F"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b4eabcb7-b01e-004a-5584-12ad3f000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 24 May 2019 22:59:13 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container155873875396401610/blob155873875437107023', "Hello World!")
  .query({"comp":"appendblock"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  '7Qdih1MuhjZehB6Sv8UNjA==',
  'Last-Modified',
  'Fri, 24 May 2019 22:59:14 GMT',
  'ETag',
  '"0x8D6E09B717F98DD"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '71237824-801e-0085-7184-12ca8d000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-blob-append-offset',
  '0',
  'x-ms-blob-committed-block-count',
  '1',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 24 May 2019 22:59:14 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container155873875396401610/blob155873875437107023')
  .reply(200, "Hello World!", [ 'Content-Length',
  '12',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Fri, 24 May 2019 22:59:14 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D6E09B717F98DD"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a26c9854-201e-000b-7984-12852c000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-creation-time',
  'Fri, 24 May 2019 22:59:14 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'AppendBlob',
  'x-ms-blob-committed-block-count',
  '1',
  'x-ms-server-encrypted',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-blob-committed-block-count,x-ms-server-encrypted,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 24 May 2019 22:59:15 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container155873875396401610')
  .query({"restype":"container"})
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2b261279-c01e-000a-2d84-1284d1000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 24 May 2019 22:59:15 GMT',
  'Connection',
  'close' ]);

