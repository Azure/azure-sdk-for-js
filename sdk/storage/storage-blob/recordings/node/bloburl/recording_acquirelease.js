let nock = require('nock');

module.exports.testInfo = {"container":"container156231854482609962","blob":"blob156231854510103153"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156231854482609962')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:19:05 GMT',
  'ETag',
  '"0x8D70129D3EF6F50"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6672499d-b01e-013a-7212-333b60000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Fri, 05 Jul 2019 09:19:05 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156231854482609962/blob156231854510103153', "Hello World")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:19:05 GMT',
  'ETag',
  '"0x8D70129D419665E"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'aa4aa0ee-601e-00b4-0512-333294000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 05 Jul 2019 09:19:05 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156231854482609962/blob156231854510103153')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:19:05 GMT',
  'ETag',
  '"0x8D70129D419665E"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c74f9861-601e-0078-2912-335621000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-lease-id',
  'ca761232-ed42-11ce-bacd-00aa0057b223',
  'Date',
  'Fri, 05 Jul 2019 09:19:05 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container156231854482609962/blob156231854510103153')
  .reply(200, "", [ 'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:19:05 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D70129D419665E"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '714f4f0d-e01e-004b-6012-330f0c000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-tag-count',
  '0',
  'x-ms-creation-time',
  'Fri, 05 Jul 2019 09:19:05 GMT',
  'x-ms-lease-status',
  'locked',
  'x-ms-lease-state',
  'leased',
  'x-ms-lease-duration',
  'fixed',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Hot',
  'x-ms-access-tier-inferred',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,x-ms-tag-count,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-lease-status,x-ms-lease-state,x-ms-lease-duration,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 05 Jul 2019 09:19:06 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156231854482609962/blob156231854510103153')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:19:05 GMT',
  'ETag',
  '"0x8D70129D419665E"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '17d958b8-d01e-00a6-3012-330688000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Fri, 05 Jul 2019 09:19:06 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156231854482609962')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '04d00234-501e-0130-5812-3322e9000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Fri, 05 Jul 2019 09:19:06 GMT',
  'Connection',
  'close' ]);

