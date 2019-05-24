let nock = require('nock');

module.exports.testInfo = {"file empty":"file empty155873390821603980"}

nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1share-with-dash155873390737006370/dir155873390737008456/file%20empty155873390821603980')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 24 May 2019 21:38:28 GMT',
  'ETag',
  '"0x8D6E09028B60022"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7ec771fe-d01a-0037-3f79-1231f7000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 24 May 2019 21:38:27 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/1share-with-dash155873390737006370/dir155873390737008456')
  .query({"prefix":"file%20empty155873390821603980","restype":"directory","comp":"list"})
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://coolstorageaccount1234.file.core.windows.net/\" ShareName=\"1share-with-dash155873390737006370\" DirectoryPath=\"dir155873390737008456\"><Prefix>file empty155873390821603980</Prefix><Entries><File><Name>file empty155873390821603980</Name><Properties><Content-Length>10</Content-Length></Properties></File></Entries><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a8e2319f-501a-0087-5579-12c877000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 24 May 2019 21:38:28 GMT',
  'Connection',
  'close' ]);

