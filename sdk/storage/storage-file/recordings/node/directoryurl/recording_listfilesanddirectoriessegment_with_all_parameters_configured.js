let nock = require('nock');

module.exports.testInfo = {"share":"share156758472834202762","dir":"dir156758472877604046","date":"2019-09-04T08:12:09.191Z","pre1567584729191":"pre1567584729191156758472919109903","pre1567584729191156758472919109903dir0":"pre1567584729191156758472919109903dir0156758472919109677","pre1567584729191156758472919109903dir1":"pre1567584729191156758472919109903dir1156758472960002836","pre1567584729191156758472919109903dir2":"pre1567584729191156758472919109903dir2156758473000702622","pre1567584729191156758472919109903file0":"pre1567584729191156758472919109903file0156758473041101313","pre1567584729191156758472919109903file1":"pre1567584729191156758472919109903file1156758473081409481","pre1567584729191156758472919109903file2":"pre1567584729191156758472919109903file2156758473121902191"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156758472834202762')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 04 Sep 2019 08:12:08 GMT',
  'ETag',
  '"0x8D7310F94BCE6D7"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '69c530f9-f01a-004c-5bf8-6267b3000000',
  'x-ms-client-request-id',
  'a033c041-32d3-4b44-92dd-92c8e915e122',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 08:12:08 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156758472834202762/dir156758472877604046')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 04 Sep 2019 08:12:09 GMT',
  'ETag',
  '"0x8D7310F94FDD34F"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '69faf7af-301a-001e-53f8-621b5b000000',
  'x-ms-client-request-id',
  '19db1beb-bf72-4bf9-82c6-8e2ecb9e998f',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-04T08:12:09.0147663Z',
  'x-ms-file-last-write-time',
  '2019-09-04T08:12:09.0147663Z',
  'x-ms-file-creation-time',
  '2019-09-04T08:12:09.0147663Z',
  'x-ms-file-permission-key',
  '1237041589013461953*8787082347076103240',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 04 Sep 2019 08:12:08 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156758472834202762/pre1567584729191156758472919109903dir0156758472919109677')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 04 Sep 2019 08:12:09 GMT',
  'ETag',
  '"0x8D7310F953D35AC"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '762e9302-d01a-0119-02f8-628935000000',
  'x-ms-client-request-id',
  '97c2beee-7731-4d8f-8bbd-ce7ddba50a50',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-04T08:12:09.4301612Z',
  'x-ms-file-last-write-time',
  '2019-09-04T08:12:09.4301612Z',
  'x-ms-file-creation-time',
  '2019-09-04T08:12:09.4301612Z',
  'x-ms-file-permission-key',
  '1237041589013461953*8787082347076103240',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835093239654252544',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 04 Sep 2019 08:12:09 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156758472834202762/pre1567584729191156758472919109903dir1156758472960002836')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 04 Sep 2019 08:12:09 GMT',
  'ETag',
  '"0x8D7310F957B8648"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6c6197c3-d01a-0006-3cf8-62c43c000000',
  'x-ms-client-request-id',
  'e3af1711-7dc6-4561-96f6-d3b057d34f4f',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-04T08:12:09.8385480Z',
  'x-ms-file-last-write-time',
  '2019-09-04T08:12:09.8385480Z',
  'x-ms-file-creation-time',
  '2019-09-04T08:12:09.8385480Z',
  'x-ms-file-permission-key',
  '1237041589013461953*8787082347076103240',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835163608398430208',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 04 Sep 2019 08:12:09 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156758472834202762/pre1567584729191156758472919109903dir2156758473000702622')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 04 Sep 2019 08:12:10 GMT',
  'ETag',
  '"0x8D7310F95B8EC55"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '25ed3eb3-201a-0094-7ff8-6240ea000000',
  'x-ms-client-request-id',
  'f578e061-2899-47a6-a610-f6c25a01a1b1',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-04T08:12:10.2409301Z',
  'x-ms-file-last-write-time',
  '2019-09-04T08:12:10.2409301Z',
  'x-ms-file-creation-time',
  '2019-09-04T08:12:10.2409301Z',
  'x-ms-file-permission-key',
  '1237041589013461953*8787082347076103240',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835075647468208128',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 04 Sep 2019 08:12:09 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156758472834202762/pre1567584729191156758472919109903file0156758473041101313')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 04 Sep 2019 08:12:10 GMT',
  'ETag',
  '"0x8D7310F95F67960"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a138aacd-101a-0116-66f8-62ff59000000',
  'x-ms-client-request-id',
  '30d5fab2-7e1d-4b00-9df0-37c7759a7102',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-04T08:12:10.6443104Z',
  'x-ms-file-last-write-time',
  '2019-09-04T08:12:10.6443104Z',
  'x-ms-file-creation-time',
  '2019-09-04T08:12:10.6443104Z',
  'x-ms-file-permission-key',
  '15082859266781889734*8787082347076103240',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '13835146016212385792',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 04 Sep 2019 08:12:09 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156758472834202762/pre1567584729191156758472919109903file1156758473081409481')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 04 Sep 2019 08:12:11 GMT',
  'ETag',
  '"0x8D7310F96347BCF"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5b488c2f-801a-012b-65f8-628942000000',
  'x-ms-client-request-id',
  'dbd2bdda-2078-4c4a-a099-03fe2f51f57f',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-04T08:12:11.0506959Z',
  'x-ms-file-last-write-time',
  '2019-09-04T08:12:11.0506959Z',
  'x-ms-file-creation-time',
  '2019-09-04T08:12:11.0506959Z',
  'x-ms-file-permission-key',
  '15082859266781889734*8787082347076103240',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '13835110831840296960',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 04 Sep 2019 08:12:10 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156758472834202762/pre1567584729191156758472919109903file2156758473121902191')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 04 Sep 2019 08:12:11 GMT',
  'ETag',
  '"0x8D7310F96758C3C"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e39f7923-701a-012f-1df8-620445000000',
  'x-ms-client-request-id',
  'd2419dee-bc69-4352-86fd-1eda4697ed48',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-04T08:12:11.4771004Z',
  'x-ms-file-last-write-time',
  '2019-09-04T08:12:11.4771004Z',
  'x-ms-file-creation-time',
  '2019-09-04T08:12:11.4771004Z',
  'x-ms-file-permission-key',
  '15082859266781889734*8787082347076103240',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '13835181200584474624',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 04 Sep 2019 08:12:11 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156758472834202762/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.file.core.windows.net/\" ShareName=\"share156758472834202762\" DirectoryPath=\"\"><Prefix>pre1567584729191156758472919109903</Prefix><MaxResults>3</MaxResults><Entries><Directory><Name>pre1567584729191156758472919109903dir0156758472919109677</Name><Properties /></Directory><Directory><Name>pre1567584729191156758472919109903dir1156758472960002836</Name><Properties /></Directory><Directory><Name>pre1567584729191156758472919109903dir2156758473000702622</Name><Properties /></Directory></Entries><NextMarker>1!76!cHJlMTU2NzU4NDcyOTE5MTE1Njc1ODQ3MjkxOTEwOTkwM2ZpbGUwMTU2NzU4NDczMDQxMTAxMzEz</NextMarker></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '37af4845-b01a-010f-03f8-627fe2000000',
  'x-ms-client-request-id',
  '8a886c87-9f82-407a-bd47-f151068ed68b',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 04 Sep 2019 08:12:11 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156758472834202762/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.file.core.windows.net/\" ShareName=\"share156758472834202762\" DirectoryPath=\"\"><Prefix>pre1567584729191156758472919109903</Prefix><Marker>1!76!cHJlMTU2NzU4NDcyOTE5MTE1Njc1ODQ3MjkxOTEwOTkwM2ZpbGUwMTU2NzU4NDczMDQxMTAxMzEz</Marker><MaxResults>6</MaxResults><Entries><File><Name>pre1567584729191156758472919109903file0156758473041101313</Name><Properties><Content-Length>1024</Content-Length></Properties></File><File><Name>pre1567584729191156758472919109903file1156758473081409481</Name><Properties><Content-Length>1024</Content-Length></Properties></File><File><Name>pre1567584729191156758472919109903file2156758473121902191</Name><Properties><Content-Length>1024</Content-Length></Properties></File></Entries><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd88b0f5f-e01a-0112-7bf8-62725e000000',
  'x-ms-client-request-id',
  'be8a6d0d-4a29-4cea-a6fb-9790086c5bbd',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 04 Sep 2019 08:12:11 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156758472834202762/pre1567584729191156758472919109903file0156758473041101313')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0edcb4d9-201a-0012-09f8-628c53000000',
  'x-ms-client-request-id',
  '613c2139-da19-4c0e-b3f9-3e95cbf91a53',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 08:12:12 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156758472834202762/pre1567584729191156758472919109903file1156758473081409481')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e73dc184-301a-0031-4af8-621690000000',
  'x-ms-client-request-id',
  'ccac8ba9-7bf0-4cce-9752-b5773b7e5868',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 08:12:12 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156758472834202762/pre1567584729191156758472919109903file2156758473121902191')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'fce0a4f5-d01a-00dd-5ff8-620201000000',
  'x-ms-client-request-id',
  'c7a68ee5-648c-4da2-ac38-7c3822971c66',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 08:12:12 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156758472834202762/pre1567584729191156758472919109903dir0156758472919109677')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'fbee8417-401a-0082-11f8-62b63d000000',
  'x-ms-client-request-id',
  '39f4c723-81c7-47f8-a3a3-da4944b0b49a',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 08:12:13 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156758472834202762/pre1567584729191156758472919109903dir1156758472960002836')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5ac709a2-001a-0135-21f8-62659a000000',
  'x-ms-client-request-id',
  '65063b43-1b7a-43b9-b51c-99374c7e7cc0',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 08:12:13 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156758472834202762/pre1567584729191156758472919109903dir2156758473000702622')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6bf2805a-701a-0099-49f8-62883e000000',
  'x-ms-client-request-id',
  'ea4ffbee-0f84-497a-ad29-b95f4702829d',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 08:12:14 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156758472834202762')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ede53f82-301a-013e-5af8-629ef1000000',
  'x-ms-client-request-id',
  '93f9c83f-be9f-40b7-a644-dbb498048460',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 08:12:14 GMT',
  'Connection',
  'close' ]);

