let nock = require('nock');

module.exports.testInfo = {"1container-with-dash":"1container-with-dash156150799480401154"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1container-with-dash156150799480401154')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 26 Jun 2019 00:13:15 GMT',
  'ETag',
  '"0x8D6F9CB154BDB15"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b90e97a0-301e-008c-50b3-2b37ca000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Wed, 26 Jun 2019 00:13:14 GMT',
  'Connection',
  'close' ]);

