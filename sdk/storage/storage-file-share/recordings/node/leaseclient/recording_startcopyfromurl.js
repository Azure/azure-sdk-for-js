let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"share":"share157613042742900828","dir":"dir157613042857208296","file":"file157613042972901413","copiedfile":"copiedfile157613045304006263"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157613042742900828')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 12 Dec 2019 06:00:28 GMT',
  'ETag',
  '"0x8D77EC896D2E307"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd577aad0-c01a-0019-17b1-b01280000000',
  'x-ms-client-request-id',
  '767b55a3-f214-4759-83c6-f81b544b9161',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 12 Dec 2019 06:00:27 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157613042742900828/dir157613042857208296')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 12 Dec 2019 06:00:29 GMT',
  'ETag',
  '"0x8D77EC897838B74"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6a1ccfff-101a-0025-23b1-b03b47000000',
  'x-ms-client-request-id',
  'e0d1abf4-43a1-46b8-b948-d024fd92b0a7',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-12-12T06:00:29.6754036Z',
  'x-ms-file-last-write-time',
  '2019-12-12T06:00:29.6754036Z',
  'x-ms-file-creation-time',
  '2019-12-12T06:00:29.6754036Z',
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
  'Thu, 12 Dec 2019 06:00:29 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157613042742900828/dir157613042857208296/file157613042972901413')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 12 Dec 2019 06:00:30 GMT',
  'ETag',
  '"0x8D77EC89834B130"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd5342437-901a-0014-1fb1-b0da54000000',
  'x-ms-client-request-id',
  'deedbd96-4758-4739-a0fe-77b1b7673904',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-12-12T06:00:30.8363568Z',
  'x-ms-file-last-write-time',
  '2019-12-12T06:00:30.8363568Z',
  'x-ms-file-creation-time',
  '2019-12-12T06:00:30.8363568Z',
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
  'Thu, 12 Dec 2019 06:00:30 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157613042742900828/dir157613042857208296/file157613042972901413')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Thu, 12 Dec 2019 06:00:30 GMT',
  'ETag',
  '"0x8D77EC89834B130"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bb7b7da1-901a-0049-43b1-b0d0d0000000',
  'x-ms-client-request-id',
  '750224c5-82e2-4ffd-af64-5b6378930fdf',
  'x-ms-version',
  '2019-02-02',
  'x-ms-lease-id',
  'e9890485-bf47-4d9a-b3d0-aceb18506124',
  'Date',
  'Thu, 12 Dec 2019 06:00:52 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157613042742900828/dir157613042857208296/copiedfile157613045304006263')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 12 Dec 2019 06:01:15 GMT',
  'ETag',
  '"0x8D77EC8B2BEDCF2"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd6669e1d-001a-0039-39b1-b06927000000',
  'x-ms-client-request-id',
  '4a085328-fbf7-46ec-9d78-d04409b59383',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-12-12T06:01:15.3626354Z',
  'x-ms-file-last-write-time',
  '2019-12-12T06:01:15.3626354Z',
  'x-ms-file-creation-time',
  '2019-12-12T06:01:15.3626354Z',
  'x-ms-file-permission-key',
  '11619239463300764278*693339914461510392',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '13835163608398430208',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 12 Dec 2019 06:01:15 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157613042742900828/dir157613042857208296/file157613042972901413')
  .reply(412, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>LeaseIdMissing</Code><Message>There is currently a lease on the file and no lease ID was specified in the request.\nRequestId:d534248b-901a-0014-44b1-b0da54000000\nTime:2019-12-12T06:01:15.7694831Z</Message></Error>", [
  'Content-Length',
  '267',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd534248b-901a-0014-44b1-b0da54000000',
  'x-ms-client-request-id',
  'ca09496c-276f-43a4-8968-9c8d186768a7',
  'x-ms-version',
  '2019-02-02',
  'x-ms-error-code',
  'LeaseIdMissing',
  'Date',
  'Thu, 12 Dec 2019 06:01:15 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157613042742900828/dir157613042857208296/file157613042972901413')
  .reply(202, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 12 Dec 2019 06:01:16 GMT',
  'ETag',
  '"0x8D77EC8B32BCF98"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd534248e-901a-0014-45b1-b0da54000000',
  'x-ms-client-request-id',
  '9c944d61-46a2-441a-94d7-3ac996977741',
  'x-ms-version',
  '2019-02-02',
  'x-ms-copy-id',
  '65c28050-5440-4d80-acab-9449f6e8123d',
  'x-ms-copy-status',
  'success',
  'Date',
  'Thu, 12 Dec 2019 06:01:15 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share157613042742900828')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd577ab16-c01a-0019-24b1-b01280000000',
  'x-ms-client-request-id',
  '51b3d998-9268-41d0-a8dc-58f63312e5cf',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 12 Dec 2019 06:01:15 GMT'
]);
