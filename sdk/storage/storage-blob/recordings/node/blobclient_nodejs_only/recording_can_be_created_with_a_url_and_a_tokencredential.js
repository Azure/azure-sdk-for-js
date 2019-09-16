let nock = require('nock');

module.exports.testInfo = {"container":"container156816864500506778","blob":"blob156816864542001630"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156816864500506778')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:24:05 GMT',
  'ETag',
  '"0x8D7365F1E3FAFA1"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f40c030e-a01e-001d-1947-68bf16000000',
  'x-ms-client-request-id',
  'ae15e83d-96b6-4c8c-8200-d6b040ffdb79',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:24:04 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156816864500506778/blob156816864542001630', "Hello World")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:24:05 GMT',
  'ETag',
  '"0x8D7365F1E7F5048"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '155c0402-c01e-0006-5447-689184000000',
  'x-ms-client-request-id',
  '27c524ce-5d01-44fb-9756-a6792b50c957',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 11 Sep 2019 02:24:04 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156816864500506778')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd9734122-501e-004c-6747-68a1e3000000',
  'x-ms-client-request-id',
  '736aadd6-9414-4ea4-a74c-6d0282acbc63',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:24:05 GMT' ]);

