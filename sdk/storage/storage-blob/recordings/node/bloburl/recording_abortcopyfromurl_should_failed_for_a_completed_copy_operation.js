let nock = require('nock');

module.exports.testInfo = {"container":"container155873881674604911","blob":"blob155873881714503262","copiedblob":"copiedblob155873881756009486"}

nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container155873881674604911')
  .query({"restype":"container"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 24 May 2019 23:00:16 GMT',
  'ETag',
  '"0x8D6E09B966E47F9"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7576e37a-f01e-008a-6384-12277b000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 24 May 2019 23:00:16 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container155873881674604911/blob155873881714503262', "Hello World")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Fri, 24 May 2019 23:00:17 GMT',
  'ETag',
  '"0x8D6E09B96AD4FBB"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9db107d4-c01e-0089-2384-12247c000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 24 May 2019 23:00:17 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container155873881674604911/copiedblob155873881756009486')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 24 May 2019 23:00:17 GMT',
  'ETag',
  '"0x8D6E09B96EB9C98"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5344b4af-401e-005f-7c84-126fa6000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-copy-id',
  '40e60dbc-d77b-4782-a245-927dee24c292',
  'x-ms-copy-status',
  'success',
  'Date',
  'Fri, 24 May 2019 23:00:17 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container155873881674604911/copiedblob155873881756009486')
  .query({"copyid":"40e60dbc-d77b-4782-a245-927dee24c292","comp":"copy"})
  .reply(409, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>NoPendingCopyOperation</Code><Message>There is currently no pending copy operation.\nRequestId:5ef8f960-301e-0036-1f84-12300a000000\nTime:2019-05-24T23:00:18.0931054Z</Message></Error>", [ 'Content-Length',
  '236',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5ef8f960-301e-0036-1f84-12300a000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-error-code',
  'NoPendingCopyOperation',
  'Date',
  'Fri, 24 May 2019 23:00:17 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container155873881674604911')
  .query({"restype":"container"})
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a68b6810-001e-0071-7384-12ef61000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 24 May 2019 23:00:17 GMT',
  'Connection',
  'close' ]);

