let nock = require('nock');

module.exports.hash = "70b8f4226da6556dbebcefbdb4064498";

module.exports.testInfo = {"uniqueName":{"container":"container159049021000203886","blob":"blob159049021030405476"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159049021000203886')
  .query(true)
  .reply(201, "", [ 'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 26 May 2020 10:50:10 GMT',
  'ETag',
  '"0x8D801628FA660F9"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1abc440e-101e-000c-544b-3321fe000000',
  'x-ms-client-request-id',
  'b4fd15a8-a9d4-4c39-b4c9-470ff29d060d',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Tue, 26 May 2020 10:50:09 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159049021000203886/blob159049021030405476', "Hello World")
  .reply(201, "", [ 'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Tue, 26 May 2020 10:50:10 GMT',
  'ETag',
  '"0x8D801628FD4C7DF"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1abc4410-101e-000c-554b-3321fe000000',
  'x-ms-client-request-id',
  '32720e51-f5e8-4dbf-974f-7c7032388c1e',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 26 May 2020 10:50:09 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159049021000203886')
  .query(true)
  .reply(202, "", [ 'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1abc4411-101e-000c-564b-3321fe000000',
  'x-ms-client-request-id',
  'fb170e2c-ef6a-49ab-a830-a4a26aebbcc3',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Tue, 26 May 2020 10:50:10 GMT' ]);
