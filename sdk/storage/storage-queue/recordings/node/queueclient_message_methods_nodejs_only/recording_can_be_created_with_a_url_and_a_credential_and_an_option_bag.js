let nock = require('nock');

module.exports.testInfo = {"queue":"queue156816840120701894"}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue156816840120701894')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1155bb18-c003-0024-2347-68ffb2000000',
  'x-ms-client-request-id',
  '07b38662-1b77-4d55-979e-914d853a2f62',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:20:00 GMT' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .post('/queue156816840120701894/messages', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>Hello World</MessageText></QueueMessage>")
  .query(true)
  .reply(201, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>3e14ea25-815a-46d8-ae6d-3564f0817468</MessageId><InsertionTime>Wed, 11 Sep 2019 02:20:01 GMT</InsertionTime><ExpirationTime>Wed, 18 Sep 2019 02:20:01 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAAJfm3akdo1QE=</PopReceipt><TimeNextVisible>Wed, 11 Sep 2019 02:20:01 GMT</TimeNextVisible></QueueMessage></QueueMessagesList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '209cd73c-1003-004b-6d47-685766000000',
  'x-ms-client-request-id',
  '866c9547-a6c2-49a9-81b2-684e5e627da5',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:20:01 GMT' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue156816840120701894')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8da75d25-5003-0047-2947-68b997000000',
  'x-ms-client-request-id',
  '3e0b56fe-b75e-4334-bdf7-887977e285b1',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:20:02 GMT' ]);

