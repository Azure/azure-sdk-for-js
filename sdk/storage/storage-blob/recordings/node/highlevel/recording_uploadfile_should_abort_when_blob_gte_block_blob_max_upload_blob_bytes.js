let nock = require('nock');

module.exports.testInfo = {"container":"container156816867628103858","blob":"blob156816867671109212"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156816867628103858')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:24:36 GMT',
  'ETag',
  '"0x8D7365F30E63B5B"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '018b0f0b-d01e-0019-7148-684a94000000',
  'x-ms-client-request-id',
  '3256d358-0736-4769-96fd-b1eda50cecdb',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:24:36 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156816867628103858')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1ab5f260-a01e-003f-1048-68d120000000',
  'x-ms-client-request-id',
  'f99c3402-f7e6-441e-bb2c-8856d9eac9d2',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:24:36 GMT' ]);

