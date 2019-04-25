let nock = require('nock');

module.exports.testInfo = {"dir empty":"dir empty155623279037005733","file empty":"file empty155623279078806986"}

nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1share-with-dash155623278963402641/dir%20empty155623279037005733')
  .query({"restype":"directory"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 25 Apr 2019 22:53:10 GMT',
  'ETag',
  '"0x8D6C9D0CA821CAA"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'babfe446-a01a-0038-52b9-fbdc01000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 25 Apr 2019 22:53:09 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1share-with-dash155623278963402641/dir%20empty155623279037005733/file%20empty155623279078806986')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 25 Apr 2019 22:53:11 GMT',
  'ETag',
  '"0x8D6C9D0CAC105EF"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '424166c5-e01a-0095-16b9-fbfc6b000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 25 Apr 2019 22:53:10 GMT',
  'Connection',
  'close' ]);
