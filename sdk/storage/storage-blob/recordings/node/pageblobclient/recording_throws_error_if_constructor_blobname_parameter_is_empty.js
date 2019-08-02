let nock = require('nock');

module.exports.testInfo = {"container":"container156464897671403909","blob":"blob156464897700806450"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156464897671403909')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 01 Aug 2019 08:42:56 GMT',
  'ETag',
  '"0x8D7165C40688BC5"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7e075354-a01e-00a0-7e45-48b5f7000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Thu, 01 Aug 2019 08:42:55 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156464897671403909')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2b0511ad-901e-00a3-6045-48b6f0000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Thu, 01 Aug 2019 08:42:57 GMT',
  'Connection',
  'close' ]);

