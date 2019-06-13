let nock = require('nock');

module.exports.testInfo = {"share":"share155873381608101586","dir":"dir155873381651306795","file":"file155873381688203958","copiedfile":"copiedfile155873381733000919"}

nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share155873381608101586')
  .query({"restype":"share"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 24 May 2019 21:36:56 GMT',
  'ETag',
  '"0x8D6E08FF1CDBB8E"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '247b82dc-f01a-0002-0a78-129fa2000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 24 May 2019 21:36:55 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share155873381608101586/dir155873381651306795')
  .query({"restype":"directory"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 24 May 2019 21:36:56 GMT',
  'ETag',
  '"0x8D6E08FF207EE26"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd6db30d3-001a-007a-6a78-12f715000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 24 May 2019 21:36:55 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share155873381608101586/dir155873381651306795/file155873381688203958')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 24 May 2019 21:36:56 GMT',
  'ETag',
  '"0x8D6E08FF24C56B7"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '577cc536-101a-002a-3f78-12e81d000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 24 May 2019 21:36:55 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share155873381608101586/dir155873381651306795/copiedfile155873381733000919')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 24 May 2019 21:36:57 GMT',
  'ETag',
  '"0x8D6E08FF29E7D72"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7943633b-201a-0066-1678-122f02000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-copy-id',
  '167f223c-18b8-4162-8d02-dcfa1d019105',
  'x-ms-copy-status',
  'success',
  'Date',
  'Fri, 24 May 2019 21:36:57 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share155873381608101586/dir155873381651306795/copiedfile155873381733000919')
  .query({"copyid":"167f223c-18b8-4162-8d02-dcfa1d019105","comp":"copy"})
  .reply(409, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>NoPendingCopyOperation</Code><Message>There is currently no pending copy operation.\nRequestId:8784b793-e01a-0052-6e78-1280aa000000\nTime:2019-05-24T21:36:57.9970033Z</Message></Error>", [ 'Content-Length',
  '236',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8784b793-e01a-0052-6e78-1280aa000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-error-code',
  'NoPendingCopyOperation',
  'Date',
  'Fri, 24 May 2019 21:36:57 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share155873381608101586')
  .query({"restype":"share"})
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '77636977-801a-008e-1778-12d2f9000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 24 May 2019 21:36:57 GMT',
  'Connection',
  'close' ]);

