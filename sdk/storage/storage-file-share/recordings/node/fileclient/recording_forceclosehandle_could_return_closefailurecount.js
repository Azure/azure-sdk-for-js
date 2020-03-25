let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"share":"share157726263679700984","dir":"dir157726263836204134","file":"file157726263980206140"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157726263679700984')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 25 Dec 2019 08:30:38 GMT',
  'ETag',
  '"0x8D78914B872892F"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd89f0771-101a-0025-4efd-ba3b47000000',
  'x-ms-client-request-id',
  'b34ea7a5-b212-4206-8beb-84a6451ba498',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 25 Dec 2019 08:30:37 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157726263679700984/dir157726263836204134')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 25 Dec 2019 08:30:39 GMT',
  'ETag',
  '"0x8D78914B9589A25"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '409ebab4-e01a-0021-38fd-bab640000000',
  'x-ms-client-request-id',
  '75cc33e3-3bb8-4ef5-8806-d1a1020703fd',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-12-25T08:30:39.8157349Z',
  'x-ms-file-last-write-time',
  '2019-12-25T08:30:39.8157349Z',
  'x-ms-file-creation-time',
  '2019-12-25T08:30:39.8157349Z',
  'x-ms-file-permission-key',
  '7008756509702647153*693339914461510392',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 25 Dec 2019 08:30:39 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157726263679700984/dir157726263836204134/file157726263980206140')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 25 Dec 2019 08:30:41 GMT',
  'ETag',
  '"0x8D78914BA0E55D0"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5bd9af22-b01a-0003-0bfd-ba735f000000',
  'x-ms-client-request-id',
  '81ec5fa1-600c-402f-b4b3-942fc0808c74',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-12-25T08:30:41.0067408Z',
  'x-ms-file-last-write-time',
  '2019-12-25T08:30:41.0067408Z',
  'x-ms-file-creation-time',
  '2019-12-25T08:30:41.0067408Z',
  'x-ms-file-permission-key',
  '11619239463300764278*693339914461510392',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '13835093239654252544',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 25 Dec 2019 08:30:40 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share157726263679700984/dir157726263836204134/file157726263980206140')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults><Entries><Handle><HandleId>31250120724</HandleId><Path>dir157726263836204134/file157726263980206140</Path><FileId>13835093239654252544</FileId><ParentId>13835128424026341376</ParentId><SessionId>9479488151052354093</SessionId><ClientIp>13.92.229.47:49707</ClientIp><OpenTime>Wed, 25 Dec 2019 08:43:34 GMT</OpenTime></Handle></Entries><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0ea0cb9a-901a-0049-13ff-bad0d0000000',
  'x-ms-client-request-id',
  '2d01bb69-04f2-49bb-8b1c-e3c2d182ec00',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 25 Dec 2019 08:43:42 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157726263679700984/dir157726263836204134/file157726263980206140')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c9d76675-c01a-0044-6cff-ba1804000000',
  'x-ms-client-request-id',
  '3c14e822-03aa-4963-816a-b45c34b7e8dd',
  'x-ms-version',
  '2019-02-02',
  'x-ms-number-of-handles-closed',
  '1',
  'Date',
  'Wed, 25 Dec 2019 08:43:55 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share157726263679700984')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5bd9bff8-b01a-0003-07ff-ba735f000000',
  'x-ms-client-request-id',
  '18e666d9-b9c7-4fe0-ae84-9300a6ccbf8b',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 25 Dec 2019 08:44:42 GMT'
]);
