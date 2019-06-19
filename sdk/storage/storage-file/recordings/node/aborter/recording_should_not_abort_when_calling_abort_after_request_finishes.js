let nock = require('nock');

module.exports.testInfo = {"share":"share156093646125503817"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156093646125503817')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 19 Jun 2019 09:24:39 GMT',
  'ETag',
  '"0x8D6F497F464C132"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2b91305e-401a-00a3-6b80-26f2f7000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Wed, 19 Jun 2019 09:24:39 GMT',
  'Connection',
  'close' ]);

