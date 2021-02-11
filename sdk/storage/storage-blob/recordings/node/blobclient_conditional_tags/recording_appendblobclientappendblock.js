let nock = require('nock');

module.exports.hash = "af6909d96418157c8f697b24a9b1c862";

module.exports.testInfo = {"uniqueName":{"container":"container159549959803309686","blob":"blob159549959832704699","appendBlob":"appendBlob159549959892100721"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549959803309686')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 23 Jul 2020 10:19:57 GMT',
  'ETag',
  '"0x8D82EF1F2ED9DC9"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '104295ad-901e-002b-67da-60cd6c000000',
  'x-ms-client-request-id',
  '461cb520-a659-4154-9e9b-5d7ad62f999e',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Thu, 23 Jul 2020 10:19:56 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549959803309686/blob159549959832704699', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Thu, 23 Jul 2020 10:19:57 GMT',
  'ETag',
  '"0x8D82EF1F31B14DB"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '104295c5-901e-002b-75da-60cd6c000000',
  'x-ms-client-request-id',
  'edd25888-0864-4eb8-81bc-d3f8d88dcbec',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-07-23T10:19:57.3559515Z',
  'Date',
  'Thu, 23 Jul 2020 10:19:57 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549959803309686/blob159549959832704699', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><Tags><TagSet><Tag><Key>tag1</Key><Value>val1</Value></Tag><Tag><Key>tag2</Key><Value>val2</Value></Tag></TagSet></Tags>")
  .query(true)
  .reply(204, "", [
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '104295e2-901e-002b-06da-60cd6c000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '56aec9a3-857c-43c6-bad5-4fbf2bd20783',
  'Date',
  'Thu, 23 Jul 2020 10:19:57 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549959803309686/appendBlob159549959892100721')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 23 Jul 2020 10:19:57 GMT',
  'ETag',
  '"0x8D82EF1F3752C20"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '104295ec-901e-002b-0eda-60cd6c000000',
  'x-ms-client-request-id',
  'ce861e64-74b7-4d9d-8289-71265f9ff4f0',
  'x-ms-version',
  '2019-12-12',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-07-23T10:19:57.9463712Z',
  'Date',
  'Thu, 23 Jul 2020 10:19:57 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549959803309686/appendBlob159549959892100721', "Hello World")
  .query(true)
  .reply(412, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>ConditionNotMet</Code><Message>The condition specified using HTTP conditional header(s) is not met.\nRequestId:10429609-901e-002b-29da-60cd6c000000\nTime:2020-07-23T10:19:58.2418337Z</Message></Error>", [
  'Content-Length',
  '252',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '10429609-901e-002b-29da-60cd6c000000',
  'x-ms-client-request-id',
  '46f404f1-409e-4bae-9e6f-19d4659ab221',
  'x-ms-version',
  '2019-12-12',
  'x-ms-error-code',
  'ConditionNotMet',
  'Date',
  'Thu, 23 Jul 2020 10:19:58 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549959803309686/appendBlob159549959892100721', "Hello World")
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 23 Jul 2020 10:19:58 GMT',
  'ETag',
  '"0x8D82EF1F3CECE19"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '10429615-901e-002b-34da-60cd6c000000',
  'x-ms-client-request-id',
  '5ade20e6-d48c-4aa0-a9ba-52a287b91377',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-blob-append-offset',
  '0',
  'x-ms-blob-committed-block-count',
  '1',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 23 Jul 2020 10:19:58 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159549959803309686')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1042961b-901e-002b-3ada-60cd6c000000',
  'x-ms-client-request-id',
  '5fbe1bbb-0bbe-4596-912b-1f950e0ee719',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Thu, 23 Jul 2020 10:19:58 GMT'
]);
