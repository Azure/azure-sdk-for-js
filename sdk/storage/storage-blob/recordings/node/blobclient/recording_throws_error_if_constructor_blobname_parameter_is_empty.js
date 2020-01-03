let nock = require('nock');

module.exports.testInfo = {"container":"container156816832928309354","blob":"blob156816832970700736"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156816832928309354')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:18:49 GMT',
  'ETag',
  '"0x8D7365E621139EF"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e437ea25-401e-003e-5d47-68d0dd000000',
  'x-ms-client-request-id',
  'd5e49a75-a331-45fa-8cdc-36555cd80773',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:18:49 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156816832928309354/blob156816832970700736', "Hello World")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:18:50 GMT',
  'ETag',
  '"0x8D7365E6251DBFD"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e437eaaf-401e-003e-6247-68d0dd000000',
  'x-ms-client-request-id',
  'd79a4b37-01a3-427a-87b4-c18379241f35',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 11 Sep 2019 02:18:49 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156816832928309354')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b94347ca-001e-0039-7947-682658000000',
  'x-ms-client-request-id',
  '6f9f40e7-2b9a-49a9-8d6c-1823ab4eb7a0',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:18:50 GMT' ]);

