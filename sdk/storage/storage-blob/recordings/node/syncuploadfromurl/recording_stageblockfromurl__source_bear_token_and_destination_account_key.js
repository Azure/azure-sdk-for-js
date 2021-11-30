let nock = require('nock');

module.exports.hash = "5c250f58ce7bce784421fb0c01d29b94";

module.exports.testInfo = {"uniqueName":{"container":"container162546566801806041","blockblob":"blockblob162546566919006629","srcblob/%2+%2F":"srcblob/%2+%2F162546566919204576","newblockblob":"newblockblob162546567153406516"},"newDate":{"expiry":"2021-07-05T06:14:30.356Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container162546566801806041')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 05 Jul 2021 06:14:29 GMT',
  'ETag',
  '"0x8D93F7C25DFA26E"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e29b9d37-201e-002a-0c65-716ee4000000',
  'x-ms-client-request-id',
  'f5611676-6da8-4bae-ae73-59abd7df4b1c',
  'x-ms-version',
  '2020-10-02',
  'Date',
  'Mon, 05 Jul 2021 06:14:29 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container162546566801806041/srcblob%2F%252%2B%252F162546566919204576', "Hello World")
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Mon, 05 Jul 2021 06:14:30 GMT',
  'ETag',
  '"0x8D93F7C26924169"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4fe10bae-201e-000b-6a65-71ae1b000000',
  'x-ms-client-request-id',
  'f329a318-1ef2-4e34-a29c-18762104a486',
  'x-ms-version',
  '2020-10-02',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 05 Jul 2021 06:14:30 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container162546566801806041/blockblob162546566919006629', "HelloWorld")
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  'aOEJ8PQMpyoV4FzCJ4b45g==',
  'Last-Modified',
  'Mon, 05 Jul 2021 06:14:31 GMT',
  'ETag',
  '"0x8D93F7C27454B5E"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b7d10f30-f01e-0001-3f65-719c3e000000',
  'x-ms-client-request-id',
  '628d0a95-c945-4726-b03e-1bd67f9910a6',
  'x-ms-version',
  '2020-10-02',
  'x-ms-content-crc64',
  '8R2aIe9T07E=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 05 Jul 2021 06:14:31 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container162546566801806041/newblockblob162546567153406516')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'cd37bfa2-b01e-0006-1e65-713a43000000',
  'x-ms-client-request-id',
  'c44e46e2-4af7-4bbc-8cfb-088e16ffacb9',
  'x-ms-version',
  '2020-10-02',
  'x-ms-content-crc64',
  '8R2aIe9T07E=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 05 Jul 2021 06:14:32 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container162546566801806041/newblockblob162546567153406516')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '14e906b8-701e-000f-3d65-71d0c5000000',
  'x-ms-client-request-id',
  '25eed14a-90b0-4b19-a26a-4d9296541672',
  'x-ms-version',
  '2020-10-02',
  'x-ms-content-crc64',
  '8R2aIe9T07E=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 05 Jul 2021 06:14:33 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container162546566801806041/newblockblob162546567153406516', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><BlockList><Latest>MQ==</Latest><Latest>Mg==</Latest></BlockList>")
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 05 Jul 2021 06:14:35 GMT',
  'ETag',
  '"0x8D93F7C29972470"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1cb9316-401e-0021-0965-71bb8d000000',
  'x-ms-client-request-id',
  'c5033f83-a4f5-432b-befd-cb8ef7581f69',
  'x-ms-version',
  '2020-10-02',
  'x-ms-content-crc64',
  'GFi/o1BSQtU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 05 Jul 2021 06:14:35 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container162546566801806041/newblockblob162546567153406516')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><BlockList><CommittedBlocks><Block><Name>MQ==</Name><Size>10</Size></Block><Block><Name>Mg==</Name><Size>10</Size></Block></CommittedBlocks></BlockList>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Last-Modified',
  'Mon, 05 Jul 2021 06:14:35 GMT',
  'ETag',
  '"0x8D93F7C29972470"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9f50c279-701e-0031-0265-71506f000000',
  'x-ms-client-request-id',
  '36081f02-58db-4e4d-b08d-f927f99f20bd',
  'x-ms-version',
  '2020-10-02',
  'x-ms-blob-content-length',
  '20',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Last-Modified,ETag,x-ms-blob-content-length,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 05 Jul 2021 06:14:36 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container162546566801806041')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a27ae54b-501e-0003-5265-71a3d1000000',
  'x-ms-client-request-id',
  '1a6854e4-8ce2-43b9-87b5-8c894239a7ca',
  'x-ms-version',
  '2020-10-02',
  'Date',
  'Mon, 05 Jul 2021 06:14:37 GMT',
  'Connection',
  'close'
]);
