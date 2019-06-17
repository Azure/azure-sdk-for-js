let nock = require('nock');

module.exports.testInfo = {"undefined":"2019-06-17T23:54:11.913Z","share":"share156081565191300579","dir":"dir156081565222302176","file":"file156081565253705300"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156081565191300579')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 17 Jun 2019 23:54:12 GMT',
  'ETag',
  '"0x8D6F37F18C94B2E"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bb7c42c6-a01a-00ab-2d67-25ad83000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Mon, 17 Jun 2019 23:54:11 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156081565191300579/dir156081565222302176')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 17 Jun 2019 23:54:12 GMT',
  'ETag',
  '"0x8D6F37F18F8AEFB"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '232f25de-b01a-0015-3b67-25b808000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 17 Jun 2019 23:54:12 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156081565191300579/dir156081565222302176/file156081565253705300')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 17 Jun 2019 23:54:12 GMT',
  'ETag',
  '"0x8D6F37F192FF57F"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5f0fddca-b01a-005a-3867-257c10000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 17 Jun 2019 23:54:12 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share156081565191300579/dir156081565222302176/file156081565253705300')
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
  'Mon, 17 Jun 2019 23:54:12 GMT',
  'ETag',
  '"0x8D6F37F192FF57F"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '59e4f377-b01a-00d2-7167-25c4c9000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-type',
  'File',
  'Content-Disposition',
  'content-disposition-override',
  'x-ms-server-encrypted',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-type,Cache-Control,Content-Disposition,Content-Encoding,Content-Language,x-ms-server-encrypted,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 17 Jun 2019 23:54:12 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156081565191300579')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '91a05ab6-d01a-000e-1167-25969a000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Mon, 17 Jun 2019 23:54:13 GMT',
  'Connection',
  'close' ]);

