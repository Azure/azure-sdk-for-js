let nock = require('nock');

module.exports.testInfo = {"share":"share155613727653408533","dir":"dir155613727686208904","file":"file155613727720308983","copiedfile":"copiedfile155613727754407841"}

nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share155613727653408533')
  .query({"restype":"share"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 24 Apr 2019 20:21:16 GMT',
  'ETag',
  '"0x8D6C8F267C6AB57"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b74e1340-801a-0060-10db-fad87a000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Wed, 24 Apr 2019 20:21:15 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share155613727653408533/dir155613727686208904')
  .query({"restype":"directory"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 24 Apr 2019 20:21:17 GMT',
  'ETag',
  '"0x8D6C8F267FA82CF"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f0dc4c58-301a-0014-40db-fa5e3c000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 24 Apr 2019 20:21:16 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share155613727653408533/dir155613727686208904/file155613727720308983')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 24 Apr 2019 20:21:17 GMT',
  'ETag',
  '"0x8D6C8F2682E4658"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ba4290cb-f01a-002b-5cdb-fae9e0000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 24 Apr 2019 20:21:17 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share155613727653408533/dir155613727686208904/copiedfile155613727754407841')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 24 Apr 2019 20:21:17 GMT',
  'ETag',
  '"0x8D6C8F268673AF0"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c7bbd151-701a-007e-5cdb-fa0297000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-copy-id',
  '6bd6372c-1ff5-4886-9831-ce34d4eb4ef2',
  'x-ms-copy-status',
  'success',
  'Date',
  'Wed, 24 Apr 2019 20:21:17 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share155613727653408533/dir155613727686208904/copiedfile155613727754407841')
  .query({"copyid":"6bd6372c-1ff5-4886-9831-ce34d4eb4ef2","comp":"copy"})
  .reply(409, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>NoPendingCopyOperation</Code><Message>There is currently no pending copy operation.\nRequestId:9eb621c3-d01a-005a-73db-fa9bd9000000\nTime:2019-04-24T20:21:18.4337172Z</Message></Error>", [ 'Content-Length',
  '236',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9eb621c3-d01a-005a-73db-fa9bd9000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-error-code',
  'NoPendingCopyOperation',
  'Date',
  'Wed, 24 Apr 2019 20:21:17 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share155613727653408533')
  .query({"restype":"share"})
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e7f3f7ee-801a-0049-02db-faae38000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Wed, 24 Apr 2019 20:21:18 GMT',
  'Connection',
  'close' ]);
