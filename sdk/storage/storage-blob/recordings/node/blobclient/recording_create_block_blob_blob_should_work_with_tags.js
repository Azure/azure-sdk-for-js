let nock = require('nock');

module.exports.hash = "825f08fa77af8909631a204a03afccab";

module.exports.testInfo = {"uniqueName":{"container":"container159210827100608603","blob":"blob159210827103103981"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159210827100608603')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:17:51 GMT',
  'ETag',
  '"0x8D81019E7177B5A"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1308cd0-201e-003e-5502-42dadf000000',
  'x-ms-client-request-id',
  'c093c743-0cc4-407d-aa1d-03a1b321f38d',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Sun, 14 Jun 2020 04:17:50 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159210827100608603/blob159210827103103981', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:17:51 GMT',
  'ETag',
  '"0x8D81019E71A3186"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1308cd8-201e-003e-5c02-42dadf000000',
  'x-ms-client-request-id',
  '4f0c0647-76d8-4f64-ad03-089461427fa7',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-06-14T04:17:51.0405510Z',
  'Date',
  'Sun, 14 Jun 2020 04:17:50 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159210827100608603/blob159210827103103981')
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1308cdf-201e-003e-6302-42dadf000000',
  'x-ms-client-request-id',
  'b7399fb1-0adb-454f-bdb0-78c1a8594db0',
  'x-ms-version',
  '2019-12-12',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Sun, 14 Jun 2020 04:17:50 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159210827100608603/blob159210827103103981', "hello")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'XUFAKrxLKna5cZ2REBfFkg==',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:17:51 GMT',
  'ETag',
  '"0x8D81019E7420C04"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1308d29-201e-003e-2702-42dadf000000',
  'x-ms-client-request-id',
  'f3eb1c51-cc37-443f-9f89-8689f0363c76',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'V0JSBnCFdzM=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-06-14T04:17:51.3027355Z',
  'Date',
  'Sun, 14 Jun 2020 04:17:50 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container159210827100608603/blob159210827103103981')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<Tags><TagSet><Tag><Key>tag1</Key><Value>val1</Value></Tag><Tag><Key>tag2</Key><Value>val2</Value></Tag></TagSet></Tags>", [
  'Content-Length',
  '162',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1308d30-201e-003e-2c02-42dadf000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '7cf11f6c-f39b-4efc-b6df-00a927002565',
  'Date',
  'Sun, 14 Jun 2020 04:17:50 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159210827100608603')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1308d36-201e-003e-3102-42dadf000000',
  'x-ms-client-request-id',
  '3e02b1cf-907c-41cd-936b-f6e659830a78',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Sun, 14 Jun 2020 04:17:50 GMT'
]);
