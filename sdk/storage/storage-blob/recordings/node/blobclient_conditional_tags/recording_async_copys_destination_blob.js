let nock = require('nock');

module.exports.hash = "5fe03025332cf0d58174370216078a7a";

module.exports.testInfo = {"uniqueName":{"container":"container159549957897209695","blob":"blob159549957927208690","copiedblob":"copiedblob159549957987300211"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549957897209695')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 23 Jul 2020 10:19:38 GMT',
  'ETag',
  '"0x8D82EF1E791A933"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '10428f75-901e-002b-29da-60cd6c000000',
  'x-ms-client-request-id',
  '055849a5-815c-4644-88c9-4301ebe2412d',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Thu, 23 Jul 2020 10:19:37 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549957897209695/blob159549957927208690', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Thu, 23 Jul 2020 10:19:38 GMT',
  'ETag',
  '"0x8D82EF1E7C03307"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '10428f8a-901e-002b-38da-60cd6c000000',
  'x-ms-client-request-id',
  'ed9af383-a136-4e54-8c70-f48c01c4097f',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-07-23T10:19:38.3054087Z',
  'Date',
  'Thu, 23 Jul 2020 10:19:37 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549957897209695/blob159549957927208690', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><Tags><TagSet><Tag><Key>tag1</Key><Value>val1</Value></Tag><Tag><Key>tag2</Key><Value>val2</Value></Tag></TagSet></Tags>")
  .query(true)
  .reply(204, "", [
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '10428fa3-901e-002b-46da-60cd6c000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  'fef62f18-3898-40d4-bfb6-499a734d71af',
  'Date',
  'Thu, 23 Jul 2020 10:19:37 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549957897209695/copiedblob159549957987300211', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Thu, 23 Jul 2020 10:19:38 GMT',
  'ETag',
  '"0x8D82EF1E81C94B4"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '10428fb7-901e-002b-54da-60cd6c000000',
  'x-ms-client-request-id',
  '803db15a-bb24-4562-b86e-532efaad12de',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-07-23T10:19:38.9108404Z',
  'Date',
  'Thu, 23 Jul 2020 10:19:37 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549957897209695/copiedblob159549957987300211')
  .reply(412, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>ConditionNotMet</Code><Message>The condition specified using HTTP conditional header(s) is not met.\nRequestId:10428fc7-901e-002b-5fda-60cd6c000000\nTime:2020-07-23T10:19:39.2282920Z</Message></Error>", [
  'Content-Length',
  '252',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '10428fc7-901e-002b-5fda-60cd6c000000',
  'x-ms-client-request-id',
  'f14ce392-35d4-4501-a30e-78492757a03f',
  'x-ms-version',
  '2019-12-12',
  'x-ms-error-code',
  'ConditionNotMet',
  'Date',
  'Thu, 23 Jul 2020 10:19:38 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549957897209695/copiedblob159549957987300211')
  .reply(202, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 23 Jul 2020 10:19:39 GMT',
  'ETag',
  '"0x8D82EF1E87AA475"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '10428fd6-901e-002b-69da-60cd6c000000',
  'x-ms-client-request-id',
  '0c772300-2a66-48e3-bf9b-330aea52fa9e',
  'x-ms-version',
  '2019-12-12',
  'x-ms-version-id',
  '2020-07-23T10:19:39.5292828Z',
  'x-ms-copy-id',
  '129162a2-5703-4c9a-89db-6600e4ddd465',
  'x-ms-copy-status',
  'success',
  'Date',
  'Thu, 23 Jul 2020 10:19:38 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159549957897209695')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '10429022-901e-002b-32da-60cd6c000000',
  'x-ms-client-request-id',
  '43aa79cf-24a0-4f9c-b447-f172722f2b4b',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Thu, 23 Jul 2020 10:19:38 GMT'
]);
