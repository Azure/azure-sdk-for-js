let nock = require('nock');

module.exports.testInfo = {"share":"share155613590999504685"}

nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share155613590999504685')
  .query({"restype":"share"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 24 Apr 2019 19:58:30 GMT',
  'ETag',
  '"0x8D6C8EF39454A04"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ad099811-101a-002a-62d8-fae81d000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Wed, 24 Apr 2019 19:58:29 GMT',
  'Connection',
  'close' ]);
