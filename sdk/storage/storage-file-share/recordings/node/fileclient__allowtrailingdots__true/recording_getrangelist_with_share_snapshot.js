let nock = require('nock');

module.exports.hash = "e54e50bbaf6917c11972b594371c1acd";

module.exports.testInfo = {"uniqueName":{"share":"share167747747906007786","dir":"dir167747747931500409","file":"file167747747957604182"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747747906007786')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 05:57:59 GMT',
  'ETag',
  '"0x8DB188794954E2C"',
  'x-ms-request-id',
  'e51cf737-601a-0004-1e70-4a0ec4000000',
  'x-ms-client-request-id',
  '72808e4f-b8e8-4356-bcc6-57dbd9bb4dbf',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 05:57:59 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747747906007786/dir167747747931500409....')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 05:57:59 GMT',
  'ETag',
  '"0x8DB188794BE3A11"',
  'x-ms-request-id',
  'e51cf739-601a-0004-1f70-4a0ec4000000',
  'x-ms-client-request-id',
  'a476b8a1-1eaa-4eae-9141-170e4d1698b7',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T05:57:59.8203409Z',
  'x-ms-file-last-write-time',
  '2023-02-27T05:57:59.8203409Z',
  'x-ms-file-creation-time',
  '2023-02-27T05:57:59.8203409Z',
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
  'Mon, 27 Feb 2023 05:57:59 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747747906007786/dir167747747931500409..../file167747747957604182....')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 05:58:00 GMT',
  'ETag',
  '"0x8DB188794E59868"',
  'x-ms-request-id',
  'e51cf73a-601a-0004-2070-4a0ec4000000',
  'x-ms-client-request-id',
  'c97bf297-599a-4f12-9a78-98e4d00507dc',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T05:58:00.0783464Z',
  'x-ms-file-last-write-time',
  '2023-02-27T05:58:00.0783464Z',
  'x-ms-file-creation-time',
  '2023-02-27T05:58:00.0783464Z',
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
  'Mon, 27 Feb 2023 05:58:00 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747747906007786/dir167747747931500409..../file167747747957604182....', "Hello")
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  'ixqZU8RhEpaoJ6v4xHgE1w==',
  'Last-Modified',
  'Mon, 27 Feb 2023 05:58:00 GMT',
  'ETag',
  '"0x8DB1887950CCF90"',
  'x-ms-request-id',
  'e51cf73b-601a-0004-2170-4a0ec4000000',
  'x-ms-client-request-id',
  '213e040f-cdb6-4bc0-8fc6-87b5c65f34f9',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-last-write-time',
  '2023-02-27T05:58:00.3353488Z',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 27 Feb 2023 05:58:00 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747747906007786/dir167747747931500409..../file167747747957604182....', "World")
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  '9aeSTmIehMkoCpon4by39g==',
  'Last-Modified',
  'Mon, 27 Feb 2023 05:58:00 GMT',
  'ETag',
  '"0x8DB188795336A90"',
  'x-ms-request-id',
  'e51cf73c-601a-0004-2270-4a0ec4000000',
  'x-ms-client-request-id',
  '3d91c254-9821-4b22-99da-b193bb22a7ff',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-last-write-time',
  '2023-02-27T05:58:00.5883536Z',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 27 Feb 2023 05:58:00 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747747906007786/dir167747747931500409..../file167747747957604182....')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 05:58:00 GMT',
  'ETag',
  '"0x8DB188795594278"',
  'x-ms-request-id',
  'e51cf73d-601a-0004-2370-4a0ec4000000',
  'x-ms-client-request-id',
  '6432a09d-3dbf-4356-b015-c0e1c783c942',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-last-write-time',
  '2023-02-27T05:58:00.8363640Z',
  'Date',
  'Mon, 27 Feb 2023 05:58:00 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747747906007786')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 05:57:59 GMT',
  'ETag',
  '"0x8DB188794954E2C"',
  'x-ms-request-id',
  'e51cf73e-601a-0004-2470-4a0ec4000000',
  'x-ms-client-request-id',
  '7a375305-351d-4c8f-9ccc-cfff4f12deb7',
  'x-ms-version',
  '2022-11-02',
  'x-ms-snapshot',
  '2023-02-27T05:58:01.0000000Z',
  'Date',
  'Mon, 27 Feb 2023 05:58:01 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747747906007786/dir167747747931500409..../file167747747957604182....', "Hello")
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  'ixqZU8RhEpaoJ6v4xHgE1w==',
  'Last-Modified',
  'Mon, 27 Feb 2023 05:58:01 GMT',
  'ETag',
  '"0x8DB188795A7FF34"',
  'x-ms-request-id',
  'e51cf73f-601a-0004-2570-4a0ec4000000',
  'x-ms-client-request-id',
  '4a448f08-6f64-4abd-a8ee-6cdfa6bde194',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-last-write-time',
  '2023-02-27T05:58:01.3523764Z',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 27 Feb 2023 05:58:01 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share167747747906007786/dir167747747931500409..../file167747747957604182....')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Ranges><Range><Start>512</Start><End>512</End></Range></Ranges>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Last-Modified',
  'Mon, 27 Feb 2023 05:58:00 GMT',
  'ETag',
  '"0x8DB188795594278"',
  'x-ms-request-id',
  'e51cf740-601a-0004-2670-4a0ec4000000',
  'x-ms-client-request-id',
  '2e7bdc97-5e6f-445d-a7c6-d4cd222fbc14',
  'x-ms-version',
  '2022-11-02',
  'x-ms-content-length',
  '513',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-content-length',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 27 Feb 2023 05:58:01 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167747747906007786')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  'e51cf742-601a-0004-2770-4a0ec4000000',
  'x-ms-client-request-id',
  '87447a28-a515-4fb6-9474-bec6c898d996',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 05:58:01 GMT'
]);
