let nock = require('nock');

module.exports.testInfo = {"container":"container156231859470601531","blob":"blob156231859497300237","randomstring":"randomstring156231859497403430"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156231859470601531')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:19:55 GMT',
  'ETag',
  '"0x8D70129F1A92734"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'fa763ac0-201e-013f-1612-33cf1f000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Fri, 05 Jul 2019 09:19:55 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156231859470601531/blob156231859497300237', "randomstring156231859497403430")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  '7CnDv/XTnzgcQvx/ZAp99Q==',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:19:55 GMT',
  'ETag',
  '"0x8D70129F1D392CF"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '331a1c18-f01e-013d-4212-33cde5000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 05 Jul 2019 09:19:55 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container156231859470601531/blob156231859497300237')
  .reply(200, ["72616e646f6d737472696e67313536323331383539343937343033343330"], [ 'Cache-Control',
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
  '7CnDv/XTnzgcQvx/ZAp99Q==',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:19:55 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D70129F1D392CF"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c5e40931-e01e-00c8-0612-33afa1000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-tag-count',
  '0',
  'x-ms-meta-keya',
  'vala',
  'x-ms-meta-keyb',
  'valb',
  'x-ms-creation-time',
  'Fri, 05 Jul 2019 09:19:55 GMT',
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
  'x-ms-request-id,Server,x-ms-version,x-ms-tag-count,x-ms-meta-keya,x-ms-meta-keyb,Content-Type,Content-Encoding,Content-Language,Cache-Control,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,Content-Disposition,x-ms-server-encrypted,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 05 Jul 2019 09:19:55 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156231859470601531')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'daf6c130-301e-0060-6912-337bb4000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Fri, 05 Jul 2019 09:19:56 GMT',
  'Connection',
  'close' ]);

