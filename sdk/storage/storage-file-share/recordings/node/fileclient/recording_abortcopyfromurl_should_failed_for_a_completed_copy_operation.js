let nock = require('nock');

module.exports.hash = "7c0a40971869a5219bc1b4ac05d34e8f";

module.exports.testInfo = {"uniqueName":{"share":"share164549792033203201","dir":"dir164549792062408358","file":"file164549792091501814","copiedfile":"copiedfile164549792120701226"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164549792033203201')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 22 Feb 2022 02:45:20 GMT',
  'ETag',
  '"0x8D9F5AD5E1C7DBA"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '868c185a-501a-006b-2996-274d45000000',
  'x-ms-client-request-id',
  'a6a99452-058a-468a-a94a-aa69347db65d',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Tue, 22 Feb 2022 02:45:19 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164549792033203201/dir164549792062408358')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 22 Feb 2022 02:45:20 GMT',
  'ETag',
  '"0x8D9F5AD5E49C008"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '868c185d-501a-006b-2b96-274d45000000',
  'x-ms-client-request-id',
  '5f5276cd-ce5f-4f98-b4e4-4500b2e04272',
  'x-ms-version',
  '2021-04-10',
  'x-ms-file-change-time',
  '2022-02-22T02:45:20.9674760Z',
  'x-ms-file-last-write-time',
  '2022-02-22T02:45:20.9674760Z',
  'x-ms-file-creation-time',
  '2022-02-22T02:45:20.9674760Z',
  'x-ms-file-permission-key',
  '1348922918165632443*8819015832131519026',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 22 Feb 2022 02:45:20 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164549792033203201/dir164549792062408358/file164549792091501814')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 22 Feb 2022 02:45:21 GMT',
  'ETag',
  '"0x8D9F5AD5E75F9AB"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '868c1866-501a-006b-3296-274d45000000',
  'x-ms-client-request-id',
  'b3a9c404-361a-44c4-b454-f60a8019a726',
  'x-ms-version',
  '2021-04-10',
  'x-ms-file-change-time',
  '2022-02-22T02:45:21.2573099Z',
  'x-ms-file-last-write-time',
  '2022-02-22T02:45:21.2573099Z',
  'x-ms-file-creation-time',
  '2022-02-22T02:45:21.2573099Z',
  'x-ms-file-permission-key',
  '15187149962788154044*8819015832131519026',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 22 Feb 2022 02:45:20 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164549792033203201/dir164549792062408358/copiedfile164549792120701226')
  .reply(202, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 22 Feb 2022 02:45:21 GMT',
  'ETag',
  '"0x8D9F5AD5EA69F72"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '868c1867-501a-006b-3396-274d45000000',
  'x-ms-client-request-id',
  '71dd0d8b-9785-4a17-a38e-d7f81a1cff9d',
  'x-ms-version',
  '2021-04-10',
  'x-ms-copy-id',
  'f0349d19-febf-4d24-b1f4-e8db1cde8b73',
  'x-ms-copy-status',
  'success',
  'Date',
  'Tue, 22 Feb 2022 02:45:20 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164549792033203201/dir164549792062408358/copiedfile164549792120701226')
  .query(true)
  .reply(409, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>NoPendingCopyOperation</Code><Message>There is currently no pending copy operation.\nRequestId:868c186b-501a-006b-3696-274d45000000\nTime:2022-02-22T02:45:22.9104348Z</Message></Error>", [
  'Content-Length',
  '236',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '868c186b-501a-006b-3696-274d45000000',
  'x-ms-client-request-id',
  '15154cd7-77dc-429d-9b3e-4121c16ef609',
  'x-ms-version',
  '2021-04-10',
  'x-ms-error-code',
  'NoPendingCopyOperation',
  'Date',
  'Tue, 22 Feb 2022 02:45:22 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share164549792033203201')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '868c186d-501a-006b-3796-274d45000000',
  'x-ms-client-request-id',
  '00a893fd-9c47-416e-bc96-6e4dc92258b8',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Tue, 22 Feb 2022 02:45:22 GMT'
]);
