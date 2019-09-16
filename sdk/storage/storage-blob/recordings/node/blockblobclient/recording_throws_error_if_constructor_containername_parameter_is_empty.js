let nock = require('nock');

module.exports.testInfo = {"container":"container156816839240903912","blob":"blob156816839282902713"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156816839240903912')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:19:52 GMT',
  'ETag',
  '"0x8D7365E87B1723B"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8b503ab7-b01e-0002-1d47-686406000000',
  'x-ms-client-request-id',
  'fa4a6e91-fa6a-467c-8863-09c9e81958f8',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:19:51 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156816839240903912')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f9941b74-201e-0025-6b47-68fe4f000000',
  'x-ms-client-request-id',
  '37750440-6b29-4de7-889b-e3af76ee9efb',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:19:52 GMT' ]);

