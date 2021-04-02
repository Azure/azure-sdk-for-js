let nock = require('nock');

module.exports.hash = "76c13bf98f27faa124ff283cf322bb74";

module.exports.testInfo = {"uniqueName":{"container":"container160635998179704218","blockblob":"blockblob160635998209308131","srcblob/%2+%2F":"srcblob/%2+%2F160635998209304700"},"newDate":{"expiry":"2020-11-26T03:06:22.389Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container160635998179704218')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 26 Nov 2020 03:06:21 GMT',
  'ETag',
  '"0x8D891B840C36B64"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'fbc8159e-c01e-0085-38a1-c37820000000',
  'x-ms-client-request-id',
  'f69e1c09-cd10-4cf2-a296-4d7991749b69',
  'x-ms-version',
  '2020-04-08',
  'Date',
  'Thu, 26 Nov 2020 03:06:21 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container160635998179704218/srcblob%2F%252%2B%252F160635998209304700', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Thu, 26 Nov 2020 03:06:22 GMT',
  'ETag',
  '"0x8D891B840F0B828"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'fbc8160c-c01e-0085-21a1-c37820000000',
  'x-ms-client-request-id',
  '764c0849-d31d-48c8-8af7-edbe4ddaefc6',
  'x-ms-version',
  '2020-04-08',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-11-26T03:06:22.2452776Z',
  'Date',
  'Thu, 26 Nov 2020 03:06:22 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container160635998179704218/blockblob160635998209308131', "hello")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'XUFAKrxLKna5cZ2REBfFkg==',
  'Last-Modified',
  'Thu, 26 Nov 2020 03:06:22 GMT',
  'ETag',
  '"0x8D891B8411F23A5"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'fbc816ac-c01e-0085-34a1-c37820000000',
  'x-ms-client-request-id',
  '18bf191f-41e5-43bb-b403-5b82be92dda5',
  'x-ms-version',
  '2020-04-08',
  'x-ms-content-crc64',
  'V0JSBnCFdzM=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-11-26T03:06:22.5494949Z',
  'Date',
  'Thu, 26 Nov 2020 03:06:22 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container160635998179704218/blockblob160635998209308131')
  .reply(200, "", [
  'Content-Length',
  '5',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'XUFAKrxLKna5cZ2REBfFkg==',
  'Last-Modified',
  'Thu, 26 Nov 2020 03:06:22 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D891B8411F23A5"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'fbc81710-c01e-0085-0ea1-c37820000000',
  'x-ms-client-request-id',
  '5643664b-2064-4b44-a81a-d744ce70283d',
  'x-ms-version',
  '2020-04-08',
  'x-ms-version-id',
  '2020-11-26T03:06:22.5494949Z',
  'x-ms-is-current-version',
  'true',
  'x-ms-creation-time',
  'Thu, 26 Nov 2020 03:06:22 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Hot',
  'x-ms-access-tier-inferred',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-version-id,x-ms-is-current-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 26 Nov 2020 03:06:22 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container160635998179704218/blockblob160635998209308131')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 26 Nov 2020 03:06:23 GMT',
  'ETag',
  '"0x8D891B8417BD34F"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'fbc81794-c01e-0085-0aa1-c37820000000',
  'x-ms-client-request-id',
  'b7e701ca-c3ca-4bdf-8a42-e44a250b6e0d',
  'x-ms-version',
  '2020-04-08',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-version-id',
  '2020-11-26T03:06:23.1579231Z',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 26 Nov 2020 03:06:23 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container160635998179704218/blockblob160635998209308131')
  .reply(412, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>TargetConditionNotMet</Code><Message>The target condition specified using HTTP conditional header(s) is not met.\nRequestId:fbc81809-c01e-0085-6fa1-c37820000000\nTime:2020-11-26T03:06:23.4554624Z</Message></Error>", [
  'Content-Length',
  '265',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'fbc81809-c01e-0085-6fa1-c37820000000',
  'x-ms-client-request-id',
  '85107502-cb2e-45f9-b111-ee4c5bd6b991',
  'x-ms-version',
  '2020-04-08',
  'x-ms-error-code',
  'TargetConditionNotMet',
  'Date',
  'Thu, 26 Nov 2020 03:06:23 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container160635998179704218')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'fbc8188f-c01e-0085-6ea1-c37820000000',
  'x-ms-client-request-id',
  '8da77593-f164-4c35-a709-baac252d8b7f',
  'x-ms-version',
  '2020-04-08',
  'Date',
  'Thu, 26 Nov 2020 03:06:23 GMT'
]);
