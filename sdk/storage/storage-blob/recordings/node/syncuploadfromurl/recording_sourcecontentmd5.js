let nock = require('nock');

module.exports.hash = "76e9c555d4bf488f1c12595f8e98ee8d";

module.exports.testInfo = {"uniqueName":{"container":"container160635998540905788","blockblob":"blockblob160635998570703453","srcblob/%2+%2F":"srcblob/%2+%2F160635998570806714"},"newDate":{"expiry":"2020-11-26T03:06:26.007Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container160635998540905788')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 26 Nov 2020 03:06:25 GMT',
  'ETag',
  '"0x8D891B842EAA678"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'fbc81afc-c01e-0085-2fa1-c37820000000',
  'x-ms-client-request-id',
  'fe0064b5-c569-4d51-a7c7-3e354f93013e',
  'x-ms-version',
  '2020-04-08',
  'Date',
  'Thu, 26 Nov 2020 03:06:25 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container160635998540905788/srcblob%2F%252%2B%252F160635998570806714', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Thu, 26 Nov 2020 03:06:25 GMT',
  'ETag',
  '"0x8D891B84318DE46"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'fbc81b5b-c01e-0085-07a1-c37820000000',
  'x-ms-client-request-id',
  'face31c4-6ce9-4bdf-b1ee-88538e10431a',
  'x-ms-version',
  '2020-04-08',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-11-26T03:06:25.8638406Z',
  'Date',
  'Thu, 26 Nov 2020 03:06:25 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container160635998540905788/blockblob160635998570703453')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Thu, 26 Nov 2020 03:06:26 GMT',
  'ETag',
  '"0x8D891B84348342D"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'fbc81bc2-c01e-0085-65a1-c37820000000',
  'x-ms-client-request-id',
  'e41de19b-27ad-4389-b4ff-0ef7d092a98c',
  'x-ms-version',
  '2020-04-08',
  'x-ms-version-id',
  '2020-11-26T03:06:26.1750603Z',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 26 Nov 2020 03:06:26 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container160635998540905788/blockblob160635998570703453')
  .reply(400, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>Md5Mismatch</Code><Message>The MD5 value specified in the request did not match with the MD5 value calculated by the server.\nRequestId:fbc81c52-c01e-0085-66a1-c37820000000\nTime:2020-11-26T03:06:26.4825964Z</Message><UserSpecifiedMd5>XUFAKrxLKna5cZ2REBfFkg==</UserSpecifiedMd5><ServerCalculatedMd5>sQqNsWTgdUEFt6mb5y4/5Q==</ServerCalculatedMd5></Error>", [
  'Content-Length',
  '405',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'fbc81c52-c01e-0085-66a1-c37820000000',
  'x-ms-client-request-id',
  '2fff7f35-cb72-44bb-b879-5677bd5f56d4',
  'x-ms-version',
  '2020-04-08',
  'x-ms-error-code',
  'Md5Mismatch',
  'Date',
  'Thu, 26 Nov 2020 03:06:26 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container160635998540905788')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'fbc81cc8-c01e-0085-54a1-c37820000000',
  'x-ms-client-request-id',
  'c5840440-e413-4296-bb59-f83866dbe964',
  'x-ms-version',
  '2020-04-08',
  'Date',
  'Thu, 26 Nov 2020 03:06:26 GMT'
]);
