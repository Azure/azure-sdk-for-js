let nock = require('nock');

module.exports.testInfo = {"container":"container156231853232104900"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156231853232104900')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:18:53 GMT',
  'ETag',
  '"0x8D70129CC7A6754"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '81350fd9-001e-0063-3512-3378b3000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Fri, 05 Jul 2019 09:18:52 GMT',
  'Connection',
  'close' ]);

