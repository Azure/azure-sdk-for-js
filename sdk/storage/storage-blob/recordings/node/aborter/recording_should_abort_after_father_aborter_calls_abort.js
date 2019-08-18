let nock = require('nock');

module.exports.testInfo = {"container":"container156599408998904680"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156599408998904680')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 16 Aug 2019 22:21:30 GMT',
  'ETag',
  '"0x8D72298166554B9"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c00df9f3-701e-00a2-7880-54b70d000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Fri, 16 Aug 2019 22:21:29 GMT',
  'Connection',
  'close' ]);

