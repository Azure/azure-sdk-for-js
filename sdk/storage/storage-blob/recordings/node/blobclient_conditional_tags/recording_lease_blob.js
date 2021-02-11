let nock = require('nock');

module.exports.hash = "f46bc42b51a37a05d26e407a2e65cfbc";

module.exports.testInfo = {"uniqueName":{"container":"container159549957567400419","blob":"blob159549957597207086"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549957567400419')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 23 Jul 2020 10:19:34 GMT',
  'ETag',
  '"0x8D82EF1E59A3852"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '10428e38-901e-002b-55da-60cd6c000000',
  'x-ms-client-request-id',
  'd3b4652e-4abe-4e70-9c56-071327ee1d41',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Thu, 23 Jul 2020 10:19:33 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549957567400419/blob159549957597207086', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Thu, 23 Jul 2020 10:19:35 GMT',
  'ETag',
  '"0x8D82EF1E5C8743B"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '10428e58-901e-002b-6ada-60cd6c000000',
  'x-ms-client-request-id',
  '16c68e12-9f8a-4241-b85b-163f674c90ed',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-07-23T10:19:35.0040635Z',
  'Date',
  'Thu, 23 Jul 2020 10:19:34 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549957567400419/blob159549957597207086', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><Tags><TagSet><Tag><Key>tag1</Key><Value>val1</Value></Tag><Tag><Key>tag2</Key><Value>val2</Value></Tag></TagSet></Tags>")
  .query(true)
  .reply(204, "", [
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '10428e80-901e-002b-02da-60cd6c000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '16a5225f-4735-48c0-8fb3-897d7d01a97d',
  'Date',
  'Thu, 23 Jul 2020 10:19:34 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549957567400419/blob159549957597207086')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 23 Jul 2020 10:19:35 GMT',
  'ETag',
  '"0x8D82EF1E5C8743B"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '10428e9b-901e-002b-15da-60cd6c000000',
  'x-ms-client-request-id',
  'ca467381-3845-4ff1-bc14-d5cb7540a160',
  'x-ms-version',
  '2019-12-12',
  'x-ms-lease-id',
  'ca761232-ed42-11ce-bacd-00aa0057b223',
  'Date',
  'Thu, 23 Jul 2020 10:19:34 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container159549957567400419/blob159549957597207086')
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Thu, 23 Jul 2020 10:19:35 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D82EF1E5C8743B"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '10428ead-901e-002b-24da-60cd6c000000',
  'x-ms-client-request-id',
  '9c7d84ce-ccd7-4bc6-8213-f6ca8ad5d1a0',
  'x-ms-version',
  '2019-12-12',
  'x-ms-tag-count',
  '2',
  'x-ms-version-id',
  '2020-07-23T10:19:35.0040635Z',
  'x-ms-is-current-version',
  'true',
  'x-ms-creation-time',
  'Thu, 23 Jul 2020 10:19:35 GMT',
  'x-ms-lease-status',
  'locked',
  'x-ms-lease-state',
  'leased',
  'x-ms-lease-duration',
  'fixed',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Hot',
  'x-ms-access-tier-inferred',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-tag-count,x-ms-version-id,x-ms-is-current-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-lease-status,x-ms-lease-state,x-ms-lease-duration,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 23 Jul 2020 10:19:34 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549957567400419/blob159549957597207086')
  .query(true)
  .reply(412, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>ConditionNotMet</Code><Message>The condition specified using HTTP conditional header(s) is not met.\nRequestId:10428ecd-901e-002b-35da-60cd6c000000\nTime:2020-07-23T10:19:36.1951273Z</Message></Error>", [
  'Content-Length',
  '252',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '10428ecd-901e-002b-35da-60cd6c000000',
  'x-ms-client-request-id',
  '8cd875cd-988b-4ee4-b588-b929a4b7f397',
  'x-ms-version',
  '2019-12-12',
  'x-ms-error-code',
  'ConditionNotMet',
  'Date',
  'Thu, 23 Jul 2020 10:19:35 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159549957567400419')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '10428eec-901e-002b-49da-60cd6c000000',
  'x-ms-client-request-id',
  '857c5abf-a7ee-4528-941c-cf95a2646fed',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Thu, 23 Jul 2020 10:19:35 GMT'
]);
