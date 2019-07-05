let nock = require('nock');

module.exports.testInfo = {"container":"container156231858878909267","blob":"blob156231858906508408","copiedblob":"copiedblob156231858933600735"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156231858878909267')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:19:49 GMT',
  'ETag',
  '"0x8D70129EE240F58"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5ac6dce4-301e-00e8-7912-33c36d000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Fri, 05 Jul 2019 09:19:49 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156231858878909267/blob156231858906508408', "Hello World")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:19:49 GMT',
  'ETag',
  '"0x8D70129EE4D4793"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6477f3dd-601e-0111-3512-334fd8000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 05 Jul 2019 09:19:49 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156231858878909267/copiedblob156231858933600735')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:19:50 GMT',
  'ETag',
  '"0x8D70129EE76D045"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1449a582-101e-011e-7d12-33a22e000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-copy-id',
  '60f0f040-1d99-4bbc-a9e1-ba1aee00d535',
  'x-ms-copy-status',
  'success',
  'Date',
  'Fri, 05 Jul 2019 09:19:50 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156231858878909267/copiedblob156231858933600735')
  .query(true)
  .reply(409, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>NoPendingCopyOperation</Code><Message>There is currently no pending copy operation.\nRequestId:e64dc196-b01e-0053-5612-332299000000\nTime:2019-07-05T09:19:50.5245492Z</Message></Error>", [ 'Content-Length',
  '236',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e64dc196-b01e-0053-5612-332299000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-error-code',
  'NoPendingCopyOperation',
  'Date',
  'Fri, 05 Jul 2019 09:19:49 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156231858878909267')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'dfecef0d-f01e-0136-5612-33d591000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Fri, 05 Jul 2019 09:19:49 GMT',
  'Connection',
  'close' ]);

