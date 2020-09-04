let nock = require('nock');

module.exports.hash = "41b2204b3ae6f55a493e032bcc7f343a";

module.exports.testInfo = {"uniqueName":{"container":"container159549714224402316","blob":"blob159549714254109237","copiedblob":"copiedblob159549714254405150","blockblob":"blockblob159549714293403414"},"newDate":{"undefined":"2020-07-23T09:39:03.234Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549714224402316')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 23 Jul 2020 09:39:01 GMT',
  'ETag',
  '"0x8D82EEC3B297E5A"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4bd0185c-a01e-0020-3ed5-603607000000',
  'x-ms-client-request-id',
  '19c84d68-e200-4167-a2c4-33c9e5017f0c',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Thu, 23 Jul 2020 09:39:00 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549714224402316/copiedblob159549714254405150')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 23 Jul 2020 09:39:01 GMT',
  'ETag',
  '"0x8D82EEC3B6519D2"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4bd01872-a01e-0020-4bd5-603607000000',
  'x-ms-client-request-id',
  '6c0c748b-7714-46db-9547-4481dc5be4a0',
  'x-ms-version',
  '2019-12-12',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-07-23T09:39:01.6566226Z',
  'Date',
  'Thu, 23 Jul 2020 09:39:01 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549714224402316/blockblob159549714293403414', "Hello World!")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  '7Qdih1MuhjZehB6Sv8UNjA==',
  'Last-Modified',
  'Thu, 23 Jul 2020 09:39:01 GMT',
  'ETag',
  '"0x8D82EEC3B931024"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4bd0188f-a01e-0020-60d5-603607000000',
  'x-ms-client-request-id',
  '9e8ac163-165e-471b-be1f-ba8118bfd2a4',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'peH8Xsgc5QI=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-07-23T09:39:01.9578404Z',
  'Date',
  'Thu, 23 Jul 2020 09:39:01 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549714224402316/copiedblob159549714254405150')
  .query(true)
  .reply(412, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<Error><Code>ConditionNotMet</Code><Message>The condition specified using HTTP conditional header(s) is not met.\nRequestId:4bd018ae-a01e-0020-78d5-603607000000\nTime:2020-07-23T09:39:02.5488925Z</Message></Error>", [
  'Content-Length',
  '253',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-error-code',
  'ConditionNotMet',
  'x-ms-request-id',
  '4bd018ae-a01e-0020-78d5-603607000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '244656bb-8436-4198-9a6f-3051c7f414c9',
  'Date',
  'Thu, 23 Jul 2020 09:39:02 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549714224402316/copiedblob159549714254405150')
  .query(true)
  .reply(201, "", [
  'Content-MD5',
  '7Qdih1MuhjZehB6Sv8UNjA==',
  'Last-Modified',
  'Thu, 23 Jul 2020 09:39:02 GMT',
  'ETag',
  '"0x8D82EEC3C1A8170"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-blob-committed-block-count',
  '1',
  'x-ms-blob-append-offset',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '4bd018dd-a01e-0020-20d5-603607000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '10e6dd9d-3766-4902-8359-30a2a64bd979',
  'Date',
  'Thu, 23 Jul 2020 09:39:02 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159549714224402316')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4bd018ee-a01e-0020-2dd5-603607000000',
  'x-ms-client-request-id',
  '39b425aa-a529-4d50-879b-79dcb3fa2cea',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Thu, 23 Jul 2020 09:39:02 GMT'
]);
