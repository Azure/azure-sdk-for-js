let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"share":"share157613027160804813","dir":"dir157613027275605218","file":"file157613027390500786"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157613027160804813')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 12 Dec 2019 05:57:52 GMT',
  'ETag',
  '"0x8D77EC839F37C19"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9531b0cd-b01a-0003-28b1-b0735f000000',
  'x-ms-client-request-id',
  'd4bd26bc-7073-4a79-8f6d-2193c0be4f10',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 12 Dec 2019 05:57:52 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157613027160804813/dir157613027275605218')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 12 Dec 2019 05:57:53 GMT',
  'ETag',
  '"0x8D77EC83AA323EC"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '33dfed14-c01a-0044-80b1-b01804000000',
  'x-ms-client-request-id',
  '5ca4ea59-9076-413f-8138-8625dd569da3',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-12-12T05:57:53.8543596Z',
  'x-ms-file-last-write-time',
  '2019-12-12T05:57:53.8543596Z',
  'x-ms-file-creation-time',
  '2019-12-12T05:57:53.8543596Z',
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
  'Thu, 12 Dec 2019 05:57:53 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157613027160804813/dir157613027275605218/file157613027390500786')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 12 Dec 2019 05:57:55 GMT',
  'ETag',
  '"0x8D77EC83B5426BC"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '14473937-f01a-0002-46b1-b02c83000000',
  'x-ms-client-request-id',
  '7ea29544-a2ec-4a5b-bb03-e3c78448ffd3',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-12-12T05:57:55.0144188Z',
  'x-ms-file-last-write-time',
  '2019-12-12T05:57:55.0144188Z',
  'x-ms-file-creation-time',
  '2019-12-12T05:57:55.0144188Z',
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
  'Thu, 12 Dec 2019 05:57:54 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157613027160804813/dir157613027275605218/file157613027390500786')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Thu, 12 Dec 2019 05:57:55 GMT',
  'ETag',
  '"0x8D77EC83B5426BC"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9da1f1b1-701a-0033-4db1-b0cd90000000',
  'x-ms-client-request-id',
  '6c630f50-2f39-4d85-a12e-fdc0b007ba12',
  'x-ms-version',
  '2019-02-02',
  'x-ms-lease-id',
  '4ac95640-e971-4df7-8f60-7c0c319d636b',
  'Date',
  'Thu, 12 Dec 2019 05:57:55 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157613027160804813/dir157613027275605218/file157613027390500786')
  .query(true)
  .reply(409, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>LeaseAlreadyPresent</Code><Message>There is already a lease present.\nRequestId:2907a8bc-a01a-0030-29b1-b02cf4000000\nTime:2019-12-12T05:58:12.3050007Z</Message></Error>", [
  'Content-Length',
  '221',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2907a8bc-a01a-0030-29b1-b02cf4000000',
  'x-ms-client-request-id',
  '1d63c2b2-b060-4e1f-abf8-733037697b9f',
  'x-ms-version',
  '2019-02-02',
  'x-ms-error-code',
  'LeaseAlreadyPresent',
  'Date',
  'Thu, 12 Dec 2019 05:58:12 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share157613027160804813')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9531b153-b01a-0003-11b1-b0735f000000',
  'x-ms-client-request-id',
  'a00a0eb2-927d-4048-ba38-cc316cab90fb',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 12 Dec 2019 05:58:11 GMT'
]);
