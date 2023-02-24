let nock = require('nock');

module.exports.hash = "3ba97ec476cc9244e322d42db780872e";

module.exports.testInfo = {"uniqueName":{"share":"share167749058158606241","dir":"dir167749058188109137","file":"file167749058218009380"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749058158606241')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:36:21 GMT',
  'ETag',
  '"0x8DB18A6163C1FC5"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb3ea-101a-0070-738e-4a9c5e000000',
  'x-ms-client-request-id',
  'a1edbcf7-c3ff-4823-bc5a-7d55fcb7bd8f',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 09:36:21 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749058158606241/dir167749058188109137')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:36:22 GMT',
  'ETag',
  '"0x8DB18A6166A46D6"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb3ec-101a-0070-748e-4a9c5e000000',
  'x-ms-client-request-id',
  'b8528d4c-cbb9-4fc1-8f48-81cc3cc17106',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T09:36:22.2758614Z',
  'x-ms-file-last-write-time',
  '2023-02-27T09:36:22.2758614Z',
  'x-ms-file-creation-time',
  '2023-02-27T09:36:22.2758614Z',
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
  'Mon, 27 Feb 2023 09:36:22 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749058158606241/dir167749058188109137/file167749058218009380')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:36:22 GMT',
  'ETag',
  '"0x8DB18A61697DFD8"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb3ed-101a-0070-758e-4a9c5e000000',
  'x-ms-client-request-id',
  '752ed2ee-11a7-445d-bafc-51ddf1fa5af9',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T09:36:22.5746904Z',
  'x-ms-file-last-write-time',
  '2023-02-27T09:36:22.5746904Z',
  'x-ms-file-creation-time',
  '2023-02-27T09:36:22.5746904Z',
  'x-ms-file-permission-key',
  '13438439191449926184*1359530181238362790',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 27 Feb 2023 09:36:22 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share167749058158606241/dir167749058188109137/file167749058218009380')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults><Entries /><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb3ee-101a-0070-768e-4a9c5e000000',
  'x-ms-client-request-id',
  '3ae8b277-eb70-43f9-8a1a-8c72ec1c6a5f',
  'x-ms-version',
  '2022-11-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 27 Feb 2023 09:36:22 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167749058158606241')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb3f0-101a-0070-778e-4a9c5e000000',
  'x-ms-client-request-id',
  '884de101-ba7b-4f69-8d3e-b864e286a766',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 09:36:22 GMT'
]);
