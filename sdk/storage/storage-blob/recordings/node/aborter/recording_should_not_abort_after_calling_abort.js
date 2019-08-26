let nock = require('nock');

module.exports.testInfo = {"container":"container156585804213303062"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156585804213303062')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 15 Aug 2019 08:30:04 GMT',
  'ETag',
  '"0x8D7215AC59C471D"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'dc7f55fa-c01e-00b2-4943-53c5ec000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Thu, 15 Aug 2019 08:30:03 GMT',
  'Connection',
  'close'
]);

