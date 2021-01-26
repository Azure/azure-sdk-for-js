let nock = require('nock');

module.exports.hash = "a151dc540fccf1be59a1aaf950713baa";

module.exports.testInfo = {"uniqueName":{"container":"container160507563932802541","blob":"blob160507563961803306","copiedblob":"copiedblob160507563962009861","blockblob":"blockblob160507563992301071"},"newDate":{"expiry":"2020-11-11T06:20:40.216Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container160507563932802541')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Nov 2020 06:20:39 GMT',
  'ETag',
  '"0x8D88609E8FF5ADB"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '22b56b7b-b01e-006b-1bf2-b7d209000000',
  'x-ms-client-request-id',
  '4871a3b0-155e-491f-90a2-efaffa05540f',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Wed, 11 Nov 2020 06:20:38 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container160507563932802541/copiedblob160507563962009861')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Nov 2020 06:20:39 GMT',
  'ETag',
  '"0x8D88609E92DD4F2"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '22b56bc0-b01e-006b-58f2-b7d209000000',
  'x-ms-client-request-id',
  '06166d88-f218-459e-9d5b-e4607c778061',
  'x-ms-version',
  '2020-02-10',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-11-11T06:20:39.7847794Z',
  'Date',
  'Wed, 11 Nov 2020 06:20:39 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container160507563932802541/blockblob160507563992301071', "Hello World!")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  '7Qdih1MuhjZehB6Sv8UNjA==',
  'Last-Modified',
  'Wed, 11 Nov 2020 06:20:40 GMT',
  'ETag',
  '"0x8D88609E95AB935"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '22b56c28-b01e-006b-38f2-b7d209000000',
  'x-ms-client-request-id',
  'bdc62dd3-6c88-407c-916f-9d849836cde0',
  'x-ms-version',
  '2020-02-10',
  'x-ms-content-crc64',
  'peH8Xsgc5QI=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-11-11T06:20:40.0789813Z',
  'Date',
  'Wed, 11 Nov 2020 06:20:39 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container160507563932802541/copiedblob160507563962009861')
  .query(true)
  .reply(412, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<Error><Code>ConditionNotMet</Code><Message>The condition specified using HTTP conditional header(s) is not met.\nRequestId:22b56c67-b01e-006b-70f2-b7d209000000\nTime:2020-11-11T06:20:40.3728229Z</Message></Error>", [
  'Content-Length',
  '253',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-error-code',
  'ConditionNotMet',
  'x-ms-request-id',
  '22b56c67-b01e-006b-70f2-b7d209000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  '353fd57a-58fa-49c8-af1d-e2c492369651',
  'Date',
  'Wed, 11 Nov 2020 06:20:39 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container160507563932802541/copiedblob160507563962009861')
  .query(true)
  .reply(201, "", [
  'Content-MD5',
  '7Qdih1MuhjZehB6Sv8UNjA==',
  'Last-Modified',
  'Wed, 11 Nov 2020 06:20:40 GMT',
  'ETag',
  '"0x8D88609E9B56C4A"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-blob-committed-block-count',
  '1',
  'x-ms-blob-append-offset',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '22b56cb2-b01e-006b-37f2-b7d209000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  '24d35029-faa8-42dd-af04-0d5cd758ac19',
  'Date',
  'Wed, 11 Nov 2020 06:20:40 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container160507563932802541')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '22b56d15-b01e-006b-13f2-b7d209000000',
  'x-ms-client-request-id',
  '6099b7eb-300e-4121-80ba-12463d943271',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Wed, 11 Nov 2020 06:20:40 GMT'
]);
