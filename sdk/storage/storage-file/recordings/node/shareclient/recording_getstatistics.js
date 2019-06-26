let nock = require('nock');

module.exports.testInfo = {"share":"share156150559196705695"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156150559196705695')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 25 Jun 2019 23:33:12 GMT',
  'ETag',
  '"0x8D6F9C57D2F8C78"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9f3d8984-901a-0002-80ae-2b786b000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 25 Jun 2019 23:33:11 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156150559196705695')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><ShareStats><ShareUsage>0</ShareUsage></ShareStats>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '44d92648-201a-00dc-50ae-2b28c2000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 25 Jun 2019 23:33:12 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156150559196705695')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e5ce07ce-e01a-00e3-20ae-2b9f1e000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 25 Jun 2019 23:33:12 GMT',
  'Connection',
  'close' ]);

