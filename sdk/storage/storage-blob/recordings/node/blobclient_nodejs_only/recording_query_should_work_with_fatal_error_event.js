let nock = require('nock');

module.exports.hash = "47d65e9ec5bdaa1fcb744c9fe2908c22";

module.exports.testInfo = {"uniqueName":{"container":"container159049021461101822","blob":"blob159049021491407229"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159049021461101822')
  .query(true)
  .reply(201, "", [ 'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 26 May 2020 10:50:14 GMT',
  'ETag',
  '"0x8D8016292658C0A"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1abc4428-101e-000c-674b-3321fe000000',
  'x-ms-client-request-id',
  '43c8cc19-c939-46c7-b515-bbe586e28c57',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Tue, 26 May 2020 10:50:14 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159049021461101822/blob159049021491407229', "Hello World")
  .reply(201, "", [ 'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Tue, 26 May 2020 10:50:15 GMT',
  'ETag',
  '"0x8D801629293F1B9"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1abc442b-101e-000c-684b-3321fe000000',
  'x-ms-client-request-id',
  'ce2eec59-39e9-40dc-a801-f5c4b04c251f',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 26 May 2020 10:50:14 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159049021461101822')
  .query(true)
  .reply(202, "", [ 'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1abc442c-101e-000c-694b-3321fe000000',
  'x-ms-client-request-id',
  'c1aee181-8417-46dc-9d91-c1bd009ef136',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Tue, 26 May 2020 10:50:15 GMT' ]);
