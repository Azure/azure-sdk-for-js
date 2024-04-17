let nock = require('nock');

module.exports.hash = "8fadd9dd7b766b3cde59347ef61e81ab";

module.exports.testInfo = {"uniqueName":{"share":"share171212612403603554","dir":"dir171212612471902196","file":"file171212612485607429"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share171212612403603554')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 03 Apr 2024 06:35:25 GMT',
  'ETag',
  '"0x8DC53A83EF54D00"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5bf2d2ff-e01a-0077-5a91-8546b5000000',
  'x-ms-client-request-id',
  '22db6edf-f282-47b6-84e3-4891b097c73f',
  'x-ms-version',
  '2024-05-04',
  'Date',
  'Wed, 03 Apr 2024 06:35:25 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share171212612403603554/dir171212612471902196')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 03 Apr 2024 06:35:25 GMT',
  'ETag',
  '"0x8DC53A83F0BFCBA"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5bf2d306-e01a-0077-5f91-8546b5000000',
  'x-ms-client-request-id',
  'd6b1293d-275d-4bad-a589-cc5e97695819',
  'x-ms-version',
  '2024-05-04',
  'x-ms-file-change-time',
  '2024-04-03T06:35:25.7129146Z',
  'x-ms-file-last-write-time',
  '2024-04-03T06:35:25.7129146Z',
  'x-ms-file-creation-time',
  '2024-04-03T06:35:25.7129146Z',
  'x-ms-file-permission-key',
  '9255856626508002348*16764736045797335973',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 03 Apr 2024 06:35:25 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share171212612403603554/dir171212612471902196/file171212612485607429')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 03 Apr 2024 06:36:52 GMT',
  'ETag',
  '"0x8DC53A872BC45CA"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5bf2e534-e01a-0077-2491-8546b5000000',
  'x-ms-client-request-id',
  '2d4e701b-1dff-4420-b5ba-50eb4604fea6',
  'x-ms-version',
  '2024-05-04',
  'x-ms-file-change-time',
  '2024-04-03T06:36:52.4320202Z',
  'x-ms-file-last-write-time',
  '2024-04-03T06:36:52.4320202Z',
  'x-ms-file-creation-time',
  '2024-04-03T06:36:52.4320202Z',
  'x-ms-file-permission-key',
  '4614121289425226539*16764736045797335973',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 03 Apr 2024 06:36:52 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share171212612403603554/dir171212612471902196/file171212612485607429')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults><Entries><Handle><HandleId>14537654304</HandleId><Path>dir171212612471902196/file171212612485607429</Path><FileId>11529285414812647424</FileId><ParentId>13835128424026341376</ParentId><SessionId>513867793146318209</SessionId><AccessRightList><AccessRight>Read</AccessRight></AccessRightList><ClientIp>10.2.4.26:50352</ClientIp><ClientName>emmawin1026</ClientName><OpenTime>Wed, 03 Apr 2024 06:39:19 GMT</OpenTime></Handle></Entries><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7f34ebd5-c01a-0060-7d92-85efbe000000',
  'x-ms-client-request-id',
  '7c97f567-704e-4913-a58d-c1e78b21bae8',
  'x-ms-version',
  '2024-05-04',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 03 Apr 2024 06:44:08 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share171212612403603554')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7f34ebf3-c01a-0060-1392-85efbe000000',
  'x-ms-client-request-id',
  '458730dc-cf54-4839-9775-0af20dce62da',
  'x-ms-version',
  '2024-05-04',
  'Date',
  'Wed, 03 Apr 2024 06:44:13 GMT'
]);
