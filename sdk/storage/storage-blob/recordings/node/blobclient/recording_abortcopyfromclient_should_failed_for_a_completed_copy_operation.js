let nock = require('nock');

module.exports.hash = "301fac9f0fb38a11fba59c294afd8c72";

module.exports.testInfo = {"uniqueName":{"container":"container159210827300909926","blob":"blob159210827303002737","copiedblob":"copiedblob159210827304509153"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159210827300909926')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:17:53 GMT',
  'ETag',
  '"0x8D81019E84891C0"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1308f6b-201e-003e-2e02-42dadf000000',
  'x-ms-client-request-id',
  'd58a6f84-a2aa-414c-9997-1779119a6d4f',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Sun, 14 Jun 2020 04:17:52 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159210827300909926/blob159210827303002737', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:17:53 GMT',
  'ETag',
  '"0x8D81019E84B205D"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1308f6f-201e-003e-3102-42dadf000000',
  'x-ms-client-request-id',
  '43abc28a-a3e9-4f5f-9a42-9671307033a2',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-06-14T04:17:53.0389597Z',
  'Date',
  'Sun, 14 Jun 2020 04:17:52 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159210827300909926/copiedblob159210827304509153')
  .reply(202, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:17:53 GMT',
  'ETag',
  '"0x8D81019E855A999"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1308f73-201e-003e-3502-42dadf000000',
  'x-ms-client-request-id',
  'e32ef411-78c2-4444-a520-15cb3673461d',
  'x-ms-version',
  '2019-12-12',
  'x-ms-version-id',
  '2020-06-14T04:17:53.1080089Z',
  'x-ms-copy-id',
  'd4c876a5-0730-41f2-87c6-a5174c5df521',
  'x-ms-copy-status',
  'success',
  'Date',
  'Sun, 14 Jun 2020 04:17:52 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159210827300909926/copiedblob159210827304509153')
  .reply(400, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>InvalidHeaderValue</Code><Message>The value for one of the HTTP headers is not in the correct format.\nRequestId:c1308f93-201e-003e-5002-42dadf000000\nTime:2020-06-14T04:17:53.1693057Z</Message><HeaderName>x-ms-copy-source</HeaderName><HeaderValue>d4c876a5-0730-41f2-87c6-a5174c5df521</HeaderValue></Error>", [
  'Content-Length',
  '358',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1308f93-201e-003e-5002-42dadf000000',
  'x-ms-client-request-id',
  'd8873308-ce96-4b3a-80be-4a0090e43681',
  'x-ms-version',
  '2019-12-12',
  'x-ms-error-code',
  'InvalidHeaderValue',
  'Date',
  'Sun, 14 Jun 2020 04:17:52 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159210827300909926')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1308f95-201e-003e-5202-42dadf000000',
  'x-ms-client-request-id',
  'd2e2a9aa-da04-4c37-85cf-40a9b3aebb98',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Sun, 14 Jun 2020 04:17:52 GMT'
]);
