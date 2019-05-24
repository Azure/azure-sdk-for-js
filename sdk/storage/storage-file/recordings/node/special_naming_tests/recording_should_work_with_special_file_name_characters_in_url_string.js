let nock = require('nock');

module.exports.testInfo = {"汉字. special ~!@#$%^&()_+`1234567890-={}[];','":"汉字. special ~!@#$%^&()_+`1234567890-={}[];','155873391872901525"}

nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1share-with-dash155873390737006370/dir155873390737008456/%E6%B1%89%E5%AD%97.%20special%20~!%40%23%24%25%5E%26()_%2B%601234567890-%3D%7B%7D%5B%5D%3B%27%2C%27155873391872901525')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 24 May 2019 21:38:38 GMT',
  'ETag',
  '"0x8D6E0902EEC57F6"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7171dfce-801a-0085-5379-12ca8d000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 24 May 2019 21:38:38 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/1share-with-dash155873390737006370/dir155873390737008456/%E6%B1%89%E5%AD%97.%20special%20~!%40%23%24%25%5E%26()_%2B%601234567890-%3D%7B%7D%5B%5D%3B%27%2C%27155873391872901525')
  .reply(200, "", [ 'Content-Length',
  '10',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Fri, 24 May 2019 21:38:38 GMT',
  'ETag',
  '"0x8D6E0902EEC57F6"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c76761bf-f01a-0020-3b79-12f194000000',
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
  'Fri, 24 May 2019 21:38:39 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/1share-with-dash155873390737006370/dir155873390737008456')
  .query({"prefix":"%E6%B1%89%E5%AD%97.%20special%20~%21%40%23%24%25%5E%26%28%29_%2B%601234567890-%3D%7B%7D%5B%5D%3B%27%2C%27155873391872901525","restype":"directory","comp":"list"})
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://coolstorageaccount1234.file.core.windows.net/\" ShareName=\"1share-with-dash155873390737006370\" DirectoryPath=\"dir155873390737008456\"><Prefix>汉字. special ~!@#$%^&amp;()_+`1234567890-={}[];','155873391872901525</Prefix><Entries><File><Name>汉字. special ~!@#$%^&amp;()_+`1234567890-={}[];','155873391872901525</Name><Properties><Content-Length>10</Content-Length></Properties></File></Entries><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c335ae80-701a-005c-7279-126ca1000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 24 May 2019 21:38:38 GMT',
  'Connection',
  'close' ]);

