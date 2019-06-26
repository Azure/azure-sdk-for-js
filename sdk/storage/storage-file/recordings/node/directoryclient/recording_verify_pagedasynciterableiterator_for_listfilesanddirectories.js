let nock = require('nock');

module.exports.testInfo = {"share":"share156150545780208675","dir":"dir156150545812209235","undefined":"2019-06-25T23:30:58.704Z","pre1561505458704":"pre1561505458704156150545870405983","pre1561505458704156150545870405983dir0":"pre1561505458704156150545870405983dir0156150545870400236","pre1561505458704156150545870405983dir1":"pre1561505458704156150545870405983dir1156150545901902682","pre1561505458704156150545870405983dir2":"pre1561505458704156150545870405983dir2156150545969707001","pre1561505458704156150545870405983file0":"pre1561505458704156150545870405983file0156150546000802855","pre1561505458704156150545870405983file1":"pre1561505458704156150545870405983file1156150546032106638","pre1561505458704156150545870405983file2":"pre1561505458704156150545870405983file2156150546063607333"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156150545780208675')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 25 Jun 2019 23:30:58 GMT',
  'ETag',
  '"0x8D6F9C52D20EC4C"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd45a8b77-a01a-004e-50ae-2bbf74000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 25 Jun 2019 23:30:57 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156150545780208675/dir156150545812209235')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 25 Jun 2019 23:30:58 GMT',
  'ETag',
  '"0x8D6F9C52D755A9D"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'be5dc710-801a-0059-22ae-2b7f17000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 25 Jun 2019 23:30:58 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156150545780208675/pre1561505458704156150545870405983dir0156150545870400236')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 25 Jun 2019 23:30:58 GMT',
  'ETag',
  '"0x8D6F9C52DAAF34F"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4b7d1ea2-901a-00ce-23ae-2b1cde000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 25 Jun 2019 23:30:58 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156150545780208675/pre1561505458704156150545870405983dir1156150545901902682')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 25 Jun 2019 23:30:59 GMT',
  'ETag',
  '"0x8D6F9C52E1141CA"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2db2160e-901a-006f-5cae-2bd245000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 25 Jun 2019 23:30:58 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156150545780208675/pre1561505458704156150545870405983dir2156150545969707001')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 25 Jun 2019 23:30:59 GMT',
  'ETag',
  '"0x8D6F9C52E41A96E"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4b7d1ea3-901a-00ce-24ae-2b1cde000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 25 Jun 2019 23:30:59 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156150545780208675/pre1561505458704156150545870405983file0156150546000802855')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 25 Jun 2019 23:31:00 GMT',
  'ETag',
  '"0x8D6F9C52E72864F"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'cde7dfd8-801a-00d1-28ae-2bc7ce000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 25 Jun 2019 23:30:59 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156150545780208675/pre1561505458704156150545870405983file1156150546032106638')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 25 Jun 2019 23:31:00 GMT',
  'ETag',
  '"0x8D6F9C52EA1DC52"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6cebbff4-101a-0075-7aae-2bfd2a000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 25 Jun 2019 23:31:00 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156150545780208675/pre1561505458704156150545870405983file2156150546063607333')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 25 Jun 2019 23:31:01 GMT',
  'ETag',
  '"0x8D6F9C52EEA642E"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4a30767e-601a-003e-7dae-2bccb0000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 25 Jun 2019 23:31:00 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156150545780208675/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.file.core.windows.net/\" ShareName=\"share156150545780208675\" DirectoryPath=\"\"><Prefix>pre1561505458704156150545870405983</Prefix><Entries><Directory><Name>pre1561505458704156150545870405983dir0156150545870400236</Name><Properties /></Directory><Directory><Name>pre1561505458704156150545870405983dir1156150545901902682</Name><Properties /></Directory><Directory><Name>pre1561505458704156150545870405983dir2156150545969707001</Name><Properties /></Directory><File><Name>pre1561505458704156150545870405983file0156150546000802855</Name><Properties><Content-Length>1024</Content-Length></Properties></File><File><Name>pre1561505458704156150545870405983file1156150546032106638</Name><Properties><Content-Length>1024</Content-Length></Properties></File><File><Name>pre1561505458704156150545870405983file2156150546063607333</Name><Properties><Content-Length>1024</Content-Length></Properties></File></Entries><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a116cf0a-a01a-0023-02ae-2b155a000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 25 Jun 2019 23:31:00 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156150545780208675/pre1561505458704156150545870405983file0156150546000802855')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6b2e3de5-001a-000c-0cae-2b9460000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 25 Jun 2019 23:31:01 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156150545780208675/pre1561505458704156150545870405983file1156150546032106638')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ac750fce-f01a-009a-64ae-2bf654000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 25 Jun 2019 23:31:01 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156150545780208675/pre1561505458704156150545870405983file2156150546063607333')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f9610f5e-101a-00df-4aae-2b2bc5000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 25 Jun 2019 23:31:01 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156150545780208675/pre1561505458704156150545870405983dir0156150545870400236')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bc882602-d01a-00a4-75ae-2b4075000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 25 Jun 2019 23:31:02 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156150545780208675/pre1561505458704156150545870405983dir1156150545901902682')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ceccc851-001a-00e2-27ae-2b9ee3000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 25 Jun 2019 23:31:01 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156150545780208675/pre1561505458704156150545870405983dir2156150545969707001')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '35a002c5-401a-006d-6bae-2bd0bf000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 25 Jun 2019 23:31:03 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156150545780208675/dir156150545812209235')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c39058e0-c01a-0077-7dae-2bffd0000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 25 Jun 2019 23:31:02 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156150545780208675')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '14a51204-601a-00bd-23ae-2b6c1d000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 25 Jun 2019 23:31:03 GMT',
  'Connection',
  'close' ]);

