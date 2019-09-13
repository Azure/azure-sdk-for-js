let nock = require('nock');

module.exports.testInfo = {"1container-with-dash":"1container-with-dash156776207192807442"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1container-with-dash156776207192807442')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 09:27:52 GMT',
  'ETag',
  '"0x8D732AC7DC7D2E2"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c3977ed5-001e-0048-3c95-64eab4000000',
  'x-ms-client-request-id',
  '43e7b9e2-b2c4-411b-99b3-25d272bdce94',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 09:27:51 GMT',
  'Connection',
  'close' ]);

