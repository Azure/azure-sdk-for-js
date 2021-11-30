let nock = require('nock');

module.exports.hash = "0b0c01050f27f870fc213ada935401cd";

module.exports.testInfo = {"uniqueName":{"container":"container162546565922101828","blockblob":"blockblob162546566038600872","srcblob/%2+%2F":"srcblob/%2+%2F162546566038705964"},"newDate":{"expiry":"2021-07-05T06:14:21.564Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container162546565922101828')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 05 Jul 2021 06:14:20 GMT',
  'ETag',
  '"0x8D93F7C20A0C7A4"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '542d158f-c01e-0030-2a64-71b723000000',
  'x-ms-client-request-id',
  '464fdb6e-8307-44c2-b65b-a6d544d4c4a7',
  'x-ms-version',
  '2020-10-02',
  'Date',
  'Mon, 05 Jul 2021 06:14:19 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container162546565922101828/srcblob%2F%252%2B%252F162546566038705964', "Hello World")
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Mon, 05 Jul 2021 06:14:21 GMT',
  'ETag',
  '"0x8D93F7C21546100"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4374c376-901e-002b-5764-7189a8000000',
  'x-ms-client-request-id',
  '1788a222-1132-4f74-9479-ac006995cbd0',
  'x-ms-version',
  '2020-10-02',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 05 Jul 2021 06:14:21 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container162546565922101828/blockblob162546566038600872')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd0c3c155-001e-0026-6964-711df0000000',
  'x-ms-client-request-id',
  '839edf41-6aa7-43f2-8350-527f36cb20f7',
  'x-ms-version',
  '2020-10-02',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 05 Jul 2021 06:14:22 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container162546565922101828/blockblob162546566038600872')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e5361631-401e-0000-7d65-717b72000000',
  'x-ms-client-request-id',
  'e7acccca-a448-4d74-bb72-50b22b8bf926',
  'x-ms-version',
  '2020-10-02',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 05 Jul 2021 06:14:24 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container162546565922101828/blockblob162546566038600872', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><BlockList><Latest>MQ==</Latest><Latest>Mg==</Latest></BlockList>")
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 05 Jul 2021 06:14:25 GMT',
  'ETag',
  '"0x8D93F7C23C4451A"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a27ae4b8-501e-0003-5665-71a3d1000000',
  'x-ms-client-request-id',
  '5a13b786-251c-40b3-865b-457cb0aeb277',
  'x-ms-version',
  '2020-10-02',
  'x-ms-content-crc64',
  'GFi/o1BSQtU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 05 Jul 2021 06:14:25 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container162546565922101828/blockblob162546566038600872')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><BlockList><CommittedBlocks><Block><Name>MQ==</Name><Size>11</Size></Block><Block><Name>Mg==</Name><Size>11</Size></Block></CommittedBlocks></BlockList>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Last-Modified',
  'Mon, 05 Jul 2021 06:14:25 GMT',
  'ETag',
  '"0x8D93F7C23C4451A"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '542d15c1-c01e-0030-4865-71b723000000',
  'x-ms-client-request-id',
  '78d747b5-1115-4cde-b3cf-162e3143405c',
  'x-ms-version',
  '2020-10-02',
  'x-ms-blob-content-length',
  '22',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Last-Modified,ETag,x-ms-blob-content-length,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 05 Jul 2021 06:14:27 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container162546565922101828')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2e648752-001e-0007-0a65-71dd0f000000',
  'x-ms-client-request-id',
  'f0ece877-3776-40cc-a967-b0e72d607aa1',
  'x-ms-version',
  '2020-10-02',
  'Date',
  'Mon, 05 Jul 2021 06:14:27 GMT',
  'Connection',
  'close'
]);
