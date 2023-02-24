let nock = require('nock');

module.exports.hash = "c048c6e45e2f21349bde67176cbabe5c";

module.exports.testInfo = {"uniqueName":{"share":"share167870328603801922","dir":"dir167870328747501143","destdir":"destdir167870328816408634","destdir1":"destdir1167870328917300157"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167870328603801922')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 13 Mar 2023 10:28:07 GMT',
  'ETag',
  '"0x8DB23ADA3123975"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '24347346-e01a-005b-6096-551c92000000',
  'x-ms-client-request-id',
  'b9d26a4a-0ef3-4298-a7ba-ac178449d249',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 13 Mar 2023 10:28:06 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167870328603801922/dir167870328747501143')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 13 Mar 2023 10:28:08 GMT',
  'ETag',
  '"0x8DB23ADA37B3130"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '24347349-e01a-005b-6196-551c92000000',
  'x-ms-client-request-id',
  'b9c31970-0086-48df-ad35-11ddf9a69868',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-03-13T10:28:08.2131248Z',
  'x-ms-file-last-write-time',
  '2023-03-13T10:28:08.2131248Z',
  'x-ms-file-creation-time',
  '2023-03-13T10:28:08.2131248Z',
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
  'Mon, 13 Mar 2023 10:28:07 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167870328603801922/destdir167870328816408634')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 13 Mar 2023 10:28:08 GMT',
  'ETag',
  '"0x8DB23ADA3B87FE5"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2434734b-e01a-005b-6296-551c92000000',
  'x-ms-client-request-id',
  'b28646d7-1a94-471a-b461-13260952e510',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-03-13T10:28:08.6149093Z',
  'x-ms-file-last-write-time',
  '2023-03-13T10:28:08.2131248Z',
  'x-ms-file-creation-time',
  '2023-03-13T10:28:08.2131248Z',
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
  'Mon, 13 Mar 2023 10:28:07 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share167870328603801922/destdir167870328816408634')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 13 Mar 2023 10:28:08 GMT',
  'ETag',
  '"0x8DB23ADA3B87FE5"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2434734d-e01a-005b-6396-551c92000000',
  'x-ms-client-request-id',
  '8a3e1161-60c8-4a27-aaf5-5f5116a265d7',
  'x-ms-version',
  '2022-11-02',
  'x-ms-server-encrypted',
  'true',
  'x-ms-file-change-time',
  '2023-03-13T10:28:08.6149093Z',
  'x-ms-file-last-write-time',
  '2023-03-13T10:28:08.2131248Z',
  'x-ms-file-creation-time',
  '2023-03-13T10:28:08.2131248Z',
  'x-ms-file-permission-key',
  '8792472798472242479*1359530181238362790',
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
  'Mon, 13 Mar 2023 10:28:08 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share167870328603801922/dir167870328747501143')
  .query(true)
  .reply(404, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>ResourceNotFound</Code><Message>The specified resource does not exist.\nRequestId:2434734e-e01a-005b-6496-551c92000000\nTime:2023-03-13T10:28:09.2442381Z</Message></Error>", [
  'Content-Length',
  '223',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2434734e-e01a-005b-6496-551c92000000',
  'x-ms-client-request-id',
  'e625658e-b9c0-4f17-9b04-489c4e33b4a6',
  'x-ms-version',
  '2022-11-02',
  'x-ms-error-code',
  'ResourceNotFound',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 13 Mar 2023 10:28:08 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167870328603801922/destdir1167870328917300157')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 13 Mar 2023 10:28:09 GMT',
  'ETag',
  '"0x8DB23ADA4487725"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2434734f-e01a-005b-6596-551c92000000',
  'x-ms-client-request-id',
  '1593bda1-87a6-4c3e-962b-025229a374e4',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-03-13T10:28:09.5584037Z',
  'x-ms-file-last-write-time',
  '2023-03-13T10:28:08.2131248Z',
  'x-ms-file-creation-time',
  '2023-03-13T10:28:08.2131248Z',
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
  'Mon, 13 Mar 2023 10:28:08 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share167870328603801922/destdir1167870328917300157')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 13 Mar 2023 10:28:09 GMT',
  'ETag',
  '"0x8DB23ADA4487725"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '24347350-e01a-005b-6696-551c92000000',
  'x-ms-client-request-id',
  'a2d53fa4-0011-443d-b57b-2e33764a101e',
  'x-ms-version',
  '2022-11-02',
  'x-ms-server-encrypted',
  'true',
  'x-ms-file-change-time',
  '2023-03-13T10:28:09.5584037Z',
  'x-ms-file-last-write-time',
  '2023-03-13T10:28:08.2131248Z',
  'x-ms-file-creation-time',
  '2023-03-13T10:28:08.2131248Z',
  'x-ms-file-permission-key',
  '8792472798472242479*1359530181238362790',
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
  'Mon, 13 Mar 2023 10:28:09 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share167870328603801922/destdir167870328816408634')
  .query(true)
  .reply(404, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>ResourceNotFound</Code><Message>The specified resource does not exist.\nRequestId:24347351-e01a-005b-6796-551c92000000\nTime:2023-03-13T10:28:10.1547233Z</Message></Error>", [
  'Content-Length',
  '223',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '24347351-e01a-005b-6796-551c92000000',
  'x-ms-client-request-id',
  '5ba20892-0d83-42af-9250-8f30595c1aae',
  'x-ms-version',
  '2022-11-02',
  'x-ms-error-code',
  'ResourceNotFound',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 13 Mar 2023 10:28:09 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167870328603801922')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '24347352-e01a-005b-6896-551c92000000',
  'x-ms-client-request-id',
  'd76f9971-aa9a-490e-82e6-66cc6b44a2cd',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 13 Mar 2023 10:28:09 GMT'
]);
