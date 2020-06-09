let nock = require('nock');

module.exports.hash = "b9b98d2d88adaa863394f90d3f62a4a2";

module.exports.testInfo = {"uniqueName":{"container":"container159049021368504809","blob":"blob159049021399100385"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159049021368504809')
  .query(true)
  .reply(201, "", [ 'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 26 May 2020 10:50:13 GMT',
  'ETag',
  '"0x8D8016291D84D74"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1abc4424-101e-000c-644b-3321fe000000',
  'x-ms-client-request-id',
  'ed28d154-752e-4375-9dce-59adfbb20cea',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Tue, 26 May 2020 10:50:13 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159049021368504809/blob159049021399100385', "Hello World")
  .reply(201, "", [ 'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Tue, 26 May 2020 10:50:14 GMT',
  'ETag',
  '"0x8D80162920728A7"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1abc4426-101e-000c-654b-3321fe000000',
  'x-ms-client-request-id',
  'd97c5bdb-2072-453d-8ef8-f535c541da65',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 26 May 2020 10:50:14 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159049021368504809')
  .query(true)
  .reply(202, "", [ 'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1abc4427-101e-000c-664b-3321fe000000',
  'x-ms-client-request-id',
  '123a03fa-22cd-4b9a-82b6-da84c0279b74',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Tue, 26 May 2020 10:50:14 GMT' ]);
