let nock = require('nock');

module.exports.testInfo = {"container":"container156150782949107934","blob":"blob156150782978808737","copiedblob":"copiedblob156150783008204464"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156150782949107934')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 26 Jun 2019 00:10:29 GMT',
  'ETag',
  '"0x8D6F9CAB2C3B53B"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1aa4e851-801e-0095-7eb3-2b1ba2000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Wed, 26 Jun 2019 00:10:29 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156150782949107934/blob156150782978808737', "Hello World")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Wed, 26 Jun 2019 00:10:30 GMT',
  'ETag',
  '"0x8D6F9CAB2F0FC14"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f39545d3-801e-003f-75b3-2bcd4d000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 26 Jun 2019 00:10:29 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156150782949107934/copiedblob156150783008204464')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 26 Jun 2019 00:10:30 GMT',
  'ETag',
  '"0x8D6F9CAB32890F2"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '84df0515-901e-004d-52b3-2bbc73000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-copy-id',
  '40bce646-f873-4813-97b1-697903e1267f',
  'x-ms-copy-status',
  'success',
  'Date',
  'Wed, 26 Jun 2019 00:10:29 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156150782949107934/copiedblob156150783008204464')
  .reply(400, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>InvalidHeaderValue</Code><Message>The value for one of the HTTP headers is not in the correct format.\nRequestId:e9765055-f01e-00b3-17b3-2b8016000000\nTime:2019-06-26T00:10:30.7482938Z</Message><HeaderName>x-ms-copy-source</HeaderName><HeaderValue>40bce646-f873-4813-97b1-697903e1267f</HeaderValue></Error>", [ 'Content-Length',
  '358',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e9765055-f01e-00b3-17b3-2b8016000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-error-code',
  'InvalidHeaderValue',
  'Date',
  'Wed, 26 Jun 2019 00:10:30 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156150782949107934')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'cf5fef30-201e-005f-15b3-2b886f000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Wed, 26 Jun 2019 00:10:30 GMT',
  'Connection',
  'close' ]);

