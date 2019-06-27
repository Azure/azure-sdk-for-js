let nock = require('nock');

module.exports.testInfo = {"share":"share156150541781105471"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156150541781105471')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 25 Jun 2019 23:30:19 GMT',
  'ETag',
  '"0x8D6F9C5160C2833"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4559d57f-d01a-000e-7fad-2b969a000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 25 Jun 2019 23:30:19 GMT',
  'Connection',
  'close' ]);

