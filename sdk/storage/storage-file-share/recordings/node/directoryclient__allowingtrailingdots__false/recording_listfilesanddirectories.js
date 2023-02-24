let nock = require('nock');

module.exports.hash = "df75c672a31cab82ba5e1dce4ef57cfb";

module.exports.testInfo = {"uniqueName":{"share":"share167875883878805884","dir":"dir167875883903907336","file":"file167875883929901963"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167875883878805884')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Mar 2023 01:53:59 GMT',
  'ETag',
  '"0x8DB242EFA6AC2E2"',
  'x-ms-request-id',
  'fd6a9f92-e01a-0007-2417-56fda4000000',
  'x-ms-client-request-id',
  '86fc7e03-a1cb-4f23-a641-28e2d62d86c7',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Tue, 14 Mar 2023 01:53:58 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167875883878805884/dir167875883903907336.')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Mar 2023 01:53:59 GMT',
  'ETag',
  '"0x8DB242EFA92B080"',
  'x-ms-request-id',
  'fd6a9f94-e01a-0007-2517-56fda4000000',
  'x-ms-client-request-id',
  '85beb9e7-b6d6-4daa-b8e1-a877b31cc9fe',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-03-14T01:53:59.4070144Z',
  'x-ms-file-last-write-time',
  '2023-03-14T01:53:59.4070144Z',
  'x-ms-file-creation-time',
  '2023-03-14T01:53:59.4070144Z',
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
  'Tue, 14 Mar 2023 01:53:59 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167875883878805884/dir167875883903907336./file167875883929901963...')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Mar 2023 01:53:59 GMT',
  'ETag',
  '"0x8DB242EFABA0F5F"',
  'x-ms-request-id',
  'fd6a9f95-e01a-0007-2617-56fda4000000',
  'x-ms-client-request-id',
  'e16a0adb-601c-4657-a9d6-e66365f1d17f',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-03-14T01:53:59.6650335Z',
  'x-ms-file-last-write-time',
  '2023-03-14T01:53:59.6650335Z',
  'x-ms-file-creation-time',
  '2023-03-14T01:53:59.6650335Z',
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
  'Tue, 14 Mar 2023 01:53:59 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share167875883878805884/dir167875883903907336.')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.file.core.windows.net/\" ShareName=\"share167875883878805884\" DirectoryPath=\"dir167875883903907336\"><DirectoryId>13835128424026341376</DirectoryId><Entries><File><Name>file167875883929901963</Name><FileId>11529285414812647424</FileId><Properties><Content-Length>1024</Content-Length></Properties></File></Entries><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'x-ms-request-id',
  'fd6a9f96-e01a-0007-2717-56fda4000000',
  'x-ms-client-request-id',
  '1e81088a-149f-4d77-9878-7984521015aa',
  'x-ms-version',
  '2022-11-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 14 Mar 2023 01:53:59 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167875883878805884')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  'fd6a9f97-e01a-0007-2817-56fda4000000',
  'x-ms-client-request-id',
  'c4acca80-4af5-434d-b9cd-06a4c1754ee2',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Tue, 14 Mar 2023 01:53:59 GMT'
]);
