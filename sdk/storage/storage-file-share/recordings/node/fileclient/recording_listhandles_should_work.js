let nock = require('nock');

module.exports.hash = "15f5968c19805d35c8c586e9a01bc2fc";

module.exports.testInfo = {"uniqueName":{"share":"share168223109138903404","dir":"dir168223109208607815","file":"file168223109220904712"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share168223109138903404')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 23 Apr 2023 06:24:52 GMT',
  'ETag',
  '"0x8DB43C3726D9B95"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e6aab758-601a-005a-3aac-758bca000000',
  'x-ms-client-request-id',
  '86f6fdba-64f1-414f-908f-5d8be8d8a6d9',
  'x-ms-version',
  '2023-01-03',
  'Date',
  'Sun, 23 Apr 2023 06:24:51 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share168223109138903404/dir168223109208607815')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 23 Apr 2023 06:24:52 GMT',
  'ETag',
  '"0x8DB43C37283BFE1"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e6aab75c-601a-005a-3bac-758bca000000',
  'x-ms-client-request-id',
  '01b92ae3-312e-4347-8d7a-c68495d52a7a',
  'x-ms-version',
  '2023-01-03',
  'x-ms-file-change-time',
  '2023-04-23T06:24:52.1977825Z',
  'x-ms-file-last-write-time',
  '2023-04-23T06:24:52.1977825Z',
  'x-ms-file-creation-time',
  '2023-04-23T06:24:52.1977825Z',
  'x-ms-file-permission-key',
  '9212185477508673717*1658283376881248060',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Sun, 23 Apr 2023 06:24:51 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share168223109138903404/dir168223109208607815/file168223109220904712')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 23 Apr 2023 06:24:52 GMT',
  'ETag',
  '"0x8DB43C372957092"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e6aab75e-601a-005a-3cac-758bca000000',
  'x-ms-client-request-id',
  '1d77c901-ff47-4f11-a367-03b6919841a0',
  'x-ms-version',
  '2023-01-03',
  'x-ms-file-change-time',
  '2023-04-23T06:24:52.3137170Z',
  'x-ms-file-last-write-time',
  '2023-04-23T06:24:52.3137170Z',
  'x-ms-file-creation-time',
  '2023-04-23T06:24:52.3137170Z',
  'x-ms-file-permission-key',
  '13809038870468939698*1658283376881248060',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Sun, 23 Apr 2023 06:24:51 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share168223109138903404/dir168223109208607815/file168223109220904712')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults><Entries><Handle><HandleId>50304516139</HandleId><Path>dir168223109208607815/file168223109220904712</Path><FileId>11529285414812647424</FileId><ParentId>13835128424026341376</ParentId><SessionId>9913091334384648269</SessionId><AccessRightList><AccessRight>Read</AccessRight><AccessRight>Write</AccessRight><AccessRight>Delete</AccessRight></AccessRightList><ClientIp>10.2.4.26:49849</ClientIp><OpenTime>Sun, 23 Apr 2023 06:25:29 GMT</OpenTime><ClientName>file168223109220904712</ClientName></Handle></Entries><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e6aab88a-601a-005a-1bac-758bca000000',
  'x-ms-client-request-id',
  'e3a63f2c-77b4-4ee3-a2dd-ba99fb45fdf2',
  'x-ms-version',
  '2023-01-03',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Sun, 23 Apr 2023 06:25:52 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share168223109138903404')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e6aab891-601a-005a-1cac-758bca000000',
  'x-ms-client-request-id',
  'a79e24eb-3880-4acc-9b8d-5423c1d3c670',
  'x-ms-version',
  '2023-01-03',
  'Date',
  'Sun, 23 Apr 2023 06:25:52 GMT'
]);
