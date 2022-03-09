let nock = require('nock');

module.exports.hash = "b4700984a2c3855e37b731cca270d4f8";

module.exports.testInfo = {"uniqueName":{"container":"container162546562671402128","blob":"blob162546562788606733","blockblob":"blockblob162546562905400597"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container162546562671402128')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 05 Jul 2021 06:13:48 GMT',
  'ETag',
  '"0x8D93F7C0D419128"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '69f4e79c-e01e-0023-3a64-718462000000',
  'x-ms-client-request-id',
  '5c362dae-3e2c-4eeb-be1b-407ac3b22f96',
  'x-ms-version',
  '2020-10-02',
  'Date',
  'Mon, 05 Jul 2021 06:13:47 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container162546562671402128/blob162546562788606733')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 05 Jul 2021 06:13:49 GMT',
  'ETag',
  '"0x8D93F7C0DF4356E"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bf719191-001e-0018-2f64-719d5a000000',
  'x-ms-client-request-id',
  'c0c6fb89-7ddb-4246-8685-8a46c239ced5',
  'x-ms-version',
  '2020-10-02',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 05 Jul 2021 06:13:48 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container162546562671402128/blockblob162546562905400597', "Hello World!")
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  '7Qdih1MuhjZehB6Sv8UNjA==',
  'Last-Modified',
  'Mon, 05 Jul 2021 06:13:50 GMT',
  'ETag',
  '"0x8D93F7C0EA51CD1"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e29b9a4d-201e-002a-4e64-716ee4000000',
  'x-ms-client-request-id',
  'f52b56d9-08bf-4428-b831-92d756351e7b',
  'x-ms-version',
  '2020-10-02',
  'x-ms-content-crc64',
  'peH8Xsgc5QI=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 05 Jul 2021 06:13:50 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container162546562671402128/blob162546562788606733')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Mon, 05 Jul 2021 06:13:51 GMT',
  'ETag',
  '"0x8D93F7C0F660781"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-content-crc64',
  'peH8Xsgc5QI=',
  'x-ms-blob-committed-block-count',
  '1',
  'x-ms-blob-append-offset',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'e171b594-a01e-0024-1d64-71221f000000',
  'x-ms-version',
  '2020-10-02',
  'x-ms-client-request-id',
  '38930124-3f18-4b63-af69-20af0d5ad7c7',
  'Date',
  'Mon, 05 Jul 2021 06:13:51 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container162546562671402128/blob162546562788606733')
  .reply(200, "Hello World!", [
  'Content-Length',
  '12',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Mon, 05 Jul 2021 06:13:51 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D93F7C0F660781"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd544243c-301e-0008-5064-7176b8000000',
  'x-ms-client-request-id',
  '08757ea5-2b45-452b-a4ef-ba891cb2907a',
  'x-ms-version',
  '2020-10-02',
  'x-ms-creation-time',
  'Mon, 05 Jul 2021 06:13:49 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'AppendBlob',
  'x-ms-blob-committed-block-count',
  '1',
  'x-ms-server-encrypted',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-blob-committed-block-count,x-ms-server-encrypted,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 05 Jul 2021 06:13:52 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container162546562671402128')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4374c257-901e-002b-1a64-7189a8000000',
  'x-ms-client-request-id',
  '19ceaabf-3225-4007-8eb4-ab05cb4b7f2b',
  'x-ms-version',
  '2020-10-02',
  'Date',
  'Mon, 05 Jul 2021 06:13:53 GMT',
  'Connection',
  'close'
]);
