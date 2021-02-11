let nock = require('nock');

module.exports.hash = "44b98f0691d813a83c97a075d71871cb";

module.exports.testInfo = {"uniqueName":{"container":"container159549958110500566","blob":"blob159549958139909946","copiedblob":"copiedblob159549958198909303"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549958110500566')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 23 Jul 2020 10:19:40 GMT',
  'ETag',
  '"0x8D82EF1E8D67270"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1042903c-901e-002b-46da-60cd6c000000',
  'x-ms-client-request-id',
  '5909df48-a27f-46b7-b660-20e5f358d930',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Thu, 23 Jul 2020 10:19:39 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549958110500566/blob159549958139909946', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Thu, 23 Jul 2020 10:19:40 GMT',
  'ETag',
  '"0x8D82EF1E903C384"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '10429049-901e-002b-50da-60cd6c000000',
  'x-ms-client-request-id',
  '92b8419b-79e0-44aa-9d43-25ae8afc959e',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-07-23T10:19:40.4259204Z',
  'Date',
  'Thu, 23 Jul 2020 10:19:39 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549958110500566/blob159549958139909946', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><Tags><TagSet><Tag><Key>tag1</Key><Value>val1</Value></Tag><Tag><Key>tag2</Key><Value>val2</Value></Tag></TagSet></Tags>")
  .query(true)
  .reply(204, "", [
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '10429078-901e-002b-78da-60cd6c000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  'de586344-b733-4813-91ed-f056f09a4b92',
  'Date',
  'Thu, 23 Jul 2020 10:19:39 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549958110500566/copiedblob159549958198909303', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Thu, 23 Jul 2020 10:19:41 GMT',
  'ETag',
  '"0x8D82EF1E95E28F8"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1042909a-901e-002b-19da-60cd6c000000',
  'x-ms-client-request-id',
  'a3791f53-6476-41b5-b1b4-d2f0ba5bcfed',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-07-23T10:19:41.0183416Z',
  'Date',
  'Thu, 23 Jul 2020 10:19:41 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549958110500566/copiedblob159549958198909303')
  .reply(412, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>ConditionNotMet</Code><Message>The condition specified using HTTP conditional header(s) is not met.\nRequestId:104290ad-901e-002b-2ada-60cd6c000000\nTime:2020-07-23T10:19:41.5189218Z</Message></Error>", [
  'Content-Length',
  '252',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '104290ad-901e-002b-2ada-60cd6c000000',
  'x-ms-client-request-id',
  '070c699b-144d-4a73-b55e-25c34d6209e4',
  'x-ms-version',
  '2019-12-12',
  'x-ms-error-code',
  'ConditionNotMet',
  'Date',
  'Thu, 23 Jul 2020 10:19:41 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549958110500566/copiedblob159549958198909303')
  .reply(202, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 23 Jul 2020 10:19:41 GMT',
  'ETag',
  '"0x8D82EF1E9D94485"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '104290c2-901e-002b-38da-60cd6c000000',
  'x-ms-client-request-id',
  'eefc053d-c871-4c37-bb49-adbe812e8c57',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'xvfV0lVJCU8=',
  'x-ms-version-id',
  '2020-07-23T10:19:41.8289166Z',
  'x-ms-copy-id',
  '780b6328-bd18-4c33-9240-af53cebaf51f',
  'x-ms-copy-status',
  'success',
  'Date',
  'Thu, 23 Jul 2020 10:19:41 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159549958110500566')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '104290f2-901e-002b-5dda-60cd6c000000',
  'x-ms-client-request-id',
  'ef36ccbe-a3d8-4360-9de4-ca71504124d5',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Thu, 23 Jul 2020 10:19:42 GMT'
]);
