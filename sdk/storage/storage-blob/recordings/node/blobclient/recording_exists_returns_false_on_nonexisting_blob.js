let nock = require('nock');

module.exports.testInfo = {"container":"container156996518819302613","blob":"blob156996518831607346","newblob":"newblob156996518842704926"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156996518819302613')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 01 Oct 2019 21:26:27 GMT',
  'ETag',
  '"0x8D746B6051C39C3"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6094db23-401e-007e-569e-78afb9000000',
  'x-ms-client-request-id',
  '811cb5a4-6d74-47ef-b531-7afa7da9ae43',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 01 Oct 2019 21:26:27 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156996518819302613/blob156996518831607346', "Hello World")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Tue, 01 Oct 2019 21:26:28 GMT',
  'ETag',
  '"0x8D746B6052D2F48"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd1fbeb88-501e-00c0-239e-78ba32000000',
  'x-ms-client-request-id',
  '4734fd0b-7097-4b67-8b79-df291957afed',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 01 Oct 2019 21:26:27 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container156996518819302613/newblob156996518842704926')
  .reply(404, "", [ 'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b5b8b31c-501e-0121-6f9e-781b12000000',
  'x-ms-client-request-id',
  'd7859f5c-2fee-422f-a0c9-f08ed0f0b325',
  'x-ms-version',
  '2019-02-02',
  'x-ms-error-code',
  'BlobNotFound',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 01 Oct 2019 21:26:27 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156996518819302613')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b1efc903-601e-0087-1b9e-786559000000',
  'x-ms-client-request-id',
  'c5562c67-fa1b-4a03-9d01-692525828f37',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 01 Oct 2019 21:26:28 GMT' ]);

