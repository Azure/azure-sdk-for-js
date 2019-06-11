let nock = require('nock');

module.exports.testInfo = {"queue":"queue156029275613605459"}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue156029275613605459')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '944a2509-a003-0045-6fa6-20a700000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 11 Jun 2019 22:39:15 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .post('/queue156029275613605459/messages', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>Hello World</MessageText></QueueMessage>")
  .query(true)
  .reply(201, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>2bf6c204-4fa3-4c4e-b291-3399c9b13e91</MessageId><InsertionTime>Tue, 11 Jun 2019 22:39:16 GMT</InsertionTime><ExpirationTime>Tue, 11 Jun 2019 22:39:56 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAAYShVgKYg1QE=</PopReceipt><TimeNextVisible>Tue, 11 Jun 2019 22:39:16 GMT</TimeNextVisible></QueueMessage></QueueMessagesList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1f7b47e3-e003-0042-38a6-205185000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 11 Jun 2019 22:39:16 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .post('/queue156029275613605459/messages', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>Hello World</MessageText></QueueMessage>")
  .query(true)
  .reply(201, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>cbfa4aa9-2c31-4c23-b0ba-06b470759d00</MessageId><InsertionTime>Tue, 11 Jun 2019 22:39:17 GMT</InsertionTime><ExpirationTime>Tue, 11 Jun 2019 22:39:57 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAAdR6DgKYg1QE=</PopReceipt><TimeNextVisible>Tue, 11 Jun 2019 22:39:17 GMT</TimeNextVisible></QueueMessage></QueueMessagesList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'fbec9396-8003-009e-52a6-2003d6000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 11 Jun 2019 22:39:16 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .post('/queue156029275613605459/messages', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>Hello World</MessageText></QueueMessage>")
  .query(true)
  .reply(201, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>eca335cd-0d0f-4d83-b5f6-2ab4e077ef8e</MessageId><InsertionTime>Tue, 11 Jun 2019 22:39:17 GMT</InsertionTime><ExpirationTime>Tue, 11 Jun 2019 22:39:27 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAACrOtg6Yg1QE=</PopReceipt><TimeNextVisible>Tue, 11 Jun 2019 22:39:22 GMT</TimeNextVisible></QueueMessage></QueueMessagesList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4bdb58c9-7003-0047-48a6-20a5fa000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 11 Jun 2019 22:39:16 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .post('/queue156029275613605459/messages', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>Hello World</MessageText></QueueMessage>")
  .query(true)
  .reply(201, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>13c026ab-eff9-4482-ab9e-06a4a964f7c5</MessageId><InsertionTime>Tue, 11 Jun 2019 22:39:17 GMT</InsertionTime><ExpirationTime>Tue, 11 Jun 2019 22:39:37 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAAxPU0jKYg1QE=</PopReceipt><TimeNextVisible>Tue, 11 Jun 2019 22:39:36 GMT</TimeNextVisible></QueueMessage></QueueMessagesList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9a813da2-c003-00dd-02a6-20293f000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 11 Jun 2019 22:39:16 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue156029275613605459/messages')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>2bf6c204-4fa3-4c4e-b291-3399c9b13e91</MessageId><InsertionTime>Tue, 11 Jun 2019 22:39:16 GMT</InsertionTime><ExpirationTime>Tue, 11 Jun 2019 22:39:56 GMT</ExpirationTime><DequeueCount>0</DequeueCount><MessageText>Hello World</MessageText></QueueMessage><QueueMessage><MessageId>cbfa4aa9-2c31-4c23-b0ba-06b470759d00</MessageId><InsertionTime>Tue, 11 Jun 2019 22:39:17 GMT</InsertionTime><ExpirationTime>Tue, 11 Jun 2019 22:39:57 GMT</ExpirationTime><DequeueCount>0</DequeueCount><MessageText>Hello World</MessageText></QueueMessage></QueueMessagesList>", [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8acc5381-f003-0030-66a6-2020bb000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 11 Jun 2019 22:39:17 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue156029275613605459/messages')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>2bf6c204-4fa3-4c4e-b291-3399c9b13e91</MessageId><InsertionTime>Tue, 11 Jun 2019 22:39:16 GMT</InsertionTime><ExpirationTime>Tue, 11 Jun 2019 22:39:56 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAAy483h6Yg1QE=</PopReceipt><TimeNextVisible>Tue, 11 Jun 2019 22:39:28 GMT</TimeNextVisible><DequeueCount>1</DequeueCount><MessageText>Hello World</MessageText></QueueMessage><QueueMessage><MessageId>cbfa4aa9-2c31-4c23-b0ba-06b470759d00</MessageId><InsertionTime>Tue, 11 Jun 2019 22:39:17 GMT</InsertionTime><ExpirationTime>Tue, 11 Jun 2019 22:39:57 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAAy483h6Yg1QE=</PopReceipt><TimeNextVisible>Tue, 11 Jun 2019 22:39:28 GMT</TimeNextVisible><DequeueCount>1</DequeueCount><MessageText>Hello World</MessageText></QueueMessage></QueueMessagesList>", [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4cb17f3b-4003-00c7-0ca6-200650000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 11 Jun 2019 22:39:17 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue156029275613605459/messages')
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
  '7b12efcc-5003-0036-32a6-20d7c3000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 11 Jun 2019 22:39:18 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue156029275613605459')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0fe23a5b-d003-00eb-0ba6-20846d000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 11 Jun 2019 22:39:18 GMT',
  'Connection',
  'close' ]);

