let nock = require('nock');

module.exports.hash = "6fbd4ff0485ca65d7d61fa0a9b52ce10";

module.exports.testInfo = {"uniqueName":{"share":"share167749057087003630","dir":"dir167749057116801642","file":"file167749057146802667"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749057087003630')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:36:11 GMT',
  'ETag',
  '"0x8DB18A60FD91AF4"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb3b1-101a-0070-4c8e-4a9c5e000000',
  'x-ms-client-request-id',
  '7c4a2326-2fb0-4db1-95a6-868fa2948000',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 09:36:11 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749057087003630/dir167749057116801642')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:36:11 GMT',
  'ETag',
  '"0x8DB18A61007A007"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb3b3-101a-0070-4d8e-4a9c5e000000',
  'x-ms-client-request-id',
  '0e7961c7-33b6-464d-9338-5938ea519393',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T09:36:11.5630087Z',
  'x-ms-file-last-write-time',
  '2023-02-27T09:36:11.5630087Z',
  'x-ms-file-creation-time',
  '2023-02-27T09:36:11.5630087Z',
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
  'Mon, 27 Feb 2023 09:36:11 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749057087003630/dir167749057116801642/file167749057146802667')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:36:11 GMT',
  'ETag',
  '"0x8DB18A6103538FF"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb3b5-101a-0070-4e8e-4a9c5e000000',
  'x-ms-client-request-id',
  '0a6de471-66ad-4335-a0b9-7aec1e86e964',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T09:36:11.8618367Z',
  'x-ms-file-last-write-time',
  '2023-02-27T09:36:11.8618367Z',
  'x-ms-file-creation-time',
  '2023-02-27T09:36:11.8618367Z',
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
  'Mon, 27 Feb 2023 09:36:11 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749057087003630/dir167749057116801642/file167749057146802667', "Hello")
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'ixqZU8RhEpaoJ6v4xHgE1w==',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:36:12 GMT',
  'ETag',
  '"0x8DB18A61062AAFC"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb3b6-101a-0070-4f8e-4a9c5e000000',
  'x-ms-client-request-id',
  '194ae400-1c9e-409c-bdc8-a7382531c738',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-last-write-time',
  '2023-02-27T09:36:12.1596668Z',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 27 Feb 2023 09:36:11 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749057087003630/dir167749057116801642/file167749057146802667', "World")
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  '9aeSTmIehMkoCpon4by39g==',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:36:12 GMT',
  'ETag',
  '"0x8DB18A6108FCED7"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb3b7-101a-0070-508e-4a9c5e000000',
  'x-ms-client-request-id',
  'be46301b-1f97-468e-a287-c9a29f832cbd',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-last-write-time',
  '2023-02-27T09:36:12.4554967Z',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 27 Feb 2023 09:36:12 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749057087003630/dir167749057116801642/file167749057146802667')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:36:12 GMT',
  'ETag',
  '"0x8DB18A610BCCBA7"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb3b8-101a-0070-518e-4a9c5e000000',
  'x-ms-client-request-id',
  '66485665-6605-4a88-b070-b5a9429eca58',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-last-write-time',
  '2023-02-27T09:36:12.7503271Z',
  'Date',
  'Mon, 27 Feb 2023 09:36:12 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share167749057087003630/dir167749057116801642/file167749057146802667')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Ranges><Range><Start>0</Start><End>9</End></Range></Ranges>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:36:12 GMT',
  'ETag',
  '"0x8DB18A610BCCBA7"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb3ba-101a-0070-528e-4a9c5e000000',
  'x-ms-client-request-id',
  'deb13416-9068-4c01-a137-2dd1a9f31016',
  'x-ms-version',
  '2022-11-02',
  'x-ms-content-length',
  '10',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-content-length,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 27 Feb 2023 09:36:13 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167749057087003630')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb3bb-101a-0070-538e-4a9c5e000000',
  'x-ms-client-request-id',
  'f68ef606-f4e8-48ac-b59f-d0eb2ad0055f',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 09:36:13 GMT'
]);
