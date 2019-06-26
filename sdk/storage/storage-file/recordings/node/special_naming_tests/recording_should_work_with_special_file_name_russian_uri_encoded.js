let nock = require('nock');

module.exports.testInfo = {"ру́сский язы́к":"ру́сский язы́к156150560981800780"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1share-with-dash156150560028600902/dir156150560028601268/%25D1%2580%25D1%2583%25CC%2581%25D1%2581%25D1%2581%25D0%25BA%25D0%25B8%25D0%25B9%2520%25D1%258F%25D0%25B7%25D1%258B%25CC%2581%25D0%25BA156150560981800780')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 25 Jun 2019 23:33:30 GMT',
  'ETag',
  '"0x8D6F9C587BB5388"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7cad3047-001a-0025-6cae-2be222000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 25 Jun 2019 23:33:29 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/1share-with-dash156150560028600902/dir156150560028601268/%25D1%2580%25D1%2583%25CC%2581%25D1%2581%25D1%2581%25D0%25BA%25D0%25B8%25D0%25B9%2520%25D1%258F%25D0%25B7%25D1%258B%25CC%2581%25D0%25BA156150560981800780')
  .reply(200, "", [ 'Content-Length',
  '10',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Tue, 25 Jun 2019 23:33:30 GMT',
  'ETag',
  '"0x8D6F9C587BB5388"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b6c2f69b-a01a-000a-39ae-2b6318000000',
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
  'Tue, 25 Jun 2019 23:33:29 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/1share-with-dash156150560028600902/dir156150560028601268')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.file.core.windows.net/\" ShareName=\"1share-with-dash156150560028600902\" DirectoryPath=\"dir156150560028601268\"><Prefix>%D1%80%D1%83%CC%81%D1%81%D1%81%D0%BA%D0%B8%D0%B9%20%D1%8F%D0%B7%D1%8B%CC%81%D0%BA156150560981800780</Prefix><Entries><File><Name>%D1%80%D1%83%CC%81%D1%81%D1%81%D0%BA%D0%B8%D0%B9%20%D1%8F%D0%B7%D1%8B%CC%81%D0%BA156150560981800780</Name><Properties><Content-Length>10</Content-Length></Properties></File></Entries><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1454c7d0-201a-007d-25ae-2be659000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 25 Jun 2019 23:33:30 GMT',
  'Connection',
  'close' ]);

