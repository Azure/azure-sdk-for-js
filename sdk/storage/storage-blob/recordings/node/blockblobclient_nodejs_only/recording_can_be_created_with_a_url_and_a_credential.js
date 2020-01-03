let nock = require('nock');

module.exports.testInfo = {"container":"container156816865561706179","blob":"blob156816865603408475","randomstring":"randomstring156816865603604868"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156816865561706179')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:24:15 GMT',
  'ETag',
  '"0x8D7365F2492F40E"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ed1894e6-f01e-0005-5848-689283000000',
  'x-ms-client-request-id',
  'af5c83c6-fead-46b8-badf-e5d1c32195f0',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:24:15 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156816865561706179/blob156816865603408475', "randomstring156816865603604868")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'DBMZ9ejX2ZNu76VsFlidtw==',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:24:16 GMT',
  'ETag',
  '"0x8D7365F24D2A4E2"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '155c12d5-c01e-0006-2a48-689184000000',
  'x-ms-client-request-id',
  '9c2cf563-27c8-43b8-b1cb-f3add4f7bcdd',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'oGv+VQbUNLM=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 11 Sep 2019 02:24:15 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container156816865561706179/blob156816865603408475')
  .reply(200, "randomstring156816865603604868", [ 'Content-Length',
  '30',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'DBMZ9ejX2ZNu76VsFlidtw==',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:24:16 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D7365F24D2A4E2"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8b515b83-b01e-0002-7b48-686406000000',
  'x-ms-client-request-id',
  'af70b323-cd94-4303-b5e2-9150fc2b9b84',
  'x-ms-version',
  '2019-02-02',
  'x-ms-tag-count',
  '0',
  'x-ms-creation-time',
  'Wed, 11 Sep 2019 02:24:16 GMT',
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
  'Wed, 11 Sep 2019 02:24:16 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156816865561706179')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '18381144-b01e-004d-1848-68a01e000000',
  'x-ms-client-request-id',
  '4c0f0c76-fd95-4d64-b898-cf35dd0e526c',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:24:17 GMT' ]);

