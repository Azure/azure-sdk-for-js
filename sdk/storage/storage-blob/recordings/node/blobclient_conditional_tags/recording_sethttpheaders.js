let nock = require('nock');

module.exports.hash = "ff5ef511a5508bd3cf1e1617f15d0136";

module.exports.testInfo = {"uniqueName":{"container":"container159549958876901320","blob":"blob159549958906408287"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549958876901320')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 23 Jul 2020 10:19:47 GMT',
  'ETag',
  '"0x8D82EF1ED684192"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '10429257-901e-002b-6fda-60cd6c000000',
  'x-ms-client-request-id',
  '0b302869-62f8-48fd-9f8b-2b7ec96e8e82',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Thu, 23 Jul 2020 10:19:47 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549958876901320/blob159549958906408287', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Thu, 23 Jul 2020 10:19:48 GMT',
  'ETag',
  '"0x8D82EF1ED956AF0"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1042925e-901e-002b-74da-60cd6c000000',
  'x-ms-client-request-id',
  '9561796e-19fb-4336-a921-2a8db1d4881e',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-07-23T10:19:48.0923655Z',
  'Date',
  'Thu, 23 Jul 2020 10:19:48 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549958876901320/blob159549958906408287', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><Tags><TagSet><Tag><Key>tag1</Key><Value>val1</Value></Tag><Tag><Key>tag2</Key><Value>val2</Value></Tag></TagSet></Tags>")
  .query(true)
  .reply(204, "", [
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '10429284-901e-002b-0fda-60cd6c000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '49925fdc-d443-4b7c-8558-c1b164369a34',
  'Date',
  'Thu, 23 Jul 2020 10:19:48 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549958876901320/blob159549958906408287')
  .query(true)
  .reply(412, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>ConditionNotMet</Code><Message>The condition specified using HTTP conditional header(s) is not met.\nRequestId:10429292-901e-002b-18da-60cd6c000000\nTime:2020-07-23T10:19:48.6840265Z</Message></Error>", [
  'Content-Length',
  '252',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '10429292-901e-002b-18da-60cd6c000000',
  'x-ms-client-request-id',
  'b63378c1-766b-4289-9ef0-7d59decc23f9',
  'x-ms-version',
  '2019-12-12',
  'x-ms-error-code',
  'ConditionNotMet',
  'Date',
  'Thu, 23 Jul 2020 10:19:48 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549958876901320/blob159549958906408287')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 23 Jul 2020 10:19:48 GMT',
  'ETag',
  '"0x8D82EF1EE1C8DD2"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '104292b0-901e-002b-28da-60cd6c000000',
  'x-ms-client-request-id',
  'bb797c40-1723-46c0-84b9-cdf2013e1317',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Thu, 23 Jul 2020 10:19:48 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159549958876901320')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '104292bf-901e-002b-32da-60cd6c000000',
  'x-ms-client-request-id',
  '06b805cd-b5a4-44a0-9c3a-31f4b95f5481',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Thu, 23 Jul 2020 10:19:49 GMT'
]);
