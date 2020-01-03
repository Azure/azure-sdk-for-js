let nock = require('nock');

module.exports.testInfo = {"queue":"queue156816840489001673"}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue156816840489001673')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '115edbfc-e003-005e-3c47-6895ff000000',
  'x-ms-client-request-id',
  'cb6e87ca-d976-4c92-8df2-a4db1b9e7f61',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:20:05 GMT' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .post('/queue156816840489001673/messages', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>Hello World</MessageText></QueueMessage>")
  .query(true)
  .reply(201, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>672f9a3f-33db-40a7-aef9-72a293c38162</MessageId><InsertionTime>Wed, 11 Sep 2019 02:20:05 GMT</InsertionTime><ExpirationTime>Wed, 18 Sep 2019 02:20:05 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAASNrrbEdo1QE=</PopReceipt><TimeNextVisible>Wed, 11 Sep 2019 02:20:05 GMT</TimeNextVisible></QueueMessage></QueueMessagesList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4ea9fda0-5003-004c-4247-68a1e3000000',
  'x-ms-client-request-id',
  '2fb183ba-fa16-4183-a6f2-93bedd468cce',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:20:05 GMT' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue156816840489001673')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '35b99db8-c003-002f-3d47-68e7c6000000',
  'x-ms-client-request-id',
  '3890bc8a-983c-43b9-a65a-55ff7e1d947f',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:20:05 GMT' ]);

