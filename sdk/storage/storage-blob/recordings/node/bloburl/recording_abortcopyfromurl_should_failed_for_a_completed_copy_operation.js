let nock = require('nock');

module.exports.testInfo = {"container":"container156058645827504407","blob":"blob156058646135505425","copiedblob":"copiedblob156058646186504491"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156058645827504407')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Sat, 15 Jun 2019 08:14:20 GMT',
  'ETag',
  '"0x8D6F16977EFDE0E"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a493a9ea-301e-0062-7752-233d49000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Sat, 15 Jun 2019 08:14:20 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156058645827504407/blob156058646135505425', "Hello World")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Sat, 15 Jun 2019 08:14:21 GMT',
  'ETag',
  '"0x8D6F169783E2951"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd45ce952-f01e-009a-1252-23f654000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Sat, 15 Jun 2019 08:14:20 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156058645827504407/copiedblob156058646186504491')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Sat, 15 Jun 2019 08:14:21 GMT',
  'ETag',
  '"0x8D6F169788C0986"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e0776a24-a01e-0082-4b52-23dbc1000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-copy-id',
  'acc0429c-2590-4743-be09-6a3262d99a2f',
  'x-ms-copy-status',
  'success',
  'Date',
  'Sat, 15 Jun 2019 08:14:20 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156058645827504407/copiedblob156058646186504491')
  .query(true)
  .reply(409, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>NoPendingCopyOperation</Code><Message>There is currently no pending copy operation.\nRequestId:e0f615ff-901e-00ce-0d52-231cde000000\nTime:2019-06-15T08:14:22.3577313Z</Message></Error>", [ 'Content-Length',
  '236',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e0f615ff-901e-00ce-0d52-231cde000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-error-code',
  'NoPendingCopyOperation',
  'Date',
  'Sat, 15 Jun 2019 08:14:22 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156058645827504407')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '73747fb6-801e-007b-6852-231121000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Sat, 15 Jun 2019 08:14:22 GMT',
  'Connection',
  'close' ]);

