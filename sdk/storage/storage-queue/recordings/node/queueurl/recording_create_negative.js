let nock = require('nock');

module.exports.testInfo = {"queue":"queue156758134287700683"}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue156758134287700683')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3dc92d0c-6003-011c-6df0-625bee000000',
  'x-ms-client-request-id',
  '57895fdd-e2d4-44e0-a1de-49a7f85f4bef',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 07:15:42 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/%7BqueueName%7D')
  .query(true)
  .reply(400, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>InvalidResourceName</Code><Message>The specifed resource name contains invalid characters.\nRequestId:ecd4602b-2003-0150-4ef0-62cbde000000\nTime:2019-09-04T07:15:43.5505857Z</Message></Error>", [ 'Content-Length',
  '243',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ecd4602b-2003-0150-4ef0-62cbde000000',
  'x-ms-client-request-id',
  '96a33820-2ed4-4761-83e5-39f0b41b60c3',
  'x-ms-version',
  '2019-02-02',
  'x-ms-error-code',
  'InvalidResourceName',
  'Date',
  'Wed, 04 Sep 2019 07:15:43 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue156758134287700683')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '78567ead-1003-00fd-5bf0-6279a6000000',
  'x-ms-client-request-id',
  '0563c1c5-43ad-4919-97dd-d23b6f0d24bd',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 07:15:43 GMT',
  'Connection',
  'close' ]);

