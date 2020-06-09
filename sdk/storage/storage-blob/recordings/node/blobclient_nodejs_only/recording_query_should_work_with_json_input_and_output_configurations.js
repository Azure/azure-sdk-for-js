let nock = require('nock');

module.exports.hash = "da303cb0dbbe576967bf0bcc9e842496";

module.exports.testInfo = {"uniqueName":{"container":"container159049021779702431","blob":"blob159049021829309285"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159049021779702431')
  .query(true)
  .reply(201, "", [ 'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 26 May 2020 10:50:17 GMT',
  'ETag',
  '"0x8D80162944B94A2"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1abc443e-101e-000c-704b-3321fe000000',
  'x-ms-client-request-id',
  '88178f2d-8867-4fac-beeb-ebb683a757fb',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Tue, 26 May 2020 10:50:17 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159049021779702431/blob159049021829309285', "Hello World")
  .reply(201, "", [ 'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Tue, 26 May 2020 10:50:18 GMT',
  'ETag',
  '"0x8D8016294980E2D"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1abc4440-101e-000c-714b-3321fe000000',
  'x-ms-client-request-id',
  'f71ba7cb-4550-40e9-818f-46c284b43b5f',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 26 May 2020 10:50:17 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159049021779702431')
  .query(true)
  .reply(202, "", [ 'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1abc4441-101e-000c-724b-3321fe000000',
  'x-ms-client-request-id',
  'a350bf6e-9386-453c-b604-305901974f51',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Tue, 26 May 2020 10:50:18 GMT' ]);
