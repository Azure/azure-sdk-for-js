let nock = require('nock');

module.exports.hash = "b531d142dfad137e7fcadb3c1ed62323";

module.exports.testInfo = {"uniqueName":{"container":"container159549713955102382","blob":"blob159549714092207656","copiedblob":"copiedblob159549714125007014"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549713955102382')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 23 Jul 2020 09:38:59 GMT',
  'ETag',
  '"0x8D82EEC3A2FAEA0"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4bd017c0-a01e-0020-41d5-603607000000',
  'x-ms-client-request-id',
  '425e8a25-20a2-45f6-b97e-035cf251bcdf',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Thu, 23 Jul 2020 09:38:59 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549713955102382/blob159549714092207656', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Thu, 23 Jul 2020 09:38:59 GMT',
  'ETag',
  '"0x8D82EEC3A63806D"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4bd017d5-a01e-0020-53d5-603607000000',
  'x-ms-client-request-id',
  '6a59ca6f-133c-4677-863d-074441620436',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-07-23T09:38:59.9684205Z',
  'Date',
  'Thu, 23 Jul 2020 09:38:59 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549713955102382/copiedblob159549714125007014')
  .reply(202, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 23 Jul 2020 09:39:00 GMT',
  'ETag',
  '"0x8D82EEC3A932496"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4bd017f9-a01e-0020-71d5-603607000000',
  'x-ms-client-request-id',
  'b523d93e-eb3e-4365-929d-f0f06360d264',
  'x-ms-version',
  '2019-12-12',
  'x-ms-version-id',
  '2020-07-23T09:39:00.2816429Z',
  'x-ms-copy-id',
  'eaae31df-f6e0-45ab-b288-36bff90db02c',
  'x-ms-copy-status',
  'success',
  'Date',
  'Thu, 23 Jul 2020 09:38:59 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549713955102382/copiedblob159549714125007014')
  .query(true)
  .reply(409, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>NoPendingCopyOperation</Code><Message>There is currently no pending copy operation.\nRequestId:4bd01821-a01e-0020-16d5-603607000000\nTime:2020-07-23T09:39:00.6105137Z</Message></Error>", [
  'Content-Length',
  '236',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4bd01821-a01e-0020-16d5-603607000000',
  'x-ms-client-request-id',
  '1c590be5-5dde-40fa-84f1-ac9419d3fa4c',
  'x-ms-version',
  '2019-12-12',
  'x-ms-error-code',
  'NoPendingCopyOperation',
  'Date',
  'Thu, 23 Jul 2020 09:39:00 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159549713955102382')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4bd0183f-a01e-0020-2cd5-603607000000',
  'x-ms-client-request-id',
  'fa9e4e71-aef2-4d98-af61-38a4f91cf42b',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Thu, 23 Jul 2020 09:39:00 GMT'
]);
