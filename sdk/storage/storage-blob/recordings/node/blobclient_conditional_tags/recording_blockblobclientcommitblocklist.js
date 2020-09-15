let nock = require('nock');

module.exports.hash = "2887a8073cd27728d8b96adc0ff59fe6";

module.exports.testInfo = {"uniqueName":{"container":"container159549960202200616","blob":"blob159549960231600468"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549960202200616')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 23 Jul 2020 10:20:01 GMT',
  'ETag',
  '"0x8D82EF1F54E43E9"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1042971d-901e-002b-14da-60cd6c000000',
  'x-ms-client-request-id',
  '176fa05c-078b-47d1-aeba-727553b43658',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Thu, 23 Jul 2020 10:20:00 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549960202200616/blob159549960231600468', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Thu, 23 Jul 2020 10:20:01 GMT',
  'ETag',
  '"0x8D82EF1F57BBADE"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1042973d-901e-002b-2bda-60cd6c000000',
  'x-ms-client-request-id',
  '7b698e91-56b1-43f9-97f4-2be948b24258',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-07-23T10:20:01.3447902Z',
  'Date',
  'Thu, 23 Jul 2020 10:20:01 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549960202200616/blob159549960231600468', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><Tags><TagSet><Tag><Key>tag1</Key><Value>val1</Value></Tag><Tag><Key>tag2</Key><Value>val2</Value></Tag></TagSet></Tags>")
  .query(true)
  .reply(204, "", [
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1042974d-901e-002b-3ada-60cd6c000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  'd73046a1-db85-496b-9d6a-818cf7e5bc58',
  'Date',
  'Thu, 23 Jul 2020 10:20:01 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549960202200616/blob159549960231600468', "HelloWorld")
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '10429762-901e-002b-4ada-60cd6c000000',
  'x-ms-client-request-id',
  '2daafa1e-c950-4098-8b38-a90b59080e08',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  '8R2aIe9T07E=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 23 Jul 2020 10:20:01 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549960202200616/blob159549960231600468', "HelloWorld")
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1042977c-901e-002b-61da-60cd6c000000',
  'x-ms-client-request-id',
  '46ca3e4e-3f45-4b41-beb9-a3733ccb7ede',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  '8R2aIe9T07E=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 23 Jul 2020 10:20:02 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549960202200616/blob159549960231600468', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><BlockList><Latest>MQ==</Latest><Latest>Mg==</Latest></BlockList>")
  .query(true)
  .reply(412, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>ConditionNotMet</Code><Message>The condition specified using HTTP conditional header(s) is not met.\nRequestId:10429794-901e-002b-75da-60cd6c000000\nTime:2020-07-23T10:20:02.5238869Z</Message></Error>", [
  'Content-Length',
  '252',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '10429794-901e-002b-75da-60cd6c000000',
  'x-ms-client-request-id',
  '8c7dc771-1f6c-46df-8f21-72fe2e731038',
  'x-ms-version',
  '2019-12-12',
  'x-ms-error-code',
  'ConditionNotMet',
  'Date',
  'Thu, 23 Jul 2020 10:20:02 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549960202200616/blob159549960231600468', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><BlockList><Latest>MQ==</Latest><Latest>Mg==</Latest></BlockList>")
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 23 Jul 2020 10:20:02 GMT',
  'ETag',
  '"0x8D82EF1F65CCDFB"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '104297a5-901e-002b-05da-60cd6c000000',
  'x-ms-client-request-id',
  '981b73c3-6394-47de-a6b9-b61200e11692',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'GFi/o1BSQtU=',
  'x-ms-version-id',
  '2020-07-23T10:20:02.8218398Z',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 23 Jul 2020 10:20:02 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159549960202200616')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '104297b0-901e-002b-0fda-60cd6c000000',
  'x-ms-client-request-id',
  '3b4314f9-4d86-4f78-88bd-c61684e6239e',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Thu, 23 Jul 2020 10:20:03 GMT'
]);
