let nock = require('nock');

module.exports.testInfo = {"container":"container156150806267605063"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156150806267605063')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 26 Jun 2019 00:14:22 GMT',
  'ETag',
  '"0x8D6F9CB3DC18D55"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8c5326c6-f01e-00b8-7db4-2b9862000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Wed, 26 Jun 2019 00:14:22 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container156150806267605063')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><SignedIdentifiers />", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Last-Modified',
  'Wed, 26 Jun 2019 00:14:22 GMT',
  'ETag',
  '"0x8D6F9CB3DC18D55"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1fd48cde-d01e-00e0-4db4-2b9c19000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Last-Modified,ETag,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 26 Jun 2019 00:14:22 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156150806267605063')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ce60465b-701e-0065-5fb4-2bcbcc000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Wed, 26 Jun 2019 00:14:22 GMT',
  'Connection',
  'close' ]);

