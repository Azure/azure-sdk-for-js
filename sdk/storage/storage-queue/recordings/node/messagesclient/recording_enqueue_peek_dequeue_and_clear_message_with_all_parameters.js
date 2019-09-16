let nock = require('nock');

module.exports.testInfo = {"queue":"queue156816831697405203"}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue156816831697405203')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ee6c7c9c-2003-002e-6b47-68e63b000000',
  'x-ms-client-request-id',
  '0999477d-306c-47f2-9c57-6c19f8f61aca',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:18:37 GMT' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .post('/queue156816831697405203/messages', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>Hello World</MessageText></QueueMessage>")
  .query(true)
  .reply(201, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>800684c5-4ba4-4b77-b625-c882a107529f</MessageId><InsertionTime>Wed, 11 Sep 2019 02:18:37 GMT</InsertionTime><ExpirationTime>Wed, 11 Sep 2019 02:19:17 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAA+3qEOEdo1QE=</PopReceipt><TimeNextVisible>Wed, 11 Sep 2019 02:18:37 GMT</TimeNextVisible></QueueMessage></QueueMessagesList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'fb3be7f0-2003-0043-2547-684c15000000',
  'x-ms-client-request-id',
  '52c347af-3f72-45b4-94dc-70d0c8c9815a',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:18:37 GMT' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .post('/queue156816831697405203/messages', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>Hello World</MessageText></QueueMessage>")
  .query(true)
  .reply(201, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>0310e5c7-ec85-42c8-bbac-71c78e9f722e</MessageId><InsertionTime>Wed, 11 Sep 2019 02:18:38 GMT</InsertionTime><ExpirationTime>Wed, 11 Sep 2019 02:19:18 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAAROrEOEdo1QE=</PopReceipt><TimeNextVisible>Wed, 11 Sep 2019 02:18:38 GMT</TimeNextVisible></QueueMessage></QueueMessagesList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c45315a8-6003-000b-3047-687e88000000',
  'x-ms-client-request-id',
  '5a06c65b-d50a-488f-acc5-31223ea2cf5c',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:18:38 GMT' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .post('/queue156816831697405203/messages', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>Hello World</MessageText></QueueMessage>")
  .query(true)
  .reply(201, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>f49901d0-59e5-486c-9cb4-02d5bb36c9f5</MessageId><InsertionTime>Wed, 11 Sep 2019 02:18:38 GMT</InsertionTime><ExpirationTime>Wed, 11 Sep 2019 02:18:48 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAA8CIAPEdo1QE=</PopReceipt><TimeNextVisible>Wed, 11 Sep 2019 02:18:43 GMT</TimeNextVisible></QueueMessage></QueueMessagesList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6be21c12-f003-0063-5547-6820d9000000',
  'x-ms-client-request-id',
  '12c94306-8edc-42b4-85ea-a4d2ad69c36f',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:18:38 GMT' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .post('/queue156816831697405203/messages', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>Hello World</MessageText></QueueMessage>")
  .query(true)
  .reply(201, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>a0d5cd59-d9c5-4ec7-8088-79a622d23136</MessageId><InsertionTime>Wed, 11 Sep 2019 02:18:39 GMT</InsertionTime><ExpirationTime>Wed, 11 Sep 2019 02:18:59 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAAZ22XREdo1QE=</PopReceipt><TimeNextVisible>Wed, 11 Sep 2019 02:18:58 GMT</TimeNextVisible></QueueMessage></QueueMessagesList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ee6c7e77-2003-002e-6747-68e63b000000',
  'x-ms-client-request-id',
  'e78fb0cf-f306-4103-aad3-4cc95d445944',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:18:38 GMT' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue156816831697405203/messages')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>800684c5-4ba4-4b77-b625-c882a107529f</MessageId><InsertionTime>Wed, 11 Sep 2019 02:18:37 GMT</InsertionTime><ExpirationTime>Wed, 11 Sep 2019 02:19:17 GMT</ExpirationTime><DequeueCount>0</DequeueCount><MessageText>Hello World</MessageText></QueueMessage><QueueMessage><MessageId>0310e5c7-ec85-42c8-bbac-71c78e9f722e</MessageId><InsertionTime>Wed, 11 Sep 2019 02:18:38 GMT</InsertionTime><ExpirationTime>Wed, 11 Sep 2019 02:19:18 GMT</ExpirationTime><DequeueCount>0</DequeueCount><MessageText>Hello World</MessageText></QueueMessage></QueueMessagesList>", [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b9a50106-6003-0022-2647-6808ca000000',
  'x-ms-client-request-id',
  'aaed8fa7-445e-475d-99a1-1ed5f29eb423',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 11 Sep 2019 02:18:39 GMT' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue156816831697405203/messages')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>800684c5-4ba4-4b77-b625-c882a107529f</MessageId><InsertionTime>Wed, 11 Sep 2019 02:18:37 GMT</InsertionTime><ExpirationTime>Wed, 11 Sep 2019 02:19:17 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAAgNa8P0do1QE=</PopReceipt><TimeNextVisible>Wed, 11 Sep 2019 02:18:49 GMT</TimeNextVisible><DequeueCount>1</DequeueCount><MessageText>Hello World</MessageText></QueueMessage><QueueMessage><MessageId>0310e5c7-ec85-42c8-bbac-71c78e9f722e</MessageId><InsertionTime>Wed, 11 Sep 2019 02:18:38 GMT</InsertionTime><ExpirationTime>Wed, 11 Sep 2019 02:19:18 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAAgNa8P0do1QE=</PopReceipt><TimeNextVisible>Wed, 11 Sep 2019 02:18:49 GMT</TimeNextVisible><DequeueCount>1</DequeueCount><MessageText>Hello World</MessageText></QueueMessage></QueueMessagesList>", [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ee6c7f0f-2003-002e-7147-68e63b000000',
  'x-ms-client-request-id',
  '510031b8-7cd8-4410-8246-316c7aeb5ebd',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 11 Sep 2019 02:18:39 GMT' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue156816831697405203/messages')
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
  'd8e72256-e003-0033-7547-683fd1000000',
  'x-ms-client-request-id',
  'df7fd7dc-b73a-4a42-aa0b-e71ec2883b3a',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 11 Sep 2019 02:18:40 GMT' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue156816831697405203')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e69b7305-0003-001b-7f47-68486e000000',
  'x-ms-client-request-id',
  '9881cda5-4720-4321-bb79-fe43caf95953',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:18:39 GMT' ]);

