let nock = require('nock');

module.exports.testInfo = {"queue":"queue156029727201409599"}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue156029727201409599')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ddbf09a9-1003-00d4-75b1-2033b1000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 11 Jun 2019 23:54:31 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/%7BqueueName%7D')
  .query(true)
  .reply(400, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>InvalidResourceName</Code><Message>The specifed resource name contains invalid characters.\nRequestId:bcc89417-6003-00db-2eb1-20de47000000\nTime:2019-06-11T23:54:32.5668511Z</Message></Error>", [ 'Content-Length',
  '243',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bcc89417-6003-00db-2eb1-20de47000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-error-code',
  'InvalidResourceName',
  'Date',
  'Tue, 11 Jun 2019 23:54:31 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue156029727201409599')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '282b1585-a003-0067-42b1-20c936000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 11 Jun 2019 23:54:32 GMT',
  'Connection',
  'close' ]);

