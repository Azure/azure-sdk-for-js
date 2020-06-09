let nock = require('nock');

module.exports.hash = "9fa6b4b0cffd24ba43af3867c4547ad6";

module.exports.testInfo = {"uniqueName":{"container":"container159049020812502198","blob":"blob159049020846207708"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159049020812502198')
  .query(true)
  .reply(201, "", [ 'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 26 May 2020 10:50:08 GMT',
  'ETag',
  '"0x8D801628E881292"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1abc4405-101e-000c-4e4b-3321fe000000',
  'x-ms-client-request-id',
  '87e35f42-6c44-44e1-9dce-a7880229747a',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Tue, 26 May 2020 10:50:07 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159049020812502198/blob159049020846207708', "Hello World")
  .reply(201, "", [ 'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Tue, 26 May 2020 10:50:08 GMT',
  'ETag',
  '"0x8D801628EBB5CDE"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1abc4407-101e-000c-4f4b-3321fe000000',
  'x-ms-client-request-id',
  'fdea3e39-5f7b-4d3a-8224-db0c21c046c6',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 26 May 2020 10:50:08 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159049020812502198')
  .query(true)
  .reply(202, "", [ 'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1abc4408-101e-000c-504b-3321fe000000',
  'x-ms-client-request-id',
  '8907ba07-dd16-4215-b804-df32904dc08b',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Tue, 26 May 2020 10:50:08 GMT' ]);
