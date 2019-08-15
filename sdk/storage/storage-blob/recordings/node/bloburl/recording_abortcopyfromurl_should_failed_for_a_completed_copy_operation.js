let nock = require('nock');

module.exports.testInfo = {"container":"container156585810004309985","blob":"blob156585810031108674","copiedblob":"copiedblob156585810058107197"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156585810004309985')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 15 Aug 2019 08:31:01 GMT',
  'ETag',
  '"0x8D7215AE80769E7"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e10d1924-d01e-00cb-3143-53aca6000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Thu, 15 Aug 2019 08:31:01 GMT',
  'Connection',
  'close'
]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156585810004309985/blob156585810031108674', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Thu, 15 Aug 2019 08:31:02 GMT',
  'ETag',
  '"0x8D7215AE830A766"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8458af8f-401e-00ce-7f43-5358d9000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 15 Aug 2019 08:31:01 GMT',
  'Connection',
  'close'
]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156585810004309985/copiedblob156585810058107197')
  .reply(202, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 15 Aug 2019 08:31:02 GMT',
  'ETag',
  '"0x8D7215AE85F12C7"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '161ff60b-c01e-0090-6143-53abda000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-copy-id',
  '671cd12f-263e-460c-87f1-09959e97510f',
  'x-ms-copy-status',
  'success',
  'Date',
  'Thu, 15 Aug 2019 08:31:02 GMT',
  'Connection',
  'close'
]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156585810004309985/copiedblob156585810058107197')
  .query(true)
  .reply(409, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>NoPendingCopyOperation</Code><Message>There is currently no pending copy operation.\nRequestId:1334e840-301e-0006-2143-53c9ee000000\nTime:2019-08-15T08:31:02.8539082Z</Message></Error>", [
  'Content-Length',
  '236',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1334e840-301e-0006-2143-53c9ee000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-error-code',
  'NoPendingCopyOperation',
  'Date',
  'Thu, 15 Aug 2019 08:31:02 GMT',
  'Connection',
  'close'
]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156585810004309985')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '08d48d9f-c01e-003a-5d43-537d35000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Thu, 15 Aug 2019 08:31:02 GMT',
  'Connection',
  'close'
]);

