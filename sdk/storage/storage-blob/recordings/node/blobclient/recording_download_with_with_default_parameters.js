let nock = require('nock');

module.exports.testInfo = {"container":"container156929854994205754","blob":"blob156929855054904936"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156929854994205754')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 24 Sep 2019 04:11:27 GMT',
  'ETag',
  '"0x8D740A5458E9752"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'cba3b627-501e-00f8-518e-72f58b000000',
  'x-ms-client-request-id',
  '8304a4b6-f7df-46d6-bcf8-3d3853106b4a',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 24 Sep 2019 04:11:27 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156929854994205754/blob156929855054904936', "Hello World")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Tue, 24 Sep 2019 04:11:27 GMT',
  'ETag',
  '"0x8D740A545BC9858"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5a231b1c-c01e-0075-748e-72b92d000000',
  'x-ms-client-request-id',
  '455eeb62-d254-4c10-b2c9-66e8f0570caf',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 24 Sep 2019 04:11:27 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container156929854994205754/blob156929855054904936')
  .reply(200, "Hello World", [ 'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Tue, 24 Sep 2019 04:11:27 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D740A545BC9858"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '703895b3-001e-0101-0e8e-72793e000000',
  'x-ms-client-request-id',
  '2cae3063-9d1e-47fa-9d7b-7f4496f14e1a',
  'x-ms-version',
  '2019-02-02',
  'x-ms-creation-time',
  'Tue, 24 Sep 2019 04:11:27 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 24 Sep 2019 04:11:27 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156929854994205754')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6f4dae73-701e-00c6-3c8e-7243aa000000',
  'x-ms-client-request-id',
  '5079e6f9-bee7-4abc-a73c-4a05cdaa0a75',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 24 Sep 2019 04:11:28 GMT' ]);
