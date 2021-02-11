let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"share":"share157613037953707227","dir":"dir157613039568100501","file":"file157613039684601740"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157613037953707227')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 12 Dec 2019 05:59:55 GMT',
  'ETag',
  '"0x8D77EC883386860"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd53423e8-901a-0014-80b1-b0da54000000',
  'x-ms-client-request-id',
  'd865fe4f-2293-47a6-8cfc-ca44e5d8ab37',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 12 Dec 2019 05:59:55 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157613037953707227/dir157613039568100501')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 12 Dec 2019 05:59:56 GMT',
  'ETag',
  '"0x8D77EC883EA915D"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5200c3d8-a01a-0042-6fb1-b02bbb000000',
  'x-ms-client-request-id',
  '84be28c3-c032-47af-9a20-3689b00f1d8c',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-12-12T05:59:56.7961437Z',
  'x-ms-file-last-write-time',
  '2019-12-12T05:59:56.7961437Z',
  'x-ms-file-creation-time',
  '2019-12-12T05:59:56.7961437Z',
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
  'Thu, 12 Dec 2019 05:59:55 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157613037953707227/dir157613039568100501/file157613039684601740')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 12 Dec 2019 05:59:57 GMT',
  'ETag',
  '"0x8D77EC8849B9216"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '42e5fcbf-c01a-0026-55b1-b0da23000000',
  'x-ms-client-request-id',
  '947dbb96-9570-4cac-b387-a1e76cd350f2',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-12-12T05:59:57.9561494Z',
  'x-ms-file-last-write-time',
  '2019-12-12T05:59:57.9561494Z',
  'x-ms-file-creation-time',
  '2019-12-12T05:59:57.9561494Z',
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
  'Thu, 12 Dec 2019 05:59:57 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157613037953707227/dir157613039568100501/file157613039684601740')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Thu, 12 Dec 2019 05:59:57 GMT',
  'ETag',
  '"0x8D77EC8849B9216"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7c71490f-b01a-003c-1bb1-b0bbfc000000',
  'x-ms-client-request-id',
  'b97777c3-35a7-452d-8b8d-5b4a49c6c115',
  'x-ms-version',
  '2019-02-02',
  'x-ms-lease-id',
  'e9890485-bf47-4d9a-b3d0-aceb18506124',
  'Date',
  'Thu, 12 Dec 2019 05:59:58 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share157613037953707227/dir157613039568100501/file157613039684601740')
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Thu, 12 Dec 2019 05:59:57 GMT',
  'ETag',
  '"0x8D77EC8849B9216"',
  'Vary',
  'Origin',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '42e5fcc4-c01a-0026-58b1-b0da23000000',
  'x-ms-client-request-id',
  'ee74d3ca-6561-4fce-84b9-aa05148000dc',
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
  '2019-12-12T05:59:57.9561494Z',
  'x-ms-file-last-write-time',
  '2019-12-12T05:59:57.9561494Z',
  'x-ms-file-creation-time',
  '2019-12-12T05:59:57.9561494Z',
  'x-ms-file-permission-key',
  '11619239463300764278*693339914461510392',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '13835093239654252544',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'Date',
  'Thu, 12 Dec 2019 05:59:58 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157613037953707227/dir157613039568100501/file157613039684601740')
  .query(true)
  .reply(412, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>LeaseIdMissing</Code><Message>There is currently a lease on the file and no lease ID was specified in the request.\nRequestId:42e5fcc7-c01a-0026-5bb1-b0da23000000\nTime:2019-12-12T05:59:59.7651336Z</Message></Error>", [
  'Content-Length',
  '267',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '42e5fcc7-c01a-0026-5bb1-b0da23000000',
  'x-ms-client-request-id',
  'da82dc15-5e39-4c3d-a5ab-7bc3d0c7b903',
  'x-ms-version',
  '2019-02-02',
  'x-ms-error-code',
  'LeaseIdMissing',
  'Date',
  'Thu, 12 Dec 2019 05:59:59 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157613037953707227/dir157613039568100501/file157613039684601740')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 12 Dec 2019 06:00:00 GMT',
  'ETag',
  '"0x8D77EC885DCEC82"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '42e5fcc9-c01a-0026-5cb1-b0da23000000',
  'x-ms-client-request-id',
  'bd8d1c37-a3c6-4e79-aec1-1e89dfa09832',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-12-12T06:00:00.0621698Z',
  'x-ms-file-last-write-time',
  '2019-12-12T05:59:57.9561494Z',
  'x-ms-file-creation-time',
  '2019-12-12T05:59:57.9561494Z',
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
  'Thu, 12 Dec 2019 05:59:59 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157613037953707227/dir157613039568100501/file157613039684601740')
  .query(true)
  .reply(200, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Thu, 12 Dec 2019 06:00:00 GMT',
  'ETag',
  '"0x8D77EC885DCEC82"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7c714915-b01a-003c-1cb1-b0bbfc000000',
  'x-ms-client-request-id',
  'abe92b9d-1c6c-475f-9369-6a7e251c5cdb',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 12 Dec 2019 05:59:59 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share157613037953707227')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd53423f7-901a-0014-04b1-b0da54000000',
  'x-ms-client-request-id',
  '20e3873a-771f-4d6d-954f-bae4e2ecf725',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 12 Dec 2019 06:00:00 GMT'
]);
