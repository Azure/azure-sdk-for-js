let nock = require('nock');

module.exports.testInfo = {"container":"container156816827540809115"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156816827540809115')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:17:55 GMT',
  'ETag',
  '"0x8D7365E421231F5"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '25d55ac5-101e-002d-7f47-68e53c000000',
  'x-ms-client-request-id',
  '68a913b2-d2a0-4f8d-a9ed-e6db1ebdb84c',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:17:55 GMT' ]);

