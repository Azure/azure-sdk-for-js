let nock = require('nock');

module.exports.hash = "0ee0a353b31e11e6294db1c781176d61";

module.exports.testInfo = {"uniqueName":{"container":"container162546563385104672","blob":"blob162546563501204600","copiedblob":"copiedblob162546563618305613"},"newDate":{"expiry":"2021-07-05T06:13:56.186Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container162546563385104672')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 05 Jul 2021 06:13:55 GMT',
  'ETag',
  '"0x8D93F7C1180DBBC"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6f0142b2-f01e-0020-1a64-715cc1000000',
  'x-ms-client-request-id',
  'ff4635ca-9d01-4792-8c0b-e8a0c35dd4ba',
  'x-ms-version',
  '2020-10-02',
  'Date',
  'Mon, 05 Jul 2021 06:13:55 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container162546563385104672/blob162546563501204600', "Hello World")
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Mon, 05 Jul 2021 06:13:56 GMT',
  'ETag',
  '"0x8D93F7C1233B5B8"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e536150c-401e-0000-1964-717b72000000',
  'x-ms-client-request-id',
  '2d4a532b-ae7c-4482-8e12-bfac8662eeff',
  'x-ms-version',
  '2020-10-02',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 05 Jul 2021 06:13:55 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container162546563385104672/copiedblob162546563618305613')
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 05 Jul 2021 06:13:57 GMT',
  'ETag',
  '"0x8D93F7C13012539"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '577bf267-c01e-000e-4164-713789000000',
  'x-ms-client-request-id',
  '2301a5b1-f5b3-43bc-8bd1-cad2047b07be',
  'x-ms-version',
  '2020-10-02',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-copy-id',
  'bf782f50-ac7a-479c-a4fc-bc5755ab1bbc',
  'x-ms-copy-status',
  'success',
  'Date',
  'Mon, 05 Jul 2021 06:13:57 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container162546563385104672/blob162546563501204600')
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Mon, 05 Jul 2021 06:13:56 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D93F7C1233B5B8"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1c2d08b9-601e-0013-2264-714833000000',
  'x-ms-client-request-id',
  '6d8df33d-3de1-4aee-84e9-c5a03c41a83e',
  'x-ms-version',
  '2020-10-02',
  'x-ms-creation-time',
  'Mon, 05 Jul 2021 06:13:56 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Hot',
  'x-ms-access-tier-inferred',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 05 Jul 2021 06:13:58 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container162546563385104672/copiedblob162546563618305613')
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Mon, 05 Jul 2021 06:13:57 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D93F7C13012539"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bf7191df-001e-0018-5164-719d5a000000',
  'x-ms-client-request-id',
  'a36f301f-2b10-49ae-a26c-e2f4f9dd92e2',
  'x-ms-version',
  '2020-10-02',
  'x-ms-creation-time',
  'Mon, 05 Jul 2021 06:13:57 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-copy-id',
  'bf782f50-ac7a-479c-a4fc-bc5755ab1bbc',
  'x-ms-copy-source',
  'https://fakestorageaccount.blob.core.windows.net/container162546563385104672/blob162546563501204600?sv=2020-08-04&se=2021-07-06T06%3A13%3A56Z&sr=b&sp=racwd&sig=Nou%2FrbPkMqMSG4VpyKYj6iUXMw3%2FFQ5Rdu9HHx40oRc%3D',
  'x-ms-copy-status',
  'success',
  'x-ms-copy-progress',
  '11/11',
  'x-ms-copy-completion-time',
  'Mon, 05 Jul 2021 06:13:57 GMT',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Hot',
  'x-ms-access-tier-inferred',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-copy-id,x-ms-copy-source,x-ms-copy-status,x-ms-copy-progress,x-ms-copy-completion-time,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 05 Jul 2021 06:13:59 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container162546563385104672')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1b8612f0-b01e-0019-5d64-717a16000000',
  'x-ms-client-request-id',
  '1b8f7634-f535-4848-9bff-e7f8510e53b6',
  'x-ms-version',
  '2020-10-02',
  'Date',
  'Mon, 05 Jul 2021 06:14:00 GMT',
  'Connection',
  'close'
]);
