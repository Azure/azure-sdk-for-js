let nock = require('nock');

module.exports.testInfo = {"container":"container156816828583604700","blob":"blob156816828626002220"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156816828583604700')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:18:06 GMT',
  'ETag',
  '"0x8D7365E482B81B2"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a22b48b2-401e-0035-6947-68c8a9000000',
  'x-ms-client-request-id',
  '329d2cc5-575c-493a-ac18-62df15e4dd6e',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:18:05 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156816828583604700/blob156816828626002220')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:18:06 GMT',
  'ETag',
  '"0x8D7365E486C6E3E"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'cb5f53c0-401e-001c-5d47-68beeb000000',
  'x-ms-client-request-id',
  'da7fb6df-5e2f-4d07-bb0a-733b0cb26dae',
  'x-ms-version',
  '2019-02-02',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 11 Sep 2019 02:18:05 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156816828583604700/blob156816828626002220', "Hello World!")
  .query(true)
  .reply(400, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>Crc64Mismatch</Code><Message>The CRC64 value specified in the request did not match with the CRC64 value calculated by the server.\nRequestId:816ca285-c01e-006b-1d47-683baa000000\nTime:2019-09-11T02:18:07.0232073Z</Message><UserSpecifiedCrc>AQIDBAUGBwg=</UserSpecifiedCrc><ServerCalculatedCrc>peH8Xsgc5QI=</ServerCalculatedCrc></Error>", [ 'Content-Length',
  '387',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '816ca285-c01e-006b-1d47-683baa000000',
  'x-ms-client-request-id',
  '26974808-97bf-48b9-a70c-e1159bc4b3b7',
  'x-ms-version',
  '2019-02-02',
  'x-ms-error-code',
  'Crc64Mismatch',
  'Date',
  'Wed, 11 Sep 2019 02:18:06 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156816828583604700')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '67968d75-b01e-0064-0347-68d65c000000',
  'x-ms-client-request-id',
  'edd93405-85bd-4599-b512-299774be7385',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:18:07 GMT' ]);

