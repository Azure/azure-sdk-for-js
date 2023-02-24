let nock = require('nock');

module.exports.hash = "728fde78c41eddf7f657e7924c63824b";

module.exports.testInfo = {"uniqueName":{"share":"share167749053638300959","dir":"dir167749053667905076","directory":"directory167749053698008120"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749053638300959')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:35:36 GMT',
  'ETag',
  '"0x8DB18A5FB4AE0CD"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb2f0-101a-0070-4b8e-4a9c5e000000',
  'x-ms-client-request-id',
  '443736d1-855d-4f65-b94e-41498fef0389',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 09:35:36 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749053638300959/dir167749053667905076')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:35:37 GMT',
  'ETag',
  '"0x8DB18A5FB794B54"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb2f2-101a-0070-4c8e-4a9c5e000000',
  'x-ms-client-request-id',
  '8d2bedb7-4c79-40c5-b5ec-cbc4712c5f65',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T09:35:37.0757972Z',
  'x-ms-file-last-write-time',
  '2023-02-27T09:35:37.0757972Z',
  'x-ms-file-creation-time',
  '2023-02-27T09:35:37.0757972Z',
  'x-ms-file-permission-key',
  '8792472798472242479*1359530181238362790',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 27 Feb 2023 09:35:36 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749053638300959/dir167749053667905076/directory167749053698008120')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:35:37 GMT',
  'ETag',
  '"0x8DB18A5FBA6E455"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb2f3-101a-0070-4d8e-4a9c5e000000',
  'x-ms-client-request-id',
  '9e813ba6-be07-4808-aad5-a4fdabc057b1',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T09:35:37.3746261Z',
  'x-ms-file-last-write-time',
  '2023-02-27T09:35:37.3746261Z',
  'x-ms-file-creation-time',
  '2023-02-27T09:35:37.3746261Z',
  'x-ms-file-permission-key',
  '8792472798472242479*1359530181238362790',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 27 Feb 2023 09:35:37 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share167749053638300959/dir167749053667905076/directory167749053698008120')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:35:37 GMT',
  'ETag',
  '"0x8DB18A5FBA6E455"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb2f4-101a-0070-4e8e-4a9c5e000000',
  'x-ms-client-request-id',
  '2bfddbf5-5afc-4dd5-b7e5-a336321fb7d9',
  'x-ms-version',
  '2022-11-02',
  'x-ms-server-encrypted',
  'true',
  'x-ms-meta-key',
  'value',
  'x-ms-file-change-time',
  '2023-02-27T09:35:37.3746261Z',
  'x-ms-file-last-write-time',
  '2023-02-27T09:35:37.3746261Z',
  'x-ms-file-creation-time',
  '2023-02-27T09:35:37.3746261Z',
  'x-ms-file-permission-key',
  '8792472798472242479*1359530181238362790',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Last-Modified,ETag,x-ms-server-encrypted,x-ms-meta-key,x-ms-file-change-time,x-ms-file-last-write-time,x-ms-file-creation-time,x-ms-file-permission-key,x-ms-file-attributes,x-ms-file-id,x-ms-file-parent-id,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 27 Feb 2023 09:35:37 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167749053638300959/dir167749053667905076/directory167749053698008120')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb2f5-101a-0070-4f8e-4a9c5e000000',
  'x-ms-client-request-id',
  '13c1346c-e079-4c09-b8fc-ddf91bc45b53',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 09:35:37 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share167749053638300959/dir167749053667905076/directory167749053698008120')
  .query(true)
  .reply(404, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>ResourceNotFound</Code><Message>The specified resource does not exist.\nRequestId:a17cb2f7-101a-0070-508e-4a9c5e000000\nTime:2023-02-27T09:35:38.2568099Z</Message></Error>", [
  'Content-Length',
  '223',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb2f7-101a-0070-508e-4a9c5e000000',
  'x-ms-client-request-id',
  'f0e17fbc-60be-44e6-9ecf-b069a2c90d26',
  'x-ms-version',
  '2022-11-02',
  'x-ms-error-code',
  'ResourceNotFound',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 27 Feb 2023 09:35:38 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167749053638300959')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb2f8-101a-0070-518e-4a9c5e000000',
  'x-ms-client-request-id',
  'af6656c1-d320-42ef-9975-16d840d9eae9',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 09:35:38 GMT'
]);
