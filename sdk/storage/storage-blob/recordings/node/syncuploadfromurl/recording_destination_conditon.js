let nock = require('nock');

module.exports.hash = "db91269d624628f58db9f724376ca507";

module.exports.testInfo = {"uniqueName":{"container":"container165899712111402453","blockblob":"blockblob165899712121705192","srcblob/%2+%2F":"srcblob/%2+%2F165899712121706078"},"newDate":{"expiry":"2022-07-28T08:32:01.320Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container165899712111402453')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 28 Jul 2022 08:32:01 GMT',
  'ETag',
  '"0x8DA7073A4BE7850"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '569073e7-201e-0032-6d5c-a2e4ce000000',
  'x-ms-client-request-id',
  '318840b0-56a7-476b-9d4a-7567cbe86cd4',
  'x-ms-version',
  '2021-08-06',
  'Date',
  'Thu, 28 Jul 2022 08:32:01 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container165899712111402453/srcblob/%252%2B%252F165899712121706078', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Thu, 28 Jul 2022 08:32:01 GMT',
  'ETag',
  '"0x8DA7073A4D0321A"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '56907405-201e-0032-055c-a2e4ce000000',
  'x-ms-client-request-id',
  '0aac2f1e-c130-4762-bcac-b2c099ba5e49',
  'x-ms-version',
  '2021-08-06',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 28 Jul 2022 08:32:01 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container165899712111402453/blockblob165899712121705192', "hello")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'XUFAKrxLKna5cZ2REBfFkg==',
  'Last-Modified',
  'Thu, 28 Jul 2022 08:32:01 GMT',
  'ETag',
  '"0x8DA7073A4DFC016"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5690741c-201e-0032-1a5c-a2e4ce000000',
  'x-ms-client-request-id',
  'b911c462-84f5-4dbd-9ad5-b4e75c23ff04',
  'x-ms-version',
  '2021-08-06',
  'x-ms-content-crc64',
  'V0JSBnCFdzM=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 28 Jul 2022 08:32:01 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container165899712111402453/blockblob165899712121705192')
  .reply(200, "", [
  'Content-Length',
  '5',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'XUFAKrxLKna5cZ2REBfFkg==',
  'Last-Modified',
  'Thu, 28 Jul 2022 08:32:01 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DA7073A4DFC016"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '56907436-201e-0032-2e5c-a2e4ce000000',
  'x-ms-client-request-id',
  'ebfb6c97-f77c-4672-8296-598859afe3d6',
  'x-ms-version',
  '2021-08-06',
  'x-ms-creation-time',
  'Thu, 28 Jul 2022 08:32:01 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Hot',
  'x-ms-access-tier-inferred',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 28 Jul 2022 08:32:01 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container165899712111402453/blockblob165899712121705192')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 28 Jul 2022 08:32:01 GMT',
  'ETag',
  '"0x8DA7073A4FFED51"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '56907466-201e-0032-565c-a2e4ce000000',
  'x-ms-client-request-id',
  'faedba73-b94a-4a05-b575-2108184025ac',
  'x-ms-version',
  '2021-08-06',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 28 Jul 2022 08:32:01 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container165899712111402453/blockblob165899712121705192')
  .reply(412, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>TargetConditionNotMet</Code><Message>The target condition specified using HTTP conditional header(s) is not met.\nRequestId:5690747f-201e-0032-6e5c-a2e4ce000000\nTime:2022-07-28T08:32:01.9019552Z</Message></Error>", [
  'Content-Length',
  '265',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5690747f-201e-0032-6e5c-a2e4ce000000',
  'x-ms-client-request-id',
  'a0871f21-054b-481f-bd38-87086bc05d8b',
  'x-ms-version',
  '2021-08-06',
  'x-ms-error-code',
  'TargetConditionNotMet',
  'Date',
  'Thu, 28 Jul 2022 08:32:01 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container165899712111402453')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '56907492-201e-0032-7c5c-a2e4ce000000',
  'x-ms-client-request-id',
  '6d111c55-7518-4b72-b983-cf442ac6a1c0',
  'x-ms-version',
  '2021-08-06',
  'Date',
  'Thu, 28 Jul 2022 08:32:01 GMT'
]);
