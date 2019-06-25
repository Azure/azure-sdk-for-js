let nock = require('nock');

module.exports.testInfo = {"queue":"queue156149554574307815"}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue156149554574307815')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f0e5377c-8003-003f-4e96-2bcd4d000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 25 Jun 2019 20:45:45 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .post('/queue156149554574307815/messages', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>Hello World</MessageText></QueueMessage>")
  .query(true)
  .reply(201, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>134b78ff-bd04-4e05-b7fe-2bebcb5167ea</MessageId><InsertionTime>Tue, 25 Jun 2019 20:45:46 GMT</InsertionTime><ExpirationTime>Tue, 02 Jul 2019 20:45:46 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAAIlrf9pYr1QE=</PopReceipt><TimeNextVisible>Tue, 25 Jun 2019 20:45:46 GMT</TimeNextVisible></QueueMessage></QueueMessagesList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '878b64b8-a003-00cd-4a96-2b1fd9000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 25 Jun 2019 20:45:45 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue156149554574307815')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a2a03d96-9003-0002-2a96-2b786b000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 25 Jun 2019 20:45:47 GMT',
  'Connection',
  'close' ]);

