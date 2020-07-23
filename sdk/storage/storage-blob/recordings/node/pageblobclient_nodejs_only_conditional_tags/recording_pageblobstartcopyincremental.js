let nock = require('nock');

module.exports.hash = "29ffe569873e9c3c9f36432a307e6957";

module.exports.testInfo = {"uniqueName":{"container":"container159549714543604014","blob":"blob159549714588506429","destPageBlob":"destPageBlob159549717680208832"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549714543604014')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 23 Jul 2020 09:39:04 GMT',
  'ETag',
  '"0x8D82EEC3D10BF7E"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4bd01954-a01e-0020-71d5-603607000000',
  'x-ms-client-request-id',
  '4e584f41-e3eb-4b74-857f-e2ea42957b92',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Thu, 23 Jul 2020 09:39:04 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549714543604014/blob159549714588506429')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 23 Jul 2020 09:39:04 GMT',
  'ETag',
  '"0x8D82EEC3D5584C6"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4bd0196e-a01e-0020-08d5-603607000000',
  'x-ms-client-request-id',
  '68e21294-fe31-4855-b161-5de6c76c28b3',
  'x-ms-version',
  '2019-12-12',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-07-23T09:39:04.9099462Z',
  'Date',
  'Thu, 23 Jul 2020 09:39:04 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549714543604014/blob159549714588506429')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 23 Jul 2020 09:39:04 GMT',
  'ETag',
  '"0x8D82EEC3D5584C6"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4bd01989-a01e-0020-1dd5-603607000000',
  'x-ms-client-request-id',
  '8398459a-257b-4e80-8275-b65487b3f507',
  'x-ms-version',
  '2019-12-12',
  'x-ms-version-id',
  '2020-07-23T09:39:05.2091585Z',
  'x-ms-snapshot',
  '2020-07-23T09:39:05.2081585Z',
  'x-ms-request-server-encrypted',
  'false',
  'Date',
  'Thu, 23 Jul 2020 09:39:04 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549714543604014', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><SignedIdentifiers/>")
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 23 Jul 2020 09:39:05 GMT',
  'ETag',
  '"0x8D82EEC3DB1B6FF"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4bd019a1-a01e-0020-31d5-603607000000',
  'x-ms-client-request-id',
  '3497c265-b44d-4c32-81e8-480e9ce31efb',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Thu, 23 Jul 2020 09:39:05 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549714543604014/destPageBlob159549717680208832')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 23 Jul 2020 09:39:35 GMT',
  'ETag',
  '"0x8D82EEC4FCA18AC"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4bd022f5-a01e-0020-5fd5-603607000000',
  'x-ms-client-request-id',
  'e95a4ca0-b1d0-4cd5-aea1-a8c34f963ffe',
  'x-ms-version',
  '2019-12-12',
  'x-ms-copy-id',
  '32dd329d-b0fc-4610-a5e9-165ed47ff917',
  'x-ms-copy-status',
  'pending',
  'x-ms-version-id',
  '2020-07-23T09:39:35.8729388Z',
  'Date',
  'Thu, 23 Jul 2020 09:39:35 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549714543604014/destPageBlob159549717680208832', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><Tags><TagSet><Tag><Key>tag1</Key><Value>val1</Value></Tag><Tag><Key>tag2</Key><Value>val2</Value></Tag></TagSet></Tags>")
  .query(true)
  .reply(204, "", [
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4bd0233e-a01e-0020-1bd5-603607000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '17391a69-e540-4c2c-9f1f-9f439af054f0',
  'Date',
  'Thu, 23 Jul 2020 09:39:35 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549714543604014/blob159549714588506429')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 23 Jul 2020 09:39:04 GMT',
  'ETag',
  '"0x8D82EEC3D5584C6"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4bd02398-a01e-0020-6ed5-603607000000',
  'x-ms-client-request-id',
  '580c4043-00bb-4e66-9b5d-16b6f7fb8bdb',
  'x-ms-version',
  '2019-12-12',
  'x-ms-version-id',
  '2020-07-23T09:39:36.7275477Z',
  'x-ms-snapshot',
  '2020-07-23T09:39:36.7265477Z',
  'x-ms-request-server-encrypted',
  'false',
  'Date',
  'Thu, 23 Jul 2020 09:39:36 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549714543604014/destPageBlob159549717680208832')
  .query(true)
  .reply(412, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>ConditionNotMet</Code><Message>The condition specified using HTTP conditional header(s) is not met.\nRequestId:4bd023cc-a01e-0020-1ad5-603607000000\nTime:2020-07-23T09:39:37.0934639Z</Message></Error>", [
  'Content-Length',
  '252',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4bd023cc-a01e-0020-1ad5-603607000000',
  'x-ms-client-request-id',
  'db38f167-ac6c-4b18-8c45-60adb86158df',
  'x-ms-version',
  '2019-12-12',
  'x-ms-error-code',
  'ConditionNotMet',
  'Date',
  'Thu, 23 Jul 2020 09:39:36 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549714543604014/destPageBlob159549717680208832')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 23 Jul 2020 09:39:37 GMT',
  'ETag',
  '"0x8D82EEC50B2CE64"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4bd02416-a01e-0020-5ad5-603607000000',
  'x-ms-client-request-id',
  'ad7bbeb7-b4ec-4e05-a867-fbe1cf4c4577',
  'x-ms-version',
  '2019-12-12',
  'x-ms-copy-id',
  '196d0d66-0d7b-4ee9-9eab-0d1db6066abd',
  'x-ms-copy-status',
  'pending',
  'Date',
  'Thu, 23 Jul 2020 09:39:36 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159549714543604014')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4bd02445-a01e-0020-07d5-603607000000',
  'x-ms-client-request-id',
  '02a2c47c-492e-4248-b9d2-4147a72f78d9',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Thu, 23 Jul 2020 09:39:37 GMT'
]);
