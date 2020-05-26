let nock = require('nock');

module.exports.hash = "ae6e959f9b0a752f4a32b51177efba69";

module.exports.testInfo = {"uniqueName":{"container":"container159049021276301570","blob":"blob159049021303507117"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159049021276301570')
  .query(true)
  .reply(201, "", [ 'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 26 May 2020 10:50:12 GMT',
  'ETag',
  '"0x8D80162914B8427"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1abc4420-101e-000c-614b-3321fe000000',
  'x-ms-client-request-id',
  'b39c7bca-7bfd-4c76-b6ed-aec46794d5f1',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Tue, 26 May 2020 10:50:11 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159049021276301570/blob159049021303507117', "Hello World")
  .reply(201, "", [ 'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Tue, 26 May 2020 10:50:13 GMT',
  'ETag',
  '"0x8D80162917555A9"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1abc4422-101e-000c-624b-3321fe000000',
  'x-ms-client-request-id',
  '79def682-2bcd-4b40-abf8-9158cfecf0ae',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 26 May 2020 10:50:13 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159049021276301570')
  .query(true)
  .reply(202, "", [ 'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1abc4423-101e-000c-634b-3321fe000000',
  'x-ms-client-request-id',
  'd97b06c9-2230-4cf6-a478-d719585cd306',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Tue, 26 May 2020 10:50:13 GMT' ]);
