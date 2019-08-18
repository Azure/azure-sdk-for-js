let nock = require('nock');

module.exports.testInfo = {"queue":"queue156599416238909717"}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue156599416238909717')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1291edb1-9003-0046-0e81-54a407000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 16 Aug 2019 22:22:42 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .post('/queue156599416238909717/messages', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>Hello World</MessageText></QueueMessage>")
  .query(true)
  .reply(201, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>c701236a-1e3b-44e0-93d8-ab329da5202e</MessageId><InsertionTime>Fri, 16 Aug 2019 22:22:43 GMT</InsertionTime><ExpirationTime>Fri, 16 Aug 2019 22:23:23 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAAIRVlH4FU1QE=</PopReceipt><TimeNextVisible>Fri, 16 Aug 2019 22:22:43 GMT</TimeNextVisible></QueueMessage></QueueMessagesList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c08c15da-2003-0093-2b81-54ecda000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 16 Aug 2019 22:22:42 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .post('/queue156599416238909717/messages', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>Hello World</MessageText></QueueMessage>")
  .query(true)
  .reply(201, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>3ef25e02-56ac-40af-be48-721297012949</MessageId><InsertionTime>Fri, 16 Aug 2019 22:22:43 GMT</InsertionTime><ExpirationTime>Fri, 16 Aug 2019 22:23:23 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAAqqeTH4FU1QE=</PopReceipt><TimeNextVisible>Fri, 16 Aug 2019 22:22:43 GMT</TimeNextVisible></QueueMessage></QueueMessagesList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0233122a-b003-003c-6781-54ce4a000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 16 Aug 2019 22:22:43 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .post('/queue156599416238909717/messages', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>Hello World</MessageText></QueueMessage>")
  .query(true)
  .reply(201, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>79b1b66b-7a49-4d6b-b071-f77774bab38a</MessageId><InsertionTime>Fri, 16 Aug 2019 22:22:43 GMT</InsertionTime><ExpirationTime>Fri, 16 Aug 2019 22:22:53 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAAExm8IoFU1QE=</PopReceipt><TimeNextVisible>Fri, 16 Aug 2019 22:22:48 GMT</TimeNextVisible></QueueMessage></QueueMessagesList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '80c9fc32-7003-008b-7b81-54c14f000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 16 Aug 2019 22:22:43 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .post('/queue156599416238909717/messages', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>Hello World</MessageText></QueueMessage>")
  .query(true)
  .reply(201, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>7ffde309-1788-4c90-bc48-4deea47f35d3</MessageId><InsertionTime>Fri, 16 Aug 2019 22:22:44 GMT</InsertionTime><ExpirationTime>Fri, 16 Aug 2019 22:23:04 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAAY3FCK4FU1QE=</PopReceipt><TimeNextVisible>Fri, 16 Aug 2019 22:23:03 GMT</TimeNextVisible></QueueMessage></QueueMessagesList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '415ad1b4-4003-0000-4f81-547a91000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 16 Aug 2019 22:22:43 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue156599416238909717/messages')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>c701236a-1e3b-44e0-93d8-ab329da5202e</MessageId><InsertionTime>Fri, 16 Aug 2019 22:22:43 GMT</InsertionTime><ExpirationTime>Fri, 16 Aug 2019 22:23:23 GMT</ExpirationTime><DequeueCount>0</DequeueCount><MessageText>Hello World</MessageText></QueueMessage><QueueMessage><MessageId>3ef25e02-56ac-40af-be48-721297012949</MessageId><InsertionTime>Fri, 16 Aug 2019 22:22:43 GMT</InsertionTime><ExpirationTime>Fri, 16 Aug 2019 22:23:23 GMT</ExpirationTime><DequeueCount>0</DequeueCount><MessageText>Hello World</MessageText></QueueMessage></QueueMessagesList>", [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c3910445-6003-009f-4681-54022b000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 16 Aug 2019 22:22:43 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue156599416238909717/messages')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>c701236a-1e3b-44e0-93d8-ab329da5202e</MessageId><InsertionTime>Fri, 16 Aug 2019 22:22:43 GMT</InsertionTime><ExpirationTime>Fri, 16 Aug 2019 22:23:23 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAAZhNBJoFU1QE=</PopReceipt><TimeNextVisible>Fri, 16 Aug 2019 22:22:54 GMT</TimeNextVisible><DequeueCount>1</DequeueCount><MessageText>Hello World</MessageText></QueueMessage><QueueMessage><MessageId>3ef25e02-56ac-40af-be48-721297012949</MessageId><InsertionTime>Fri, 16 Aug 2019 22:22:43 GMT</InsertionTime><ExpirationTime>Fri, 16 Aug 2019 22:23:23 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAAZhNBJoFU1QE=</PopReceipt><TimeNextVisible>Fri, 16 Aug 2019 22:22:54 GMT</TimeNextVisible><DequeueCount>1</DequeueCount><MessageText>Hello World</MessageText></QueueMessage></QueueMessagesList>", [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '632b6cbb-1003-00b9-5281-54999f000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 16 Aug 2019 22:22:43 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue156599416238909717/messages')
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
  '09ab0c08-c003-0038-0981-543bc8000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 16 Aug 2019 22:22:44 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue156599416238909717')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '850ce40d-e003-0049-5f81-5449f1000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 16 Aug 2019 22:22:44 GMT',
  'Connection',
  'close' ]);

