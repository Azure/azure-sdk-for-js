let nock = require('nock');

module.exports.testInfo = {"عربيعربى":"عربيعربى155873393011209720"}

nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1share-with-dash155873390737006370/dir155873390737008456/%D8%B9%D8%B1%D8%A8%D9%8A%D8%B9%D8%B1%D8%A8%D9%89155873393011209720')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 24 May 2019 21:38:52 GMT',
  'ETag',
  '"0x8D6E090372917EE"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bf66bdc8-e01a-001d-1179-1244b2000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 24 May 2019 21:38:51 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/1share-with-dash155873390737006370/dir155873390737008456/%D8%B9%D8%B1%D8%A8%D9%8A%D8%B9%D8%B1%D8%A8%D9%89155873393011209720')
  .reply(200, "", [ 'Content-Length',
  '10',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Fri, 24 May 2019 21:38:52 GMT',
  'ETag',
  '"0x8D6E090372917EE"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2a0666bd-201a-006d-0579-123776000000',
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
  'Fri, 24 May 2019 21:38:52 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/1share-with-dash155873390737006370/dir155873390737008456')
  .query({"prefix":"%D8%B9%D8%B1%D8%A8%D9%8A%D8%B9%D8%B1%D8%A8%D9%89155873393011209720","restype":"directory","comp":"list"})
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://coolstorageaccount1234.file.core.windows.net/\" ShareName=\"1share-with-dash155873390737006370\" DirectoryPath=\"dir155873390737008456\"><Prefix>عربيعربى155873393011209720</Prefix><Entries><File><Name>عربيعربى155873393011209720</Name><Properties><Content-Length>10</Content-Length></Properties></File></Entries><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '22c6c188-701a-0031-4b79-12c68f000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 24 May 2019 21:38:53 GMT',
  'Connection',
  'close' ]);

