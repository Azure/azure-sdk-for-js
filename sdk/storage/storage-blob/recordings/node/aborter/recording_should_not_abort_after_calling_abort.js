let nock = require('nock');

module.exports.testInfo = {"container":"container156599408915609483"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156599408915609483')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 16 Aug 2019 22:21:29 GMT',
  'ETag',
  '"0x8D7229815FD0AEB"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b1383074-601e-0053-7480-54669e000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Fri, 16 Aug 2019 22:21:29 GMT',
  'Connection',
  'close' ]);

