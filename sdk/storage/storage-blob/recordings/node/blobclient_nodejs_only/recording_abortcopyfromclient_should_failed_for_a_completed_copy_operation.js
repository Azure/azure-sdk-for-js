let nock = require('nock');

module.exports.testInfo = {"container":"container156711960073603315","blob":"blob156711960103104893","copiedblob":"copiedblob156711960132909561"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156711960073603315')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 29 Aug 2019 23:00:00 GMT',
  'ETag',
  '"0x8D72CD49F10EAFC"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '31f68d17-e01e-0060-50bd-5e3fb3000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Thu, 29 Aug 2019 23:00:00 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156711960073603315/blob156711960103104893', "Hello World")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Thu, 29 Aug 2019 23:00:01 GMT',
  'ETag',
  '"0x8D72CD49F3E4AB2"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f5975241-e01e-0049-40bd-5e49f1000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 29 Aug 2019 23:00:00 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156711960073603315/copiedblob156711960132909561')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 29 Aug 2019 23:00:01 GMT',
  'ETag',
  '"0x8D72CD49F6F0092"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0b433d0c-901e-00ce-01bd-5e1cde000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-copy-id',
  '3843d533-b431-438d-8ce0-4f9f7920f045',
  'x-ms-copy-status',
  'success',
  'Date',
  'Thu, 29 Aug 2019 23:00:01 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156711960073603315/copiedblob156711960132909561')
  .reply(400, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>InvalidHeaderValue</Code><Message>The value for one of the HTTP headers is not in the correct format.\nRequestId:ef20726d-301e-0040-5dbd-5e537f000000\nTime:2019-08-29T23:00:01.8725726Z</Message><HeaderName>x-ms-copy-source</HeaderName><HeaderValue>3843d533-b431-438d-8ce0-4f9f7920f045</HeaderValue></Error>", [ 'Content-Length',
  '358',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ef20726d-301e-0040-5dbd-5e537f000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-error-code',
  'InvalidHeaderValue',
  'Date',
  'Thu, 29 Aug 2019 23:00:01 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156711960073603315')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a89e48b1-601e-009f-6dbd-5e022b000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Thu, 29 Aug 2019 23:00:01 GMT',
  'Connection',
  'close' ]);

