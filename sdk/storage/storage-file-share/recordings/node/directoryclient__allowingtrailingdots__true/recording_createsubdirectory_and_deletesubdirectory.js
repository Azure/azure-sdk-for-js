let nock = require('nock');

module.exports.hash = "bfc0179168f81562504ed7028e6fd986";

module.exports.testInfo = {"uniqueName":{"share":"share167875880806206079","dir":"dir167875880831302705","subdir":"subdir167875880857408312"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167875880806206079')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Mar 2023 01:53:28 GMT',
  'ETag',
  '"0x8DB242EE81A1A21"',
  'x-ms-request-id',
  'fd6a9f4b-e01a-0007-7a17-56fda4000000',
  'x-ms-client-request-id',
  '94234956-e94b-4547-8939-85be22323cf5',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Tue, 14 Mar 2023 01:53:28 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167875880806206079/dir167875880831302705.')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Mar 2023 01:53:28 GMT',
  'ETag',
  '"0x8DB242EE8420C15"',
  'x-ms-request-id',
  'fd6a9f4d-e01a-0007-7b17-56fda4000000',
  'x-ms-client-request-id',
  '002ec951-fc49-449e-a172-8eff34bfd5be',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-03-14T01:53:28.6795285Z',
  'x-ms-file-last-write-time',
  '2023-03-14T01:53:28.6795285Z',
  'x-ms-file-creation-time',
  '2023-03-14T01:53:28.6795285Z',
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
  'Tue, 14 Mar 2023 01:53:28 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167875880806206079/dir167875880831302705./subdir167875880857408312.')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Mar 2023 01:53:28 GMT',
  'ETag',
  '"0x8DB242EE8687F8F"',
  'x-ms-request-id',
  'fd6a9f4e-e01a-0007-7c17-56fda4000000',
  'x-ms-client-request-id',
  '8718d016-1130-4ddf-960b-b82cf5103060',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-03-14T01:53:28.9315215Z',
  'x-ms-file-last-write-time',
  '2023-03-14T01:53:28.9315215Z',
  'x-ms-file-creation-time',
  '2023-03-14T01:53:28.9315215Z',
  'x-ms-file-permission-key',
  '10761449611457319216*1871445747569276785',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 14 Mar 2023 01:53:28 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share167875880806206079/dir167875880831302705./subdir167875880857408312.')
  .query(true)
  .reply(200, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Mar 2023 01:53:28 GMT',
  'ETag',
  '"0x8DB242EE8687F8F"',
  'x-ms-request-id',
  'fd6a9f4f-e01a-0007-7d17-56fda4000000',
  'x-ms-client-request-id',
  '979477de-34be-4994-8a52-3a9e6543c8ce',
  'x-ms-version',
  '2022-11-02',
  'x-ms-server-encrypted',
  'true',
  'x-ms-file-change-time',
  '2023-03-14T01:53:28.9315215Z',
  'x-ms-file-last-write-time',
  '2023-03-14T01:53:28.9315215Z',
  'x-ms-file-creation-time',
  '2023-03-14T01:53:28.9315215Z',
  'x-ms-file-permission-key',
  '10761449611457319216*1871445747569276785',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Last-Modified,ETag,x-ms-server-encrypted,x-ms-file-change-time,x-ms-file-last-write-time,x-ms-file-creation-time,x-ms-file-permission-key,x-ms-file-attributes,x-ms-file-id,x-ms-file-parent-id',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 14 Mar 2023 01:53:29 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167875880806206079/dir167875880831302705./subdir167875880857408312.')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  'fd6a9f50-e01a-0007-7e17-56fda4000000',
  'x-ms-client-request-id',
  '34db12d4-32ef-4784-894d-4969d49341a1',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Tue, 14 Mar 2023 01:53:29 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share167875880806206079/dir167875880831302705./subdir167875880857408312.')
  .query(true)
  .reply(404, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>ResourceNotFound</Code><Message>The specified resource does not exist.\nRequestId:fd6a9f51-e01a-0007-7f17-56fda4000000\nTime:2023-03-14T01:53:29.6647643Z</Message></Error>", [
  'Content-Length',
  '223',
  'Content-Type',
  'application/xml',
  'x-ms-request-id',
  'fd6a9f51-e01a-0007-7f17-56fda4000000',
  'x-ms-client-request-id',
  'd237e2ab-f244-44c4-93b7-2ecd00280200',
  'x-ms-version',
  '2022-11-02',
  'x-ms-error-code',
  'ResourceNotFound',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 14 Mar 2023 01:53:29 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167875880806206079')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  'fd6a9f52-e01a-0007-8017-56fda4000000',
  'x-ms-client-request-id',
  'd12e8b57-c871-4d1d-93f6-83c24caeb58d',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Tue, 14 Mar 2023 01:53:29 GMT'
]);
