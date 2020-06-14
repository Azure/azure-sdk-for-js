let nock = require('nock');

module.exports.hash = "184b097fcb4977a8460852c49c3f8c09";

module.exports.testInfo = {"uniqueName":{"container":"container159210827181806334","blob":"blob159210827183307824"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159210827181806334')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:17:51 GMT',
  'ETag',
  '"0x8D81019E791CAA6"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1308dcc-201e-003e-3a02-42dadf000000',
  'x-ms-client-request-id',
  '614f5d0b-017e-40db-8de4-a80c9cbdbf41',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Sun, 14 Jun 2020 04:17:50 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159210827181806334/blob159210827183307824', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:17:51 GMT',
  'ETag',
  '"0x8D81019E794A7BD"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1308dd1-201e-003e-3e02-42dadf000000',
  'x-ms-client-request-id',
  'd6a90b3c-c7a1-4a9a-9432-dfb3f05b35e1',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-06-14T04:17:51.8431165Z',
  'Date',
  'Sun, 14 Jun 2020 04:17:50 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159210827181806334/blob159210827183307824')
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1308dd9-201e-003e-4502-42dadf000000',
  'x-ms-client-request-id',
  '9e9341b1-24c2-425f-8bda-c179db620409',
  'x-ms-version',
  '2019-12-12',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Sun, 14 Jun 2020 04:17:50 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159210827181806334/blob159210827183307824')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:17:51 GMT',
  'ETag',
  '"0x8D81019E7993C75"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1308de0-201e-003e-4c02-42dadf000000',
  'x-ms-client-request-id',
  '129379be-57e4-472e-be4b-afc5e9aa5db3',
  'x-ms-version',
  '2019-12-12',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-06-14T04:17:51.8731381Z',
  'Date',
  'Sun, 14 Jun 2020 04:17:50 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container159210827181806334/blob159210827183307824')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<Tags><TagSet><Tag><Key>tag1</Key><Value>val1</Value></Tag><Tag><Key>tag2</Key><Value>val2</Value></Tag></TagSet></Tags>", [
  'Content-Length',
  '162',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1308de8-201e-003e-5202-42dadf000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  'ad802a37-d03d-44a0-a30b-2d6308ffa149',
  'Date',
  'Sun, 14 Jun 2020 04:17:50 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159210827181806334')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1308def-201e-003e-5802-42dadf000000',
  'x-ms-client-request-id',
  '7d650c87-5a08-41d3-bbe1-c935a405c1b7',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Sun, 14 Jun 2020 04:17:50 GMT'
]);
