let nock = require('nock');

module.exports.hash = "89b75c11961246c4e9467123d39ee4b7";

module.exports.testInfo = {"uniqueName":{"share":"share167749052583208122","dir":"dir167749052612905646","dir167749052612905646":"dir167749052612905646167749052672105496"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749052583208122')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:35:26 GMT',
  'ETag',
  '"0x8DB18A5F500DE9D"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb2a9-101a-0070-248e-4a9c5e000000',
  'x-ms-client-request-id',
  'bcf7e0f1-d3ff-44fb-bf1b-4466fb915d7d',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 09:35:26 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749052583208122/dir167749052612905646')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:35:26 GMT',
  'ETag',
  '"0x8DB18A5F52F31F7"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb2ab-101a-0070-258e-4a9c5e000000',
  'x-ms-client-request-id',
  'b7b22b08-fdd4-4080-95dd-caff2ebf66a7',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T09:35:26.5238519Z',
  'x-ms-file-last-write-time',
  '2023-02-27T09:35:26.5238519Z',
  'x-ms-file-creation-time',
  '2023-02-27T09:35:26.5238519Z',
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
  'Mon, 27 Feb 2023 09:35:26 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share167749052583208122/dir167749052612905646')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:35:26 GMT',
  'ETag',
  '"0x8DB18A5F52F31F7"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb2ac-101a-0070-268e-4a9c5e000000',
  'x-ms-client-request-id',
  '976f1d25-9b9c-4295-8809-f827dad404cc',
  'x-ms-version',
  '2022-11-02',
  'x-ms-server-encrypted',
  'true',
  'x-ms-file-change-time',
  '2023-02-27T09:35:26.5238519Z',
  'x-ms-file-last-write-time',
  '2023-02-27T09:35:26.5238519Z',
  'x-ms-file-creation-time',
  '2023-02-27T09:35:26.5238519Z',
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
  'Mon, 27 Feb 2023 09:35:26 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share167749052583208122/dir167749052612905646167749052672105496')
  .query(true)
  .reply(404, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>ResourceNotFound</Code><Message>The specified resource does not exist.\nRequestId:a17cb2ad-101a-0070-278e-4a9c5e000000\nTime:2023-02-27T09:35:27.1097759Z</Message></Error>", [
  'Content-Length',
  '223',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb2ad-101a-0070-278e-4a9c5e000000',
  'x-ms-client-request-id',
  '26fd4431-8c7a-42d8-89f3-c9f3f76771e8',
  'x-ms-version',
  '2022-11-02',
  'x-ms-error-code',
  'ResourceNotFound',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 27 Feb 2023 09:35:27 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167749052583208122')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb2ae-101a-0070-288e-4a9c5e000000',
  'x-ms-client-request-id',
  '9281728e-4221-40e0-ab11-497395a79a99',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 09:35:27 GMT'
]);
