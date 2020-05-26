let nock = require('nock');

module.exports.hash = "fdc46dc8a237d6cac45f8cfb615e46d8";

module.exports.testInfo = {"uniqueName":{"container":"container159049020712800511","blob":"blob159049020739900152"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159049020712800511')
  .query(true)
  .reply(201, "", [ 'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 26 May 2020 10:50:07 GMT',
  'ETag',
  '"0x8D801628DEFAE67"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1abc4400-101e-000c-4b4b-3321fe000000',
  'x-ms-client-request-id',
  '1d191125-143c-44e9-88d9-f32d56e36f07',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Tue, 26 May 2020 10:50:06 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159049020712800511/blob159049020739900152', "Hello World")
  .reply(201, "", [ 'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Tue, 26 May 2020 10:50:07 GMT',
  'ETag',
  '"0x8D801628E193334"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1abc4403-101e-000c-4c4b-3321fe000000',
  'x-ms-client-request-id',
  '80421d4f-2379-421e-93de-296fa2093306',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 26 May 2020 10:50:07 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159049020712800511')
  .query(true)
  .reply(202, "", [ 'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1abc4404-101e-000c-4d4b-3321fe000000',
  'x-ms-client-request-id',
  '1a7d9c26-1258-45d6-b9dc-6a93fe8a06db',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Tue, 26 May 2020 10:50:07 GMT' ]);
