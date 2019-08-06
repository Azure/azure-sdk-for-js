let nock = require('nock');

module.exports.testInfo = {"1share-with-dash":"1share-with-dash156404685897002385"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1share-with-dash156404685897002385')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 25 Jul 2019 09:24:01 GMT',
  'ETag',
  '"0x8D710E1D4355884"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'fd6ff7e4-501a-00f3-6cca-42edff000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Thu, 25 Jul 2019 09:24:00 GMT',
  'Connection',
  'close' ]);

