let nock = require('nock');

module.exports.hash = "66efd7e6f76380f44d5954fd0ab15d1e";

module.exports.testInfo = {"uniqueName":{"share":"share163946894873207581","dir":"dir163946894970602422","file":"file163946895069102466","sourcefile":"sourcefile163946895069102118","destfile":"destfile163946895167203529"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share163946894873207581')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Dec 2021 08:02:29 GMT',
  'ETag',
  '"0x8D9BED8136D27B8"',
  'x-ms-request-id',
  '39e28cc9-a01a-0003-09c0-f01608000000',
  'x-ms-client-request-id',
  'a8123533-fba9-4e89-94c9-0f3ffe20bf53',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Tue, 14 Dec 2021 08:02:29 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share163946894873207581/dir163946894970602422')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Dec 2021 08:02:30 GMT',
  'ETag',
  '"0x8D9BED814037B80"',
  'x-ms-request-id',
  '88abb40c-601a-0004-6ac0-f00ec4000000',
  'x-ms-client-request-id',
  'a22f409a-59ed-4998-9ab6-bec2378c8c21',
  'x-ms-version',
  '2021-04-10',
  'x-ms-file-change-time',
  '2021-12-14T08:02:30.7621760Z',
  'x-ms-file-last-write-time',
  '2021-12-14T08:02:30.7621760Z',
  'x-ms-file-creation-time',
  '2021-12-14T08:02:30.7621760Z',
  'x-ms-file-permission-key',
  '10165108698639110817*121971141114590432',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 14 Dec 2021 08:02:30 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share163946894873207581/sourcefile163946895069102118')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Dec 2021 08:02:31 GMT',
  'ETag',
  '"0x8D9BED8149A1855"',
  'x-ms-request-id',
  'a41741e1-e01a-0007-57c0-f0fda4000000',
  'x-ms-client-request-id',
  '07733c5a-c58b-43b7-be94-3289a1ed6bfb',
  'x-ms-version',
  '2021-04-10',
  'x-ms-file-change-time',
  '2021-12-14T08:02:31.7492309Z',
  'x-ms-file-last-write-time',
  '2021-12-14T08:02:31.7492309Z',
  'x-ms-file-creation-time',
  '2021-12-14T08:02:31.7492309Z',
  'x-ms-file-permission-key',
  '16394986450998199174*121971141114590432',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '13835093239654252544',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 14 Dec 2021 08:02:31 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share163946894873207581/destfile163946895167203529')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Dec 2021 08:02:32 GMT',
  'ETag',
  '"0x8D9BED8152F7CEA"',
  'x-ms-request-id',
  '1bc00999-b01a-0009-3ac0-f03c4a000000',
  'x-ms-client-request-id',
  '760fdfb8-31e9-43e3-911b-5c8173c410ef',
  'x-ms-version',
  '2021-04-10',
  'x-ms-file-change-time',
  '2021-12-14T08:02:32.7282922Z',
  'x-ms-file-last-write-time',
  '2021-12-14T08:02:32.7282922Z',
  'x-ms-file-creation-time',
  '2021-12-14T08:02:32.7282922Z',
  'x-ms-file-permission-key',
  '16394986450998199174*121971141114590432',
  'x-ms-file-attributes',
  'ReadOnly | Archive',
  'x-ms-file-id',
  '13835163608398430208',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 14 Dec 2021 08:02:32 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share163946894873207581/destfile163946895167203529')
  .query(true)
  .reply(409, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>ReadOnlyAttribute</Code><Message>The specified resource is read-only and cannot be modified at this time.\nRequestId:1bc0099d-b01a-0009-3bc0-f03c4a000000\nTime:2021-12-14T08:02:33.4676143Z</Message></Error>", [
  'Content-Length',
  '258',
  'Content-Type',
  'application/xml',
  'x-ms-request-id',
  '1bc0099d-b01a-0009-3bc0-f03c4a000000',
  'x-ms-client-request-id',
  'd5fdedb3-3455-43ec-aaaf-ff56383dd9b1',
  'x-ms-version',
  '2021-04-10',
  'x-ms-error-code',
  'ReadOnlyAttribute',
  'Date',
  'Tue, 14 Dec 2021 08:02:32 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share163946894873207581/sourcefile163946895069102118')
  .reply(200, "", [
  'Content-Length',
  '1024',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Tue, 14 Dec 2021 08:02:31 GMT',
  'ETag',
  '"0x8D9BED8149A1855"',
  'x-ms-request-id',
  '61b4ef47-e01a-0001-6ec0-f01b65000000',
  'x-ms-client-request-id',
  'a54ddc21-5d03-4c2c-a5c3-e29fee682afb',
  'x-ms-version',
  '2021-04-10',
  'x-ms-type',
  'File',
  'x-ms-server-encrypted',
  'true',
  'x-ms-file-change-time',
  '2021-12-14T08:02:31.7492309Z',
  'x-ms-file-last-write-time',
  '2021-12-14T08:02:31.7492309Z',
  'x-ms-file-creation-time',
  '2021-12-14T08:02:31.7492309Z',
  'x-ms-file-permission-key',
  '16394986450998199174*121971141114590432',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '13835093239654252544',
  'x-ms-file-parent-id',
  '0',
  'Date',
  'Tue, 14 Dec 2021 08:02:33 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share163946894873207581/destfile163946895167203529')
  .reply(200, "", [
  'Content-Length',
  '2048',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Tue, 14 Dec 2021 08:02:32 GMT',
  'ETag',
  '"0x8D9BED8152F7CEA"',
  'x-ms-request-id',
  '39e28cd6-a01a-0003-0bc0-f01608000000',
  'x-ms-client-request-id',
  '986db956-8cee-4963-a82c-2594c7cdc547',
  'x-ms-version',
  '2021-04-10',
  'x-ms-type',
  'File',
  'x-ms-server-encrypted',
  'true',
  'x-ms-file-change-time',
  '2021-12-14T08:02:32.7282922Z',
  'x-ms-file-last-write-time',
  '2021-12-14T08:02:32.7282922Z',
  'x-ms-file-creation-time',
  '2021-12-14T08:02:32.7282922Z',
  'x-ms-file-permission-key',
  '16394986450998199174*121971141114590432',
  'x-ms-file-attributes',
  'ReadOnly | Archive',
  'x-ms-file-id',
  '13835163608398430208',
  'x-ms-file-parent-id',
  '0',
  'Date',
  'Tue, 14 Dec 2021 08:02:35 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share163946894873207581')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '1bc0099e-b01a-0009-3cc0-f03c4a000000',
  'x-ms-client-request-id',
  'f561e54b-1738-4a7b-8dac-235f6ae308a5',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Tue, 14 Dec 2021 08:02:36 GMT',
  'Connection',
  'close'
]);
