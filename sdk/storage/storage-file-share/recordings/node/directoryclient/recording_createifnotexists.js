let nock = require('nock');

module.exports.hash = "8efaa05b167dfd91d7eb2869d74482bf";

module.exports.testInfo = {"uniqueName":{"share":"share158978107550705372","dir":"dir158978107688705269","dir158978107688705269":"dir158978107688705269158978107751909767"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share158978107550705372')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 18 May 2020 05:51:14 GMT',
  'ETag',
  '"0x8D7FAEF7A118948"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b2da2631-401a-0012-0dd8-2cd9df000000',
  'x-ms-client-request-id',
  '6404a1f5-4c3a-4802-b00b-7280f1a4927d',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Mon, 18 May 2020 05:51:14 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share158978107550705372/dir158978107688705269')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 18 May 2020 05:51:15 GMT',
  'ETag',
  '"0x8D7FAEF7A4564D3"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b2da2634-401a-0012-0ed8-2cd9df000000',
  'x-ms-client-request-id',
  'c75fd2f1-d619-4c83-8480-4680de9dfd87',
  'x-ms-version',
  '2019-07-07',
  'x-ms-file-change-time',
  '2020-05-18T05:51:15.1710419Z',
  'x-ms-file-last-write-time',
  '2020-05-18T05:51:15.1710419Z',
  'x-ms-file-creation-time',
  '2020-05-18T05:51:15.1710419Z',
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
  'Mon, 18 May 2020 05:51:14 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share158978107550705372/dir158978107688705269')
  .query(true)
  .reply(409, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>ResourceAlreadyExists</Code><Message>The specified resource already exists.\nRequestId:b2da2635-401a-0012-0fd8-2cd9df000000\nTime:2020-05-18T05:51:15.4766432Z</Message></Error>", [
  'Content-Length',
  '228',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b2da2635-401a-0012-0fd8-2cd9df000000',
  'x-ms-client-request-id',
  'c826c54b-9e80-4f9c-b92c-c5c02e901f6d',
  'x-ms-version',
  '2019-07-07',
  'x-ms-error-code',
  'ResourceAlreadyExists',
  'Date',
  'Mon, 18 May 2020 05:51:15 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share158978107550705372/dir158978107688705269158978107751909767')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 18 May 2020 05:51:15 GMT',
  'ETag',
  '"0x8D7FAEF7AA2894B"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b2da2637-401a-0012-10d8-2cd9df000000',
  'x-ms-client-request-id',
  '8c6cf1da-52ca-4f6b-ab7f-c8201865edae',
  'x-ms-version',
  '2019-07-07',
  'x-ms-file-change-time',
  '2020-05-18T05:51:15.7814603Z',
  'x-ms-file-last-write-time',
  '2020-05-18T05:51:15.7814603Z',
  'x-ms-file-creation-time',
  '2020-05-18T05:51:15.7814603Z',
  'x-ms-file-permission-key',
  '15783046271365971681*12957844477200427368',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '16140971433240035328',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 18 May 2020 05:51:15 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share158978107550705372/dir158978107688705269158978107751909767')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b2da2638-401a-0012-11d8-2cd9df000000',
  'x-ms-client-request-id',
  'bac363a4-2225-41c4-9c55-2d1e45517b08',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Mon, 18 May 2020 05:51:15 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share158978107550705372')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b2da2639-401a-0012-12d8-2cd9df000000',
  'x-ms-client-request-id',
  '1b352fec-5233-4a4c-97cd-a0e53822303b',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Mon, 18 May 2020 05:51:16 GMT'
]);
