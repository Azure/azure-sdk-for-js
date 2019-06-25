let nock = require('nock');

module.exports.testInfo = {"1share-with-dash":"1share-with-dash156150566185403878"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1share-with-dash156150566185403878')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 25 Jun 2019 23:34:22 GMT',
  'ETag',
  '"0x8D6F9C5A6BF5865"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5f14657b-401a-0083-50ae-2bda3c000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 25 Jun 2019 23:34:21 GMT',
  'Connection',
  'close' ]);

