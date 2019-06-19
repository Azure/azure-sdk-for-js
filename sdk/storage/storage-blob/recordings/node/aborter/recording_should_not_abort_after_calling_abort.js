let nock = require('nock');

module.exports.testInfo = {"container":"container156058635900405754"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156058635900405754')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Sat, 15 Jun 2019 08:12:41 GMT',
  'ETag',
  '"0x8D6F1693CEA3017"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8d4f2e18-601e-00d0-8052-23c633000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Sat, 15 Jun 2019 08:12:41 GMT',
  'Connection',
  'close' ]);

