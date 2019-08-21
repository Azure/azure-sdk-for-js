let nock = require('nock');

module.exports.testInfo = {"share":"share156404675062804368","dir":"dir156404675641704602","file":"file156404675669101214"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156404675062804368')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 25 Jul 2019 09:22:17 GMT',
  'ETag',
  '"0x8D710E196B897A9"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '70fb5bfe-701a-0023-5fca-42515d000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Thu, 25 Jul 2019 09:22:17 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156404675062804368/dir156404675641704602')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 25 Jul 2019 09:22:18 GMT',
  'ETag',
  '"0x8D710E197166BAC"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '04d0d8b5-401a-0064-0aca-428e36000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 25 Jul 2019 09:22:18 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156404675062804368/dir156404675641704602/file156404675669101214')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 25 Jul 2019 09:22:18 GMT',
  'ETag',
  '"0x8D710E1973EE293"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '909f7eec-b01a-0094-53ca-425e58000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 25 Jul 2019 09:22:18 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156404675062804368/dir156404675641704602/file156404675669101214', "Hello World")
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Thu, 25 Jul 2019 09:22:19 GMT',
  'ETag',
  '"0x8D710E19767CEBA"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'db6258ee-301a-00ac-6bca-421f01000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 25 Jul 2019 09:22:18 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156404675062804368/dir156404675641704602/file156404675669101214')
  .reply(200, "Hello World", [ 'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Thu, 25 Jul 2019 09:22:19 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D710E19767CEBA"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6ae9a3f7-201a-007f-37ca-42a0a4000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-type',
  'File',
  'x-ms-server-encrypted',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-type,x-ms-server-encrypted,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 25 Jul 2019 09:22:18 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156404675062804368')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '180b53f3-a01a-0003-7cca-423d91000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Thu, 25 Jul 2019 09:22:22 GMT',
  'Connection',
  'close' ]);

