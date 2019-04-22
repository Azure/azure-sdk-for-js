let nock = require('nock');

module.exports.testInfo = {"queue":"queue155596607254207357"}

nock('https://coolstorageaccount1234.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue155596607254207357')
  .query({"timeout":"30"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0e7daf23-3003-0079-734c-f9f412000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Mon, 22 Apr 2019 20:47:52 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/%7BqueueName%7D')
  .query({"timeout":"30"})
  .reply(400, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>InvalidResourceName</Code><Message>The specifed resource name contains invalid characters.\nRequestId:30ef5845-d003-001e-6c4c-f947b5000000\nTime:2019-04-22T20:47:53.3393606Z</Message></Error>", [ 'Content-Length',
  '243',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '30ef5845-d003-001e-6c4c-f947b5000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-error-code',
  'InvalidResourceName',
  'Date',
  'Mon, 22 Apr 2019 20:47:52 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue155596607254207357')
  .query({"timeout":"30"})
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '57cb0c88-3003-005b-6b4c-f99a24000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Mon, 22 Apr 2019 20:47:52 GMT',
  'Connection',
  'close' ]);
