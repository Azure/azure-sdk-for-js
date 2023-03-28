let nock = require('nock');

module.exports.hash = "e54e50bbaf6917c11972b594371c1acd";

module.exports.testInfo = {"uniqueName":{"share":"share167747855195504059","dir":"dir167747855220905102","file":"file167747855247407495"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747855195504059')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 06:15:52 GMT',
  'ETag',
  '"0x8DB188A141606A5"',
  'x-ms-request-id',
  '1775e9d1-e01a-0001-3672-4a1b65000000',
  'x-ms-client-request-id',
  '43bce08f-c743-47ad-a2d1-d559fcb7419f',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 06:15:51 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747855195504059/dir167747855220905102....')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 06:15:52 GMT',
  'ETag',
  '"0x8DB188A143F4FD4"',
  'x-ms-request-id',
  '1775e9d3-e01a-0001-3772-4a1b65000000',
  'x-ms-client-request-id',
  'ec94f990-735f-4f89-b0a0-75832ef4703d',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T06:15:52.7304148Z',
  'x-ms-file-last-write-time',
  '2023-02-27T06:15:52.7304148Z',
  'x-ms-file-creation-time',
  '2023-02-27T06:15:52.7304148Z',
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
  'Mon, 27 Feb 2023 06:15:52 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747855195504059/dir167747855220905102..../file167747855247407495....')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 06:15:52 GMT',
  'ETag',
  '"0x8DB188A1466AE24"',
  'x-ms-request-id',
  '1775e9d4-e01a-0001-3872-4a1b65000000',
  'x-ms-client-request-id',
  'c1e653a1-03d3-4d2e-aa95-017330fc8942',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T06:15:52.9884196Z',
  'x-ms-file-last-write-time',
  '2023-02-27T06:15:52.9884196Z',
  'x-ms-file-creation-time',
  '2023-02-27T06:15:52.9884196Z',
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
  'Mon, 27 Feb 2023 06:15:52 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747855195504059/dir167747855220905102..../file167747855247407495....', "Hello")
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  'ixqZU8RhEpaoJ6v4xHgE1w==',
  'Last-Modified',
  'Mon, 27 Feb 2023 06:15:53 GMT',
  'ETag',
  '"0x8DB188A148E5A9D"',
  'x-ms-request-id',
  '1775e9d6-e01a-0001-3a72-4a1b65000000',
  'x-ms-client-request-id',
  'f779daf5-f821-4b16-b0e9-2ef4e33b7090',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-last-write-time',
  '2023-02-27T06:15:53.2484253Z',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 27 Feb 2023 06:15:52 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747855195504059/dir167747855220905102..../file167747855247407495....', "World")
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  '9aeSTmIehMkoCpon4by39g==',
  'Last-Modified',
  'Mon, 27 Feb 2023 06:15:53 GMT',
  'ETag',
  '"0x8DB188A14B5B907"',
  'x-ms-request-id',
  '1775e9d7-e01a-0001-3b72-4a1b65000000',
  'x-ms-client-request-id',
  '2de8e067-c388-4f27-924c-f7bc7d1b842a',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-last-write-time',
  '2023-02-27T06:15:53.5064327Z',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 27 Feb 2023 06:15:52 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747855195504059/dir167747855220905102..../file167747855247407495....')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 06:15:53 GMT',
  'ETag',
  '"0x8DB188A14DC2CFE"',
  'x-ms-request-id',
  '1775e9d8-e01a-0001-3c72-4a1b65000000',
  'x-ms-client-request-id',
  '8ea75848-277c-432c-a943-bc1d69f16ae7',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-last-write-time',
  '2023-02-27T06:15:53.7584382Z',
  'Date',
  'Mon, 27 Feb 2023 06:15:53 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747855195504059')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 06:15:52 GMT',
  'ETag',
  '"0x8DB188A141606A5"',
  'x-ms-request-id',
  '1775e9d9-e01a-0001-3d72-4a1b65000000',
  'x-ms-client-request-id',
  '49976dee-5c14-48c1-9c9e-33cb12b26cf5',
  'x-ms-version',
  '2022-11-02',
  'x-ms-snapshot',
  '2023-02-27T06:15:54.0000000Z',
  'Date',
  'Mon, 27 Feb 2023 06:15:53 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747855195504059/dir167747855220905102..../file167747855247407495....', "Hello")
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  'ixqZU8RhEpaoJ6v4xHgE1w==',
  'Last-Modified',
  'Mon, 27 Feb 2023 06:15:54 GMT',
  'ETag',
  '"0x8DB188A1535E634"',
  'x-ms-request-id',
  '1775e9da-e01a-0001-3e72-4a1b65000000',
  'x-ms-client-request-id',
  'e862fc19-604c-4eb0-aafe-864d996c7ea8',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-last-write-time',
  '2023-02-27T06:15:54.3464500Z',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 27 Feb 2023 06:15:53 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share167747855195504059/dir167747855220905102..../file167747855247407495....')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Ranges><Range><Start>512</Start><End>512</End></Range></Ranges>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Last-Modified',
  'Mon, 27 Feb 2023 06:15:53 GMT',
  'ETag',
  '"0x8DB188A14DC2CFE"',
  'x-ms-request-id',
  '1775e9db-e01a-0001-3f72-4a1b65000000',
  'x-ms-client-request-id',
  'ba03f7c7-8a56-4861-a921-97636bd27d70',
  'x-ms-version',
  '2022-11-02',
  'x-ms-content-length',
  '513',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-content-length',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 27 Feb 2023 06:15:53 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167747855195504059')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '1775e9dd-e01a-0001-4072-4a1b65000000',
  'x-ms-client-request-id',
  '7c6cf3ab-3f1c-42db-943b-e713451e898b',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 06:15:54 GMT'
]);
