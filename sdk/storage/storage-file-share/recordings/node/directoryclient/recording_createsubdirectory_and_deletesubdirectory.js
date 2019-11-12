let nock = require('nock');

module.exports.testInfo = {"share":"share156816833889000219","dir":"dir156816833931003449","directory":"directory156816833974905953"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816833889000219')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:18:59 GMT',
  'ETag',
  '"0x8D7365E67CAF509"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '428c6d5f-c01a-0042-5647-684de8000000',
  'x-ms-client-request-id',
  'c27a5a5b-9718-455a-8574-816e69297e3e',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:18:58 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816833889000219/dir156816833931003449')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:18:59 GMT',
  'ETag',
  '"0x8D7365E680C7FA1"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '322d3601-a01a-001d-4247-68bf16000000',
  'x-ms-client-request-id',
  '67586f77-52be-4190-880c-e6f9f6be6fa3',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-11T02:18:59.6689825Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:18:59.6689825Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:18:59.6689825Z',
  'x-ms-file-permission-key',
  '15292852142319295125*13609941760923454748',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 11 Sep 2019 02:18:59 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816833889000219/dir156816833931003449/directory156816833974905953')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:19:00 GMT',
  'ETag',
  '"0x8D7365E6857C721"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2515c7f5-701a-0036-4947-68cbae000000',
  'x-ms-client-request-id',
  '669f35c1-ce7e-4bfe-9480-7adaeb28cf63',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-11T02:19:00.1623329Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:19:00.1623329Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:19:00.1623329Z',
  'x-ms-file-permission-key',
  '15292852142319295125*13609941760923454748',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835093239654252544',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 11 Sep 2019 02:18:59 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156816833889000219/dir156816833931003449/directory156816833974905953')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:19:00 GMT',
  'ETag',
  '"0x8D7365E6857C721"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '45dc1b09-401a-0017-6647-68a69f000000',
  'x-ms-client-request-id',
  'f5524ebc-3a95-40db-ae68-b6c91ad4c9af',
  'x-ms-version',
  '2019-02-02',
  'x-ms-server-encrypted',
  'true',
  'x-ms-meta-key',
  'value',
  'x-ms-file-change-time',
  '2019-09-11T02:19:00.1623329Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:19:00.1623329Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:19:00.1623329Z',
  'x-ms-file-permission-key',
  '15292852142319295125*13609941760923454748',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835093239654252544',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Last-Modified,ETag,x-ms-server-encrypted,x-ms-meta-key,x-ms-file-change-time,x-ms-file-last-write-time,x-ms-file-creation-time,x-ms-file-permission-key,x-ms-file-attributes,x-ms-file-id,x-ms-file-parent-id,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 11 Sep 2019 02:19:00 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156816833889000219/dir156816833931003449/directory156816833974905953')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ef509770-801a-000a-1347-687f75000000',
  'x-ms-client-request-id',
  'da1ec22a-6a53-48c6-aab3-5496a47aaf4b',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:19:00 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156816833889000219/dir156816833931003449/directory156816833974905953')
  .query(true)
  .reply(404, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>ResourceNotFound</Code><Message>The specified resource does not exist.\nRequestId:5fbd1d0b-c01a-0049-7947-68559c000000\nTime:2019-09-11T02:19:01.4844879Z</Message></Error>", [ 'Content-Length',
  '223',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5fbd1d0b-c01a-0049-7947-68559c000000',
  'x-ms-client-request-id',
  '36eb66a3-b164-4179-8d39-1828184aa70a',
  'x-ms-version',
  '2019-02-02',
  'x-ms-error-code',
  'ResourceNotFound',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 11 Sep 2019 02:19:00 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156816833889000219')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8ca535f6-e01a-0033-7147-683fd1000000',
  'x-ms-client-request-id',
  '0a5c34c5-7d94-4b3b-84e6-9be843f705d3',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:19:01 GMT' ]);

