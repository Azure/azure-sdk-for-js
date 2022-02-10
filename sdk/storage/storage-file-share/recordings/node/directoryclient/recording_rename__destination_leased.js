let nock = require('nock');

module.exports.hash = "466af088627a2d4492864c236d465ff8";

module.exports.testInfo = {"uniqueName":{"share":"share164033342544101100","dir":"dir164033342743603739","destdir":"destdir164033342800501066"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164033342544101100')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Fri, 24 Dec 2021 08:10:27 GMT',
  'ETag',
  '"0x8D9C6B4D84D025A"',
  'x-ms-request-id',
  '216866fe-201a-0006-499d-f803a9000000',
  'x-ms-client-request-id',
  'f5b664d8-a79a-40f1-90f9-8b38ad500a6e',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Fri, 24 Dec 2021 08:10:27 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164033342544101100/dir164033342743603739')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Fri, 24 Dec 2021 08:10:28 GMT',
  'ETag',
  '"0x8D9C6B4D8B11796"',
  'x-ms-request-id',
  '21686701-201a-0006-4a9d-f803a9000000',
  'x-ms-client-request-id',
  '97b81378-1396-4350-b27d-8a8f38accc3b',
  'x-ms-version',
  '2021-04-10',
  'x-ms-file-change-time',
  '2021-12-24T08:10:28.1533334Z',
  'x-ms-file-last-write-time',
  '2021-12-24T08:10:28.1533334Z',
  'x-ms-file-creation-time',
  '2021-12-24T08:10:28.1533334Z',
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
  'Fri, 24 Dec 2021 08:10:27 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164033342544101100/destdir164033342800501066')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Fri, 24 Dec 2021 08:10:28 GMT',
  'ETag',
  '"0x8D9C6B4D8E19E48"',
  'x-ms-request-id',
  '21686703-201a-0006-4b9d-f803a9000000',
  'x-ms-client-request-id',
  'c42906df-66b5-4637-9460-adc80af7d08b',
  'x-ms-version',
  '2021-04-10',
  'x-ms-file-change-time',
  '2021-12-24T08:10:28.4713544Z',
  'x-ms-file-last-write-time',
  '2021-12-24T08:10:28.4713544Z',
  'x-ms-file-creation-time',
  '2021-12-24T08:10:28.4713544Z',
  'x-ms-file-permission-key',
  '14515944266653103543*3117928199373521617',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 24 Dec 2021 08:10:27 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164033342544101100/destdir164033342800501066')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Fri, 24 Dec 2021 08:10:28 GMT',
  'ETag',
  '"0x8D9C6B4D8E19E48"',
  'x-ms-request-id',
  '21686704-201a-0006-4c9d-f803a9000000',
  'x-ms-client-request-id',
  '09d0ccbf-6d55-4a66-84e0-76d1380037f9',
  'x-ms-version',
  '2021-04-10',
  'x-ms-lease-id',
  'e9890485-bf47-4d9a-b3d0-aceb18506124',
  'Date',
  'Fri, 24 Dec 2021 08:10:28 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164033342544101100/destdir164033342800501066')
  .query(true)
  .reply(200, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Fri, 24 Dec 2021 08:10:29 GMT',
  'ETag',
  '"0x8D9C6B4D93EDAF1"',
  'x-ms-request-id',
  '21686705-201a-0006-4d9d-f803a9000000',
  'x-ms-client-request-id',
  '1393f899-36a8-4f9f-9396-a576825125fa',
  'x-ms-version',
  '2021-04-10',
  'x-ms-file-change-time',
  '2021-12-24T08:10:29.0823921Z',
  'x-ms-file-last-write-time',
  '2021-12-24T08:10:28.1533334Z',
  'x-ms-file-creation-time',
  '2021-12-24T08:10:28.1533334Z',
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
  'Fri, 24 Dec 2021 08:10:28 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share164033342544101100/destdir164033342800501066')
  .query(true)
  .reply(200, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Fri, 24 Dec 2021 08:10:29 GMT',
  'ETag',
  '"0x8D9C6B4D93EDAF1"',
  'x-ms-request-id',
  '21686707-201a-0006-4e9d-f803a9000000',
  'x-ms-client-request-id',
  '0076bd8c-c66a-4f74-8f51-4afdfd196f09',
  'x-ms-version',
  '2021-04-10',
  'x-ms-server-encrypted',
  'true',
  'x-ms-file-change-time',
  '2021-12-24T08:10:29.0823921Z',
  'x-ms-file-last-write-time',
  '2021-12-24T08:10:28.1533334Z',
  'x-ms-file-creation-time',
  '2021-12-24T08:10:28.1533334Z',
  'x-ms-file-permission-key',
  '12098348342869812368*3117928199373521617',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Last-Modified,ETag,x-ms-server-encrypted,x-ms-file-change-time,x-ms-file-last-write-time,x-ms-file-creation-time,x-ms-file-permission-key,x-ms-file-attributes,x-ms-file-id,x-ms-file-parent-id',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 24 Dec 2021 08:10:28 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share164033342544101100/dir164033342743603739')
  .query(true)
  .reply(404, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>ResourceNotFound</Code><Message>The specified resource does not exist.\nRequestId:21686708-201a-0006-4f9d-f803a9000000\nTime:2021-12-24T08:10:29.6854663Z</Message></Error>", [
  'Content-Length',
  '223',
  'Content-Type',
  'application/xml',
  'x-ms-request-id',
  '21686708-201a-0006-4f9d-f803a9000000',
  'x-ms-client-request-id',
  '4f53506f-1cd0-4f68-9761-2e4c8cb45be6',
  'x-ms-version',
  '2021-04-10',
  'x-ms-error-code',
  'ResourceNotFound',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 24 Dec 2021 08:10:28 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share164033342544101100')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '21686709-201a-0006-509d-f803a9000000',
  'x-ms-client-request-id',
  '1990c126-03e4-4bf5-90b7-dd76ad93798d',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Fri, 24 Dec 2021 08:10:30 GMT'
]);
