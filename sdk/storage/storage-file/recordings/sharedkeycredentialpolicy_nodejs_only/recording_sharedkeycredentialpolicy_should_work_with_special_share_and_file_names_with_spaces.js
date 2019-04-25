let nock = require('nock');

module.exports.testInfo = {"dir empty":"dir empty155621626055801324","file empty":"file empty155621626097204569"}

nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1share-with-dash155621625926903470/dir%20empty155621626055801324')
  .query({"restype":"directory"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 25 Apr 2019 18:17:40 GMT',
  'ETag',
  '"0x8D6C9AA4DF7CA2B"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b24cd347-401a-0039-4a93-fbddfc000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 25 Apr 2019 18:17:40 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1share-with-dash155621625926903470/dir%20empty155621626055801324/file%20empty155621626097204569')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 25 Apr 2019 18:17:41 GMT',
  'ETag',
  '"0x8D6C9AA4E3728C7"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd85b474c-801a-0006-2293-fb6a20000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 25 Apr 2019 18:17:41 GMT',
  'Connection',
  'close' ]);
