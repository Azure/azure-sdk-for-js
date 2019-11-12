let nock = require('nock');

module.exports.testInfo = {"queue":"queue156816839999008854"}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue156816839999008854')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9dd7756d-0003-0032-3e47-683e2c000000',
  'x-ms-client-request-id',
  'e47661b0-1d83-41f0-b8ef-7fb2fe86db75',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:20:00 GMT' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .post('/queue156816839999008854/messages', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>Hello World</MessageText></QueueMessage>")
  .query(true)
  .reply(201, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>a9316138-f9e2-4d6a-8515-00b551c13688</MessageId><InsertionTime>Wed, 11 Sep 2019 02:20:00 GMT</InsertionTime><ExpirationTime>Wed, 18 Sep 2019 02:20:00 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAArlX6aUdo1QE=</PopReceipt><TimeNextVisible>Wed, 11 Sep 2019 02:20:00 GMT</TimeNextVisible></QueueMessage></QueueMessagesList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6be268ea-f003-0063-0347-6820d9000000',
  'x-ms-client-request-id',
  '350ab871-cf7c-49be-8630-c7c3b9b5c502',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:20:00 GMT' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue156816839999008854')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8a333037-6003-0029-2947-6810be000000',
  'x-ms-client-request-id',
  '9aec94a0-c416-4b00-94a7-335cfbb59e6b',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:20:00 GMT' ]);

