let nock = require('nock');

module.exports.testInfo = {"container":"container156816872690502275","blob":"blob156816872732409623"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156816872690502275')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:25:27 GMT',
  'ETag',
  '"0x8D7365F4F10FBC0"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a9ada6d8-a01e-0016-3c48-68a762000000',
  'x-ms-client-request-id',
  '50d85c74-0f87-4d4c-af1c-e71c0c07f563',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:25:26 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156816872690502275')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'fd56670e-801e-0045-2948-68bb6d000000',
  'x-ms-client-request-id',
  '5073c579-a6fd-4cec-90ea-9255044fbc46',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:25:27 GMT' ]);

