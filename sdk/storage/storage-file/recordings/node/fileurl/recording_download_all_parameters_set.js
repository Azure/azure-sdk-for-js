let nock = require('nock');

module.exports.testInfo = {"share":"share155613729601204418","dir":"dir155613729634109068","file":"file155613729669203229"}

nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share155613729601204418')
  .query({"restype":"share"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 24 Apr 2019 20:21:36 GMT',
  'ETag',
  '"0x8D6C8F27362C72F"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd7b2fbfe-e01a-0095-67db-fafc6b000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Wed, 24 Apr 2019 20:21:35 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share155613729601204418/dir155613729634109068')
  .query({"restype":"directory"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 24 Apr 2019 20:21:36 GMT',
  'ETag',
  '"0x8D6C8F2739868E3"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3ac7fad2-901a-005d-2bdb-fa6d5c000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 24 Apr 2019 20:21:36 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share155613729601204418/dir155613729634109068/file155613729669203229')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 24 Apr 2019 20:21:36 GMT',
  'ETag',
  '"0x8D6C8F273CB41E1"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '80a54ddd-401a-0010-54db-faabbe000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 24 Apr 2019 20:21:36 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share155613729601204418/dir155613729634109068/file155613729669203229', "Hello World")
  .query({"comp":"range"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Wed, 24 Apr 2019 20:21:37 GMT',
  'ETag',
  '"0x8D6C8F27402887B"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'cb25be7f-501a-008c-08db-fad003000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 24 Apr 2019 20:21:36 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share155613729601204418/dir155613729634109068/file155613729669203229')
  .reply(206, "H", [ 'Content-Length',
  '1',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'wdn1D4aCWhojAuwkScFxlg==',
  'Content-Range',
  'bytes 0-0/11',
  'Last-Modified',
  'Wed, 24 Apr 2019 20:21:37 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D6C8F27402887B"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c09be733-601a-008f-5ddb-fad304000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-type',
  'File',
  'x-ms-server-encrypted',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-type,x-ms-server-encrypted,Content-Range,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 24 Apr 2019 20:21:37 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share155613729601204418')
  .query({"restype":"share"})
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9f11cab1-801a-0006-6cdb-fa6a20000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Wed, 24 Apr 2019 20:21:37 GMT',
  'Connection',
  'close' ]);
