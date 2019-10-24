let nock = require('nock');

module.exports.testInfo = {"汉字. special ~!@#$%^&()_+`1234567890-={}[];','":"汉字. special ~!@#$%^&()_+`1234567890-={}[];','156816848864808072"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1share-with-dash156816847736706857/%E6%B1%89%E5%AD%97.%20special%20~!%40%23%24%25%5E%26()_%2B%601234567890-%3D%7B%7D%5B%5D%3B%27%2C%27156816848864808072')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:21:28 GMT',
  'ETag',
  '"0x8D7365EC10D1726"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8fd169d9-d01a-003b-2247-6824a2000000',
  'x-ms-client-request-id',
  '953cf3c3-40de-45d4-9cfe-eeed651d20ea',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-11T02:21:28.9900838Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:21:28.9900838Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:21:28.9900838Z',
  'x-ms-file-permission-key',
  '15292852142319295125*13609941760923454748',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835172404491452416',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 11 Sep 2019 02:21:28 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/1share-with-dash156816847736706857/%E6%B1%89%E5%AD%97.%20special%20~!%40%23%24%25%5E%26()_%2B%601234567890-%3D%7B%7D%5B%5D%3B%27%2C%27156816848864808072')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:21:28 GMT',
  'ETag',
  '"0x8D7365EC10D1726"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c659ba50-401a-0053-5047-687af3000000',
  'x-ms-client-request-id',
  'b0a1c358-31f2-429b-a466-3274fa9acbb4',
  'x-ms-version',
  '2019-02-02',
  'x-ms-server-encrypted',
  'true',
  'x-ms-file-change-time',
  '2019-09-11T02:21:28.9900838Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:21:28.9900838Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:21:28.9900838Z',
  'x-ms-file-permission-key',
  '15292852142319295125*13609941760923454748',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835172404491452416',
  'x-ms-file-parent-id',
  '0',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Last-Modified,ETag,x-ms-server-encrypted,x-ms-file-change-time,x-ms-file-last-write-time,x-ms-file-creation-time,x-ms-file-permission-key,x-ms-file-attributes,x-ms-file-id,x-ms-file-parent-id,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 11 Sep 2019 02:21:29 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/1share-with-dash156816847736706857/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.file.core.windows.net/\" ShareName=\"1share-with-dash156816847736706857\" DirectoryPath=\"\"><Prefix>汉字. special ~!@#$%^&amp;()_+`1234567890-={}[];','156816848864808072</Prefix><Entries><Directory><Name>汉字. special ~!@#$%^&amp;()_+`1234567890-={}[];','156816848864808072</Name><Properties /></Directory></Entries><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '34cc930a-601a-004f-0847-68a2e4000000',
  'x-ms-client-request-id',
  'e9351714-afcd-4742-bd94-9182e5593f30',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 11 Sep 2019 02:21:29 GMT' ]);

