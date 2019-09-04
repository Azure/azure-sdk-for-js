let nock = require('nock');

module.exports.testInfo = {"share":"share156758472145608158","dir":"dir156758472186000765","date":"2019-09-04T08:12:02.295Z","pre1567584722295":"pre1567584722295156758472229507959","pre1567584722295156758472229507959dir0":"pre1567584722295156758472229507959dir0156758472229504330","pre1567584722295156758472229507959dir1":"pre1567584722295156758472229507959dir1156758472270205748","pre1567584722295156758472229507959dir2":"pre1567584722295156758472229507959dir2156758472311206139","pre1567584722295156758472229507959file0":"pre1567584722295156758472229507959file0156758472352103326","pre1567584722295156758472229507959file1":"pre1567584722295156758472229507959file1156758472394209662","pre1567584722295156758472229507959file2":"pre1567584722295156758472229507959file2156758472437709518"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156758472145608158')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 04 Sep 2019 08:12:01 GMT',
  'ETag',
  '"0x8D7310F90A0A0F6"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '64468674-201a-003d-46f8-628198000000',
  'x-ms-client-request-id',
  '3ad92870-7e19-417c-8407-aba626df5171',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 08:12:01 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156758472145608158/dir156758472186000765')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 04 Sep 2019 08:12:02 GMT',
  'ETag',
  '"0x8D7310F90DEBFA2"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '134b7b87-b01a-0062-3af8-6235a4000000',
  'x-ms-client-request-id',
  '3d7999a5-7212-43e5-be0d-d4d0238a196c',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-04T08:12:02.1002146Z',
  'x-ms-file-last-write-time',
  '2019-09-04T08:12:02.1002146Z',
  'x-ms-file-creation-time',
  '2019-09-04T08:12:02.1002146Z',
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
  'Wed, 04 Sep 2019 08:12:01 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156758472145608158/pre1567584722295156758472229507959dir0156758472229504330')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 04 Sep 2019 08:12:02 GMT',
  'ETag',
  '"0x8D7310F9120E1B5"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '57880f7f-201a-005f-5df8-6243bf000000',
  'x-ms-client-request-id',
  '9562b1cf-75a8-49f8-8e39-782cf996386e',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-04T08:12:02.5336245Z',
  'x-ms-file-last-write-time',
  '2019-09-04T08:12:02.5336245Z',
  'x-ms-file-creation-time',
  '2019-09-04T08:12:02.5336245Z',
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
  'Wed, 04 Sep 2019 08:12:01 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156758472145608158/pre1567584722295156758472229507959dir1156758472270205748')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 04 Sep 2019 08:12:02 GMT',
  'ETag',
  '"0x8D7310F915F0B33"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '610903c9-e01a-00f9-73f8-62f4a1000000',
  'x-ms-client-request-id',
  'd1f28e76-e80e-4a3c-8242-91b2d4a56c43',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-04T08:12:02.9410099Z',
  'x-ms-file-last-write-time',
  '2019-09-04T08:12:02.9410099Z',
  'x-ms-file-creation-time',
  '2019-09-04T08:12:02.9410099Z',
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
  'Wed, 04 Sep 2019 08:12:02 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156758472145608158/pre1567584722295156758472229507959dir2156758472311206139')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 04 Sep 2019 08:12:03 GMT',
  'ETag',
  '"0x8D7310F919DAA04"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9e456478-401a-0014-0cf8-62bfec000000',
  'x-ms-client-request-id',
  'f2b70dcb-2638-436b-91d7-46d1a1cd35b7',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-04T08:12:03.3513988Z',
  'x-ms-file-last-write-time',
  '2019-09-04T08:12:03.3513988Z',
  'x-ms-file-creation-time',
  '2019-09-04T08:12:03.3513988Z',
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
  'Wed, 04 Sep 2019 08:12:02 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156758472145608158/pre1567584722295156758472229507959file0156758472352103326')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 04 Sep 2019 08:12:03 GMT',
  'ETag',
  '"0x8D7310F91DBFA9B"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e8234e7e-d01a-0016-16f8-620154000000',
  'x-ms-client-request-id',
  '1795a100-053e-45d2-8478-0da110e851d2',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-04T08:12:03.7597851Z',
  'x-ms-file-last-write-time',
  '2019-09-04T08:12:03.7597851Z',
  'x-ms-file-creation-time',
  '2019-09-04T08:12:03.7597851Z',
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
  'Wed, 04 Sep 2019 08:12:03 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156758472145608158/pre1567584722295156758472229507959file1156758472394209662')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 04 Sep 2019 08:12:04 GMT',
  'ETag',
  '"0x8D7310F921BD232"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1684fbf7-e01a-014f-04f8-6278da000000',
  'x-ms-client-request-id',
  '9ed1c32f-71af-4e4d-9ff8-fe7c2ef24906',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-04T08:12:04.1781810Z',
  'x-ms-file-last-write-time',
  '2019-09-04T08:12:04.1781810Z',
  'x-ms-file-creation-time',
  '2019-09-04T08:12:04.1781810Z',
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
  'Wed, 04 Sep 2019 08:12:03 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156758472145608158/pre1567584722295156758472229507959file2156758472437709518')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 04 Sep 2019 08:12:04 GMT',
  'ETag',
  '"0x8D7310F925EB7D1"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '968c9de8-401a-011b-34f8-62378d000000',
  'x-ms-client-request-id',
  '4ef1ff26-37c4-4837-8976-80f6f0ff49aa',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-04T08:12:04.6165969Z',
  'x-ms-file-last-write-time',
  '2019-09-04T08:12:04.6165969Z',
  'x-ms-file-creation-time',
  '2019-09-04T08:12:04.6165969Z',
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
  'Wed, 04 Sep 2019 08:12:03 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156758472145608158/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.file.core.windows.net/\" ShareName=\"share156758472145608158\" DirectoryPath=\"\"><Prefix>pre1567584722295156758472229507959</Prefix><Entries><Directory><Name>pre1567584722295156758472229507959dir0156758472229504330</Name><Properties /></Directory><Directory><Name>pre1567584722295156758472229507959dir1156758472270205748</Name><Properties /></Directory><Directory><Name>pre1567584722295156758472229507959dir2156758472311206139</Name><Properties /></Directory><File><Name>pre1567584722295156758472229507959file0156758472352103326</Name><Properties><Content-Length>1024</Content-Length></Properties></File><File><Name>pre1567584722295156758472229507959file1156758472394209662</Name><Properties><Content-Length>1024</Content-Length></Properties></File><File><Name>pre1567584722295156758472229507959file2156758472437709518</Name><Properties><Content-Length>1024</Content-Length></Properties></File></Entries><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9ff4344b-701a-0089-20f8-624d56000000',
  'x-ms-client-request-id',
  'eaf2639c-19db-40d3-afef-85a652a90671',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 04 Sep 2019 08:12:04 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156758472145608158/pre1567584722295156758472229507959file0156758472352103326')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '15704d26-d01a-0039-37f8-620c9f000000',
  'x-ms-client-request-id',
  '3b3fa970-c97e-43a9-a0f1-dca671fda7df',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 08:12:05 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156758472145608158/pre1567584722295156758472229507959file1156758472394209662')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e5e76156-f01a-0001-24f8-62a85f000000',
  'x-ms-client-request-id',
  'b388472c-4f8b-4637-a871-98b8791876ba',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 08:12:05 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156758472145608158/pre1567584722295156758472229507959file2156758472437709518')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4e974a82-c01a-00ee-20f8-625daa000000',
  'x-ms-client-request-id',
  'f49a004e-d4e0-4b68-892c-298b9ec21e50',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 08:12:05 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156758472145608158/pre1567584722295156758472229507959dir0156758472229504330')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c6942dc5-e01a-0022-50f8-62329c000000',
  'x-ms-client-request-id',
  '6cdaaaef-030f-4c28-82e3-74e591627fa5',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 08:12:06 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156758472145608158/pre1567584722295156758472229507959dir1156758472270205748')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '91a8eeed-601a-0013-41f8-62d38f000000',
  'x-ms-client-request-id',
  '40d3a2ce-9ae3-42ea-89f3-6518d24ebd2c',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 08:12:07 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156758472145608158/pre1567584722295156758472229507959dir2156758472311206139')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8211e7ec-c01a-0057-09f8-6259b0000000',
  'x-ms-client-request-id',
  'd2d1ef00-c7aa-46e2-b7aa-3255f2be1c27',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 08:12:06 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156758472145608158')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '91a8eef0-601a-0013-42f8-62d38f000000',
  'x-ms-client-request-id',
  'd914cf12-a499-45ee-9342-213cb6594d8f',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 08:12:08 GMT',
  'Connection',
  'close' ]);

