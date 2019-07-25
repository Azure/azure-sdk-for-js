let nock = require('nock');

module.exports.testInfo = {"share":"share156404672818909099","dir":"dir156404672845309973","file":"file156404672872306699","copiedfile":"copiedfile156404672900504474"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156404672818909099')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 25 Jul 2019 09:21:50 GMT',
  'ETag',
  '"0x8D710E1864179E9"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'cb78839f-701a-0001-41ca-423f6b000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Thu, 25 Jul 2019 09:21:49 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156404672818909099/dir156404672845309973')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 25 Jul 2019 09:21:50 GMT',
  'ETag',
  '"0x8D710E1866A928B"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6447809d-a01a-00a2-6dca-42f30a000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 25 Jul 2019 09:21:50 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156404672818909099/dir156404672845309973/file156404672872306699')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 25 Jul 2019 09:21:50 GMT',
  'ETag',
  '"0x8D710E186952CB1"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b48ad21b-001a-0101-11ca-42793e000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 25 Jul 2019 09:21:50 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156404672818909099/dir156404672845309973/copiedfile156404672900504474')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 25 Jul 2019 09:21:51 GMT',
  'ETag',
  '"0x8D710E186C51F02"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'db625816-301a-00ac-35ca-421f01000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-copy-id',
  'beaeb574-3561-426d-9474-e26a8ce6ab32',
  'x-ms-copy-status',
  'success',
  'Date',
  'Thu, 25 Jul 2019 09:21:50 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156404672818909099/dir156404672845309973/copiedfile156404672900504474')
  .query(true)
  .reply(409, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>NoPendingCopyOperation</Code><Message>There is currently no pending copy operation.\nRequestId:ac9d136d-201a-0012-20ca-420a8a000000\nTime:2019-07-25T09:21:54.6514167Z</Message></Error>", [ 'Content-Length',
  '236',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ac9d136d-201a-0012-20ca-420a8a000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-error-code',
  'NoPendingCopyOperation',
  'Date',
  'Thu, 25 Jul 2019 09:21:54 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156404672818909099')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3eecb38d-501a-001d-74ca-42e77c000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Thu, 25 Jul 2019 09:21:54 GMT',
  'Connection',
  'close' ]);

