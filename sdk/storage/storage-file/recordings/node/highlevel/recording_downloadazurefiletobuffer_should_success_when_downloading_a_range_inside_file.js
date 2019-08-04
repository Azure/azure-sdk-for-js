let nock = require('nock');

module.exports.testInfo = {"share":"share156406439164905896","dir":"dir156406439256408441","file":"file156406439284705791"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156406439164905896')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 25 Jul 2019 14:16:12 GMT',
  'ETag',
  '"0x8D7110AA5CF7890"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0846a328-001a-010a-12f3-42614a000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Thu, 25 Jul 2019 14:16:12 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156406439164905896/dir156406439256408441')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 25 Jul 2019 14:16:12 GMT',
  'ETag',
  '"0x8D7110AA6076EB0"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4f9e2feb-701a-006c-25f3-429545000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 25 Jul 2019 14:16:11 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156406439164905896/dir156406439256408441/file156406439284705791')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 25 Jul 2019 14:16:13 GMT',
  'ETag',
  '"0x8D7110AA631938D"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b6dfb7c4-501a-003f-6af3-42894a000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 25 Jul 2019 14:16:12 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156406439164905896/dir156406439256408441/file156406439284705791', "aaaabbbb")
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'xiIFTZ5vF7Q4FK1dYcqyOQ==',
  'Last-Modified',
  'Thu, 25 Jul 2019 14:16:13 GMT',
  'ETag',
  '"0x8D7110AA65BB869"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '90487592-c01a-0057-7df3-42d71b000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 25 Jul 2019 14:16:13 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156406439164905896/dir156406439256408441/file156406439284705791')
  .reply(206, "bbbb", [ 'Content-Length',
  '4',
  'Content-Type',
  'application/octet-stream',
  'Content-Range',
  'bytes 4-7/8',
  'Last-Modified',
  'Thu, 25 Jul 2019 14:16:13 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D7110AA65BB869"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '74238210-701a-0082-25f3-429fc6000000',
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
  'Thu, 25 Jul 2019 14:16:13 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156406439164905896/dir156406439256408441/file156406439284705791')
  .reply(206, "abbb", [ 'Content-Length',
  '4',
  'Content-Type',
  'application/octet-stream',
  'Content-Range',
  'bytes 3-6/8',
  'Last-Modified',
  'Thu, 25 Jul 2019 14:16:13 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D7110AA65BB869"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'adb12960-f01a-011f-78f3-42a3d3000000',
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
  'Thu, 25 Jul 2019 14:16:13 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156406439164905896/dir156406439256408441/file156406439284705791')
  .reply(206, "aabb", [ 'Content-Length',
  '4',
  'Content-Type',
  'application/octet-stream',
  'Content-Range',
  'bytes 2-5/8',
  'Last-Modified',
  'Thu, 25 Jul 2019 14:16:13 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D7110AA65BB869"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '62926710-701a-00a0-05f3-42f1f0000000',
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
  'Thu, 25 Jul 2019 14:16:13 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156406439164905896/dir156406439256408441/file156406439284705791')
  .reply(206, "aaab", [ 'Content-Length',
  '4',
  'Content-Type',
  'application/octet-stream',
  'Content-Range',
  'bytes 1-4/8',
  'Last-Modified',
  'Thu, 25 Jul 2019 14:16:13 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D7110AA65BB869"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd1c03216-001a-00e0-35f3-42d81e000000',
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
  'Thu, 25 Jul 2019 14:16:13 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156406439164905896/dir156406439256408441/file156406439284705791')
  .reply(206, "aaaa", [ 'Content-Length',
  '4',
  'Content-Type',
  'application/octet-stream',
  'Content-Range',
  'bytes 0-3/8',
  'Last-Modified',
  'Thu, 25 Jul 2019 14:16:13 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D7110AA65BB869"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0a377d74-301a-0006-69f3-42c9ee000000',
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
  'Thu, 25 Jul 2019 14:16:14 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156406439164905896')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8dad7d78-401a-010d-20f3-4297cf000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Thu, 25 Jul 2019 14:16:15 GMT',
  'Connection',
  'close' ]);

