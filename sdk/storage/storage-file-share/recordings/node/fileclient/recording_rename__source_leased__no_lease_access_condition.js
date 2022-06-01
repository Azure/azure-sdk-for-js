let nock = require('nock');

module.exports.hash = "32d04a7626bdf15869330389d451c495";

module.exports.testInfo = {"uniqueName":{"share":"share164033588581600611","dir":"dir164033588606509669","file":"file164033588632105411","sourcefile":"sourcefile164033588632101110","destfile":"destfile164033588682008608"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164033588581600611')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Fri, 24 Dec 2021 08:51:26 GMT',
  'ETag',
  '"0x8D9C6BA91D5F954"',
  'x-ms-request-id',
  '21686e02-201a-0006-5ca3-f803a9000000',
  'x-ms-client-request-id',
  'c1183cc0-01c5-44dc-ab9c-711db2db8235',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Fri, 24 Dec 2021 08:51:26 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164033588581600611/dir164033588606509669')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Fri, 24 Dec 2021 08:51:26 GMT',
  'ETag',
  '"0x8D9C6BA91FDB99A"',
  'x-ms-request-id',
  '21686e04-201a-0006-5da3-f803a9000000',
  'x-ms-client-request-id',
  'cc146a87-6363-4fbb-9741-afcfb5c88c66',
  'x-ms-version',
  '2021-04-10',
  'x-ms-file-change-time',
  '2021-12-24T08:51:26.5176986Z',
  'x-ms-file-last-write-time',
  '2021-12-24T08:51:26.5176986Z',
  'x-ms-file-creation-time',
  '2021-12-24T08:51:26.5176986Z',
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
  'Fri, 24 Dec 2021 08:51:26 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164033588581600611/sourcefile164033588632101110')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Fri, 24 Dec 2021 08:51:26 GMT',
  'ETag',
  '"0x8D9C6BA9224A33C"',
  'x-ms-request-id',
  '21686e05-201a-0006-5ea3-f803a9000000',
  'x-ms-client-request-id',
  '2c152dab-c45f-46c7-8021-34d46d29f40d',
  'x-ms-version',
  '2021-04-10',
  'x-ms-file-change-time',
  '2021-12-24T08:51:26.7727164Z',
  'x-ms-file-last-write-time',
  '2021-12-24T08:51:26.7727164Z',
  'x-ms-file-creation-time',
  '2021-12-24T08:51:26.7727164Z',
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
  'Fri, 24 Dec 2021 08:51:26 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164033588581600611/sourcefile164033588632101110')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Fri, 24 Dec 2021 08:51:26 GMT',
  'ETag',
  '"0x8D9C6BA9224A33C"',
  'x-ms-request-id',
  '21686e06-201a-0006-5fa3-f803a9000000',
  'x-ms-client-request-id',
  '2ead4481-3e01-4173-8252-ab689078119f',
  'x-ms-version',
  '2021-04-10',
  'x-ms-lease-id',
  'c7c81970-d98f-42c1-a1dd-aba9eb3e6d8e',
  'Date',
  'Fri, 24 Dec 2021 08:51:26 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164033588581600611/destfile164033588682008608')
  .query(true)
  .reply(412, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>LeaseIdMissing</Code><Message>There is currently a lease on the file and no lease ID was specified in the request.\nRequestId:21686e07-201a-0006-60a3-f803a9000000\nTime:2021-12-24T08:51:27.2662011Z</Message></Error>", [
  'Content-Length',
  '267',
  'Content-Type',
  'application/xml',
  'x-ms-request-id',
  '21686e07-201a-0006-60a3-f803a9000000',
  'x-ms-client-request-id',
  'd49d9041-60a5-466d-b215-2b754ac78202',
  'x-ms-version',
  '2021-04-10',
  'x-ms-error-code',
  'LeaseIdMissing',
  'Date',
  'Fri, 24 Dec 2021 08:51:26 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share164033588581600611/sourcefile164033588632101110')
  .reply(200, "", [
  'Content-Length',
  '1024',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Fri, 24 Dec 2021 08:51:26 GMT',
  'ETag',
  '"0x8D9C6BA9224A33C"',
  'x-ms-request-id',
  '21686e08-201a-0006-61a3-f803a9000000',
  'x-ms-client-request-id',
  '347f41a8-7fe9-413f-89cd-14b4235dbd20',
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
  '2021-12-24T08:51:26.7727164Z',
  'x-ms-file-last-write-time',
  '2021-12-24T08:51:26.7727164Z',
  'x-ms-file-creation-time',
  '2021-12-24T08:51:26.7727164Z',
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
  'Fri, 24 Dec 2021 08:51:27 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share164033588581600611')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '21686e09-201a-0006-62a3-f803a9000000',
  'x-ms-client-request-id',
  '0288689f-6bb7-4dfc-8625-a26d6b6d573d',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Fri, 24 Dec 2021 08:51:27 GMT'
]);
