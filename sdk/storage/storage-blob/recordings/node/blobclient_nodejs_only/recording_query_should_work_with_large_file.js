let nock = require('nock');

module.exports.hash = "287ce57afa2ca683639ffe149024b36f";

module.exports.testInfo = {"uniqueName":{"container":"container159049021180905322","blob":"blob159049021214800367"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159049021180905322')
  .query(true)
  .reply(201, "", [ 'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 26 May 2020 10:50:11 GMT',
  'ETag',
  '"0x8D8016290B9FF0D"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1abc441b-101e-000c-5e4b-3321fe000000',
  'x-ms-client-request-id',
  '6b414e74-84d3-4442-9307-12df0cd21261',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Tue, 26 May 2020 10:50:11 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159049021180905322/blob159049021214800367', "Hello World")
  .reply(201, "", [ 'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Tue, 26 May 2020 10:50:12 GMT',
  'ETag',
  '"0x8D8016290EE0BCC"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1abc441d-101e-000c-5f4b-3321fe000000',
  'x-ms-client-request-id',
  '0885e6eb-9a93-40c5-ae01-66b9cddbc98c',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 26 May 2020 10:50:11 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159049021180905322')
  .query(true)
  .reply(202, "", [ 'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1abc441f-101e-000c-604b-3321fe000000',
  'x-ms-client-request-id',
  'a829abf7-d4fd-458b-8550-b2048199004e',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Tue, 26 May 2020 10:50:11 GMT' ]);
