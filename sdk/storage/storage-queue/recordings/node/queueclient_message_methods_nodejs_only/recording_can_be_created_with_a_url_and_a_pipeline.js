let nock = require('nock');

module.exports.testInfo = {"queue":"queue156816840244708804"}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue156816840244708804')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8bd0be5d-7003-001f-1c47-68bdec000000',
  'x-ms-client-request-id',
  '54412c49-73a5-4727-995c-f6e88c570141',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:20:02 GMT' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .post('/queue156816840244708804/messages', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>Hello World</MessageText></QueueMessage>")
  .query(true)
  .reply(201, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>5c22301b-a102-49b3-938f-d44543798e2a</MessageId><InsertionTime>Wed, 11 Sep 2019 02:20:03 GMT</InsertionTime><ExpirationTime>Wed, 18 Sep 2019 02:20:03 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAAFeFwa0do1QE=</PopReceipt><TimeNextVisible>Wed, 11 Sep 2019 02:20:03 GMT</TimeNextVisible></QueueMessage></QueueMessagesList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'cc180473-4003-0058-1e47-686287000000',
  'x-ms-client-request-id',
  '67ef3748-fe27-45d3-8d8f-30d5b81eb774',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:20:02 GMT' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue156816840244708804')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9dd77839-0003-0032-1947-683e2c000000',
  'x-ms-client-request-id',
  '56291066-99ec-4513-8c53-318d35d54ec0',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:20:03 GMT' ]);

