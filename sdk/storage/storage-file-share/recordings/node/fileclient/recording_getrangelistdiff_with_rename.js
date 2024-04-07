let nock = require('nock');

module.exports.hash = "0b05013c002766f230abe0595a8d87fe";

module.exports.testInfo = {"uniqueName":{"share":"share171245766529809585","dir":"dir171245766599909277","file":"file171245766612502960","rename_file":"rename_file171245766647904056"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share171245766529809585')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 07 Apr 2024 02:41:06 GMT',
  'ETag',
  '"0x8DC56AC2CE61A9B"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2df1f97f-601a-0024-0695-886581000000',
  'x-ms-client-request-id',
  'a4ba2710-6b84-4529-8a44-b02e896a78c7',
  'x-ms-version',
  '2024-05-04',
  'Date',
  'Sun, 07 Apr 2024 02:41:05 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share171245766529809585/dir171245766599909277')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 07 Apr 2024 02:41:06 GMT',
  'ETag',
  '"0x8DC56AC2CFC3D30"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2df1f982-601a-0024-0795-886581000000',
  'x-ms-client-request-id',
  '5a2c5bb2-c9b4-40ed-a6d0-82e765f12904',
  'x-ms-version',
  '2024-05-04',
  'x-ms-file-change-time',
  '2024-04-07T02:41:06.8859696Z',
  'x-ms-file-last-write-time',
  '2024-04-07T02:41:06.8859696Z',
  'x-ms-file-creation-time',
  '2024-04-07T02:41:06.8859696Z',
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
  'Sun, 07 Apr 2024 02:41:05 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share171245766529809585/dir171245766599909277/file171245766612502960')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 07 Apr 2024 02:41:07 GMT',
  'ETag',
  '"0x8DC56AC2D0E14DC"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2df1f983-601a-0024-0895-886581000000',
  'x-ms-client-request-id',
  '38d9928a-390c-49a3-a4fa-092a36090493',
  'x-ms-version',
  '2024-05-04',
  'x-ms-file-change-time',
  '2024-04-07T02:41:07.0029020Z',
  'x-ms-file-last-write-time',
  '2024-04-07T02:41:07.0029020Z',
  'x-ms-file-creation-time',
  '2024-04-07T02:41:07.0029020Z',
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
  'Sun, 07 Apr 2024 02:41:06 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share171245766529809585/dir171245766599909277/file171245766612502960', "Hello")
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'ixqZU8RhEpaoJ6v4xHgE1w==',
  'Last-Modified',
  'Sun, 07 Apr 2024 02:41:07 GMT',
  'ETag',
  '"0x8DC56AC2D203AA2"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2df1f985-601a-0024-0995-886581000000',
  'x-ms-client-request-id',
  'fe2dc11a-8ae4-4572-9907-4ccee79947e9',
  'x-ms-version',
  '2024-05-04',
  'x-ms-file-last-write-time',
  '2024-04-07T02:41:07.1218338Z',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Sun, 07 Apr 2024 02:41:06 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share171245766529809585')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 07 Apr 2024 02:41:06 GMT',
  'ETag',
  '"0x8DC56AC2CE61A9B"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2df1f986-601a-0024-0a95-886581000000',
  'x-ms-client-request-id',
  'c99c3274-a45d-4cba-b6bf-4f5078e37736',
  'x-ms-version',
  '2024-05-04',
  'x-ms-snapshot',
  '2024-04-07T02:41:07.0000000Z',
  'Date',
  'Sun, 07 Apr 2024 02:41:06 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share171245766529809585/rename_file171245766647904056')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 07 Apr 2024 02:41:07 GMT',
  'ETag',
  '"0x8DC56AC2D4792F6"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2df1f987-601a-0024-0b95-886581000000',
  'x-ms-client-request-id',
  '0635ba4c-bd46-4bcd-ab2a-13fc688031d5',
  'x-ms-version',
  '2024-05-04',
  'x-ms-file-change-time',
  '2024-04-07T02:41:07.3796854Z',
  'x-ms-file-last-write-time',
  '2024-04-07T02:41:07.1218338Z',
  'x-ms-file-creation-time',
  '2024-04-07T02:41:07.0029020Z',
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
  'Sun, 07 Apr 2024 02:41:06 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share171245766529809585/rename_file171245766647904056')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 07 Apr 2024 02:41:07 GMT',
  'ETag',
  '"0x8DC56AC2D58A777"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2df1f989-601a-0024-0c95-886581000000',
  'x-ms-client-request-id',
  '152487de-6c3e-4f6c-9d9e-647dc515358d',
  'x-ms-version',
  '2024-05-04',
  'x-ms-file-last-write-time',
  '2024-04-07T02:41:07.4916215Z',
  'Date',
  'Sun, 07 Apr 2024 02:41:06 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share171245766529809585/rename_file171245766647904056', "World")
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  '9aeSTmIehMkoCpon4by39g==',
  'Last-Modified',
  'Sun, 07 Apr 2024 02:41:07 GMT',
  'ETag',
  '"0x8DC56AC2D696DDF"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2df1f98a-601a-0024-0d95-886581000000',
  'x-ms-client-request-id',
  '03c4a832-f72c-4b4a-9bdf-973ee9f36acb',
  'x-ms-version',
  '2024-05-04',
  'x-ms-file-last-write-time',
  '2024-04-07T02:41:07.6015583Z',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Sun, 07 Apr 2024 02:41:06 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share171245766529809585/rename_file171245766647904056')
  .query(true)
  .reply(409, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>PreviousSnapshotNotFound</Code><Message>The previous snapshot was not found.\nRequestId:2df1f98b-601a-0024-0e95-886581000000\nTime:2024-04-07T02:41:07.7243440Z</Message></Error>", [
  'Content-Length',
  '229',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2df1f98b-601a-0024-0e95-886581000000',
  'x-ms-client-request-id',
  'd2aff417-250b-4a02-aa15-3ae2d8da88d0',
  'x-ms-version',
  '2024-05-04',
  'x-ms-error-code',
  'PreviousSnapshotNotFound',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Sun, 07 Apr 2024 02:41:06 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share171245766529809585/rename_file171245766647904056')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Ranges><ClearRange><Start>0</Start><End>511</End></ClearRange><Range><Start>512</Start><End>1535</End></Range></Ranges>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Last-Modified',
  'Sun, 07 Apr 2024 02:41:07 GMT',
  'ETag',
  '"0x8DC56AC2D696DDF"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2df1f98d-601a-0024-0f95-886581000000',
  'x-ms-client-request-id',
  '13b5565f-aa2a-46b3-939c-239bb374f5f1',
  'x-ms-version',
  '2024-05-04',
  'x-ms-content-length',
  '2049',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-content-length,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Sun, 07 Apr 2024 02:41:06 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share171245766529809585')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2df1f993-601a-0024-1395-886581000000',
  'x-ms-client-request-id',
  '1662cb35-e392-45d4-834b-d33f1165db21',
  'x-ms-version',
  '2024-05-04',
  'Date',
  'Sun, 07 Apr 2024 02:41:06 GMT'
]);
