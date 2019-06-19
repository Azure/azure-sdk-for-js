let nock = require('nock');

module.exports.testInfo = {"dir empty":"dir empty156044277299500239","file empty":"file empty156044277342002759"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1share-with-dash156044277273507696/dir%20empty156044277299500239')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 13 Jun 2019 09:19:18 GMT',
  'ETag',
  '"0x8D6EFE036398AA0"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '73917ef5-a01a-0082-21c9-21dbc1000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 13 Jun 2019 09:19:18 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1share-with-dash156044277273507696/dir%20empty156044277299500239/file%20empty156044277342002759')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 13 Jun 2019 09:19:18 GMT',
  'ETag',
  '"0x8D6EFE03662286C"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2dc7c055-b01a-001e-72c9-21a07c000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 13 Jun 2019 09:19:17 GMT',
  'Connection',
  'close' ]);

