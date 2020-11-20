let nock = require('nock');

module.exports.hash = "ecc86a388096f76385f242437ba54e04";

module.exports.testInfo = {"uniqueName":{"share":"share160093496274204261","dir":"dir160093496386306197","file":"file160093496414402587"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share160093496274204261')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Thu, 24 Sep 2020 08:09:23 GMT',
  'ETag',
  '"0x8D8606125ECAA54"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '57bc47ad-101a-0013-5c4a-92d4a8000000',
  'x-ms-client-request-id',
  '9f3fc9c8-519a-4053-bd70-a009a88f955b',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Thu, 24 Sep 2020 08:09:23 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share160093496274204261/dir160093496386306197')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Thu, 24 Sep 2020 08:09:24 GMT',
  'ETag',
  '"0x8D860612619E89B"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '57bc47b9-101a-0013-664a-92d4a8000000',
  'x-ms-client-request-id',
  '74aeced9-0b89-4bfd-bbf7-1de223859b08',
  'x-ms-version',
  '2020-02-10',
  'x-ms-file-change-time',
  '2020-09-24T08:09:24.0251547Z',
  'x-ms-file-last-write-time',
  '2020-09-24T08:09:24.0251547Z',
  'x-ms-file-creation-time',
  '2020-09-24T08:09:24.0251547Z',
  'x-ms-file-permission-key',
  '2065021814682187374*8391130200578712039',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'false',
  'Date',
  'Thu, 24 Sep 2020 08:09:23 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share160093496274204261/dir160093496386306197/file160093496414402587')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Thu, 24 Sep 2020 08:09:24 GMT',
  'ETag',
  '"0x8D8606126456D6F"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '57bc47ca-101a-0013-734a-92d4a8000000',
  'x-ms-client-request-id',
  '96bc385e-4f8b-4526-a5fb-c1fc21daf807',
  'x-ms-version',
  '2020-02-10',
  'x-ms-file-change-time',
  '2020-09-24T08:09:24.3103599Z',
  'x-ms-file-last-write-time',
  '2020-09-24T08:09:24.3103599Z',
  'x-ms-file-creation-time',
  '2020-09-24T08:09:24.3103599Z',
  'x-ms-file-permission-key',
  '15912238054059149673*8391130200578712039',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'x-ms-request-server-encrypted',
  'false',
  'Date',
  'Thu, 24 Sep 2020 08:09:24 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share160093496274204261/dir160093496386306197/file160093496414402587', "Hello")
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  'ixqZU8RhEpaoJ6v4xHgE1w==',
  'Last-Modified',
  'Thu, 24 Sep 2020 08:09:24 GMT',
  'ETag',
  '"0x8D86061266FB986"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '57bc47d2-101a-0013-7b4a-92d4a8000000',
  'x-ms-client-request-id',
  '8ce7fbac-becb-452a-b555-aeaebe3b1938',
  'x-ms-version',
  '2020-02-10',
  'x-ms-request-server-encrypted',
  'false',
  'Date',
  'Thu, 24 Sep 2020 08:09:24 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share160093496274204261/dir160093496386306197/file160093496414402587', "World")
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  '9aeSTmIehMkoCpon4by39g==',
  'Last-Modified',
  'Thu, 24 Sep 2020 08:09:24 GMT',
  'ETag',
  '"0x8D860612699421C"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '57bc47d8-101a-0013-014a-92d4a8000000',
  'x-ms-client-request-id',
  '746651a4-17d5-4ff7-b38f-53ef2f4d83c6',
  'x-ms-version',
  '2020-02-10',
  'x-ms-request-server-encrypted',
  'false',
  'Date',
  'Thu, 24 Sep 2020 08:09:24 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share160093496274204261/dir160093496386306197/file160093496414402587')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Thu, 24 Sep 2020 08:09:25 GMT',
  'ETag',
  '"0x8D8606126C40370"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '57bc47e2-101a-0013-084a-92d4a8000000',
  'x-ms-client-request-id',
  '6af17d2a-74a5-404b-a24a-31eef1d453da',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Thu, 24 Sep 2020 08:09:25 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share160093496274204261')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Thu, 24 Sep 2020 08:09:23 GMT',
  'ETag',
  '"0x8D8606125ECAA54"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '57bc47e7-101a-0013-0d4a-92d4a8000000',
  'x-ms-client-request-id',
  'ba3683c6-5499-43f8-946b-56beec2e5283',
  'x-ms-version',
  '2020-02-10',
  'x-ms-snapshot',
  '2020-09-24T08:09:25.0000000Z',
  'Date',
  'Thu, 24 Sep 2020 08:09:25 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share160093496274204261/dir160093496386306197/file160093496414402587', "Hello")
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  'ixqZU8RhEpaoJ6v4xHgE1w==',
  'Last-Modified',
  'Thu, 24 Sep 2020 08:09:25 GMT',
  'ETag',
  '"0x8D860612717FF20"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '57bc47eb-101a-0013-114a-92d4a8000000',
  'x-ms-client-request-id',
  '76d524ee-b24e-407e-abce-8319533d4cbd',
  'x-ms-version',
  '2020-02-10',
  'x-ms-request-server-encrypted',
  'false',
  'Date',
  'Thu, 24 Sep 2020 08:09:25 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share160093496274204261/dir160093496386306197/file160093496414402587')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Ranges><Range><Start>512</Start><End>512</End></Range></Ranges>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Last-Modified',
  'Thu, 24 Sep 2020 08:09:25 GMT',
  'ETag',
  '"0x8D8606126C40370"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '57bc47f0-101a-0013-164a-92d4a8000000',
  'x-ms-client-request-id',
  '5c9e0be1-b194-4f4d-b5bd-db27aa781e4d',
  'x-ms-version',
  '2020-02-10',
  'x-ms-content-length',
  '513',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-content-length',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 24 Sep 2020 08:09:25 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share160093496274204261')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '57bc47f6-101a-0013-1b4a-92d4a8000000',
  'x-ms-client-request-id',
  '36207686-0abe-47a3-9690-3c2220535df8',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Thu, 24 Sep 2020 08:09:26 GMT'
]);
