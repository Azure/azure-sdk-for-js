let nock = require('nock');

module.exports.hash = "a496a4f5e009a53c35a3e1a9ee555be0";

module.exports.testInfo = {"uniqueName":{"share":"share167818185422107006","dir":"dir167818185447905823","file":"file167818185473706381","destfile":"destfile167818185499908826","destfile1":"destfile1167818185600708818"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167818185422107006')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 07 Mar 2023 09:37:34 GMT',
  'ETag',
  '"0x8DB1EEF94CF2D1E"',
  'x-ms-request-id',
  '790792cd-a01a-0005-3dd8-50f0c9000000',
  'x-ms-client-request-id',
  'ac2fed28-d0b0-4098-aeb4-f2ea6eea30f3',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Tue, 07 Mar 2023 09:37:34 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167818185422107006/dir167818185447905823....')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 07 Mar 2023 09:37:34 GMT',
  'ETag',
  '"0x8DB1EEF94F79CC1"',
  'x-ms-request-id',
  '790792cf-a01a-0005-3ed8-50f0c9000000',
  'x-ms-client-request-id',
  '42d6040f-e83b-4031-99f5-5c785e3be45b',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-03-07T09:37:34.8329665Z',
  'x-ms-file-last-write-time',
  '2023-03-07T09:37:34.8329665Z',
  'x-ms-file-creation-time',
  '2023-03-07T09:37:34.8329665Z',
  'x-ms-file-permission-key',
  '10761449611457319216*1871445747569276785',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 07 Mar 2023 09:37:34 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167818185422107006/dir167818185447905823..../file167818185473706381....')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 07 Mar 2023 09:37:35 GMT',
  'ETag',
  '"0x8DB1EEF951EFC0E"',
  'x-ms-request-id',
  '790792d0-a01a-0005-3fd8-50f0c9000000',
  'x-ms-client-request-id',
  '15b4af02-b57e-42f9-96e3-84a225a5f217',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-03-07T09:37:35.0909966Z',
  'x-ms-file-last-write-time',
  '2023-03-07T09:37:35.0909966Z',
  'x-ms-file-creation-time',
  '2023-03-07T09:37:35.0909966Z',
  'x-ms-file-permission-key',
  '18144810169125879831*1871445747569276785',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 07 Mar 2023 09:37:35 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167818185422107006/destfile167818185499908826....')
  .query(true)
  .reply(200, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 07 Mar 2023 09:37:35 GMT',
  'ETag',
  '"0x8DB1EEF9545F0B7"',
  'x-ms-request-id',
  '790792d1-a01a-0005-40d8-50f0c9000000',
  'x-ms-client-request-id',
  '9aeb36a3-f6bd-4bf0-a0f1-d1553fe40345',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-03-07T09:37:35.3462967Z',
  'x-ms-file-last-write-time',
  '2023-03-07T09:37:35.0909966Z',
  'x-ms-file-creation-time',
  '2023-03-07T09:37:35.0909966Z',
  'x-ms-file-permission-key',
  '18144810169125879831*1871445747569276785',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 07 Mar 2023 09:37:35 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share167818185422107006/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.file.core.windows.net/\" ShareName=\"share167818185422107006\" DirectoryPath=\"\"><DirectoryId>0</DirectoryId><Entries><File><Name>destfile167818185499908826....</Name><FileId>11529285414812647424</FileId><Properties><Content-Length>1024</Content-Length></Properties></File><Directory><Name>dir167818185447905823....</Name><FileId>13835128424026341376</FileId><Properties /></Directory></Entries><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'x-ms-request-id',
  '790792d2-a01a-0005-41d8-50f0c9000000',
  'x-ms-client-request-id',
  '2578ac50-c6c7-4b40-aafd-f992af0f83f2',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Tue, 07 Mar 2023 09:37:35 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share167818185422107006/destfile167818185499908826....')
  .reply(200, "", [
  'Content-Length',
  '1024',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Tue, 07 Mar 2023 09:37:35 GMT',
  'ETag',
  '"0x8DB1EEF9545F0B7"',
  'x-ms-request-id',
  '790792df-a01a-0005-42d8-50f0c9000000',
  'x-ms-client-request-id',
  '11b67ed3-6d65-4978-8b45-954a6646fb7f',
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
  '2023-03-07T09:37:35.3462967Z',
  'x-ms-file-last-write-time',
  '2023-03-07T09:37:35.0909966Z',
  'x-ms-file-creation-time',
  '2023-03-07T09:37:35.0909966Z',
  'x-ms-file-permission-key',
  '18144810169125879831*1871445747569276785',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '0',
  'Date',
  'Tue, 07 Mar 2023 09:37:35 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share167818185422107006/dir167818185447905823..../file167818185473706381....')
  .reply(404, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '790792e0-a01a-0005-43d8-50f0c9000000',
  'x-ms-client-request-id',
  '694ac22d-c495-474d-b95b-eea238eac33a',
  'x-ms-version',
  '2022-11-02',
  'x-ms-error-code',
  'ResourceNotFound',
  'Date',
  'Tue, 07 Mar 2023 09:37:36 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167818185422107006/destfile1167818185600708818....')
  .query(true)
  .reply(200, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 07 Mar 2023 09:37:36 GMT',
  'ETag',
  '"0x8DB1EEF95DF65C5"',
  'x-ms-request-id',
  '790792e1-a01a-0005-44d8-50f0c9000000',
  'x-ms-client-request-id',
  'a2e35de7-ebc6-43e9-8da4-c72560e29e6e',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-03-07T09:37:36.3519941Z',
  'x-ms-file-last-write-time',
  '2023-03-07T09:37:35.0909966Z',
  'x-ms-file-creation-time',
  '2023-03-07T09:37:35.0909966Z',
  'x-ms-file-permission-key',
  '18144810169125879831*1871445747569276785',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 07 Mar 2023 09:37:36 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share167818185422107006/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.file.core.windows.net/\" ShareName=\"share167818185422107006\" DirectoryPath=\"\"><DirectoryId>0</DirectoryId><Entries><File><Name>destfile1167818185600708818....</Name><FileId>11529285414812647424</FileId><Properties><Content-Length>1024</Content-Length></Properties></File><Directory><Name>dir167818185447905823....</Name><FileId>13835128424026341376</FileId><Properties /></Directory></Entries><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'x-ms-request-id',
  '790792e2-a01a-0005-45d8-50f0c9000000',
  'x-ms-client-request-id',
  '84122115-b135-4e28-a8fe-fbeed7152128',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Tue, 07 Mar 2023 09:37:36 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share167818185422107006/destfile1167818185600708818....')
  .reply(200, "", [
  'Content-Length',
  '1024',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Tue, 07 Mar 2023 09:37:36 GMT',
  'ETag',
  '"0x8DB1EEF95DF65C5"',
  'x-ms-request-id',
  '790792e3-a01a-0005-46d8-50f0c9000000',
  'x-ms-client-request-id',
  '2db5aace-e40f-4746-bde1-807377481f12',
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
  '2023-03-07T09:37:36.3519941Z',
  'x-ms-file-last-write-time',
  '2023-03-07T09:37:35.0909966Z',
  'x-ms-file-creation-time',
  '2023-03-07T09:37:35.0909966Z',
  'x-ms-file-permission-key',
  '18144810169125879831*1871445747569276785',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '0',
  'Date',
  'Tue, 07 Mar 2023 09:37:36 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share167818185422107006/destfile167818185499908826....')
  .reply(404, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '790792e4-a01a-0005-47d8-50f0c9000000',
  'x-ms-client-request-id',
  'a7cc143e-5b0b-4978-96b6-62b5c6cdfbc8',
  'x-ms-version',
  '2022-11-02',
  'x-ms-error-code',
  'ResourceNotFound',
  'Date',
  'Tue, 07 Mar 2023 09:37:36 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167818185422107006')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '790792e5-a01a-0005-48d8-50f0c9000000',
  'x-ms-client-request-id',
  '3da8c8d9-2e9f-41c5-a2d0-31ae92ad0180',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Tue, 07 Mar 2023 09:37:37 GMT'
]);
