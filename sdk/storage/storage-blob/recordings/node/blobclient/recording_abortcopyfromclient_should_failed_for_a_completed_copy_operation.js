let nock = require('nock');

module.exports.testInfo = {"container":"container156599411607009494","blob":"blob156599411635706760","copiedblob":"copiedblob156599411664604599"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156599411607009494')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 16 Aug 2019 22:21:56 GMT',
  'ETag',
  '"0x8D7229825F01A62"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'dbfbb28c-b01e-0015-7181-54b808000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Fri, 16 Aug 2019 22:21:55 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156599411607009494/blob156599411635706760', "Hello World")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Fri, 16 Aug 2019 22:21:56 GMT',
  'ETag',
  '"0x8D72298261C5CEA"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '49a30410-801e-0059-1e81-547f17000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 16 Aug 2019 22:21:55 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156599411607009494/copiedblob156599411664604599')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 16 Aug 2019 22:21:56 GMT',
  'ETag',
  '"0x8D7229826487DEB"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c33fd322-501e-0072-4981-540baf000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-copy-id',
  'da00a0c4-1012-46d6-9d99-9434cc6a2fd8',
  'x-ms-copy-status',
  'success',
  'Date',
  'Fri, 16 Aug 2019 22:21:56 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156599411607009494/copiedblob156599411664604599')
  .reply(400, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>InvalidHeaderValue</Code><Message>The value for one of the HTTP headers is not in the correct format.\nRequestId:82415b96-101e-0057-6f81-54931c000000\nTime:2019-08-16T22:21:57.1823623Z</Message><HeaderName>x-ms-copy-source</HeaderName><HeaderValue>da00a0c4-1012-46d6-9d99-9434cc6a2fd8</HeaderValue></Error>", [ 'Content-Length',
  '358',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '82415b96-101e-0057-6f81-54931c000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-error-code',
  'InvalidHeaderValue',
  'Date',
  'Fri, 16 Aug 2019 22:21:56 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156599411607009494')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '739f7fde-501e-001f-6c81-54a181000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Fri, 16 Aug 2019 22:21:57 GMT',
  'Connection',
  'close' ]);

