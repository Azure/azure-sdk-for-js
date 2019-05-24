let nock = require('nock');

module.exports.testInfo = {"share":"share155873379826308092","dir":"dir155873379879501905","file":"file155873380013808792"}

nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share155873379826308092')
  .query({"restype":"share"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 24 May 2019 21:36:38 GMT',
  'ETag',
  '"0x8D6E08FE7376515"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '91ad66f9-b01a-0005-0478-126927000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 24 May 2019 21:36:37 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share155873379826308092/dir155873379879501905')
  .query({"restype":"directory"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 24 May 2019 21:36:39 GMT',
  'ETag',
  '"0x8D6E08FE7FFDDCF"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '97f863e7-501a-0069-1478-12c2f4000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 24 May 2019 21:36:38 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share155873379826308092/dir155873379879501905/file155873380013808792')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 24 May 2019 21:36:40 GMT',
  'ETag',
  '"0x8D6E08FE83CCAF0"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2ddc6ba0-a01a-0055-4078-12762f000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 24 May 2019 21:36:39 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share155873379826308092/dir155873379879501905/file155873380013808792')
  .query({"comp":"properties"})
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 24 May 2019 21:36:40 GMT',
  'ETag',
  '"0x8D6E08FE87AC9B3"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ff0ae200-b01a-0041-7e78-12b54b000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 24 May 2019 21:36:40 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share155873379826308092/dir155873379879501905/file155873380013808792')
  .reply(200, "", [ 'Content-Length',
  '11',
  'Last-Modified',
  'Fri, 24 May 2019 21:36:40 GMT',
  'ETag',
  '"0x8D6E08FE87AC9B3"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ccd3a0fb-401a-007d-5378-120190000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-type',
  'File',
  'x-ms-server-encrypted',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Last-Modified,ETag,x-ms-type,x-ms-server-encrypted,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 24 May 2019 21:36:40 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share155873379826308092')
  .query({"restype":"share"})
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2fcf708b-901a-0019-6978-12b130000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 24 May 2019 21:36:40 GMT',
  'Connection',
  'close' ]);

