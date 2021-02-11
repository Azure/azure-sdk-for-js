let nock = require('nock');

module.exports.hash = "bb677282d9426b57c0eb1fed95361df6";

module.exports.testInfo = {"uniqueName":{"container":"container159549960705308450","blob":"blob159549960735008565","pageBlob":"pageBlob159549960793804656"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549960705308450')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 23 Jul 2020 10:20:06 GMT',
  'ETag',
  '"0x8D82EF1F84E7B62"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1042989f-901e-002b-45da-60cd6c000000',
  'x-ms-client-request-id',
  '83ed94d3-bf1e-41a1-bcaa-d704e4a84fae',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Thu, 23 Jul 2020 10:20:05 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549960705308450/blob159549960735008565', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Thu, 23 Jul 2020 10:20:06 GMT',
  'ETag',
  '"0x8D82EF1F87B7CBF"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '104298b3-901e-002b-51da-60cd6c000000',
  'x-ms-client-request-id',
  '9306ee45-fd01-4d31-a929-0ec16f2d5808',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-07-23T10:20:06.3763647Z',
  'Date',
  'Thu, 23 Jul 2020 10:20:06 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549960705308450/blob159549960735008565', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><Tags><TagSet><Tag><Key>tag1</Key><Value>val1</Value></Tag><Tag><Key>tag2</Key><Value>val2</Value></Tag></TagSet></Tags>")
  .query(true)
  .reply(204, "", [
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '104298c4-901e-002b-60da-60cd6c000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '55c8cf10-6ff1-447a-82f7-0840ec93a495',
  'Date',
  'Thu, 23 Jul 2020 10:20:06 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549960705308450/pageBlob159549960793804656')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 23 Jul 2020 10:20:06 GMT',
  'ETag',
  '"0x8D82EF1F8D56CE9"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '104298cc-901e-002b-67da-60cd6c000000',
  'x-ms-client-request-id',
  '234e4b20-c707-43e1-9f30-ca57b8bf1fc9',
  'x-ms-version',
  '2019-12-12',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-07-23T10:20:06.9657833Z',
  'Date',
  'Thu, 23 Jul 2020 10:20:06 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549960705308450/pageBlob159549960793804656')
  .reply(412, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>ConditionNotMet</Code><Message>The condition specified using HTTP conditional header(s) is not met.\nRequestId:104298f3-901e-002b-01da-60cd6c000000\nTime:2020-07-23T10:20:07.2652602Z</Message></Error>", [
  'Content-Length',
  '252',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '104298f3-901e-002b-01da-60cd6c000000',
  'x-ms-client-request-id',
  'a3ea72f2-f552-4cc8-bc2e-b0f0b00ece78',
  'x-ms-version',
  '2019-12-12',
  'x-ms-error-code',
  'ConditionNotMet',
  'Date',
  'Thu, 23 Jul 2020 10:20:07 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549960705308450/pageBlob159549960793804656')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 23 Jul 2020 10:20:07 GMT',
  'ETag',
  '"0x8D82EF1F92FF974"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1042990f-901e-002b-16da-60cd6c000000',
  'x-ms-client-request-id',
  '3071fc70-12ec-4908-848a-2cdb7409fbe1',
  'x-ms-version',
  '2019-12-12',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-07-23T10:20:07.5602052Z',
  'Date',
  'Thu, 23 Jul 2020 10:20:07 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159549960705308450')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '10429946-901e-002b-44da-60cd6c000000',
  'x-ms-client-request-id',
  'a40da87c-d52e-40bb-8440-6be5494e8d17',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Thu, 23 Jul 2020 10:20:07 GMT'
]);
