let nock = require('nock');

module.exports.hash = "bc2750123f040d8872c1f5a6e108a804";

module.exports.testInfo = {"uniqueName":{"container":"container159549961824305041","blob":"blob159549961853806720","pageBlob":"pageBlob159549961912901868"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549961824305041')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 23 Jul 2020 10:20:17 GMT',
  'ETag',
  '"0x8D82EF1FEF97A82"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '10429bfb-901e-002b-0bda-60cd6c000000',
  'x-ms-client-request-id',
  '488a8b7a-fb10-4fc1-9a22-f8ab32524a67',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Thu, 23 Jul 2020 10:20:17 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549961824305041/blob159549961853806720', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Thu, 23 Jul 2020 10:20:17 GMT',
  'ETag',
  '"0x8D82EF1FF26F054"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '10429c04-901e-002b-12da-60cd6c000000',
  'x-ms-client-request-id',
  '5d406aab-7b25-4470-9ca5-7322d5d4ed1c',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-07-23T10:20:17.5663188Z',
  'Date',
  'Thu, 23 Jul 2020 10:20:17 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549961824305041/blob159549961853806720', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><Tags><TagSet><Tag><Key>tag1</Key><Value>val1</Value></Tag><Tag><Key>tag2</Key><Value>val2</Value></Tag></TagSet></Tags>")
  .query(true)
  .reply(204, "", [
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '10429c0a-901e-002b-16da-60cd6c000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  'ba469d3a-b254-48d2-bc49-595354601add',
  'Date',
  'Thu, 23 Jul 2020 10:20:17 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549961824305041/pageBlob159549961912901868')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 23 Jul 2020 10:20:18 GMT',
  'ETag',
  '"0x8D82EF1FF810796"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '10429c10-901e-002b-1bda-60cd6c000000',
  'x-ms-client-request-id',
  '30c56637-dbd9-4b1c-846d-ab14d95b1a60',
  'x-ms-version',
  '2019-12-12',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-07-23T10:20:18.1567382Z',
  'Date',
  'Thu, 23 Jul 2020 10:20:17 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549961824305041/pageBlob159549961912901868')
  .query(true)
  .reply(412, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>ConditionNotMet</Code><Message>The condition specified using HTTP conditional header(s) is not met.\nRequestId:10429c21-901e-002b-27da-60cd6c000000\nTime:2020-07-23T10:20:18.4532337Z</Message></Error>", [
  'Content-Length',
  '252',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '10429c21-901e-002b-27da-60cd6c000000',
  'x-ms-client-request-id',
  'ca424444-33e0-437a-8d2d-f02c0cc0a85c',
  'x-ms-version',
  '2019-12-12',
  'x-ms-error-code',
  'ConditionNotMet',
  'Date',
  'Thu, 23 Jul 2020 10:20:18 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549961824305041/pageBlob159549961912901868')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 23 Jul 2020 10:20:18 GMT',
  'ETag',
  '"0x8D82EF1FFDAF7C0"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '10429c2f-901e-002b-2fda-60cd6c000000',
  'x-ms-client-request-id',
  'c76af016-57a5-420b-9072-698b530ebe71',
  'x-ms-version',
  '2019-12-12',
  'x-ms-blob-sequence-number',
  '0',
  'Date',
  'Thu, 23 Jul 2020 10:20:18 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159549961824305041')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '10429c33-901e-002b-33da-60cd6c000000',
  'x-ms-client-request-id',
  '5e6bc45d-f7ef-4fb4-a61e-1c3dd2029990',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Thu, 23 Jul 2020 10:20:18 GMT'
]);
