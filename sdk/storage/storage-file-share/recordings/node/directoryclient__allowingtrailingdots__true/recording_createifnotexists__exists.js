let nock = require('nock');

module.exports.hash = "fa0f6c509fa1edcaae47cef93f435933";

module.exports.testInfo = {"uniqueName":{"share":"share167875880446709988","dir":"dir167875880471906234"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167875880446709988')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Mar 2023 01:53:24 GMT',
  'ETag',
  '"0x8DB242EE5F5B0C7"',
  'x-ms-request-id',
  'fd6a9f38-e01a-0007-6c17-56fda4000000',
  'x-ms-client-request-id',
  '18bd1752-ff25-4bfc-b489-70081c91f61b',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Tue, 14 Mar 2023 01:53:24 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167875880446709988/dir167875880471906234.')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Mar 2023 01:53:25 GMT',
  'ETag',
  '"0x8DB242EE61DE6CF"',
  'x-ms-request-id',
  'fd6a9f3a-e01a-0007-6d17-56fda4000000',
  'x-ms-client-request-id',
  '0d0aa77c-a6e9-40cf-b9f3-e7f9999f3a5a',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-03-14T01:53:25.0872015Z',
  'x-ms-file-last-write-time',
  '2023-03-14T01:53:25.0872015Z',
  'x-ms-file-creation-time',
  '2023-03-14T01:53:25.0872015Z',
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
  'Tue, 14 Mar 2023 01:53:25 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167875880446709988/dir167875880471906234.')
  .query(true)
  .reply(409, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>ResourceAlreadyExists</Code><Message>The specified resource already exists.\nRequestId:fd6a9f3b-e01a-0007-6e17-56fda4000000\nTime:2023-03-14T01:53:25.3416864Z</Message></Error>", [
  'Content-Length',
  '228',
  'Content-Type',
  'application/xml',
  'x-ms-request-id',
  'fd6a9f3b-e01a-0007-6e17-56fda4000000',
  'x-ms-client-request-id',
  '5c92d7b5-ac7b-49bb-b3a7-b98c6e4bf436',
  'x-ms-version',
  '2022-11-02',
  'x-ms-error-code',
  'ResourceAlreadyExists',
  'Date',
  'Tue, 14 Mar 2023 01:53:25 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167875880446709988')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  'fd6a9f3c-e01a-0007-6f17-56fda4000000',
  'x-ms-client-request-id',
  '7a0f9f97-0f21-4bf0-af6b-8a4613833426',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Tue, 14 Mar 2023 01:53:25 GMT'
]);
