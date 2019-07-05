let nock = require('nock');

module.exports.testInfo = {"1container-with-dash":"1container-with-dash156231868169701661"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1container-with-dash156231868169701661')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:21:22 GMT',
  'ETag',
  '"0x8D7012A25848388"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4eb1f860-501e-00bc-2313-3329e7000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Fri, 05 Jul 2019 09:21:21 GMT',
  'Connection',
  'close' ]);

