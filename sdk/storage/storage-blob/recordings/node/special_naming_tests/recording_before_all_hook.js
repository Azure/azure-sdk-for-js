let nock = require('nock');

module.exports.testInfo = {"1container-with-dash":"1container-with-dash156599429530306867"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1container-with-dash156599429530306867')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 16 Aug 2019 22:24:55 GMT',
  'ETag',
  '"0x8D7229890C578B7"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f48b1b55-201e-007d-3d81-54e659000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Fri, 16 Aug 2019 22:24:55 GMT',
  'Connection',
  'close' ]);

