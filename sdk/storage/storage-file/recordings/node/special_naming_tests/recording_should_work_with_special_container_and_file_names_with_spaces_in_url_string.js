let nock = require('nock');

module.exports.testInfo = {"file empty":"file empty156758484190608574"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1share-with-dash156758484024707760/dir156758484024801012/file%20empty156758484190608574')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 04 Sep 2019 08:14:02 GMT',
  'ETag',
  '"0x8D7310FD86BAA31"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1ff4ad8e-301a-0053-07f8-62d4b7000000',
  'x-ms-client-request-id',
  '0a3eebf2-0689-4339-a2c4-c03fadf33d10',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-04T08:14:02.1419569Z',
  'x-ms-file-last-write-time',
  '2019-09-04T08:14:02.1419569Z',
  'x-ms-file-creation-time',
  '2019-09-04T08:14:02.1419569Z',
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
  'Wed, 04 Sep 2019 08:14:01 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/1share-with-dash156758484024707760/dir156758484024801012')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.file.core.windows.net/\" ShareName=\"1share-with-dash156758484024707760\" DirectoryPath=\"dir156758484024801012\"><Prefix>file empty156758484190608574</Prefix><Entries><File><Name>file empty156758484190608574</Name><Properties><Content-Length>10</Content-Length></Properties></File></Entries><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '41e52492-201a-0140-6cf8-620eb6000000',
  'x-ms-client-request-id',
  '4c1c0770-80b4-4d91-aa04-cd579da33246',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 04 Sep 2019 08:14:01 GMT',
  'Connection',
  'close' ]);

