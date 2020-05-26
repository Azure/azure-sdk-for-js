let nock = require('nock');

module.exports.hash = "e1455a2b0a5b90c635259b595020e8ad";

module.exports.testInfo = {"uniqueName":{"container":"container159049020904409655","blob":"blob159049020931607154"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159049020904409655')
  .query(true)
  .reply(201, "", [ 'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 26 May 2020 10:50:09 GMT',
  'ETag',
  '"0x8D801628F143F82"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1abc4409-101e-000c-514b-3321fe000000',
  'x-ms-client-request-id',
  'd0949da6-1973-4501-9474-fa90a511b293',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Tue, 26 May 2020 10:50:08 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159049020904409655/blob159049020931607154', "Hello World")
  .reply(201, "", [ 'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Tue, 26 May 2020 10:50:09 GMT',
  'ETag',
  '"0x8D801628F3E11F6"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1abc440b-101e-000c-524b-3321fe000000',
  'x-ms-client-request-id',
  '6ee721f2-34e6-41bb-89e7-c47d9647ccba',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 26 May 2020 10:50:08 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159049020904409655')
  .query(true)
  .reply(202, "", [ 'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1abc440c-101e-000c-534b-3321fe000000',
  'x-ms-client-request-id',
  '826fbcca-21d7-41f1-8cd8-6229c2d4be2f',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Tue, 26 May 2020 10:50:09 GMT' ]);
