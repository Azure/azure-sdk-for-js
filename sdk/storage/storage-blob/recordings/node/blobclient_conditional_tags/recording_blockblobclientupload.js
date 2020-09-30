let nock = require('nock');

module.exports.hash = "d825a9a66c6960beb7f525f3805d14a5";

module.exports.testInfo = {"uniqueName":{"container":"container159549960010600460","blob":"blob159549960053603710"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549960010600460')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 23 Jul 2020 10:19:59 GMT',
  'ETag',
  '"0x8D82EF1F42A00E6"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '10429648-901e-002b-5bda-60cd6c000000',
  'x-ms-client-request-id',
  '2fe6bd06-0aac-4727-8fad-d27daa460498',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Thu, 23 Jul 2020 10:19:59 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549960010600460/blob159549960053603710', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Thu, 23 Jul 2020 10:19:59 GMT',
  'ETag',
  '"0x8D82EF1F46BEDFA"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1042966c-901e-002b-74da-60cd6c000000',
  'x-ms-client-request-id',
  '19030fc7-b7d7-440f-8f98-078f17b1899a',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-07-23T10:19:59.5635194Z',
  'Date',
  'Thu, 23 Jul 2020 10:19:59 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549960010600460/blob159549960053603710', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><Tags><TagSet><Tag><Key>tag1</Key><Value>val1</Value></Tag><Tag><Key>tag2</Key><Value>val2</Value></Tag></TagSet></Tags>")
  .query(true)
  .reply(204, "", [
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '10429677-901e-002b-7bda-60cd6c000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '8761ba67-1f9a-47a1-b6cc-004d7c742a1c',
  'Date',
  'Thu, 23 Jul 2020 10:19:59 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549960010600460/blob159549960053603710', "Hello World")
  .reply(412, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>ConditionNotMet</Code><Message>The condition specified using HTTP conditional header(s) is not met.\nRequestId:104296c1-901e-002b-44da-60cd6c000000\nTime:2020-07-23T10:20:00.1511922Z</Message></Error>", [
  'Content-Length',
  '252',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '104296c1-901e-002b-44da-60cd6c000000',
  'x-ms-client-request-id',
  '9dbe3e31-232e-4169-b002-af502baf10d9',
  'x-ms-version',
  '2019-12-12',
  'x-ms-error-code',
  'ConditionNotMet',
  'Date',
  'Thu, 23 Jul 2020 10:20:00 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549960010600460/blob159549960053603710', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Thu, 23 Jul 2020 10:20:00 GMT',
  'ETag',
  '"0x8D82EF1F4F24D69"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '104296e4-901e-002b-65da-60cd6c000000',
  'x-ms-client-request-id',
  'd657a2c3-f88d-467a-9f16-85912433bffc',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-07-23T10:20:00.4451449Z',
  'Date',
  'Thu, 23 Jul 2020 10:20:00 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159549960010600460')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '10429700-901e-002b-7bda-60cd6c000000',
  'x-ms-client-request-id',
  '0773f467-3b9d-4e83-9001-d14be2bcac86',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Thu, 23 Jul 2020 10:20:00 GMT'
]);
