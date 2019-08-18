let nock = require('nock');

module.exports.testInfo = {"container":"container156599435620009061","blob":"blob156599435651507474","copiedblob":"copiedblob156599435681503531"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156599435620009061')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 16 Aug 2019 22:25:56 GMT',
  'ETag',
  '"0x8D72298B51310FD"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2c7ed15b-e01e-00e3-5e81-549f1e000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Fri, 16 Aug 2019 22:25:55 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156599435620009061/blob156599435651507474', "Hello World")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Fri, 16 Aug 2019 22:25:56 GMT',
  'ETag',
  '"0x8D72298B5430F38"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3957ec67-601e-00d0-5581-54c633000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 16 Aug 2019 22:25:56 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156599435620009061/copiedblob156599435681503531')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 16 Aug 2019 22:25:57 GMT',
  'ETag',
  '"0x8D72298B57572FD"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd4b6ed7b-601e-00b6-7681-547469000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-copy-id',
  '2d03173e-7b6c-4739-ac70-dc3b4f1eee9e',
  'x-ms-copy-status',
  'success',
  'Date',
  'Fri, 16 Aug 2019 22:25:56 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156599435620009061/copiedblob156599435681503531')
  .reply(400, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>InvalidHeaderValue</Code><Message>The value for one of the HTTP headers is not in the correct format.\nRequestId:c5102622-801e-003f-7381-54cd4d000000\nTime:2019-08-16T22:25:57.3934267Z</Message><HeaderName>x-ms-copy-source</HeaderName><HeaderValue>2d03173e-7b6c-4739-ac70-dc3b4f1eee9e</HeaderValue></Error>", [ 'Content-Length',
  '358',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c5102622-801e-003f-7381-54cd4d000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-error-code',
  'InvalidHeaderValue',
  'Date',
  'Fri, 16 Aug 2019 22:25:56 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156599435620009061')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ecde03aa-901e-00e7-2681-546a9c000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Fri, 16 Aug 2019 22:25:57 GMT',
  'Connection',
  'close' ]);

