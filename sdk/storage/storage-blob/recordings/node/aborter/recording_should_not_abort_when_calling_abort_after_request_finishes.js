let nock = require('nock');

module.exports.testInfo = {"container":"container156058636251603620"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156058636251603620')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Sat, 15 Jun 2019 08:12:45 GMT',
  'ETag',
  '"0x8D6F1693F4C935B"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f1ba8a31-d01e-0068-7752-2324c0000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Sat, 15 Jun 2019 08:12:45 GMT',
  'Connection',
  'close' ]);

