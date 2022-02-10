let nock = require('nock');

module.exports.hash = "f7d9cab6ad684ac54e6e906d759eaffe";

module.exports.testInfo = {"uniqueName":{"share":"share164420387825801072","dir":"dir164420387956408977","destdir":"destdir164420388043804853"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164420387825801072')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 07 Feb 2022 03:17:59 GMT',
  'ETag',
  '"0x8D9E9E8717F950E"',
  'x-ms-request-id',
  'af7b49e0-201a-0006-69d1-1b03a9000000',
  'x-ms-client-request-id',
  '0beb3ae4-0d5e-4652-9902-ec789c0e3769',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Mon, 07 Feb 2022 03:17:59 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164420387825801072/dir164420387956408977')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 07 Feb 2022 03:18:00 GMT',
  'ETag',
  '"0x8D9E9E8721A3E37"',
  'x-ms-request-id',
  'af7b49e3-201a-0006-6ad1-1b03a9000000',
  'x-ms-client-request-id',
  '2640b78b-3a03-4976-b413-1d9be44de2a9',
  'x-ms-version',
  '2021-04-10',
  'x-ms-file-change-time',
  '2022-02-07T03:18:00.5642807Z',
  'x-ms-file-last-write-time',
  '2022-02-07T03:18:00.5642807Z',
  'x-ms-file-creation-time',
  '2022-02-07T03:18:00.5642807Z',
  'x-ms-file-permission-key',
  '12098348342869812368*3117928199373521617',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 07 Feb 2022 03:17:59 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164420387825801072/destdir164420388043804853')
  .query(true)
  .reply(200, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 07 Feb 2022 03:18:01 GMT',
  'ETag',
  '"0x8D9E9E872C5E8BD"',
  'x-ms-request-id',
  '1d6c0e59-601a-0002-17d1-1be805000000',
  'x-ms-client-request-id',
  'b370abb3-fbaf-452d-9bc1-4d5dfe40c55e',
  'x-ms-version',
  '2021-04-10',
  'x-ms-file-change-time',
  '2022-02-07T03:18:01.6893117Z',
  'x-ms-file-last-write-time',
  '2022-02-07T03:18:00.5642807Z',
  'x-ms-file-creation-time',
  '2022-02-07T03:18:00.5642807Z',
  'x-ms-file-permission-key',
  '12098348342869812368*3117928199373521617',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 07 Feb 2022 03:18:01 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share164420387825801072/destdir164420388043804853')
  .query(true)
  .reply(200, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 07 Feb 2022 03:18:01 GMT',
  'ETag',
  '"0x8D9E9E872C5E8BD"',
  'x-ms-request-id',
  '1d6c0e5d-601a-0002-18d1-1be805000000',
  'x-ms-client-request-id',
  '7dcb3e3e-82f7-4a89-b339-cc8a0f501c2a',
  'x-ms-version',
  '2021-04-10',
  'x-ms-server-encrypted',
  'true',
  'x-ms-meta-key1',
  'vala',
  'x-ms-meta-key2',
  'valb',
  'x-ms-file-change-time',
  '2022-02-07T03:18:01.6893117Z',
  'x-ms-file-last-write-time',
  '2022-02-07T03:18:00.5642807Z',
  'x-ms-file-creation-time',
  '2022-02-07T03:18:00.5642807Z',
  'x-ms-file-permission-key',
  '12098348342869812368*3117928199373521617',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Last-Modified,ETag,x-ms-server-encrypted,x-ms-meta-key1,x-ms-meta-key2,x-ms-file-change-time,x-ms-file-last-write-time,x-ms-file-creation-time,x-ms-file-permission-key,x-ms-file-attributes,x-ms-file-id,x-ms-file-parent-id',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 07 Feb 2022 03:18:01 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share164420387825801072/dir164420387956408977')
  .query(true)
  .reply(404, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>ResourceNotFound</Code><Message>The specified resource does not exist.\nRequestId:6bc21ab4-a01a-0005-2ed1-1bf0c9000000\nTime:2022-02-07T03:18:03.4276215Z</Message></Error>", [
  'Content-Length',
  '223',
  'Content-Type',
  'application/xml',
  'x-ms-request-id',
  '6bc21ab4-a01a-0005-2ed1-1bf0c9000000',
  'x-ms-client-request-id',
  '2c7460fc-a13d-48f2-965c-741775dd6675',
  'x-ms-version',
  '2021-04-10',
  'x-ms-error-code',
  'ResourceNotFound',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 07 Feb 2022 03:18:03 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share164420387825801072')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  'bb115a5b-b01a-0009-15d1-1b3c4a000000',
  'x-ms-client-request-id',
  'bb95394f-fa8e-41e8-a61a-6176178ff6d5',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Mon, 07 Feb 2022 03:18:04 GMT',
  'Connection',
  'close'
]);
