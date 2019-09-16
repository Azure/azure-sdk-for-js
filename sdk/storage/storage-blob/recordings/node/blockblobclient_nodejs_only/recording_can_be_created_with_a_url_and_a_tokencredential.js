let nock = require('nock');

module.exports.testInfo = {"container":"container156816865895304708","blob":"blob156816865937200387"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156816865895304708')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:24:19 GMT',
  'ETag',
  '"0x8D7365F2690494C"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd53b5f6f-001e-0032-8048-683e2c000000',
  'x-ms-client-request-id',
  'fb1f6259-c899-4af6-926c-dfa98812d340',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:24:18 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156816865895304708')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '82b7a8c4-d01e-005d-0748-6896f8000000',
  'x-ms-client-request-id',
  '0e925cb2-811e-424e-886b-ec857b4babed',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:24:19 GMT' ]);

