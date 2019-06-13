let nock = require('nock');

module.exports.testInfo = {"汉字. special ~!@#$%^&()_+`1234567890-={}[];','":"汉字. special ~!@#$%^&()_+`1234567890-={}[];','156044270303909096"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1share-with-dash156044269664801914/dir156044269664809734/%E6%B1%89%E5%AD%97.%20special%20~!%40%23%24%25%5E%26()_%2B%601234567890-%3D%7B%7D%5B%5D%3B%27%2C%27156044270303909096')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 13 Jun 2019 09:18:08 GMT',
  'ETag',
  '"0x8D6EFE00C778926"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1cc86e24-f01a-0091-28c8-21ee20000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 13 Jun 2019 09:18:07 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/1share-with-dash156044269664801914/dir156044269664809734/%E6%B1%89%E5%AD%97.%20special%20~!%40%23%24%25%5E%26()_%2B%601234567890-%3D%7B%7D%5B%5D%3B%27%2C%27156044270303909096')
  .reply(200, "", [ 'Content-Length',
  '10',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Thu, 13 Jun 2019 09:18:08 GMT',
  'ETag',
  '"0x8D6EFE00C778926"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3ca24a47-f01a-00b8-18c8-219862000000',
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
  'Thu, 13 Jun 2019 09:18:08 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/1share-with-dash156044269664801914/dir156044269664809734')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.file.core.windows.net/\" ShareName=\"1share-with-dash156044269664801914\" DirectoryPath=\"dir156044269664809734\"><Prefix>汉字. special ~!@#$%^&amp;()_+`1234567890-={}[];','156044270303909096</Prefix><Entries><File><Name>汉字. special ~!@#$%^&amp;()_+`1234567890-={}[];','156044270303909096</Name><Properties><Content-Length>10</Content-Length></Properties></File></Entries><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd00ca85a-301a-0004-4dc8-218f13000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 13 Jun 2019 09:18:08 GMT',
  'Connection',
  'close' ]);

