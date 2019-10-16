let nock = require('nock');

module.exports.testInfo = {"container":"container157050172030501316","blob":"blob157050172087503495"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157050172030501316')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 08 Oct 2019 02:28:40 GMT',
  'ETag',
  '"0x8D74B973B5AC8F3"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'dab8b05d-a01e-00d5-5b80-7d78ab000000',
  'x-ms-client-request-id',
  '5ef99dea-d094-42ce-8184-fabcfb0321eb',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 08 Oct 2019 02:28:39 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157050172030501316/blob157050172087503495')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 08 Oct 2019 02:28:40 GMT',
  'ETag',
  '"0x8D74B973B923466"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'be41f092-101e-006d-3d80-7d9a58000000',
  'x-ms-client-request-id',
  'd887969a-49fd-4c51-8914-ecff9e7fa925',
  'x-ms-version',
  '2019-02-02',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 08 Oct 2019 02:28:39 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container157050172030501316/blob157050172087503495')
  .reply(200, "", [ 'Content-Length',
  '0',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Tue, 08 Oct 2019 02:28:40 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D74B973B923466"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8191dc7a-501e-00a6-2580-7d0868000000',
  'x-ms-client-request-id',
  '11fdc8f9-9f1f-4489-b358-bce659e2da85',
  'x-ms-version',
  '2019-02-02',
  'x-ms-creation-time',
  'Tue, 08 Oct 2019 02:28:40 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'AppendBlob',
  'x-ms-blob-committed-block-count',
  '0',
  'x-ms-server-encrypted',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-blob-committed-block-count,x-ms-server-encrypted,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 08 Oct 2019 02:28:40 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container157050172030501316')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a8b31b2b-201e-012e-5280-7df6e4000000',
  'x-ms-client-request-id',
  '40c48219-2c07-4ff4-b8cf-c6cb79d87d8b',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 08 Oct 2019 02:28:40 GMT',
  'Connection',
  'close' ]);

