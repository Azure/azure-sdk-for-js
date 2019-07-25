let nock = require('nock');

module.exports.testInfo = {"share":"share156404667695101303"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156404667695101303')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 25 Jul 2019 09:20:58 GMT',
  'ETag',
  '"0x8D710E167B78A35"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '628e9c1b-a01a-0125-0fca-42e070000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Thu, 25 Jul 2019 09:20:58 GMT',
  'Connection',
  'close' ]);

