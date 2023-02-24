let nock = require('nock');

module.exports.hash = "376300b1ff8bb2e911a7f7d3b70c0d0a";

module.exports.testInfo = {"uniqueName":{"share":"share167747855697200170","dir":"dir167747855725007721","file":"file167747855751203460"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747855697200170')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 06:15:57 GMT',
  'ETag',
  '"0x8DB188A17174383"',
  'x-ms-request-id',
  '1775e9e9-e01a-0001-4a72-4a1b65000000',
  'x-ms-client-request-id',
  '122706e7-c498-4948-8f79-1011e4b098f5',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 06:15:56 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747855697200170/dir167747855725007721....')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 06:15:57 GMT',
  'ETag',
  '"0x8DB188A174010FE"',
  'x-ms-request-id',
  '1775e9eb-e01a-0001-4b72-4a1b65000000',
  'x-ms-client-request-id',
  'e12cd556-f69f-4ad1-95cd-95815118fabe',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T06:15:57.7685246Z',
  'x-ms-file-last-write-time',
  '2023-02-27T06:15:57.7685246Z',
  'x-ms-file-creation-time',
  '2023-02-27T06:15:57.7685246Z',
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
  'Mon, 27 Feb 2023 06:15:56 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747855697200170/dir167747855725007721..../file167747855751203460....')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 06:15:58 GMT',
  'ETag',
  '"0x8DB188A17674807"',
  'x-ms-request-id',
  '1775e9ec-e01a-0001-4c72-4a1b65000000',
  'x-ms-client-request-id',
  '357684b5-aaac-4630-9c76-e781b3373b6f',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T06:15:58.0255239Z',
  'x-ms-file-last-write-time',
  '2023-02-27T06:15:58.0255239Z',
  'x-ms-file-creation-time',
  '2023-02-27T06:15:58.0255239Z',
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
  'Mon, 27 Feb 2023 06:15:57 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747855697200170/dir167747855725007721..../file167747855751203460....', "Hello")
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  'ixqZU8RhEpaoJ6v4xHgE1w==',
  'Last-Modified',
  'Mon, 27 Feb 2023 06:15:58 GMT',
  'ETag',
  '"0x8DB188A178EA6D5"',
  'x-ms-request-id',
  '1775e9ed-e01a-0001-4d72-4a1b65000000',
  'x-ms-client-request-id',
  '7e2885a4-9c72-45eb-93c2-5c11f83e4e6f',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-last-write-time',
  '2023-02-27T06:15:58.2835413Z',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 27 Feb 2023 06:15:57 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747855697200170')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 06:15:57 GMT',
  'ETag',
  '"0x8DB188A17174383"',
  'x-ms-request-id',
  '1775e9ee-e01a-0001-4e72-4a1b65000000',
  'x-ms-client-request-id',
  'ea6321b4-4b9d-49a0-95b8-a8f6feb43385',
  'x-ms-version',
  '2022-11-02',
  'x-ms-snapshot',
  '2023-02-27T06:15:58.0000000Z',
  'Date',
  'Mon, 27 Feb 2023 06:15:57 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747855697200170/dir167747855725007721..../file167747855751203460....')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 06:15:58 GMT',
  'ETag',
  '"0x8DB188A17DD150A"',
  'x-ms-request-id',
  '1775e9ef-e01a-0001-4f72-4a1b65000000',
  'x-ms-client-request-id',
  '94a55337-4b29-4508-a8a7-811cd44ee2aa',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-last-write-time',
  '2023-02-27T06:15:58.7975434Z',
  'Date',
  'Mon, 27 Feb 2023 06:15:57 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747855697200170/dir167747855725007721..../file167747855751203460....', "World")
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  '9aeSTmIehMkoCpon4by39g==',
  'Last-Modified',
  'Mon, 27 Feb 2023 06:15:59 GMT',
  'ETag',
  '"0x8DB188A1803FE21"',
  'x-ms-request-id',
  '1775e9f0-e01a-0001-5072-4a1b65000000',
  'x-ms-client-request-id',
  'f9b84a04-cacb-443d-a166-e26d7df37811',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-last-write-time',
  '2023-02-27T06:15:59.0525473Z',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 27 Feb 2023 06:15:59 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747855697200170')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 06:15:57 GMT',
  'ETag',
  '"0x8DB188A17174383"',
  'x-ms-request-id',
  '1775e9f1-e01a-0001-5172-4a1b65000000',
  'x-ms-client-request-id',
  'b0a231ae-afa3-4b62-8320-1e4dd56e0ce1',
  'x-ms-version',
  '2022-11-02',
  'x-ms-snapshot',
  '2023-02-27T06:15:59.0000000Z',
  'Date',
  'Mon, 27 Feb 2023 06:15:59 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747855697200170/dir167747855725007721..../file167747855751203460....', "Hello")
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  'ixqZU8RhEpaoJ6v4xHgE1w==',
  'Last-Modified',
  'Mon, 27 Feb 2023 06:15:59 GMT',
  'ETag',
  '"0x8DB188A185356F7"',
  'x-ms-request-id',
  '1775e9f2-e01a-0001-5272-4a1b65000000',
  'x-ms-client-request-id',
  'ce61e6b1-a782-46a1-b160-75e1336be8b9',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-last-write-time',
  '2023-02-27T06:15:59.5725559Z',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 27 Feb 2023 06:15:59 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share167747855697200170/dir167747855725007721..../file167747855751203460....')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Ranges><ClearRange><Start>0</Start><End>511</End></ClearRange><Range><Start>512</Start><End>1535</End></Range></Ranges>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Last-Modified',
  'Mon, 27 Feb 2023 06:15:59 GMT',
  'ETag',
  '"0x8DB188A1803FE21"',
  'x-ms-request-id',
  '1775e9f3-e01a-0001-5372-4a1b65000000',
  'x-ms-client-request-id',
  'a4c6fa06-28ac-49d1-9bcf-39edeac8c6d8',
  'x-ms-version',
  '2022-11-02',
  'x-ms-content-length',
  '2049',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-content-length',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 27 Feb 2023 06:15:59 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167747855697200170')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '1775e9f6-e01a-0001-5472-4a1b65000000',
  'x-ms-client-request-id',
  'f514384b-8257-4b16-97f5-d5867a399c91',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 06:16:00 GMT'
]);
