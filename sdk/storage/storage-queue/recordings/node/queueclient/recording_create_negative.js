let nock = require('nock');

module.exports.testInfo = {"queue":"queue156816834249207913"}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue156816834249207913')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8a67be0b-8003-0001-2947-686701000000',
  'x-ms-client-request-id',
  '3ab84c17-2e46-4b48-98c9-af404b458fec',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:19:01 GMT' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/%7BqueueName%7D')
  .query(true)
  .reply(400, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>InvalidResourceName</Code><Message>The specifed resource name contains invalid characters.\nRequestId:d341d237-a003-001d-2147-68bf16000000\nTime:2019-09-11T02:19:03.2530095Z</Message></Error>", [ 'Content-Length',
  '243',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd341d237-a003-001d-2147-68bf16000000',
  'x-ms-client-request-id',
  '9d2df657-6111-4b49-8e2b-7f8f148e948e',
  'x-ms-version',
  '2019-02-02',
  'x-ms-error-code',
  'InvalidResourceName',
  'Date',
  'Wed, 11 Sep 2019 02:19:02 GMT' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue156816834249207913')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3bdaf4e5-9003-003c-1d47-68d227000000',
  'x-ms-client-request-id',
  '1985138f-ed2f-41ba-83e8-c18e0e5326c7',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:19:02 GMT' ]);

