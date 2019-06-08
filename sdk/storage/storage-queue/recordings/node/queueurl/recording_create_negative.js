let nock = require('nock');

module.exports.testInfo = {"queue":"queue155996389035509837"}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue155996389035509837')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b17ffbbe-6003-002e-70a8-1d1d9f000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Sat, 08 Jun 2019 03:18:09 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/%7BqueueName%7D')
  .query(true)
  .reply(400, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>InvalidResourceName</Code><Message>The specifed resource name contains invalid characters.\nRequestId:3d0f3b2d-8003-0060-2aa8-1dd87a000000\nTime:2019-06-08T03:18:10.5694271Z</Message></Error>", [ 'Content-Length',
  '243',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3d0f3b2d-8003-0060-2aa8-1dd87a000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-error-code',
  'InvalidResourceName',
  'Date',
  'Sat, 08 Jun 2019 03:18:09 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue155996389035509837')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '336b7cd7-7003-005c-76a8-1d6ca1000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Sat, 08 Jun 2019 03:18:10 GMT',
  'Connection',
  'close' ]);

