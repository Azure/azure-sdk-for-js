let nock = require('nock');

module.exports.testInfo = {"container":"container156404669119206250"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156404669119206250')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 25 Jul 2019 09:21:13 GMT',
  'ETag',
  '"0x8D710E17036AC44"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6e79c7c9-501e-013b-2dca-423a9d000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Thu, 25 Jul 2019 09:21:12 GMT',
  'Connection',
  'close' ]);

