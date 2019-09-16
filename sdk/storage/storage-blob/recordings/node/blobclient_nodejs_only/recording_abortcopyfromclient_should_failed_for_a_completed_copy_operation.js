let nock = require('nock');

module.exports.testInfo = {"container":"container156816863374605524","blob":"blob156816863415309448","copiedblob":"copiedblob156816863455901568"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156816863374605524')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:23:54 GMT',
  'ETag',
  '"0x8D7365F1788424B"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e18b633e-d01e-0030-5847-683cd6000000',
  'x-ms-client-request-id',
  '8709a1cb-2ba7-403c-b644-a3e3d8e3cf08',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:23:54 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156816863374605524/blob156816863415309448', "Hello World")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:23:54 GMT',
  'ETag',
  '"0x8D7365F17C5FA09"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '02714334-201e-0043-5947-684c15000000',
  'x-ms-client-request-id',
  '829204c6-a3d7-46e1-9f8d-ec5d33fa4034',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 11 Sep 2019 02:23:54 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156816863374605524/copiedblob156816863455901568')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:23:54 GMT',
  'ETag',
  '"0x8D7365F18050A34"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'cea8139b-e01e-0055-5147-688d8b000000',
  'x-ms-client-request-id',
  '624649dd-8e91-4d02-aa91-a30f3b8fde11',
  'x-ms-version',
  '2019-02-02',
  'x-ms-copy-id',
  'a083f0c9-fe35-442b-a0a7-0affca90b40e',
  'x-ms-copy-status',
  'success',
  'Date',
  'Wed, 11 Sep 2019 02:23:54 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156816863374605524/copiedblob156816863455901568')
  .reply(400, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>InvalidHeaderValue</Code><Message>The value for one of the HTTP headers is not in the correct format.\nRequestId:c62a4432-001e-005f-7647-689402000000\nTime:2019-09-11T02:23:55.2989012Z</Message><HeaderName>x-ms-copy-source</HeaderName><HeaderValue>a083f0c9-fe35-442b-a0a7-0affca90b40e</HeaderValue></Error>", [ 'Content-Length',
  '358',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c62a4432-001e-005f-7647-689402000000',
  'x-ms-client-request-id',
  'c85570cc-fc0f-485d-ac2a-585e3d6d67db',
  'x-ms-version',
  '2019-02-02',
  'x-ms-error-code',
  'InvalidHeaderValue',
  'Date',
  'Wed, 11 Sep 2019 02:23:54 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156816863374605524')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f196d154-301e-0057-0847-688f71000000',
  'x-ms-client-request-id',
  '2652b528-a7af-43a1-9e7d-dd2bd37b7c46',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:23:55 GMT' ]);

