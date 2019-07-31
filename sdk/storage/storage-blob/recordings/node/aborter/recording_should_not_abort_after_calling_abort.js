let nock = require('nock');

module.exports.testInfo = {"container":"container156150780604806987"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156150780604806987')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 26 Jun 2019 00:10:06 GMT',
  'ETag',
  '"0x8D6F9CAA4E43436"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c9533ba5-501e-00b5-10b3-2b776e000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Wed, 26 Jun 2019 00:10:05 GMT',
  'Connection',
  'close' ]);

