let nock = require('nock');

module.exports.testInfo = {"share":"share156816829495901788","dir":"dir156816829537306188","now":"2019-09-11T02:18:15.789Z","pre1568168295789":"pre1568168295789156816829578908136","pre1568168295789156816829578908136dir0":"pre1568168295789156816829578908136dir0156816829578900469","pre1568168295789156816829578908136dir1":"pre1568168295789156816829578908136dir1156816829620709550","pre1568168295789156816829578908136dir2":"pre1568168295789156816829578908136dir2156816829663209260","pre1568168295789156816829578908136file0":"pre1568168295789156816829578908136file0156816829708601651","pre1568168295789156816829578908136file1":"pre1568168295789156816829578908136file1156816829751802307","pre1568168295789156816829578908136file2":"pre1568168295789156816829578908136file2156816829794801484"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816829495901788')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:18:15 GMT',
  'ETag',
  '"0x8D7365E4D9A8AC0"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ab5253fd-501a-0008-4147-687d8f000000',
  'x-ms-client-request-id',
  'f90b5947-f055-43d5-a0e3-848edfa49776',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:18:14 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816829495901788/dir156816829537306188')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:18:15 GMT',
  'ETag',
  '"0x8D7365E4DDA127F"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bf4c41c2-701a-005b-7347-686180000000',
  'x-ms-client-request-id',
  '6b33fdf6-ba19-4f28-a987-f1f8e6db09cf',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-11T02:18:15.7177471Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:18:15.7177471Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:18:15.7177471Z',
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
  'Wed, 11 Sep 2019 02:18:15 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816829495901788/pre1568168295789156816829578908136dir0156816829578900469')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:18:16 GMT',
  'ETag',
  '"0x8D7365E4E19E63D"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '64913538-f01a-0005-3047-689283000000',
  'x-ms-client-request-id',
  '6b47fca4-6349-40c2-8d7d-8e9b60fdce59',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-11T02:18:16.1360445Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:18:16.1360445Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:18:16.1360445Z',
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
  'Wed, 11 Sep 2019 02:18:16 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816829495901788/pre1568168295789156816829578908136dir1156816829620709550')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:18:16 GMT',
  'ETag',
  '"0x8D7365E4E5A7D6B"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '17ccfc06-401a-0035-0e47-68c8a9000000',
  'x-ms-client-request-id',
  '080a65dc-f5cc-43fa-8c61-e0aaab5d7593',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-11T02:18:16.5593451Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:18:16.5593451Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:18:16.5593451Z',
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
  'Wed, 11 Sep 2019 02:18:15 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816829495901788/pre1568168295789156816829578908136dir2156816829663209260')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:18:16 GMT',
  'ETag',
  '"0x8D7365E4E9AED8A"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b3b0515d-101a-004b-6647-685766000000',
  'x-ms-client-request-id',
  '4ef348ad-2921-4a69-b378-71f84b487a88',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-11T02:18:16.9816458Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:18:16.9816458Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:18:16.9816458Z',
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
  'Wed, 11 Sep 2019 02:18:16 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816829495901788/pre1568168295789156816829578908136file0156816829708601651')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:18:17 GMT',
  'ETag',
  '"0x8D7365E4EE12B0D"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e5f716e1-b01a-0020-3047-680a30000000',
  'x-ms-client-request-id',
  '89cb6367-1394-46f3-a861-e5185f617bae',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-11T02:18:17.4419725Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:18:17.4419725Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:18:17.4419725Z',
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
  'Wed, 11 Sep 2019 02:18:17 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816829495901788/pre1568168295789156816829578908136file1156816829751802307')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:18:17 GMT',
  'ETag',
  '"0x8D7365E4F223783"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '18b2d57c-c01a-0006-0247-689184000000',
  'x-ms-client-request-id',
  '55a4b848-0125-4bdc-a443-cb9041b8f7f1',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-11T02:18:17.8682755Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:18:17.8682755Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:18:17.8682755Z',
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
  'Wed, 11 Sep 2019 02:18:17 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816829495901788/pre1568168295789156816829578908136file2156816829794801484')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:18:18 GMT',
  'ETag',
  '"0x8D7365E4F63B93D"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '97b87b7e-201a-0025-6a47-68fe4f000000',
  'x-ms-client-request-id',
  '57d93b09-84f0-4c6f-8e55-e2018b98a3a0',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-11T02:18:18.2975805Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:18:18.2975805Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:18:18.2975805Z',
  'x-ms-file-permission-key',
  '1459396823544571282*13609941760923454748',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '13835181200584474624',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 11 Sep 2019 02:18:17 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156816829495901788/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.file.core.windows.net/\" ShareName=\"share156816829495901788\" DirectoryPath=\"\"><Prefix>pre1568168295789156816829578908136</Prefix><Entries><Directory><Name>pre1568168295789156816829578908136dir0156816829578900469</Name><Properties /></Directory><Directory><Name>pre1568168295789156816829578908136dir1156816829620709550</Name><Properties /></Directory><Directory><Name>pre1568168295789156816829578908136dir2156816829663209260</Name><Properties /></Directory><File><Name>pre1568168295789156816829578908136file0156816829708601651</Name><Properties><Content-Length>1024</Content-Length></Properties></File><File><Name>pre1568168295789156816829578908136file1156816829751802307</Name><Properties><Content-Length>1024</Content-Length></Properties></File><File><Name>pre1568168295789156816829578908136file2156816829794801484</Name><Properties><Content-Length>1024</Content-Length></Properties></File></Entries><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5668401a-c01a-0060-1647-6823de000000',
  'x-ms-client-request-id',
  'a88f25ab-2460-477c-87f1-1945babd815d',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 11 Sep 2019 02:18:18 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156816829495901788/pre1568168295789156816829578908136file0156816829708601651')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bf4c41c5-701a-005b-7447-686180000000',
  'x-ms-client-request-id',
  '957ed4ed-306f-489e-8347-e35e8df74115',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:18:18 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156816829495901788/pre1568168295789156816829578908136file1156816829751802307')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8617351b-801a-0001-0747-686701000000',
  'x-ms-client-request-id',
  'feb42970-a3e7-4540-bcf4-cd398a3f8673',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:18:18 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156816829495901788/pre1568168295789156816829578908136file2156816829794801484')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '19b1569c-e01a-0038-1147-6827a5000000',
  'x-ms-client-request-id',
  '55c9f184-85c4-44dd-bd9b-70f1f325e5c8',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:18:19 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156816829495901788/pre1568168295789156816829578908136dir0156816829578900469')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '29a459d7-d01a-0030-4c47-683cd6000000',
  'x-ms-client-request-id',
  '208b6e03-fffd-44ea-be57-c057be086b59',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:18:19 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156816829495901788/pre1568168295789156816829578908136dir1156816829620709550')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3f8287d5-801a-0045-6d47-68bb6d000000',
  'x-ms-client-request-id',
  '34dc98a5-8351-4442-8d1c-978e2a32ff0b',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:18:20 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156816829495901788/pre1568168295789156816829578908136dir2156816829663209260')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5da5fd8b-f01a-0068-4047-6838ad000000',
  'x-ms-client-request-id',
  'be4d6dda-6e03-40eb-bb99-235c66af0da9',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:18:21 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156816829495901788')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7d851042-301a-005c-7847-689705000000',
  'x-ms-client-request-id',
  '790b11b5-aaef-451e-a369-4d60bf7c8b05',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:18:21 GMT' ]);

