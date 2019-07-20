let nock = require('nock');

module.exports.testInfo = {"queue":"queue156360478862103335"}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue156360478862103335')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6fc3f334-1003-009b-38c5-3ef7a9000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Sat, 20 Jul 2019 06:39:48 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .post('/queue156360478862103335/messages', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>Hello World</MessageText></QueueMessage>")
  .query(true)
  .reply(201, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>fd69a678-d498-4402-a01c-499eeed73e76</MessageId><InsertionTime>Sat, 20 Jul 2019 06:39:49 GMT</InsertionTime><ExpirationTime>Sat, 27 Jul 2019 06:39:49 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAAO8nN7cU+1QE=</PopReceipt><TimeNextVisible>Sat, 20 Jul 2019 06:39:49 GMT</TimeNextVisible></QueueMessage></QueueMessagesList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0bded5ea-a003-00c6-77c5-3e07ad000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Sat, 20 Jul 2019 06:39:48 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue156360478862103335')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd0fe3c7a-b003-0037-49c5-3ed63e000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Sat, 20 Jul 2019 06:39:50 GMT',
  'Connection',
  'close' ]);

