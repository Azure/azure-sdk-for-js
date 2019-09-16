let nock = require('nock');

module.exports.testInfo = {"queue":"queue156816838758900464"}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue156816838758900464')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'fe7aae33-9003-0051-5647-687809000000',
  'x-ms-client-request-id',
  '042fc897-0ef0-431f-8854-cfb4a5af7675',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:19:47 GMT' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .post('/queue156816838758900464/messages', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>Hello World</MessageText></QueueMessage>")
  .query(true)
  .reply(201, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>57b41fd5-8054-460d-818f-35865e6709a7</MessageId><InsertionTime>Wed, 11 Sep 2019 02:19:48 GMT</InsertionTime><ExpirationTime>Wed, 18 Sep 2019 02:19:48 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAA6wScYkdo1QE=</PopReceipt><TimeNextVisible>Wed, 11 Sep 2019 02:19:48 GMT</TimeNextVisible></QueueMessage></QueueMessagesList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '209cc931-1003-004b-3947-685766000000',
  'x-ms-client-request-id',
  'c5b800a6-036b-477d-bd1f-3208632acd89',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:19:48 GMT' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue156816838758900464')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '341e963b-2003-0025-4847-68fe4f000000',
  'x-ms-client-request-id',
  '092d3332-58a9-4cb5-8b90-5eced5597ad2',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:19:48 GMT' ]);

