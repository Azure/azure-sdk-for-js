let nock = require('nock');

module.exports.hash = "7f4b818c97cd6b2a20340b1f06ee6b87";

module.exports.testInfo = {"uniqueName":{"container":"container162546568748009285","blockblob":"blockblob162546568863609182","srcblob/%2+%2F":"srcblob/%2+%2F162546568863707199"},"newDate":{"expiry":"2021-07-05T06:14:49.961Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container162546568748009285')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 05 Jul 2021 06:14:48 GMT',
  'ETag',
  '"0x8D93F7C3177710B"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '577bf4e9-c01e-000e-5f65-713789000000',
  'x-ms-client-request-id',
  '1fe09575-785f-4ac5-a7e6-61a053dd0061',
  'x-ms-version',
  '2020-10-02',
  'Date',
  'Mon, 05 Jul 2021 06:14:48 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container162546568748009285/srcblob%2F%252%2B%252F162546568863707199', "Hello World")
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Mon, 05 Jul 2021 06:14:50 GMT',
  'ETag',
  '"0x8D93F7C3241E9B6"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9f50c2c3-701e-0031-3165-71506f000000',
  'x-ms-client-request-id',
  'eef073fc-dbbc-4f83-bfeb-78ad8442ce24',
  'x-ms-version',
  '2020-10-02',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 05 Jul 2021 06:14:49 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container162546568748009285/blockblob162546568863609182')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 05 Jul 2021 06:14:51 GMT',
  'ETag',
  '"0x8D93F7C330D332B"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'cc646922-601e-002d-1365-71c899000000',
  'x-ms-client-request-id',
  'cb54f7d7-cc37-43d0-b730-973163cadef2',
  'x-ms-version',
  '2020-10-02',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 05 Jul 2021 06:14:50 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container162546568748009285/blockblob162546568863609182')
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
  'Mon, 05 Jul 2021 06:14:51 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D93F7C330D332B"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '14e907ae-701e-000f-1065-71d0c5000000',
  'x-ms-client-request-id',
  '099dffbf-bcd5-489d-879e-b93cbe8e125b',
  'x-ms-version',
  '2020-10-02',
  'x-ms-creation-time',
  'Mon, 05 Jul 2021 06:14:51 GMT',
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
  'Mon, 05 Jul 2021 06:14:52 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container162546568748009285')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4fe10c29-201e-000b-3a65-71ae1b000000',
  'x-ms-client-request-id',
  '05923355-13fc-4a89-811e-776935e7a433',
  'x-ms-version',
  '2020-10-02',
  'Date',
  'Mon, 05 Jul 2021 06:14:52 GMT',
  'Connection',
  'close'
]);
