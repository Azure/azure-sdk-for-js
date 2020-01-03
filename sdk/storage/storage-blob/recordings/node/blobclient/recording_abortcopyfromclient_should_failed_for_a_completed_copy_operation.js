let nock = require('nock');

module.exports.testInfo = {"container":"container157169617795500769","blob":"blob157169617822206514","copiedblob":"copiedblob157169617828204310"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157169617795500769')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 21 Oct 2019 22:16:18 GMT',
  'ETag',
  '"0x8D756744BA1F45E"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e2505f83-b01e-00a4-105d-885a52000000',
  'x-ms-client-request-id',
  '2d0d535e-7489-45e2-9340-ea311b87503e',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Mon, 21 Oct 2019 22:16:17 GMT',
  'Connection',
  'close'
]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157169617795500769/blob157169617822206514', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Mon, 21 Oct 2019 22:16:18 GMT',
  'ETag',
  '"0x8D756744BAF8219"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a59e6eeb-f01e-00d7-5b5d-8802c1000000',
  'x-ms-client-request-id',
  'be260520-a623-4534-803a-2cbddff79006',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 21 Oct 2019 22:16:17 GMT',
  'Connection',
  'close'
]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157169617795500769/copiedblob157169617828204310')
  .reply(202, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 21 Oct 2019 22:16:18 GMT',
  'ETag',
  '"0x8D756744BB85D5A"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b1b8da7a-f01e-00e8-4b5d-88ca62000000',
  'x-ms-client-request-id',
  'c57be1a9-f37e-4a10-92d0-ca97bfbfa918',
  'x-ms-version',
  '2019-02-02',
  'x-ms-copy-id',
  '0b77499f-1bf5-4f71-ad39-3d85b8356e27',
  'x-ms-copy-status',
  'success',
  'Date',
  'Mon, 21 Oct 2019 22:16:18 GMT',
  'Connection',
  'close'
]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157169617795500769/copiedblob157169617828204310')
  .reply(400, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>InvalidHeaderValue</Code><Message>The value for one of the HTTP headers is not in the correct format.\nRequestId:55c1a43b-c01e-0028-285d-88325c000000\nTime:2019-10-21T22:16:18.3358559Z</Message><HeaderName>x-ms-copy-source</HeaderName><HeaderValue>0b77499f-1bf5-4f71-ad39-3d85b8356e27</HeaderValue></Error>", [
  'Content-Length',
  '358',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '55c1a43b-c01e-0028-285d-88325c000000',
  'x-ms-client-request-id',
  'e12b9811-7646-40d6-963d-7e17da680d1d',
  'x-ms-version',
  '2019-02-02',
  'x-ms-error-code',
  'InvalidHeaderValue',
  'Date',
  'Mon, 21 Oct 2019 22:16:18 GMT',
  'Connection',
  'close'
]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container157169617795500769')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8e52528a-801e-00e2-375d-886ed5000000',
  'x-ms-client-request-id',
  '98a8b6cb-24fb-4dec-83d7-ab70943f4c46',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Mon, 21 Oct 2019 22:16:18 GMT',
  'Connection',
  'close'
]);

