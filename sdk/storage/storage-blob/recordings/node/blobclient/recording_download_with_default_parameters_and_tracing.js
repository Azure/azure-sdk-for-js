let nock = require('nock');

module.exports.testInfo = {"container":"container157005382619501684","blob":"blob157005382646700892"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157005382619501684')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 02 Oct 2019 22:03:46 GMT',
  'ETag',
  '"0x8D7478465BAEA1A"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '94a18aaa-901e-0066-686d-79b72d000000',
  'x-ms-client-request-id',
  '38853bcf-628a-4af9-b67d-cc1514b7497c',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 02 Oct 2019 22:03:46 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157005382619501684/blob157005382646700892', "Hello World")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Wed, 02 Oct 2019 22:03:46 GMT',
  'ETag',
  '"0x8D7478465CBCBD3"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9e141919-a01e-0030-526d-7946c2000000',
  'x-ms-client-request-id',
  'eca1b5df-7544-476f-9d6d-aeb5ef3fe886',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 02 Oct 2019 22:03:46 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container157005382619501684/blob157005382646700892')
  .reply(200, "Hello World", [ 'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Wed, 02 Oct 2019 22:03:46 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D7478465CBCBD3"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3dd87b03-701e-0041-486d-79a0e9000000',
  'x-ms-client-request-id',
  '926b30e3-1451-40aa-b7e5-7b88827b055f',
  'x-ms-version',
  '2019-02-02',
  'x-ms-tag-count',
  '0',
  'x-ms-creation-time',
  'Wed, 02 Oct 2019 22:03:46 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-tag-count,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 02 Oct 2019 22:03:46 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container157005382619501684')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'dee0666e-101e-0047-1f6d-799356000000',
  'x-ms-client-request-id',
  '64f15433-c53a-4741-bd02-3ac9e5d167e5',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 02 Oct 2019 22:03:46 GMT' ]);

