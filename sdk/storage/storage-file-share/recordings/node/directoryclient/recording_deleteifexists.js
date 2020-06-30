let nock = require('nock');

module.exports.hash = "1049ebc97f564d93f265d8c9f984849e";

module.exports.testInfo = {"uniqueName":{"share":"share158978107842601513","dir":"dir158978107872208254","dir158978107872208254":"dir158978107872208254158978107908607949"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share158978107842601513')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 18 May 2020 05:51:16 GMT',
  'ETag',
  '"0x8D7FAEF7B2CF0A7"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b2da263a-401a-0012-13d8-2cd9df000000',
  'x-ms-client-request-id',
  '200a9e33-01f3-436d-9f7f-c10551c38385',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Mon, 18 May 2020 05:51:16 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share158978107842601513/dir158978107872208254')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 18 May 2020 05:51:17 GMT',
  'ETag',
  '"0x8D7FAEF7B644D98"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b2da263c-401a-0012-14d8-2cd9df000000',
  'x-ms-client-request-id',
  'a2836029-5f8f-4cbd-911b-90bb05c6f6de',
  'x-ms-version',
  '2019-07-07',
  'x-ms-file-change-time',
  '2020-05-18T05:51:17.0513304Z',
  'x-ms-file-last-write-time',
  '2020-05-18T05:51:17.0513304Z',
  'x-ms-file-creation-time',
  '2020-05-18T05:51:17.0513304Z',
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
  'Mon, 18 May 2020 05:51:16 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share158978107842601513/dir158978107872208254158978107908607949')
  .query(true)
  .reply(404, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>ResourceNotFound</Code><Message>The specified resource does not exist.\nRequestId:b2da263f-401a-0012-15d8-2cd9df000000\nTime:2020-05-18T05:51:17.3529760Z</Message></Error>", [
  'Content-Length',
  '223',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b2da263f-401a-0012-15d8-2cd9df000000',
  'x-ms-client-request-id',
  '84fa0ba6-abbd-4111-8da3-1b9d4d906acc',
  'x-ms-version',
  '2019-07-07',
  'x-ms-error-code',
  'ResourceNotFound',
  'Date',
  'Mon, 18 May 2020 05:51:16 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share158978107842601513/dir158978107872208254158978107908607949')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 18 May 2020 05:51:17 GMT',
  'ETag',
  '"0x8D7FAEF7BBF009E"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b2da2641-401a-0012-17d8-2cd9df000000',
  'x-ms-client-request-id',
  '6422d90a-444f-4afd-9de6-156688a8df16',
  'x-ms-version',
  '2019-07-07',
  'x-ms-file-change-time',
  '2020-05-18T05:51:17.6457374Z',
  'x-ms-file-last-write-time',
  '2020-05-18T05:51:17.6457374Z',
  'x-ms-file-creation-time',
  '2020-05-18T05:51:17.6457374Z',
  'x-ms-file-permission-key',
  '15783046271365971681*12957844477200427368',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 18 May 2020 05:51:17 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share158978107842601513/dir158978107872208254158978107908607949')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b2da2642-401a-0012-18d8-2cd9df000000',
  'x-ms-client-request-id',
  '47281c29-a266-4485-9270-bfccd47f85ed',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Mon, 18 May 2020 05:51:17 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share158978107842601513')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b2da2644-401a-0012-19d8-2cd9df000000',
  'x-ms-client-request-id',
  '15ef2946-7047-4c03-8533-15b80456486b',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Mon, 18 May 2020 05:51:17 GMT'
]);
