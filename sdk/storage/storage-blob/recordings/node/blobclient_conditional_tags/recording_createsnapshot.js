let nock = require('nock');

module.exports.hash = "90b54e2499e611333f547b214a771691";

module.exports.testInfo = {"uniqueName":{"container":"container159549959235000593","blob":"blob159549959264706984"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549959235000593')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 23 Jul 2020 10:19:51 GMT',
  'ETag',
  '"0x8D82EF1EF8A9ABB"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '104293c5-901e-002b-7fda-60cd6c000000',
  'x-ms-client-request-id',
  'f980b1e2-f597-4eaa-b9a8-4148843dc93a',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Thu, 23 Jul 2020 10:19:51 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549959235000593/blob159549959264706984', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Thu, 23 Jul 2020 10:19:51 GMT',
  'ETag',
  '"0x8D82EF1EFB83971"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '104293d3-901e-002b-06da-60cd6c000000',
  'x-ms-client-request-id',
  '55365f78-5e29-4b6a-b058-d0e9dd7ac741',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-07-23T10:19:51.6749169Z',
  'Date',
  'Thu, 23 Jul 2020 10:19:51 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549959235000593/blob159549959264706984', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><Tags><TagSet><Tag><Key>tag1</Key><Value>val1</Value></Tag><Tag><Key>tag2</Key><Value>val2</Value></Tag></TagSet></Tags>")
  .query(true)
  .reply(204, "", [
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '104293e2-901e-002b-14da-60cd6c000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '70273cdf-6ed6-4a13-9785-bf63dcb32090',
  'Date',
  'Thu, 23 Jul 2020 10:19:51 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549959235000593/blob159549959264706984')
  .query(true)
  .reply(412, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>ConditionNotMet</Code><Message>The condition specified using HTTP conditional header(s) is not met.\nRequestId:10429408-901e-002b-2eda-60cd6c000000\nTime:2020-07-23T10:19:52.2655745Z</Message></Error>", [
  'Content-Length',
  '252',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '10429408-901e-002b-2eda-60cd6c000000',
  'x-ms-client-request-id',
  '9ad05ead-c70b-45be-a5e3-4049ea65d1c0',
  'x-ms-version',
  '2019-12-12',
  'x-ms-error-code',
  'ConditionNotMet',
  'Date',
  'Thu, 23 Jul 2020 10:19:52 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549959235000593/blob159549959264706984')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 23 Jul 2020 10:19:51 GMT',
  'ETag',
  '"0x8D82EF1EFB83971"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '10429424-901e-002b-3dda-60cd6c000000',
  'x-ms-client-request-id',
  'e7337f2e-bc68-4631-acef-5e149bc21a78',
  'x-ms-version',
  '2019-12-12',
  'x-ms-version-id',
  '2020-07-23T10:19:52.5615445Z',
  'x-ms-snapshot',
  '2020-07-23T10:19:52.5605445Z',
  'x-ms-request-server-encrypted',
  'false',
  'Date',
  'Thu, 23 Jul 2020 10:19:52 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159549959235000593')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1042943f-901e-002b-4eda-60cd6c000000',
  'x-ms-client-request-id',
  'd4161386-e415-4563-b9ae-7bd784711ac6',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Thu, 23 Jul 2020 10:19:52 GMT'
]);
