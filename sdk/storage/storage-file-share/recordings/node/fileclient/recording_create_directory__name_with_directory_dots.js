let nock = require('nock');

module.exports.hash = "129379fcda93ff693eba2a91963ee96a";

module.exports.testInfo = {"uniqueName":{"share":"share167703713645308395","dir":"dir167703713659402255","file":"file167703713673601887","dirname1":"dirname1167703713673709357"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167703713645308395')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 22 Feb 2023 03:38:56 GMT',
  'ETag',
  '"0x8DB148653C42FF2"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8bc059d9-001a-0068-716f-46d31a000000',
  'x-ms-client-request-id',
  'afdac88a-2b4a-4f59-82ac-ef16be5d53e1',
  'x-ms-version',
  '2021-12-02',
  'Date',
  'Wed, 22 Feb 2023 03:38:55 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167703713645308395/dir167703713659402255')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 22 Feb 2023 03:38:56 GMT',
  'ETag',
  '"0x8DB148653DB7D77"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8bc059dc-001a-0068-736f-46d31a000000',
  'x-ms-client-request-id',
  'e862d30a-eca6-4a5e-916a-426f71cdc05c',
  'x-ms-version',
  '2021-12-02',
  'x-ms-file-change-time',
  '2023-02-22T03:38:56.8123767Z',
  'x-ms-file-last-write-time',
  '2023-02-22T03:38:56.8123767Z',
  'x-ms-file-creation-time',
  '2023-02-22T03:38:56.8123767Z',
  'x-ms-file-permission-key',
  '9212185477508673717*1658283376881248060',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 22 Feb 2023 03:38:55 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167703713645308395/dir167703713659402255/dirname1167703713673709357')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 22 Feb 2023 03:38:56 GMT',
  'ETag',
  '"0x8DB148653F03AAD"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8bc059e0-001a-0068-766f-46d31a000000',
  'x-ms-client-request-id',
  'fafe626d-a22d-4354-9a05-484119dd11d1',
  'x-ms-version',
  '2021-12-02',
  'x-ms-file-change-time',
  '2023-02-22T03:38:56.9482925Z',
  'x-ms-file-last-write-time',
  '2023-02-22T03:38:56.9482925Z',
  'x-ms-file-creation-time',
  '2023-02-22T03:38:56.9482925Z',
  'x-ms-file-permission-key',
  '9212185477508673717*1658283376881248060',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 22 Feb 2023 03:38:56 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share167703713645308395/dir167703713659402255')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.file.core.windows.net/\" ShareName=\"share167703713645308395\" DirectoryPath=\"dir167703713659402255\"><Prefix>dirname1167703713673709357</Prefix><DirectoryId>13835128424026341376</DirectoryId><Entries><Directory><Name>dirname1167703713673709357</Name><FileId>11529285414812647424</FileId><Properties /></Directory></Entries><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8bc059e3-001a-0068-796f-46d31a000000',
  'x-ms-client-request-id',
  '937c4223-183d-4d92-bb1d-92953e44f126',
  'x-ms-version',
  '2021-12-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 22 Feb 2023 03:38:56 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167703713645308395/dir167703713659402255/dirname1167703713673709357')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8bc059e5-001a-0068-7b6f-46d31a000000',
  'x-ms-client-request-id',
  'a8419da1-3b36-4b02-a3a9-52d7ee1f96bb',
  'x-ms-version',
  '2021-12-02',
  'Date',
  'Wed, 22 Feb 2023 03:38:56 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167703713645308395/dirname1167703713673709357')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 22 Feb 2023 03:38:57 GMT',
  'ETag',
  '"0x8DB1486542E2448"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8bc059e8-001a-0068-7e6f-46d31a000000',
  'x-ms-client-request-id',
  '23c484b9-173b-4c20-97ca-31c5503787d6',
  'x-ms-version',
  '2021-12-02',
  'x-ms-file-change-time',
  '2023-02-22T03:38:57.3540424Z',
  'x-ms-file-last-write-time',
  '2023-02-22T03:38:57.3540424Z',
  'x-ms-file-creation-time',
  '2023-02-22T03:38:57.3540424Z',
  'x-ms-file-permission-key',
  '9212185477508673717*1658283376881248060',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '16140971433240035328',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 22 Feb 2023 03:38:56 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share167703713645308395/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.file.core.windows.net/\" ShareName=\"share167703713645308395\" DirectoryPath=\"\"><Prefix>dirname1167703713673709357</Prefix><DirectoryId>0</DirectoryId><Entries><Directory><Name>dirname1167703713673709357</Name><FileId>16140971433240035328</FileId><Properties /></Directory></Entries><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8bc059ea-001a-0068-806f-46d31a000000',
  'x-ms-client-request-id',
  '03bad492-68a1-4714-9fae-1fa3d060fbc4',
  'x-ms-version',
  '2021-12-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 22 Feb 2023 03:38:56 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167703713645308395/dirname1167703713673709357')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8bc059ed-001a-0068-036f-46d31a000000',
  'x-ms-client-request-id',
  '7957be17-e15e-47bf-b73b-13647778ca64',
  'x-ms-version',
  '2021-12-02',
  'Date',
  'Wed, 22 Feb 2023 03:38:56 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167703713645308395')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8bc059f1-001a-0068-076f-46d31a000000',
  'x-ms-client-request-id',
  '6eb3c9c2-da93-4cca-94a8-19cb3a66e7a4',
  'x-ms-version',
  '2021-12-02',
  'Date',
  'Wed, 22 Feb 2023 03:38:56 GMT'
]);
