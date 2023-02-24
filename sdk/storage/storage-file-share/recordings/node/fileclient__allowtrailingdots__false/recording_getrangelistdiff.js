let nock = require('nock');

module.exports.hash = "6f7d642981e338148930a5ad693e5f29";

module.exports.testInfo = {"uniqueName":{"share":"share167747855461809073","dir":"dir167747855487400728","file":"file167747855514801306"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747855461809073')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 06:15:55 GMT',
  'ETag',
  '"0x8DB188A15AC63AC"',
  'x-ms-request-id',
  '1775e9de-e01a-0001-4172-4a1b65000000',
  'x-ms-client-request-id',
  'bb1e3b01-af19-4ff1-bd95-533235a710b9',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 06:15:54 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747855461809073/dir167747855487400728....')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 06:15:55 GMT',
  'ETag',
  '"0x8DB188A15D7300E"',
  'x-ms-request-id',
  '1775e9e0-e01a-0001-4272-4a1b65000000',
  'x-ms-client-request-id',
  'bbe147f7-52f4-4993-a5fb-f29c2b631e32',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T06:15:55.4034702Z',
  'x-ms-file-last-write-time',
  '2023-02-27T06:15:55.4034702Z',
  'x-ms-file-creation-time',
  '2023-02-27T06:15:55.4034702Z',
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
  'Mon, 27 Feb 2023 06:15:54 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747855461809073/dir167747855487400728..../file167747855514801306....')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 06:15:55 GMT',
  'ETag',
  '"0x8DB188A15FEDC6F"',
  'x-ms-request-id',
  '1775e9e1-e01a-0001-4372-4a1b65000000',
  'x-ms-client-request-id',
  '5ef64813-673d-4f85-a0ad-aaede8b64b76',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T06:15:55.6634735Z',
  'x-ms-file-last-write-time',
  '2023-02-27T06:15:55.6634735Z',
  'x-ms-file-creation-time',
  '2023-02-27T06:15:55.6634735Z',
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
  'Mon, 27 Feb 2023 06:15:54 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747855461809073/dir167747855487400728..../file167747855514801306....', "Hello")
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  'ixqZU8RhEpaoJ6v4xHgE1w==',
  'Last-Modified',
  'Mon, 27 Feb 2023 06:15:55 GMT',
  'ETag',
  '"0x8DB188A1626FE77"',
  'x-ms-request-id',
  '1775e9e2-e01a-0001-4472-4a1b65000000',
  'x-ms-client-request-id',
  '524df2e4-a451-42d3-828e-e105c6c8c490',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-last-write-time',
  '2023-02-27T06:15:55.9264887Z',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 27 Feb 2023 06:15:55 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747855461809073')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 06:15:55 GMT',
  'ETag',
  '"0x8DB188A15AC63AC"',
  'x-ms-request-id',
  '1775e9e3-e01a-0001-4572-4a1b65000000',
  'x-ms-client-request-id',
  '6a0b1e88-8a80-4aab-b24a-0101d0b06727',
  'x-ms-version',
  '2022-11-02',
  'x-ms-snapshot',
  '2023-02-27T06:15:56.0000000Z',
  'Date',
  'Mon, 27 Feb 2023 06:15:55 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747855461809073/dir167747855487400728..../file167747855514801306....')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 06:15:56 GMT',
  'ETag',
  '"0x8DB188A1676A52A"',
  'x-ms-request-id',
  '1775e9e4-e01a-0001-4672-4a1b65000000',
  'x-ms-client-request-id',
  '075349c3-6209-4554-9201-086141734a69',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-last-write-time',
  '2023-02-27T06:15:56.4484906Z',
  'Date',
  'Mon, 27 Feb 2023 06:15:55 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747855461809073/dir167747855487400728..../file167747855514801306....', "World")
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  '9aeSTmIehMkoCpon4by39g==',
  'Last-Modified',
  'Mon, 27 Feb 2023 06:15:56 GMT',
  'ETag',
  '"0x8DB188A169D8E5F"',
  'x-ms-request-id',
  '1775e9e5-e01a-0001-4772-4a1b65000000',
  'x-ms-client-request-id',
  'd03fa13d-93a5-45d7-8ce8-847ba3ef5763',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-last-write-time',
  '2023-02-27T06:15:56.7034975Z',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 27 Feb 2023 06:15:55 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share167747855461809073/dir167747855487400728..../file167747855514801306....')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Ranges><ClearRange><Start>0</Start><End>511</End></ClearRange><Range><Start>512</Start><End>1535</End></Range></Ranges>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Last-Modified',
  'Mon, 27 Feb 2023 06:15:56 GMT',
  'ETag',
  '"0x8DB188A169D8E5F"',
  'x-ms-request-id',
  '1775e9e6-e01a-0001-4872-4a1b65000000',
  'x-ms-client-request-id',
  '55f0a4f3-575a-4f8e-9ca2-b299b6d29377',
  'x-ms-version',
  '2022-11-02',
  'x-ms-content-length',
  '2049',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-content-length',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 27 Feb 2023 06:15:56 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167747855461809073')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '1775e9e8-e01a-0001-4972-4a1b65000000',
  'x-ms-client-request-id',
  '668811e3-23b0-4243-bd2d-369f2fc13653',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 06:15:56 GMT'
]);
