let nock = require('nock');

module.exports.testInfo = {"container":"container156404674808003794","blob":"blob156404674834401389","copiedblob":"copiedblob156404674861603417"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156404674808003794')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 25 Jul 2019 09:22:10 GMT',
  'ETag',
  '"0x8D710E1921C6CBD"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e255b975-c01e-00b2-47ca-42c5ec000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Thu, 25 Jul 2019 09:22:09 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156404674808003794/blob156404674834401389', "Hello World")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Thu, 25 Jul 2019 09:22:10 GMT',
  'ETag',
  '"0x8D710E192469F07"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '742280b9-a01e-0107-30ca-428e46000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 25 Jul 2019 09:22:09 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156404674808003794/copiedblob156404674861603417')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 25 Jul 2019 09:22:10 GMT',
  'ETag',
  '"0x8D710E192757FD6"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0ff48ff2-401e-00a8-41ca-42ea83000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-copy-id',
  '1c864045-f29a-45bd-acb3-efd94a918979',
  'x-ms-copy-status',
  'success',
  'Date',
  'Thu, 25 Jul 2019 09:22:09 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156404674808003794/copiedblob156404674861603417')
  .query(true)
  .reply(409, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>NoPendingCopyOperation</Code><Message>There is currently no pending copy operation.\nRequestId:ea130516-901e-0044-0aca-42e2fa000000\nTime:2019-07-25T09:22:10.9977180Z</Message></Error>", [ 'Content-Length',
  '236',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ea130516-901e-0044-0aca-42e2fa000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-error-code',
  'NoPendingCopyOperation',
  'Date',
  'Thu, 25 Jul 2019 09:22:10 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156404674808003794')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd7ea5bb4-c01e-003a-76ca-427d35000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Thu, 25 Jul 2019 09:22:11 GMT',
  'Connection',
  'close' ]);

