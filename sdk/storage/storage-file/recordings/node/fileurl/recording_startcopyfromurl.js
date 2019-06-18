let nock = require('nock');

module.exports.testInfo = {"share":"share156044258100909329","dir":"dir156044258236403613","file":"file156044258281509038","copiedfile":"copiedfile156044258307709982"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156044258100909329')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 13 Jun 2019 09:16:06 GMT',
  'ETag',
  '"0x8D6EFDFC42EA941"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '00141a7c-301a-00e1-04c8-219de4000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Thu, 13 Jun 2019 09:16:06 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156044258100909329/dir156044258236403613')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 13 Jun 2019 09:16:07 GMT',
  'ETag',
  '"0x8D6EFDFC49DE058"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e229a6b3-101a-0018-71c8-215704000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 13 Jun 2019 09:16:06 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156044258100909329/dir156044258236403613/file156044258281509038')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 13 Jun 2019 09:16:07 GMT',
  'ETag',
  '"0x8D6EFDFC4C5457A"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e76045bc-001a-00cb-05c8-21e8a1000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 13 Jun 2019 09:16:07 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156044258100909329/dir156044258236403613/copiedfile156044258307709982')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 13 Jun 2019 09:16:09 GMT',
  'ETag',
  '"0x8D6EFDFC5EAE6C9"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'de1a4aaf-101a-00df-30c8-212bc5000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-copy-id',
  '2555fa48-45aa-407b-a620-72c7671d3a77',
  'x-ms-copy-status',
  'success',
  'Date',
  'Thu, 13 Jun 2019 09:16:09 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share156044258100909329/dir156044258236403613/file156044258281509038')
  .reply(200, "", [ 'Content-Length',
  '1024',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Thu, 13 Jun 2019 09:16:07 GMT',
  'ETag',
  '"0x8D6EFDFC4C5457A"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9c9d2aec-401a-0066-16c8-21c8cb000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-type',
  'File',
  'x-ms-server-encrypted',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-type,x-ms-server-encrypted,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 13 Jun 2019 09:16:09 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share156044258100909329/dir156044258236403613/copiedfile156044258307709982')
  .reply(200, "", [ 'Content-Length',
  '1024',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Thu, 13 Jun 2019 09:16:09 GMT',
  'ETag',
  '"0x8D6EFDFC5EAE6C9"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'eb2d6f94-401a-00a1-25c8-21b40a000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-copy-id',
  '2555fa48-45aa-407b-a620-72c7671d3a77',
  'x-ms-copy-source',
  'https://fakestorageaccount.file.core.windows.net/share156044258100909329/dir156044258236403613/file156044258281509038',
  'x-ms-copy-status',
  'success',
  'x-ms-copy-progress',
  '1024/1024',
  'x-ms-copy-completion-time',
  'Thu, 13 Jun 2019 09:16:09 GMT',
  'x-ms-type',
  'File',
  'x-ms-server-encrypted',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,x-ms-copy-id,x-ms-copy-source,x-ms-copy-status,x-ms-copy-progress,x-ms-copy-completion-time,Last-Modified,ETag,x-ms-type,x-ms-server-encrypted,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 13 Jun 2019 09:16:09 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156044258100909329')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f581ccd9-301a-00c8-21c8-21eba6000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Thu, 13 Jun 2019 09:16:09 GMT',
  'Connection',
  'close' ]);

