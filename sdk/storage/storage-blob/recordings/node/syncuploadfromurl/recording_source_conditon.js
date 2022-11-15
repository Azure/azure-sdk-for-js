let nock = require('nock');

module.exports.hash = "de3052783fab72358657a6e00c132477";

module.exports.testInfo = {"uniqueName":{"container":"container165899712189508492","blockblob":"blockblob165899712199703674","srcblob/%2+%2F":"srcblob/%2+%2F165899712199704488"},"newDate":{"expiry":"2022-07-28T08:32:02.099Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container165899712189508492')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 28 Jul 2022 08:32:02 GMT',
  'ETag',
  '"0x8DA7073A535B9D4"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '569074e4-201e-0032-3f5c-a2e4ce000000',
  'x-ms-client-request-id',
  'b4205f18-4a20-4272-9679-e63b6a921a5f',
  'x-ms-version',
  '2021-08-06',
  'Date',
  'Thu, 28 Jul 2022 08:32:02 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container165899712189508492/srcblob/%252%2B%252F165899712199704488', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Thu, 28 Jul 2022 08:32:02 GMT',
  'ETag',
  '"0x8DA7073A5474BB0"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '56907505-201e-0032-595c-a2e4ce000000',
  'x-ms-client-request-id',
  'e631a213-49bb-4e8f-8a5d-4e3450a5f46f',
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
  .put('/container165899712189508492/blockblob165899712199703674')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 28 Jul 2022 08:32:02 GMT',
  'ETag',
  '"0x8DA7073A55AD0AB"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '56907526-201e-0032-745c-a2e4ce000000',
  'x-ms-client-request-id',
  'd872ca98-c8b7-471a-a3ee-c31c7af6556b',
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
  .put('/container165899712189508492/blockblob165899712199703674')
  .reply(412, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>SourceConditionNotMet</Code><Message>The source condition specified using HTTP conditional header(s) is not met.\nRequestId:56907548-201e-0032-145c-a2e4ce000000\nTime:2022-07-28T08:32:02.4966154Z</Message></Error>", [
  'Content-Length',
  '265',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '56907548-201e-0032-145c-a2e4ce000000',
  'x-ms-client-request-id',
  '12c7677d-f151-40ac-ad3e-5cda35918318',
  'x-ms-version',
  '2021-08-06',
  'x-ms-error-code',
  'SourceConditionNotMet',
  'Date',
  'Thu, 28 Jul 2022 08:32:02 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container165899712189508492')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '56907572-201e-0032-385c-a2e4ce000000',
  'x-ms-client-request-id',
  '4399e53f-3df5-4d88-b747-16524bba9564',
  'x-ms-version',
  '2021-08-06',
  'Date',
  'Thu, 28 Jul 2022 08:32:02 GMT'
]);
