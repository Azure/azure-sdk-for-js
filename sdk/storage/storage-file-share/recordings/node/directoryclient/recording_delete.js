let nock = require('nock');

module.exports.testInfo = {"share":"share156816829319104751","dir":"dir156816829361206456"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816829319104751')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:18:13 GMT',
  'ETag',
  '"0x8D7365E4C8DB345"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3f8287cd-801a-0045-6a47-68bb6d000000',
  'x-ms-client-request-id',
  '18bad477-4864-473c-82ce-4d2156b9466b',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:18:13 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816829319104751/dir156816829361206456')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:18:13 GMT',
  'ETag',
  '"0x8D7365E4CCE3E61"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '34cc9215-601a-004f-5547-68a2e4000000',
  'x-ms-client-request-id',
  '3c398c17-143e-459d-a8ae-14867b170292',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-11T02:18:13.9625057Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:18:13.9625057Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:18:13.9625057Z',
  'x-ms-file-permission-key',
  '15292852142319295125*13609941760923454748',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 11 Sep 2019 02:18:13 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156816829319104751')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f4704f1a-f01a-000e-5a47-688af7000000',
  'x-ms-client-request-id',
  'b4a2025f-1db5-4dc3-8d59-dc6ad1fac574',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:18:14 GMT' ]);

