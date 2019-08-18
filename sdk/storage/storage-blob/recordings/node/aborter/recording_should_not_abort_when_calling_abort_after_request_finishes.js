let nock = require('nock');

module.exports.testInfo = {"container":"container156599408965608974"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156599408965608974')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 16 Aug 2019 22:21:29 GMT',
  'ETag',
  '"0x8D7229816320E91"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c33f7bd0-501e-0072-6280-540baf000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Fri, 16 Aug 2019 22:21:29 GMT',
  'Connection',
  'close' ]);

