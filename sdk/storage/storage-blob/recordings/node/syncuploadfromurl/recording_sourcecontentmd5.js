let nock = require('nock');

module.exports.hash = "ba3a945539e4dfd7af88f4969fe5c013";

module.exports.testInfo = {"uniqueName":{"container":"container165899712243209190","blockblob":"blockblob165899712253404874","srcblob/%2+%2F":"srcblob/%2+%2F165899712253401632"},"newDate":{"expiry":"2022-07-28T08:32:02.637Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container165899712243209190')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 28 Jul 2022 08:32:02 GMT',
  'ETag',
  '"0x8DA7073A5879E52"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5690759b-201e-0032-5d5c-a2e4ce000000',
  'x-ms-client-request-id',
  '0db57668-f16c-42d0-abde-79bff056e811',
  'x-ms-version',
  '2021-08-06',
  'Date',
  'Thu, 28 Jul 2022 08:32:02 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container165899712243209190/srcblob/%252%2B%252F165899712253401632', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Thu, 28 Jul 2022 08:32:02 GMT',
  'ETag',
  '"0x8DA7073A5992FB2"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '569075bb-201e-0032-795c-a2e4ce000000',
  'x-ms-client-request-id',
  '5f1bc27f-8898-4c12-a077-54b747f222f4',
  'x-ms-version',
  '2021-08-06',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 28 Jul 2022 08:32:02 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container165899712243209190/blockblob165899712253404874')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Thu, 28 Jul 2022 08:32:02 GMT',
  'ETag',
  '"0x8DA7073A5AA440E"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '569075de-201e-0032-175c-a2e4ce000000',
  'x-ms-client-request-id',
  'b4e82d1a-7756-4053-b4b7-eec93aa5d468',
  'x-ms-version',
  '2021-08-06',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 28 Jul 2022 08:32:02 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container165899712243209190/blockblob165899712253404874')
  .reply(400, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>Md5Mismatch</Code><Message>The MD5 value specified in the request did not match with the MD5 value calculated by the server.\nRequestId:56907606-201e-0032-3c5c-a2e4ce000000\nTime:2022-07-28T08:32:03.0532983Z</Message><UserSpecifiedMd5>XUFAKrxLKna5cZ2REBfFkg==</UserSpecifiedMd5><ServerCalculatedMd5>sQqNsWTgdUEFt6mb5y4/5Q==</ServerCalculatedMd5></Error>", [
  'Content-Length',
  '405',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '56907606-201e-0032-3c5c-a2e4ce000000',
  'x-ms-client-request-id',
  '32d6cdf8-0f62-4477-b578-d0e005939990',
  'x-ms-version',
  '2021-08-06',
  'x-ms-error-code',
  'Md5Mismatch',
  'Date',
  'Thu, 28 Jul 2022 08:32:02 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container165899712243209190')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '56907645-201e-0032-765c-a2e4ce000000',
  'x-ms-client-request-id',
  'e1e091e3-5f16-471a-ab5f-bf4787f01eb6',
  'x-ms-version',
  '2021-08-06',
  'Date',
  'Thu, 28 Jul 2022 08:32:03 GMT'
]);
