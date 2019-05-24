let nock = require('nock');

module.exports.testInfo = {"share":"share155873382890303569","dir":"dir155873382929606614","file":"file155873382968901319"}

nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share155873382890303569')
  .query({"restype":"share"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 24 May 2019 21:37:08 GMT',
  'ETag',
  '"0x8D6E08FF96E9C69"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f0b9be51-801a-0006-3678-126a20000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 24 May 2019 21:37:08 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share155873382890303569/dir155873382929606614')
  .query({"restype":"directory"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 24 May 2019 21:37:09 GMT',
  'ETag',
  '"0x8D6E08FF9A3959B"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '335e8668-a01a-0092-7878-120aee000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 24 May 2019 21:37:09 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share155873382890303569/dir155873382929606614/file155873382968901319')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 24 May 2019 21:37:09 GMT',
  'ETag',
  '"0x8D6E08FF9E230BB"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '397d4a0f-601a-006a-5178-12c1f3000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 24 May 2019 21:37:09 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share155873382890303569/dir155873382929606614/file155873382968901319', "Hello")
  .query({"comp":"range"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'ixqZU8RhEpaoJ6v4xHgE1w==',
  'Last-Modified',
  'Fri, 24 May 2019 21:37:10 GMT',
  'ETag',
  '"0x8D6E08FFA214125"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'eeb144b8-801a-0042-2678-12b64c000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 24 May 2019 21:37:09 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share155873382890303569/dir155873382929606614/file155873382968901319', "World")
  .query({"comp":"range"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  '9aeSTmIehMkoCpon4by39g==',
  'Last-Modified',
  'Fri, 24 May 2019 21:37:10 GMT',
  'ETag',
  '"0x8D6E08FFA54DDBC"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4007b1a6-601a-002e-0f78-121d9f000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 24 May 2019 21:37:09 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share155873382890303569/dir155873382929606614/file155873382968901319')
  .query({"comp":"range"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 24 May 2019 21:37:10 GMT',
  'ETag',
  '"0x8D6E08FFA972304"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '339432a6-901a-0056-1978-127528000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 24 May 2019 21:37:10 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share155873382890303569/dir155873382929606614/file155873382968901319')
  .reply(200, "H\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000d", [ 'Content-Length',
  '10',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Fri, 24 May 2019 21:37:10 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D6E08FFA972304"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f2c105c2-a01a-001a-6e78-12b237000000',
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
  'Fri, 24 May 2019 21:37:10 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share155873382890303569')
  .query({"restype":"share"})
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '91ad672a-b01a-0005-0b78-126927000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 24 May 2019 21:37:10 GMT',
  'Connection',
  'close' ]);

