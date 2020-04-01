let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"share":"share157613037289309910","dir":"dir157613037412309108","file":"file157613037527405742"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157613037289309910')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 12 Dec 2019 05:59:33 GMT',
  'ETag',
  '"0x8D77EC87651FABB"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bf37437e-201a-0011-07b1-b0088f000000',
  'x-ms-client-request-id',
  '29e263a2-42ba-4653-9e81-eaa25fb4dbea',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 12 Dec 2019 05:59:33 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157613037289309910/dir157613037412309108')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 12 Dec 2019 05:59:35 GMT',
  'ETag',
  '"0x8D77EC8770F143F"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'dbdd2abc-501a-0024-27b1-b0649b000000',
  'x-ms-client-request-id',
  'c735780a-2878-417a-8256-d94af8cd7a3d',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-12-12T05:59:35.2250431Z',
  'x-ms-file-last-write-time',
  '2019-12-12T05:59:35.2250431Z',
  'x-ms-file-creation-time',
  '2019-12-12T05:59:35.2250431Z',
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
  'Thu, 12 Dec 2019 05:59:34 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157613037289309910/dir157613037412309108/file157613037527405742')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 12 Dec 2019 05:59:36 GMT',
  'ETag',
  '"0x8D77EC877CF7ED7"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f44c93bb-301a-0040-08b1-b09503000000',
  'x-ms-client-request-id',
  '4ca0ebda-2927-4e07-8cc2-50bc0887b17b',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-12-12T05:59:36.4860631Z',
  'x-ms-file-last-write-time',
  '2019-12-12T05:59:36.4860631Z',
  'x-ms-file-creation-time',
  '2019-12-12T05:59:36.4860631Z',
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
  'Thu, 12 Dec 2019 05:59:36 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157613037289309910/dir157613037412309108/file157613037527405742')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Thu, 12 Dec 2019 05:59:36 GMT',
  'ETag',
  '"0x8D77EC877CF7ED7"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '89ce1721-201a-0001-07b1-b0cde7000000',
  'x-ms-client-request-id',
  '8928d8e6-51ab-401f-b7ff-3d484fda839d',
  'x-ms-version',
  '2019-02-02',
  'x-ms-lease-id',
  'e9890485-bf47-4d9a-b3d0-aceb18506124',
  'Date',
  'Thu, 12 Dec 2019 05:59:36 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share157613037289309910/dir157613037412309108/file157613037527405742')
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Thu, 12 Dec 2019 05:59:36 GMT',
  'ETag',
  '"0x8D77EC877CF7ED7"',
  'Vary',
  'Origin',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f44c93c3-301a-0040-0bb1-b09503000000',
  'x-ms-client-request-id',
  '922c4c3d-1161-453a-a8f9-0b7f94586f78',
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
  '2019-12-12T05:59:36.4860631Z',
  'x-ms-file-last-write-time',
  '2019-12-12T05:59:36.4860631Z',
  'x-ms-file-creation-time',
  '2019-12-12T05:59:36.4860631Z',
  'x-ms-file-permission-key',
  '11619239463300764278*693339914461510392',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '13835093239654252544',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'Date',
  'Thu, 12 Dec 2019 05:59:37 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157613037289309910/dir157613037412309108/file157613037527405742')
  .reply(412, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>LeaseIdMissing</Code><Message>There is currently a lease on the file and no lease ID was specified in the request.\nRequestId:f44c93c4-301a-0040-0cb1-b09503000000\nTime:2019-12-12T05:59:38.2699717Z</Message></Error>", [
  'Content-Length',
  '267',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f44c93c4-301a-0040-0cb1-b09503000000',
  'x-ms-client-request-id',
  'f80e9b36-ac87-4664-9aa4-0aa07577ac66',
  'x-ms-version',
  '2019-02-02',
  'x-ms-error-code',
  'LeaseIdMissing',
  'Date',
  'Thu, 12 Dec 2019 05:59:37 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157613037289309910/dir157613037412309108/file157613037527405742')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 12 Dec 2019 05:59:38 GMT',
  'ETag',
  '"0x8D77EC8790CE0A8"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f44c93c8-301a-0040-0fb1-b09503000000',
  'x-ms-client-request-id',
  '2d1818ef-8751-40e7-ba06-0ab3bca71dc6',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-12-12T05:59:38.5660584Z',
  'x-ms-file-last-write-time',
  '2019-12-12T05:59:38.5660584Z',
  'x-ms-file-creation-time',
  '2019-12-12T05:59:38.5660584Z',
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
  'Thu, 12 Dec 2019 05:59:38 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share157613037289309910/dir157613037412309108/file157613037527405742')
  .reply(200, "\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000", [
  'Content-Length',
  '10',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Thu, 12 Dec 2019 05:59:38 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D77EC8790CE0A8"',
  'Vary',
  'Origin',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f44c93c9-301a-0040-10b1-b09503000000',
  'x-ms-client-request-id',
  '38e86806-6464-4f8f-8f35-e10f139c164b',
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
  '2019-12-12T05:59:38.5660584Z',
  'x-ms-file-last-write-time',
  '2019-12-12T05:59:38.5660584Z',
  'x-ms-file-creation-time',
  '2019-12-12T05:59:38.5660584Z',
  'x-ms-file-permission-key',
  '11619239463300764278*693339914461510392',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '13835093239654252544',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'Date',
  'Thu, 12 Dec 2019 05:59:38 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157613037289309910/dir157613037412309108/file157613037527405742')
  .query(true)
  .reply(200, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Thu, 12 Dec 2019 05:59:38 GMT',
  'ETag',
  '"0x8D77EC8790CE0A8"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '89ce1726-201a-0001-08b1-b0cde7000000',
  'x-ms-client-request-id',
  '88ca023d-8638-4c1c-9008-320ec65c19ec',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 12 Dec 2019 05:59:39 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share157613037289309910')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bf374388-201a-0011-0ab1-b0088f000000',
  'x-ms-client-request-id',
  '1b8785f8-90e7-4f29-a650-1468a33ae9db',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 12 Dec 2019 05:59:39 GMT'
]);
