let nock = require('nock');

module.exports.hash = "0ba5d11d96baf3c058812eb3399db78b";

module.exports.testInfo = {"uniqueName":{"share":"share162544901424303651","dir":"dir162544901554302397","dir0":"dir0162544901674306002","dir1":"dir1162544901762104700","dir2":"dir2162544901879908426","file0":"file0162544901999203768","file1":"file1162544902118808840","file2":"file2162544902239106310"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share162544901424303651')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 05 Jul 2021 01:36:55 GMT',
  'ETag',
  '"0x8D93F555F9EBEAC"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd1550721-001a-0007-5c3e-71dd0f000000',
  'x-ms-client-request-id',
  'aad2a6a2-594f-4035-80a7-51655f24e0c8',
  'x-ms-version',
  '2020-10-02',
  'Date',
  'Mon, 05 Jul 2021 01:36:55 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share162544901424303651/dir162544901554302397')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 05 Jul 2021 01:36:57 GMT',
  'ETag',
  '"0x8D93F55605808BB"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '58794bb4-d01a-0012-783e-71af7f000000',
  'x-ms-client-request-id',
  'e6f56cf9-7236-41ab-91a1-18939ffb0c18',
  'x-ms-version',
  '2020-10-02',
  'x-ms-file-change-time',
  '2021-07-05T01:36:57.0788027Z',
  'x-ms-file-last-write-time',
  '2021-07-05T01:36:57.0788027Z',
  'x-ms-file-creation-time',
  '2021-07-05T01:36:57.0788027Z',
  'x-ms-file-permission-key',
  '7735077018765312711*253227986890839374',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 05 Jul 2021 01:36:56 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share162544901424303651/dir162544901554302397/dir0162544901674306002')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 05 Jul 2021 01:36:57 GMT',
  'ETag',
  '"0x8D93F5560DE6350"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '58794bc3-d01a-0012-023e-71af7f000000',
  'x-ms-client-request-id',
  'b11205b6-2c44-468f-aa1f-2164e6573f17',
  'x-ms-version',
  '2020-10-02',
  'x-ms-file-change-time',
  '2021-07-05T01:36:57.9593040Z',
  'x-ms-file-last-write-time',
  '2021-07-05T01:36:57.9593040Z',
  'x-ms-file-creation-time',
  '2021-07-05T01:36:57.9593040Z',
  'x-ms-file-permission-key',
  '7735077018765312711*253227986890839374',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 05 Jul 2021 01:36:57 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share162544901424303651/dir162544901554302397/dir1162544901762104700')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 05 Jul 2021 01:36:59 GMT',
  'ETag',
  '"0x8D93F5561922FEB"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7965f41d-a01a-0005-6b3e-71e2e0000000',
  'x-ms-client-request-id',
  '8c206338-cd21-4cc7-ba43-afff22de36e0',
  'x-ms-version',
  '2020-10-02',
  'x-ms-file-change-time',
  '2021-07-05T01:36:59.1376363Z',
  'x-ms-file-last-write-time',
  '2021-07-05T01:36:59.1376363Z',
  'x-ms-file-creation-time',
  '2021-07-05T01:36:59.1376363Z',
  'x-ms-file-permission-key',
  '7735077018765312711*253227986890839374',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835093239654252544',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 05 Jul 2021 01:36:59 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share162544901424303651/dir162544901554302397/dir2162544901879908426')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 05 Jul 2021 01:37:00 GMT',
  'ETag',
  '"0x8D93F556247D104"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '29283fba-501a-0022-0b3e-71632e000000',
  'x-ms-client-request-id',
  'ee6b6244-291a-4b04-92aa-5e32fdc20763',
  'x-ms-version',
  '2020-10-02',
  'x-ms-file-change-time',
  '2021-07-05T01:37:00.3279620Z',
  'x-ms-file-last-write-time',
  '2021-07-05T01:37:00.3279620Z',
  'x-ms-file-creation-time',
  '2021-07-05T01:37:00.3279620Z',
  'x-ms-file-permission-key',
  '7735077018765312711*253227986890839374',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835163608398430208',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 05 Jul 2021 01:36:59 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share162544901424303651/dir162544901554302397/file0162544901999203768')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 05 Jul 2021 01:37:01 GMT',
  'ETag',
  '"0x8D93F5562FEAA70"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c99a6225-101a-001b-473e-7145f9000000',
  'x-ms-client-request-id',
  '805d54f5-7d5a-4b88-ac9b-b44d533341d8',
  'x-ms-version',
  '2020-10-02',
  'x-ms-file-change-time',
  '2021-07-05T01:37:01.5262832Z',
  'x-ms-file-last-write-time',
  '2021-07-05T01:37:01.5262832Z',
  'x-ms-file-creation-time',
  '2021-07-05T01:37:01.5262832Z',
  'x-ms-file-permission-key',
  '12331785703007272384*253227986890839374',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '13835075647468208128',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 05 Jul 2021 01:37:00 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share162544901424303651/dir162544901554302397/file1162544902118808840')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 05 Jul 2021 01:37:02 GMT',
  'ETag',
  '"0x8D93F5563B69524"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1c116c67-d01a-000d-6f3e-71ef2a000000',
  'x-ms-client-request-id',
  '73025b60-0134-4d5e-8e50-f9d8961b0ce2',
  'x-ms-version',
  '2020-10-02',
  'x-ms-file-change-time',
  '2021-07-05T01:37:02.7316004Z',
  'x-ms-file-last-write-time',
  '2021-07-05T01:37:02.7316004Z',
  'x-ms-file-creation-time',
  '2021-07-05T01:37:02.7316004Z',
  'x-ms-file-permission-key',
  '12331785703007272384*253227986890839374',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '13835146016212385792',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 05 Jul 2021 01:37:02 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share162544901424303651/dir162544901554302397/file2162544902239106310')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 05 Jul 2021 01:37:03 GMT',
  'ETag',
  '"0x8D93F556469296E"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3c203c64-a01a-001a-483e-71a2b5000000',
  'x-ms-client-request-id',
  'd186798d-4fe6-415b-81f6-c9fd01dde77b',
  'x-ms-version',
  '2020-10-02',
  'x-ms-file-change-time',
  '2021-07-05T01:37:03.9019374Z',
  'x-ms-file-last-write-time',
  '2021-07-05T01:37:03.9019374Z',
  'x-ms-file-creation-time',
  '2021-07-05T01:37:03.9019374Z',
  'x-ms-file-permission-key',
  '12331785703007272384*253227986890839374',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '13835110831840296960',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 05 Jul 2021 01:37:03 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share162544901424303651/dir162544901554302397')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.file.core.windows.net/\" ShareName=\"share162544901424303651\" DirectoryPath=\"dir162544901554302397\"><DirectoryId>13835128424026341376</DirectoryId><Entries><Directory><Name>dir0162544901674306002</Name><FileId>11529285414812647424</FileId><Properties><CreationTime>2021-07-05T01:36:57.9593040Z</CreationTime><LastAccessTime>2021-07-05T01:36:57.9593040Z</LastAccessTime><LastWriteTime>2021-07-05T01:36:57.9593040Z</LastWriteTime><ChangeTime>2021-07-05T01:36:57.9593040Z</ChangeTime><Last-Modified>Mon, 05 Jul 2021 01:36:57 GMT</Last-Modified><Etag>\"0x8D93F5560DE6350\"</Etag></Properties><Attributes>Directory</Attributes><PermissionKey>7735077018765312711*253227986890839374</PermissionKey></Directory><Directory><Name>dir1162544901762104700</Name><FileId>13835093239654252544</FileId><Properties><CreationTime>2021-07-05T01:36:59.1376363Z</CreationTime><LastAccessTime>2021-07-05T01:36:59.1376363Z</LastAccessTime><LastWriteTime>2021-07-05T01:36:59.1376363Z</LastWriteTime><ChangeTime>2021-07-05T01:36:59.1376363Z</ChangeTime><Last-Modified>Mon, 05 Jul 2021 01:36:59 GMT</Last-Modified><Etag>\"0x8D93F5561922FEB\"</Etag></Properties><Attributes>Directory</Attributes><PermissionKey>7735077018765312711*253227986890839374</PermissionKey></Directory><Directory><Name>dir2162544901879908426</Name><FileId>13835163608398430208</FileId><Properties><CreationTime>2021-07-05T01:37:00.3279620Z</CreationTime><LastAccessTime>2021-07-05T01:37:00.3279620Z</LastAccessTime><LastWriteTime>2021-07-05T01:37:00.3279620Z</LastWriteTime><ChangeTime>2021-07-05T01:37:00.3279620Z</ChangeTime><Last-Modified>Mon, 05 Jul 2021 01:37:00 GMT</Last-Modified><Etag>\"0x8D93F556247D104\"</Etag></Properties><Attributes>Directory</Attributes><PermissionKey>7735077018765312711*253227986890839374</PermissionKey></Directory><File><Name>file0162544901999203768</Name><FileId>13835075647468208128</FileId><Properties><Content-Length>1024</Content-Length><CreationTime>2021-07-05T01:37:01.5262832Z</CreationTime><LastAccessTime>2021-07-05T01:37:01.5262832Z</LastAccessTime><LastWriteTime>2021-07-05T01:37:01.5262832Z</LastWriteTime><ChangeTime>2021-07-05T01:37:01.5262832Z</ChangeTime><Last-Modified>Mon, 05 Jul 2021 01:37:01 GMT</Last-Modified><Etag>\"0x8D93F5562FEAA70\"</Etag></Properties><Attributes>Archive</Attributes><PermissionKey>12331785703007272384*253227986890839374</PermissionKey></File><File><Name>file1162544902118808840</Name><FileId>13835146016212385792</FileId><Properties><Content-Length>1024</Content-Length><CreationTime>2021-07-05T01:37:02.7316004Z</CreationTime><LastAccessTime>2021-07-05T01:37:02.7316004Z</LastAccessTime><LastWriteTime>2021-07-05T01:37:02.7316004Z</LastWriteTime><ChangeTime>2021-07-05T01:37:02.7316004Z</ChangeTime><Last-Modified>Mon, 05 Jul 2021 01:37:02 GMT</Last-Modified><Etag>\"0x8D93F5563B69524\"</Etag></Properties><Attributes>Archive</Attributes><PermissionKey>12331785703007272384*253227986890839374</PermissionKey></File><File><Name>file2162544902239106310</Name><FileId>13835110831840296960</FileId><Properties><Content-Length>1024</Content-Length><CreationTime>2021-07-05T01:37:03.9019374Z</CreationTime><LastAccessTime>2021-07-05T01:37:03.9019374Z</LastAccessTime><LastWriteTime>2021-07-05T01:37:03.9019374Z</LastWriteTime><ChangeTime>2021-07-05T01:37:03.9019374Z</ChangeTime><Last-Modified>Mon, 05 Jul 2021 01:37:03 GMT</Last-Modified><Etag>\"0x8D93F556469296E\"</Etag></Properties><Attributes>Archive</Attributes><PermissionKey>12331785703007272384*253227986890839374</PermissionKey></File></Entries><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7965f42b-a01a-0005-6f3e-71e2e0000000',
  'x-ms-client-request-id',
  'd9f14a82-ab68-466c-afaf-b073300401a0',
  'x-ms-version',
  '2020-10-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 05 Jul 2021 01:37:04 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share162544901424303651/dir162544901554302397/file0162544901999203768')
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8f44c0fa-201a-0014-043e-71ee4e000000',
  'x-ms-client-request-id',
  '124c0aab-6fd5-42a7-8fa8-eb1a2096cc1a',
  'x-ms-version',
  '2020-10-02',
  'Date',
  'Mon, 05 Jul 2021 01:37:06 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share162544901424303651/dir162544901554302397/file1162544902118808840')
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd2b1e341-701a-0031-243e-71506f000000',
  'x-ms-client-request-id',
  '5218d437-96b7-4b99-8700-63eed914551e',
  'x-ms-version',
  '2020-10-02',
  'Date',
  'Mon, 05 Jul 2021 01:37:07 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share162544901424303651/dir162544901554302397/file2162544902239106310')
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bc2c3dac-801a-0016-5e3e-71d1a1000000',
  'x-ms-client-request-id',
  'b32d3407-b217-4c70-83de-e7d075b9954a',
  'x-ms-version',
  '2020-10-02',
  'Date',
  'Mon, 05 Jul 2021 01:37:08 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share162544901424303651/dir162544901554302397/dir0162544901674306002')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f0d220d0-b01a-0006-7e3e-713a43000000',
  'x-ms-client-request-id',
  '26763e67-26f7-41e8-b7b3-1a42f16d70f5',
  'x-ms-version',
  '2020-10-02',
  'Date',
  'Mon, 05 Jul 2021 01:37:09 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share162544901424303651/dir162544901554302397/dir1162544901762104700')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '927e9cd7-e01a-001d-4c3e-7104c8000000',
  'x-ms-client-request-id',
  'bfc25ffe-dc0f-4144-8ffe-321d4cb8de6c',
  'x-ms-version',
  '2020-10-02',
  'Date',
  'Mon, 05 Jul 2021 01:37:11 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share162544901424303651/dir162544901554302397/dir2162544901879908426')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f998818f-301a-0029-503e-71b647000000',
  'x-ms-client-request-id',
  '042186c9-4999-4064-9f62-a0e15df5b4b2',
  'x-ms-version',
  '2020-10-02',
  'Date',
  'Mon, 05 Jul 2021 01:37:12 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share162544901424303651')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2ccaed12-c01a-000e-563e-713789000000',
  'x-ms-client-request-id',
  '3cf0fe7b-9f2c-4389-b351-100f8d3db0d4',
  'x-ms-version',
  '2020-10-02',
  'Date',
  'Mon, 05 Jul 2021 01:37:13 GMT',
  'Connection',
  'close'
]);
