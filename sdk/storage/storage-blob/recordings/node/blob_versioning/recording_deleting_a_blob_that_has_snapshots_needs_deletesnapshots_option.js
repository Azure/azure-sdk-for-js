let nock = require('nock');

module.exports.hash = "db1d48bb3945806dc2f8f8b03ffa17a5";

module.exports.testInfo = {"uniqueName":{"container":"container158459900716901393","blob":"blob158459900741801925"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158459900716901393')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 19 Mar 2020 06:23:27 GMT',
  'ETag',
  '"0x8D7CBCE091E28E7"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '775e48a8-b01e-0088-33b6-fd3fcb000000',
  'x-ms-client-request-id',
  '32d1dc49-1081-42ce-ba6a-d845d7bf3b07',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Thu, 19 Mar 2020 06:23:27 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158459900716901393/blob158459900741801925', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Thu, 19 Mar 2020 06:23:27 GMT',
  'ETag',
  '"0x8D7CBCE0945110B"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '775e4906-b01e-0088-03b6-fd3fcb000000',
  'x-ms-client-request-id',
  '11e5478c-a4eb-4fcc-9f4c-969ae0b21b8b',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-03-19T06:23:27.5437323Z',
  'Date',
  'Thu, 19 Mar 2020 06:23:27 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158459900716901393/blob158459900741801925')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Thu, 19 Mar 2020 06:23:27 GMT',
  'ETag',
  '"0x8D7CBCE096A04E8"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '775e494c-b01e-0088-3cb6-fd3fcb000000',
  'x-ms-client-request-id',
  'd5666cfb-1d22-4a2e-83a8-b3a12aafc77d',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-03-19T06:23:27.7869048Z',
  'Date',
  'Thu, 19 Mar 2020 06:23:27 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158459900716901393/blob158459900741801925')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 19 Mar 2020 06:23:27 GMT',
  'ETag',
  '"0x8D7CBCE096A04E8"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '775e4995-b01e-0088-7db6-fd3fcb000000',
  'x-ms-client-request-id',
  'd33a297c-129c-4de1-8322-a932e0497a39',
  'x-ms-version',
  '2019-12-12',
  'x-ms-version-id',
  '2020-03-19T06:23:28.0310773Z',
  'x-ms-snapshot',
  '2020-03-19T06:23:28.0300773Z',
  'x-ms-request-server-encrypted',
  'false',
  'Date',
  'Thu, 19 Mar 2020 06:23:27 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container158459900716901393/blob158459900741801925')
  .reply(409, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>SnapshotsPresent</Code><Message>This operation is not permitted because the blob has snapshots.\nRequestId:775e4a07-b01e-0088-53b6-fd3fcb000000\nTime:2020-03-19T06:23:28.3044745Z</Message></Error>", [
  'Content-Length',
  '248',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '775e4a07-b01e-0088-53b6-fd3fcb000000',
  'x-ms-client-request-id',
  '062856c8-f552-4d70-8aa1-78291df3cc05',
  'x-ms-version',
  '2019-12-12',
  'x-ms-error-code',
  'SnapshotsPresent',
  'Date',
  'Thu, 19 Mar 2020 06:23:28 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container158459900716901393/blob158459900741801925')
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '775e4a64-b01e-0088-23b6-fd3fcb000000',
  'x-ms-client-request-id',
  '209597c0-ca18-47f0-b6c8-54ff2de516d4',
  'x-ms-version',
  '2019-12-12',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Thu, 19 Mar 2020 06:23:28 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container158459900716901393/blob158459900741801925')
  .query(true)
  .reply(404, "", [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b42b83b1-701e-005c-0db6-fd8f9a000000',
  'x-ms-client-request-id',
  '15fccdb4-c158-4bfa-ba60-e5e9646e5a78',
  'x-ms-version',
  '2019-12-12',
  'x-ms-error-code',
  'BlobNotFound',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 19 Mar 2020 06:23:28 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container158459900716901393/blob158459900741801925')
  .reply(404, "", [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '775e4be3-b01e-0088-63b6-fd3fcb000000',
  'x-ms-client-request-id',
  '7d3f7598-4b5a-45b6-a03e-97ee76c6c8ea',
  'x-ms-version',
  '2019-12-12',
  'x-ms-error-code',
  'BlobNotFound',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 19 Mar 2020 06:23:29 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container158459900716901393')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b42b8478-701e-005c-34b6-fd8f9a000000',
  'x-ms-client-request-id',
  'b37b4b1a-0c0a-4abf-904c-9fb9345b2489',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Thu, 19 Mar 2020 06:23:29 GMT'
]);
