let nock = require('nock');

module.exports.testInfo = {"container":"container156150803879504227","blob":"blob156150803910501904","copiedblob":"copiedblob156150803939806771"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156150803879504227')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 26 Jun 2019 00:13:59 GMT',
  'ETag',
  '"0x8D6F9CB2F874B79"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3fe24441-c01e-00d6-80b4-2b314b000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Wed, 26 Jun 2019 00:13:58 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156150803879504227/blob156150803910501904', "Hello World")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Wed, 26 Jun 2019 00:13:59 GMT',
  'ETag',
  '"0x8D6F9CB2FB448C7"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ed3389ec-a01e-004e-34b4-2bbf74000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 26 Jun 2019 00:13:58 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156150803879504227/copiedblob156150803939806771')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 26 Jun 2019 00:13:59 GMT',
  'ETag',
  '"0x8D6F9CB2FE17B7E"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '32bad904-e01e-006b-49b4-2b27c7000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-copy-id',
  'ca7bc0ee-c74b-4035-bd26-3b90c9e53d83',
  'x-ms-copy-status',
  'success',
  'Date',
  'Wed, 26 Jun 2019 00:13:58 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156150803879504227/copiedblob156150803939806771')
  .reply(400, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>InvalidHeaderValue</Code><Message>The value for one of the HTTP headers is not in the correct format.\nRequestId:6b374a45-301e-00ea-58b4-2b8590000000\nTime:2019-06-26T00:13:59.9376487Z</Message><HeaderName>x-ms-copy-source</HeaderName><HeaderValue>ca7bc0ee-c74b-4035-bd26-3b90c9e53d83</HeaderValue></Error>", [ 'Content-Length',
  '358',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6b374a45-301e-00ea-58b4-2b8590000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-error-code',
  'InvalidHeaderValue',
  'Date',
  'Wed, 26 Jun 2019 00:13:59 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156150803879504227')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '25c29a5f-f01e-0074-72b4-2bfcd7000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Wed, 26 Jun 2019 00:13:59 GMT',
  'Connection',
  'close' ]);

