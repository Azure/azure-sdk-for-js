let nock = require('nock');

module.exports.hash = "00606a4db118fe0be9eb18e940c81596";

module.exports.testInfo = {"uniqueName":{"container":"container158459900344007763","blob":"blob158459900368205915"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158459900344007763')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 19 Mar 2020 06:23:23 GMT',
  'ETag',
  '"0x8D7CBCE06E49A27"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '775e4376-b01e-0088-74b6-fd3fcb000000',
  'x-ms-client-request-id',
  '52958440-1031-4149-b4e2-62f1dcab9218',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Thu, 19 Mar 2020 06:23:23 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158459900344007763/blob158459900368205915', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Thu, 19 Mar 2020 06:23:23 GMT',
  'ETag',
  '"0x8D7CBCE070A499B"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '775e43c9-b01e-0088-3fb6-fd3fcb000000',
  'x-ms-client-request-id',
  '656dd5ea-d17a-4f3b-9b11-c13340c88056',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-03-19T06:23:23.8030747Z',
  'Date',
  'Thu, 19 Mar 2020 06:23:23 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158459900344007763/blob158459900368205915')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Thu, 19 Mar 2020 06:23:24 GMT',
  'ETag',
  '"0x8D7CBCE072F8BA6"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '775e43fd-b01e-0088-6eb6-fd3fcb000000',
  'x-ms-client-request-id',
  '8ae99738-81b7-4576-ad37-b699dd6f1ec3',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-03-19T06:23:24.0482486Z',
  'Date',
  'Thu, 19 Mar 2020 06:23:23 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container158459900344007763/blob158459900368205915')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '775e4455-b01e-0088-39b6-fd3fcb000000',
  'x-ms-client-request-id',
  'ce88d01f-e99a-46a7-b6ff-a93fd39412c9',
  'x-ms-version',
  '2019-12-12',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Thu, 19 Mar 2020 06:23:24 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container158459900344007763/blob158459900368205915')
  .query(true)
  .reply(404, "", [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '775e44a0-b01e-0088-78b6-fd3fcb000000',
  'x-ms-client-request-id',
  '2759b383-a2a9-4ce9-ad54-4066fb7720b7',
  'x-ms-version',
  '2019-12-12',
  'x-ms-error-code',
  'BlobNotFound',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 19 Mar 2020 06:23:24 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container158459900344007763/blob158459900368205915')
  .query(true)
  .reply(403, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>OperationNotAllowedOnRootBlob</Code><Message>The specified operation is not allowed on root blob.\nRequestId:775e44df-b01e-0088-2bb6-fd3fcb000000\nTime:2020-03-19T06:23:24.8029861Z</Message></Error>", [
  'Content-Length',
  '250',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '775e44df-b01e-0088-2bb6-fd3fcb000000',
  'x-ms-client-request-id',
  '8e07f3fd-dab5-48b7-b43a-9ba13112a491',
  'x-ms-version',
  '2019-12-12',
  'x-ms-error-code',
  'OperationNotAllowedOnRootBlob',
  'Date',
  'Thu, 19 Mar 2020 06:23:24 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container158459900344007763')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '775e4537-b01e-0088-75b6-fd3fcb000000',
  'x-ms-client-request-id',
  'e6b488d4-b0b5-40b9-b99b-5a6924d71501',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Thu, 19 Mar 2020 06:23:24 GMT'
]);
