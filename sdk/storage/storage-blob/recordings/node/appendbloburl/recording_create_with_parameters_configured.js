let nock = require('nock');

module.exports.testInfo = {"container":"container156231853380003782","blob":"blob156231853407605197"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156231853380003782')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:18:54 GMT',
  'ETag',
  '"0x8D70129CD5CFBFF"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'dfc68325-a01e-00a9-1a12-33eb7e000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Fri, 05 Jul 2019 09:18:53 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156231853380003782/blob156231853407605197')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:18:54 GMT',
  'ETag',
  '"0x8D70129CD8746E2"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f7602ee3-401e-0064-2912-338e36000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 05 Jul 2019 09:18:54 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container156231853380003782/blob156231853407605197')
  .reply(200, [], [ 'Cache-Control',
  'blobCacheControl',
  'Content-Length',
  '0',
  'Content-Type',
  'blobContentType',
  'Content-Encoding',
  'blobContentEncoding',
  'Content-Language',
  'blobContentLanguage',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:18:54 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D70129CD8746E2"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bbc06a6e-701e-0067-4112-338d31000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-tag-count',
  '0',
  'x-ms-meta-key1',
  'vala',
  'x-ms-meta-key2',
  'valb',
  'x-ms-creation-time',
  'Fri, 05 Jul 2019 09:18:54 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'AppendBlob',
  'x-ms-blob-committed-block-count',
  '0',
  'Content-Disposition',
  'blobContentDisposition',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Hot',
  'x-ms-access-tier-inferred',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,x-ms-tag-count,x-ms-meta-key1,x-ms-meta-key2,Content-Type,Content-Encoding,Content-Language,Cache-Control,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-blob-committed-block-count,Content-Disposition,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 05 Jul 2019 09:18:55 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156231853380003782')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e64d4517-b01e-0053-6312-332299000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Fri, 05 Jul 2019 09:18:54 GMT',
  'Connection',
  'close' ]);

