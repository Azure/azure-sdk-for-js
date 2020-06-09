let nock = require('nock');

module.exports.hash = "96fefb99c10994e85cd42d9cabfa032c";

module.exports.testInfo = {"uniqueName":{"container":"container159049020501200734","blob":"blob159049020528500202"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159049020501200734')
  .query(true)
  .reply(201, "", [ 'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 26 May 2020 10:50:05 GMT',
  'ETag',
  '"0x8D801628CACE171"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1abc43f7-101e-000c-454b-3321fe000000',
  'x-ms-client-request-id',
  '19fa1705-8ee5-4a18-8d95-7607f1c830f0',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Tue, 26 May 2020 10:50:04 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159049020501200734/blob159049020528500202', "Hello World")
  .reply(201, "", [ 'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Tue, 26 May 2020 10:50:05 GMT',
  'ETag',
  '"0x8D801628CD6B4F4"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1abc43f9-101e-000c-464b-3321fe000000',
  'x-ms-client-request-id',
  '454eb1f6-660a-4559-838b-49dead83fff0',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 26 May 2020 10:50:05 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159049020501200734')
  .query(true)
  .reply(202, "", [ 'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1abc43fa-101e-000c-474b-3321fe000000',
  'x-ms-client-request-id',
  '959877c7-f652-4648-a15b-a6430ce10b18',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Tue, 26 May 2020 10:50:05 GMT' ]);
