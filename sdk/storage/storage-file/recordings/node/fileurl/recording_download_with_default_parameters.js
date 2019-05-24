let nock = require('nock');

module.exports.testInfo = {"share":"share155873383573806993","dir":"dir155873383649407710","file":"file155873383689103417"}

nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share155873383573806993')
  .query({"restype":"share"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 24 May 2019 21:37:16 GMT',
  'ETag',
  '"0x8D6E08FFDAFA6B0"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '797c9e20-701a-0018-6178-12b0cd000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 24 May 2019 21:37:15 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share155873383573806993/dir155873383649407710')
  .query({"restype":"directory"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 24 May 2019 21:37:16 GMT',
  'ETag',
  '"0x8D6E08FFDF20F40"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd91741b7-b01a-0068-1778-12c309000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 24 May 2019 21:37:15 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share155873383573806993/dir155873383649407710/file155873383689103417')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 24 May 2019 21:37:16 GMT',
  'ETag',
  '"0x8D6E08FFE28927D"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ba37d277-b01a-002c-4078-121f65000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 24 May 2019 21:37:15 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share155873383573806993/dir155873383649407710/file155873383689103417', "Hello World")
  .query({"comp":"range"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Fri, 24 May 2019 21:37:17 GMT',
  'ETag',
  '"0x8D6E08FFE5E2B39"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2adab776-a01a-007c-5d78-12006d000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 24 May 2019 21:37:16 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share155873383573806993/dir155873383649407710/file155873383689103417')
  .reply(200, "Hello World", [ 'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Fri, 24 May 2019 21:37:17 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D6E08FFE5E2B39"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '54b72ba1-401a-0054-6078-1277d2000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-type',
  'File',
  'x-ms-server-encrypted',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-type,x-ms-server-encrypted,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 24 May 2019 21:37:17 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share155873383573806993')
  .query({"restype":"share"})
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '13565887-701a-0090-5878-120814000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 24 May 2019 21:37:17 GMT',
  'Connection',
  'close' ]);

