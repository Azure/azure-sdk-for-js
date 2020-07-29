let nock = require('nock');

module.exports.hash = "c3fa0e848603d3beaad046037ca4df9b";

module.exports.testInfo = {"uniqueName":{"container":"container159420386126901694","blob":"blob159420386262203456","pageBlobName":"pageBlobName159420386292509625"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159420386126901694')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 08 Jul 2020 10:24:22 GMT',
  'ETag',
  '"0x8D8232914D44892"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b197f848-001e-0006-0811-55c1d9000000',
  'x-ms-client-request-id',
  '97f0e8d9-f01e-414c-88d6-d7689cbed33c',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Wed, 08 Jul 2020 10:24:21 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159420386126901694/blob159420386262203456', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Wed, 08 Jul 2020 10:24:22 GMT',
  'ETag',
  '"0x8D823291504D6AD"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b197f932-001e-0006-5f11-55c1d9000000',
  'x-ms-client-request-id',
  'aedc106c-e0b2-4b71-81fb-b242548d2bb2',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-07-08T10:24:22.6195117Z',
  'Date',
  'Wed, 08 Jul 2020 10:24:21 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159420386126901694/pageBlobName159420386292509625')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 08 Jul 2020 10:24:22 GMT',
  'ETag',
  '"0x8D823291534552F"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b197f9fc-001e-0006-1211-55c1d9000000',
  'x-ms-client-request-id',
  '5afdc1b9-3531-4672-bde2-f119ca8b6e30',
  'x-ms-version',
  '2019-12-12',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-07-08T10:24:22.9307695Z',
  'Date',
  'Wed, 08 Jul 2020 10:24:21 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container159420386126901694/pageBlobName159420386292509625')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<Tags><TagSet><Tag><Key>tag1</Key><Value>val1</Value></Tag><Tag><Key>tag2</Key><Value>val2</Value></Tag></TagSet></Tags>", [
  'Content-Length',
  '162',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b197fafb-001e-0006-7611-55c1d9000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '8f23b2ec-2a74-4b68-8ba7-8aa7ff374d55',
  'Date',
  'Wed, 08 Jul 2020 10:24:22 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159420386126901694')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b197fbaf-001e-0006-0b11-55c1d9000000',
  'x-ms-client-request-id',
  '824449c6-5efc-4b24-abf5-ce3f7d79feba',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Wed, 08 Jul 2020 10:24:22 GMT'
]);
