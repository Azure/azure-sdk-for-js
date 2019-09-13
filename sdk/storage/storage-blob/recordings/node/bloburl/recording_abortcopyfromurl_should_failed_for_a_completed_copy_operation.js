let nock = require('nock');

module.exports.testInfo = {"container":"container156776193441906997","blob":"blob156776193481603463","copiedblob":"copiedblob156776193522203871"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156776193441906997')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 09:25:34 GMT',
  'ETag',
  '"0x8D732AC2BD0B77F"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b93abf93-f01e-00ca-3c95-64ab0a000000',
  'x-ms-client-request-id',
  '2a82c66d-c0ab-409e-9237-c0c632caffa1',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 09:25:33 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156776193441906997/blob156776193481603463', "Hello World")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Fri, 06 Sep 2019 09:25:35 GMT',
  'ETag',
  '"0x8D732AC2C0EA664"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '771b1c30-401e-0066-7095-64b8a3000000',
  'x-ms-client-request-id',
  '7ed5e51e-54b6-4366-9d68-3ab0c7a79cfb',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 06 Sep 2019 09:25:34 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156776193441906997/copiedblob156776193522203871')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 09:25:35 GMT',
  'ETag',
  '"0x8D732AC2C4C0C79"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '14836d41-c01e-0035-3695-649b97000000',
  'x-ms-client-request-id',
  'd5e991fe-9ee9-4751-b3a8-a4579564908c',
  'x-ms-version',
  '2019-02-02',
  'x-ms-copy-id',
  'ccc5e65e-8b97-4209-b414-b2d195bab7a8',
  'x-ms-copy-status',
  'success',
  'Date',
  'Fri, 06 Sep 2019 09:25:35 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156776193441906997/copiedblob156776193522203871')
  .query(true)
  .reply(409, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>NoPendingCopyOperation</Code><Message>There is currently no pending copy operation.\nRequestId:dbfb8c55-e01e-009b-6495-643686000000\nTime:2019-09-06T09:25:35.9377152Z</Message></Error>", [ 'Content-Length',
  '236',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'dbfb8c55-e01e-009b-6495-643686000000',
  'x-ms-client-request-id',
  'f1d9a3ea-b0c3-4be7-ad89-e0d11ab7ddcf',
  'x-ms-version',
  '2019-02-02',
  'x-ms-error-code',
  'NoPendingCopyOperation',
  'Date',
  'Fri, 06 Sep 2019 09:25:35 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156776193441906997')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0785cc78-201e-00ab-6d95-648849000000',
  'x-ms-client-request-id',
  'ae7e6443-c8f2-4ab1-abf5-9e8816a42175',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 09:25:36 GMT',
  'Connection',
  'close' ]);

