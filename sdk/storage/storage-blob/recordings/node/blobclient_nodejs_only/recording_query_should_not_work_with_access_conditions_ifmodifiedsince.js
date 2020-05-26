let nock = require('nock');

module.exports.hash = "d3a5406b3267717674c01d19eb9a0cd6";

module.exports.testInfo = {"uniqueName":{"container":"container159049020600707788","blob":"blob159049020631105138"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159049020600707788')
  .query(true)
  .reply(201, "", [ 'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 26 May 2020 10:50:06 GMT',
  'ETag',
  '"0x8D801628D44D052"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1abc43fc-101e-000c-484b-3321fe000000',
  'x-ms-client-request-id',
  'd44ec425-3d70-4b48-bbfd-500af3079a59',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Tue, 26 May 2020 10:50:05 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159049020600707788/blob159049020631105138', "Hello World")
  .reply(201, "", [ 'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Tue, 26 May 2020 10:50:06 GMT',
  'ETag',
  '"0x8D801628D735F65"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1abc43fe-101e-000c-494b-3321fe000000',
  'x-ms-client-request-id',
  'c0445632-63ee-4873-85d8-3ec4ffd1c1af',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 26 May 2020 10:50:06 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159049020600707788')
  .query(true)
  .reply(202, "", [ 'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1abc43ff-101e-000c-4a4b-3321fe000000',
  'x-ms-client-request-id',
  'c5e790f4-af27-4916-b2cd-73923c270e28',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Tue, 26 May 2020 10:50:06 GMT' ]);
