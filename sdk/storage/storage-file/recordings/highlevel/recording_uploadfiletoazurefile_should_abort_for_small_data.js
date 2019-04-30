let nock = require('nock');

module.exports.testInfo = {"share":"share155631164960202355","dir":"dir155631164994106486","file":"file155631165041902937"}

nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share155631164960202355')
  .query({"restype":"share"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 26 Apr 2019 20:47:29 GMT',
  'ETag',
  '"0x8D6CA8866354930"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4827fe21-901a-0074-2e71-fc1b1e000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 26 Apr 2019 20:47:28 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share155631164960202355/dir155631164994106486')
  .query({"restype":"directory"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 26 Apr 2019 20:47:30 GMT',
  'ETag',
  '"0x8D6CA8866727985"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'cf43cb32-701a-0013-5671-fca8b9000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 26 Apr 2019 20:47:30 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share155631164960202355')
  .query({"restype":"share"})
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3102b150-001a-0053-6a71-fc8157000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 26 Apr 2019 20:47:30 GMT',
  'Connection',
  'close' ]);

