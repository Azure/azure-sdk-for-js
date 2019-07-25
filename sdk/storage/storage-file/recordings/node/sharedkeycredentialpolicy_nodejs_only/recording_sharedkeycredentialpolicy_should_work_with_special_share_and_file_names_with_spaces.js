let nock = require('nock');

module.exports.testInfo = {"dir empty":"dir empty156404685923605826","file empty":"file empty156404685950506144"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1share-with-dash156404685897002385/dir%20empty156404685923605826')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 25 Jul 2019 09:24:01 GMT',
  'ETag',
  '"0x8D710E1D45EA678"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '71a4b8a5-101a-0077-01ca-42bbd7000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 25 Jul 2019 09:24:01 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1share-with-dash156404685897002385/dir%20empty156404685923605826/file%20empty156404685950506144')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 25 Jul 2019 09:24:01 GMT',
  'ETag',
  '"0x8D710E1D487B9C9"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bc280bd0-a01a-0021-4cca-4253a7000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 25 Jul 2019 09:24:01 GMT',
  'Connection',
  'close' ]);

