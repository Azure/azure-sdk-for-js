let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"share":"share157613034399506404","dir":"dir157613034516003348","file":"file157613034631500236"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157613034399506404')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 12 Dec 2019 05:59:05 GMT',
  'ETag',
  '"0x8D77EC86518C471"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6a1ccf8b-101a-0025-09b1-b03b47000000',
  'x-ms-client-request-id',
  '3f378e7c-1bd9-4446-b9a4-7e25d995e73b',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 12 Dec 2019 05:59:04 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157613034399506404/dir157613034516003348')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 12 Dec 2019 05:59:06 GMT',
  'ETag',
  '"0x8D77EC865CBA44C"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9da1f219-701a-0033-63b1-b0cd90000000',
  'x-ms-client-request-id',
  '22be32fb-20f1-4e4f-adce-ebcaf7ee3d76',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-12-12T05:59:06.2618188Z',
  'x-ms-file-last-write-time',
  '2019-12-12T05:59:06.2618188Z',
  'x-ms-file-creation-time',
  '2019-12-12T05:59:06.2618188Z',
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
  'Thu, 12 Dec 2019 05:59:05 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157613034399506404/dir157613034516003348/file157613034631500236')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 12 Dec 2019 05:59:07 GMT',
  'ETag',
  '"0x8D77EC8667D42CB"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '033070ff-d01a-002a-44b1-b04d2b000000',
  'x-ms-client-request-id',
  'c4c17759-04b5-4291-8d09-7be9199ff953',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-12-12T05:59:07.4258635Z',
  'x-ms-file-last-write-time',
  '2019-12-12T05:59:07.4258635Z',
  'x-ms-file-creation-time',
  '2019-12-12T05:59:07.4258635Z',
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
  'Thu, 12 Dec 2019 05:59:07 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157613034399506404/dir157613034516003348/file157613034631500236')
  .query(true)
  .reply(409, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>LeaseNotPresentWithLeaseOperation</Code><Message>There is currently no lease on the file.\nRequestId:2907a907-a01a-0030-36b1-b02cf4000000\nTime:2019-12-12T05:59:08.5723439Z</Message></Error>", [
  'Content-Length',
  '242',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2907a907-a01a-0030-36b1-b02cf4000000',
  'x-ms-client-request-id',
  'acc3d9cc-2ae5-4569-bd0f-ff71c2391928',
  'x-ms-version',
  '2019-02-02',
  'x-ms-error-code',
  'LeaseNotPresentWithLeaseOperation',
  'Date',
  'Thu, 12 Dec 2019 05:59:08 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share157613034399506404')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6a1ccf93-101a-0025-0ab1-b03b47000000',
  'x-ms-client-request-id',
  '6ea5334b-e892-4324-8ebf-c2857715ebed',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 12 Dec 2019 05:59:08 GMT'
]);
