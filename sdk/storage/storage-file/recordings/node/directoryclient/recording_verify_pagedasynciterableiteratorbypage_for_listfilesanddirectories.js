let nock = require('nock');

module.exports.testInfo = {"share":"share156150546981901822","dir":"dir156150547012407805","undefined":"2019-06-25T23:31:10.448Z","pre1561505470448":"pre1561505470448156150547044807124","pre1561505470448156150547044807124dir0":"pre1561505470448156150547044807124dir0156150547044802711","pre1561505470448156150547044807124dir1":"pre1561505470448156150547044807124dir1156150547076507171","pre1561505470448156150547044807124dir2":"pre1561505470448156150547044807124dir2156150547108201411","pre1561505470448156150547044807124file0":"pre1561505470448156150547044807124file0156150547140905364","pre1561505470448156150547044807124file1":"pre1561505470448156150547044807124file1156150547172307177","pre1561505470448156150547044807124file2":"pre1561505470448156150547044807124file2156150547203503662"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156150546981901822')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 25 Jun 2019 23:31:10 GMT',
  'ETag',
  '"0x8D6F9C5344A6555"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '11582fee-501a-0097-10ae-2b1958000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 25 Jun 2019 23:31:09 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156150546981901822/dir156150547012407805')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 25 Jun 2019 23:31:10 GMT',
  'ETag',
  '"0x8D6F9C53479D37B"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'afc219eb-301a-0062-29ae-2b3d49000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 25 Jun 2019 23:31:09 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156150546981901822/pre1561505470448156150547044807124dir0156150547044802711')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 25 Jun 2019 23:31:10 GMT',
  'ETag',
  '"0x8D6F9C534AB25A9"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '793e5963-201a-005f-7bae-2b886f000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 25 Jun 2019 23:31:09 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156150546981901822/pre1561505470448156150547044807124dir1156150547076507171')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 25 Jun 2019 23:31:11 GMT',
  'ETag',
  '"0x8D6F9C534DC0289"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7b7c1c1a-f01a-0019-63ae-2b56f9000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 25 Jun 2019 23:31:10 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156150546981901822/pre1561505470448156150547044807124dir2156150547108201411')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 25 Jun 2019 23:31:11 GMT',
  'ETag',
  '"0x8D6F9C5350C42FF"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '47d22a93-001a-0007-2dae-2b8c14000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 25 Jun 2019 23:31:10 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156150546981901822/pre1561505470448156150547044807124file0156150547140905364')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 25 Jun 2019 23:31:11 GMT',
  'ETag',
  '"0x8D6F9C5353D46E3"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '400bd46c-e01a-0085-23ae-2b2d44000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 25 Jun 2019 23:31:10 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156150546981901822/pre1561505470448156150547044807124file1156150547172307177')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 25 Jun 2019 23:31:11 GMT',
  'ETag',
  '"0x8D6F9C5356DFCA1"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a3a08ee6-501a-00b5-6bae-2b776e000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 25 Jun 2019 23:31:11 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156150546981901822/pre1561505470448156150547044807124file2156150547203503662')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 25 Jun 2019 23:31:12 GMT',
  'ETag',
  '"0x8D6F9C535A39557"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '89366199-c01a-00bb-5cae-2b9b65000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 25 Jun 2019 23:31:12 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156150546981901822/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.file.core.windows.net/\" ShareName=\"share156150546981901822\" DirectoryPath=\"\"><Prefix>pre1561505470448156150547044807124</Prefix><MaxResults>2</MaxResults><Entries><Directory><Name>pre1561505470448156150547044807124dir0156150547044802711</Name><Properties /></Directory><Directory><Name>pre1561505470448156150547044807124dir1156150547076507171</Name><Properties /></Directory></Entries><NextMarker>1!76!cHJlMTU2MTUwNTQ3MDQ0ODE1NjE1MDU0NzA0NDgwNzEyNGRpcjIxNTYxNTA1NDcxMDgyMDE0MTE-</NextMarker></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b9e11714-801a-0016-26ae-2bbb0f000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 25 Jun 2019 23:31:12 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156150546981901822/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.file.core.windows.net/\" ShareName=\"share156150546981901822\" DirectoryPath=\"\"><Prefix>pre1561505470448156150547044807124</Prefix><Marker>1!76!cHJlMTU2MTUwNTQ3MDQ0ODE1NjE1MDU0NzA0NDgwNzEyNGRpcjIxNTYxNTA1NDcxMDgyMDE0MTE-</Marker><MaxResults>2</MaxResults><Entries><Directory><Name>pre1561505470448156150547044807124dir2156150547108201411</Name><Properties /></Directory><File><Name>pre1561505470448156150547044807124file0156150547140905364</Name><Properties><Content-Length>1024</Content-Length></Properties></File></Entries><NextMarker>1!76!cHJlMTU2MTUwNTQ3MDQ0ODE1NjE1MDU0NzA0NDgwNzEyNGZpbGUxMTU2MTUwNTQ3MTcyMzA3MTc3</NextMarker></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '25c7d98a-e01a-00a7-78ae-2b4372000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 25 Jun 2019 23:31:13 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156150546981901822/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.file.core.windows.net/\" ShareName=\"share156150546981901822\" DirectoryPath=\"\"><Prefix>pre1561505470448156150547044807124</Prefix><Marker>1!76!cHJlMTU2MTUwNTQ3MDQ0ODE1NjE1MDU0NzA0NDgwNzEyNGZpbGUxMTU2MTUwNTQ3MTcyMzA3MTc3</Marker><MaxResults>2</MaxResults><Entries><File><Name>pre1561505470448156150547044807124file1156150547172307177</Name><Properties><Content-Length>1024</Content-Length></Properties></File><File><Name>pre1561505470448156150547044807124file2156150547203503662</Name><Properties><Content-Length>1024</Content-Length></Properties></File></Entries><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '74cc954f-b01a-001e-5aae-2ba07c000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 25 Jun 2019 23:31:13 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156150546981901822/pre1561505470448156150547044807124file0156150547140905364')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b29ba3e9-d01a-00eb-15ae-2b846d000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 25 Jun 2019 23:31:13 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156150546981901822/pre1561505470448156150547044807124file1156150547172307177')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'dd273852-701a-00ed-08ae-2b7315000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 25 Jun 2019 23:31:14 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156150546981901822/pre1561505470448156150547044807124file2156150547203503662')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '339f37eb-201a-0032-63ae-2b2241000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 25 Jun 2019 23:31:14 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156150546981901822/pre1561505470448156150547044807124dir0156150547044802711')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b54c7a02-b01a-00d2-5dae-2bc4c9000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 25 Jun 2019 23:31:15 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156150546981901822/pre1561505470448156150547044807124dir1156150547076507171')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '81a16a5e-601a-00d0-49ae-2bc633000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 25 Jun 2019 23:31:14 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156150546981901822/pre1561505470448156150547044807124dir2156150547108201411')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b64f8cb6-101a-007e-37ae-2be55e000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 25 Jun 2019 23:31:15 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156150546981901822/dir156150547012407805')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '48e32dfd-201a-0098-3bae-2bf4ae000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 25 Jun 2019 23:31:15 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156150546981901822')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c4be7a9f-d01a-0063-24ae-2b3cb4000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 25 Jun 2019 23:31:16 GMT',
  'Connection',
  'close' ]);

