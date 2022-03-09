let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"share":"share157613047645901459","dir":"dir157613047761002860","file":"file157613047875905892"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157613047645901459')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 12 Dec 2019 06:01:17 GMT',
  'ETag',
  '"0x8D77EC8B40D0DF8"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '96e4e976-101a-0035-6ab1-b0fe2f000000',
  'x-ms-client-request-id',
  'cdd7544a-a303-4d57-ab15-dc24932e3562',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 12 Dec 2019 06:01:17 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157613047645901459/dir157613047761002860')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 12 Dec 2019 06:01:18 GMT',
  'ETag',
  '"0x8D77EC8B4BCF75E"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '96e4e97b-101a-0035-6bb1-b0fe2f000000',
  'x-ms-client-request-id',
  '2183f56b-b705-4865-b103-28ebc3a9ff40',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-12-12T06:01:18.7056478Z',
  'x-ms-file-last-write-time',
  '2019-12-12T06:01:18.7056478Z',
  'x-ms-file-creation-time',
  '2019-12-12T06:01:18.7056478Z',
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
  'Thu, 12 Dec 2019 06:01:18 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157613047645901459/dir157613047761002860/file157613047875905892')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 12 Dec 2019 06:01:19 GMT',
  'ETag',
  '"0x8D77EC8B56DABC1"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6abb4983-901a-0004-06b1-b01f3c000000',
  'x-ms-client-request-id',
  '218172f2-5e58-4791-9720-ed71089566d4',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-12-12T06:01:19.8636993Z',
  'x-ms-file-last-write-time',
  '2019-12-12T06:01:19.8636993Z',
  'x-ms-file-creation-time',
  '2019-12-12T06:01:19.8636993Z',
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
  'Thu, 12 Dec 2019 06:01:19 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157613047645901459/dir157613047761002860/file157613047875905892')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Thu, 12 Dec 2019 06:01:19 GMT',
  'ETag',
  '"0x8D77EC8B56DABC1"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6845b657-b01a-002c-64b1-b07e94000000',
  'x-ms-client-request-id',
  '2d04f11e-ae16-42d1-aa0a-b755080955b0',
  'x-ms-version',
  '2019-02-02',
  'x-ms-lease-id',
  'e9890485-bf47-4d9a-b3d0-aceb18506124',
  'Date',
  'Thu, 12 Dec 2019 06:01:20 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157613047645901459/dir157613047761002860/file157613047875905892')
  .query(true)
  .reply(412, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>LeaseIdMissing</Code><Message>There is currently a lease on the file and no lease ID was specified in the request.\nRequestId:6abb4988-901a-0004-07b1-b01f3c000000\nTime:2019-12-12T06:01:21.3251536Z</Message></Error>", [
  'Content-Length',
  '267',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6abb4988-901a-0004-07b1-b01f3c000000',
  'x-ms-client-request-id',
  '954895c6-fecd-449a-ac7f-898610d9307b',
  'x-ms-version',
  '2019-02-02',
  'x-ms-error-code',
  'LeaseIdMissing',
  'Date',
  'Thu, 12 Dec 2019 06:01:20 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157613047645901459/dir157613047761002860/file157613047875905892')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 12 Dec 2019 06:01:21 GMT',
  'ETag',
  '"0x8D77EC8B6799E4A"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6abb498a-901a-0004-08b1-b01f3c000000',
  'x-ms-client-request-id',
  'cf6dd6be-36c6-4c16-b294-966655db7e5f',
  'x-ms-version',
  '2019-02-02',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 12 Dec 2019 06:01:20 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share157613047645901459')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '96e4e97f-101a-0035-6cb1-b0fe2f000000',
  'x-ms-client-request-id',
  'a4e9f20a-628c-4217-bd83-2ed737c6ae2e',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 12 Dec 2019 06:01:21 GMT'
]);
