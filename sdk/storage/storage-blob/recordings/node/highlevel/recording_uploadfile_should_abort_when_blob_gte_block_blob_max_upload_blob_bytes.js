let nock = require('nock');

module.exports.testInfo = {"container":"container156711963442508709","blob":"blob156711963472509684"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156711963442508709')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 29 Aug 2019 23:00:34 GMT',
  'ETag',
  '"0x8D72CD4B3261BE6"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '622004b5-601e-0058-33bd-5e7eea000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Thu, 29 Aug 2019 23:00:33 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156711963442508709')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c40bc3b5-e01e-00a7-53bd-5e4372000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Thu, 29 Aug 2019 23:00:34 GMT',
  'Connection',
  'close' ]);

