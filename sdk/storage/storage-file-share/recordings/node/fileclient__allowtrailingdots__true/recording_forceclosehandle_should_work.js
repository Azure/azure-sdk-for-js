let nock = require('nock');

module.exports.hash = "1f54683e6068900425c3f9984c2bc283";

module.exports.testInfo = {"uniqueName":{"share":"share167747749084201741","dir":"dir167747749109106444","file":"file167747749134804830"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747749084201741')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 05:58:11 GMT',
  'ETag',
  '"0x8DB18879B9AA872"',
  'x-ms-request-id',
  'e51cf772-601a-0004-4c70-4a0ec4000000',
  'x-ms-client-request-id',
  '2d1e3cfc-33d0-45f1-9f51-c45987bf5640',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 05:58:11 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747749084201741/dir167747749109106444....')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 05:58:11 GMT',
  'ETag',
  '"0x8DB18879BC2AE65"',
  'x-ms-request-id',
  'e51cf774-601a-0004-4d70-4a0ec4000000',
  'x-ms-client-request-id',
  '1dc3c0d4-6823-427b-8988-e8e800093a93',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T05:58:11.5935845Z',
  'x-ms-file-last-write-time',
  '2023-02-27T05:58:11.5935845Z',
  'x-ms-file-creation-time',
  '2023-02-27T05:58:11.5935845Z',
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
  'Mon, 27 Feb 2023 05:58:11 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747749084201741/dir167747749109106444..../file167747749134804830....')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 05:58:11 GMT',
  'ETag',
  '"0x8DB18879BEA0CDE"',
  'x-ms-request-id',
  'e51cf775-601a-0004-4e70-4a0ec4000000',
  'x-ms-client-request-id',
  '3ffff093-6e2f-4c9e-9b00-d81b14a9ac26',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T05:58:11.8515934Z',
  'x-ms-file-last-write-time',
  '2023-02-27T05:58:11.8515934Z',
  'x-ms-file-creation-time',
  '2023-02-27T05:58:11.8515934Z',
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
  'Mon, 27 Feb 2023 05:58:11 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share167747749084201741/dir167747749109106444..../file167747749134804830....')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults><Entries /><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'x-ms-request-id',
  'e51cf776-601a-0004-4f70-4a0ec4000000',
  'x-ms-client-request-id',
  '38cc5018-ff69-4a37-9c9a-3438e413d1c4',
  'x-ms-version',
  '2022-11-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 27 Feb 2023 05:58:11 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167747749084201741')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  'e51cf777-601a-0004-5070-4a0ec4000000',
  'x-ms-client-request-id',
  '58dceb53-a6c2-46b4-821f-7f24c6714865',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 05:58:12 GMT'
]);
