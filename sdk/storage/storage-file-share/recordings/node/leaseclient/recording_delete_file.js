let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"share":"share157613040072601911","dir":"dir157613040186705448","file":"file157613040313202432"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157613040072601911')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 12 Dec 2019 06:00:01 GMT',
  'ETag',
  '"0x8D77EC886E818C2"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4902f8ad-a01a-000f-6bb1-b0e457000000',
  'x-ms-client-request-id',
  '7d17991f-6836-414b-be1a-e6bf7de5b08c',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 12 Dec 2019 06:00:01 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157613040072601911/dir157613040186705448')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 12 Dec 2019 06:00:03 GMT',
  'ETag',
  '"0x8D77EC887A79C35"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd6669db4-001a-0039-20b1-b06927000000',
  'x-ms-client-request-id',
  '319f7996-269e-4e4f-b0a9-395c7eb35915',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-12-12T06:00:03.0682165Z',
  'x-ms-file-last-write-time',
  '2019-12-12T06:00:03.0682165Z',
  'x-ms-file-creation-time',
  '2019-12-12T06:00:03.0682165Z',
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
  'Thu, 12 Dec 2019 06:00:03 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157613040072601911/dir157613040186705448/file157613040313202432')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 12 Dec 2019 06:00:04 GMT',
  'ETag',
  '"0x8D77EC888765E50"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '624a29e0-901a-002b-7fb1-b012f7000000',
  'x-ms-client-request-id',
  '282bc0f3-703e-4ef6-91f8-05e8c26d79a2',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-12-12T06:00:04.4232272Z',
  'x-ms-file-last-write-time',
  '2019-12-12T06:00:04.4232272Z',
  'x-ms-file-creation-time',
  '2019-12-12T06:00:04.4232272Z',
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
  'Thu, 12 Dec 2019 06:00:04 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157613040072601911/dir157613040186705448/file157613040313202432')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Thu, 12 Dec 2019 06:00:04 GMT',
  'ETag',
  '"0x8D77EC888765E50"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd8857829-301a-0032-7cb1-b0924c000000',
  'x-ms-client-request-id',
  'af976454-717a-4efb-a422-1b90b4d80547',
  'x-ms-version',
  '2019-02-02',
  'x-ms-lease-id',
  'e9890485-bf47-4d9a-b3d0-aceb18506124',
  'Date',
  'Thu, 12 Dec 2019 06:00:05 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share157613040072601911/dir157613040186705448/file157613040313202432')
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Thu, 12 Dec 2019 06:00:04 GMT',
  'ETag',
  '"0x8D77EC888765E50"',
  'Vary',
  'Origin',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '624a29e5-901a-002b-01b1-b012f7000000',
  'x-ms-client-request-id',
  'ce1e10ab-4d00-46ab-b2c1-5b3eb3cde0e4',
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
  '2019-12-12T06:00:04.4232272Z',
  'x-ms-file-last-write-time',
  '2019-12-12T06:00:04.4232272Z',
  'x-ms-file-creation-time',
  '2019-12-12T06:00:04.4232272Z',
  'x-ms-file-permission-key',
  '11619239463300764278*693339914461510392',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '13835093239654252544',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'Date',
  'Thu, 12 Dec 2019 06:00:05 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share157613040072601911/dir157613040186705448/file157613040313202432')
  .reply(412, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>LeaseIdMissing</Code><Message>There is currently a lease on the file and no lease ID was specified in the request.\nRequestId:624a29e6-901a-002b-02b1-b012f7000000\nTime:2019-12-12T06:00:06.2869465Z</Message></Error>", [
  'Content-Length',
  '267',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '624a29e6-901a-002b-02b1-b012f7000000',
  'x-ms-client-request-id',
  '815a37e3-349f-4ab5-a628-323589636ab9',
  'x-ms-version',
  '2019-02-02',
  'x-ms-error-code',
  'LeaseIdMissing',
  'Date',
  'Thu, 12 Dec 2019 06:00:05 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share157613040072601911/dir157613040186705448/file157613040313202432')
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '624a29ee-901a-002b-08b1-b012f7000000',
  'x-ms-client-request-id',
  '6c543775-9c4b-4876-b8d6-12fb2659586a',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 12 Dec 2019 06:00:05 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share157613040072601911')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4902f8b6-a01a-000f-6eb1-b0e457000000',
  'x-ms-client-request-id',
  '5ee33801-b3bb-42d6-8491-d1ff3c68795f',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 12 Dec 2019 06:00:06 GMT'
]);
