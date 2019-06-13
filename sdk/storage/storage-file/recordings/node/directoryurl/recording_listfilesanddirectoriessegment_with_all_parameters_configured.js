let nock = require('nock');

module.exports.testInfo = {"share":"share156044254868504718","dir":"dir156044254902007469","date":"2019-06-13T16:15:49.266Z","pre1560442549266":"pre1560442549266156044254926606488","pre1560442549266156044254926606488dir0":"pre1560442549266156044254926606488dir0156044254926609276","pre1560442549266156044254926606488dir1":"pre1560442549266156044254926606488dir1156044254952000372","pre1560442549266156044254926606488dir2":"pre1560442549266156044254926606488dir2156044254977409684","pre1560442549266156044254926606488file0":"pre1560442549266156044254926606488file0156044255009303662","pre1560442549266156044254926606488file1":"pre1560442549266156044254926606488file1156044255041607020","pre1560442549266156044254926606488file2":"pre1560442549266156044254926606488file2156044255066609523"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156044254868504718')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 13 Jun 2019 09:15:33 GMT',
  'ETag',
  '"0x8D6EFDFB06C976B"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '407a35b0-301a-0069-1ac8-21253d000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Thu, 13 Jun 2019 09:15:33 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156044254868504718/dir156044254902007469')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 13 Jun 2019 09:15:33 GMT',
  'ETag',
  '"0x8D6EFDFB09D6720"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3ca24855-f01a-00b8-76c8-219862000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 13 Jun 2019 09:15:32 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156044254868504718/pre1560442549266156044254926606488dir0156044254926609276')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 13 Jun 2019 09:15:34 GMT',
  'ETag',
  '"0x8D6EFDFB0C51A6F"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd00ca73b-301a-0004-5dc8-218f13000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 13 Jun 2019 09:15:33 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156044254868504718/pre1560442549266156044254926606488dir1156044254952000372')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 13 Jun 2019 09:15:34 GMT',
  'ETag',
  '"0x8D6EFDFB0E998D5"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8516b400-601a-0017-19c8-21baf2000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 13 Jun 2019 09:15:33 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156044254868504718/pre1560442549266156044254926606488dir2156044254977409684')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 13 Jun 2019 09:15:34 GMT',
  'ETag',
  '"0x8D6EFDFB11C4A94"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0a382932-601a-007a-5cc8-2110dc000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 13 Jun 2019 09:15:34 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156044254868504718/pre1560442549266156044254926606488file0156044255009303662')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 13 Jun 2019 09:15:35 GMT',
  'ETag',
  '"0x8D6EFDFB14B5231"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a9cacfc9-601a-00b6-39c8-217469000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 13 Jun 2019 09:15:34 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156044254868504718/pre1560442549266156044254926606488file1156044255041607020')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 13 Jun 2019 09:15:35 GMT',
  'ETag',
  '"0x8D6EFDFB1743E2F"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '47de0e16-501a-00b5-4ec8-21776e000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 13 Jun 2019 09:15:35 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156044254868504718/pre1560442549266156044254926606488file2156044255066609523')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 13 Jun 2019 09:15:35 GMT',
  'ETag',
  '"0x8D6EFDFB198E3B0"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7122f17a-501a-0014-55c8-21b9f5000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 13 Jun 2019 09:15:34 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156044254868504718/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.file.core.windows.net/\" ShareName=\"share156044254868504718\" DirectoryPath=\"\"><Prefix>pre1560442549266156044254926606488</Prefix><MaxResults>3</MaxResults><Entries><Directory><Name>pre1560442549266156044254926606488dir0156044254926609276</Name><Properties /></Directory><Directory><Name>pre1560442549266156044254926606488dir1156044254952000372</Name><Properties /></Directory><Directory><Name>pre1560442549266156044254926606488dir2156044254977409684</Name><Properties /></Directory></Entries><NextMarker>1!76!cHJlMTU2MDQ0MjU0OTI2NjE1NjA0NDI1NDkyNjYwNjQ4OGZpbGUwMTU2MDQ0MjU1MDA5MzAzNjYy</NextMarker></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1155c3d0-f01a-003b-3cc8-2138cf000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 13 Jun 2019 09:15:35 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156044254868504718/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.file.core.windows.net/\" ShareName=\"share156044254868504718\" DirectoryPath=\"\"><Prefix>pre1560442549266156044254926606488</Prefix><Marker>1!76!cHJlMTU2MDQ0MjU0OTI2NjE1NjA0NDI1NDkyNjYwNjQ4OGZpbGUwMTU2MDQ0MjU1MDA5MzAzNjYy</Marker><MaxResults>6</MaxResults><Entries><File><Name>pre1560442549266156044254926606488file0156044255009303662</Name><Properties><Content-Length>1024</Content-Length></Properties></File><File><Name>pre1560442549266156044254926606488file1156044255041607020</Name><Properties><Content-Length>1024</Content-Length></Properties></File><File><Name>pre1560442549266156044254926606488file2156044255066609523</Name><Properties><Content-Length>1024</Content-Length></Properties></File></Entries><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '676dfc58-a01a-00ef-76c8-2171ef000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 13 Jun 2019 09:15:36 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156044254868504718/pre1560442549266156044254926606488file0156044255009303662')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9cb0505d-a01a-00c6-74c8-2107ad000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Thu, 13 Jun 2019 09:15:36 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156044254868504718/pre1560442549266156044254926606488file1156044255041607020')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a51ec62b-c01a-0011-30c8-214d8a000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Thu, 13 Jun 2019 09:15:36 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156044254868504718/pre1560442549266156044254926606488file2156044255066609523')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '63c02c29-001a-0025-36c8-21e222000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Thu, 13 Jun 2019 09:15:36 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156044254868504718/pre1560442549266156044254926606488dir0156044254926609276')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'eeee1b26-e01a-0060-41c8-213fb3000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Thu, 13 Jun 2019 09:15:37 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156044254868504718/pre1560442549266156044254926606488dir1156044254952000372')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '73c55864-b01a-0037-7cc8-21d63e000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Thu, 13 Jun 2019 09:15:37 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156044254868504718/pre1560442549266156044254926606488dir2156044254977409684')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a62a0adf-301a-000f-3fc8-219767000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Thu, 13 Jun 2019 09:15:38 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156044254868504718/dir156044254902007469')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b873bc97-f01a-009a-37c8-21f654000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Thu, 13 Jun 2019 09:15:39 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156044254868504718')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '35fbe396-d01a-0086-65c8-212e43000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Thu, 13 Jun 2019 09:15:39 GMT',
  'Connection',
  'close' ]);

