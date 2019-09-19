let nock = require('nock');

module.exports.testInfo = {"1share-with-dash":"1share-with-dash156775332696806178"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1share-with-dash156775332696806178')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 07:02:07 GMT',
  'ETag',
  '"0x8D73298215D1971"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6cc16cfb-001a-0157-2c80-64a7bd000000',
  'x-ms-client-request-id',
  '8269e674-0303-481f-a541-995763e66d96',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 07:02:06 GMT',
  'Connection',
  'close' ]);

