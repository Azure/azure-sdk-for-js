let nock = require('nock');

module.exports.hash = "d90f5c083881b514c25cd3beb3cf2274";

module.exports.testInfo = {"uniqueName":{"share":"share163946893322108156","dir":"dir163946893420106330","file":"file163946893518509586","sourcefile":"sourcefile163946893518609199","destfile":"destfile163946893618001808"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share163946893322108156')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Dec 2021 08:02:14 GMT',
  'ETag',
  '"0x8D9BED80A2F2179"',
  'x-ms-request-id',
  'b9e7f0ad-201a-0006-46c0-f003a9000000',
  'x-ms-client-request-id',
  '731ec1b1-89cd-4faf-a4b8-e34b19b3bb1d',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Tue, 14 Dec 2021 08:02:14 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share163946893322108156/dir163946893420106330')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Dec 2021 08:02:15 GMT',
  'ETag',
  '"0x8D9BED80AC661EC"',
  'x-ms-request-id',
  '88abb402-601a-0004-65c0-f00ec4000000',
  'x-ms-client-request-id',
  '8a4012ec-a5f8-4f29-8f55-f3906ea594a3',
  'x-ms-version',
  '2021-04-10',
  'x-ms-file-change-time',
  '2021-12-14T08:02:15.2622572Z',
  'x-ms-file-last-write-time',
  '2021-12-14T08:02:15.2622572Z',
  'x-ms-file-creation-time',
  '2021-12-14T08:02:15.2622572Z',
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
  'Tue, 14 Dec 2021 08:02:15 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share163946893322108156/sourcefile163946893518609199')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Dec 2021 08:02:16 GMT',
  'ETag',
  '"0x8D9BED80B5DE933"',
  'x-ms-request-id',
  '888d3557-a01a-0005-0ec0-f0f0c9000000',
  'x-ms-client-request-id',
  '75e73502-7aff-4859-a3c6-1d300ff31353',
  'x-ms-version',
  '2021-04-10',
  'x-ms-file-change-time',
  '2021-12-14T08:02:16.2553139Z',
  'x-ms-file-last-write-time',
  '2021-12-14T08:02:16.2553139Z',
  'x-ms-file-creation-time',
  '2021-12-14T08:02:16.2553139Z',
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
  'Tue, 14 Dec 2021 08:02:15 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share163946893322108156/destfile163946893618001808')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Dec 2021 08:02:17 GMT',
  'ETag',
  '"0x8D9BED80BF45F9C"',
  'x-ms-request-id',
  '1bc0098f-b01a-0009-37c0-f03c4a000000',
  'x-ms-client-request-id',
  '99d34a53-c42e-41f6-a070-28d1a74f9821',
  'x-ms-version',
  '2021-04-10',
  'x-ms-file-change-time',
  '2021-12-14T08:02:17.2413852Z',
  'x-ms-file-last-write-time',
  '2021-12-14T08:02:17.2413852Z',
  'x-ms-file-creation-time',
  '2021-12-14T08:02:17.2413852Z',
  'x-ms-file-permission-key',
  '16394986450998199174*121971141114590432',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '13835163608398430208',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 14 Dec 2021 08:02:17 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share163946893322108156/destfile163946893618001808')
  .query(true)
  .reply(409, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>ResourceAlreadyExists</Code><Message>The specified resource already exists.\nRequestId:888d355c-a01a-0005-0fc0-f0f0c9000000\nTime:2021-12-14T08:02:18.2627635Z</Message></Error>", [
  'Content-Length',
  '228',
  'Content-Type',
  'application/xml',
  'x-ms-request-id',
  '888d355c-a01a-0005-0fc0-f0f0c9000000',
  'x-ms-client-request-id',
  'a8677998-b9d5-44f9-822a-424985435ce1',
  'x-ms-version',
  '2021-04-10',
  'x-ms-error-code',
  'ResourceAlreadyExists',
  'Date',
  'Tue, 14 Dec 2021 08:02:18 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share163946893322108156/sourcefile163946893518609199')
  .reply(200, "", [
  'Content-Length',
  '1024',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Tue, 14 Dec 2021 08:02:16 GMT',
  'ETag',
  '"0x8D9BED80B5DE933"',
  'x-ms-request-id',
  '88abb407-601a-0004-66c0-f00ec4000000',
  'x-ms-client-request-id',
  '0b021e12-c0c6-42f2-89ff-d1a9d0784f61',
  'x-ms-version',
  '2021-04-10',
  'x-ms-type',
  'File',
  'x-ms-server-encrypted',
  'true',
  'x-ms-file-change-time',
  '2021-12-14T08:02:16.2553139Z',
  'x-ms-file-last-write-time',
  '2021-12-14T08:02:16.2553139Z',
  'x-ms-file-creation-time',
  '2021-12-14T08:02:16.2553139Z',
  'x-ms-file-permission-key',
  '16394986450998199174*121971141114590432',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '13835093239654252544',
  'x-ms-file-parent-id',
  '0',
  'Date',
  'Tue, 14 Dec 2021 08:02:18 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share163946893322108156/destfile163946893618001808')
  .reply(200, "", [
  'Content-Length',
  '2048',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Tue, 14 Dec 2021 08:02:17 GMT',
  'ETag',
  '"0x8D9BED80BF45F9C"',
  'x-ms-request-id',
  '88abb408-601a-0004-67c0-f00ec4000000',
  'x-ms-client-request-id',
  '4d8e461d-06ff-4719-9119-65e8617e4d3f',
  'x-ms-version',
  '2021-04-10',
  'x-ms-type',
  'File',
  'x-ms-server-encrypted',
  'true',
  'x-ms-file-change-time',
  '2021-12-14T08:02:17.2413852Z',
  'x-ms-file-last-write-time',
  '2021-12-14T08:02:17.2413852Z',
  'x-ms-file-creation-time',
  '2021-12-14T08:02:17.2413852Z',
  'x-ms-file-permission-key',
  '16394986450998199174*121971141114590432',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '13835163608398430208',
  'x-ms-file-parent-id',
  '0',
  'Date',
  'Tue, 14 Dec 2021 08:02:19 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share163946893322108156')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  'bba569a6-201a-0000-1ec0-f0e568000000',
  'x-ms-client-request-id',
  '1ecc5f14-1ae7-4dc0-bc1d-9a6528807558',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Tue, 14 Dec 2021 08:02:20 GMT',
  'Connection',
  'close'
]);
