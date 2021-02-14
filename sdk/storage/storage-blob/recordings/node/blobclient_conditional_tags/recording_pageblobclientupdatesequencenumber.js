let nock = require('nock');

module.exports.hash = "e5e43f86f5d9dfe8cd09e03e79468e68";

module.exports.testInfo = {"uniqueName":{"container":"container159549962031909237","blob":"blob159549962061604884","pageBlob":"pageBlob159549962120502633"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549962031909237')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 23 Jul 2020 10:20:19 GMT',
  'ETag',
  '"0x8D82EF20036A117"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '10429c4b-901e-002b-43da-60cd6c000000',
  'x-ms-client-request-id',
  'd5e7a50f-7a26-4c53-ad6d-053633904c80',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Thu, 23 Jul 2020 10:20:19 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549962031909237/blob159549962061604884', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Thu, 23 Jul 2020 10:20:19 GMT',
  'ETag',
  '"0x8D82EF20063EFB8"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '10429c5c-901e-002b-4eda-60cd6c000000',
  'x-ms-client-request-id',
  '2af96f1e-5e92-475c-b369-257c371ebb75',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-07-23T10:20:19.6437944Z',
  'Date',
  'Thu, 23 Jul 2020 10:20:19 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549962031909237/blob159549962061604884', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><Tags><TagSet><Tag><Key>tag1</Key><Value>val1</Value></Tag><Tag><Key>tag2</Key><Value>val2</Value></Tag></TagSet></Tags>")
  .query(true)
  .reply(204, "", [
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '10429c6d-901e-002b-5bda-60cd6c000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '8a65d808-357d-4d77-9bd6-63ba54962d1a',
  'Date',
  'Thu, 23 Jul 2020 10:20:19 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549962031909237/pageBlob159549962120502633')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 23 Jul 2020 10:20:20 GMT',
  'ETag',
  '"0x8D82EF200BD91B4"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '10429c93-901e-002b-73da-60cd6c000000',
  'x-ms-client-request-id',
  'cf98739c-5c0f-4a2e-a022-5cff755f781e',
  'x-ms-version',
  '2019-12-12',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-07-23T10:20:20.2322123Z',
  'Date',
  'Thu, 23 Jul 2020 10:20:20 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549962031909237/pageBlob159549962120502633')
  .query(true)
  .reply(412, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>ConditionNotMet</Code><Message>The condition specified using HTTP conditional header(s) is not met.\nRequestId:10429ce1-901e-002b-40da-60cd6c000000\nTime:2020-07-23T10:20:20.5267090Z</Message></Error>", [
  'Content-Length',
  '252',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '10429ce1-901e-002b-40da-60cd6c000000',
  'x-ms-client-request-id',
  '4889e790-d305-4200-bdc0-0fd44ffe7b7b',
  'x-ms-version',
  '2019-12-12',
  'x-ms-error-code',
  'ConditionNotMet',
  'Date',
  'Thu, 23 Jul 2020 10:20:20 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549962031909237/pageBlob159549962120502633')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 23 Jul 2020 10:20:20 GMT',
  'ETag',
  '"0x8D82EF201175ACB"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '10429cf0-901e-002b-4fda-60cd6c000000',
  'x-ms-client-request-id',
  'b2370245-9bfa-48e5-84aa-02c28878382d',
  'x-ms-version',
  '2019-12-12',
  'x-ms-blob-sequence-number',
  '1',
  'Date',
  'Thu, 23 Jul 2020 10:20:20 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159549962031909237')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '10429d0b-901e-002b-61da-60cd6c000000',
  'x-ms-client-request-id',
  'f9a25b87-aa86-468e-8e74-95569e67b87f',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Thu, 23 Jul 2020 10:20:20 GMT'
]);
