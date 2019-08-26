let nock = require('nock');

module.exports.testInfo = {"container":"container156585804262302900"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156585804262302900')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 15 Aug 2019 08:30:04 GMT',
  'ETag',
  '"0x8D7215AC5CE732A"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'fe1b47de-701e-00a0-4843-53f1f0000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Thu, 15 Aug 2019 08:30:04 GMT',
  'Connection',
  'close'
]);

