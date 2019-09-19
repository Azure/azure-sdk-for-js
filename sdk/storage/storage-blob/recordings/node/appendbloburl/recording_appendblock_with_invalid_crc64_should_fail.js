let nock = require('nock');

module.exports.testInfo = {"container":"container156776185291501617","blob":"blob156776185332307432"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156776185291501617')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 09:24:13 GMT',
  'ETag',
  '"0x8D732ABFB3E2417"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '35f16300-701e-0089-4c94-644d56000000',
  'x-ms-client-request-id',
  '148262b0-0b55-4623-acf5-0d27ea654273',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 09:24:13 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156776185291501617/blob156776185332307432')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 09:24:13 GMT',
  'ETag',
  '"0x8D732ABFB7BB31A"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'eb4f9908-e01e-0032-7c94-64f7f4000000',
  'x-ms-client-request-id',
  '6c96d70e-6a41-4498-9c7a-2e8d9f741acb',
  'x-ms-version',
  '2019-02-02',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 06 Sep 2019 09:24:13 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156776185291501617/blob156776185332307432', "Hello World!")
  .query(true)
  .reply(400, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>Crc64Mismatch</Code><Message>The CRC64 value specified in the request did not match with the CRC64 value calculated by the server.\nRequestId:dce01a03-e01e-0040-3394-64f0bb000000\nTime:2019-09-06T09:24:14.0358248Z</Message><UserSpecifiedCrc>AQIDBAUGBwg=</UserSpecifiedCrc><ServerCalculatedCrc>peH8Xsgc5QI=</ServerCalculatedCrc></Error>", [ 'Content-Length',
  '387',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'dce01a03-e01e-0040-3394-64f0bb000000',
  'x-ms-client-request-id',
  '0cd6dd1b-2a7d-4388-97d6-3a2dd87b7e92',
  'x-ms-version',
  '2019-02-02',
  'x-ms-error-code',
  'Crc64Mismatch',
  'Date',
  'Fri, 06 Sep 2019 09:24:13 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156776185291501617')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9d24d5e5-101e-014b-3a94-64f5dd000000',
  'x-ms-client-request-id',
  'd4dd924d-9ca1-46ff-958c-02c238f90b23',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 09:24:14 GMT',
  'Connection',
  'close' ]);

