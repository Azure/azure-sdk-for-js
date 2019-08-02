let nock = require('nock');

module.exports.testInfo = {"container":"container156404669067508852"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156404669067508852')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 25 Jul 2019 09:21:12 GMT',
  'ETag',
  '"0x8D710E1700822AB"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f23f68b1-301e-0042-05ca-421582000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Thu, 25 Jul 2019 09:21:12 GMT',
  'Connection',
  'close' ]);

