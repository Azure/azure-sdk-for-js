let nock = require('nock');

module.exports.hash = "c9290c2dbcd30291b6d860835d9de726";

module.exports.testInfo = {"uniqueName":{"container":"container159195941157308486","blob":"blob159195941186205501"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159195941157308486')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 12 Jun 2020 10:56:50 GMT',
  'ETag',
  '"0x8D80EBF4F7E9BFD"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f0c54e43-501e-0046-2aa8-407927000000',
  'x-ms-client-request-id',
  '78b8abe0-ff51-4505-893a-1eda2ebcdd57',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Fri, 12 Jun 2020 10:56:50 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159195941157308486/blob159195941186205501', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Fri, 12 Jun 2020 10:56:51 GMT',
  'ETag',
  '"0x8D80EBF4FAADD67"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f0c54ebc-501e-0046-1ea8-407927000000',
  'x-ms-client-request-id',
  '3ea687f7-c138-4704-885f-11e54aa85abc',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-06-12T10:56:51.1065447Z',
  'Date',
  'Fri, 12 Jun 2020 10:56:50 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159195941157308486/blob159195941186205501')
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f0c54f3f-501e-0046-18a8-407927000000',
  'x-ms-client-request-id',
  '0559d78f-b8f2-4b6d-aeba-2b24a253a403',
  'x-ms-version',
  '2019-12-12',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Fri, 12 Jun 2020 10:56:50 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159195941157308486/blob159195941186205501')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 12 Jun 2020 10:56:51 GMT',
  'ETag',
  '"0x8D80EBF50031FBD"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f0c54fbe-501e-0046-0ba8-407927000000',
  'x-ms-client-request-id',
  'f00159d6-6dbb-42be-9e85-3e94e9049dbd',
  'x-ms-version',
  '2019-12-12',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-06-12T10:56:51.6849597Z',
  'Date',
  'Fri, 12 Jun 2020 10:56:51 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container159195941157308486/blob159195941186205501')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<Tags><TagSet><Tag><Key>tag1</Key><Value>val1</Value></Tag><Tag><Key>tag2</Key><Value>val2</Value></Tag></TagSet></Tags>", [
  'Content-Length',
  '162',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f0c55019-501e-0046-64a8-407927000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  'b77ca529-92e9-4d71-910d-08dfbeb964f3',
  'Date',
  'Fri, 12 Jun 2020 10:56:51 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159195941157308486')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f0c5507b-501e-0046-3fa8-407927000000',
  'x-ms-client-request-id',
  'fac49e4e-0f13-4683-86ad-0453037f7122',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Fri, 12 Jun 2020 10:56:51 GMT'
]);
