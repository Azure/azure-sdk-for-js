let nock = require('nock');

module.exports.hash = "375bc4dc1f9e7b3328bf976f4b9a683e";

module.exports.testInfo = {"uniqueName":{"container":"container159549958340500307","blob":"blob159549958370003550"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549958340500307')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 23 Jul 2020 10:19:42 GMT',
  'ETag',
  '"0x8D82EF1EA35A629"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1042910c-901e-002b-70da-60cd6c000000',
  'x-ms-client-request-id',
  '04ff43bf-c781-47bc-b106-120d02503ab2',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Thu, 23 Jul 2020 10:19:42 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549958340500307/blob159549958370003550', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Thu, 23 Jul 2020 10:19:42 GMT',
  'ETag',
  '"0x8D82EF1EA631E3B"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '10429121-901e-002b-02da-60cd6c000000',
  'x-ms-client-request-id',
  'fdf6ad5b-fb1d-4a0f-999c-38b2d79c82fe',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-07-23T10:19:42.7285563Z',
  'Date',
  'Thu, 23 Jul 2020 10:19:42 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549958340500307/blob159549958370003550', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><Tags><TagSet><Tag><Key>tag1</Key><Value>val1</Value></Tag><Tag><Key>tag2</Key><Value>val2</Value></Tag></TagSet></Tags>")
  .query(true)
  .reply(204, "", [
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1042912a-901e-002b-08da-60cd6c000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '52ae03bd-c09a-4bbd-94a0-e7127da721d3',
  'Date',
  'Thu, 23 Jul 2020 10:19:43 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container159549958340500307/blob159549958370003550')
  .reply(412, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>ConditionNotMet</Code><Message>The condition specified using HTTP conditional header(s) is not met.\nRequestId:10429142-901e-002b-1ada-60cd6c000000\nTime:2020-07-23T10:19:43.3192028Z</Message></Error>", [
  'Content-Length',
  '252',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '10429142-901e-002b-1ada-60cd6c000000',
  'x-ms-client-request-id',
  '72d3ea05-f9f4-43dc-9049-2e9b154751c3',
  'x-ms-version',
  '2019-12-12',
  'x-ms-error-code',
  'ConditionNotMet',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 23 Jul 2020 10:19:43 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container159549958340500307/blob159549958370003550')
  .reply(200, "Hello World", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Thu, 23 Jul 2020 10:19:42 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D82EF1EA631E3B"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '10429150-901e-002b-25da-60cd6c000000',
  'x-ms-client-request-id',
  '944a3b23-5775-4dc1-b0f2-18f3460c300d',
  'x-ms-version',
  '2019-12-12',
  'x-ms-tag-count',
  '2',
  'x-ms-version-id',
  '2020-07-23T10:19:42.7285563Z',
  'x-ms-is-current-version',
  'true',
  'x-ms-creation-time',
  'Thu, 23 Jul 2020 10:19:42 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-tag-count,x-ms-version-id,x-ms-is-current-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 23 Jul 2020 10:19:43 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159549958340500307')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '10429166-901e-002b-36da-60cd6c000000',
  'x-ms-client-request-id',
  '06fd10b3-2cfd-4948-8dd7-21bdc99de558',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Thu, 23 Jul 2020 10:19:43 GMT'
]);
