let nock = require('nock');

module.exports.testInfo = {"share":"share155613675051806913","dir":"dir155613675085101016","date":"2019-04-24T20:12:31.192Z","pre1556136751192":"pre1556136751192155613675119205746","pre1556136751192155613675119205746dir0":"pre1556136751192155613675119205746dir0155613675119208212","pre1556136751192155613675119205746dir1":"pre1556136751192155613675119205746dir1155613675153006568","pre1556136751192155613675119205746dir2":"pre1556136751192155613675119205746dir2155613675186906112","pre1556136751192155613675119205746file0":"pre1556136751192155613675119205746file0155613675221208374","pre1556136751192155613675119205746file1":"pre1556136751192155613675119205746file1155613675255107802","pre1556136751192155613675119205746file2":"pre1556136751192155613675119205746file2155613675288805686"}

nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share155613675051806913')
  .query({"restype":"share"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 24 Apr 2019 20:12:30 GMT',
  'ETag',
  '"0x8D6C8F12E3ED63E"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '994e5622-e01a-001d-50da-fa44b2000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Wed, 24 Apr 2019 20:12:30 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share155613675051806913/dir155613675085101016')
  .query({"restype":"directory"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 24 Apr 2019 20:12:31 GMT',
  'ETag',
  '"0x8D6C8F12E7318E1"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'be49ebf3-701a-005c-47da-fa6ca1000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 24 Apr 2019 20:12:30 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share155613675051806913/pre1556136751192155613675119205746dir0155613675119208212')
  .query({"restype":"directory"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 24 Apr 2019 20:12:31 GMT',
  'ETag',
  '"0x8D6C8F12EA70387"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1328cca8-201a-0088-23da-fa2581000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 24 Apr 2019 20:12:30 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share155613675051806913/pre1556136751192155613675119205746dir1155613675153006568')
  .query({"restype":"directory"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 24 Apr 2019 20:12:31 GMT',
  'ETag',
  '"0x8D6C8F12EDAC70F"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '097d1cac-101a-008b-20da-fa2686000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 24 Apr 2019 20:12:31 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share155613675051806913/pre1556136751192155613675119205746dir2155613675186906112')
  .query({"restype":"directory"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 24 Apr 2019 20:12:32 GMT',
  'ETag',
  '"0x8D6C8F12F0ED8C6"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '73109e43-101a-0003-1fda-fa9e5f000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 24 Apr 2019 20:12:31 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share155613675051806913/pre1556136751192155613675119205746file0155613675221208374')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 24 Apr 2019 20:12:32 GMT',
  'ETag',
  '"0x8D6C8F12F424E29"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2d734fc1-601a-002e-42da-fa1d9f000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 24 Apr 2019 20:12:32 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share155613675051806913/pre1556136751192155613675119205746file1155613675255107802')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 24 Apr 2019 20:12:32 GMT',
  'ETag',
  '"0x8D6C8F12F7638DD"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '18a9ac55-f01a-0009-0eda-fa87d6000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 24 Apr 2019 20:12:31 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share155613675051806913/pre1556136751192155613675119205746file2155613675288805686')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 24 Apr 2019 20:12:33 GMT',
  'ETag',
  '"0x8D6C8F12FA9AE4F"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'eaddb322-f01a-0020-73da-faf194000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 24 Apr 2019 20:12:32 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share155613675051806913/')
  .query({"prefix":"pre1556136751192155613675119205746","maxresults":"3","restype":"directory","comp":"list"})
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://coolstorageaccount1234.file.core.windows.net/\" ShareName=\"share155613675051806913\" DirectoryPath=\"\"><Prefix>pre1556136751192155613675119205746</Prefix><MaxResults>3</MaxResults><Entries><Directory><Name>pre1556136751192155613675119205746dir0155613675119208212</Name><Properties /></Directory><Directory><Name>pre1556136751192155613675119205746dir1155613675153006568</Name><Properties /></Directory><Directory><Name>pre1556136751192155613675119205746dir2155613675186906112</Name><Properties /></Directory></Entries><NextMarker>1!76!cHJlMTU1NjEzNjc1MTE5MjE1NTYxMzY3NTExOTIwNTc0NmZpbGUwMTU1NjEzNjc1MjIxMjA4Mzc0</NextMarker></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '802fb51d-901a-0074-7eda-fa1b1e000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 24 Apr 2019 20:12:32 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share155613675051806913/')
  .query({"prefix":"pre1556136751192155613675119205746","marker":"1%2176%21cHJlMTU1NjEzNjc1MTE5MjE1NTYxMzY3NTExOTIwNTc0NmZpbGUwMTU1NjEzNjc1MjIxMjA4Mzc0","maxresults":"6","restype":"directory","comp":"list"})
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://coolstorageaccount1234.file.core.windows.net/\" ShareName=\"share155613675051806913\" DirectoryPath=\"\"><Prefix>pre1556136751192155613675119205746</Prefix><Marker>1!76!cHJlMTU1NjEzNjc1MTE5MjE1NTYxMzY3NTExOTIwNTc0NmZpbGUwMTU1NjEzNjc1MjIxMjA4Mzc0</Marker><MaxResults>6</MaxResults><Entries><File><Name>pre1556136751192155613675119205746file0155613675221208374</Name><Properties><Content-Length>1024</Content-Length></Properties></File><File><Name>pre1556136751192155613675119205746file1155613675255107802</Name><Properties><Content-Length>1024</Content-Length></Properties></File><File><Name>pre1556136751192155613675119205746file2155613675288805686</Name><Properties><Content-Length>1024</Content-Length></Properties></File></Entries><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '662172c5-701a-0013-6dda-faa8b9000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 24 Apr 2019 20:12:33 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share155613675051806913/pre1556136751192155613675119205746file0155613675221208374')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '725dd9eb-001a-0053-01da-fa8157000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Wed, 24 Apr 2019 20:12:33 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share155613675051806913/pre1556136751192155613675119205746file1155613675255107802')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6e6a7df4-801a-0042-62da-fab64c000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Wed, 24 Apr 2019 20:12:34 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share155613675051806913/pre1556136751192155613675119205746file2155613675288805686')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3741bad9-f01a-0081-5dda-fa3f0f000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Wed, 24 Apr 2019 20:12:34 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share155613675051806913/pre1556136751192155613675119205746dir0155613675119208212')
  .query({"restype":"directory"})
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4ad9bcce-801a-0085-6fda-faca8d000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Wed, 24 Apr 2019 20:12:35 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share155613675051806913/pre1556136751192155613675119205746dir1155613675153006568')
  .query({"restype":"directory"})
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '256ff954-101a-004c-0ada-fa5a47000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Wed, 24 Apr 2019 20:12:35 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share155613675051806913/pre1556136751192155613675119205746dir2155613675186906112')
  .query({"restype":"directory"})
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '19a6fe4d-901a-003b-5ada-fadf06000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Wed, 24 Apr 2019 20:12:35 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share155613675051806913/dir155613675085101016')
  .query({"restype":"directory"})
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '824a1bd4-c01a-0067-02da-fa2eff000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Wed, 24 Apr 2019 20:12:35 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share155613675051806913')
  .query({"restype":"share"})
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'add64536-601a-006a-78da-fac1f3000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Wed, 24 Apr 2019 20:12:36 GMT',
  'Connection',
  'close' ]);
