let nock = require('nock');

module.exports.hash = "59cc236e24b4f19989c6b39215348976";

module.exports.testInfo = {"uniqueName":{"container":"container162548907746101608","blockblob":"blockblob162548907889109866","srcblob/%2+%2F":"srcblob/%2+%2F162548907889400623"},"newDate":{"expiry":"2021-07-05T12:44:39.198Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container162548907746101608')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 05 Jul 2021 12:44:39 GMT',
  'ETag',
  '"0x8D93FB2A71FBE8C"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '31c2cfca-701e-002e-019b-71103a000000',
  'x-ms-client-request-id',
  '99dc534f-237e-4a6c-b1e8-0e1344518b14',
  'x-ms-version',
  '2020-10-02',
  'Date',
  'Mon, 05 Jul 2021 12:44:38 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container162548907746101608/srcblob%2F%252%2B%252F162548907889400623', "Hello World")
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Mon, 05 Jul 2021 12:44:39 GMT',
  'ETag',
  '"0x8D93FB2A7529F08"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '31c2cfcf-701e-002e-049b-71103a000000',
  'x-ms-client-request-id',
  '819fc553-029e-4af5-86e1-4396a20b9f7b',
  'x-ms-version',
  '2020-10-02',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 05 Jul 2021 12:44:38 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container162548907746101608/blockblob162548907889109866')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 05 Jul 2021 12:44:39 GMT',
  'ETag',
  '"0x8D93FB2A7962E1E"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '31c2cfd0-701e-002e-059b-71103a000000',
  'x-ms-client-request-id',
  'ca6291ca-ab09-41ed-8d53-31701d213ebb',
  'x-ms-version',
  '2020-10-02',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 05 Jul 2021 12:44:39 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container162548907746101608/blockblob162548907889109866')
  .reply(200, ["48656c6c6f20576f726c64"], [
  'Cache-Control',
  'blobCacheControl',
  'Content-Length',
  '11',
  'Content-Type',
  'blobContentType',
  'Content-Encoding',
  'blobContentEncoding',
  'Content-Language',
  'blobContentLanguage',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Mon, 05 Jul 2021 12:44:39 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D93FB2A7962E1E"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '31c2cfd4-701e-002e-079b-71103a000000',
  'x-ms-client-request-id',
  'fff4a969-7d1f-4abb-a873-0811dac59150',
  'x-ms-version',
  '2020-10-02',
  'x-ms-creation-time',
  'Mon, 05 Jul 2021 12:44:39 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'Content-Disposition',
  'blobContentDisposition',
  'x-ms-server-encrypted',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Encoding,Content-Language,Cache-Control,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,Content-Disposition,x-ms-server-encrypted,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 05 Jul 2021 12:44:39 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container162548907746101608')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '31c2cfd9-701e-002e-0c9b-71103a000000',
  'x-ms-client-request-id',
  '129bde81-25c9-4b03-bc6e-f1bb3b3949b9',
  'x-ms-version',
  '2020-10-02',
  'Date',
  'Mon, 05 Jul 2021 12:44:39 GMT'
]);
