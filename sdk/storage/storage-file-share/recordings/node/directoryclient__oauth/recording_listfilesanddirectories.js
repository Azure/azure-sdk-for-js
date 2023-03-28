let nock = require('nock');

module.exports.hash = "7481fd0eba9e80e25abd7f87e0bb620d";

module.exports.testInfo = {"uniqueName":{"share":"share167749053162409734","dir":"dir167749053192003306","dir0":"dir0167749053222005360","dir1":"dir1167749053251808713","dir2":"dir2167749053281400038","file0":"file0167749053311105140","file1":"file1167749053341307062","file2":"file2167749053371100767"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749053162409734')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:35:32 GMT',
  'ETag',
  '"0x8DB18A5F874A4B2"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb2d3-101a-0070-388e-4a9c5e000000',
  'x-ms-client-request-id',
  'd9f65afd-6e28-4f07-b7b7-125995558020',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 09:35:31 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749053162409734/dir167749053192003306')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:35:32 GMT',
  'ETag',
  '"0x8DB18A5F8A2EF55"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb2d6-101a-0070-398e-4a9c5e000000',
  'x-ms-client-request-id',
  '58930782-7c81-4bea-8ba3-8749f3da4348',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T09:35:32.3155285Z',
  'x-ms-file-last-write-time',
  '2023-02-27T09:35:32.3155285Z',
  'x-ms-file-creation-time',
  '2023-02-27T09:35:32.3155285Z',
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
  'Mon, 27 Feb 2023 09:35:32 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749053162409734/dir167749053192003306/dir0167749053222005360')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:35:32 GMT',
  'ETag',
  '"0x8DB18A5F8D08859"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb2d7-101a-0070-3a8e-4a9c5e000000',
  'x-ms-client-request-id',
  'fbfc649c-420f-4242-a1a3-b62b4ef6485e',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T09:35:32.6143577Z',
  'x-ms-file-last-write-time',
  '2023-02-27T09:35:32.6143577Z',
  'x-ms-file-creation-time',
  '2023-02-27T09:35:32.6143577Z',
  'x-ms-file-permission-key',
  '8792472798472242479*1359530181238362790',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 27 Feb 2023 09:35:32 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749053162409734/dir167749053192003306/dir1167749053251808713')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:35:32 GMT',
  'ETag',
  '"0x8DB18A5F8FDAC2D"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb2d8-101a-0070-3b8e-4a9c5e000000',
  'x-ms-client-request-id',
  '35cade91-80ee-45af-bc44-043c5a8e6692',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T09:35:32.9101869Z',
  'x-ms-file-last-write-time',
  '2023-02-27T09:35:32.9101869Z',
  'x-ms-file-creation-time',
  '2023-02-27T09:35:32.9101869Z',
  'x-ms-file-permission-key',
  '8792472798472242479*1359530181238362790',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '16140971433240035328',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 27 Feb 2023 09:35:32 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749053162409734/dir167749053192003306/dir2167749053281400038')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:35:33 GMT',
  'ETag',
  '"0x8DB18A5F92AF715"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb2da-101a-0070-3c8e-4a9c5e000000',
  'x-ms-client-request-id',
  '85e8c64f-e188-4629-b293-e5f05d5a7d12',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T09:35:33.2070165Z',
  'x-ms-file-last-write-time',
  '2023-02-27T09:35:33.2070165Z',
  'x-ms-file-creation-time',
  '2023-02-27T09:35:33.2070165Z',
  'x-ms-file-permission-key',
  '8792472798472242479*1359530181238362790',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '10376363910205800448',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 27 Feb 2023 09:35:33 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749053162409734/dir167749053192003306/file0167749053311105140')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:35:33 GMT',
  'ETag',
  '"0x8DB18A5F958DE2A"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb2db-101a-0070-3d8e-4a9c5e000000',
  'x-ms-client-request-id',
  '873d44a5-ebaf-4cd0-a81d-77ffb30ddd7f',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T09:35:33.5078442Z',
  'x-ms-file-last-write-time',
  '2023-02-27T09:35:33.5078442Z',
  'x-ms-file-creation-time',
  '2023-02-27T09:35:33.5078442Z',
  'x-ms-file-permission-key',
  '13438439191449926184*1359530181238362790',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '14988049928633188352',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 27 Feb 2023 09:35:33 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749053162409734/dir167749053192003306/file1167749053341307062')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:35:33 GMT',
  'ETag',
  '"0x8DB18A5F986772B"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb2dc-101a-0070-3e8e-4a9c5e000000',
  'x-ms-client-request-id',
  '0c319bc9-5659-496e-b530-c41c0ce02a42',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T09:35:33.8066731Z',
  'x-ms-file-last-write-time',
  '2023-02-27T09:35:33.8066731Z',
  'x-ms-file-creation-time',
  '2023-02-27T09:35:33.8066731Z',
  'x-ms-file-permission-key',
  '13438439191449926184*1359530181238362790',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '12682206919419494400',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 27 Feb 2023 09:35:33 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749053162409734/dir167749053192003306/file2167749053371100767')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:35:34 GMT',
  'ETag',
  '"0x8DB18A5F9B3E917"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb2dd-101a-0070-3f8e-4a9c5e000000',
  'x-ms-client-request-id',
  '7610337e-7442-4396-991e-12333a3a5c70',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T09:35:34.1045015Z',
  'x-ms-file-last-write-time',
  '2023-02-27T09:35:34.1045015Z',
  'x-ms-file-creation-time',
  '2023-02-27T09:35:34.1045015Z',
  'x-ms-file-permission-key',
  '13438439191449926184*1359530181238362790',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '17293892937846882304',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 27 Feb 2023 09:35:33 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share167749053162409734/dir167749053192003306')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.file.core.windows.net/\" ShareName=\"share167749053162409734\" DirectoryPath=\"dir167749053192003306\"><DirectoryId>13835128424026341376</DirectoryId><Entries><Directory><Name>dir0167749053222005360</Name><FileId>11529285414812647424</FileId><Properties /></Directory><Directory><Name>dir1167749053251808713</Name><FileId>16140971433240035328</FileId><Properties /></Directory><Directory><Name>dir2167749053281400038</Name><FileId>10376363910205800448</FileId><Properties /></Directory><File><Name>file0167749053311105140</Name><FileId>14988049928633188352</FileId><Properties><Content-Length>1024</Content-Length></Properties></File><File><Name>file1167749053341307062</Name><FileId>12682206919419494400</FileId><Properties><Content-Length>1024</Content-Length></Properties></File><File><Name>file2167749053371100767</Name><FileId>17293892937846882304</FileId><Properties><Content-Length>1024</Content-Length></Properties></File></Entries><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb2e1-101a-0070-408e-4a9c5e000000',
  'x-ms-client-request-id',
  '71d69181-cc9b-494f-880f-8ca43a1b66bc',
  'x-ms-version',
  '2022-11-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 27 Feb 2023 09:35:34 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167749053162409734/dir167749053192003306/file0167749053311105140')
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb2e4-101a-0070-438e-4a9c5e000000',
  'x-ms-client-request-id',
  '67b1c07b-c2cc-4a99-9f0f-17fe2bee346a',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 09:35:34 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167749053162409734/dir167749053192003306/file1167749053341307062')
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb2e5-101a-0070-448e-4a9c5e000000',
  'x-ms-client-request-id',
  '1b83c0e7-eaa0-4d8a-b045-ff31629efe07',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 09:35:34 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167749053162409734/dir167749053192003306/file2167749053371100767')
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb2e6-101a-0070-458e-4a9c5e000000',
  'x-ms-client-request-id',
  '5cc4ffac-9811-4dd3-b3f8-a4a64b02c0e2',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 09:35:35 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167749053162409734/dir167749053192003306/dir0167749053222005360')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb2ec-101a-0070-478e-4a9c5e000000',
  'x-ms-client-request-id',
  '8aaceaa0-c801-4065-be14-dbac01d599c5',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 09:35:35 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167749053162409734/dir167749053192003306/dir1167749053251808713')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb2ed-101a-0070-488e-4a9c5e000000',
  'x-ms-client-request-id',
  '2b4a0da3-2520-4c31-a1ba-110e2d265b6f',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 09:35:35 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167749053162409734/dir167749053192003306/dir2167749053281400038')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb2ee-101a-0070-498e-4a9c5e000000',
  'x-ms-client-request-id',
  '29ffb9a2-0864-4790-ba92-549aa67a9a0f',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 09:35:36 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167749053162409734')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb2ef-101a-0070-4a8e-4a9c5e000000',
  'x-ms-client-request-id',
  '69de1a1c-229d-4929-a0dd-5e73d55a5b4c',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 09:35:36 GMT'
]);
