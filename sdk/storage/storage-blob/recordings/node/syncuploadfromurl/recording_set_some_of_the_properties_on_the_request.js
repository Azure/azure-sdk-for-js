let nock = require('nock');

module.exports.hash = "ad55ff609d5c2f3d94b1b267d1de8150";

module.exports.testInfo = {"uniqueName":{"container":"container165899711841301024","blockblob":"blockblob165899711851500618","srcblob/%2+%2F":"srcblob/%2+%2F165899711851508640"},"newDate":{"expiry":"2022-07-28T08:31:58.617Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container165899711841301024')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 28 Jul 2022 08:31:58 GMT',
  'ETag',
  '"0x8DA7073A3224299"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '56907059-201e-0032-045c-a2e4ce000000',
  'x-ms-client-request-id',
  '157561a4-7483-402b-b7a3-09dc4ac4fe7f',
  'x-ms-version',
  '2021-08-06',
  'Date',
  'Thu, 28 Jul 2022 08:31:58 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container165899711841301024/srcblob/%252%2B%252F165899711851508640', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Thu, 28 Jul 2022 08:31:58 GMT',
  'ETag',
  '"0x8DA7073A333FF64"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '56907088-201e-0032-275c-a2e4ce000000',
  'x-ms-client-request-id',
  '2407d82b-134c-43d0-aa54-6137007430c1',
  'x-ms-version',
  '2021-08-06',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 28 Jul 2022 08:31:58 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container165899711841301024/blockblob165899711851500618')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 28 Jul 2022 08:31:58 GMT',
  'ETag',
  '"0x8DA7073A3467316"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '569070bc-201e-0032-4d5c-a2e4ce000000',
  'x-ms-client-request-id',
  '266072e2-f913-446e-bad2-188766f22827',
  'x-ms-version',
  '2021-08-06',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 28 Jul 2022 08:31:58 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container165899711841301024/blockblob165899711851500618')
  .reply(200, ["48656c6c6f20576f726c64"], [
  'Cache-Control',
  'blobCacheControl',
  'Content-Length',
  '11',
  'Content-Type',
  'blobContentType1',
  'Content-Encoding',
  'blobContentEncoding',
  'Content-Language',
  'blobContentLanguage1',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Thu, 28 Jul 2022 08:31:58 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DA7073A3467316"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '569070ef-201e-0032-785c-a2e4ce000000',
  'x-ms-client-request-id',
  '94f9051f-4776-41a9-9bbc-99f6b0d8a075',
  'x-ms-version',
  '2021-08-06',
  'x-ms-tag-count',
  '1',
  'x-ms-creation-time',
  'Thu, 28 Jul 2022 08:31:58 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'Content-Disposition',
  'blobContentDisposition',
  'x-ms-server-encrypted',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-tag-count,Content-Type,Content-Encoding,Content-Language,Cache-Control,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,Content-Disposition,x-ms-server-encrypted,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 28 Jul 2022 08:31:58 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container165899711841301024/blockblob165899711851500618')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<Tags><TagSet><Tag><Key>tag1</Key><Value>val1</Value></Tag></TagSet></Tags>", [
  'Content-Length',
  '117',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5690712f-201e-0032-2d5c-a2e4ce000000',
  'x-ms-version',
  '2021-08-06',
  'x-ms-client-request-id',
  '744588bf-4453-4142-804c-8a578ec44881',
  'Access-Control-Expose-Headers',
  'Content-Length,Content-Type,Date,Server,x-ms-client-request-id,x-ms-request-id,x-ms-version',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 28 Jul 2022 08:31:59 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container165899711841301024')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '56907150-201e-0032-475c-a2e4ce000000',
  'x-ms-client-request-id',
  'db30d05d-2108-4664-84e6-b3e375e033a9',
  'x-ms-version',
  '2021-08-06',
  'Date',
  'Thu, 28 Jul 2022 08:31:59 GMT'
]);
