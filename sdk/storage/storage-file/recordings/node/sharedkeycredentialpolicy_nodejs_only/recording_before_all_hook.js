let nock = require('nock');

module.exports.testInfo = {"1share-with-dash":"1share-with-dash155873397482109857"}

nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1share-with-dash155873397482109857')
  .query({"restype":"share"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 24 May 2019 21:39:34 GMT',
  'ETag',
  '"0x8D6E0905064A2E8"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9a091fb9-201a-0029-1779-12eb1a000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 24 May 2019 21:39:34 GMT',
  'Connection',
  'close' ]);

