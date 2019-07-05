let nock = require('nock');

module.exports.testInfo = {"container":"container156231853264002912","blob":"blob156231853291106789"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156231853264002912')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:18:53 GMT',
  'ETag',
  '"0x8D70129CCAB577E"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '212780fe-a01e-0065-2312-338fcb000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Fri, 05 Jul 2019 09:18:53 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156231853264002912/blob156231853291106789')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:18:53 GMT',
  'ETag',
  '"0x8D70129CCD9F702"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '584e003e-901e-0126-4112-33e377000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 05 Jul 2019 09:18:53 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container156231853264002912/blob156231853291106789')
  .reply(200, "", [ 'Content-Length',
  '0',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:18:53 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D70129CCD9F702"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7e4555a5-501e-0119-0512-3354ab000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-tag-count',
  '0',
  'x-ms-creation-time',
  'Fri, 05 Jul 2019 09:18:53 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'AppendBlob',
  'x-ms-blob-committed-block-count',
  '0',
  'x-ms-server-encrypted',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,x-ms-tag-count,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-blob-committed-block-count,x-ms-server-encrypted,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 05 Jul 2019 09:18:53 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156231853264002912')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3ff11e87-f01e-00ba-2812-33de9f000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Fri, 05 Jul 2019 09:18:53 GMT',
  'Connection',
  'close' ]);

