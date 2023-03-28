let nock = require('nock');

module.exports.hash = "a3bd4f15a2998bbd7fea2fbe2c2d6d50";

module.exports.testInfo = {"uniqueName":{"share":"share167875883542808584","dir":"dir167875883567809098","dir1":"dir1167875883596600293"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167875883542808584')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Mar 2023 01:53:55 GMT',
  'ETag',
  '"0x8DB242EF869E731"',
  'x-ms-request-id',
  'fd6a9f81-e01a-0007-1717-56fda4000000',
  'x-ms-client-request-id',
  '90989b81-9504-402c-9c9b-b054b56b9211',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Tue, 14 Mar 2023 01:53:55 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167875883542808584/dir167875883567809098.')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Mar 2023 01:53:56 GMT',
  'ETag',
  '"0x8DB242EF8959D27"',
  'x-ms-request-id',
  'fd6a9f83-e01a-0007-1817-56fda4000000',
  'x-ms-client-request-id',
  'a610732f-b236-4c8f-8a47-e12b2860b877',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-03-14T01:53:56.0707367Z',
  'x-ms-file-last-write-time',
  '2023-03-14T01:53:56.0707367Z',
  'x-ms-file-creation-time',
  '2023-03-14T01:53:56.0707367Z',
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
  'Tue, 14 Mar 2023 01:53:55 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167875883542808584/dir1167875883596600293')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Mar 2023 01:53:56 GMT',
  'ETag',
  '"0x8DB242EF8BCAE25"',
  'x-ms-request-id',
  'fd6a9f85-e01a-0007-1917-56fda4000000',
  'x-ms-client-request-id',
  '234fea13-dd29-48ab-b7dc-f4c650ee0bec',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-03-14T01:53:56.3267621Z',
  'x-ms-file-last-write-time',
  '2023-03-14T01:53:56.3267621Z',
  'x-ms-file-creation-time',
  '2023-03-14T01:53:56.3267621Z',
  'x-ms-file-permission-key',
  '10761449611457319216*1871445747569276785',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 14 Mar 2023 01:53:56 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167875883542808584/dir1167875883596600293...')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  'fd6a9f86-e01a-0007-1a17-56fda4000000',
  'x-ms-client-request-id',
  'c3635d1a-1448-46f2-9868-a1f07ad58887',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Tue, 14 Mar 2023 01:53:56 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167875883542808584/dir1167875883596600293')
  .query(true)
  .reply(404, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>ResourceNotFound</Code><Message>The specified resource does not exist.\nRequestId:fd6a9f87-e01a-0007-1b17-56fda4000000\nTime:2023-03-14T01:53:56.8252943Z</Message></Error>", [
  'Content-Length',
  '223',
  'Content-Type',
  'application/xml',
  'x-ms-request-id',
  'fd6a9f87-e01a-0007-1b17-56fda4000000',
  'x-ms-client-request-id',
  'ee25eae5-1c3c-4fc0-97fb-de8595c96a44',
  'x-ms-version',
  '2022-11-02',
  'x-ms-error-code',
  'ResourceNotFound',
  'Date',
  'Tue, 14 Mar 2023 01:53:56 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167875883542808584')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  'fd6a9f89-e01a-0007-1c17-56fda4000000',
  'x-ms-client-request-id',
  '018ff02f-8dc1-47cf-af0e-65124b6d5ff2',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Tue, 14 Mar 2023 01:53:56 GMT'
]);
