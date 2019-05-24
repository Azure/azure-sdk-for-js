let nock = require('nock');

module.exports.testInfo = {"にっぽんごにほんご":"にっぽんごにほんご155873393360100683"}

nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1share-with-dash155873390737006370/dir155873390737008456/%25E3%2581%25AB%25E3%2581%25A3%25E3%2581%25BD%25E3%2582%2593%25E3%2581%2594%25E3%2581%25AB%25E3%2581%25BB%25E3%2582%2593%25E3%2581%2594155873393360100683')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 24 May 2019 21:38:53 GMT',
  'ETag',
  '"0x8D6E09037D6DCF5"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b3cd2ff9-e01a-0059-3e79-1298de000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 24 May 2019 21:38:53 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/1share-with-dash155873390737006370/dir155873390737008456/%25E3%2581%25AB%25E3%2581%25A3%25E3%2581%25BD%25E3%2582%2593%25E3%2581%2594%25E3%2581%25AB%25E3%2581%25BB%25E3%2582%2593%25E3%2581%2594155873393360100683')
  .reply(200, "", [ 'Content-Length',
  '10',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Fri, 24 May 2019 21:38:53 GMT',
  'ETag',
  '"0x8D6E09037D6DCF5"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e311002a-001a-0094-5c79-12fd96000000',
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
  'Fri, 24 May 2019 21:38:53 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/1share-with-dash155873390737006370/dir155873390737008456')
  .query({"prefix":"%25E3%2581%25AB%25E3%2581%25A3%25E3%2581%25BD%25E3%2582%2593%25E3%2581%2594%25E3%2581%25AB%25E3%2581%25BB%25E3%2582%2593%25E3%2581%2594155873393360100683","restype":"directory","comp":"list"})
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://coolstorageaccount1234.file.core.windows.net/\" ShareName=\"1share-with-dash155873390737006370\" DirectoryPath=\"dir155873390737008456\"><Prefix>%E3%81%AB%E3%81%A3%E3%81%BD%E3%82%93%E3%81%94%E3%81%AB%E3%81%BB%E3%82%93%E3%81%94155873393360100683</Prefix><Entries><File><Name>%E3%81%AB%E3%81%A3%E3%81%BD%E3%82%93%E3%81%94%E3%81%AB%E3%81%BB%E3%82%93%E3%81%94155873393360100683</Name><Properties><Content-Length>10</Content-Length></Properties></File></Entries><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '885982e8-901a-0030-1579-12c772000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 24 May 2019 21:38:58 GMT',
  'Connection',
  'close' ]);

