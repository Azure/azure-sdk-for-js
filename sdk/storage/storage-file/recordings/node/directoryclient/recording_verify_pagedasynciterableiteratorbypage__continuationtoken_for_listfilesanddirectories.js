let nock = require('nock');

module.exports.testInfo = {"share":"share156150547696607961","dir":"dir156150547730600219","undefined":"2019-06-25T23:31:17.617Z","pre1561505477617":"pre1561505477617156150547761705459","pre1561505477617156150547761705459dir0":"pre1561505477617156150547761705459dir0156150547761706436","pre1561505477617156150547761705459dir1":"pre1561505477617156150547761705459dir1156150547800604611","pre1561505477617156150547761705459dir2":"pre1561505477617156150547761705459dir2156150547834307110","pre1561505477617156150547761705459file0":"pre1561505477617156150547761705459file0156150547871802351","pre1561505477617156150547761705459file1":"pre1561505477617156150547761705459file1156150547907304581","pre1561505477617156150547761705459file2":"pre1561505477617156150547761705459file2156150547938409347"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156150547696607961')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 25 Jun 2019 23:31:17 GMT',
  'ETag',
  '"0x8D6F9C538922D67"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6b2e3dfa-001a-000c-12ae-2b9460000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 25 Jun 2019 23:31:17 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156150547696607961/dir156150547730600219')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 25 Jun 2019 23:31:17 GMT',
  'ETag',
  '"0x8D6F9C538C16BE5"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '25c7d996-e01a-00a7-7fae-2b4372000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 25 Jun 2019 23:31:17 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156150547696607961/pre1561505477617156150547761705459dir0156150547761706436')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 25 Jun 2019 23:31:17 GMT',
  'ETag',
  '"0x8D6F9C538FC35AD"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '18275085-c01a-0011-38ae-2b4d8a000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 25 Jun 2019 23:31:17 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156150547696607961/pre1561505477617156150547761705459dir1156150547800604611')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 25 Jun 2019 23:31:18 GMT',
  'ETag',
  '"0x8D6F9C5392FAB1B"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'fd4a960b-a01a-00c6-63ae-2b07ad000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 25 Jun 2019 23:31:18 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156150547696607961/pre1561505477617156150547761705459dir2156150547834307110')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 25 Jun 2019 23:31:18 GMT',
  'ETag',
  '"0x8D6F9C539693C22"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'be5dc72d-801a-0059-2aae-2b7f17000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 25 Jun 2019 23:31:18 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156150547696607961/pre1561505477617156150547761705459file0156150547871802351')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 25 Jun 2019 23:31:18 GMT',
  'ETag',
  '"0x8D6F9C53999CADD"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e0fd9b27-801a-001d-1bae-2ba37b000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 25 Jun 2019 23:31:18 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156150547696607961/pre1561505477617156150547761705459file1156150547907304581')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 25 Jun 2019 23:31:19 GMT',
  'ETag',
  '"0x8D6F9C539CEA01B"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '18275089-c01a-0011-39ae-2b4d8a000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 25 Jun 2019 23:31:18 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156150547696607961/pre1561505477617156150547761705459file2156150547938409347')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 25 Jun 2019 23:31:19 GMT',
  'ETag',
  '"0x8D6F9C539FE9272"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '339f37ef-201a-0032-64ae-2b2241000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 25 Jun 2019 23:31:19 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156150547696607961/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.file.core.windows.net/\" ShareName=\"share156150547696607961\" DirectoryPath=\"\"><Prefix>pre1561505477617156150547761705459</Prefix><MaxResults>3</MaxResults><Entries><Directory><Name>pre1561505477617156150547761705459dir0156150547761706436</Name><Properties /></Directory><Directory><Name>pre1561505477617156150547761705459dir1156150547800604611</Name><Properties /></Directory><Directory><Name>pre1561505477617156150547761705459dir2156150547834307110</Name><Properties /></Directory></Entries><NextMarker>1!76!cHJlMTU2MTUwNTQ3NzYxNzE1NjE1MDU0Nzc2MTcwNTQ1OWZpbGUwMTU2MTUwNTQ3ODcxODAyMzUx</NextMarker></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a7eb3f25-001a-00e9-66ae-2b8697000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 25 Jun 2019 23:31:19 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156150547696607961/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.file.core.windows.net/\" ShareName=\"share156150547696607961\" DirectoryPath=\"\"><Prefix>pre1561505477617156150547761705459</Prefix><Marker>1!76!cHJlMTU2MTUwNTQ3NzYxNzE1NjE1MDU0Nzc2MTcwNTQ1OWZpbGUwMTU2MTUwNTQ3ODcxODAyMzUx</Marker><MaxResults>6</MaxResults><Entries><File><Name>pre1561505477617156150547761705459file0156150547871802351</Name><Properties><Content-Length>1024</Content-Length></Properties></File><File><Name>pre1561505477617156150547761705459file1156150547907304581</Name><Properties><Content-Length>1024</Content-Length></Properties></File><File><Name>pre1561505477617156150547761705459file2156150547938409347</Name><Properties><Content-Length>1024</Content-Length></Properties></File></Entries><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd45a8bad-a01a-004e-62ae-2bbf74000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 25 Jun 2019 23:31:19 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156150547696607961/pre1561505477617156150547761705459file0156150547871802351')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '80340eef-c01a-0092-22ae-2bed27000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 25 Jun 2019 23:31:20 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156150547696607961/pre1561505477617156150547761705459file1156150547907304581')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5d640a06-201a-0054-34ae-2b901b000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 25 Jun 2019 23:31:20 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156150547696607961/pre1561505477617156150547761705459file2156150547938409347')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd5695575-c01a-007c-06ae-2be7a4000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 25 Jun 2019 23:31:21 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156150547696607961/pre1561505477617156150547761705459dir0156150547761706436')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ac750ff5-f01a-009a-6bae-2bf654000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 25 Jun 2019 23:31:20 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156150547696607961/pre1561505477617156150547761705459dir1156150547800604611')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a7c87826-901a-00a8-08ae-2bae84000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 25 Jun 2019 23:31:21 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156150547696607961/pre1561505477617156150547761705459dir2156150547834307110')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'dc62431f-f01a-003b-64ae-2b38cf000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 25 Jun 2019 23:31:22 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156150547696607961/dir156150547730600219')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd15a336f-901a-0081-23ae-2bd8c6000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 25 Jun 2019 23:31:22 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156150547696607961')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '37ee68b4-701a-006e-53ae-2bd3b8000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 25 Jun 2019 23:31:22 GMT',
  'Connection',
  'close' ]);

