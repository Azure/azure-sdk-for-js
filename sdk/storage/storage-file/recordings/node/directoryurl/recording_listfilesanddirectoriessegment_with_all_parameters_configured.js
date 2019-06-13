let nock = require('nock');

module.exports.testInfo = {"share":"share155873377547200523","dir":"dir155873377593404878","date":"2019-05-24T21:36:16.342Z","pre1558733776342":"pre1558733776342155873377634200530","pre1558733776342155873377634200530dir0":"pre1558733776342155873377634200530dir0155873377634209073","pre1558733776342155873377634200530dir1":"pre1558733776342155873377634200530dir1155873377815500211","pre1558733776342155873377634200530dir2":"pre1558733776342155873377634200530dir2155873377858300009","pre1558733776342155873377634200530file0":"pre1558733776342155873377634200530file0155873377902008104","pre1558733776342155873377634200530file1":"pre1558733776342155873377634200530file1155873377934605928","pre1558733776342155873377634200530file2":"pre1558733776342155873377634200530file2155873377971902289"}

nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share155873377547200523')
  .query({"restype":"share"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 24 May 2019 21:36:15 GMT',
  'ETag',
  '"0x8D6E08FD9A0154E"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '68e1f162-201a-0083-5378-123df5000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 24 May 2019 21:36:14 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share155873377547200523/dir155873377593404878')
  .query({"restype":"directory"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 24 May 2019 21:36:15 GMT',
  'ETag',
  '"0x8D6E08FD9DC05CC"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3264a849-301a-0097-0278-12fe91000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 24 May 2019 21:36:15 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share155873377547200523/pre1558733776342155873377634200530dir0155873377634209073')
  .query({"restype":"directory"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 24 May 2019 21:36:17 GMT',
  'ETag',
  '"0x8D6E08FDAF2B20A"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '43848a25-201a-000b-5d78-12852c000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 24 May 2019 21:36:17 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share155873377547200523/pre1558733776342155873377634200530dir1155873377815500211')
  .query({"restype":"directory"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 24 May 2019 21:36:18 GMT',
  'ETag',
  '"0x8D6E08FDB33BE98"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'fd119169-f01a-006f-4878-12358c000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 24 May 2019 21:36:17 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share155873377547200523/pre1558733776342155873377634200530dir2155873377858300009')
  .query({"restype":"directory"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 24 May 2019 21:36:18 GMT',
  'ETag',
  '"0x8D6E08FDB76EE74"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'faa534d8-301a-001f-0978-124648000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 24 May 2019 21:36:18 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share155873377547200523/pre1558733776342155873377634200530file0155873377902008104')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 24 May 2019 21:36:18 GMT',
  'ETag',
  '"0x8D6E08FDBA88EE2"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd641d5d8-301a-005b-3478-129a24000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 24 May 2019 21:36:17 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share155873377547200523/pre1558733776342155873377634200530file1155873377934605928')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 24 May 2019 21:36:19 GMT',
  'ETag',
  '"0x8D6E08FDBE183A4"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b99c69dd-101a-0047-2d78-124233000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 24 May 2019 21:36:18 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share155873377547200523/pre1558733776342155873377634200530file2155873377971902289')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 24 May 2019 21:36:19 GMT',
  'ETag',
  '"0x8D6E08FDC2C7D19"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'af306782-a01a-0033-6f78-12c475000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 24 May 2019 21:36:19 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share155873377547200523/')
  .query({"prefix":"pre1558733776342155873377634200530","maxresults":"3","restype":"directory","comp":"list"})
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://coolstorageaccount1234.file.core.windows.net/\" ShareName=\"share155873377547200523\" DirectoryPath=\"\"><Prefix>pre1558733776342155873377634200530</Prefix><MaxResults>3</MaxResults><Entries><Directory><Name>pre1558733776342155873377634200530dir0155873377634209073</Name><Properties /></Directory><Directory><Name>pre1558733776342155873377634200530dir1155873377815500211</Name><Properties /></Directory><Directory><Name>pre1558733776342155873377634200530dir2155873377858300009</Name><Properties /></Directory></Entries><NextMarker>1!76!cHJlMTU1ODczMzc3NjM0MjE1NTg3MzM3NzYzNDIwMDUzMGZpbGUwMTU1ODczMzc3OTAyMDA4MTA0</NextMarker></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4a285dd1-c01a-0082-4378-123c08000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 24 May 2019 21:36:20 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share155873377547200523/')
  .query({"prefix":"pre1558733776342155873377634200530","marker":"1%2176%21cHJlMTU1ODczMzc3NjM0MjE1NTg3MzM3NzYzNDIwMDUzMGZpbGUwMTU1ODczMzc3OTAyMDA4MTA0","maxresults":"6","restype":"directory","comp":"list"})
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://coolstorageaccount1234.file.core.windows.net/\" ShareName=\"share155873377547200523\" DirectoryPath=\"\"><Prefix>pre1558733776342155873377634200530</Prefix><Marker>1!76!cHJlMTU1ODczMzc3NjM0MjE1NTg3MzM3NzYzNDIwMDUzMGZpbGUwMTU1ODczMzc3OTAyMDA4MTA0</Marker><MaxResults>6</MaxResults><Entries><File><Name>pre1558733776342155873377634200530file0155873377902008104</Name><Properties><Content-Length>1024</Content-Length></Properties></File><File><Name>pre1558733776342155873377634200530file1155873377934605928</Name><Properties><Content-Length>1024</Content-Length></Properties></File><File><Name>pre1558733776342155873377634200530file2155873377971902289</Name><Properties><Content-Length>1024</Content-Length></Properties></File></Entries><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5acc2829-101a-006e-0878-123471000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 24 May 2019 21:36:20 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share155873377547200523/pre1558733776342155873377634200530file0155873377902008104')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '81aaf9a2-d01a-0096-7c78-12ff6c000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 24 May 2019 21:36:20 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share155873377547200523/pre1558733776342155873377634200530file1155873377934605928')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ce86247c-c01a-000a-7c78-1284d1000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 24 May 2019 21:36:21 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share155873377547200523/pre1558733776342155873377634200530file2155873377971902289')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e1ac48da-f01a-0046-5378-1243ce000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 24 May 2019 21:36:21 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share155873377547200523/pre1558733776342155873377634200530dir0155873377634209073')
  .query({"restype":"directory"})
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a5794f7b-e01a-0095-7e78-12fc6b000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 24 May 2019 21:36:22 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share155873377547200523/pre1558733776342155873377634200530dir1155873377815500211')
  .query({"restype":"directory"})
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5e15c735-f01a-0081-6678-123f0f000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 24 May 2019 21:36:22 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share155873377547200523/pre1558733776342155873377634200530dir2155873377858300009')
  .query({"restype":"directory"})
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bf66bbd3-e01a-001d-5e78-1244b2000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 24 May 2019 21:36:22 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share155873377547200523/dir155873377593404878')
  .query({"restype":"directory"})
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2a066595-201a-006d-7f78-123776000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 24 May 2019 21:36:23 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share155873377547200523')
  .query({"restype":"share"})
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '22c6bf7a-701a-0031-7f78-12c68f000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 24 May 2019 21:36:23 GMT',
  'Connection',
  'close' ]);

