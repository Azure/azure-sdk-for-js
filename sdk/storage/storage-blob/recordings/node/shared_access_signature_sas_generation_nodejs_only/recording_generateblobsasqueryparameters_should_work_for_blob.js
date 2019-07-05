let nock = require('nock');

module.exports.testInfo = {"now":"2019-07-05T09:25:31.835Z","tmr":"2019-07-05T09:25:31.835Z","container":"container156231873183505324","blob":"blob156231873210405845"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156231873183505324')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:22:12 GMT',
  'ETag',
  '"0x8D7012A436613FC"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '39d19248-701e-00e4-1413-332d9c000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Fri, 05 Jul 2019 09:22:12 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156231873183505324/blob156231873210405845')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:22:12 GMT',
  'ETag',
  '"0x8D7012A438F0B52"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '46b4974e-601e-00fb-3e13-33f68c000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 05 Jul 2019 09:22:12 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container156231873183505324/blob156231873210405845')
  .query(true)
  .reply(200, [], [ 'Cache-Control',
  'cache-control-override',
  'Content-Length',
  '1024',
  'Content-Type',
  'content-type-override',
  'Content-Encoding',
  'content-encoding-override',
  'Content-Language',
  'content-language-override',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:22:12 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D7012A438F0B52"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '64796d41-601e-0111-6113-334fd8000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-tag-count',
  '0',
  'x-ms-creation-time',
  'Fri, 05 Jul 2019 09:22:12 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'PageBlob',
  'x-ms-blob-sequence-number',
  '0',
  'Content-Disposition',
  'content-disposition-override',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Hot',
  'x-ms-access-tier-inferred',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,x-ms-tag-count,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-blob-sequence-number,Cache-Control,Content-Disposition,Content-Encoding,Content-Language,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 05 Jul 2019 09:22:12 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156231873183505324')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '13b79aa2-601e-0133-6e13-3321ee000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Fri, 05 Jul 2019 09:22:12 GMT',
  'Connection',
  'close' ]);

