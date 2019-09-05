let nock = require('nock');

module.exports.testInfo = {"file empty":"file empty156775327495409047"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1share-with-dash156775327320403860/dir156775327320401456/file%20empty156775327495409047')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 07:01:15 GMT',
  'ETag',
  '"0x8D73298025CFD73"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4ebf6317-301a-013e-6c80-649ef1000000',
  'x-ms-client-request-id',
  '71f2333c-d55a-4ef9-826b-6c156a285536',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-06T07:01:15.2280947Z',
  'x-ms-file-last-write-time',
  '2019-09-06T07:01:15.2280947Z',
  'x-ms-file-creation-time',
  '2019-09-06T07:01:15.2280947Z',
  'x-ms-file-permission-key',
  '15082859266781889734*8787082347076103240',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '13835163608398430208',
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
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.file.core.windows.net/\" ShareName=\"1share-with-dash156775327320403860\" DirectoryPath=\"dir156775327320401456\"><Prefix>file empty156775327495409047</Prefix><Entries><File><Name>file empty156775327495409047</Name><Properties><Content-Length>10</Content-Length></Properties></File></Entries><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3a869c22-d01a-004b-3d80-640bd0000000',
  'x-ms-client-request-id',
  '03ceeba4-2efb-4321-b378-551a62cddebb',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 06 Sep 2019 07:01:15 GMT',
  'Connection',
  'close' ]);

