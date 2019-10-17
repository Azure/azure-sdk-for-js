let nock = require('nock');

module.exports.testInfo = {"container":"container156816831876803568","blob":"blob156816831918300609","copiedblob":"copiedblob156816831960407610"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156816831876803568')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:18:39 GMT',
  'ETag',
  '"0x8D7365E5BCBAFC9"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '53c20873-f01e-002c-5247-68e4c1000000',
  'x-ms-client-request-id',
  'dbadb720-a7be-4ea2-a002-8944bf491b0d',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:18:38 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156816831876803568/blob156816831918300609', "Hello World")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:18:39 GMT',
  'ETag',
  '"0x8D7365E5C0BCEC7"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f409eef8-a01e-001d-3e47-68bf16000000',
  'x-ms-client-request-id',
  '349a2b74-e7d9-4ed8-94a3-67bd1562704b',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 11 Sep 2019 02:18:38 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156816831876803568/copiedblob156816831960407610')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:18:39 GMT',
  'ETag',
  '"0x8D7365E5C4D0243"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd539be26-001e-0032-4b47-683e2c000000',
  'x-ms-client-request-id',
  'b405d871-f3a2-49f3-8fa6-3bde0fc277bc',
  'x-ms-version',
  '2019-02-02',
  'x-ms-copy-id',
  '461f7aaa-e04a-46be-a461-9e2e4e6b91b0',
  'x-ms-copy-status',
  'success',
  'Date',
  'Wed, 11 Sep 2019 02:18:39 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156816831876803568/copiedblob156816831960407610')
  .reply(400, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>InvalidHeaderValue</Code><Message>The value for one of the HTTP headers is not in the correct format.\nRequestId:8b4fe44b-b01e-0002-6247-686406000000\nTime:2019-09-11T02:18:40.3833020Z</Message><HeaderName>x-ms-copy-source</HeaderName><HeaderValue>461f7aaa-e04a-46be-a461-9e2e4e6b91b0</HeaderValue></Error>", [ 'Content-Length',
  '358',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8b4fe44b-b01e-0002-6247-686406000000',
  'x-ms-client-request-id',
  '4187a2b3-1c4f-4e23-95cf-3fa93abfb1ac',
  'x-ms-version',
  '2019-02-02',
  'x-ms-error-code',
  'InvalidHeaderValue',
  'Date',
  'Wed, 11 Sep 2019 02:18:39 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156816831876803568')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '14e7ab46-b01e-0020-3447-680a30000000',
  'x-ms-client-request-id',
  '1e04f4c7-2737-469f-afdf-a702320388c4',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:18:40 GMT' ]);

