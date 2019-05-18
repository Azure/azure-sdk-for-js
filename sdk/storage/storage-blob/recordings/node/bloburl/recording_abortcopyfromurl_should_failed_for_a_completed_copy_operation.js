let nock = require('nock');

module.exports.testInfo = {"container":"container155665988536908419","blob":"blob155665988576809482","copiedblob":"copiedblob155665988616907724"}

nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container155665988536908419')
  .query({"restype":"container"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 30 Apr 2019 21:31:25 GMT',
  'ETag',
  '"0x8D6CDB332F7C8A7"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7f6351ff-e01e-0034-2f9c-ff32f0000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 30 Apr 2019 21:31:25 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container155665988536908419/blob155665988576809482', "Hello World")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Tue, 30 Apr 2019 21:31:26 GMT',
  'ETag',
  '"0x8D6CDB333358AC3"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '19e7f343-501e-004b-349c-ffacc2000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 30 Apr 2019 21:31:25 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container155665988536908419/copiedblob155665988616907724')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 30 Apr 2019 21:31:26 GMT',
  'ETag',
  '"0x8D6CDB33373626C"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bbe795c5-101e-0003-169c-ff9e5f000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-copy-id',
  '6fdbb8d2-736c-43fe-b3e9-389f85d5f668',
  'x-ms-copy-status',
  'success',
  'Date',
  'Tue, 30 Apr 2019 21:31:26 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container155665988536908419/copiedblob155665988616907724')
  .query({"copyid":"6fdbb8d2-736c-43fe-b3e9-389f85d5f668","comp":"copy"})
  .reply(409, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>NoPendingCopyOperation</Code><Message>There is currently no pending copy operation.\nRequestId:e5933f22-301e-009c-159c-ffe6e5000000\nTime:2019-04-30T21:31:27.0140735Z</Message></Error>", [ 'Content-Length',
  '236',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e5933f22-301e-009c-159c-ffe6e5000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-error-code',
  'NoPendingCopyOperation',
  'Date',
  'Tue, 30 Apr 2019 21:31:26 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container155665988536908419')
  .query({"restype":"container"})
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4d9a73eb-701e-005c-6a9c-ff6ca1000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 30 Apr 2019 21:31:27 GMT',
  'Connection',
  'close' ]);

