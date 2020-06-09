let nock = require('nock');

module.exports.hash = "f0edc0e711ff5ae5f1607685a9fb6a14";

module.exports.testInfo = {"uniqueName":{"container":"container159049021552904014","blob":"blob159049021613506786"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159049021552904014')
  .query(true)
  .reply(201, "", [ 'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 26 May 2020 10:50:15 GMT',
  'ETag',
  '"0x8D8016292F191DF"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1abc442d-101e-000c-6a4b-3321fe000000',
  'x-ms-client-request-id',
  'a3249b89-a823-4be2-b04d-e384942336d3',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Tue, 26 May 2020 10:50:15 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159049021552904014/blob159049021613506786', "Hello World")
  .reply(201, "", [ 'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Tue, 26 May 2020 10:50:16 GMT',
  'ETag',
  '"0x8D80162934E62B2"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1abc4430-101e-000c-6b4b-3321fe000000',
  'x-ms-client-request-id',
  '375c202b-6210-4766-a0dc-62b6fa9cfc33',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 26 May 2020 10:50:15 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159049021552904014')
  .query(true)
  .reply(202, "", [ 'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1abc4431-101e-000c-6c4b-3321fe000000',
  'x-ms-client-request-id',
  '437212b5-c10f-4bc0-9dc5-cfe38a80f109',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Tue, 26 May 2020 10:50:16 GMT' ]);
