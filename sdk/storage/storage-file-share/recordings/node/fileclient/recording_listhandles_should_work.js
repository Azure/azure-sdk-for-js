let nock = require('nock');

module.exports.testInfo = {"share":"share156816841193907191","dir":"dir156816841236206249","file":"file156816841279300669"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816841193907191')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:20:12 GMT',
  'ETag',
  '"0x8D7365E9355A9C7"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a53a297e-501a-004c-4c47-68a1e3000000',
  'x-ms-client-request-id',
  'ee4bdafe-5a62-4508-921d-5500742b16fd',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:20:12 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816841193907191/dir156816841236206249')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:20:12 GMT',
  'ETag',
  '"0x8D7365E93961D03"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ddf4b34e-701a-003d-3147-68d3da000000',
  'x-ms-client-request-id',
  '5060b917-ff7e-43b2-a12b-d8fdbccc6846',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-11T02:20:12.7128835Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:20:12.7128835Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:20:12.7128835Z',
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
  'Wed, 11 Sep 2019 02:20:12 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816841193907191/dir156816841236206249/file156816841279300669')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:20:13 GMT',
  'ETag',
  '"0x8D7365E93D79EC5"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ddf4b350-701a-003d-3247-68d3da000000',
  'x-ms-client-request-id',
  'eb20f073-6144-4759-9f92-4ec42b53d5b9',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-11T02:20:13.1421893Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:20:13.1421893Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:20:13.1421893Z',
  'x-ms-file-permission-key',
  '1459396823544571282*13609941760923454748',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 11 Sep 2019 02:20:12 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156816841193907191/dir156816841236206249/file156816841279300669')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults><Entries /><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '81abde81-801a-0067-5947-68d55b000000',
  'x-ms-client-request-id',
  '5fad9809-d072-4eb5-9fce-0e378945d75d',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 11 Sep 2019 02:20:13 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156816841193907191')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '700efd79-901a-001e-1d47-68bc11000000',
  'x-ms-client-request-id',
  '36b6aa17-8dd9-4b1e-9de4-512dede93e8c',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:20:13 GMT' ]);

