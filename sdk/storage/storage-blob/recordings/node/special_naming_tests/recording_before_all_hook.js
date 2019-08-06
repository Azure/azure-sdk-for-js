let nock = require('nock');

module.exports.testInfo = {"1container-with-dash":"1container-with-dash156404684345703408"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1container-with-dash156404684345703408')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 25 Jul 2019 09:23:45 GMT',
  'ETag',
  '"0x8D710E1CAF678D5"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b2d2154a-f01e-001b-39ca-421004000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Thu, 25 Jul 2019 09:23:44 GMT',
  'Connection',
  'close' ]);

