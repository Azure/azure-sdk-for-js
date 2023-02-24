let nock = require('nock');

module.exports.hash = "48f2a8d90258cab84bae7768aee13b46";

module.exports.testInfo = {"uniqueName":{"share":"share167875883152702281","dir":"dir167875883177805076","file":"file167875883204705430"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167875883152702281')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Mar 2023 01:53:51 GMT',
  'ETag',
  '"0x8DB242EF616C9ED"',
  'x-ms-request-id',
  '0b0de3aa-701a-0008-2217-56c247000000',
  'x-ms-client-request-id',
  '5a14d054-47cc-48e9-8451-5d99e60217ae',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Tue, 14 Mar 2023 01:53:51 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167875883152702281/dir167875883177805076.')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Mar 2023 01:53:52 GMT',
  'ETag',
  '"0x8DB242EF63EA88B"',
  'x-ms-request-id',
  '0b0de3ac-701a-0008-2317-56c247000000',
  'x-ms-client-request-id',
  '6de55f87-64ca-4927-855f-b190d464c767',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-03-14T01:53:52.1454219Z',
  'x-ms-file-last-write-time',
  '2023-03-14T01:53:52.1454219Z',
  'x-ms-file-creation-time',
  '2023-03-14T01:53:52.1454219Z',
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
  'Tue, 14 Mar 2023 01:53:52 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167875883152702281/dir167875883177805076./file167875883204705430.')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Mar 2023 01:53:52 GMT',
  'ETag',
  '"0x8DB242EF667DC2F"',
  'x-ms-request-id',
  '0b0de3ae-701a-0008-2417-56c247000000',
  'x-ms-client-request-id',
  '82af5237-8ee9-4cb6-9879-9aefe6ebcdfa',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-03-14T01:53:52.4154415Z',
  'x-ms-file-last-write-time',
  '2023-03-14T01:53:52.4154415Z',
  'x-ms-file-creation-time',
  '2023-03-14T01:53:52.4154415Z',
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
  'Tue, 14 Mar 2023 01:53:52 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share167875883152702281/dir167875883177805076.')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.file.core.windows.net/\" ShareName=\"share167875883152702281\" DirectoryPath=\"dir167875883177805076\"><DirectoryId>13835128424026341376</DirectoryId><Entries><File><Name>file167875883204705430</Name><FileId>11529285414812647424</FileId><Properties><Content-Length>1024</Content-Length></Properties></File></Entries><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'x-ms-request-id',
  '0b0de3af-701a-0008-2517-56c247000000',
  'x-ms-client-request-id',
  '2d2703fe-f884-4759-a862-123395cfd48d',
  'x-ms-version',
  '2022-11-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 14 Mar 2023 01:53:52 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share167875883152702281/dir167875883177805076./file167875883204705430.')
  .reply(200, "", [
  'Content-Length',
  '1024',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Tue, 14 Mar 2023 01:53:52 GMT',
  'ETag',
  '"0x8DB242EF667DC2F"',
  'x-ms-request-id',
  '0b0de3b0-701a-0008-2617-56c247000000',
  'x-ms-client-request-id',
  '961a5bfe-4a60-41a2-9139-e0644ac5b2e7',
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
  '2023-03-14T01:53:52.4154415Z',
  'x-ms-file-last-write-time',
  '2023-03-14T01:53:52.4154415Z',
  'x-ms-file-creation-time',
  '2023-03-14T01:53:52.4154415Z',
  'x-ms-file-permission-key',
  '18144810169125879831*1871445747569276785',
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
  'Tue, 14 Mar 2023 01:53:52 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167875883152702281/dir167875883177805076./file167875883204705430.')
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '0b0de3b1-701a-0008-2717-56c247000000',
  'x-ms-client-request-id',
  '68138ff6-b4c3-4702-86f8-37e7266c4894',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Tue, 14 Mar 2023 01:53:53 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share167875883152702281/dir167875883177805076./file167875883204705430.')
  .reply(404, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '0b0de3b2-701a-0008-2817-56c247000000',
  'x-ms-client-request-id',
  '10d893f1-e054-49e8-b71d-c0d17d641a03',
  'x-ms-version',
  '2022-11-02',
  'x-ms-error-code',
  'ResourceNotFound',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 14 Mar 2023 01:53:53 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167875883152702281')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '0b0de3b3-701a-0008-2917-56c247000000',
  'x-ms-client-request-id',
  '70a46683-1112-47f6-9806-e564bab578a6',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Tue, 14 Mar 2023 01:53:53 GMT'
]);
