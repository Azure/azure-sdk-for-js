let nock = require('nock');

module.exports.hash = "545267af643428a4f8562af344d21f96";

module.exports.testInfo = {"uniqueName":{"share":"share164033342986708722","dir":"dir164033343012303971","destdir":"destdir164033343038603457"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164033342986708722')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Fri, 24 Dec 2021 08:10:30 GMT',
  'ETag',
  '"0x8D9C6B4D9F6958F"',
  'x-ms-request-id',
  '2168670a-201a-0006-519d-f803a9000000',
  'x-ms-client-request-id',
  '9d260bc3-f6e3-4c83-9204-d7345fe38ab4',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Fri, 24 Dec 2021 08:10:30 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164033342986708722/dir164033343012303971')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Fri, 24 Dec 2021 08:10:30 GMT',
  'ETag',
  '"0x8D9C6B4DA1FA1A9"',
  'x-ms-request-id',
  '2168670c-201a-0006-529d-f803a9000000',
  'x-ms-client-request-id',
  'c5bc6ed4-4354-4afd-8fab-716a60a789b7',
  'x-ms-version',
  '2021-04-10',
  'x-ms-file-change-time',
  '2021-12-24T08:10:30.5554857Z',
  'x-ms-file-last-write-time',
  '2021-12-24T08:10:30.5554857Z',
  'x-ms-file-creation-time',
  '2021-12-24T08:10:30.5554857Z',
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
  'Fri, 24 Dec 2021 08:10:30 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164033342986708722/destdir164033343038603457')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Fri, 24 Dec 2021 08:10:30 GMT',
  'ETag',
  '"0x8D9C6B4DA488710"',
  'x-ms-request-id',
  '2168670d-201a-0006-539d-f803a9000000',
  'x-ms-client-request-id',
  '0fbe544e-de27-4e23-b7f6-e905ca3ec9ee',
  'x-ms-version',
  '2021-04-10',
  'x-ms-file-change-time',
  '2021-12-24T08:10:30.8235024Z',
  'x-ms-file-last-write-time',
  '2021-12-24T08:10:30.8235024Z',
  'x-ms-file-creation-time',
  '2021-12-24T08:10:30.8235024Z',
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
  'Fri, 24 Dec 2021 08:10:30 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164033342986708722/destdir164033343038603457')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Fri, 24 Dec 2021 08:10:30 GMT',
  'ETag',
  '"0x8D9C6B4DA488710"',
  'x-ms-request-id',
  '2168670e-201a-0006-549d-f803a9000000',
  'x-ms-client-request-id',
  'bbb34479-f420-462b-b817-3d77ed686264',
  'x-ms-version',
  '2021-04-10',
  'x-ms-lease-id',
  'e9890485-bf47-4d9a-b3d0-aceb18506124',
  'Date',
  'Fri, 24 Dec 2021 08:10:31 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164033342986708722/destdir164033343038603457')
  .query(true)
  .reply(412, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>LeaseIdMissing</Code><Message>There is currently a lease on the file and no lease ID was specified in the request.\nRequestId:2168670f-201a-0006-559d-f803a9000000\nTime:2021-12-24T08:10:31.3384926Z</Message></Error>", [
  'Content-Length',
  '267',
  'Content-Type',
  'application/xml',
  'x-ms-request-id',
  '2168670f-201a-0006-559d-f803a9000000',
  'x-ms-client-request-id',
  'ba59f29b-c83a-48f4-9f87-1c45cf46172e',
  'x-ms-version',
  '2021-04-10',
  'x-ms-error-code',
  'LeaseIdMissing',
  'Date',
  'Fri, 24 Dec 2021 08:10:31 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share164033342986708722/dir164033343012303971')
  .query(true)
  .reply(200, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Fri, 24 Dec 2021 08:10:30 GMT',
  'ETag',
  '"0x8D9C6B4DA1FA1A9"',
  'x-ms-request-id',
  '21686710-201a-0006-569d-f803a9000000',
  'x-ms-client-request-id',
  '41bd29a2-968f-47a6-8974-190eb21ba24b',
  'x-ms-version',
  '2021-04-10',
  'x-ms-server-encrypted',
  'true',
  'x-ms-file-change-time',
  '2021-12-24T08:10:30.5554857Z',
  'x-ms-file-last-write-time',
  '2021-12-24T08:10:30.5554857Z',
  'x-ms-file-creation-time',
  '2021-12-24T08:10:30.5554857Z',
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
  'Fri, 24 Dec 2021 08:10:31 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share164033342986708722/destdir164033343038603457')
  .reply(200, "", [
  'Content-Length',
  '1024',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Fri, 24 Dec 2021 08:10:30 GMT',
  'ETag',
  '"0x8D9C6B4DA488710"',
  'x-ms-request-id',
  '21686711-201a-0006-579d-f803a9000000',
  'x-ms-client-request-id',
  '659ddb13-c57a-435f-8c17-7944c1cd7650',
  'x-ms-version',
  '2021-04-10',
  'x-ms-type',
  'File',
  'x-ms-server-encrypted',
  'true',
  'x-ms-lease-status',
  'locked',
  'x-ms-lease-state',
  'leased',
  'x-ms-lease-duration',
  'infinite',
  'x-ms-file-change-time',
  '2021-12-24T08:10:30.8235024Z',
  'x-ms-file-last-write-time',
  '2021-12-24T08:10:30.8235024Z',
  'x-ms-file-creation-time',
  '2021-12-24T08:10:30.8235024Z',
  'x-ms-file-permission-key',
  '14515944266653103543*3117928199373521617',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '0',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-type,x-ms-server-encrypted,x-ms-lease-status,x-ms-lease-state,x-ms-lease-duration,x-ms-file-change-time,x-ms-file-last-write-time,x-ms-file-creation-time,x-ms-file-permission-key,x-ms-file-attributes,x-ms-file-id,x-ms-file-parent-id',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 24 Dec 2021 08:10:31 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share164033342986708722')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '21686712-201a-0006-589d-f803a9000000',
  'x-ms-client-request-id',
  '3ec44d56-a468-406d-8fe6-4abd9c1ddc7c',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Fri, 24 Dec 2021 08:10:32 GMT'
]);
