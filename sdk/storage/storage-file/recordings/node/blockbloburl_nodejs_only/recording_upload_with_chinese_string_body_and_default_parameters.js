let nock = require('nock');

module.exports.testInfo = {"share":"share156044275050002329","dir":"dir156044275074605481","file":"file156044275101008358","randomstring你好":"randomstring你好156044275101103783"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156044275050002329')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 13 Jun 2019 09:18:55 GMT',
  'ETag',
  '"0x8D6EFE028B6D6CE"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1cd67f5b-901a-006f-7fc9-21d245000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Thu, 13 Jun 2019 09:18:55 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156044275050002329/dir156044275074605481')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 13 Jun 2019 09:18:55 GMT',
  'ETag',
  '"0x8D6EFE028DE1D34"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '946413b3-501a-005b-53c9-217ded000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 13 Jun 2019 09:18:55 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156044275050002329/dir156044275074605481/file156044275101008358')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 13 Jun 2019 09:18:55 GMT',
  'ETag',
  '"0x8D6EFE029055B36"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '94d5d963-401a-00aa-1dc9-21ac7e000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 13 Jun 2019 09:18:55 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156044275050002329/dir156044275074605481/file156044275101008358', "randomstring你好156044275101103783")
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'ZtWjK+n+kvGUjb3NGIyuPQ==',
  'Last-Modified',
  'Thu, 13 Jun 2019 09:18:56 GMT',
  'ETag',
  '"0x8D6EFE0292C4B0F"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9e33cca6-a01a-0045-20c9-21a700000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 13 Jun 2019 09:18:55 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156044275050002329/dir156044275074605481/file156044275101008358')
  .reply(200, "randomstring你好156044275101103783", [ 'Content-Length',
  '36',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Thu, 13 Jun 2019 09:18:56 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D6EFE0292C4B0F"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9b206046-801a-001d-0bc9-21a37b000000',
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
  'Thu, 13 Jun 2019 09:18:56 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156044275050002329')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'cd627259-601a-0094-40c9-211a5f000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Thu, 13 Jun 2019 09:18:56 GMT',
  'Connection',
  'close' ]);

