let nock = require('nock');

module.exports.testInfo = {"container":"container156816853377502168","blob":"blob156816853419808974"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156816853377502168')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:22:14 GMT',
  'ETag',
  '"0x8D7365EDBF45232"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f994e741-201e-0025-2747-68fe4f000000',
  'x-ms-client-request-id',
  '8df6084e-dfed-4925-9893-09316a7a513b',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:22:13 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156816853377502168/blob156816853419808974')
  .reply(400, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>AccessTierNotSupportedForBlobType</Code><Message>The access tier is not supported for this blob type.\nRequestId:d53ac861-001e-0032-6f47-683e2c000000\nTime:2019-09-11T02:22:14.5483216Z</Message></Error>", [ 'Content-Length',
  '254',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd53ac861-001e-0032-6f47-683e2c000000',
  'x-ms-client-request-id',
  '8481fb25-06af-487c-be32-a52ac3f73cc5',
  'x-ms-version',
  '2019-02-02',
  'x-ms-error-code',
  'AccessTierNotSupportedForBlobType',
  'Date',
  'Wed, 11 Sep 2019 02:22:14 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156816853377502168')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2bc245f4-e01e-0038-4a47-6827a5000000',
  'x-ms-client-request-id',
  'a0de886b-1b0e-44e3-a1ad-a8b2a4882207',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:22:14 GMT' ]);

