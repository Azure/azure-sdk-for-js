let nock = require('nock');

module.exports.testInfo = {"file empty":"file empty156767546867408646"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1share-with-dash156767546706905738/dir156767546706908324/file%20empty156767546867408646')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 05 Sep 2019 09:24:28 GMT',
  'ETag',
  '"0x8D731E2DA3209F0"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5d0bbe30-201a-0122-30cb-63cc91000000',
  'x-ms-client-request-id',
  'b358401c-18a3-4ce7-8e8b-9afa9f9dd19a',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-05T09:24:28.9296880Z',
  'x-ms-file-last-write-time',
  '2019-09-05T09:24:28.9296880Z',
  'x-ms-file-creation-time',
  '2019-09-05T09:24:28.9296880Z',
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
  'Thu, 05 Sep 2019 09:24:28 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/1share-with-dash156767546706905738/dir156767546706908324')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.file.core.windows.net/\" ShareName=\"1share-with-dash156767546706905738\" DirectoryPath=\"dir156767546706908324\"><Prefix>file empty156767546867408646</Prefix><Entries><File><Name>file empty156767546867408646</Name><Properties><Content-Length>10</Content-Length></Properties></File></Entries><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5b25ad9c-e01a-00e9-68cb-6331c9000000',
  'x-ms-client-request-id',
  'be3da64a-7bfd-46cd-8c53-3cb98ce995f3',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 05 Sep 2019 09:24:28 GMT',
  'Connection',
  'close' ]);

