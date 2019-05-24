let nock = require('nock');

module.exports.testInfo = {"share":"share155873376404909294","dir":"dir155873376716403020","date":"2019-05-24T21:36:07.630Z","pre1558733767630":"pre1558733767630155873376763005389","pre1558733767630155873376763005389dir0":"pre1558733767630155873376763005389dir0155873376763002976","pre1558733767630155873376763005389dir1":"pre1558733767630155873376763005389dir1155873376796104591","pre1558733767630155873376763005389dir2":"pre1558733767630155873376763005389dir2155873376836600421","pre1558733767630155873376763005389file0":"pre1558733767630155873376763005389file0155873377046201504","pre1558733767630155873376763005389file1":"pre1558733767630155873376763005389file1155873377092401033","pre1558733767630155873376763005389file2":"pre1558733767630155873376763005389file2155873377137004336"}

nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share155873376404909294')
  .query({"restype":"share"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 24 May 2019 21:36:06 GMT',
  'ETag',
  '"0x8D6E08FD465E77C"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a86c63d7-b01a-000e-4d78-127153000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 24 May 2019 21:36:06 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share155873376404909294/dir155873376716403020')
  .query({"restype":"directory"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 24 May 2019 21:36:07 GMT',
  'ETag',
  '"0x8D6E08FD4AC2ACD"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ba8ce722-301a-0072-1d78-12ec66000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 24 May 2019 21:36:06 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share155873376404909294/pre1558733767630155873376763005389dir0155873376763002976')
  .query({"restype":"directory"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 24 May 2019 21:36:07 GMT',
  'ETag',
  '"0x8D6E08FD4E03CA0"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b1a71ab9-801a-000d-5878-127254000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 24 May 2019 21:36:07 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share155873376404909294/pre1558733767630155873376763005389dir1155873376796104591')
  .query({"restype":"directory"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 24 May 2019 21:36:07 GMT',
  'ETag',
  '"0x8D6E08FD51D9EED"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a7317f65-a01a-0099-4978-12129a000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 24 May 2019 21:36:07 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share155873376404909294/pre1558733767630155873376763005389dir2155873376836600421')
  .query({"restype":"directory"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 24 May 2019 21:36:10 GMT',
  'ETag',
  '"0x8D6E08FD65C9B19"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '24164702-001a-0035-5078-12330d000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 24 May 2019 21:36:09 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share155873376404909294/pre1558733767630155873376763005389file0155873377046201504')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 24 May 2019 21:36:10 GMT',
  'ETag',
  '"0x8D6E08FD6A2B1A0"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '22c441e8-801a-0049-1f78-12ae38000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 24 May 2019 21:36:09 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share155873376404909294/pre1558733767630155873376763005389file1155873377092401033')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 24 May 2019 21:36:10 GMT',
  'ETag',
  '"0x8D6E08FD6E7DDA5"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e66909f5-001a-0071-1b78-12ef61000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 24 May 2019 21:36:10 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share155873376404909294/pre1558733767630155873376763005389file2155873377137004336')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 24 May 2019 21:36:11 GMT',
  'ETag',
  '"0x8D6E08FD72FF062"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'aa962004-901a-005d-7e78-126d5c000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 24 May 2019 21:36:10 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share155873376404909294/')
  .query({"prefix":"pre1558733767630155873376763005389","restype":"directory","comp":"list"})
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://coolstorageaccount1234.file.core.windows.net/\" ShareName=\"share155873376404909294\" DirectoryPath=\"\"><Prefix>pre1558733767630155873376763005389</Prefix><Entries><Directory><Name>pre1558733767630155873376763005389dir0155873376763002976</Name><Properties /></Directory><Directory><Name>pre1558733767630155873376763005389dir1155873376796104591</Name><Properties /></Directory><Directory><Name>pre1558733767630155873376763005389dir2155873376836600421</Name><Properties /></Directory><File><Name>pre1558733767630155873376763005389file0155873377046201504</Name><Properties><Content-Length>1024</Content-Length></Properties></File><File><Name>pre1558733767630155873376763005389file1155873377092401033</Name><Properties><Content-Length>1024</Content-Length></Properties></File><File><Name>pre1558733767630155873376763005389file2155873377137004336</Name><Properties><Content-Length>1024</Content-Length></Properties></File></Entries><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '326d2012-101a-0021-2b78-12f069000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 24 May 2019 21:36:11 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share155873376404909294/pre1558733767630155873376763005389file0155873377046201504')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7171ddfc-801a-0085-3778-12ca8d000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 24 May 2019 21:36:11 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share155873376404909294/pre1558733767630155873376763005389file1155873377092401033')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c7675fda-f01a-0020-1578-12f194000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 24 May 2019 21:36:11 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share155873376404909294/pre1558733767630155873376763005389file2155873377137004336')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c335adce-701a-005c-5178-126ca1000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 24 May 2019 21:36:12 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share155873376404909294/pre1558733767630155873376763005389dir0155873376763002976')
  .query({"restype":"directory"})
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd287066b-601a-0048-3678-12afc5000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 24 May 2019 21:36:12 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share155873376404909294/pre1558733767630155873376763005389dir1155873376796104591')
  .query({"restype":"directory"})
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ce20dbbc-e01a-0070-4f78-12ee9c000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 24 May 2019 21:36:13 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share155873376404909294/pre1558733767630155873376763005389dir2155873376836600421')
  .query({"restype":"directory"})
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '57bddd52-601a-000c-0978-1273a9000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 24 May 2019 21:36:13 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share155873376404909294/dir155873376716403020')
  .query({"restype":"directory"})
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '55d85b46-401a-0098-3f78-121367000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 24 May 2019 21:36:13 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share155873376404909294')
  .query({"restype":"share"})
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '089b5e37-e01a-0034-1278-1232f0000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 24 May 2019 21:36:14 GMT',
  'Connection',
  'close' ]);

