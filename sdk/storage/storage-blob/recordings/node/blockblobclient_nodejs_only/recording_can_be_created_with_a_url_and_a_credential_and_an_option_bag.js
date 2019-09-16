let nock = require('nock');

module.exports.testInfo = {"container":"container156816865728401400","blob":"blob156816865770108670","randomstring":"randomstring156816865770100175"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156816865728401400')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:24:17 GMT',
  'ETag',
  '"0x8D7365F25914302"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'af584c94-501e-0008-7648-687d8f000000',
  'x-ms-client-request-id',
  'a2483f3b-29ef-4ef8-8bb1-fb6efb897f38',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:24:17 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156816865728401400/blob156816865770108670', "randomstring156816865770100175")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'Ps5M/H7lyNUM4PhjNQASWA==',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:24:18 GMT',
  'ETag',
  '"0x8D7365F25D0E1D3"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6798ca37-b01e-0064-2b48-68d65c000000',
  'x-ms-client-request-id',
  '5b7fc9d4-bc55-4b2e-b11b-d6c1d63a55e1',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  '8cEDBktOG+k=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 11 Sep 2019 02:24:17 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container156816865728401400/blob156816865770108670')
  .reply(200, "randomstring156816865770100175", [ 'Content-Length',
  '30',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'Ps5M/H7lyNUM4PhjNQASWA==',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:24:18 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D7365F25D0E1D3"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2053ecfd-901e-001e-2448-68bc11000000',
  'x-ms-client-request-id',
  'd260980a-6915-4cd6-8018-f9f501284ee4',
  'x-ms-version',
  '2019-02-02',
  'x-ms-tag-count',
  '0',
  'x-ms-creation-time',
  'Wed, 11 Sep 2019 02:24:18 GMT',
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
  'Wed, 11 Sep 2019 02:24:17 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156816865728401400')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '95f3d298-401e-0053-0a48-687af3000000',
  'x-ms-client-request-id',
  'ba572588-c5ce-4aea-8553-c58a80ecab41',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:24:18 GMT' ]);

