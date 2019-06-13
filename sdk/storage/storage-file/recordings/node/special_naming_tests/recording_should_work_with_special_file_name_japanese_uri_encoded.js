let nock = require('nock');

module.exports.testInfo = {"にっぽんごにほんご":"にっぽんごにほんご156044271207406461"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1share-with-dash156044269664801914/dir156044269664809734/%25E3%2581%25AB%25E3%2581%25A3%25E3%2581%25BD%25E3%2582%2593%25E3%2581%2594%25E3%2581%25AB%25E3%2581%25BB%25E3%2582%2593%25E3%2581%2594156044271207406461')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 13 Jun 2019 09:18:17 GMT',
  'ETag',
  '"0x8D6EFE011D7008A"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '135142b4-201a-0093-35c8-21ecda000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 13 Jun 2019 09:18:16 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/1share-with-dash156044269664801914/dir156044269664809734/%25E3%2581%25AB%25E3%2581%25A3%25E3%2581%25BD%25E3%2582%2593%25E3%2581%2594%25E3%2581%25AB%25E3%2581%25BB%25E3%2582%2593%25E3%2581%2594156044271207406461')
  .reply(200, "", [ 'Content-Length',
  '10',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Thu, 13 Jun 2019 09:18:17 GMT',
  'ETag',
  '"0x8D6EFE011D7008A"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '68dd817a-201a-001b-69c8-215403000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-type',
  'File',
  'x-ms-server-encrypted',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-type,x-ms-server-encrypted,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 13 Jun 2019 09:18:17 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/1share-with-dash156044269664801914/dir156044269664809734')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.file.core.windows.net/\" ShareName=\"1share-with-dash156044269664801914\" DirectoryPath=\"dir156044269664809734\"><Prefix>%E3%81%AB%E3%81%A3%E3%81%BD%E3%82%93%E3%81%94%E3%81%AB%E3%81%BB%E3%82%93%E3%81%94156044271207406461</Prefix><Entries><File><Name>%E3%81%AB%E3%81%A3%E3%81%BD%E3%82%93%E3%81%94%E3%81%AB%E3%81%BB%E3%82%93%E3%81%94156044271207406461</Name><Properties><Content-Length>10</Content-Length></Properties></File></Entries><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '27fbb449-001a-002e-35c8-21fa56000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 13 Jun 2019 09:18:16 GMT',
  'Connection',
  'close' ]);

