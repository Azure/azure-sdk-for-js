let nock = require('nock');

module.exports.testInfo = {"汉字. special ~!@#$%^&()_+`1234567890-={}[];','":"汉字. special ~!@#$%^&()_+`1234567890-={}[];','155873391980108928"}

nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1share-with-dash155873390737006370/%E6%B1%89%E5%AD%97.%20special%20~!%40%23%24%25%5E%26()_%2B%601234567890-%3D%7B%7D%5B%5D%3B%27%2C%27155873391980108928')
  .query({"restype":"directory"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 24 May 2019 21:38:39 GMT',
  'ETag',
  '"0x8D6E0902F97F9BC"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd2870e7c-601a-0048-1a79-12afc5000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 24 May 2019 21:38:39 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/1share-with-dash155873390737006370/%E6%B1%89%E5%AD%97.%20special%20~!%40%23%24%25%5E%26()_%2B%601234567890-%3D%7B%7D%5B%5D%3B%27%2C%27155873391980108928')
  .query({"restype":"directory"})
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 24 May 2019 21:38:39 GMT',
  'ETag',
  '"0x8D6E0902F97F9BC"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ce20dc80-e01a-0070-7279-12ee9c000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-server-encrypted',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Last-Modified,ETag,x-ms-server-encrypted,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 24 May 2019 21:38:39 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/1share-with-dash155873390737006370/')
  .query({"prefix":"%E6%B1%89%E5%AD%97.%20special%20~%21%40%23%24%25%5E%26%28%29_%2B%601234567890-%3D%7B%7D%5B%5D%3B%27%2C%27155873391980108928","restype":"directory","comp":"list"})
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://coolstorageaccount1234.file.core.windows.net/\" ShareName=\"1share-with-dash155873390737006370\" DirectoryPath=\"\"><Prefix>汉字. special ~!@#$%^&amp;()_+`1234567890-={}[];','155873391980108928</Prefix><Entries><Directory><Name>汉字. special ~!@#$%^&amp;()_+`1234567890-={}[];','155873391980108928</Name><Properties /></Directory></Entries><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '57bdde07-601a-000c-2c79-1273a9000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 24 May 2019 21:38:40 GMT',
  'Connection',
  'close' ]);

