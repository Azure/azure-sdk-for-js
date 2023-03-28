let nock = require('nock');

module.exports.hash = "4d573cf2ae266dd22c92e82ceb63b78f";

module.exports.testInfo = {"uniqueName":{"share":"share167749057859002970","dir":"dir167749057888504572","file":"file167749057919508021"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749057859002970')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:36:18 GMT',
  'ETag',
  '"0x8DB18A61472C217"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb3d7-101a-0070-668e-4a9c5e000000',
  'x-ms-client-request-id',
  '6a519ff9-2d5f-42f7-9722-8ff612918587',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 09:36:18 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749057859002970/dir167749057888504572')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:36:19 GMT',
  'ETag',
  '"0x8DB18A614A29B06"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb3d9-101a-0070-678e-4a9c5e000000',
  'x-ms-client-request-id',
  'b0e6db62-d7a3-4726-b454-b6d262780fed',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T09:36:19.2895750Z',
  'x-ms-file-last-write-time',
  '2023-02-27T09:36:19.2895750Z',
  'x-ms-file-creation-time',
  '2023-02-27T09:36:19.2895750Z',
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
  'Mon, 27 Feb 2023 09:36:19 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749057859002970/dir167749057888504572/file167749057919508021')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:36:19 GMT',
  'ETag',
  '"0x8DB18A614D05B0F"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb3dc-101a-0070-698e-4a9c5e000000',
  'x-ms-client-request-id',
  '08c0551a-601a-4174-bc41-f3704f4a96f3',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T09:36:19.5894031Z',
  'x-ms-file-last-write-time',
  '2023-02-27T09:36:19.5894031Z',
  'x-ms-file-creation-time',
  '2023-02-27T09:36:19.5894031Z',
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
  'Mon, 27 Feb 2023 09:36:19 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share167749057859002970/dir167749057888504572/file167749057919508021')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults><Entries /><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb3df-101a-0070-6c8e-4a9c5e000000',
  'x-ms-client-request-id',
  'f8ebffff-53b0-4d94-8723-7b45b24bb2d7',
  'x-ms-version',
  '2022-11-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 27 Feb 2023 09:36:19 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167749057859002970')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb3e0-101a-0070-6d8e-4a9c5e000000',
  'x-ms-client-request-id',
  '16cfeaa2-856b-4cbd-956b-b2b5a81ba625',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 09:36:19 GMT'
]);
