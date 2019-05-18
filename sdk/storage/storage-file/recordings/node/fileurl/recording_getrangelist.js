let nock = require('nock');

module.exports.testInfo = {"share":"share155613729093806310","dir":"dir155613729129605026","file":"file155613729163505525"}

nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share155613729093806310')
  .query({"restype":"share"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 24 Apr 2019 20:21:31 GMT',
  'ETag',
  '"0x8D6C8F27060A329"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8243d387-c01a-0082-59db-fa3c08000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Wed, 24 Apr 2019 20:21:31 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share155613729093806310/dir155613729129605026')
  .query({"restype":"directory"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 24 Apr 2019 20:21:31 GMT',
  'ETag',
  '"0x8D6C8F27094D6CC"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '715db059-b01a-004a-65db-faad3f000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 24 Apr 2019 20:21:31 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share155613729093806310/dir155613729129605026/file155613729163505525')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 24 Apr 2019 20:21:31 GMT',
  'ETag',
  '"0x8D6C8F270C8C16B"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3755f11a-f01a-004d-46db-fa5bba000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 24 Apr 2019 20:21:30 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share155613729093806310/dir155613729129605026/file155613729163505525', "Hello")
  .query({"comp":"range"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'ixqZU8RhEpaoJ6v4xHgE1w==',
  'Last-Modified',
  'Wed, 24 Apr 2019 20:21:32 GMT',
  'ETag',
  '"0x8D6C8F270FD4866"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '67b25e94-601a-0007-57db-fa6bdd000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 24 Apr 2019 20:21:31 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share155613729093806310/dir155613729129605026/file155613729163505525', "World")
  .query({"comp":"range"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  '9aeSTmIehMkoCpon4by39g==',
  'Last-Modified',
  'Wed, 24 Apr 2019 20:21:32 GMT',
  'ETag',
  '"0x8D6C8F2713440D3"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '06fd8746-a01a-0033-59db-fac475000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 24 Apr 2019 20:21:32 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share155613729093806310/dir155613729129605026/file155613729163505525')
  .query({"comp":"range"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 24 Apr 2019 20:21:32 GMT',
  'ETag',
  '"0x8D6C8F27169B25D"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7f2ae6b8-b01a-0086-24db-fac98a000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Wed, 24 Apr 2019 20:21:32 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share155613729093806310/dir155613729129605026/file155613729163505525')
  .query({"comp":"rangelist"})
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Ranges><Range><Start>0</Start><End>9</End></Range></Ranges>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Last-Modified',
  'Wed, 24 Apr 2019 20:21:32 GMT',
  'ETag',
  '"0x8D6C8F27169B25D"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c38c9caa-601a-0025-56db-fa05eb000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-content-length',
  '10',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-content-length,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 24 Apr 2019 20:21:33 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share155613729093806310')
  .query({"restype":"share"})
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'dd6a19f0-301a-0079-2edb-faf412000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Wed, 24 Apr 2019 20:21:33 GMT',
  'Connection',
  'close' ]);
