let nock = require('nock');

module.exports.testInfo = {"share":"share156599411655707990"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156599411655707990')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 16 Aug 2019 22:21:58 GMT',
  'ETag',
  '"0x8D7229827143F68"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '983fe020-501a-00d8-0681-54dd40000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Fri, 16 Aug 2019 22:21:58 GMT',
  'Connection',
  'close' ]);

