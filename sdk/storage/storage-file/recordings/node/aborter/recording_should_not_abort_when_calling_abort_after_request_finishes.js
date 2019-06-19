let nock = require('nock');

module.exports.testInfo = {"share":"share156044249615306731"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156044249615306731')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 13 Jun 2019 09:14:41 GMT',
  'ETag',
  '"0x8D6EFDF9176E0E5"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'fa110125-001a-0061-16c8-213e4e000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Thu, 13 Jun 2019 09:14:41 GMT',
  'Connection',
  'close' ]);

