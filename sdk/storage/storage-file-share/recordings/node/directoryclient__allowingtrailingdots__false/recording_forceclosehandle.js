let nock = require('nock');

module.exports.hash = "a18176223400c2cc573fcb6318812029";

module.exports.testInfo = {"uniqueName":{"share":"share167875884005305220","dir":"dir167875884030509547"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167875884005305220')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Mar 2023 01:54:00 GMT',
  'ETag',
  '"0x8DB242EFB2B7BCA"',
  'x-ms-request-id',
  'fd6a9f98-e01a-0007-2917-56fda4000000',
  'x-ms-client-request-id',
  '0e785472-a883-45fa-9d1a-bcca397655d5',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Tue, 14 Mar 2023 01:54:00 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167875884005305220/dir167875884030509547.')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Mar 2023 01:54:00 GMT',
  'ETag',
  '"0x8DB242EFB5408AA"',
  'x-ms-request-id',
  'fd6a9f9a-e01a-0007-2a17-56fda4000000',
  'x-ms-client-request-id',
  'b6a6c80b-4ea1-4180-a12d-76aadcaf4f51',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-03-14T01:54:00.6741162Z',
  'x-ms-file-last-write-time',
  '2023-03-14T01:54:00.6741162Z',
  'x-ms-file-creation-time',
  '2023-03-14T01:54:00.6741162Z',
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
  'Tue, 14 Mar 2023 01:54:00 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share167875884005305220/dir167875884030509547.')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults><Entries /><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'x-ms-request-id',
  'fd6a9f9b-e01a-0007-2b17-56fda4000000',
  'x-ms-client-request-id',
  '343a1155-415e-4ddd-846e-67c08243d121',
  'x-ms-version',
  '2022-11-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 14 Mar 2023 01:54:00 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167875884005305220')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  'fd6a9f9c-e01a-0007-2c17-56fda4000000',
  'x-ms-client-request-id',
  '6d300d56-af0e-4664-8422-5a06a0717f6c',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Tue, 14 Mar 2023 01:54:00 GMT'
]);
