let nock = require('nock');

module.exports.testInfo = {"container":"container156816828413101995","blob":"blob156816828457206994"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156816828413101995')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:18:04 GMT',
  'ETag',
  '"0x8D7365E47272503"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9a009474-701e-005b-3e47-686180000000',
  'x-ms-client-request-id',
  '7dc994b6-3fa7-444a-9bd4-430da8370ea6',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:18:04 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156816828413101995')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '96e1c2fa-201e-0061-2447-682223000000',
  'x-ms-client-request-id',
  '1144b75a-f423-4513-a986-d78492f5f868',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:18:03 GMT' ]);

