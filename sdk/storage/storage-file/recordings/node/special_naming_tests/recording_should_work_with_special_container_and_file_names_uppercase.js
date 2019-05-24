let nock = require('nock');

module.exports.testInfo = {"Upper file empty another":"Upper file empty another155873390990707955"}

nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1share-with-dash155873390737006370/dir155873390737008456/Upper%20file%20empty%20another155873390990707955')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 24 May 2019 21:38:29 GMT',
  'ETag',
  '"0x8D6E09029B8AB86"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3337fb92-201a-0022-4c79-12f36e000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 24 May 2019 21:38:29 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/1share-with-dash155873390737006370/dir155873390737008456/Upper%20file%20empty%20another155873390990707955')
  .reply(200, "", [ 'Content-Length',
  '10',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Fri, 24 May 2019 21:38:29 GMT',
  'ETag',
  '"0x8D6E09029B8AB86"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '87100d40-901a-009a-8079-12119d000000',
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
  'Fri, 24 May 2019 21:38:31 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/1share-with-dash155873390737006370/dir155873390737008456')
  .query({"prefix":"Upper%20file%20empty%20another155873390990707955","restype":"directory","comp":"list"})
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://coolstorageaccount1234.file.core.windows.net/\" ShareName=\"1share-with-dash155873390737006370\" DirectoryPath=\"dir155873390737008456\"><Prefix>Upper file empty another155873390990707955</Prefix><Entries><File><Name>Upper file empty another155873390990707955</Name><Properties><Content-Length>10</Content-Length></Properties></File></Entries><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '055a79bc-301a-0036-1079-12300a000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 24 May 2019 21:38:31 GMT',
  'Connection',
  'close' ]);

