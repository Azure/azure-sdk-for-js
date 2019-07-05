let nock = require('nock');

module.exports.testInfo = {"container":"container156231853180809040"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156231853180809040')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:18:52 GMT',
  'ETag',
  '"0x8D70129CC4C0A4C"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b095eb63-501e-001d-0c12-33e77c000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Fri, 05 Jul 2019 09:18:52 GMT',
  'Connection',
  'close' ]);

