let nock = require('nock');

module.exports.hash = "f832d86ccbee85ee31df8b05e88d4c33";

module.exports.testInfo = {"uniqueName":{"share":"share164549792562005869","dir":"dir164549792591606555","file":"file164549792621009585"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164549792562005869')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 22 Feb 2022 02:45:25 GMT',
  'ETag',
  '"0x8D9F5AD6143C7A9"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '868c187b-501a-006b-4396-274d45000000',
  'x-ms-client-request-id',
  '1a68e853-2de0-4af8-8d1e-a20c8ec9357e',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Tue, 22 Feb 2022 02:45:25 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164549792562005869/dir164549792591606555')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 22 Feb 2022 02:45:26 GMT',
  'ETag',
  '"0x8D9F5AD61713D5B"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '868c187e-501a-006b-4596-274d45000000',
  'x-ms-client-request-id',
  '7e5db074-d301-4810-8caf-6b8209b1cb22',
  'x-ms-version',
  '2021-04-10',
  'x-ms-file-change-time',
  '2022-02-22T02:45:26.2594395Z',
  'x-ms-file-last-write-time',
  '2022-02-22T02:45:26.2594395Z',
  'x-ms-file-creation-time',
  '2022-02-22T02:45:26.2594395Z',
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
  'Tue, 22 Feb 2022 02:45:25 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164549792562005869/dir164549792591606555/file164549792621009585')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 22 Feb 2022 02:45:26 GMT',
  'ETag',
  '"0x8D9F5AD619E132C"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '868c187f-501a-006b-4696-274d45000000',
  'x-ms-client-request-id',
  'e1ca886f-98f7-4c02-811f-4ed0c4f9ca8f',
  'x-ms-version',
  '2021-04-10',
  'x-ms-file-change-time',
  '2022-02-22T02:45:26.5532716Z',
  'x-ms-file-last-write-time',
  '2022-02-22T02:45:26.5532716Z',
  'x-ms-file-creation-time',
  '2022-02-22T02:45:26.5532716Z',
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
  'Tue, 22 Feb 2022 02:45:25 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164549792562005869/dir164549792591606555/file164549792621009585')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 22 Feb 2022 02:45:26 GMT',
  'ETag',
  '"0x8D9F5AD619E132C"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '868c1880-501a-006b-4796-274d45000000',
  'x-ms-client-request-id',
  '286d26dc-b66b-4d77-9cd1-3510269f4493',
  'x-ms-version',
  '2021-04-10',
  'x-ms-lease-id',
  'e9890485-bf47-4d9a-b3d0-aceb18506124',
  'Date',
  'Tue, 22 Feb 2022 02:45:26 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164549792562005869/dir164549792591606555/file164549792621009585')
  .query(true)
  .reply(412, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>LeaseIdMissing</Code><Message>There is currently a lease on the file and no lease ID was specified in the request.\nRequestId:868c1881-501a-006b-4896-274d45000000\nTime:2022-02-22T02:45:27.1387831Z</Message></Error>", [
  'Content-Length',
  '267',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '868c1881-501a-006b-4896-274d45000000',
  'x-ms-client-request-id',
  '965cc01d-b596-4033-83e8-3e615fb5ad7e',
  'x-ms-version',
  '2021-04-10',
  'x-ms-error-code',
  'LeaseIdMissing',
  'Date',
  'Tue, 22 Feb 2022 02:45:26 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164549792562005869/dir164549792591606555/file164549792621009585')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 22 Feb 2022 02:45:27 GMT',
  'ETag',
  '"0x8D9F5AD6223352B"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '868c1883-501a-006b-4996-274d45000000',
  'x-ms-client-request-id',
  'a7249465-1cc5-45dc-99be-4feae0d207f2',
  'x-ms-version',
  '2021-04-10',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 22 Feb 2022 02:45:26 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share164549792562005869')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '868c1884-501a-006b-4a96-274d45000000',
  'x-ms-client-request-id',
  '1c12a299-bf4b-4dc9-aaa0-7b4252059275',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Tue, 22 Feb 2022 02:45:26 GMT'
]);
