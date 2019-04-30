let nock = require('nock');

module.exports.testInfo = {"share":"share155631222699808091","dir":"dir155631222737606693","file":"file155631222774306848"}

nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share155631222699808091')
  .query({"restype":"share"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 26 Apr 2019 20:57:07 GMT',
  'ETag',
  '"0x8D6CA89BE64170E"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '037287b4-e01a-003f-2b72-fc2a84000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 26 Apr 2019 20:57:07 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share155631222699808091/dir155631222737606693')
  .query({"restype":"directory"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 26 Apr 2019 20:57:07 GMT',
  'ETag',
  '"0x8D6CA89BE98503E"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f6e44712-a01a-0092-0172-fc0aee000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 26 Apr 2019 20:57:06 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share155631222699808091')
  .query({"restype":"share"})
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8de291e2-401a-0010-6672-fcabbe000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 26 Apr 2019 20:57:08 GMT',
  'Connection',
  'close' ]);

