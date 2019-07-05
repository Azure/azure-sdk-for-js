let nock = require('nock');

module.exports.testInfo = {"container":"container156231853739202858","blob":"blob156231853779804775"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156231853739202858')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:18:58 GMT',
  'ETag',
  '"0x8D70129CF80F59F"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1dab6c2e-a01e-004c-0612-33f989000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Fri, 05 Jul 2019 09:18:57 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156231853739202858/blob156231853779804775', "Hello World")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:18:58 GMT',
  'ETag',
  '"0x8D70129CFBE17A8"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f61a6bd6-101e-00dd-2b12-336d38000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 05 Jul 2019 09:18:58 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container156231853739202858/blob156231853779804775')
  .reply(206, "H", [ 'Content-Length',
  '1',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'wdn1D4aCWhojAuwkScFxlg==',
  'Content-Range',
  'bytes 0-0/11',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:18:58 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D70129CFBE17A8"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a25e29b6-b01e-00b6-3d12-33306e000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-tag-count',
  '0',
  'x-ms-creation-time',
  'Fri, 05 Jul 2019 09:18:58 GMT',
  'x-ms-blob-content-md5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,x-ms-tag-count,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-blob-content-md5,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 05 Jul 2019 09:18:58 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156231853739202858')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f0a02a8d-601e-0051-6512-332063000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Fri, 05 Jul 2019 09:18:58 GMT',
  'Connection',
  'close' ]);

