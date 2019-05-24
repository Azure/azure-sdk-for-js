let nock = require('nock');

module.exports.testInfo = {"share":"share155873394319308119","dir":"dir155873394698808664","file":"file155873394770507067","randomstring":"randomstring155873394770601117"}

nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share155873394319308119')
  .query({"restype":"share"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 24 May 2019 21:39:05 GMT',
  'ETag',
  '"0x8D6E0903EB3B887"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '499690f5-701a-0057-6d79-1274d5000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 24 May 2019 21:39:04 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share155873394319308119/dir155873394698808664')
  .query({"restype":"directory"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 24 May 2019 21:39:07 GMT',
  'ETag',
  '"0x8D6E0903FF56149"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e25b1277-801a-006b-2579-12c00e000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 24 May 2019 21:39:06 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share155873394319308119/dir155873394698808664/file155873394770507067')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 24 May 2019 21:39:07 GMT',
  'ETag',
  '"0x8D6E0904043DDCB"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd1e83108-701a-007e-1f79-120297000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 24 May 2019 21:39:06 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share155873394319308119/dir155873394698808664/file155873394770507067', "randomstring155873394770601117")
  .query({"comp":"range"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'KGM5DPYaRgJVLJliNsrb6A==',
  'Last-Modified',
  'Fri, 24 May 2019 21:39:08 GMT',
  'ETag',
  '"0x8D6E09040F9935E"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f0b9c019-801a-0006-7179-126a20000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 24 May 2019 21:39:08 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share155873394319308119/dir155873394698808664/file155873394770507067')
  .reply(200, "randomstring155873394770601117", [ 'Content-Length',
  '30',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Fri, 24 May 2019 21:39:08 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D6E09040F9935E"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '335e8706-a01a-0092-1779-120aee000000',
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
  'Fri, 24 May 2019 21:39:09 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share155873394319308119')
  .query({"restype":"share"})
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '397d4b39-601a-006a-6279-12c1f3000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 24 May 2019 21:39:09 GMT',
  'Connection',
  'close' ]);

