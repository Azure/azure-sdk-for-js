let nock = require('nock');

module.exports.testInfo = {"share":"share155873380162904489","dir":"dir155873380207104837","file":"file155873380240009240"}

nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share155873380162904489')
  .query({"restype":"share"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 24 May 2019 21:36:41 GMT',
  'ETag',
  '"0x8D6E08FE93416AA"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'cfeb2e9c-901a-0091-3d78-1209e9000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 24 May 2019 21:36:41 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share155873380162904489/dir155873380207104837')
  .query({"restype":"directory"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 24 May 2019 21:36:42 GMT',
  'ETag',
  '"0x8D6E08FE965F0E5"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'fbee9018-501a-002d-7078-121e98000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 24 May 2019 21:36:41 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share155873380162904489/dir155873380207104837/file155873380240009240')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 24 May 2019 21:36:42 GMT',
  'ETag',
  '"0x8D6E08FE99EE5AF"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a5f2275a-501a-0004-2f78-1268da000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 24 May 2019 21:36:42 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share155873380162904489/dir155873380207104837/file155873380240009240')
  .query({"comp":"properties"})
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 24 May 2019 21:36:42 GMT',
  'ETag',
  '"0x8D6E08FE9DAE845"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '797c9de8-701a-0018-5678-12b0cd000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 24 May 2019 21:36:42 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share155873380162904489/dir155873380207104837/file155873380240009240')
  .reply(200, [], [ 'Cache-Control',
  'fileCacheControl',
  'Content-Length',
  '11',
  'Content-Type',
  'fileContentType',
  'Content-Encoding',
  'fileContentEncoding',
  'Content-Language',
  'fileContentLanguage',
  'Content-MD5',
  'AQIDBA==',
  'Last-Modified',
  'Fri, 24 May 2019 21:36:42 GMT',
  'ETag',
  '"0x8D6E08FE9DAE845"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd9174170-b01a-0068-7f78-12c309000000',
  'x-ms-version',
  '2018-03-28',
  'Content-Disposition',
  'fileContentDisposition',
  'x-ms-type',
  'File',
  'x-ms-server-encrypted',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Content-Encoding,Content-Language,Cache-Control,Last-Modified,ETag,Content-MD5,Content-Disposition,x-ms-type,x-ms-server-encrypted,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 24 May 2019 21:36:42 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share155873380162904489')
  .query({"restype":"share"})
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ba37d210-b01a-002c-0b78-121f65000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 24 May 2019 21:36:42 GMT',
  'Connection',
  'close' ]);

