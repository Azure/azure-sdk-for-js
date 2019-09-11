let nock = require('nock');

module.exports.testInfo = {"container":"container156816827604905460"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156816827604905460')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:17:56 GMT',
  'ETag',
  '"0x8D7365E4255FDCE"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '53c1c81c-f01e-002c-2847-68e4c1000000',
  'x-ms-client-request-id',
  'efbe414d-375c-4297-8499-5fcac85a3e7e',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:17:56 GMT' ]);

