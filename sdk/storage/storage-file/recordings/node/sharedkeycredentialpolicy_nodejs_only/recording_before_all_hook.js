let nock = require('nock');

module.exports.testInfo = {"1share-with-dash":"1share-with-dash156093661914809302"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1share-with-dash156093661914809302')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 19 Jun 2019 09:27:17 GMT',
  'ETag',
  '"0x8D6F49852808545"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3bdee806-501a-0119-4c81-2654ab000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Wed, 19 Jun 2019 09:27:17 GMT',
  'Connection',
  'close' ]);

