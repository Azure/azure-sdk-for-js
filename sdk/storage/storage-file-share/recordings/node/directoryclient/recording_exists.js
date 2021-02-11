let nock = require('nock');

module.exports.hash = "76ab00b4ac39f66a41605dd37adec5e3";

module.exports.testInfo = {"uniqueName":{"share":"share158978108027809479","dir":"dir158978108058109414","dir158978108058109414":"dir158978108058109414158978108118100008"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share158978108027809479')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 18 May 2020 05:51:18 GMT',
  'ETag',
  '"0x8D7FAEF7C48582C"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b2da2645-401a-0012-1ad8-2cd9df000000',
  'x-ms-client-request-id',
  'ec84b59b-61ca-4474-9444-b907b8fb24ce',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Mon, 18 May 2020 05:51:18 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share158978108027809479/dir158978108058109414')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 18 May 2020 05:51:18 GMT',
  'ETag',
  '"0x8D7FAEF7C763BC9"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b2da2647-401a-0012-1bd8-2cd9df000000',
  'x-ms-client-request-id',
  '144b5fa8-6b19-465c-98f3-2b484bf4d37c',
  'x-ms-version',
  '2019-07-07',
  'x-ms-file-change-time',
  '2020-05-18T05:51:18.8465609Z',
  'x-ms-file-last-write-time',
  '2020-05-18T05:51:18.8465609Z',
  'x-ms-file-creation-time',
  '2020-05-18T05:51:18.8465609Z',
  'x-ms-file-permission-key',
  '15783046271365971681*12957844477200427368',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 18 May 2020 05:51:18 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share158978108027809479/dir158978108058109414')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 18 May 2020 05:51:18 GMT',
  'ETag',
  '"0x8D7FAEF7C763BC9"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b2da2648-401a-0012-1cd8-2cd9df000000',
  'x-ms-client-request-id',
  '18f964a3-bbf1-4613-b8e3-3469f3ebbf10',
  'x-ms-version',
  '2019-07-07',
  'x-ms-server-encrypted',
  'true',
  'x-ms-file-change-time',
  '2020-05-18T05:51:18.8465609Z',
  'x-ms-file-last-write-time',
  '2020-05-18T05:51:18.8465609Z',
  'x-ms-file-creation-time',
  '2020-05-18T05:51:18.8465609Z',
  'x-ms-file-permission-key',
  '15783046271365971681*12957844477200427368',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Last-Modified,ETag,x-ms-server-encrypted,x-ms-file-change-time,x-ms-file-last-write-time,x-ms-file-creation-time,x-ms-file-permission-key,x-ms-file-attributes,x-ms-file-id,x-ms-file-parent-id,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 18 May 2020 05:51:18 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share158978108027809479/dir158978108058109414158978108118100008')
  .query(true)
  .reply(404, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>ResourceNotFound</Code><Message>The specified resource does not exist.\nRequestId:b2da2649-401a-0012-1dd8-2cd9df000000\nTime:2020-05-18T05:51:19.4484607Z</Message></Error>", [
  'Content-Length',
  '223',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b2da2649-401a-0012-1dd8-2cd9df000000',
  'x-ms-client-request-id',
  'd734061e-9d17-4007-a447-e4c0c8c7867b',
  'x-ms-version',
  '2019-07-07',
  'x-ms-error-code',
  'ResourceNotFound',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 18 May 2020 05:51:19 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share158978108027809479')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b2da264a-401a-0012-1ed8-2cd9df000000',
  'x-ms-client-request-id',
  'ebbd0dbc-0e6a-4bbe-91ea-47c71e60e832',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Mon, 18 May 2020 05:51:19 GMT'
]);
