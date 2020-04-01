let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"share":"share157726383502004793","dir":"dir157726383624700357","file":"file157726383740403628"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157726383502004793')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 25 Dec 2019 08:50:36 GMT',
  'ETag',
  '"0x8D78917827AFBB0"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd5a73f5c-101a-0047-6c00-bbf960000000',
  'x-ms-client-request-id',
  'c9078b5c-edba-4994-9179-b52c2d0d5d7f',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 25 Dec 2019 08:50:36 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157726383502004793/dir157726383624700357')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 25 Dec 2019 08:50:37 GMT',
  'ETag',
  '"0x8D78917832EFB49"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd5a73f62-101a-0047-6f00-bbf960000000',
  'x-ms-client-request-id',
  'e3162c03-74d1-4856-b4a0-27f6f8d1f507',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-12-25T08:50:37.4361929Z',
  'x-ms-file-last-write-time',
  '2019-12-25T08:50:37.4361929Z',
  'x-ms-file-creation-time',
  '2019-12-25T08:50:37.4361929Z',
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
  'Wed, 25 Dec 2019 08:50:37 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157726383502004793/dir157726383624700357/file157726383740403628')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 25 Dec 2019 08:50:38 GMT',
  'ETag',
  '"0x8D7891783F55AC8"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1a4908a6-201a-002e-1600-bbc02c000000',
  'x-ms-client-request-id',
  '13291174-247b-4420-ba8c-43ea57869999',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-12-25T08:50:38.7362504Z',
  'x-ms-file-last-write-time',
  '2019-12-25T08:50:38.7362504Z',
  'x-ms-file-creation-time',
  '2019-12-25T08:50:38.7362504Z',
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
  'Wed, 25 Dec 2019 08:50:37 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share157726383502004793/dir157726383624700357/file157726383740403628')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults><Entries><Handle><HandleId>31250120777</HandleId><Path>dir157726383624700357/file157726383740403628</Path><FileId>13835093239654252544</FileId><ParentId>13835128424026341376</ParentId><SessionId>9479488151052354093</SessionId><ClientIp>13.92.229.47:49707</ClientIp><OpenTime>Wed, 25 Dec 2019 08:51:48 GMT</OpenTime></Handle></Entries><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1a490903-201a-002e-2700-bbc02c000000',
  'x-ms-client-request-id',
  '20276776-0263-4e66-8b35-e3c3d9bd3ed8',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 25 Dec 2019 08:51:54 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157726383502004793/dir157726383624700357/file157726383740403628')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '998a5f8d-301a-0040-6800-bb9503000000',
  'x-ms-client-request-id',
  '573618a4-ea58-4aa2-9469-be98c29d6468',
  'x-ms-version',
  '2019-02-02',
  'x-ms-number-of-handles-closed',
  '1',
  'Date',
  'Wed, 25 Dec 2019 08:52:04 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157726383502004793/dir157726383624700357/file157726383740403628')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1a490926-201a-002e-2e00-bbc02c000000',
  'x-ms-client-request-id',
  '392da684-5f92-44c6-9a42-276a2c1b516b',
  'x-ms-version',
  '2019-02-02',
  'x-ms-number-of-handles-closed',
  '0',
  'Date',
  'Wed, 25 Dec 2019 08:52:15 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share157726383502004793')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd5a74016-101a-0047-1200-bbf960000000',
  'x-ms-client-request-id',
  '753b6d07-3740-4169-885a-574d826937a1',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 25 Dec 2019 08:52:56 GMT'
]);
