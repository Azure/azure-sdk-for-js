let nock = require('nock');

module.exports.testInfo = {"share":"share156816830919903995","dir":"dir156816830962306368","now":"2019-09-11T02:18:30.166Z","pre1568168310166":"pre1568168310166156816831016604703","pre1568168310166156816831016604703dir0":"pre1568168310166156816831016604703dir0156816831016609082","pre1568168310166156816831016604703dir1":"pre1568168310166156816831016604703dir1156816831059105921","pre1568168310166156816831016604703dir2":"pre1568168310166156816831016604703dir2156816831102403270","pre1568168310166156816831016604703file0":"pre1568168310166156816831016604703file0156816831159007415","pre1568168310166156816831016604703file1":"pre1568168310166156816831016604703file1156816831201104356","pre1568168310166156816831016604703file2":"pre1568168310166156816831016604703file2156816831246706918"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816830919903995')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:18:29 GMT',
  'ETag',
  '"0x8D7365E5618FCEE"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'cf46793d-501a-0047-0347-68b997000000',
  'x-ms-client-request-id',
  '88075e61-ad59-4bf1-974e-c27517059640',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:18:29 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816830919903995/dir156816830962306368')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:18:30 GMT',
  'ETag',
  '"0x8D7365E5667E447"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'cefd34b7-a01a-003f-3747-68d120000000',
  'x-ms-client-request-id',
  'a36c2e2a-8901-4844-89f3-b12c91141d5d',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-11T02:18:30.0689479Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:18:30.0689479Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:18:30.0689479Z',
  'x-ms-file-permission-key',
  '15292852142319295125*13609941760923454748',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 11 Sep 2019 02:18:29 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816830919903995/pre1568168310166156816831016604703dir0156816831016609082')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:18:30 GMT',
  'ETag',
  '"0x8D7365E56AC73D8"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '81abddfb-801a-0067-4047-68d55b000000',
  'x-ms-client-request-id',
  '66518cd0-83b1-40d4-a60b-27e4fa066cc0',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-11T02:18:30.5182680Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:18:30.5182680Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:18:30.5182680Z',
  'x-ms-file-permission-key',
  '15292852142319295125*13609941760923454748',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835093239654252544',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 11 Sep 2019 02:18:30 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816830919903995/pre1568168310166156816831016604703dir1156816831059105921')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:18:30 GMT',
  'ETag',
  '"0x8D7365E56EE6AD4"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '45dc1ae9-401a-0017-5e47-68a69f000000',
  'x-ms-client-request-id',
  'c71803a1-c96f-46cd-916e-ddd22516f2df',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-11T02:18:30.9505748Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:18:30.9505748Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:18:30.9505748Z',
  'x-ms-file-permission-key',
  '15292852142319295125*13609941760923454748',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835163608398430208',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 11 Sep 2019 02:18:30 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816830919903995/pre1568168310166156816831016604703dir2156816831102403270')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:18:31 GMT',
  'ETag',
  '"0x8D7365E57421853"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a85a433e-301a-0018-6047-684b69000000',
  'x-ms-client-request-id',
  '844020ec-43a7-4206-844f-9ab1f5830d03',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-11T02:18:31.4989651Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:18:31.4989651Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:18:31.4989651Z',
  'x-ms-file-permission-key',
  '15292852142319295125*13609941760923454748',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835075647468208128',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 11 Sep 2019 02:18:31 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816830919903995/pre1568168310166156816831016604703file0156816831159007415')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:18:31 GMT',
  'ETag',
  '"0x8D7365E5784ABAC"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '18b2d594-c01a-0006-0547-689184000000',
  'x-ms-client-request-id',
  '60f0dd2d-a67a-4a6f-92bd-2b433ff33b08',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-11T02:18:31.9352748Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:18:31.9352748Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:18:31.9352748Z',
  'x-ms-file-permission-key',
  '1459396823544571282*13609941760923454748',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '13835146016212385792',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 11 Sep 2019 02:18:31 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816830919903995/pre1568168310166156816831016604703file1156816831201104356')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:18:32 GMT',
  'ETag',
  '"0x8D7365E57C9FEAE"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a85a4340-301a-0018-6147-684b69000000',
  'x-ms-client-request-id',
  '55f7a67a-68b6-4520-9e4b-8794edc2a747',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-11T02:18:32.3895982Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:18:32.3895982Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:18:32.3895982Z',
  'x-ms-file-permission-key',
  '1459396823544571282*13609941760923454748',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '11529232638254514176',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 11 Sep 2019 02:18:32 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816830919903995/pre1568168310166156816831016604703file2156816831246706918')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:18:32 GMT',
  'ETag',
  '"0x8D7365E580B0B24"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3f32e84b-d01a-0012-6747-6852e0000000',
  'x-ms-client-request-id',
  '92db8af6-a29e-4b54-92ac-ac7a96e9af3d',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-11T02:18:32.8159012Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:18:32.8159012Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:18:32.8159012Z',
  'x-ms-file-permission-key',
  '1459396823544571282*13609941760923454748',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '13835110831840296960',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 11 Sep 2019 02:18:32 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156816830919903995/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.file.core.windows.net/\" ShareName=\"share156816830919903995\" DirectoryPath=\"\"><Prefix>pre1568168310166156816831016604703</Prefix><Entries><Directory><Name>pre1568168310166156816831016604703dir0156816831016609082</Name><Properties /></Directory><Directory><Name>pre1568168310166156816831016604703dir1156816831059105921</Name><Properties /></Directory><Directory><Name>pre1568168310166156816831016604703dir2156816831102403270</Name><Properties /></Directory><File><Name>pre1568168310166156816831016604703file0156816831159007415</Name><Properties><Content-Length>1024</Content-Length></Properties></File><File><Name>pre1568168310166156816831016604703file1156816831201104356</Name><Properties><Content-Length>1024</Content-Length></Properties></File><File><Name>pre1568168310166156816831016604703file2156816831246706918</Name><Properties><Content-Length>1024</Content-Length></Properties></File></Entries><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '54a3cbf8-801a-0023-4247-680937000000',
  'x-ms-client-request-id',
  '69947de3-f2af-4d28-8125-73fe60d45a62',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 11 Sep 2019 02:18:33 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156816830919903995/pre1568168310166156816831016604703file0156816831159007415')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '700efcb3-901a-001e-4e47-68bc11000000',
  'x-ms-client-request-id',
  'c34a3fc7-023b-47d4-b065-233e2ef80a8c',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:18:33 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156816830919903995/pre1568168310166156816831016604703file1156816831201104356')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7fbe3c12-301a-003a-7847-68255f000000',
  'x-ms-client-request-id',
  '5984a713-e2cc-426f-aee6-56fbf9ac338b',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:18:33 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156816830919903995/pre1568168310166156816831016604703file2156816831246706918')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '53eb17cc-501a-0021-2547-680bcd000000',
  'x-ms-client-request-id',
  'a134625d-2211-4ba7-867c-08375d12d8f3',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:18:34 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156816830919903995/pre1568168310166156816831016604703dir0156816831016609082')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4021a268-e01a-001a-2b47-684993000000',
  'x-ms-client-request-id',
  '7100f454-553b-46d8-a770-ddb29a8f2709',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:18:34 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156816830919903995/pre1568168310166156816831016604703dir1156816831059105921')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '26c20231-101a-0062-2247-682124000000',
  'x-ms-client-request-id',
  '99dcd9dc-7793-47a8-8daf-82c74803a2d1',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:18:35 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156816830919903995/pre1568168310166156816831016604703dir2156816831102403270')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'cb1197d0-001a-0032-4647-683e2c000000',
  'x-ms-client-request-id',
  '1764c81b-d39f-45e3-a1b1-d06a0e6849ae',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:18:35 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156816830919903995')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '322d35e5-a01a-001d-3b47-68bf16000000',
  'x-ms-client-request-id',
  'e18a624c-5f56-423e-be57-e677b6482fac',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:18:35 GMT' ]);

