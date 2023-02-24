let nock = require('nock');

module.exports.hash = "b0cbbb220e773c4316a538ea698135ae";

module.exports.testInfo = {"uniqueName":{"share":"share167747852576500307","dir":"dir167747852717008242","file":"file167747852749703757"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747852576500307')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 06:15:27 GMT',
  'ETag',
  '"0x8DB188A052115C9"',
  'x-ms-request-id',
  '1775e946-e01a-0001-5072-4a1b65000000',
  'x-ms-client-request-id',
  'df6fa94c-38fd-4404-a816-0e8599ab0965',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 06:15:27 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747852576500307/dir167747852717008242....')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 06:15:27 GMT',
  'ETag',
  '"0x8DB188A055777C0"',
  'x-ms-request-id',
  '1775e949-e01a-0001-5172-4a1b65000000',
  'x-ms-client-request-id',
  'a39ccec3-a6a8-418a-b1c4-a7619d350b31',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T06:15:27.7228992Z',
  'x-ms-file-last-write-time',
  '2023-02-27T06:15:27.7228992Z',
  'x-ms-file-creation-time',
  '2023-02-27T06:15:27.7228992Z',
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
  'Mon, 27 Feb 2023 06:15:27 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747852576500307/dir167747852717008242..../file167747852749703757....')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 06:15:28 GMT',
  'ETag',
  '"0x8DB188A05836A0E"',
  'x-ms-request-id',
  '1775e94b-e01a-0001-5272-4a1b65000000',
  'x-ms-client-request-id',
  'a4ec7105-082d-4e84-9cbb-0538c192d4cb',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T06:15:28.0109070Z',
  'x-ms-file-last-write-time',
  '2023-02-27T06:15:28.0109070Z',
  'x-ms-file-creation-time',
  '2023-02-27T06:15:28.0109070Z',
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
  'Mon, 27 Feb 2023 06:15:27 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share167747852576500307/dir167747852717008242....')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.file.core.windows.net/\" ShareName=\"share167747852576500307\" DirectoryPath=\"dir167747852717008242\"><DirectoryId>13835128424026341376</DirectoryId><Entries><File><Name>file167747852749703757</Name><FileId>11529285414812647424</FileId><Properties><Content-Length>11</Content-Length></Properties></File></Entries><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'x-ms-request-id',
  '1775e94c-e01a-0001-5372-4a1b65000000',
  'x-ms-client-request-id',
  '0a6c844c-aab5-4c44-b0bc-fa71b4d9d7ca',
  'x-ms-version',
  '2022-11-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 27 Feb 2023 06:15:28 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167747852576500307')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '1775e94d-e01a-0001-5472-4a1b65000000',
  'x-ms-client-request-id',
  'e7e05ada-4968-4028-9755-bb08fda0c155',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 06:15:28 GMT'
]);
