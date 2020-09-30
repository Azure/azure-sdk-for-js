let nock = require('nock');

module.exports.hash = "d710271f33617ac9824c94459848e065";

module.exports.testInfo = {"uniqueName":{"container":"container159550238662805196","blob":"blob159550238800905742","copiedblob":"copiedblob159550238877208762"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159550238662805196')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 23 Jul 2020 11:06:26 GMT',
  'ETag',
  '"0x8D82EF871B3C029"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '11486c03-201e-0001-19e1-60127c000000',
  'x-ms-client-request-id',
  '62183ab5-f7ea-4f02-8cd8-4eb61b83bf2e',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Thu, 23 Jul 2020 11:06:25 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159550238662805196/blob159550238800905742', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Thu, 23 Jul 2020 11:06:27 GMT',
  'ETag',
  '"0x8D82EF871E73F67"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '11486c25-201e-0001-35e1-60127c000000',
  'x-ms-client-request-id',
  '82c58ce9-a0b2-4772-97ca-6821107eea9e',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-07-23T11:06:27.0672743Z',
  'Date',
  'Thu, 23 Jul 2020 11:06:26 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159550238662805196/blob159550238800905742', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><Tags><TagSet><Tag><Key>tag1</Key><Value>val1</Value></Tag><Tag><Key>tag2</Key><Value>val2</Value></Tag></TagSet></Tags>")
  .query(true)
  .reply(204, "", [
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '11486c6b-201e-0001-66e1-60127c000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '4b6d337c-c493-4b6b-ab38-e2987907a0bd',
  'Date',
  'Thu, 23 Jul 2020 11:06:26 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159550238662805196/copiedblob159550238877208762')
  .reply(412, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>ConditionNotMet</Code><Message>The condition specified using HTTP conditional header(s) is not met.\nRequestId:11486c9e-201e-0001-12e1-60127c000000\nTime:2020-07-23T11:06:27.8645897Z</Message></Error>", [
  'Content-Length',
  '252',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '11486c9e-201e-0001-12e1-60127c000000',
  'x-ms-client-request-id',
  'e8d4bfa6-ab27-48f4-818c-3480a0ab82d6',
  'x-ms-version',
  '2019-12-12',
  'x-ms-error-code',
  'ConditionNotMet',
  'Date',
  'Thu, 23 Jul 2020 11:06:27 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159550238662805196/copiedblob159550238877208762')
  .reply(202, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 23 Jul 2020 11:06:28 GMT',
  'ETag',
  '"0x8D82EF8728E4C2B"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '11486cd0-201e-0001-3ce1-60127c000000',
  'x-ms-client-request-id',
  '22079ce9-5ca5-4ae3-8be3-1e7adb75b11a',
  'x-ms-version',
  '2019-12-12',
  'x-ms-version-id',
  '2020-07-23T11:06:28.1620523Z',
  'x-ms-copy-id',
  '158a318f-a4c4-454a-b5ea-8d431e111298',
  'x-ms-copy-status',
  'success',
  'Date',
  'Thu, 23 Jul 2020 11:06:27 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159550238662805196')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '11486cf8-201e-0001-5be1-60127c000000',
  'x-ms-client-request-id',
  '8ea55c63-f585-42f1-9856-8b311bebf74d',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Thu, 23 Jul 2020 11:06:27 GMT'
]);
