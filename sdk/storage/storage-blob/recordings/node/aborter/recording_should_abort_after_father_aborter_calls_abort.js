let nock = require('nock');

module.exports.testInfo = {"container":"container156816827650207422"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156816827650207422')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:17:56 GMT',
  'ETag',
  '"0x8D7365E429A1332"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '816c911c-c01e-006b-4a47-683baa000000',
  'x-ms-client-request-id',
  '215d2349-19d7-436e-88ec-4c50ab8a211c',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:17:56 GMT' ]);

