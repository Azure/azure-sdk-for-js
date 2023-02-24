let nock = require('nock');

module.exports.hash = "6155c8aacaeb1dda6fc735d2d935b062";

module.exports.testInfo = {"uniqueName":{"share":"share167747746689101362","dir":"dir167747746715105758","file":"file167747746740607637","copiedfile":"copiedfile167747746766100402"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747746689101362')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 05:57:47 GMT',
  'ETag',
  '"0x8DB18878D54231F"',
  'x-ms-request-id',
  'e51cf6f5-601a-0004-7270-4a0ec4000000',
  'x-ms-client-request-id',
  '7aa2898a-7a9a-4af8-95bf-4146300fd31d',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 05:57:47 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747746689101362/dir167747746715105758....')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 05:57:47 GMT',
  'ETag',
  '"0x8DB18878D7D58BD"',
  'x-ms-request-id',
  'e51cf6f7-601a-0004-7370-4a0ec4000000',
  'x-ms-client-request-id',
  '6bb78ab3-3d5a-4751-a88e-b92f6702a770',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T05:57:47.6510909Z',
  'x-ms-file-last-write-time',
  '2023-02-27T05:57:47.6510909Z',
  'x-ms-file-creation-time',
  '2023-02-27T05:57:47.6510909Z',
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
  'Mon, 27 Feb 2023 05:57:47 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747746689101362/dir167747746715105758..../file167747746740607637....')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 05:57:47 GMT',
  'ETag',
  '"0x8DB18878DA44204"',
  'x-ms-request-id',
  'e51cf6fa-601a-0004-7470-4a0ec4000000',
  'x-ms-client-request-id',
  'e08e2b53-1550-4381-8aba-d1f67a3402e1',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T05:57:47.9060996Z',
  'x-ms-file-last-write-time',
  '2023-02-27T05:57:47.9060996Z',
  'x-ms-file-creation-time',
  '2023-02-27T05:57:47.9060996Z',
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
  'Mon, 27 Feb 2023 05:57:47 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747746689101362/dir167747746715105758..../copiedfile167747746766100402...')
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 05:57:48 GMT',
  'ETag',
  '"0x8DB18878DD89905"',
  'x-ms-request-id',
  'e51cf6fb-601a-0004-7570-4a0ec4000000',
  'x-ms-client-request-id',
  'c08c7a37-fa5e-4e28-957b-482255663ad9',
  'x-ms-version',
  '2022-11-02',
  'x-ms-copy-id',
  '6965fb27-836c-4b11-aba8-85157d4d54e5',
  'x-ms-copy-status',
  'success',
  'Date',
  'Mon, 27 Feb 2023 05:57:48 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747746689101362/dir167747746715105758..../copiedfile167747746766100402...')
  .query(true)
  .reply(409, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>NoPendingCopyOperation</Code><Message>There is currently no pending copy operation.\nRequestId:e51cf705-601a-0004-7670-4a0ec4000000\nTime:2023-02-27T05:57:49.5170463Z</Message></Error>", [
  'Content-Length',
  '236',
  'Content-Type',
  'application/xml',
  'x-ms-request-id',
  'e51cf705-601a-0004-7670-4a0ec400000',
  'x-ms-client-request-id',
  'd4df1ade-de54-45b9-b8df-7f7821eb98ed',
  'x-ms-version',
  '2022-11-02',
  'x-ms-error-code',
  'NoPendingCopyOperation',
  'Date',
  'Mon, 27 Feb 2023 05:57:49 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167747746689101362')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  'e51cf706-601a-0004-7770-4a0ec4000000',
  'x-ms-client-request-id',
  'e073a020-36f6-444e-851a-bbfcd9c46364',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 05:57:49 GMT'
]);
