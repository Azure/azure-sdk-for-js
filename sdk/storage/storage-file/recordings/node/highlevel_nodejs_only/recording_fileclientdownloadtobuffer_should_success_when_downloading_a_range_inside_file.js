let nock = require('nock');

module.exports.testInfo = {"share":"share156599449589708627","dir":"dir156599449618905243","file":"file156599449648307256"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156599449589708627')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 16 Aug 2019 22:28:16 GMT',
  'ETag',
  '"0x8D72299085591BE"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd47375fd-f01a-00b8-5a81-549862000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Fri, 16 Aug 2019 22:28:15 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156599449589708627/dir156599449618905243')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 16 Aug 2019 22:28:16 GMT',
  'ETag',
  '"0x8D7229908823C49"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '846e6425-e01a-00e8-2481-54876a000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 16 Aug 2019 22:28:16 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156599449589708627/dir156599449618905243/file156599449648307256')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 16 Aug 2019 22:28:16 GMT',
  'ETag',
  '"0x8D7229908B03268"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ccdd7f3c-e01a-00a7-6c81-544372000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 16 Aug 2019 22:28:16 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156599449589708627/dir156599449618905243/file156599449648307256', "aaaabbbb")
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'xiIFTZ5vF7Q4FK1dYcqyOQ==',
  'Last-Modified',
  'Fri, 16 Aug 2019 22:28:17 GMT',
  'ETag',
  '"0x8D7229908DE9DC8"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3f457715-801a-00d1-1f81-54c7ce000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 16 Aug 2019 22:28:16 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156599449589708627/dir156599449618905243/file156599449648307256')
  .reply(206, "bbbb", [ 'Content-Length',
  '4',
  'Content-Type',
  'application/octet-stream',
  'Content-Range',
  'bytes 4-7/8',
  'Last-Modified',
  'Fri, 16 Aug 2019 22:28:17 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D7229908DE9DC8"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7ab0554f-801a-001d-7981-54a37b000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-type',
  'File',
  'x-ms-server-encrypted',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-type,x-ms-server-encrypted,Content-Range,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 16 Aug 2019 22:28:17 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156599449589708627/dir156599449618905243/file156599449648307256')
  .reply(206, "abbb", [ 'Content-Length',
  '4',
  'Content-Type',
  'application/octet-stream',
  'Content-Range',
  'bytes 3-6/8',
  'Last-Modified',
  'Fri, 16 Aug 2019 22:28:17 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D7229908DE9DC8"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '29bfbc84-701a-0003-7181-547996000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-type',
  'File',
  'x-ms-server-encrypted',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-type,x-ms-server-encrypted,Content-Range,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 16 Aug 2019 22:28:16 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156599449589708627/dir156599449618905243/file156599449648307256')
  .reply(206, "aabb", [ 'Content-Length',
  '4',
  'Content-Type',
  'application/octet-stream',
  'Content-Range',
  'bytes 2-5/8',
  'Last-Modified',
  'Fri, 16 Aug 2019 22:28:17 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D7229908DE9DC8"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '49bb8f21-e01a-0085-1a81-542d44000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-type',
  'File',
  'x-ms-server-encrypted',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-type,x-ms-server-encrypted,Content-Range,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 16 Aug 2019 22:28:17 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156599449589708627/dir156599449618905243/file156599449648307256')
  .reply(206, "aaab", [ 'Content-Length',
  '4',
  'Content-Type',
  'application/octet-stream',
  'Content-Range',
  'bytes 1-4/8',
  'Last-Modified',
  'Fri, 16 Aug 2019 22:28:17 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D7229908DE9DC8"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7835c56f-301a-008c-2781-5437ca000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-type',
  'File',
  'x-ms-server-encrypted',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-type,x-ms-server-encrypted,Content-Range,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 16 Aug 2019 22:28:17 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156599449589708627/dir156599449618905243/file156599449648307256')
  .reply(206, "aaaa", [ 'Content-Length',
  '4',
  'Content-Type',
  'application/octet-stream',
  'Content-Range',
  'bytes 0-3/8',
  'Last-Modified',
  'Fri, 16 Aug 2019 22:28:17 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D7229908DE9DC8"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6b82df06-401a-0044-5f81-54a6fd000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-type',
  'File',
  'x-ms-server-encrypted',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-type,x-ms-server-encrypted,Content-Range,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 16 Aug 2019 22:28:18 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156599449589708627')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd619945e-801a-0052-3c81-546763000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Fri, 16 Aug 2019 22:28:19 GMT',
  'Connection',
  'close' ]);

