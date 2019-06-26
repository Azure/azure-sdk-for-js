let nock = require('nock');

module.exports.testInfo = {"container":"container156150780663707432"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156150780663707432')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 26 Jun 2019 00:10:06 GMT',
  'ETag',
  '"0x8D6F9CAA524F90C"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f2985df6-301e-004b-32b3-2b4b0b000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Wed, 26 Jun 2019 00:10:06 GMT',
  'Connection',
  'close' ]);

