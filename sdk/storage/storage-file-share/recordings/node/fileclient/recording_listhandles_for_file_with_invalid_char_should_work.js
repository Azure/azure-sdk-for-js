let nock = require('nock');

module.exports.hash = "8d3314bd602a3957f4500ae5eed6b6e4";

module.exports.testInfo = {"uniqueName":{"share":"share171212665228007945","dir":"dir171212665240407850","file":"file171212665253007705","file￾":"file￾171212666493107632"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share171212665228007945')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 03 Apr 2024 06:44:13 GMT',
  'ETag',
  '"0x8DC53A9797F2CDE"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7f34ebf4-c01a-0060-1492-85efbe000000',
  'x-ms-client-request-id',
  'e2bbaebd-bc04-43bd-a1c2-d97b01ad0d87',
  'x-ms-version',
  '2024-05-04',
  'Date',
  'Wed, 03 Apr 2024 06:44:13 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share171212665228007945/dir171212665240407850')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 03 Apr 2024 06:44:13 GMT',
  'ETag',
  '"0x8DC53A97992DA5F"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7f34ebf7-c01a-0060-1692-85efbe000000',
  'x-ms-client-request-id',
  '33f0c657-99f3-4dc6-873b-1ab2fe60a0e6',
  'x-ms-version',
  '2024-05-04',
  'x-ms-file-change-time',
  '2024-04-03T06:44:13.4013535Z',
  'x-ms-file-last-write-time',
  '2024-04-03T06:44:13.4013535Z',
  'x-ms-file-creation-time',
  '2024-04-03T06:44:13.4013535Z',
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
  'Wed, 03 Apr 2024 06:44:13 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share171212665228007945/file%EF%BF%BE171212666493107632')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 03 Apr 2024 06:44:26 GMT',
  'ETag',
  '"0x8DC53A9819AB532"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7f34ec24-c01a-0060-3292-85efbe000000',
  'x-ms-client-request-id',
  'e2a5bf10-10dc-4e09-ab0d-f4ce41aac814',
  'x-ms-version',
  '2024-05-04',
  'x-ms-file-change-time',
  '2024-04-03T06:44:26.8746034Z',
  'x-ms-file-last-write-time',
  '2024-04-03T06:44:26.8746034Z',
  'x-ms-file-creation-time',
  '2024-04-03T06:44:26.8746034Z',
  'x-ms-file-permission-key',
  '4614121289425226539*16764736045797335973',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 03 Apr 2024 06:44:26 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share171212665228007945/file%EF%BF%BE171212666493107632')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults><Entries><Handle><HandleId>14537654314</HandleId><Path Encoded=\"true\">file%EF%BF%BE171212666493107632</Path><FileId>11529285414812647424</FileId><ParentId>0</ParentId><SessionId>513867793146318209</SessionId><AccessRightList><AccessRight>Read</AccessRight></AccessRightList><ClientIp>10.2.4.26:50352</ClientIp><ClientName>emmawin1026</ClientName><OpenTime>Wed, 03 Apr 2024 06:45:28 GMT</OpenTime></Handle></Entries><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7f34ee17-c01a-0060-7592-85efbe000000',
  'x-ms-client-request-id',
  '4ef975f2-b5d9-4f96-8b17-79093ba7f69c',
  'x-ms-version',
  '2024-05-04',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 03 Apr 2024 06:46:34 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share171212665228007945')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7f34ee1a-c01a-0060-7692-85efbe000000',
  'x-ms-client-request-id',
  '5d7668f8-72e2-4ce6-bf51-bdf77ccd0915',
  'x-ms-version',
  '2024-05-04',
  'Date',
  'Wed, 03 Apr 2024 06:46:34 GMT'
]);
