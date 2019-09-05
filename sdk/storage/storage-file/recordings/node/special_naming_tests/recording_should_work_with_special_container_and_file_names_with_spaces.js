let nock = require('nock');

module.exports.testInfo = {"file empty":"file empty156767546786808839"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1share-with-dash156767546706905738/dir156767546706908324/file%20empty156767546786808839')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 05 Sep 2019 09:24:28 GMT',
  'ETag',
  '"0x8D731E2D9B78C22"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '553f99e2-201a-003d-44cb-638198000000',
  'x-ms-client-request-id',
  '6e4324fe-f908-4058-a200-e94965b3489a',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-05T09:24:28.1269282Z',
  'x-ms-file-last-write-time',
  '2019-09-05T09:24:28.1269282Z',
  'x-ms-file-creation-time',
  '2019-09-05T09:24:28.1269282Z',
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
  'Thu, 05 Sep 2019 09:24:27 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/1share-with-dash156767546706905738/dir156767546706908324')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.file.core.windows.net/\" ShareName=\"1share-with-dash156767546706905738\" DirectoryPath=\"dir156767546706908324\"><Prefix>file empty156767546786808839</Prefix><Entries><File><Name>file empty156767546786808839</Name><Properties><Content-Length>10</Content-Length></Properties></File></Entries><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5f261313-d01a-0016-71cb-630154000000',
  'x-ms-client-request-id',
  '9e527dcc-d7d0-4744-a723-64706a641445',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 05 Sep 2019 09:24:27 GMT',
  'Connection',
  'close' ]);

