let nock = require('nock');

module.exports.testInfo = {"container":"container156816828851404971"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156816828851404971')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:18:08 GMT',
  'ETag',
  '"0x8D7365E49C4A969"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '331c6b8b-c01e-000d-6747-6889f0000000',
  'x-ms-client-request-id',
  '0d4a7de2-7711-4c46-b899-1f2f01e257b2',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:18:08 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156816828851404971')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '48480928-201e-0048-2147-685461000000',
  'x-ms-client-request-id',
  '84a8d4e9-3d86-45bd-8d11-ce1ca5faec61',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:18:09 GMT' ]);

