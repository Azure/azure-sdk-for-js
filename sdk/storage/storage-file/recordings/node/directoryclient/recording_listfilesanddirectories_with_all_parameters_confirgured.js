let nock = require('nock');

module.exports.testInfo = {"share":"share156150545208709301","dir":"dir156150545239504228","undefined":"2019-06-25T23:30:52.733Z","pre1561505452733":"pre1561505452733156150545273309776","pre1561505452733156150545273309776dir0":"pre1561505452733156150545273309776dir0156150545273302519","pre1561505452733156150545273309776dir1":"pre1561505452733156150545273309776dir1156150545305305418","pre1561505452733156150545273309776dir2":"pre1561505452733156150545273309776dir2156150545337106882","pre1561505452733156150545273309776file0":"pre1561505452733156150545273309776file0156150545368007537","pre1561505452733156150545273309776file1":"pre1561505452733156150545273309776file1156150545400109259","pre1561505452733156150545273309776file2":"pre1561505452733156150545273309776file2156150545431806214"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156150545208709301')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 25 Jun 2019 23:30:52 GMT',
  'ETag',
  '"0x8D6F9C529B977FF"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a87f8a28-901a-00ec-07ae-2b72e8000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 25 Jun 2019 23:30:51 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156150545208709301/dir156150545239504228')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 25 Jun 2019 23:30:52 GMT',
  'ETag',
  '"0x8D6F9C529E88175"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ace332aa-601a-00db-44ae-2bde47000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 25 Jun 2019 23:30:52 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156150545208709301/pre1561505452733156150545273309776dir0156150545273302519')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 25 Jun 2019 23:30:52 GMT',
  'ETag',
  '"0x8D6F9C52A1BF6CF"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '209e99c4-e01a-0042-73ae-2b5185000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 25 Jun 2019 23:30:52 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156150545208709301/pre1561505452733156150545273309776dir1156150545305305418')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 25 Jun 2019 23:30:53 GMT',
  'ETag',
  '"0x8D6F9C52A4D21E3"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'fea5180e-301a-008c-60ae-2b37ca000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 25 Jun 2019 23:30:53 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156150545208709301/pre1561505452733156150545273309776dir2156150545337106882')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 25 Jun 2019 23:30:53 GMT',
  'ETag',
  '"0x8D6F9C52A7D626B"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0247581e-a01a-00a0-35ae-2bb5f7000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 25 Jun 2019 23:30:53 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156150545208709301/pre1561505452733156150545273309776file0156150545368007537')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 25 Jun 2019 23:30:53 GMT',
  'ETag',
  '"0x8D6F9C52AADF122"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9537785a-701a-00a9-46ae-2baf79000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 25 Jun 2019 23:30:53 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156150545208709301/pre1561505452733156150545273309776file1156150545400109259')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 25 Jun 2019 23:30:54 GMT',
  'ETag',
  '"0x8D6F9C52ADDE381"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b1df2ba8-701a-0047-18ae-2ba5fa000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 25 Jun 2019 23:30:54 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156150545208709301/pre1561505452733156150545273309776file2156150545431806214')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 25 Jun 2019 23:30:54 GMT',
  'ETag',
  '"0x8D6F9C52B0E4B1D"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'fd4a95ee-a01a-00c6-5cae-2b07ad000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 25 Jun 2019 23:30:54 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156150545208709301/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.file.core.windows.net/\" ShareName=\"share156150545208709301\" DirectoryPath=\"\"><Prefix>pre1561505452733156150545273309776</Prefix><MaxResults>3</MaxResults><Entries><Directory><Name>pre1561505452733156150545273309776dir0156150545273302519</Name><Properties /></Directory><Directory><Name>pre1561505452733156150545273309776dir1156150545305305418</Name><Properties /></Directory><Directory><Name>pre1561505452733156150545273309776dir2156150545337106882</Name><Properties /></Directory></Entries><NextMarker>1!76!cHJlMTU2MTUwNTQ1MjczMzE1NjE1MDU0NTI3MzMwOTc3NmZpbGUwMTU2MTUwNTQ1MzY4MDA3NTM3</NextMarker></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '400bd454-e01a-0085-1cae-2b2d44000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 25 Jun 2019 23:30:54 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156150545208709301/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.file.core.windows.net/\" ShareName=\"share156150545208709301\" DirectoryPath=\"\"><Prefix>pre1561505452733156150545273309776</Prefix><Marker>1!76!cHJlMTU2MTUwNTQ1MjczMzE1NjE1MDU0NTI3MzMwOTc3NmZpbGUwMTU2MTUwNTQ1MzY4MDA3NTM3</Marker><MaxResults>6</MaxResults><Entries><File><Name>pre1561505452733156150545273309776file0156150545368007537</Name><Properties><Content-Length>1024</Content-Length></Properties></File><File><Name>pre1561505452733156150545273309776file1156150545400109259</Name><Properties><Content-Length>1024</Content-Length></Properties></File><File><Name>pre1561505452733156150545273309776file2156150545431806214</Name><Properties><Content-Length>1024</Content-Length></Properties></File></Entries><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3ed42143-801a-00bc-0fae-2b6de0000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 25 Jun 2019 23:30:54 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156150545208709301/pre1561505452733156150545273309776file0156150545368007537')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '37127190-c01a-0038-2cae-2b3bc8000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 25 Jun 2019 23:30:55 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156150545208709301/pre1561505452733156150545273309776file1156150545400109259')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c0687722-e01a-000d-5cae-2b959d000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 25 Jun 2019 23:30:54 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156150545208709301/pre1561505452733156150545273309776file2156150545431806214')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '25a65d2c-701a-00e6-3fae-2b6b61000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 25 Jun 2019 23:30:55 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156150545208709301/pre1561505452733156150545273309776dir0156150545273302519')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '523cfc00-001a-00c0-60ae-2bf0d5000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 25 Jun 2019 23:30:56 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156150545208709301/pre1561505452733156150545273309776dir1156150545305305418')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '11582fcc-501a-0097-09ae-2b1958000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 25 Jun 2019 23:30:56 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156150545208709301/pre1561505452733156150545273309776dir2156150545337106882')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd07571f4-a01a-006c-55ae-2bd142000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 25 Jun 2019 23:30:56 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156150545208709301/dir156150545239504228')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3104547a-d01a-004a-4aae-2b4af6000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 25 Jun 2019 23:30:57 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156150545208709301')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '43963826-301a-002d-12ae-2bf951000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 25 Jun 2019 23:30:56 GMT',
  'Connection',
  'close' ]);

