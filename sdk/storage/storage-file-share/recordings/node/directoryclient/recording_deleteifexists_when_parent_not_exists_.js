let nock = require('nock');

module.exports.hash = "4a2d91937340de2174857c779b4098e7";

module.exports.testInfo = {"uniqueName":{"share":"share160387504318200100","dir":"dir160387504466800284","subdir":"subdir160387504497808490"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share160387504318200100')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 28 Oct 2020 08:50:44 GMT',
  'ETag',
  '"0x8D87B1E8EA06456"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'fdd8c9d9-a01a-0077-3a07-ad8069000000',
  'x-ms-client-request-id',
  '9302d271-1402-48c9-bb89-d1b3acfdc28f',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Wed, 28 Oct 2020 08:50:44 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share160387504318200100/dir160387504466800284')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 28 Oct 2020 08:50:44 GMT',
  'ETag',
  '"0x8D87B1E8ED2C647"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'fdd8c9dc-a01a-0077-3b07-ad8069000000',
  'x-ms-client-request-id',
  'cbb42e68-7c10-40e1-b960-068b2a64f534',
  'x-ms-version',
  '2020-02-10',
  'x-ms-file-change-time',
  '2020-10-28T08:50:44.8338503Z',
  'x-ms-file-last-write-time',
  '2020-10-28T08:50:44.8338503Z',
  'x-ms-file-creation-time',
  '2020-10-28T08:50:44.8338503Z',
  'x-ms-file-permission-key',
  '18253506462963126402*10775527834424002315',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 28 Oct 2020 08:50:44 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share160387504318200100/dir160387504466800284/subdir160387504497808490/subdir160387504497808490')
  .query(true)
  .reply(404, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>ParentNotFound</Code><Message>The specified parent path does not exist.\nRequestId:fdd8c9df-a01a-0077-3c07-ad8069000000\nTime:2020-10-28T08:50:45.1391196Z</Message></Error>", [
  'Content-Length',
  '224',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'fdd8c9df-a01a-0077-3c07-ad8069000000',
  'x-ms-client-request-id',
  '346348cd-a7c4-46a1-bd1d-4febc0b5bc66',
  'x-ms-version',
  '2020-02-10',
  'x-ms-error-code',
  'ParentNotFound',
  'Date',
  'Wed, 28 Oct 2020 08:50:44 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share160387504318200100')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'fdd8c9e1-a01a-0077-3d07-ad8069000000',
  'x-ms-client-request-id',
  '8439daac-3468-4f55-9be8-0ec7bd1a4a0e',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Wed, 28 Oct 2020 08:50:45 GMT'
]);
