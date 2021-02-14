let nock = require('nock');

module.exports.hash = "77db928df7581407d3bf7deea40dc1e5";

module.exports.testInfo = {"uniqueName":{"container":"container159549959413208749","blob":"blob159549959442702744"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549959413208749')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 23 Jul 2020 10:19:53 GMT',
  'ETag',
  '"0x8D82EF1F09A8EBA"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1042946b-901e-002b-6dda-60cd6c000000',
  'x-ms-client-request-id',
  'bcb4b8e3-fee0-42da-849a-cd5f2edaca16',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Thu, 23 Jul 2020 10:19:53 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549959413208749/blob159549959442702744', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Thu, 23 Jul 2020 10:19:53 GMT',
  'ETag',
  '"0x8D82EF1F0C7DF01"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '10429479-901e-002b-78da-60cd6c000000',
  'x-ms-client-request-id',
  'dd3c89ad-febd-4dd3-8429-f7b132dc3f5e',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-07-23T10:19:53.4551809Z',
  'Date',
  'Thu, 23 Jul 2020 10:19:53 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549959413208749/blob159549959442702744', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><Tags><TagSet><Tag><Key>tag1</Key><Value>val1</Value></Tag><Tag><Key>tag2</Key><Value>val2</Value></Tag></TagSet></Tags>")
  .query(true)
  .reply(204, "", [
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '10429487-901e-002b-04da-60cd6c000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '756251c4-6dd1-407c-8a34-e7b4502b4b8f',
  'Date',
  'Thu, 23 Jul 2020 10:19:53 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549959413208749/blob159549959442702744')
  .query(true)
  .reply(412, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>ConditionNotMet</Code><Message>The condition specified using HTTP conditional header(s) is not met.\nRequestId:104294a5-901e-002b-17da-60cd6c000000\nTime:2020-07-23T10:19:54.0858761Z</Message></Error>", [
  'Content-Length',
  '252',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '104294a5-901e-002b-17da-60cd6c000000',
  'x-ms-client-request-id',
  'e3e638dd-4ad3-496c-9a7b-a312aab189f1',
  'x-ms-version',
  '2019-12-12',
  'x-ms-error-code',
  'ConditionNotMet',
  'Date',
  'Thu, 23 Jul 2020 10:19:54 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549959413208749/blob159549959442702744')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '104294ce-901e-002b-37da-60cd6c000000',
  'x-ms-client-request-id',
  'a1a8cd4b-d034-4382-a995-44b25d75c8cb',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Thu, 23 Jul 2020 10:19:54 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159549959413208749')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '104294e2-901e-002b-46da-60cd6c000000',
  'x-ms-client-request-id',
  '34ec06af-9afa-42c1-9540-086616820d1e',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Thu, 23 Jul 2020 10:19:54 GMT'
]);
