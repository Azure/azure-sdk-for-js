let nock = require('nock');

module.exports.testInfo = {"container":"container156816867032007442"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156816867032007442')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:24:30 GMT',
  'ETag',
  '"0x8D7365F2D56BF20"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'dd4cb21b-901e-0037-4648-68ca53000000',
  'x-ms-client-request-id',
  '2351f614-e68a-446c-a677-8f8d708f2627',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:24:30 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156816867032007442')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd2545830-501e-0003-2748-6865fb000000',
  'x-ms-client-request-id',
  '7c3868d5-4c31-45e3-aa7b-f333a4cfe064',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:24:30 GMT' ]);

