let nock = require('nock');

module.exports.testInfo = {"container":"container156711962091901316","blob":"blob156711962121306557","randomstring":"randomstring156711962121508796"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156711962091901316')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 29 Aug 2019 23:00:21 GMT',
  'ETag',
  '"0x8D72CD4AB1851C8"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '601cb421-401e-00a1-3bbd-5eb40a000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Thu, 29 Aug 2019 23:00:21 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156711962091901316/blob156711962121306557', "randomstring156711962121508796")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'zgsmz+VGd4wXuSh2BhGtEw==',
  'Last-Modified',
  'Thu, 29 Aug 2019 23:00:21 GMT',
  'ETag',
  '"0x8D72CD4AB467CEF"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c86088ca-401e-00cc-56bd-5e1e24000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 29 Aug 2019 23:00:21 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container156711962091901316/blob156711962121306557')
  .reply(200, "randomstring156711962121508796", [ 'Content-Length',
  '30',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'zgsmz+VGd4wXuSh2BhGtEw==',
  'Last-Modified',
  'Thu, 29 Aug 2019 23:00:21 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D72CD4AB467CEF"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '03bf67bf-801e-0095-01bd-5e1ba2000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-tag-count',
  '0',
  'x-ms-creation-time',
  'Thu, 29 Aug 2019 23:00:21 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,x-ms-tag-count,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 29 Aug 2019 23:00:21 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156711962091901316')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'cb8b5d0f-e01e-00e3-07bd-5e9f1e000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Thu, 29 Aug 2019 23:00:21 GMT',
  'Connection',
  'close' ]);

