let nock = require('nock');

module.exports.testInfo = {"file empty":"file empty156775327407700753"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1share-with-dash156775327320403860/dir156775327320401456/file%20empty156775327407700753')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 07:01:14 GMT',
  'ETag',
  '"0x8D7329801D9F1E9"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '50f9f90e-e01a-001d-4a80-64fa3f000000',
  'x-ms-client-request-id',
  'db702a97-4382-43cd-959d-9ba2ecabf8d5',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-06T07:01:14.3692777Z',
  'x-ms-file-last-write-time',
  '2019-09-06T07:01:14.3692777Z',
  'x-ms-file-creation-time',
  '2019-09-06T07:01:14.3692777Z',
  'x-ms-file-permission-key',
  '15082859266781889734*8787082347076103240',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '13835093239654252544',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 06 Sep 2019 07:01:14 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/1share-with-dash156775327320403860/dir156775327320401456')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.file.core.windows.net/\" ShareName=\"1share-with-dash156775327320403860\" DirectoryPath=\"dir156775327320401456\"><Prefix>file empty156775327407700753</Prefix><Entries><File><Name>file empty156775327407700753</Name><Properties><Content-Length>10</Content-Length></Properties></File></Entries><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'effc6279-b01a-011f-4d80-64ba8a000000',
  'x-ms-client-request-id',
  '07ac7bc9-917c-456d-a75e-f657859b09e7',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 06 Sep 2019 07:01:14 GMT',
  'Connection',
  'close' ]);

