let nock = require('nock');

module.exports.hash = "aca10eb54db01c764d61604902328a36";

module.exports.testInfo = {"uniqueName":{"share":"share167749054113805466","dir":"dir167749054143300391"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749054113805466')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:35:41 GMT',
  'ETag',
  '"0x8DB18A5FE2032AE"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb305-101a-0070-5b8e-4a9c5e000000',
  'x-ms-client-request-id',
  '2a980aa7-89d1-4737-8021-148c043e031a',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 09:35:41 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749054113805466/dir167749054143300391')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:35:41 GMT',
  'ETag',
  '"0x8DB18A5FE4EBD18"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb308-101a-0070-5c8e-4a9c5e000000',
  'x-ms-client-request-id',
  'd3b939e7-22a8-457c-adbe-0cc18c9751ca',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T09:35:41.8300696Z',
  'x-ms-file-last-write-time',
  '2023-02-27T09:35:41.8300696Z',
  'x-ms-file-creation-time',
  '2023-02-27T09:35:41.8300696Z',
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
  'Mon, 27 Feb 2023 09:35:41 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share167749054113805466/dir167749054143300391')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults><Entries /><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb309-101a-0070-5d8e-4a9c5e000000',
  'x-ms-client-request-id',
  '9ec60526-403f-4e60-b925-20d0e6698528',
  'x-ms-version',
  '2022-11-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 27 Feb 2023 09:35:42 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167749054113805466')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb30a-101a-0070-5e8e-4a9c5e000000',
  'x-ms-client-request-id',
  'a459a4c7-00af-416e-b545-06c81e410cc7',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 09:35:42 GMT'
]);
