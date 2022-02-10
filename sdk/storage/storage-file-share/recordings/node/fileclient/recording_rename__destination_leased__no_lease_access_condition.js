let nock = require('nock');

module.exports.hash = "e2e6113a471c8fc67bb195f8af233a86";

module.exports.testInfo = {"uniqueName":{"share":"share164033527042300793","dir":"dir164033527067802477","file":"file164033527094301146","sourcefile":"sourcefile164033527094303634","destfile":"destfile164033527120200863"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164033527042300793')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Fri, 24 Dec 2021 08:41:10 GMT',
  'ETag',
  '"0x8D9C6B92308531F"',
  'x-ms-request-id',
  '7edfb560-701a-0008-12a2-f8c247000000',
  'x-ms-client-request-id',
  '17b0e5d5-de31-492d-9abb-279ee8d3127b',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Fri, 24 Dec 2021 08:41:10 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164033527042300793/dir164033527067802477')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Fri, 24 Dec 2021 08:41:11 GMT',
  'ETag',
  '"0x8D9C6B9233105A1"',
  'x-ms-request-id',
  '7edfb562-701a-0008-13a2-f8c247000000',
  'x-ms-client-request-id',
  '1be254c1-07aa-4256-88f9-982bd5ae061a',
  'x-ms-version',
  '2021-04-10',
  'x-ms-file-change-time',
  '2021-12-24T08:41:11.1300513Z',
  'x-ms-file-last-write-time',
  '2021-12-24T08:41:11.1300513Z',
  'x-ms-file-creation-time',
  '2021-12-24T08:41:11.1300513Z',
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
  'Fri, 24 Dec 2021 08:41:10 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164033527042300793/sourcefile164033527094303634')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Fri, 24 Dec 2021 08:41:11 GMT',
  'ETag',
  '"0x8D9C6B92358D99C"',
  'x-ms-request-id',
  '7edfb565-701a-0008-14a2-f8c247000000',
  'x-ms-client-request-id',
  '9892a799-acf9-41c1-9052-ca6715dee4c4',
  'x-ms-version',
  '2021-04-10',
  'x-ms-file-change-time',
  '2021-12-24T08:41:11.3910684Z',
  'x-ms-file-last-write-time',
  '2021-12-24T08:41:11.3910684Z',
  'x-ms-file-creation-time',
  '2021-12-24T08:41:11.3910684Z',
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
  'Fri, 24 Dec 2021 08:41:10 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164033527042300793/destfile164033527120200863')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Fri, 24 Dec 2021 08:41:11 GMT',
  'ETag',
  '"0x8D9C6B9237F4DF4"',
  'x-ms-request-id',
  '7edfb566-701a-0008-15a2-f8c247000000',
  'x-ms-client-request-id',
  'f47a3b03-bc0f-4986-9471-80dc80c1e4c8',
  'x-ms-version',
  '2021-04-10',
  'x-ms-file-change-time',
  '2021-12-24T08:41:11.6430836Z',
  'x-ms-file-last-write-time',
  '2021-12-24T08:41:11.6430836Z',
  'x-ms-file-creation-time',
  '2021-12-24T08:41:11.6430836Z',
  'x-ms-file-permission-key',
  '14515944266653103543*3117928199373521617',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '16140971433240035328',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 24 Dec 2021 08:41:11 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164033527042300793/destfile164033527120200863')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Fri, 24 Dec 2021 08:41:11 GMT',
  'ETag',
  '"0x8D9C6B9237F4DF4"',
  'x-ms-request-id',
  '7edfb568-701a-0008-16a2-f8c247000000',
  'x-ms-client-request-id',
  '63dac58c-a702-4f8e-bb2d-f48a7313aa16',
  'x-ms-version',
  '2021-04-10',
  'x-ms-lease-id',
  'e9890485-bf47-4d9a-b3d0-aceb18506124',
  'Date',
  'Fri, 24 Dec 2021 08:41:11 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164033527042300793/destfile164033527120200863')
  .query(true)
  .reply(412, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>LeaseIdMissing</Code><Message>There is currently a lease on the file and no lease ID was specified in the request.\nRequestId:7edfb569-701a-0008-17a2-f8c247000000\nTime:2021-12-24T08:41:12.1743613Z</Message></Error>", [
  'Content-Length',
  '267',
  'Content-Type',
  'application/xml',
  'x-ms-request-id',
  '7edfb569-701a-0008-17a2-f8c247000000',
  'x-ms-client-request-id',
  '7bf645e1-ce63-4440-844d-3b9168b9fc5f',
  'x-ms-version',
  '2021-04-10',
  'x-ms-error-code',
  'LeaseIdMissing',
  'Date',
  'Fri, 24 Dec 2021 08:41:11 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share164033527042300793/sourcefile164033527094303634')
  .reply(200, "", [
  'Content-Length',
  '1024',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Fri, 24 Dec 2021 08:41:11 GMT',
  'ETag',
  '"0x8D9C6B92358D99C"',
  'x-ms-request-id',
  '7edfb56a-701a-0008-18a2-f8c247000000',
  'x-ms-client-request-id',
  'c9d6e104-0bf6-4b6d-82dc-bbf76708b128',
  'x-ms-version',
  '2021-04-10',
  'x-ms-type',
  'File',
  'x-ms-server-encrypted',
  'true',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-file-change-time',
  '2021-12-24T08:41:11.3910684Z',
  'x-ms-file-last-write-time',
  '2021-12-24T08:41:11.3910684Z',
  'x-ms-file-creation-time',
  '2021-12-24T08:41:11.3910684Z',
  'x-ms-file-permission-key',
  '14515944266653103543*3117928199373521617',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '0',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-type,x-ms-server-encrypted,x-ms-lease-status,x-ms-lease-state,x-ms-file-change-time,x-ms-file-last-write-time,x-ms-file-creation-time,x-ms-file-permission-key,x-ms-file-attributes,x-ms-file-id,x-ms-file-parent-id',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 24 Dec 2021 08:41:11 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share164033527042300793/destfile164033527120200863')
  .reply(200, "", [
  'Content-Length',
  '2048',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Fri, 24 Dec 2021 08:41:11 GMT',
  'ETag',
  '"0x8D9C6B9237F4DF4"',
  'x-ms-request-id',
  '7edfb56b-701a-0008-19a2-f8c247000000',
  'x-ms-client-request-id',
  '6d1e15f1-32d1-481c-9f39-0a06ea7e476e',
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
  '2021-12-24T08:41:11.6430836Z',
  'x-ms-file-last-write-time',
  '2021-12-24T08:41:11.6430836Z',
  'x-ms-file-creation-time',
  '2021-12-24T08:41:11.6430836Z',
  'x-ms-file-permission-key',
  '14515944266653103543*3117928199373521617',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '16140971433240035328',
  'x-ms-file-parent-id',
  '0',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-type,x-ms-server-encrypted,x-ms-lease-status,x-ms-lease-state,x-ms-lease-duration,x-ms-file-change-time,x-ms-file-last-write-time,x-ms-file-creation-time,x-ms-file-permission-key,x-ms-file-attributes,x-ms-file-id,x-ms-file-parent-id',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 24 Dec 2021 08:41:12 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share164033527042300793')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '7edfb56c-701a-0008-1aa2-f8c247000000',
  'x-ms-client-request-id',
  '7a687aa9-9164-46a7-bb95-a43be37ed1d1',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Fri, 24 Dec 2021 08:41:12 GMT'
]);
