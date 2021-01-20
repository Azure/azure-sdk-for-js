let nock = require('nock');

module.exports.hash = "a6ae0091cb14abc1683c91f69e9cc18b";

module.exports.testInfo = {"uniqueName":{"container":"container160635998389803031","blockblob":"blockblob160635998419408351","srcblob/%2+%2F":"srcblob/%2+%2F160635998419402523"},"newDate":{"expiry":"2020-11-26T03:06:24.493Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container160635998389803031')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 26 Nov 2020 03:06:24 GMT',
  'ETag',
  '"0x8D891B84203ED6A"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'fbc818f4-c01e-0085-53a1-c37820000000',
  'x-ms-client-request-id',
  'c4670f62-eb29-4db4-a35a-7cbe921580a9',
  'x-ms-version',
  '2020-04-08',
  'Date',
  'Thu, 26 Nov 2020 03:06:23 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container160635998389803031/srcblob%2F%252%2B%252F160635998419402523', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Thu, 26 Nov 2020 03:06:24 GMT',
  'ETag',
  '"0x8D891B84231D6B8"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'fbc8195b-c01e-0085-31a1-c37820000000',
  'x-ms-client-request-id',
  '937de977-3d64-4a71-84d0-4071e3323dae',
  'x-ms-version',
  '2020-04-08',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-11-26T03:06:24.3497656Z',
  'Date',
  'Thu, 26 Nov 2020 03:06:24 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container160635998389803031/blockblob160635998419408351')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 26 Nov 2020 03:06:24 GMT',
  'ETag',
  '"0x8D891B84260DE8D"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'fbc819ab-c01e-0085-79a1-c37820000000',
  'x-ms-client-request-id',
  '9f39e8af-5562-4aba-bd38-dd9149f71efb',
  'x-ms-version',
  '2020-04-08',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-version-id',
  '2020-11-26T03:06:24.6579853Z',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 26 Nov 2020 03:06:24 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container160635998389803031/blockblob160635998419408351')
  .reply(412, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>SourceConditionNotMet</Code><Message>The source condition specified using HTTP conditional header(s) is not met.\nRequestId:fbc81a35-c01e-0085-78a1-c37820000000\nTime:2020-11-26T03:06:24.9645259Z</Message></Error>", [
  'Content-Length',
  '265',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'fbc81a35-c01e-0085-78a1-c37820000000',
  'x-ms-client-request-id',
  'baf902ed-f9e0-46fc-ac8e-d8ae063a04c6',
  'x-ms-version',
  '2020-04-08',
  'x-ms-error-code',
  'SourceConditionNotMet',
  'Date',
  'Thu, 26 Nov 2020 03:06:24 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container160635998389803031')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'fbc81a90-c01e-0085-4ba1-c37820000000',
  'x-ms-client-request-id',
  'e08d4867-9af5-43cc-98dc-f8751059f0a7',
  'x-ms-version',
  '2020-04-08',
  'Date',
  'Thu, 26 Nov 2020 03:06:25 GMT'
]);
