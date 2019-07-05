let nock = require('nock');

module.exports.testInfo = {"container":"container156231853868409664","blob":"blob156231853895608337"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156231853868409664')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:18:59 GMT',
  'ETag',
  '"0x8D70129D045DD98"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3faecd3a-a01e-0003-3a12-333d91000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Fri, 05 Jul 2019 09:18:59 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156231853868409664/blob156231853895608337', "Hello World")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:18:59 GMT',
  'ETag',
  '"0x8D70129D070E700"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '24c23e57-801e-0139-4c12-333867000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 05 Jul 2019 09:18:59 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156231853868409664/blob156231853895608337')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:19:00 GMT',
  'ETag',
  '"0x8D70129D09BCF84"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e6950b8d-101e-0055-3e12-33d5e1000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 05 Jul 2019 09:18:59 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container156231853868409664/blob156231853895608337')
  .reply(200, "", [ 'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:19:00 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D70129D09BCF84"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0eb1fd95-501e-009e-7b12-3347d1000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-tag-count',
  '0',
  'x-ms-meta-a',
  'a',
  'x-ms-meta-b',
  'b',
  'x-ms-creation-time',
  'Fri, 05 Jul 2019 09:18:59 GMT',
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
  'x-ms-request-id,Server,x-ms-version,x-ms-tag-count,x-ms-meta-a,x-ms-meta-b,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 05 Jul 2019 09:18:59 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156231853868409664')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2a4433ff-701e-0127-5112-33e28a000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Fri, 05 Jul 2019 09:19:00 GMT',
  'Connection',
  'close' ]);

