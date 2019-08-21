let nock = require('nock');

module.exports.testInfo = {"Upper file empty another":"Upper file empty another156404681936905435"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1share-with-dash156404681754601015/dir156404681754608627/Upper%20file%20empty%20another156404681936905435')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 25 Jul 2019 09:23:21 GMT',
  'ETag',
  '"0x8D710E1BC9B87C1"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '50fc5641-001a-0027-48ca-42a4df000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 25 Jul 2019 09:23:20 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/1share-with-dash156404681754601015/dir156404681754608627/Upper%20file%20empty%20another156404681936905435')
  .reply(200, "", [ 'Content-Length',
  '10',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Thu, 25 Jul 2019 09:23:21 GMT',
  'ETag',
  '"0x8D710E1BC9B87C1"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e0584f7c-401a-0106-37ca-428fbb000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-type',
  'File',
  'x-ms-server-encrypted',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-type,x-ms-server-encrypted,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 25 Jul 2019 09:23:21 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/1share-with-dash156404681754601015/dir156404681754608627')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.file.core.windows.net/\" ShareName=\"1share-with-dash156404681754601015\" DirectoryPath=\"dir156404681754608627\"><Prefix>Upper file empty another156404681936905435</Prefix><Entries><File><Name>Upper file empty another156404681936905435</Name><Properties><Content-Length>10</Content-Length></Properties></File></Entries><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '475942e5-f01a-0039-33ca-427e32000000',
  'x-ms-version',
  '2018-11-09',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 25 Jul 2019 09:23:21 GMT',
  'Connection',
  'close' ]);

