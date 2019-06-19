let nock = require('nock');

module.exports.testInfo = {"share":"share156093651352202247","dir":"dir156093651378800142","file":"file156093651406004234","copiedfile":"copiedfile156093651433805398"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156093651352202247')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 19 Jun 2019 09:25:31 GMT',
  'ETag',
  '"0x8D6F498138B8E08"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7ad724ba-f01a-00ba-5a80-26de9f000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Wed, 19 Jun 2019 09:25:31 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156093651352202247/dir156093651378800142')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 19 Jun 2019 09:25:32 GMT',
  'ETag',
  '"0x8D6F49813B4FDD2"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9fb791ed-601a-0138-0780-26399a000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 19 Jun 2019 09:25:32 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156093651352202247/dir156093651378800142/file156093651406004234')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 19 Jun 2019 09:25:32 GMT',
  'ETag',
  '"0x8D6F49813DEFB8F"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a96b279a-b01a-0094-2e80-265e58000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 19 Jun 2019 09:25:32 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156093651352202247/dir156093651378800142/copiedfile156093651433805398')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 19 Jun 2019 09:25:32 GMT',
  'ETag',
  '"0x8D6F498140E517A"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f20ab4f7-c01a-0013-4080-260b77000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-copy-id',
  'ba19397d-25a9-4b63-8760-60d3861c5cdd',
  'x-ms-copy-status',
  'success',
  'Date',
  'Wed, 19 Jun 2019 09:25:32 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156093651352202247/dir156093651378800142/copiedfile156093651433805398')
  .query(true)
  .reply(409, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>NoPendingCopyOperation</Code><Message>There is currently no pending copy operation.\nRequestId:b7c47e77-d01a-00c0-2180-26b4d2000000\nTime:2019-06-19T09:25:34.4228514Z</Message></Error>", [ 'Content-Length',
  '236',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b7c47e77-d01a-00c0-2180-26b4d2000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-error-code',
  'NoPendingCopyOperation',
  'Date',
  'Wed, 19 Jun 2019 09:25:34 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156093651352202247')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ff7f8ece-701a-0023-7d80-26515d000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Wed, 19 Jun 2019 09:25:34 GMT',
  'Connection',
  'close' ]);

