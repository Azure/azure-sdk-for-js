let nock = require('nock');

module.exports.testInfo = {"queue":"queue156360218969205349"}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue156360218969205349')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4e603986-2003-00dc-1fbf-3e28c2000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Sat, 20 Jul 2019 05:56:29 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .post('/queue156360218969205349/messages', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>Hello World</MessageText></QueueMessage>")
  .query(true)
  .reply(201, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>f689236f-67ef-4eac-92c1-c91041c6d7ae</MessageId><InsertionTime>Sat, 20 Jul 2019 05:56:30 GMT</InsertionTime><ExpirationTime>Sat, 27 Jul 2019 05:56:30 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAASjGQ4L8+1QE=</PopReceipt><TimeNextVisible>Sat, 20 Jul 2019 05:56:30 GMT</TimeNextVisible></QueueMessage></QueueMessagesList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '85ba72f6-9003-00ec-7cbf-3e72e8000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Sat, 20 Jul 2019 05:56:30 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue156360218969205349/messages/f689236f-67ef-4eac-92c1-c91041c6d7ae', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>New Message</MessageText></QueueMessage>")
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'de1c9b77-9003-00c5-69bf-3e04aa000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-popreceipt',
  'AwAAAAMAAAAAAAAASKO/5r8+1QEAAAAA',
  'x-ms-time-next-visible',
  'Sat, 20 Jul 2019 05:56:40 GMT',
  'Date',
  'Sat, 20 Jul 2019 05:56:30 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue156360218969205349/messages')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList />", [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1fb7c59b-2003-007d-6cbf-3ee659000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Sat, 20 Jul 2019 05:56:31 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue156360218969205349/messages')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>f689236f-67ef-4eac-92c1-c91041c6d7ae</MessageId><InsertionTime>Sat, 20 Jul 2019 05:56:30 GMT</InsertionTime><ExpirationTime>Sat, 27 Jul 2019 05:56:30 GMT</ExpirationTime><DequeueCount>0</DequeueCount><MessageText>New Message</MessageText></QueueMessage></QueueMessagesList>", [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '23eee03e-3003-0087-48bf-3e2fbe000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Sat, 20 Jul 2019 05:56:42 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue156360218969205349')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd22c75e8-2003-0093-5fbf-3eecda000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Sat, 20 Jul 2019 05:56:41 GMT',
  'Connection',
  'close' ]);

