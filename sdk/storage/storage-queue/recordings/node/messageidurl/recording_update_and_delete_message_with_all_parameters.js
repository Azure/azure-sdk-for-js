let nock = require('nock');

module.exports.testInfo = {"queue":"queue155996384484206969"}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue155996384484206969')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '02d7d0bd-a003-001a-5ba8-1db237000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Sat, 08 Jun 2019 03:17:23 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .post('/queue155996384484206969/messages', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>Hello World</MessageText></QueueMessage>")
  .query(true)
  .reply(201, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>b3cd8861-6ed9-4406-b835-5914c69c0edc</MessageId><InsertionTime>Sat, 08 Jun 2019 03:17:24 GMT</InsertionTime><ExpirationTime>Sat, 15 Jun 2019 03:17:24 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAA7uGtsagd1QE=</PopReceipt><TimeNextVisible>Sat, 08 Jun 2019 03:17:24 GMT</TimeNextVisible></QueueMessage></QueueMessagesList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f4605fd2-7003-0013-06a8-1da8b9000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Sat, 08 Jun 2019 03:17:24 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue155996384484206969/messages/b3cd8861-6ed9-4406-b835-5914c69c0edc', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>New Message</MessageText></QueueMessage>")
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6f3614a3-8003-0042-68a8-1db64c000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-popreceipt',
  'AwAAAAMAAAAAAAAAFOXjt6gd1QEAAAAA',
  'x-ms-time-next-visible',
  'Sat, 08 Jun 2019 03:17:35 GMT',
  'Date',
  'Sat, 08 Jun 2019 03:17:25 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue155996384484206969/messages')
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
  '74d87f25-5003-0069-3fa8-1dc2f4000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Sat, 08 Jun 2019 03:17:25 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue155996384484206969/messages')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>b3cd8861-6ed9-4406-b835-5914c69c0edc</MessageId><InsertionTime>Sat, 08 Jun 2019 03:17:24 GMT</InsertionTime><ExpirationTime>Sat, 15 Jun 2019 03:17:24 GMT</ExpirationTime><DequeueCount>0</DequeueCount><MessageText>New Message</MessageText></QueueMessage></QueueMessagesList>", [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f9f12a48-e003-0034-06a8-1d32f0000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Sat, 08 Jun 2019 03:17:37 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue155996384484206969')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '040ad1fa-6003-000c-80a8-1d73a9000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Sat, 08 Jun 2019 03:17:37 GMT',
  'Connection',
  'close' ]);

