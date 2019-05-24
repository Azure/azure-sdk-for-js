let nock = require('nock');

module.exports.testInfo = {"share":"share155873390338308266"}

nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share155873390338308266')
  .query({"restype":"share"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 24 May 2019 21:38:23 GMT',
  'ETag',
  '"0x8D6E09025D624AF"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4327bc2e-301a-009c-2b79-12e6e5000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 24 May 2019 21:38:23 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share155873390338308266')
  .query({"restype":"share","comp":"stats"})
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><ShareStats><ShareUsage>0</ShareUsage></ShareStats>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8c0db522-801a-0060-4579-12d87a000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 24 May 2019 21:38:23 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share155873390338308266')
  .query({"restype":"share"})
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '90416ee6-401a-0010-1779-12abbe000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 24 May 2019 21:38:23 GMT',
  'Connection',
  'close' ]);

