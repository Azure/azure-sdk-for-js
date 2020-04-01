let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"share":"share157613050289002285","dir":"dir157613050403106522","file":"file157613050517200592"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157613050289002285')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 12 Dec 2019 06:01:43 GMT',
  'ETag',
  '"0x8D77EC8C3CD6732"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '89ce17d4-201a-0001-2db1-b0cde7000000',
  'x-ms-client-request-id',
  '07f54555-a51e-4397-b4ca-1a2e9e037386',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 12 Dec 2019 06:01:43 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157613050289002285/dir157613050403106522')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 12 Dec 2019 06:01:45 GMT',
  'ETag',
  '"0x8D77EC8C47BE9B2"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b63f91d8-401a-0038-03b1-b036fb000000',
  'x-ms-client-request-id',
  'acd19644-eb82-4a0f-8f89-fc5a7605c00c',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-12-12T06:01:45.1228594Z',
  'x-ms-file-last-write-time',
  '2019-12-12T06:01:45.1228594Z',
  'x-ms-file-creation-time',
  '2019-12-12T06:01:45.1228594Z',
  'x-ms-file-permission-key',
  '7008756509702647153*693339914461510392',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 12 Dec 2019 06:01:45 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157613050289002285/dir157613050403106522/file157613050517200592')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 12 Dec 2019 06:02:01 GMT',
  'ETag',
  '"0x8D77EC8CE1CAE3B"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7d134d6f-f01a-003d-39b1-b0e420000000',
  'x-ms-client-request-id',
  '391b5011-d98e-4806-ab1a-80fbbc61d917',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-12-12T06:02:01.2759611Z',
  'x-ms-file-last-write-time',
  '2019-12-12T06:02:01.2759611Z',
  'x-ms-file-creation-time',
  '2019-12-12T06:02:01.2759611Z',
  'x-ms-file-permission-key',
  '11619239463300764278*693339914461510392',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '13835093239654252544',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 12 Dec 2019 06:02:01 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157613050289002285/dir157613050403106522/file157613050517200592')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Thu, 12 Dec 2019 06:02:01 GMT',
  'ETag',
  '"0x8D77EC8CE1CAE3B"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f44c95f2-301a-0040-25b1-b09503000000',
  'x-ms-client-request-id',
  '75b172b2-3197-46a6-abaa-a8376a0fc10e',
  'x-ms-version',
  '2019-02-02',
  'x-ms-lease-id',
  '5e116241-7b9d-4350-a4b5-aa751526e847',
  'Date',
  'Thu, 12 Dec 2019 06:02:02 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share157613050289002285/dir157613050403106522/file157613050517200592')
  .reply(200, "\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Thu, 12 Dec 2019 06:02:01 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D77EC8CE1CAE3B"',
  'Vary',
  'Origin',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7d134d73-f01a-003d-3bb1-b0e420000000',
  'x-ms-client-request-id',
  '3ae7add1-5bcc-427f-9714-f39517fe765f',
  'x-ms-version',
  '2019-02-02',
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
  '2019-12-12T06:02:01.2759611Z',
  'x-ms-file-last-write-time',
  '2019-12-12T06:02:01.2759611Z',
  'x-ms-file-creation-time',
  '2019-12-12T06:02:01.2759611Z',
  'x-ms-file-permission-key',
  '11619239463300764278*693339914461510392',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '13835093239654252544',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'Date',
  'Thu, 12 Dec 2019 06:02:02 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share157613050289002285/dir157613050403106522/file157613050517200592')
  .reply(412, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>LeaseIdMismatchWithFileOperation</Code><Message>The lease ID specified did not match the lease ID for the file.\nRequestId:7d134d75-f01a-003d-3db1-b0e420000000\nTime:2019-12-12T06:02:03.0126372Z</Message></Error>", [
  'Content-Length',
  '264',
  'Content-Type',
  'application/xml',
  'Vary',
  'Origin',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7d134d75-f01a-003d-3db1-b0e420000000',
  'x-ms-client-request-id',
  '0f619712-442a-42b0-b8a0-a460665551fe',
  'x-ms-version',
  '2019-02-02',
  'x-ms-error-code',
  'LeaseIdMismatchWithFileOperation',
  'Date',
  'Thu, 12 Dec 2019 06:02:02 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share157613050289002285/dir157613050403106522/file157613050517200592')
  .reply(200, "\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Thu, 12 Dec 2019 06:02:01 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D77EC8CE1CAE3B"',
  'Vary',
  'Origin',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7d134d76-f01a-003d-3eb1-b0e420000000',
  'x-ms-client-request-id',
  '420c74e7-05c8-4fed-a77f-9f9b6e14d966',
  'x-ms-version',
  '2019-02-02',
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
  '2019-12-12T06:02:01.2759611Z',
  'x-ms-file-last-write-time',
  '2019-12-12T06:02:01.2759611Z',
  'x-ms-file-creation-time',
  '2019-12-12T06:02:01.2759611Z',
  'x-ms-file-permission-key',
  '11619239463300764278*693339914461510392',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '13835093239654252544',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'Date',
  'Thu, 12 Dec 2019 06:02:02 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share157613050289002285')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '89ce17f2-201a-0001-32b1-b0cde7000000',
  'x-ms-client-request-id',
  'b9122f91-390e-4950-9b2f-f5d26bf52746',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 12 Dec 2019 06:02:03 GMT'
]);
