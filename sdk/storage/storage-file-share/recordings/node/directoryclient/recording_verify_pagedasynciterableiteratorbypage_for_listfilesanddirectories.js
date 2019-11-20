let nock = require('nock');

module.exports.testInfo = {"share":"share156816832325604702","dir":"dir156816832375704162","now":"2019-09-11T02:18:44.182Z","pre1568168324182":"pre1568168324182156816832418201576","pre1568168324182156816832418201576dir0":"pre1568168324182156816832418201576dir0156816832418204823","pre1568168324182156816832418201576dir1":"pre1568168324182156816832418201576dir1156816832460000362","pre1568168324182156816832418201576dir2":"pre1568168324182156816832418201576dir2156816832503709236","pre1568168324182156816832418201576file0":"pre1568168324182156816832418201576file0156816832545203849","pre1568168324182156816832418201576file1":"pre1568168324182156816832418201576file1156816832605907551","pre1568168324182156816832418201576file2":"pre1568168324182156816832418201576file2156816832648408043"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816832325604702')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:18:43 GMT',
  'ETag',
  '"0x8D7365E5E84134E"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '03795aa2-401a-003e-5e47-68d0dd000000',
  'x-ms-client-request-id',
  '5572b053-2596-4b8b-887b-d6a1e8c036a1',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:18:43 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816832325604702/dir156816832375704162')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:18:44 GMT',
  'ETag',
  '"0x8D7365E5EC638C3"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8fd168b6-d01a-003b-3347-6824a2000000',
  'x-ms-client-request-id',
  'f708d5fc-e7a6-45f3-b12f-31c9a34ebece',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-11T02:18:44.1089219Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:18:44.1089219Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:18:44.1089219Z',
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
  'Wed, 11 Sep 2019 02:18:44 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816832325604702/pre1568168324182156816832418201576dir0156816832418204823')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:18:44 GMT',
  'ETag',
  '"0x8D7365E5F05E567"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '199c96ea-201a-0048-7d47-685461000000',
  'x-ms-client-request-id',
  '3472a9bd-8042-44b2-a083-44df064a19a0',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-11T02:18:44.5262183Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:18:44.5262183Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:18:44.5262183Z',
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
  'Wed, 11 Sep 2019 02:18:44 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816832325604702/pre1568168324182156816832418201576dir1156816832460000362')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:18:44 GMT',
  'ETag',
  '"0x8D7365E5F48C700"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3257ddb0-601a-000b-4c47-687e88000000',
  'x-ms-client-request-id',
  '75a35ba0-6810-4b0c-9b53-134e3acc584b',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-11T02:18:44.9645312Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:18:44.9645312Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:18:44.9645312Z',
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
  'Wed, 11 Sep 2019 02:18:44 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816832325604702/pre1568168324182156816832418201576dir2156816832503709236')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:18:45 GMT',
  'ETag',
  '"0x8D7365E5F884C82"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bf4c41ef-701a-005b-7b47-686180000000',
  'x-ms-client-request-id',
  'baf745a8-ebee-4db3-bfa5-27cb1fc71bd9',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-11T02:18:45.3808258Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:18:45.3808258Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:18:45.3808258Z',
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
  'Wed, 11 Sep 2019 02:18:44 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816832325604702/pre1568168324182156816832418201576file0156816832545203849')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:18:45 GMT',
  'ETag',
  '"0x8D7365E5FDF07D3"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '33aceac9-e01a-005e-1947-6895ff000000',
  'x-ms-client-request-id',
  '09e30d5f-f155-4053-8765-f865b8523851',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-11T02:18:45.9492307Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:18:45.9492307Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:18:45.9492307Z',
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
  'Wed, 11 Sep 2019 02:18:45 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816832325604702/pre1568168324182156816832418201576file1156816832605907551')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:18:46 GMT',
  'ETag',
  '"0x8D7365E60256C70"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bf44a2e8-d01a-0056-1e47-688e8c000000',
  'x-ms-client-request-id',
  '9bad1957-63a5-4cb5-b261-95db7c19b5b8',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-11T02:18:46.4105584Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:18:46.4105584Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:18:46.4105584Z',
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
  'Wed, 11 Sep 2019 02:18:45 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816832325604702/pre1568168324182156816832418201576file2156816832648408043')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:18:46 GMT',
  'ETag',
  '"0x8D7365E60651910"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '661b99c5-201a-0007-7347-689079000000',
  'x-ms-client-request-id',
  '13fe0367-63ba-4d7d-b43c-ccbb84737719',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-11T02:18:46.8278544Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:18:46.8278544Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:18:46.8278544Z',
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
  'Wed, 11 Sep 2019 02:18:46 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156816832325604702/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.file.core.windows.net/\" ShareName=\"share156816832325604702\" DirectoryPath=\"\"><Prefix>pre1568168324182156816832418201576</Prefix><MaxResults>2</MaxResults><Entries><Directory><Name>pre1568168324182156816832418201576dir0156816832418204823</Name><Properties /></Directory><Directory><Name>pre1568168324182156816832418201576dir1156816832460000362</Name><Properties /></Directory></Entries><NextMarker>1!76!cHJlMTU2ODE2ODMyNDE4MjE1NjgxNjgzMjQxODIwMTU3NmRpcjIxNTY4MTY4MzI1MDM3MDkyMzY-</NextMarker></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9158b708-f01a-0027-6047-68fcb5000000',
  'x-ms-client-request-id',
  'feb5e90a-6abf-4f2a-a7bb-9d3c33d29846',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 11 Sep 2019 02:18:46 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156816832325604702/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.file.core.windows.net/\" ShareName=\"share156816832325604702\" DirectoryPath=\"\"><Prefix>pre1568168324182156816832418201576</Prefix><Marker>1!76!cHJlMTU2ODE2ODMyNDE4MjE1NjgxNjgzMjQxODIwMTU3NmRpcjIxNTY4MTY4MzI1MDM3MDkyMzY-</Marker><MaxResults>2</MaxResults><Entries><Directory><Name>pre1568168324182156816832418201576dir2156816832503709236</Name><Properties /></Directory><File><Name>pre1568168324182156816832418201576file0156816832545203849</Name><Properties><Content-Length>1024</Content-Length></Properties></File></Entries><NextMarker>1!76!cHJlMTU2ODE2ODMyNDE4MjE1NjgxNjgzMjQxODIwMTU3NmZpbGUxMTU2ODE2ODMyNjA1OTA3NTUx</NextMarker></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '388cf626-a01a-0034-6247-68c954000000',
  'x-ms-client-request-id',
  '288003f9-3be1-45d2-b2c3-36fedcd52208',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 11 Sep 2019 02:18:46 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156816832325604702/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.file.core.windows.net/\" ShareName=\"share156816832325604702\" DirectoryPath=\"\"><Prefix>pre1568168324182156816832418201576</Prefix><Marker>1!76!cHJlMTU2ODE2ODMyNDE4MjE1NjgxNjgzMjQxODIwMTU3NmZpbGUxMTU2ODE2ODMyNjA1OTA3NTUx</Marker><MaxResults>2</MaxResults><Entries><File><Name>pre1568168324182156816832418201576file1156816832605907551</Name><Properties><Content-Length>1024</Content-Length></Properties></File><File><Name>pre1568168324182156816832418201576file2156816832648408043</Name><Properties><Content-Length>1024</Content-Length></Properties></File></Entries><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd31b2390-f01a-002c-0947-68e4c1000000',
  'x-ms-client-request-id',
  'c7108aa4-66fd-41e7-bb34-631307cb8a27',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 11 Sep 2019 02:18:47 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156816832325604702/pre1568168324182156816832418201576file0156816832545203849')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3fa88015-701a-0050-7347-6879f4000000',
  'x-ms-client-request-id',
  '073dcc92-32d9-4146-bf36-36a5a5bd7dbf',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:18:48 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156816832325604702/pre1568168324182156816832418201576file1156816832605907551')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '45dc1afb-401a-0017-6347-68a69f000000',
  'x-ms-client-request-id',
  '04a71353-1cb8-44a3-a68b-2350b468d3c0',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:18:48 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156816832325604702/pre1568168324182156816832418201576file2156816832648408043')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8f38ff16-f01a-0041-0c47-684eef000000',
  'x-ms-client-request-id',
  '00491e59-4e19-4bac-a576-82463190a1aa',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:18:49 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156816832325604702/pre1568168324182156816832418201576dir0156816832418204823')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ddf4b2e4-701a-003d-1a47-68d3da000000',
  'x-ms-client-request-id',
  '84183779-086a-423d-8ee9-5b416d8d2a7c',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:18:49 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156816832325604702/pre1568168324182156816832418201576dir1156816832460000362')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a85a4352-301a-0018-6647-684b69000000',
  'x-ms-client-request-id',
  '9ab892e8-bfd4-442d-8c4b-a07bdcc62251',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:18:50 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156816832325604702/pre1568168324182156816832418201576dir2156816832503709236')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f3b8cff3-601a-0029-1947-6810be000000',
  'x-ms-client-request-id',
  '2fc0f14c-6e15-4f90-a5e2-148d8fcc6337',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:18:50 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156816832325604702')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '17ccfc36-401a-0035-1747-68c8a9000000',
  'x-ms-client-request-id',
  'a84c0bcf-2b7c-4166-8ed2-bdc7c98b978e',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:18:50 GMT' ]);

