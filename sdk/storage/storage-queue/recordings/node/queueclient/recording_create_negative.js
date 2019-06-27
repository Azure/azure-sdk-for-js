let nock = require('nock');

module.exports.testInfo = {"queue":"queue156149550267204766"}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue156149550267204766')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '32890353-c003-00b0-2096-2b8311000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 25 Jun 2019 20:45:02 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/%7BqueueName%7D')
  .query(true)
  .reply(400, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>InvalidResourceName</Code><Message>The specifed resource name contains invalid characters.\nRequestId:7a460779-2003-00d7-0596-2b30b6000000\nTime:2019-06-25T20:45:03.2328200Z</Message></Error>", [ 'Content-Length',
  '243',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7a460779-2003-00d7-0596-2b30b6000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-error-code',
  'InvalidResourceName',
  'Date',
  'Tue, 25 Jun 2019 20:45:02 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue156149550267204766')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd9aff997-3003-00ae-5196-2b59fc000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 25 Jun 2019 20:45:03 GMT',
  'Connection',
  'close' ]);

