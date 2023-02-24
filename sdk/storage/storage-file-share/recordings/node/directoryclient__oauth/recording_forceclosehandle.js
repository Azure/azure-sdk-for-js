let nock = require('nock');

module.exports.hash = "a18176223400c2cc573fcb6318812029";

module.exports.testInfo = {"uniqueName":{"share":"share167749054366104295","dir":"dir167749054395708634"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749054366104295')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:35:44 GMT',
  'ETag',
  '"0x8DB18A5FFA146B3"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb313-101a-0070-658e-4a9c5e000000',
  'x-ms-client-request-id',
  '96528f1d-1728-486b-86ba-659cec2912bf',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 09:35:43 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749054366104295/dir167749054395708634')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:35:44 GMT',
  'ETag',
  '"0x8DB18A5FFCFA644"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb315-101a-0070-668e-4a9c5e000000',
  'x-ms-client-request-id',
  'a9986af5-198b-4ef8-9418-7e8f2562eeeb',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T09:35:44.3526212Z',
  'x-ms-file-last-write-time',
  '2023-02-27T09:35:44.3526212Z',
  'x-ms-file-creation-time',
  '2023-02-27T09:35:44.3526212Z',
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
  'Mon, 27 Feb 2023 09:35:44 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share167749054366104295/dir167749054395708634')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults><Entries /><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb316-101a-0070-678e-4a9c5e000000',
  'x-ms-client-request-id',
  '95525980-49fd-404c-90d5-2d637bd8fdf1',
  'x-ms-version',
  '2022-11-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 27 Feb 2023 09:35:44 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167749054366104295')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb317-101a-0070-688e-4a9c5e000000',
  'x-ms-client-request-id',
  '3b1bae15-f7fc-4ff9-81bd-d774a981fc44',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 09:35:44 GMT'
]);
