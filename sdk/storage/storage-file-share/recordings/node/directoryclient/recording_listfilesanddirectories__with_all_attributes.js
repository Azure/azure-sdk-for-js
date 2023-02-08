let nock = require('nock');

module.exports.hash = "6d46174a2d93c2dd4e45919c7b9e5a19";

module.exports.testInfo = {"uniqueName":{"share":"share167566673899109627","dir":"dir167566673963409154","dir0":"dir0167566673966804575","dir1":"dir1167566673968408551","dir2":"dir2167566673969806061","file0":"file0167566673971408633","file1":"file1167566673972907464","file2":"file2167566673974309764"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167566673899109627')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 06 Feb 2023 06:58:59 GMT',
  'ETag',
  '"0x8DB080F9F740071"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '93b391a6-b01a-00b6-68f8-3983b3000000',
  'x-ms-client-request-id',
  'ef5519ad-a881-4283-838d-975ecda560e6',
  'x-ms-version',
  '2021-12-02',
  'Date',
  'Mon, 06 Feb 2023 06:58:59 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167566673899109627/dir167566673963409154')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 06 Feb 2023 06:58:59 GMT',
  'ETag',
  '"0x8DB080F9F80864F"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '93b391ae-b01a-00b6-69f8-3983b3000000',
  'x-ms-client-request-id',
  '99aef8f3-e353-43b3-a86a-b077ce7bf727',
  'x-ms-version',
  '2021-12-02',
  'x-ms-file-change-time',
  '2023-02-06T06:58:59.6589135Z',
  'x-ms-file-last-write-time',
  '2023-02-06T06:58:59.6589135Z',
  'x-ms-file-creation-time',
  '2023-02-06T06:58:59.6589135Z',
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
  'Mon, 06 Feb 2023 06:58:59 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167566673899109627/dir167566673963409154/dir0167566673966804575')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 06 Feb 2023 06:58:59 GMT',
  'ETag',
  '"0x8DB080F9F83BA31"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '93b391af-b01a-00b6-6af8-3983b3000000',
  'x-ms-client-request-id',
  '364c7d6d-6eac-44f1-9365-0d7fcf35c235',
  'x-ms-version',
  '2021-12-02',
  'x-ms-file-change-time',
  '2023-02-06T06:58:59.6799025Z',
  'x-ms-file-last-write-time',
  '2023-02-06T06:58:59.6799025Z',
  'x-ms-file-creation-time',
  '2023-02-06T06:58:59.6799025Z',
  'x-ms-file-permission-key',
  '9212185477508673717*1658283376881248060',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 06 Feb 2023 06:58:59 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167566673899109627/dir167566673963409154/dir1167566673968408551')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 06 Feb 2023 06:58:59 GMT',
  'ETag',
  '"0x8DB080F9F85DCC2"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '93b391b0-b01a-00b6-6bf8-3983b3000000',
  'x-ms-client-request-id',
  '801bbded-aca1-4a68-9544-dbceefa19474',
  'x-ms-version',
  '2021-12-02',
  'x-ms-file-change-time',
  '2023-02-06T06:58:59.6938946Z',
  'x-ms-file-last-write-time',
  '2023-02-06T06:58:59.6938946Z',
  'x-ms-file-creation-time',
  '2023-02-06T06:58:59.6938946Z',
  'x-ms-file-permission-key',
  '9212185477508673717*1658283376881248060',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '16140971433240035328',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 06 Feb 2023 06:58:59 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167566673899109627/dir167566673963409154/dir2167566673969806061')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 06 Feb 2023 06:58:59 GMT',
  'ETag',
  '"0x8DB080F9F884D6C"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '93b391b1-b01a-00b6-6cf8-3983b3000000',
  'x-ms-client-request-id',
  'd22f8f39-e7c6-42ea-b88a-b10fb43500fe',
  'x-ms-version',
  '2021-12-02',
  'x-ms-file-change-time',
  '2023-02-06T06:58:59.7098860Z',
  'x-ms-file-last-write-time',
  '2023-02-06T06:58:59.7098860Z',
  'x-ms-file-creation-time',
  '2023-02-06T06:58:59.7098860Z',
  'x-ms-file-permission-key',
  '9212185477508673717*1658283376881248060',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '10376363910205800448',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 06 Feb 2023 06:58:59 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167566673899109627/dir167566673963409154/file0167566673971408633')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 06 Feb 2023 06:58:59 GMT',
  'ETag',
  '"0x8DB080F9F8ABE14"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '93b391b2-b01a-00b6-6df8-3983b3000000',
  'x-ms-client-request-id',
  'c4a3e946-afc9-43bb-b42a-b2ce1b115f09',
  'x-ms-version',
  '2021-12-02',
  'x-ms-file-change-time',
  '2023-02-06T06:58:59.7258772Z',
  'x-ms-file-last-write-time',
  '2023-02-06T06:58:59.7258772Z',
  'x-ms-file-creation-time',
  '2023-02-06T06:58:59.7258772Z',
  'x-ms-file-permission-key',
  '13809038870468939698*1658283376881248060',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '14988049928633188352',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 06 Feb 2023 06:58:59 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167566673899109627/dir167566673963409154/file1167566673972907464')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 06 Feb 2023 06:58:59 GMT',
  'ETag',
  '"0x8DB080F9F8CB99B"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '93b391b3-b01a-00b6-6ef8-3983b3000000',
  'x-ms-client-request-id',
  '5b3a4d2e-9313-407c-a045-4dd088baea3f',
  'x-ms-version',
  '2021-12-02',
  'x-ms-file-change-time',
  '2023-02-06T06:58:59.7388699Z',
  'x-ms-file-last-write-time',
  '2023-02-06T06:58:59.7388699Z',
  'x-ms-file-creation-time',
  '2023-02-06T06:58:59.7388699Z',
  'x-ms-file-permission-key',
  '13809038870468939698*1658283376881248060',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '12682206919419494400',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 06 Feb 2023 06:58:59 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167566673899109627/dir167566673963409154/file2167566673974309764')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 06 Feb 2023 06:58:59 GMT',
  'ETag',
  '"0x8DB080F9F8F2A4C"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '93b391b4-b01a-00b6-6ff8-3983b3000000',
  'x-ms-client-request-id',
  'baea980f-9665-4eab-9d4d-9b6f0fcff7f2',
  'x-ms-version',
  '2021-12-02',
  'x-ms-file-change-time',
  '2023-02-06T06:58:59.7548620Z',
  'x-ms-file-last-write-time',
  '2023-02-06T06:58:59.7548620Z',
  'x-ms-file-creation-time',
  '2023-02-06T06:58:59.7548620Z',
  'x-ms-file-permission-key',
  '13809038870468939698*1658283376881248060',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '17293892937846882304',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 06 Feb 2023 06:58:59 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share167566673899109627/dir167566673963409154')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.file.core.windows.net/\" ShareName=\"share167566673899109627\" DirectoryPath=\"dir167566673963409154\"><DirectoryId>13835128424026341376</DirectoryId><Entries><Directory><Name>dir0167566673966804575</Name><FileId>11529285414812647424</FileId><Properties><CreationTime>2023-02-06T06:58:59.6799025Z</CreationTime><LastAccessTime>2023-02-06T06:58:59.6799025Z</LastAccessTime><LastWriteTime>2023-02-06T06:58:59.6799025Z</LastWriteTime><ChangeTime>2023-02-06T06:58:59.6799025Z</ChangeTime><Last-Modified>Mon, 06 Feb 2023 06:58:59 GMT</Last-Modified><Etag>\"0x8DB080F9F83BA31\"</Etag></Properties><Attributes>Directory</Attributes><PermissionKey>9212185477508673717*1658283376881248060</PermissionKey></Directory><Directory><Name>dir1167566673968408551</Name><FileId>16140971433240035328</FileId><Properties><CreationTime>2023-02-06T06:58:59.6938946Z</CreationTime><LastAccessTime>2023-02-06T06:58:59.6938946Z</LastAccessTime><LastWriteTime>2023-02-06T06:58:59.6938946Z</LastWriteTime><ChangeTime>2023-02-06T06:58:59.6938946Z</ChangeTime><Last-Modified>Mon, 06 Feb 2023 06:58:59 GMT</Last-Modified><Etag>\"0x8DB080F9F85DCC2\"</Etag></Properties><Attributes>Directory</Attributes><PermissionKey>9212185477508673717*1658283376881248060</PermissionKey></Directory><Directory><Name>dir2167566673969806061</Name><FileId>10376363910205800448</FileId><Properties><CreationTime>2023-02-06T06:58:59.7098860Z</CreationTime><LastAccessTime>2023-02-06T06:58:59.7098860Z</LastAccessTime><LastWriteTime>2023-02-06T06:58:59.7098860Z</LastWriteTime><ChangeTime>2023-02-06T06:58:59.7098860Z</ChangeTime><Last-Modified>Mon, 06 Feb 2023 06:58:59 GMT</Last-Modified><Etag>\"0x8DB080F9F884D6C\"</Etag></Properties><Attributes>Directory</Attributes><PermissionKey>9212185477508673717*1658283376881248060</PermissionKey></Directory><File><Name>file0167566673971408633</Name><FileId>14988049928633188352</FileId><Properties><Content-Length>1024</Content-Length><CreationTime>2023-02-06T06:58:59.7258772Z</CreationTime><LastAccessTime>2023-02-06T06:58:59.7258772Z</LastAccessTime><LastWriteTime>2023-02-06T06:58:59.7258772Z</LastWriteTime><ChangeTime>2023-02-06T06:58:59.7258772Z</ChangeTime><Last-Modified>Mon, 06 Feb 2023 06:58:59 GMT</Last-Modified><Etag>\"0x8DB080F9F8ABE14\"</Etag></Properties><Attributes>Archive</Attributes><PermissionKey>13809038870468939698*1658283376881248060</PermissionKey></File><File><Name>file1167566673972907464</Name><FileId>12682206919419494400</FileId><Properties><Content-Length>1024</Content-Length><CreationTime>2023-02-06T06:58:59.7388699Z</CreationTime><LastAccessTime>2023-02-06T06:58:59.7388699Z</LastAccessTime><LastWriteTime>2023-02-06T06:58:59.7388699Z</LastWriteTime><ChangeTime>2023-02-06T06:58:59.7388699Z</ChangeTime><Last-Modified>Mon, 06 Feb 2023 06:58:59 GMT</Last-Modified><Etag>\"0x8DB080F9F8CB99B\"</Etag></Properties><Attributes>Archive</Attributes><PermissionKey>13809038870468939698*1658283376881248060</PermissionKey></File><File><Name>file2167566673974309764</Name><FileId>17293892937846882304</FileId><Properties><Content-Length>1024</Content-Length><CreationTime>2023-02-06T06:58:59.7548620Z</CreationTime><LastAccessTime>2023-02-06T06:58:59.7548620Z</LastAccessTime><LastWriteTime>2023-02-06T06:58:59.7548620Z</LastWriteTime><ChangeTime>2023-02-06T06:58:59.7548620Z</ChangeTime><Last-Modified>Mon, 06 Feb 2023 06:58:59 GMT</Last-Modified><Etag>\"0x8DB080F9F8F2A4C\"</Etag></Properties><Attributes>Archive</Attributes><PermissionKey>13809038870468939698*1658283376881248060</PermissionKey></File></Entries><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '93b391b5-b01a-00b6-70f8-3983b3000000',
  'x-ms-client-request-id',
  '383c7356-a6aa-42c6-8c54-7a1a65f6e34e',
  'x-ms-version',
  '2021-12-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 06 Feb 2023 06:58:59 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167566673899109627/dir167566673963409154/file0167566673971408633')
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '93b391b6-b01a-00b6-71f8-3983b3000000',
  'x-ms-client-request-id',
  '3fbf6ed4-42d6-4684-b33c-fc1cffac9394',
  'x-ms-version',
  '2021-12-02',
  'Date',
  'Mon, 06 Feb 2023 06:58:59 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167566673899109627/dir167566673963409154/file1167566673972907464')
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '93b391b7-b01a-00b6-72f8-3983b3000000',
  'x-ms-client-request-id',
  '3af4a130-ae27-43a7-a5db-780f7d2f4d38',
  'x-ms-version',
  '2021-12-02',
  'Date',
  'Mon, 06 Feb 2023 06:58:59 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167566673899109627/dir167566673963409154/file2167566673974309764')
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '93b391b8-b01a-00b6-73f8-3983b3000000',
  'x-ms-client-request-id',
  'ddf79141-8bdf-4a38-b4cc-75fe43f704d3',
  'x-ms-version',
  '2021-12-02',
  'Date',
  'Mon, 06 Feb 2023 06:58:59 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167566673899109627/dir167566673963409154/dir0167566673966804575')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '93b391b9-b01a-00b6-74f8-3983b3000000',
  'x-ms-client-request-id',
  '7d58eff3-6b62-4b55-b4fc-3b14a91a18e4',
  'x-ms-version',
  '2021-12-02',
  'Date',
  'Mon, 06 Feb 2023 06:58:59 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167566673899109627/dir167566673963409154/dir1167566673968408551')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '93b391ba-b01a-00b6-75f8-3983b3000000',
  'x-ms-client-request-id',
  'de40aaf2-750a-423f-9b17-14f6f23e0990',
  'x-ms-version',
  '2021-12-02',
  'Date',
  'Mon, 06 Feb 2023 06:58:59 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167566673899109627/dir167566673963409154/dir2167566673969806061')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '93b391bb-b01a-00b6-76f8-3983b3000000',
  'x-ms-client-request-id',
  '5a498b2b-a346-4812-b707-4d0c5d04065d',
  'x-ms-version',
  '2021-12-02',
  'Date',
  'Mon, 06 Feb 2023 06:58:59 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167566673899109627')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '93b391bc-b01a-00b6-77f8-3983b3000000',
  'x-ms-client-request-id',
  '8dfd827d-3c4e-4cdc-a572-1d387f9992e5',
  'x-ms-version',
  '2021-12-02',
  'Date',
  'Mon, 06 Feb 2023 06:58:59 GMT'
]);
