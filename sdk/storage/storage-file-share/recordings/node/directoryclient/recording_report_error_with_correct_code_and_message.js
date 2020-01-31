let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"share":"share157991464411107288","dir":"dir157991464492701514","testingerror":"testingerror157991464512200677","testingerror157991464512200677":"testingerror157991464512200677157991464512201179"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157991464411107288')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sat, 25 Jan 2020 01:10:44 GMT',
  'ETag',
  '"0x8D7A133677FB5A5"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2ce1b184-601a-0062-121c-d377ae000000',
  'x-ms-client-request-id',
  '84569a0e-38b7-4445-962a-513cfd32203d',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Sat, 25 Jan 2020 01:10:43 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157991464411107288/dir157991464492701514')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sat, 25 Jan 2020 01:10:45 GMT',
  'ETag',
  '"0x8D7A133679F1637"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'cbd5bc19-e01a-0138-0e1c-d3377a000000',
  'x-ms-client-request-id',
  'e08954b9-769a-41be-b8c6-e0632e9a0f44',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2020-01-25T01:10:45.0097719Z',
  'x-ms-file-last-write-time',
  '2020-01-25T01:10:45.0097719Z',
  'x-ms-file-creation-time',
  '2020-01-25T01:10:45.0097719Z',
  'x-ms-file-permission-key',
  '15246684120248489204*13496228697838683005',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Sat, 25 Jan 2020 01:10:44 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157991464411107288/testingerror157991464512200677157991464512201179')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sat, 25 Jan 2020 01:10:45 GMT',
  'ETag',
  '"0x8D7A1336813ED5E"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '191f67aa-501a-0007-6f1c-d3c6f3000000',
  'x-ms-client-request-id',
  '374850fe-f0e2-4035-a7ca-be5f8f9fc6c8',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2020-01-25T01:10:45.7754974Z',
  'x-ms-file-last-write-time',
  '2020-01-25T01:10:45.7754974Z',
  'x-ms-file-creation-time',
  '2020-01-25T01:10:45.7754974Z',
  'x-ms-file-permission-key',
  '15246684120248489204*13496228697838683005',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835093239654252544',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Sat, 25 Jan 2020 01:10:45 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157991464411107288/testingerror157991464512200677157991464512201179')
  .query(true)
  .reply(409, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>ResourceAlreadyExists</Code><Message>The specified resource already exists.\nRequestId:191f67ac-501a-0007-701c-d3c6f3000000\nTime:2020-01-25T01:10:45.9067064Z</Message></Error>", [
  'Content-Length',
  '228',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '191f67ac-501a-0007-701c-d3c6f3000000',
  'x-ms-client-request-id',
  'e5aa2929-0230-494f-a103-87d7d1ee5b0c',
  'x-ms-version',
  '2019-02-02',
  'x-ms-error-code',
  'ResourceAlreadyExists',
  'Date',
  'Sat, 25 Jan 2020 01:10:45 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share157991464411107288')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2ce1b1ac-601a-0062-381c-d377ae000000',
  'x-ms-client-request-id',
  'fb651f76-9aa3-40ab-8d03-b005ad6167f3',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Sat, 25 Jan 2020 01:10:45 GMT'
]);
