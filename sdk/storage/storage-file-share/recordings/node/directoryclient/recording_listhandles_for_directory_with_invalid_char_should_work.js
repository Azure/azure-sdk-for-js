let nock = require('nock');

module.exports.hash = "a8347d3928711e6f4a490b7e8f641e8c";

module.exports.testInfo = {"uniqueName":{"share":"share171223102371009555","dir":"dir171223102383304235","dir￾":"dir￾171223102398104485"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share171223102371009555')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 04 Apr 2024 11:43:44 GMT',
  'ETag',
  '"0x8DC549C7B779BDC"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3d462d6e-001a-000d-7885-865bf5000000',
  'x-ms-client-request-id',
  'cc10792c-68fe-4afe-b776-1c7f04556960',
  'x-ms-version',
  '2024-05-04',
  'Date',
  'Thu, 04 Apr 2024 11:43:44 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share171223102371009555/dir171223102383304235')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 04 Apr 2024 11:43:44 GMT',
  'ETag',
  '"0x8DC549C7B89355D"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3d462d70-001a-000d-7985-865bf5000000',
  'x-ms-client-request-id',
  'a8758740-e6cf-4b35-aa97-779d262878e2',
  'x-ms-version',
  '2024-05-04',
  'x-ms-file-change-time',
  '2024-04-04T11:43:44.3988829Z',
  'x-ms-file-last-write-time',
  '2024-04-04T11:43:44.3988829Z',
  'x-ms-file-creation-time',
  '2024-04-04T11:43:44.3988829Z',
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
  'Thu, 04 Apr 2024 11:43:44 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share171223102371009555/dir%EF%BF%BE171223102398104485')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 04 Apr 2024 11:43:44 GMT',
  'ETag',
  '"0x8DC549C7B9F5229"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3d462d71-001a-000d-7a85-865bf5000000',
  'x-ms-client-request-id',
  '975d9082-6adb-48c9-a0d1-ae28a383fb9b',
  'x-ms-version',
  '2024-05-04',
  'x-ms-file-change-time',
  '2024-04-04T11:43:44.5437993Z',
  'x-ms-file-last-write-time',
  '2024-04-04T11:43:44.5437993Z',
  'x-ms-file-creation-time',
  '2024-04-04T11:43:44.5437993Z',
  'x-ms-file-permission-key',
  '9255856626508002348*16764736045797335973',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 04 Apr 2024 11:43:44 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share171223102371009555/dir%EF%BF%BE171223102398104485')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults><Entries><Handle><HandleId>14537654420</HandleId><Path Encoded=\"true\">dir%EF%BF%BE171223102398104485</Path><FileId>11529285414812647424</FileId><ParentId>0</ParentId><SessionId>513867793146318209</SessionId><AccessRightList><AccessRight>Read</AccessRight></AccessRightList><ClientIp>10.2.4.26:50352</ClientIp><ClientName>emmawin1026</ClientName><OpenTime>Thu, 04 Apr 2024 11:46:24 GMT</OpenTime></Handle><Handle><HandleId>14537654421</HandleId><Path Encoded=\"true\">dir%EF%BF%BE171223102398104485</Path><FileId>11529285414812647424</FileId><ParentId>0</ParentId><SessionId>513867793146318209</SessionId><AccessRightList><AccessRight>Read</AccessRight></AccessRightList><ClientIp>10.2.4.26:50352</ClientIp><ClientName>emmawin1026</ClientName><OpenTime>Thu, 04 Apr 2024 11:46:24 GMT</OpenTime></Handle></Entries><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3d462fad-001a-000d-2d85-865bf5000000',
  'x-ms-client-request-id',
  'fe36dcb1-d2b3-4ffb-8b59-f7519b4674d2',
  'x-ms-version',
  '2024-05-04',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 04 Apr 2024 11:46:27 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share171223102371009555')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3d462fdf-001a-000d-2e85-865bf5000000',
  'x-ms-client-request-id',
  '8bc56d33-924a-41d6-abc1-3abe83998730',
  'x-ms-version',
  '2024-05-04',
  'Date',
  'Thu, 04 Apr 2024 11:46:31 GMT'
]);
