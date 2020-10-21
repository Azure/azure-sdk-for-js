let nock = require('nock');

module.exports.hash = "d3874141caa6e77c7350d052ee2ac1bd";

module.exports.testInfo = {"uniqueName":{"container":"container159549959595106239","blob":"blob159549959624602296","appendBlob":"appendBlob159549959684000378"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549959595106239')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 23 Jul 2020 10:19:54 GMT',
  'ETag',
  '"0x8D82EF1F1B02906"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '104294fd-901e-002b-5ada-60cd6c000000',
  'x-ms-client-request-id',
  '17aa24b7-1521-488a-a277-074c1a216525',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Thu, 23 Jul 2020 10:19:54 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549959595106239/blob159549959624602296', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Thu, 23 Jul 2020 10:19:55 GMT',
  'ETag',
  '"0x8D82EF1F1DD5204"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '10429523-901e-002b-75da-60cd6c000000',
  'x-ms-client-request-id',
  '48b246fc-296a-4ab1-bc1a-6acab1a8d2d9',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-07-23T10:19:55.2734724Z',
  'Date',
  'Thu, 23 Jul 2020 10:19:55 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549959595106239/blob159549959624602296', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><Tags><TagSet><Tag><Key>tag1</Key><Value>val1</Value></Tag><Tag><Key>tag2</Key><Value>val2</Value></Tag></TagSet></Tags>")
  .query(true)
  .reply(204, "", [
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '10429537-901e-002b-08da-60cd6c000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '8bb6ec3a-92c1-4fe2-b74a-0e43eddd6ddf',
  'Date',
  'Thu, 23 Jul 2020 10:19:55 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549959595106239/appendBlob159549959684000378')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 23 Jul 2020 10:19:55 GMT',
  'ETag',
  '"0x8D82EF1F23805A2"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '10429554-901e-002b-1fda-60cd6c000000',
  'x-ms-client-request-id',
  '54283d66-c2cc-4a67-815a-811ab0d19962',
  'x-ms-version',
  '2019-12-12',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-07-23T10:19:55.8688953Z',
  'Date',
  'Thu, 23 Jul 2020 10:19:55 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549959595106239/appendBlob159549959684000378')
  .reply(412, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>ConditionNotMet</Code><Message>The condition specified using HTTP conditional header(s) is not met.\nRequestId:10429574-901e-002b-39da-60cd6c000000\nTime:2020-07-23T10:19:56.1653557Z</Message></Error>", [
  'Content-Length',
  '252',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '10429574-901e-002b-39da-60cd6c000000',
  'x-ms-client-request-id',
  'e664c74b-8d8e-4f42-8756-dbbed148e58f',
  'x-ms-version',
  '2019-12-12',
  'x-ms-error-code',
  'ConditionNotMet',
  'Date',
  'Thu, 23 Jul 2020 10:19:56 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549959595106239/appendBlob159549959684000378')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 23 Jul 2020 10:19:56 GMT',
  'ETag',
  '"0x8D82EF1F2921CE7"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '10429585-901e-002b-45da-60cd6c000000',
  'x-ms-client-request-id',
  '95c722a4-9891-48eb-961c-6c328b5f257c',
  'x-ms-version',
  '2019-12-12',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-07-23T10:19:56.4593143Z',
  'Date',
  'Thu, 23 Jul 2020 10:19:56 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159549959595106239')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1042959d-901e-002b-5ada-60cd6c000000',
  'x-ms-client-request-id',
  'bdc7f0c2-9451-4fa0-b16f-f8c597e679fb',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Thu, 23 Jul 2020 10:19:56 GMT'
]);
