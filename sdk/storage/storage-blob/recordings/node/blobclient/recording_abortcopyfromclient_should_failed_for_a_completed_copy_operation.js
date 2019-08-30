let nock = require('nock');

module.exports.testInfo = {"container":"container156711937212405720","blob":"blob156711937242004776","copiedblob":"copiedblob156711937271605078"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156711937212405720')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 29 Aug 2019 22:56:12 GMT',
  'ETag',
  '"0x8D72CD416CDCF1D"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c97ecbc6-401e-00c7-0cbc-5e0650000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Thu, 29 Aug 2019 22:56:11 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156711937212405720/blob156711937242004776', "Hello World")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Thu, 29 Aug 2019 22:56:12 GMT',
  'ETag',
  '"0x8D72CD416FB0D78"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e76a51a4-201e-005f-08bc-5e886f000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 29 Aug 2019 22:56:11 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156711937212405720/copiedblob156711937271605078')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 29 Aug 2019 22:56:12 GMT',
  'ETag',
  '"0x8D72CD4172951DA"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '31f63578-201e-0010-76bc-5e4c77000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-copy-id',
  '0954cd96-6cc6-4ca7-b15f-b55cce745019',
  'x-ms-copy-status',
  'success',
  'Date',
  'Thu, 29 Aug 2019 22:56:12 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156711937212405720/copiedblob156711937271605078')
  .reply(400, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>InvalidHeaderValue</Code><Message>The value for one of the HTTP headers is not in the correct format.\nRequestId:772984e7-301e-0069-61bc-5e253d000000\nTime:2019-08-29T22:56:13.2466586Z</Message><HeaderName>x-ms-copy-source</HeaderName><HeaderValue>0954cd96-6cc6-4ca7-b15f-b55cce745019</HeaderValue></Error>", [ 'Content-Length',
  '358',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '772984e7-301e-0069-61bc-5e253d000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-error-code',
  'InvalidHeaderValue',
  'Date',
  'Thu, 29 Aug 2019 22:56:12 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156711937212405720')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9ccdfa67-001e-0007-49bc-5e8c14000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Thu, 29 Aug 2019 22:56:12 GMT',
  'Connection',
  'close' ]);

