let nock = require('nock');

module.exports.testInfo = {"1share-with-dash":"1share-with-dash156599452216203149"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1share-with-dash156599452216203149')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 16 Aug 2019 22:28:42 GMT',
  'ETag',
  '"0x8D7229917FCC4B4"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8583dfb7-501a-0014-7d81-54b9f5000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Fri, 16 Aug 2019 22:28:41 GMT',
  'Connection',
  'close' ]);

