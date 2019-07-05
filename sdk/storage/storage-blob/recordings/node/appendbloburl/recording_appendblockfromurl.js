let nock = require('nock');

module.exports.testInfo = {"container":"container156231869736307695","blob":"blob156231869763006755","blockblob":"blockblob156231869790200893"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156231869736307695')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:21:38 GMT',
  'ETag',
  '"0x8D7012A2ED9C740"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '883c1d96-d01e-0007-3b13-33c813000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Fri, 05 Jul 2019 09:21:37 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156231869736307695/blob156231869763006755')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:21:38 GMT',
  'ETag',
  '"0x8D7012A2F0333AA"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '30eae7d4-301e-00ca-7713-33ad5b000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 05 Jul 2019 09:21:37 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156231869736307695/blockblob156231869790200893', "Hello World!")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  '7Qdih1MuhjZehB6Sv8UNjA==',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:21:38 GMT',
  'ETag',
  '"0x8D7012A2F2CE373"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8b859285-801e-0097-6b13-335d5f000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 05 Jul 2019 09:21:38 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156231869736307695/blob156231869763006755', "Hello World!")
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  '7Qdih1MuhjZehB6Sv8UNjA==',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:21:39 GMT',
  'ETag',
  '"0x8D7012A2F57F30F"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'acc572fb-c01e-009b-6f13-33b3ae000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-blob-append-offset',
  '0',
  'x-ms-blob-committed-block-count',
  '1',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 05 Jul 2019 09:21:38 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156231869736307695/blob156231869763006755')
  .query(true)
  .reply(201, "", [ 'Content-MD5',
  '7Qdih1MuhjZehB6Sv8UNjA==',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:21:39 GMT',
  'ETag',
  '"0x8D7012A2F97C704"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-blob-committed-block-count',
  '2',
  'x-ms-blob-append-offset',
  '12',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'dd50cec1-b01e-007a-0e13-3354db000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Fri, 05 Jul 2019 09:21:39 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container156231869736307695/blob156231869763006755')
  .reply(200, "Hello World!Hello World!", [ 'Content-Length',
  '24',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:21:39 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D7012A2F97C704"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7d5ceb1c-c01e-013e-7113-33cee2000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-tag-count',
  '0',
  'x-ms-creation-time',
  'Fri, 05 Jul 2019 09:21:38 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'AppendBlob',
  'x-ms-blob-committed-block-count',
  '2',
  'x-ms-server-encrypted',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,x-ms-tag-count,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-blob-committed-block-count,x-ms-server-encrypted,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 05 Jul 2019 09:21:39 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156231869736307695')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8bd89232-101e-013c-1213-33cc18000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Fri, 05 Jul 2019 09:21:39 GMT',
  'Connection',
  'close' ]);

