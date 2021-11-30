let nock = require('nock');

module.exports.hash = "2f327e8d9dc8b9ecdfc68b33e7d905ae";

module.exports.testInfo = {"uniqueName":{"container":"container162546570068206750","blockblob":"blockblob162546570184309297","srcblob/%2+%2F":"srcblob/%2+%2F162546570184408400","newblockblob":"newblockblob162546570418707937"},"newDate":{"expiry":"2021-07-05T06:15:03.024Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container162546570068206750')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 05 Jul 2021 06:15:02 GMT',
  'ETag',
  '"0x8D93F7C395681CF"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd0c3c5f0-001e-0026-2765-711df0000000',
  'x-ms-client-request-id',
  '8839848d-64cd-4993-8e5f-9a3424fed30a',
  'x-ms-version',
  '2020-10-02',
  'Date',
  'Mon, 05 Jul 2021 06:15:01 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container162546570068206750/srcblob%2F%252%2B%252F162546570184408400', "Hello World")
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Mon, 05 Jul 2021 06:15:03 GMT',
  'ETag',
  '"0x8D93F7C3A0A5E64"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'cc646985-601e-002d-5865-71c899000000',
  'x-ms-client-request-id',
  'd278ffa9-9aee-4e15-b1df-9cdf77e56671',
  'x-ms-version',
  '2020-10-02',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 05 Jul 2021 06:15:02 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container162546570068206750/blockblob162546570184309297', "HelloWorld")
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  'aOEJ8PQMpyoV4FzCJ4b45g==',
  'Last-Modified',
  'Mon, 05 Jul 2021 06:15:04 GMT',
  'ETag',
  '"0x8D93F7C3ABC3006"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd5442741-301e-0008-1465-7176b8000000',
  'x-ms-client-request-id',
  '9bd9a7fa-de75-48f3-b28f-4d1b8574a452',
  'x-ms-version',
  '2020-10-02',
  'x-ms-content-crc64',
  '8R2aIe9T07E=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 05 Jul 2021 06:15:04 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container162546570068206750/newblockblob162546570418707937')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 05 Jul 2021 06:15:05 GMT',
  'ETag',
  '"0x8D93F7C3B713582"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'cc6469a3-601e-002d-7565-71c899000000',
  'x-ms-client-request-id',
  '96b12df2-441f-4492-8c4e-b21bae3657e0',
  'x-ms-version',
  '2020-10-02',
  'x-ms-content-crc64',
  '8R2aIe9T07E=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 05 Jul 2021 06:15:04 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container162546570068206750/newblockblob162546570418707937')
  .reply(200, "HelloWorld", [
  'Content-Length',
  '10',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'aOEJ8PQMpyoV4FzCJ4b45g==',
  'Last-Modified',
  'Mon, 05 Jul 2021 06:15:05 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D93F7C3B713582"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd0c3c68e-001e-0026-3665-711df0000000',
  'x-ms-client-request-id',
  '5febe249-c4f1-4ced-afe9-2ba4ac7df465',
  'x-ms-version',
  '2020-10-02',
  'x-ms-creation-time',
  'Mon, 05 Jul 2021 06:15:05 GMT',
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
  'Mon, 05 Jul 2021 06:15:05 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container162546570068206750')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0ecbd84a-501e-0022-7065-71632e000000',
  'x-ms-client-request-id',
  '0256d3f2-fd02-449d-9a9e-957048d33fdc',
  'x-ms-version',
  '2020-10-02',
  'Date',
  'Mon, 05 Jul 2021 06:15:07 GMT',
  'Connection',
  'close'
]);
