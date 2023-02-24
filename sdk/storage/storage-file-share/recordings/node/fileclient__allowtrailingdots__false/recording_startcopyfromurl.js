let nock = require('nock');

module.exports.hash = "517cf6be6f889e1316ed4871b87eef50";

module.exports.testInfo = {"uniqueName":{"share":"share167747853734501971","dir":"dir167747853761301634","file":"file167747853787207971","copiedfile":"copiedfile167747853813003125"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747853734501971')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 06:15:37 GMT',
  'ETag',
  '"0x8DB188A0B60C010"',
  'x-ms-request-id',
  '1775e97c-e01a-0001-7872-4a1b65000000',
  'x-ms-client-request-id',
  '710fd7ce-81f0-4007-a22d-eefceae41464',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 06:15:37 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747853734501971/dir167747853761301634....')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 06:15:38 GMT',
  'ETag',
  '"0x8DB188A0B8B5479"',
  'x-ms-request-id',
  '1775e97e-e01a-0001-7972-4a1b65000000',
  'x-ms-client-request-id',
  '3c60ceb7-02a2-4664-baf3-b249e9a4e36f',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T06:15:38.1291129Z',
  'x-ms-file-last-write-time',
  '2023-02-27T06:15:38.1291129Z',
  'x-ms-file-creation-time',
  '2023-02-27T06:15:38.1291129Z',
  'x-ms-file-permission-key',
  '13895902193744473398*5510371786133343095',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 27 Feb 2023 06:15:37 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747853734501971/dir167747853761301634..../file167747853787207971....')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 06:15:38 GMT',
  'ETag',
  '"0x8DB188A0BB28C2A"',
  'x-ms-request-id',
  '1775e97f-e01a-0001-7a72-4a1b65000000',
  'x-ms-client-request-id',
  '0fa62f06-ca7b-4a72-bf93-acd64c3dc3bf',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T06:15:38.3861290Z',
  'x-ms-file-last-write-time',
  '2023-02-27T06:15:38.3861290Z',
  'x-ms-file-creation-time',
  '2023-02-27T06:15:38.3861290Z',
  'x-ms-file-permission-key',
  '12560293872808033297*5510371786133343095',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 27 Feb 2023 06:15:37 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747853734501971/dir167747853761301634..../copiedfile167747853813003125...')
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 06:15:38 GMT',
  'ETag',
  '"0x8DB188A0BFD50D3"',
  'x-ms-request-id',
  '1775e980-e01a-0001-7b72-4a1b65000000',
  'x-ms-client-request-id',
  '6c267dcb-460e-458e-95ab-7304bc72d26c',
  'x-ms-version',
  '2022-11-02',
  'x-ms-copy-id',
  '60305ac6-a45b-4dd7-b776-894606928718',
  'x-ms-copy-status',
  'success',
  'Date',
  'Mon, 27 Feb 2023 06:15:38 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share167747853734501971/dir167747853761301634....')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.file.core.windows.net/\" ShareName=\"share167747853734501971\" DirectoryPath=\"dir167747853761301634\"><DirectoryId>13835128424026341376</DirectoryId><Entries><File><Name>copiedfile167747853813003125</Name><FileId>16140971433240035328</FileId><Properties><Content-Length>1024</Content-Length></Properties></File><File><Name>file167747853787207971</Name><FileId>11529285414812647424</FileId><Properties><Content-Length>1024</Content-Length></Properties></File></Entries><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'x-ms-request-id',
  '1775e982-e01a-0001-7c72-4a1b65000000',
  'x-ms-client-request-id',
  '86ad47b8-202c-478d-93b8-1ee140765260',
  'x-ms-version',
  '2022-11-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 27 Feb 2023 06:15:38 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share167747853734501971/dir167747853761301634..../file167747853787207971....')
  .reply(200, "", [
  'Content-Length',
  '1024',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Mon, 27 Feb 2023 06:15:38 GMT',
  'ETag',
  '"0x8DB188A0BB28C2A"',
  'x-ms-request-id',
  '1775e983-e01a-0001-7d72-4a1b65000000',
  'x-ms-client-request-id',
  '0ff3fd27-d9a9-4f1e-b268-f4587a18a195',
  'x-ms-version',
  '2022-11-02',
  'x-ms-type',
  'File',
  'x-ms-server-encrypted',
  'true',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-file-change-time',
  '2023-02-27T06:15:38.3861290Z',
  'x-ms-file-last-write-time',
  '2023-02-27T06:15:38.3861290Z',
  'x-ms-file-creation-time',
  '2023-02-27T06:15:38.3861290Z',
  'x-ms-file-permission-key',
  '12560293872808033297*5510371786133343095',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-type,x-ms-server-encrypted,x-ms-lease-status,x-ms-lease-state,x-ms-file-change-time,x-ms-file-last-write-time,x-ms-file-creation-time,x-ms-file-permission-key,x-ms-file-attributes,x-ms-file-id,x-ms-file-parent-id',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 27 Feb 2023 06:15:38 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share167747853734501971/dir167747853761301634..../copiedfile167747853813003125...')
  .reply(200, "", [
  'Content-Length',
  '1024',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Mon, 27 Feb 2023 06:15:38 GMT',
  'ETag',
  '"0x8DB188A0BFD50D3"',
  'x-ms-request-id',
  '1775e984-e01a-0001-7e72-4a1b65000000',
  'x-ms-client-request-id',
  '151ed1b2-2157-4efb-8710-4583956f7189',
  'x-ms-version',
  '2022-11-02',
  'x-ms-copy-id',
  '60305ac6-a45b-4dd7-b776-894606928718',
  'x-ms-copy-source',
  'https://fakestorageaccount.file.core.windows.net/share167747853734501971/dir167747853761301634..../file167747853787207971....',
  'x-ms-copy-status',
  'success',
  'x-ms-copy-progress',
  '1024/1024',
  'x-ms-copy-completion-time',
  'Mon, 27 Feb 2023 06:15:38 GMT',
  'x-ms-type',
  'File',
  'x-ms-server-encrypted',
  'true',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-file-change-time',
  '2023-02-27T06:15:38.8761299Z',
  'x-ms-file-last-write-time',
  '2023-02-27T06:15:38.8761299Z',
  'x-ms-file-creation-time',
  '2023-02-27T06:15:38.8761299Z',
  'x-ms-file-permission-key',
  '12560293872808033297*5510371786133343095',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '16140971433240035328',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,x-ms-copy-id,x-ms-copy-source,x-ms-copy-status,x-ms-copy-progress,x-ms-copy-completion-time,Last-Modified,ETag,x-ms-type,x-ms-server-encrypted,x-ms-lease-status,x-ms-lease-state,x-ms-file-change-time,x-ms-file-last-write-time,x-ms-file-creation-time,x-ms-file-permission-key,x-ms-file-attributes,x-ms-file-id,x-ms-file-parent-id',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 27 Feb 2023 06:15:38 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167747853734501971')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '1775e989-e01a-0001-0372-4a1b65000000',
  'x-ms-client-request-id',
  '52f38d1c-6812-41a9-a7ef-75f052b819e4',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 06:15:38 GMT'
]);
