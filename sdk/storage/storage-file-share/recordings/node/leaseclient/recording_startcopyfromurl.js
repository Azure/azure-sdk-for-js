let nock = require('nock');

module.exports.hash = "5c4d1e8d9e7cc71f1d71c96109204d08";

module.exports.testInfo = {"uniqueName":{"share":"share164549792316000362","dir":"dir164549792345407543","file":"file164549792375009834","copiedfile":"copiedfile164549792437306290"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164549792316000362')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 22 Feb 2022 02:45:23 GMT',
  'ETag',
  '"0x8D9F5AD5FCC0A10"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '868c186e-501a-006b-3896-274d45000000',
  'x-ms-client-request-id',
  '21b5ec24-4121-4ed8-b183-d47cff000b98',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Tue, 22 Feb 2022 02:45:22 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164549792316000362/dir164549792345407543')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 22 Feb 2022 02:45:23 GMT',
  'ETag',
  '"0x8D9F5AD5FFA16B4"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '868c1870-501a-006b-3996-274d45000000',
  'x-ms-client-request-id',
  'd962496e-9c3d-4f0a-b3a9-cfcbaa571202',
  'x-ms-version',
  '2021-04-10',
  'x-ms-file-change-time',
  '2022-02-22T02:45:23.8008500Z',
  'x-ms-file-last-write-time',
  '2022-02-22T02:45:23.8008500Z',
  'x-ms-file-creation-time',
  '2022-02-22T02:45:23.8008500Z',
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
  'Tue, 22 Feb 2022 02:45:22 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164549792316000362/dir164549792345407543/file164549792375009834')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 22 Feb 2022 02:45:24 GMT',
  'ETag',
  '"0x8D9F5AD60271391"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '868c1871-501a-006b-3a96-274d45000000',
  'x-ms-client-request-id',
  '6d7535eb-8bdc-414d-9784-cf479bcc013e',
  'x-ms-version',
  '2021-04-10',
  'x-ms-file-change-time',
  '2022-02-22T02:45:24.0956817Z',
  'x-ms-file-last-write-time',
  '2022-02-22T02:45:24.0956817Z',
  'x-ms-file-creation-time',
  '2022-02-22T02:45:24.0956817Z',
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
  'Tue, 22 Feb 2022 02:45:23 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164549792316000362/dir164549792345407543/file164549792375009834')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 22 Feb 2022 02:45:24 GMT',
  'ETag',
  '"0x8D9F5AD60271391"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '868c1873-501a-006b-3c96-274d45000000',
  'x-ms-client-request-id',
  'd72cd7ee-4747-4679-b578-65a22ff739e3',
  'x-ms-version',
  '2021-04-10',
  'x-ms-lease-id',
  'e9890485-bf47-4d9a-b3d0-aceb18506124',
  'Date',
  'Tue, 22 Feb 2022 02:45:23 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164549792316000362/dir164549792345407543/copiedfile164549792437306290')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 22 Feb 2022 02:45:24 GMT',
  'ETag',
  '"0x8D9F5AD6085C781"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '868c1874-501a-006b-3d96-274d45000000',
  'x-ms-client-request-id',
  'd69882f1-824e-44ef-8e29-1a251c4128d6',
  'x-ms-version',
  '2021-04-10',
  'x-ms-file-change-time',
  '2022-02-22T02:45:24.7163265Z',
  'x-ms-file-last-write-time',
  '2022-02-22T02:45:24.7163265Z',
  'x-ms-file-creation-time',
  '2022-02-22T02:45:24.7163265Z',
  'x-ms-file-permission-key',
  '15187149962788154044*8819015832131519026',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '16140971433240035328',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 22 Feb 2022 02:45:23 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164549792316000362/dir164549792345407543/file164549792375009834')
  .reply(412, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>LeaseIdMissing</Code><Message>There is currently a lease on the file and no lease ID was specified in the request.\nRequestId:868c1875-501a-006b-3e96-274d45000000\nTime:2022-02-22T02:45:25.0680732Z</Message></Error>", [
  'Content-Length',
  '267',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '868c1875-501a-006b-3e96-274d45000000',
  'x-ms-client-request-id',
  '87567cc1-cf82-4cf7-ae8b-0fa4e56917df',
  'x-ms-version',
  '2021-04-10',
  'x-ms-error-code',
  'LeaseIdMissing',
  'Date',
  'Tue, 22 Feb 2022 02:45:24 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164549792316000362/dir164549792345407543/file164549792375009834')
  .reply(202, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 22 Feb 2022 02:45:25 GMT',
  'ETag',
  '"0x8D9F5AD60E87268"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '868c1877-501a-006b-4096-274d45000000',
  'x-ms-client-request-id',
  '0c0c9745-d640-47df-9ede-5f3a1939564d',
  'x-ms-version',
  '2021-04-10',
  'x-ms-copy-id',
  'ffdf7636-dd54-4d74-9ed8-a6e6e3f54797',
  'x-ms-copy-status',
  'success',
  'Date',
  'Tue, 22 Feb 2022 02:45:24 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share164549792316000362')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '868c187a-501a-006b-4296-274d45000000',
  'x-ms-client-request-id',
  '3a5d7be9-1332-4182-9009-0674db43a3cc',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Tue, 22 Feb 2022 02:45:24 GMT'
]);
