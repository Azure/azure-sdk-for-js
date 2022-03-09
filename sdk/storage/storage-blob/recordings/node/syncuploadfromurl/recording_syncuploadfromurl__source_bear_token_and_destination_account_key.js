let nock = require('nock');

module.exports.hash = "cd1e0accfd884876538aa689db7c1f05";

module.exports.testInfo = {"uniqueName":{"container":"container162546569365600207","blockblob":"blockblob162546569481609497","srcblob/%2+%2F":"srcblob/%2+%2F162546569481604552","newblockblob":"newblockblob162546569714008350"},"newDate":{"expiry":"2021-07-05T06:14:55.982Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container162546569365600207')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 05 Jul 2021 06:14:54 GMT',
  'ETag',
  '"0x8D93F7C35262F60"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e171b97c-a01e-0024-2565-71221f000000',
  'x-ms-client-request-id',
  'd6d86309-9a99-429b-8943-9e0bcf2f6554',
  'x-ms-version',
  '2020-10-02',
  'Date',
  'Mon, 05 Jul 2021 06:14:54 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container162546569365600207/srcblob%2F%252%2B%252F162546569481604552', "Hello World")
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Mon, 05 Jul 2021 06:14:56 GMT',
  'ETag',
  '"0x8D93F7C35D849B4"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ef84d98e-d01e-000d-1065-71ef2a000000',
  'x-ms-client-request-id',
  'a28538db-1744-4ccb-9b4a-9bd1250df880',
  'x-ms-version',
  '2020-10-02',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 05 Jul 2021 06:14:55 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container162546569365600207/blockblob162546569481609497', "HelloWorld")
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  'aOEJ8PQMpyoV4FzCJ4b45g==',
  'Last-Modified',
  'Mon, 05 Jul 2021 06:14:57 GMT',
  'ETag',
  '"0x8D93F7C3689581D"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9f50c2fb-701e-0031-5e65-71506f000000',
  'x-ms-client-request-id',
  '780233e5-271a-48a9-bc93-7b0da0aa7ea7',
  'x-ms-version',
  '2020-10-02',
  'x-ms-content-crc64',
  '8R2aIe9T07E=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 05 Jul 2021 06:14:56 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container162546569365600207/newblockblob162546569714008350')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 05 Jul 2021 06:14:58 GMT',
  'ETag',
  '"0x8D93F7C37427BB5"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '14e907f6-701e-000f-5165-71d0c5000000',
  'x-ms-client-request-id',
  'b0d564f9-49a9-40b0-8cfc-fea8f26a9325',
  'x-ms-version',
  '2020-10-02',
  'x-ms-content-crc64',
  '8R2aIe9T07E=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 05 Jul 2021 06:14:58 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container162546569365600207/newblockblob162546569714008350')
  .reply(200, "HelloWorld", [
  'Content-Length',
  '10',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'aOEJ8PQMpyoV4FzCJ4b45g==',
  'Last-Modified',
  'Mon, 05 Jul 2021 06:14:58 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D93F7C37427BB5"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b5fd4835-901e-0015-1565-710902000000',
  'x-ms-client-request-id',
  '9cd6124d-5266-4d9a-b97a-9bf6c2272ef2',
  'x-ms-version',
  '2020-10-02',
  'x-ms-creation-time',
  'Mon, 05 Jul 2021 06:14:58 GMT',
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
  'Mon, 05 Jul 2021 06:14:59 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container162546569365600207')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e5361750-401e-0000-4165-717b72000000',
  'x-ms-client-request-id',
  'cf5ad542-18db-4f9b-a9e3-8b465fa0aa17',
  'x-ms-version',
  '2020-10-02',
  'Date',
  'Mon, 05 Jul 2021 06:15:00 GMT',
  'Connection',
  'close'
]);
