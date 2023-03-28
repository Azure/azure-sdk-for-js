let nock = require('nock');

module.exports.hash = "dcb7e8c2070890a47dc3390a3bbd6478";

module.exports.testInfo = {"uniqueName":{"share":"share167749057350803502","dir":"dir167749057380208739","file":"file167749057410003847"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749057350803502')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:36:13 GMT',
  'ETag',
  '"0x8DB18A6116B6AAA"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb3bc-101a-0070-548e-4a9c5e000000',
  'x-ms-client-request-id',
  '56428e2a-4208-4e3e-b78c-8e485cafaf89',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 09:36:13 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749057350803502/dir167749057380208739')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:36:14 GMT',
  'ETag',
  '"0x8DB18A611994FA2"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb3be-101a-0070-558e-4a9c5e000000',
  'x-ms-client-request-id',
  '8f84d8d3-eb48-4c42-b508-8f03914f4d86',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T09:36:14.1954978Z',
  'x-ms-file-last-write-time',
  '2023-02-27T09:36:14.1954978Z',
  'x-ms-file-creation-time',
  '2023-02-27T09:36:14.1954978Z',
  'x-ms-file-permission-key',
  '8792472798472242479*1359530181238362790',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 27 Feb 2023 09:36:13 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749057350803502/dir167749057380208739/file167749057410003847')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:36:14 GMT',
  'ETag',
  '"0x8DB18A611C6E8A3"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb3bf-101a-0070-568e-4a9c5e000000',
  'x-ms-client-request-id',
  'ef1dd775-cbc9-4c6d-801a-9b2ca511c43e',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T09:36:14.4943267Z',
  'x-ms-file-last-write-time',
  '2023-02-27T09:36:14.4943267Z',
  'x-ms-file-creation-time',
  '2023-02-27T09:36:14.4943267Z',
  'x-ms-file-permission-key',
  '13438439191449926184*1359530181238362790',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 27 Feb 2023 09:36:14 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749057350803502/dir167749057380208739/file167749057410003847', "Hello")
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'ixqZU8RhEpaoJ6v4xHgE1w==',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:36:14 GMT',
  'ETag',
  '"0x8DB18A611F4819E"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb3c0-101a-0070-578e-4a9c5e000000',
  'x-ms-client-request-id',
  '40d2181b-21a8-49dc-9d6b-66ba94df0002',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-last-write-time',
  '2023-02-27T09:36:14.7931550Z',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 27 Feb 2023 09:36:14 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749057350803502')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:36:13 GMT',
  'ETag',
  '"0x8DB18A6116B6AAA"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb3c1-101a-0070-588e-4a9c5e000000',
  'x-ms-client-request-id',
  '62527978-fe01-4450-a841-ae95e837be70',
  'x-ms-version',
  '2022-11-02',
  'x-ms-snapshot',
  '2023-02-27T09:36:15.0000000Z',
  'Date',
  'Mon, 27 Feb 2023 09:36:14 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749057350803502/dir167749057380208739/file167749057410003847')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:36:15 GMT',
  'ETag',
  '"0x8DB18A6124EF065"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb3c2-101a-0070-598e-4a9c5e000000',
  'x-ms-client-request-id',
  'bcc2c3cc-7346-425a-a333-251b92ff9b5e',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-last-write-time',
  '2023-02-27T09:36:15.3858149Z',
  'Date',
  'Mon, 27 Feb 2023 09:36:15 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749057350803502/dir167749057380208739/file167749057410003847', "World")
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  '9aeSTmIehMkoCpon4by39g==',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:36:15 GMT',
  'ETag',
  '"0x8DB18A6127C3B4C"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb3c5-101a-0070-5a8e-4a9c5e000000',
  'x-ms-client-request-id',
  '13706680-3eaa-4d76-8a10-fa824a0b81bd',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-last-write-time',
  '2023-02-27T09:36:15.6826444Z',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 27 Feb 2023 09:36:15 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749057350803502')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:36:13 GMT',
  'ETag',
  '"0x8DB18A6116B6AAA"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb3c6-101a-0070-5b8e-4a9c5e000000',
  'x-ms-client-request-id',
  '4b37e1e1-354c-4ab8-bfed-3075b0caf25c',
  'x-ms-version',
  '2022-11-02',
  'x-ms-snapshot',
  '2023-02-27T09:36:16.0000000Z',
  'Date',
  'Mon, 27 Feb 2023 09:36:15 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749057350803502/dir167749057380208739/file167749057410003847', "Hello")
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'ixqZU8RhEpaoJ6v4xHgE1w==',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:36:16 GMT',
  'ETag',
  '"0x8DB18A612D6F828"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb3c7-101a-0070-5c8e-4a9c5e000000',
  'x-ms-client-request-id',
  '794d63fb-c53f-474d-a8bf-9e940573ce0e',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-last-write-time',
  '2023-02-27T09:36:16.2773032Z',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 27 Feb 2023 09:36:16 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share167749057350803502/dir167749057380208739/file167749057410003847')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Ranges><ClearRange><Start>0</Start><End>511</End></ClearRange><Range><Start>512</Start><End>1535</End></Range></Ranges>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:36:15 GMT',
  'ETag',
  '"0x8DB18A6127C3B4C"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb3c8-101a-0070-5d8e-4a9c5e000000',
  'x-ms-client-request-id',
  '0da0ab03-453c-41f7-82cc-ad9c3b5e3869',
  'x-ms-version',
  '2022-11-02',
  'x-ms-content-length',
  '2049',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-content-length,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 27 Feb 2023 09:36:16 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167749057350803502')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb3cb-101a-0070-5e8e-4a9c5e000000',
  'x-ms-client-request-id',
  'a5684636-ec14-4fa3-812b-b6307064b678',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 09:36:16 GMT'
]);
