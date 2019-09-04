let nock = require('nock');

module.exports.testInfo = {"file empty":"file empty156758484109906703"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1share-with-dash156758484024707760/dir156758484024801012/file%20empty156758484109906703')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 04 Sep 2019 08:14:01 GMT',
  'ETag',
  '"0x8D7310FD7F041CB"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c8fb7e64-901a-00f3-6af8-625016000000',
  'x-ms-client-request-id',
  'a079b98c-b51d-471c-816e-04038b11a1ec',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-04T08:14:01.3331915Z',
  'x-ms-file-last-write-time',
  '2019-09-04T08:14:01.3331915Z',
  'x-ms-file-creation-time',
  '2019-09-04T08:14:01.3331915Z',
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
  'Wed, 04 Sep 2019 08:14:00 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/1share-with-dash156758484024707760/dir156758484024801012')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.file.core.windows.net/\" ShareName=\"1share-with-dash156758484024707760\" DirectoryPath=\"dir156758484024801012\"><Prefix>file empty156758484109906703</Prefix><Entries><File><Name>file empty156758484109906703</Name><Properties><Content-Length>10</Content-Length></Properties></File></Entries><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e57f42f5-601a-0061-0df8-62d4c0000000',
  'x-ms-client-request-id',
  '0fb76508-cde0-4a11-9caa-08ce92354536',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 04 Sep 2019 08:14:00 GMT',
  'Connection',
  'close' ]);

