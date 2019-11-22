let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"share":"share157438124893403166","dir":"dir157438124922206500","dir0":"dir0157438124930002368","dir1":"dir1157438124935402029","dir2":"dir2157438124941200149","file0":"file0157438124949002355","file1":"file1157438124955809581","file2":"file2157438124961209428"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157438124893403166')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 22 Nov 2019 00:07:29 GMT',
  'ETag',
  '"0x8D76EDFF6B13F5E"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c573fdfe-d01a-0009-70c8-a03a8c000000',
  'x-ms-client-request-id',
  '99e5b8e9-a8f7-4983-ad88-39427d4b8aa9',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 22 Nov 2019 00:07:28 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157438124893403166/dir157438124922206500')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 22 Nov 2019 00:07:29 GMT',
  'ETag',
  '"0x8D76EDFF6BE696C"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd86c2b54-a01a-005e-19c8-a094bf000000',
  'x-ms-client-request-id',
  '52d398e4-09be-4b32-a9c8-6dc6be94d0aa',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-11-22T00:07:29.2650860Z',
  'x-ms-file-last-write-time',
  '2019-11-22T00:07:29.2650860Z',
  'x-ms-file-creation-time',
  '2019-11-22T00:07:29.2650860Z',
  'x-ms-file-permission-key',
  '3771195323339035646*6669510238408230007',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 22 Nov 2019 00:07:29 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157438124893403166/dir157438124922206500/dir0157438124930002368')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 22 Nov 2019 00:07:29 GMT',
  'ETag',
  '"0x8D76EDFF6C6CDFF"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4163d7aa-b01a-0042-18c8-a0c6df000000',
  'x-ms-client-request-id',
  'a5bf3d21-ca33-4d48-b0a8-48490c068579',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-11-22T00:07:29.3200895Z',
  'x-ms-file-last-write-time',
  '2019-11-22T00:07:29.3200895Z',
  'x-ms-file-creation-time',
  '2019-11-22T00:07:29.3200895Z',
  'x-ms-file-permission-key',
  '3771195323339035646*6669510238408230007',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835093239654252544',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 22 Nov 2019 00:07:28 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157438124893403166/dir157438124922206500/dir1157438124935402029')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 22 Nov 2019 00:07:29 GMT',
  'ETag',
  '"0x8D76EDFF6CF8091"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8893d456-f01a-0053-6dc8-a05c6b000000',
  'x-ms-client-request-id',
  'f957c2aa-3ea5-42db-a9a7-a147c55c69ab',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-11-22T00:07:29.3770897Z',
  'x-ms-file-last-write-time',
  '2019-11-22T00:07:29.3770897Z',
  'x-ms-file-creation-time',
  '2019-11-22T00:07:29.3770897Z',
  'x-ms-file-permission-key',
  '3771195323339035646*6669510238408230007',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835163608398430208',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 22 Nov 2019 00:07:28 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157438124893403166/dir157438124922206500/dir2157438124941200149')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 22 Nov 2019 00:07:29 GMT',
  'ETag',
  '"0x8D76EDFF6DB1963"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '98118db8-601a-0023-6ec8-a0e59c000000',
  'x-ms-client-request-id',
  '36df6718-baab-468c-89ee-834ad57ac462',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-11-22T00:07:29.4530915Z',
  'x-ms-file-last-write-time',
  '2019-11-22T00:07:29.4530915Z',
  'x-ms-file-creation-time',
  '2019-11-22T00:07:29.4530915Z',
  'x-ms-file-permission-key',
  '3771195323339035646*6669510238408230007',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835075647468208128',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 22 Nov 2019 00:07:28 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157438124893403166/dir157438124922206500/file0157438124949002355')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 22 Nov 2019 00:07:29 GMT',
  'ETag',
  '"0x8D76EDFF6E5C7FA"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5c9a5940-201a-007f-17c8-a0b0c4000000',
  'x-ms-client-request-id',
  '16f5a7cf-4a21-466f-812f-5de45cf77083',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-11-22T00:07:29.5230970Z',
  'x-ms-file-last-write-time',
  '2019-11-22T00:07:29.5230970Z',
  'x-ms-file-creation-time',
  '2019-11-22T00:07:29.5230970Z',
  'x-ms-file-permission-key',
  '17595058484822060281*6669510238408230007',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '13835146016212385792',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 22 Nov 2019 00:07:28 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157438124893403166/dir157438124922206500/file1157438124955809581')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 22 Nov 2019 00:07:29 GMT',
  'ETag',
  '"0x8D76EDFF6EE5367"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a8c25ab5-e01a-0084-67c8-a00d5e000000',
  'x-ms-client-request-id',
  'a69d66fb-7460-4c89-b7ab-13280a80095a',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-11-22T00:07:29.5790951Z',
  'x-ms-file-last-write-time',
  '2019-11-22T00:07:29.5790951Z',
  'x-ms-file-creation-time',
  '2019-11-22T00:07:29.5790951Z',
  'x-ms-file-permission-key',
  '17595058484822060281*6669510238408230007',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '13835110831840296960',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 22 Nov 2019 00:07:28 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157438124893403166/dir157438124922206500/file2157438124961209428')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 22 Nov 2019 00:07:29 GMT',
  'ETag',
  '"0x8D76EDFF6F50A5B"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a8c25ab7-e01a-0084-68c8-a00d5e000000',
  'x-ms-client-request-id',
  'd41cd57f-c7a9-487e-a0b9-649662dc4902',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-11-22T00:07:29.6231003Z',
  'x-ms-file-last-write-time',
  '2019-11-22T00:07:29.6231003Z',
  'x-ms-file-creation-time',
  '2019-11-22T00:07:29.6231003Z',
  'x-ms-file-permission-key',
  '17595058484822060281*6669510238408230007',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '11529267822626603008',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 22 Nov 2019 00:07:28 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share157438124893403166/dir157438124922206500')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.file.core.windows.net/\" ShareName=\"share157438124893403166\" DirectoryPath=\"dir157438124922206500\"><Entries><Directory><Name>dir0157438124930002368</Name><Properties /></Directory><Directory><Name>dir1157438124935402029</Name><Properties /></Directory><Directory><Name>dir2157438124941200149</Name><Properties /></Directory><File><Name>file0157438124949002355</Name><Properties><Content-Length>1024</Content-Length></Properties></File><File><Name>file1157438124955809581</Name><Properties><Content-Length>1024</Content-Length></Properties></File><File><Name>file2157438124961209428</Name><Properties><Content-Length>1024</Content-Length></Properties></File></Entries><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd86c2b56-a01a-005e-1ac8-a094bf000000',
  'x-ms-client-request-id',
  '0792992f-6367-465d-86cf-893f7976e6b3',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 22 Nov 2019 00:07:29 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share157438124893403166/dir157438124922206500/file0157438124949002355')
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5c9a5942-201a-007f-18c8-a0b0c4000000',
  'x-ms-client-request-id',
  '4b48b307-f1e0-4afb-8f47-b5bfc516c8e1',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 22 Nov 2019 00:07:29 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share157438124893403166/dir157438124922206500/file1157438124955809581')
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a8c25ab9-e01a-0084-69c8-a00d5e000000',
  'x-ms-client-request-id',
  '928f8b4c-fc23-44f6-b5ab-357d4fbf65a2',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 22 Nov 2019 00:07:28 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share157438124893403166/dir157438124922206500/file2157438124961209428')
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a8c25aba-e01a-0084-6ac8-a00d5e000000',
  'x-ms-client-request-id',
  'd745a834-ba28-461e-bfa6-7403461bd37e',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 22 Nov 2019 00:07:28 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share157438124893403166/dir157438124922206500/dir0157438124930002368')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4163d7ac-b01a-0042-19c8-a0c6df000000',
  'x-ms-client-request-id',
  '3d530b4e-614d-47f8-8e54-2688fd7d5a22',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 22 Nov 2019 00:07:29 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share157438124893403166/dir157438124922206500/dir1157438124935402029')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8893d466-f01a-0053-7cc8-a05c6b000000',
  'x-ms-client-request-id',
  '502dc231-3904-4742-9d41-e074962530ce',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 22 Nov 2019 00:07:29 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share157438124893403166/dir157438124922206500/dir2157438124941200149')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '98118dba-601a-0023-6fc8-a0e59c000000',
  'x-ms-client-request-id',
  '70f5375b-12e2-45a6-b26e-f48f95e36def',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 22 Nov 2019 00:07:29 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share157438124893403166')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c573fe03-d01a-0009-73c8-a03a8c000000',
  'x-ms-client-request-id',
  'e334400f-b8f9-4c72-8772-a931dfdfb5b1',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 22 Nov 2019 00:07:29 GMT'
]);
