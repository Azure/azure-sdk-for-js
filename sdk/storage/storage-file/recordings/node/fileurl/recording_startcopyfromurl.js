let nock = require('nock');

module.exports.testInfo = {"share":"share156093651135201018","dir":"dir156093651162209434","file":"file156093651189402570","copiedfile":"copiedfile156093651217004846"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156093651135201018')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 19 Jun 2019 09:25:29 GMT',
  'ETag',
  '"0x8D6F4981240E009"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c6732471-e01a-000f-1f80-26d360000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Wed, 19 Jun 2019 09:25:29 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156093651135201018/dir156093651162209434')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 19 Jun 2019 09:25:30 GMT',
  'ETag',
  '"0x8D6F498126A67F1"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '041f7302-401a-0020-0680-26525a000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 19 Jun 2019 09:25:30 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156093651135201018/dir156093651162209434/file156093651189402570')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 19 Jun 2019 09:25:30 GMT',
  'ETag',
  '"0x8D6F4981293A23F"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c7c4ba0c-b01a-0058-7d80-263aed000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 19 Jun 2019 09:25:29 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156093651135201018/dir156093651162209434/copiedfile156093651217004846')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 19 Jun 2019 09:25:30 GMT',
  'ETag',
  '"0x8D6F49812E5A195"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4ca438bc-401a-012f-2780-26f9f9000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-copy-id',
  'a9dcf710-6e1a-431e-a4c7-4913bfd9968c',
  'x-ms-copy-status',
  'success',
  'Date',
  'Wed, 19 Jun 2019 09:25:30 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share156093651135201018/dir156093651162209434/file156093651189402570')
  .reply(200, "", [ 'Content-Length',
  '1024',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Wed, 19 Jun 2019 09:25:30 GMT',
  'ETag',
  '"0x8D6F4981293A23F"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '595b16a7-e01a-0026-5580-26a522000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-type',
  'File',
  'x-ms-server-encrypted',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-type,x-ms-server-encrypted,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 19 Jun 2019 09:25:30 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share156093651135201018/dir156093651162209434/copiedfile156093651217004846')
  .reply(200, "", [ 'Content-Length',
  '1024',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Wed, 19 Jun 2019 09:25:30 GMT',
  'ETag',
  '"0x8D6F49812E5A195"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a119744b-e01a-00c3-2380-26b7d5000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-copy-id',
  'a9dcf710-6e1a-431e-a4c7-4913bfd9968c',
  'x-ms-copy-source',
  'https://fakestorageaccount.file.core.windows.net/share156093651135201018/dir156093651162209434/file156093651189402570',
  'x-ms-copy-status',
  'success',
  'x-ms-copy-progress',
  '1024/1024',
  'x-ms-copy-completion-time',
  'Wed, 19 Jun 2019 09:25:30 GMT',
  'x-ms-type',
  'File',
  'x-ms-server-encrypted',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,x-ms-copy-id,x-ms-copy-source,x-ms-copy-status,x-ms-copy-progress,x-ms-copy-completion-time,Last-Modified,ETag,x-ms-type,x-ms-server-encrypted,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 19 Jun 2019 09:25:31 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156093651135201018')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd9ae6352-f01a-0010-6480-260870000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Wed, 19 Jun 2019 09:25:30 GMT',
  'Connection',
  'close' ]);

