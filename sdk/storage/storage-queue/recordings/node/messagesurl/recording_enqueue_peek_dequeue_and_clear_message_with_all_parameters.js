let nock = require('nock');

module.exports.testInfo = {"queue":"queue156266530788303301"}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue156266530788303301')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5c248dd9-d003-00e2-2d3a-36dae4000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 09 Jul 2019 09:38:24 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .post('/queue156266530788303301/messages', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>Hello World</MessageText></QueueMessage>")
  .query(true)
  .reply(201, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>62a36b98-2224-4cd1-bf2b-5149e71545ae</MessageId><InsertionTime>Tue, 09 Jul 2019 09:38:25 GMT</InsertionTime><ExpirationTime>Tue, 09 Jul 2019 09:39:05 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAAUE4vDjo21QE=</PopReceipt><TimeNextVisible>Tue, 09 Jul 2019 09:38:25 GMT</TimeNextVisible></QueueMessage></QueueMessagesList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c454d5bf-2003-0074-243a-36b8d0000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 09 Jul 2019 09:38:24 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .post('/queue156266530788303301/messages', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>Hello World</MessageText></QueueMessage>")
  .query(true)
  .reply(201, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>12f6909c-4d77-4c88-9db6-1a8226a2baa0</MessageId><InsertionTime>Tue, 09 Jul 2019 09:38:25 GMT</InsertionTime><ExpirationTime>Tue, 09 Jul 2019 09:39:05 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAAWhNYDjo21QE=</PopReceipt><TimeNextVisible>Tue, 09 Jul 2019 09:38:25 GMT</TimeNextVisible></QueueMessage></QueueMessagesList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '98880239-3003-0024-1e3a-36a7d8000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 09 Jul 2019 09:38:24 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .post('/queue156266530788303301/messages', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>Hello World</MessageText></QueueMessage>")
  .query(true)
  .reply(201, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>ec80bc16-b909-43b2-994f-99e3ec3fedc2</MessageId><InsertionTime>Tue, 09 Jul 2019 09:38:25 GMT</InsertionTime><ExpirationTime>Tue, 09 Jul 2019 09:38:35 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAAMj58ETo21QE=</PopReceipt><TimeNextVisible>Tue, 09 Jul 2019 09:38:30 GMT</TimeNextVisible></QueueMessage></QueueMessagesList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5fa7998e-4003-0124-1a3a-36e18d000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 09 Jul 2019 09:38:24 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .post('/queue156266530788303301/messages', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>Hello World</MessageText></QueueMessage>")
  .query(true)
  .reply(201, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>46efa4d8-4d86-4afd-b145-5c5a8eb5c16f</MessageId><InsertionTime>Tue, 09 Jul 2019 09:38:25 GMT</InsertionTime><ExpirationTime>Tue, 09 Jul 2019 09:38:45 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAAU2X9GTo21QE=</PopReceipt><TimeNextVisible>Tue, 09 Jul 2019 09:38:44 GMT</TimeNextVisible></QueueMessage></QueueMessagesList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '404edf8a-8003-001f-563a-36e586000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 09 Jul 2019 09:38:25 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue156266530788303301/messages')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>62a36b98-2224-4cd1-bf2b-5149e71545ae</MessageId><InsertionTime>Tue, 09 Jul 2019 09:38:25 GMT</InsertionTime><ExpirationTime>Tue, 09 Jul 2019 09:39:05 GMT</ExpirationTime><DequeueCount>0</DequeueCount><MessageText>Hello World</MessageText></QueueMessage><QueueMessage><MessageId>12f6909c-4d77-4c88-9db6-1a8226a2baa0</MessageId><InsertionTime>Tue, 09 Jul 2019 09:38:25 GMT</InsertionTime><ExpirationTime>Tue, 09 Jul 2019 09:39:05 GMT</ExpirationTime><DequeueCount>0</DequeueCount><MessageText>Hello World</MessageText></QueueMessage></QueueMessagesList>", [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0e469b96-5003-009e-163a-3647d1000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 09 Jul 2019 09:38:25 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue156266530788303301/messages')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>62a36b98-2224-4cd1-bf2b-5149e71545ae</MessageId><InsertionTime>Tue, 09 Jul 2019 09:38:25 GMT</InsertionTime><ExpirationTime>Tue, 09 Jul 2019 09:39:05 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAA2H3xFDo21QE=</PopReceipt><TimeNextVisible>Tue, 09 Jul 2019 09:38:36 GMT</TimeNextVisible><DequeueCount>1</DequeueCount><MessageText>Hello World</MessageText></QueueMessage><QueueMessage><MessageId>12f6909c-4d77-4c88-9db6-1a8226a2baa0</MessageId><InsertionTime>Tue, 09 Jul 2019 09:38:25 GMT</InsertionTime><ExpirationTime>Tue, 09 Jul 2019 09:39:05 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAA2H3xFDo21QE=</PopReceipt><TimeNextVisible>Tue, 09 Jul 2019 09:38:36 GMT</TimeNextVisible><DequeueCount>1</DequeueCount><MessageText>Hello World</MessageText></QueueMessage></QueueMessagesList>", [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6d3a4a6a-3003-0060-653a-367bb4000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 09 Jul 2019 09:38:25 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue156266530788303301/messages')
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
  'a7ced92b-7003-010e-2f3a-3694c8000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 09 Jul 2019 09:38:25 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue156266530788303301')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1cb2bc5e-1003-0099-533a-36b154000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 09 Jul 2019 09:38:26 GMT',
  'Connection',
  'close' ]);

