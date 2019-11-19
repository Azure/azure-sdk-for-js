let nock = require('nock');

module.exports.testInfo = {"queue":"queue156816833234203175"}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue156816833234203175')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '177bb091-1003-0026-1f47-68fd48000000',
  'x-ms-client-request-id',
  'dd2ad417-5b35-4573-b56b-38ace469c8e2',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:18:52 GMT' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .post('/queue156816833234203175/messages', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>Hello World</MessageText></QueueMessage>")
  .query(true)
  .reply(201, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>c78a1072-73f3-43c5-a7af-ccc6ca785313</MessageId><InsertionTime>Wed, 11 Sep 2019 02:18:53 GMT</InsertionTime><ExpirationTime>Wed, 18 Sep 2019 02:18:53 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAAE0CsQUdo1QE=</PopReceipt><TimeNextVisible>Wed, 11 Sep 2019 02:18:53 GMT</TimeNextVisible></QueueMessage></QueueMessagesList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e604d1ae-d003-0056-3947-688e8c000000',
  'x-ms-client-request-id',
  'de206321-4b3d-488e-831a-7fb7a7d1062c',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:18:52 GMT' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue156816833234203175')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '29c3ab08-3003-0018-1a47-684b69000000',
  'x-ms-client-request-id',
  '240c063c-5490-431d-97af-e05924d2714b',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:18:53 GMT' ]);

