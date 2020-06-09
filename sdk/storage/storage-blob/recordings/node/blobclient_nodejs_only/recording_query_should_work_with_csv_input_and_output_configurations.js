let nock = require('nock');

module.exports.hash = "e040650f63a5e8c56babaa30c78ad498";

module.exports.testInfo = {"uniqueName":{"container":"container159049021675907732","blob":"blob159049021703108035"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159049021675907732')
  .query(true)
  .reply(201, "", [ 'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 26 May 2020 10:50:16 GMT',
  'ETag',
  '"0x8D8016293AD3BE9"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1abc4432-101e-000c-6d4b-3321fe000000',
  'x-ms-client-request-id',
  'd4c5bfcf-fe11-4814-979b-a7935de0bf46',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Tue, 26 May 2020 10:50:16 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159049021675907732/blob159049021703108035', "Hello World")
  .reply(201, "", [ 'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Tue, 26 May 2020 10:50:17 GMT',
  'ETag',
  '"0x8D8016293D70C51"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1abc4434-101e-000c-6e4b-3321fe000000',
  'x-ms-client-request-id',
  'dd58bf1e-8f3e-4ea4-a435-25ce1f415d63',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 26 May 2020 10:50:16 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159049021675907732')
  .query(true)
  .reply(202, "", [ 'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1abc4436-101e-000c-6f4b-3321fe000000',
  'x-ms-client-request-id',
  '5aa69791-9d06-47ed-b819-e866995b91af',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Tue, 26 May 2020 10:50:17 GMT' ]);
