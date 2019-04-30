let nock = require('nock');

module.exports.testInfo = {"share":"share155631164799605156","dir":"dir155631164857903442","file":"file155631164894108493"}

nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share155631164799605156')
  .query({"restype":"share"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 26 Apr 2019 20:47:28 GMT',
  'ETag',
  '"0x8D6CA88655584AE"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a9096130-601a-002e-4b71-fc1d9f000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 26 Apr 2019 20:47:28 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share155631164799605156/dir155631164857903442')
  .query({"restype":"directory"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 26 Apr 2019 20:47:28 GMT',
  'ETag',
  '"0x8D6CA88659BF029"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '408346bd-f01a-0009-2a71-fc87d6000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 26 Apr 2019 20:47:28 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share155631164799605156')
  .query({"restype":"share"})
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '50b01dfe-f01a-0020-5171-fcf194000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 26 Apr 2019 20:47:28 GMT',
  'Connection',
  'close' ]);

