let nock = require('nock');

module.exports.hash = "4b16b7f175b32e83dc4ac42f1633f482";

module.exports.testInfo = {"uniqueName":{"share":"share171223086668007222","dir":"dir171223086740900657"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share171223086668007222')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 04 Apr 2024 11:41:07 GMT',
  'ETag',
  '"0x8DC549C1E3783AD"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3d462b68-001a-000d-7284-865bf5000000',
  'x-ms-client-request-id',
  'ce03eb0d-92d6-4c88-82a9-ae3ccc3c7032',
  'x-ms-version',
  '2024-05-04',
  'Date',
  'Thu, 04 Apr 2024 11:41:07 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share171223086668007222/dir171223086740900657')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 04 Apr 2024 11:41:07 GMT',
  'ETag',
  '"0x8DC549C1E4E38FC"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3d462b6b-001a-000d-7384-865bf5000000',
  'x-ms-client-request-id',
  '52df5beb-e02d-4c1b-9f0b-e125a2947a7b',
  'x-ms-version',
  '2024-05-04',
  'x-ms-file-change-time',
  '2024-04-04T11:41:07.9842044Z',
  'x-ms-file-last-write-time',
  '2024-04-04T11:41:07.9842044Z',
  'x-ms-file-creation-time',
  '2024-04-04T11:41:07.9842044Z',
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
  'Thu, 04 Apr 2024 11:41:07 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share171223086668007222/dir171223086740900657')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults><Entries><Handle><HandleId>14537654409</HandleId><Path>dir171223086740900657</Path><FileId>13835128424026341376</FileId><ParentId>0</ParentId><SessionId>513867793146318209</SessionId><AccessRightList><AccessRight>Read</AccessRight><AccessRight>Write</AccessRight><AccessRight>Delete</AccessRight></AccessRightList><ClientIp>10.2.4.26:50352</ClientIp><ClientName>emmawin1026</ClientName><OpenTime>Thu, 04 Apr 2024 11:41:51 GMT</OpenTime></Handle></Entries><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3d462d5d-001a-000d-7185-865bf5000000',
  'x-ms-client-request-id',
  'cba1a36f-8e0e-4bf2-bb8f-c5366ccae3ad',
  'x-ms-version',
  '2024-05-04',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 04 Apr 2024 11:43:34 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share171223086668007222')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3d462d6d-001a-000d-7785-865bf5000000',
  'x-ms-client-request-id',
  '8ef0f78c-08ce-4ea1-a3a1-98375e25380c',
  'x-ms-version',
  '2024-05-04',
  'Date',
  'Thu, 04 Apr 2024 11:43:43 GMT'
]);
