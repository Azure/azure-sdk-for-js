let nock = require('nock');

module.exports.hash = "c7ad34cbe919b2420885a2539cadeeaf";

module.exports.testInfo = {"uniqueName":{"share":"share171245766723207304","dir":"dir171245766734303347","file":"file171245766745807440","rename_file":"rename_file171245766801308929"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share171245766723207304')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 07 Apr 2024 02:41:08 GMT',
  'ETag',
  '"0x8DC56AC2DB5F671"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2df1f994-601a-0024-1495-886581000000',
  'x-ms-client-request-id',
  '18bc0499-019d-42b4-972b-b8d6ccd70988',
  'x-ms-version',
  '2024-05-04',
  'Date',
  'Sun, 07 Apr 2024 02:41:07 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share171245766723207304/dir171245766734303347')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 07 Apr 2024 02:41:08 GMT',
  'ETag',
  '"0x8DC56AC2DC7FAB4"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2df1f996-601a-0024-1595-886581000000',
  'x-ms-client-request-id',
  '7a13d026-5785-43aa-bbdf-7f2f70f887d1',
  'x-ms-version',
  '2024-05-04',
  'x-ms-file-change-time',
  '2024-04-07T02:41:08.2212020Z',
  'x-ms-file-last-write-time',
  '2024-04-07T02:41:08.2212020Z',
  'x-ms-file-creation-time',
  '2024-04-07T02:41:08.2212020Z',
  'x-ms-file-permission-key',
  '9255856626508002348*16764736045797335973',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Sun, 07 Apr 2024 02:41:07 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share171245766723207304/dir171245766734303347/file171245766745807440')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 07 Apr 2024 02:41:08 GMT',
  'ETag',
  '"0x8DC56AC2DD90F33"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2df1f997-601a-0024-1695-886581000000',
  'x-ms-client-request-id',
  'bea9a398-4d12-4b51-8237-5f14ce88b726',
  'x-ms-version',
  '2024-05-04',
  'x-ms-file-change-time',
  '2024-04-07T02:41:08.3331379Z',
  'x-ms-file-last-write-time',
  '2024-04-07T02:41:08.3331379Z',
  'x-ms-file-creation-time',
  '2024-04-07T02:41:08.3331379Z',
  'x-ms-file-permission-key',
  '4614121289425226539*16764736045797335973',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Sun, 07 Apr 2024 02:41:07 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share171245766723207304/dir171245766734303347/file171245766745807440', "Hello")
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'ixqZU8RhEpaoJ6v4xHgE1w==',
  'Last-Modified',
  'Sun, 07 Apr 2024 02:41:08 GMT',
  'ETag',
  '"0x8DC56AC2DEABFD9"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2df1f998-601a-0024-1795-886581000000',
  'x-ms-client-request-id',
  '79d0f805-27dc-42cc-a37d-e3405dcd1bf9',
  'x-ms-version',
  '2024-05-04',
  'x-ms-file-last-write-time',
  '2024-04-07T02:41:08.4490713Z',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Sun, 07 Apr 2024 02:41:07 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share171245766723207304')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 07 Apr 2024 02:41:08 GMT',
  'ETag',
  '"0x8DC56AC2DB5F671"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2df1f999-601a-0024-1895-886581000000',
  'x-ms-client-request-id',
  'd0c2f890-1e5b-46e2-b990-84a9458def71',
  'x-ms-version',
  '2024-05-04',
  'x-ms-snapshot',
  '2024-04-07T02:41:08.0000000Z',
  'Date',
  'Sun, 07 Apr 2024 02:41:07 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share171245766723207304/dir171245766734303347/file171245766745807440')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 07 Apr 2024 02:41:08 GMT',
  'ETag',
  '"0x8DC56AC2E0C4CA5"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2df1f99a-601a-0024-1995-886581000000',
  'x-ms-client-request-id',
  '4d309710-8328-4acc-8f90-5c5e3d2ddc1c',
  'x-ms-version',
  '2024-05-04',
  'x-ms-file-last-write-time',
  '2024-04-07T02:41:08.6689445Z',
  'Date',
  'Sun, 07 Apr 2024 02:41:07 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share171245766723207304/dir171245766734303347/file171245766745807440', "World")
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  '9aeSTmIehMkoCpon4by39g==',
  'Last-Modified',
  'Sun, 07 Apr 2024 02:41:08 GMT',
  'ETag',
  '"0x8DC56AC2E1CEC06"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2df1f99b-601a-0024-1a95-886581000000',
  'x-ms-client-request-id',
  'c4e79099-46c8-457d-bc59-169df8165242',
  'x-ms-version',
  '2024-05-04',
  'x-ms-file-last-write-time',
  '2024-04-07T02:41:08.7778822Z',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Sun, 07 Apr 2024 02:41:07 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share171245766723207304/rename_file171245766801308929')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 07 Apr 2024 02:41:08 GMT',
  'ETag',
  '"0x8DC56AC2E2D8B5E"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2df1f99c-601a-0024-1b95-886581000000',
  'x-ms-client-request-id',
  '2ac7cd98-55ba-4a56-a9bd-11e20f0c3ce7',
  'x-ms-version',
  '2024-05-04',
  'x-ms-file-change-time',
  '2024-04-07T02:41:08.8868190Z',
  'x-ms-file-last-write-time',
  '2024-04-07T02:41:08.7778822Z',
  'x-ms-file-creation-time',
  '2024-04-07T02:41:08.3331379Z',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '0',
  'x-ms-file-permission-key',
  '4614121289425226539*16764736045797335973',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Sun, 07 Apr 2024 02:41:07 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share171245766723207304')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 07 Apr 2024 02:41:08 GMT',
  'ETag',
  '"0x8DC56AC2DB5F671"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2df1f99d-601a-0024-1c95-886581000000',
  'x-ms-client-request-id',
  'bbb49821-f471-4077-865c-b0007901040c',
  'x-ms-version',
  '2024-05-04',
  'x-ms-snapshot',
  '2024-04-07T02:41:09.0000000Z',
  'Date',
  'Sun, 07 Apr 2024 02:41:08 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share171245766723207304/rename_file171245766801308929', "Hello")
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'ixqZU8RhEpaoJ6v4xHgE1w==',
  'Last-Modified',
  'Sun, 07 Apr 2024 02:41:09 GMT',
  'ETag',
  '"0x8DC56AC2E4F664B"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2df1f99e-601a-0024-1d95-886581000000',
  'x-ms-client-request-id',
  '0a6c6cc7-33b0-4f20-b719-e7b8340687b8',
  'x-ms-version',
  '2024-05-04',
  'x-ms-file-last-write-time',
  '2024-04-07T02:41:09.1086923Z',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Sun, 07 Apr 2024 02:41:08 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share171245766723207304/rename_file171245766801308929')
  .query(true)
  .reply(409, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>PreviousSnapshotNotFound</Code><Message>The previous snapshot was not found.\nRequestId:2df1f99f-601a-0024-1e95-886581000000\nTime:2024-04-07T02:41:09.2214901Z</Message></Error>", [
  'Content-Length',
  '229',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2df1f99f-601a-0024-1e95-886581000000',
  'x-ms-client-request-id',
  'a5653568-9512-4acb-bad6-ab3a67018076',
  'x-ms-version',
  '2024-05-04',
  'x-ms-error-code',
  'PreviousSnapshotNotFound',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Sun, 07 Apr 2024 02:41:08 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share171245766723207304/rename_file171245766801308929')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Ranges><ClearRange><Start>0</Start><End>511</End></ClearRange><Range><Start>512</Start><End>1535</End></Range></Ranges>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Last-Modified',
  'Sun, 07 Apr 2024 02:41:08 GMT',
  'ETag',
  '"0x8DC56AC2E2D8B5E"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2df1f9a3-601a-0024-2095-886581000000',
  'x-ms-client-request-id',
  '925ad8e1-64e6-4a8e-ab88-421148f9bd5a',
  'x-ms-version',
  '2024-05-04',
  'x-ms-content-length',
  '2049',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-content-length,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Sun, 07 Apr 2024 02:41:08 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share171245766723207304')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2df1f9a5-601a-0024-2295-886581000000',
  'x-ms-client-request-id',
  '3d8b2489-9259-4d5e-9975-a26e5b73d1d4',
  'x-ms-version',
  '2024-05-04',
  'Date',
  'Sun, 07 Apr 2024 02:41:08 GMT'
]);
