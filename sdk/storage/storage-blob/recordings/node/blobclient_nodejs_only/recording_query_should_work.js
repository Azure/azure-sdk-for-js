let nock = require('nock');

module.exports.hash = "b15cda823b3c55e24298837de650620e";

module.exports.testInfo = {"uniqueName":{"container":"container159049020245804719","blob":"blob159049020444905391"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159049020245804719')
  .query(true)
  .reply(201, "", [ 'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 26 May 2020 10:50:04 GMT',
  'ETag',
  '"0x8D801628C2B64CF"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1abc43f1-101e-000c-424b-3321fe000000',
  'x-ms-client-request-id',
  '3e11d2ab-1a6f-4b8f-8c69-e072dcdf0dc8',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Tue, 26 May 2020 10:50:03 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159049020245804719/blob159049020444905391', "Hello World")
  .reply(201, "", [ 'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Tue, 26 May 2020 10:50:04 GMT',
  'ETag',
  '"0x8D801628C58465E"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1abc43f4-101e-000c-434b-3321fe000000',
  'x-ms-client-request-id',
  '463390ef-7745-4351-a496-80ee2e8534b9',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 26 May 2020 10:50:04 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159049020245804719')
  .query(true)
  .reply(202, "", [ 'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1abc43f6-101e-000c-444b-3321fe000000',
  'x-ms-client-request-id',
  '6a16e255-713e-4358-a91b-514c044c7a56',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Tue, 26 May 2020 10:50:04 GMT' ]);
