let nock = require('nock');

module.exports.hash = "3cd044cf62a7627d4095071099982981";

module.exports.testInfo = {"uniqueName":{"share":"share158978108193707360","dir":"dir158978108223407005","file":"file158978108253102790"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share158978108193707360')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 18 May 2020 05:51:20 GMT',
  'ETag',
  '"0x8D7FAEF7D44C05A"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b2da264b-401a-0012-1fd8-2cd9df000000',
  'x-ms-client-request-id',
  '54bf16e2-c3d5-458e-8226-a019278efe2b',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Mon, 18 May 2020 05:51:19 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share158978108193707360/dir158978108223407005')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 18 May 2020 05:51:20 GMT',
  'ETag',
  '"0x8D7FAEF7D725432"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b2da264d-401a-0012-20d8-2cd9df000000',
  'x-ms-client-request-id',
  'e5c7370e-8ce6-4ca2-85d8-586332da8800',
  'x-ms-version',
  '2019-07-07',
  'x-ms-file-change-time',
  '2020-05-18T05:51:20.4986930Z',
  'x-ms-file-last-write-time',
  '2020-05-18T05:51:20.4986930Z',
  'x-ms-file-creation-time',
  '2020-05-18T05:51:20.4986930Z',
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
  'Mon, 18 May 2020 05:51:20 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share158978108193707360/dir158978108223407005/file158978108253102790')
  .reply(404, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>ResourceNotFound</Code><Message>The specified resource does not exist.\nRequestId:b2da264f-401a-0012-21d8-2cd9df000000\nTime:2020-05-18T05:51:20.7944189Z</Message></Error>", [
  'Content-Length',
  '223',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b2da264f-401a-0012-21d8-2cd9df000000',
  'x-ms-client-request-id',
  '29097611-39e0-4049-978e-4abd8343d90b',
  'x-ms-version',
  '2019-07-07',
  'x-ms-error-code',
  'ResourceNotFound',
  'Date',
  'Mon, 18 May 2020 05:51:20 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share158978108193707360/dir158978108223407005/file158978108253102790')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 18 May 2020 05:51:21 GMT',
  'ETag',
  '"0x8D7FAEF7DCC43D0"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b2da2650-401a-0012-22d8-2cd9df000000',
  'x-ms-client-request-id',
  '2b617c12-89f0-4af0-ba05-a9b28b43ad85',
  'x-ms-version',
  '2019-07-07',
  'x-ms-file-change-time',
  '2020-05-18T05:51:21.0880976Z',
  'x-ms-file-last-write-time',
  '2020-05-18T05:51:21.0880976Z',
  'x-ms-file-creation-time',
  '2020-05-18T05:51:21.0880976Z',
  'x-ms-file-permission-key',
  '1978041915872117222*12957844477200427368',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 18 May 2020 05:51:20 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share158978108193707360/dir158978108223407005/file158978108253102790')
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b2da2651-401a-0012-23d8-2cd9df000000',
  'x-ms-client-request-id',
  '6dc42b3f-9023-48c2-b128-a9cb8c90a25c',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Mon, 18 May 2020 05:51:21 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share158978108193707360')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b2da2652-401a-0012-24d8-2cd9df000000',
  'x-ms-client-request-id',
  '264f64c5-66b1-46a2-8a65-176b977ee4a0',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Mon, 18 May 2020 05:51:21 GMT'
]);
