let nock = require('nock');

module.exports.testInfo = {"share":"share156767533777805764"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156767533777805764')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 05 Sep 2019 09:22:18 GMT',
  'ETag',
  '"0x8D731E28C318F60"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '88b59bbe-801a-0046-6acb-63c304000000',
  'x-ms-client-request-id',
  '4c366ba1-f759-4e79-89c4-1a4c69671a2d',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 05 Sep 2019 09:22:17 GMT',
  'Connection',
  'close' ]);

