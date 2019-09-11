let nock = require('nock');

module.exports.testInfo = {"container":"container156816828753104012"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156816828753104012')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:18:07 GMT',
  'ETag',
  '"0x8D7365E492E1321"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4090d3d5-f01e-0027-4d47-68fcb5000000',
  'x-ms-client-request-id',
  '1055529f-011d-488f-a50a-d4913aea9f0e',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:18:07 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156816828753104012')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a9abd24b-a01e-0016-3447-68a762000000',
  'x-ms-client-request-id',
  'a26f38c1-6133-4c36-9d74-a789c2dff68f',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:18:08 GMT' ]);

