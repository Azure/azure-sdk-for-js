let nock = require('nock');

module.exports.testInfo = {"1container-with-dash":"1container-with-dash156058666873503521"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1container-with-dash156058666873503521')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Sat, 15 Jun 2019 08:17:48 GMT',
  'ETag',
  '"0x8D6F169F3C6CDC0"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '746cd7e1-101e-0090-7252-23efdd000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Sat, 15 Jun 2019 08:17:47 GMT',
  'Connection',
  'close' ]);

