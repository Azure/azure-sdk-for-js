let nock = require('nock');

module.exports.hash = "8a0c2d5fbf6f1d5b0f8147a26e784795";

module.exports.testInfo = {"uniqueName":{"container":"container159049021092104171","blob":"blob159049021119406322"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159049021092104171')
  .query(true)
  .reply(201, "", [ 'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 26 May 2020 10:50:11 GMT',
  'ETag',
  '"0x8D8016290328DE9"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1abc4412-101e-000c-574b-3321fe000000',
  'x-ms-client-request-id',
  '2db43313-3255-490a-a1dd-d9e32d7b23d6',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Tue, 26 May 2020 10:50:10 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159049021092104171/blob159049021119406322', "Hello World")
  .reply(201, "", [ 'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Tue, 26 May 2020 10:50:11 GMT',
  'ETag',
  '"0x8D80162905C5FDD"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1abc4415-101e-000c-584b-3321fe000000',
  'x-ms-client-request-id',
  '7ef7505d-cd8e-4e86-a350-4775105f82b3',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 26 May 2020 10:50:10 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159049021092104171')
  .query(true)
  .reply(202, "", [ 'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1abc441a-101e-000c-5d4b-3321fe000000',
  'x-ms-client-request-id',
  '2b9441d3-d5c6-4776-8aa6-d8fd8f52b1d4',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Tue, 26 May 2020 10:50:10 GMT' ]);
