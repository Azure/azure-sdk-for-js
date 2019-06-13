let nock = require('nock');

module.exports.testInfo = {"1share-with-dash":"1share-with-dash156044277273507696"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1share-with-dash156044277273507696')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 13 Jun 2019 09:19:17 GMT',
  'ETag',
  '"0x8D6EFE035F858EE"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '07984a00-501a-001f-57c9-21a181000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Thu, 13 Jun 2019 09:19:16 GMT',
  'Connection',
  'close' ]);

