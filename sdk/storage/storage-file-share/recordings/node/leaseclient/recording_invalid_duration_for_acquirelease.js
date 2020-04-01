let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"share":"share157613029761802446","dir":"dir157613029876103681","file":"file157613031491806722"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157613029761802446')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 12 Dec 2019 05:58:18 GMT',
  'ETag',
  '"0x8D77EC849738088"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5f81d57c-601a-003f-41b1-b05a98000000',
  'x-ms-client-request-id',
  '7a3a90a5-7783-448c-a3cd-5e777de8c17a',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 12 Dec 2019 05:58:18 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157613029761802446/dir157613029876103681')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 12 Dec 2019 05:58:34 GMT',
  'ETag',
  '"0x8D77EC85314D091"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7cda8e0b-601a-002f-53b1-b09ff0000000',
  'x-ms-client-request-id',
  '0f13fb17-4792-4eeb-837a-b5aac2829d9b',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-12-12T05:58:34.8646545Z',
  'x-ms-file-last-write-time',
  '2019-12-12T05:58:34.8646545Z',
  'x-ms-file-creation-time',
  '2019-12-12T05:58:34.8646545Z',
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
  'Thu, 12 Dec 2019 05:58:34 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157613029761802446/dir157613029876103681/file157613031491806722')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 12 Dec 2019 05:58:36 GMT',
  'ETag',
  '"0x8D77EC853C646C2"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bcfff14b-601a-0000-4ab1-b0923b000000',
  'x-ms-client-request-id',
  'bdb6d769-e43d-4027-bbd2-81132467d453',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-12-12T05:58:36.0276674Z',
  'x-ms-file-last-write-time',
  '2019-12-12T05:58:36.0276674Z',
  'x-ms-file-creation-time',
  '2019-12-12T05:58:36.0276674Z',
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
  'Thu, 12 Dec 2019 05:58:36 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157613029761802446/dir157613029876103681/file157613031491806722')
  .query(true)
  .reply(400, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>InvalidHeaderValue</Code><Message>The value for one of the HTTP headers is not in the correct format.\nRequestId:9ba0f581-201a-002e-6eb1-b0c02c000000\nTime:2019-12-12T05:58:37.2303281Z</Message><HeaderName>x-ms-lease-duration</HeaderName><HeaderValue>2</HeaderValue></Error>", [
  'Content-Length',
  '326',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9ba0f581-201a-002e-6eb1-b0c02c000000',
  'x-ms-client-request-id',
  '33c5fe3d-36d7-43aa-bb77-9d70957b1b47',
  'x-ms-version',
  '2019-02-02',
  'x-ms-error-code',
  'InvalidHeaderValue',
  'Date',
  'Thu, 12 Dec 2019 05:58:36 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share157613029761802446')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5f81d591-601a-003f-46b1-b05a98000000',
  'x-ms-client-request-id',
  'aa15dd4f-5d46-44bf-afdc-3569cb39856e',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 12 Dec 2019 05:58:36 GMT'
]);
