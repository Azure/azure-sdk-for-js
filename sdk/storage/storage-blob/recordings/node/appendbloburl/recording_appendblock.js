let nock = require('nock');

module.exports.testInfo = {"container":"container156231853489301136","blob":"blob156231853516400473"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156231853489301136')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:18:55 GMT',
  'ETag',
  '"0x8D70129CE02C7FB"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3b3dccfd-f01e-0098-6512-33b0a9000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Fri, 05 Jul 2019 09:18:54 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156231853489301136/blob156231853516400473')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:18:56 GMT',
  'ETag',
  '"0x8D70129CE2D69B0"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3bdae93e-d01e-00e9-0212-33c290000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 05 Jul 2019 09:18:55 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156231853489301136/blob156231853516400473', "Hello World!")
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  '7Qdih1MuhjZehB6Sv8UNjA==',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:18:56 GMT',
  'ETag',
  '"0x8D70129CE5A4E5A"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'da0edb74-601e-00d2-2912-3380ce000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-blob-append-offset',
  '0',
  'x-ms-blob-committed-block-count',
  '1',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 05 Jul 2019 09:18:55 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container156231853489301136/blob156231853516400473')
  .reply(200, "Hello World!", [ 'Content-Length',
  '12',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:18:56 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D70129CE5A4E5A"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '920bbf0d-101e-0092-4412-33a920000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-tag-count',
  '0',
  'x-ms-creation-time',
  'Fri, 05 Jul 2019 09:18:56 GMT',
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
  'x-ms-request-id,Server,x-ms-version,x-ms-tag-count,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-blob-committed-block-count,x-ms-server-encrypted,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 05 Jul 2019 09:18:56 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156231853489301136')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '81e82424-a01e-0107-6012-338e46000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Fri, 05 Jul 2019 09:18:56 GMT',
  'Connection',
  'close' ]);

