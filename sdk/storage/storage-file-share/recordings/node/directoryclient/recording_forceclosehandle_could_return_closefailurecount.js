let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"share":"share157726141429303215","dir":"dir157726141574200538"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157726141429303215')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 25 Dec 2019 08:10:15 GMT',
  'ETag',
  '"0x8D78911DFBEE811"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2bf10978-201a-002e-4ffa-bac02c000000',
  'x-ms-client-request-id',
  '9d9b8f17-6f0e-41a6-aaf1-3bb7f21606f1',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 25 Dec 2019 08:10:15 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157726141429303215/dir157726141574200538')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 25 Dec 2019 08:10:17 GMT',
  'ETag',
  '"0x8D78911E088942D"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7752c68d-901a-0014-62fa-bada54000000',
  'x-ms-client-request-id',
  'c62a3e41-2975-4bac-9f77-29531bd3a9c3',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-12-25T08:10:17.0711085Z',
  'x-ms-file-last-write-time',
  '2019-12-25T08:10:17.0711085Z',
  'x-ms-file-creation-time',
  '2019-12-25T08:10:17.0711085Z',
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
  'Wed, 25 Dec 2019 08:10:16 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share157726141429303215/dir157726141574200538')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults><Entries><Handle><HandleId>31249989671</HandleId><Path>dir157726141574200538</Path><FileId>13835128424026341376</FileId><ParentId>0</ParentId><SessionId>9434867219008848657</SessionId><ClientIp>13.92.229.47:49734</ClientIp><OpenTime>Wed, 25 Dec 2019 08:13:53 GMT</OpenTime></Handle><Handle><HandleId>31249989672</HandleId><Path>dir157726141574200538</Path><FileId>13835128424026341376</FileId><ParentId>0</ParentId><SessionId>9434867219008848657</SessionId><ClientIp>13.92.229.47:49734</ClientIp><OpenTime>Wed, 25 Dec 2019 08:13:53 GMT</OpenTime></Handle></Entries><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '512453d1-801a-0018-50fb-ba4d5c000000',
  'x-ms-client-request-id',
  'a7b02c79-b475-4bc4-971e-4e58269e09ad',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 25 Dec 2019 08:14:43 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157726141429303215/dir157726141574200538')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2aafcbb2-401a-0028-10fb-baf393000000',
  'x-ms-client-request-id',
  '58316f7b-4215-405c-a235-05d24f0d3ecf',
  'x-ms-version',
  '2019-02-02',
  'x-ms-number-of-handles-closed',
  '1',
  'Date',
  'Wed, 25 Dec 2019 08:14:55 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share157726141429303215')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '933471e7-001a-0016-10fb-ba64ec000000',
  'x-ms-client-request-id',
  '83b86384-12d2-460d-8421-4564233943cf',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 25 Dec 2019 08:15:01 GMT'
]);
