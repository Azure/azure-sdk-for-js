let nock = require('nock');

module.exports.testInfo = {"queue":"queue156404670462902188"}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue156404670462902188')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ecc2ac94-b003-013a-09ca-423b60000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Thu, 25 Jul 2019 09:21:26 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .post('/queue156404670462902188/messages', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>Hello World</MessageText></QueueMessage>")
  .query(true)
  .reply(201, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>2e8a665c-d784-45cb-8e71-2222ed650d5a</MessageId><InsertionTime>Thu, 25 Jul 2019 09:21:26 GMT</InsertionTime><ExpirationTime>Thu, 25 Jul 2019 09:22:06 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAAYm7oVcpC1QE=</PopReceipt><TimeNextVisible>Thu, 25 Jul 2019 09:21:26 GMT</TimeNextVisible></QueueMessage></QueueMessagesList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c352244c-d003-006a-1bca-42623d000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Thu, 25 Jul 2019 09:21:26 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .post('/queue156404670462902188/messages', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>Hello World</MessageText></QueueMessage>")
  .query(true)
  .reply(201, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>b4f273ff-4335-4f1a-bb92-de2be422cbb8</MessageId><InsertionTime>Thu, 25 Jul 2019 09:21:27 GMT</InsertionTime><ExpirationTime>Thu, 25 Jul 2019 09:22:07 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAAGx4SVspC1QE=</PopReceipt><TimeNextVisible>Thu, 25 Jul 2019 09:21:27 GMT</TimeNextVisible></QueueMessage></QueueMessagesList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '23b09d0e-3003-0109-66ca-42624d000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Thu, 25 Jul 2019 09:21:26 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .post('/queue156404670462902188/messages', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>Hello World</MessageText></QueueMessage>")
  .query(true)
  .reply(201, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>70ecec05-7030-4094-ae32-a40378466c5b</MessageId><InsertionTime>Thu, 25 Jul 2019 09:21:27 GMT</InsertionTime><ExpirationTime>Thu, 25 Jul 2019 09:21:37 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAAnjM3WcpC1QE=</PopReceipt><TimeNextVisible>Thu, 25 Jul 2019 09:21:32 GMT</TimeNextVisible></QueueMessage></QueueMessagesList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '26b3d8f0-f003-00b1-4eca-42c6eb000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Thu, 25 Jul 2019 09:21:27 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .post('/queue156404670462902188/messages', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>Hello World</MessageText></QueueMessage>")
  .query(true)
  .reply(201, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>9879344c-e4aa-4f09-b481-f4f6ca9172b0</MessageId><InsertionTime>Thu, 25 Jul 2019 09:21:27 GMT</InsertionTime><ExpirationTime>Thu, 25 Jul 2019 09:21:47 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAAqAy4YcpC1QE=</PopReceipt><TimeNextVisible>Thu, 25 Jul 2019 09:21:46 GMT</TimeNextVisible></QueueMessage></QueueMessagesList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e3ad29b3-6003-00f0-37ca-42eef8000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Thu, 25 Jul 2019 09:21:26 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue156404670462902188/messages')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>2e8a665c-d784-45cb-8e71-2222ed650d5a</MessageId><InsertionTime>Thu, 25 Jul 2019 09:21:26 GMT</InsertionTime><ExpirationTime>Thu, 25 Jul 2019 09:22:06 GMT</ExpirationTime><DequeueCount>0</DequeueCount><MessageText>Hello World</MessageText></QueueMessage><QueueMessage><MessageId>b4f273ff-4335-4f1a-bb92-de2be422cbb8</MessageId><InsertionTime>Thu, 25 Jul 2019 09:21:27 GMT</InsertionTime><ExpirationTime>Thu, 25 Jul 2019 09:22:07 GMT</ExpirationTime><DequeueCount>0</DequeueCount><MessageText>Hello World</MessageText></QueueMessage></QueueMessagesList>", [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f2f36f23-d003-00cb-66ca-42aca6000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 25 Jul 2019 09:21:27 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue156404670462902188/messages')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>2e8a665c-d784-45cb-8e71-2222ed650d5a</MessageId><InsertionTime>Thu, 25 Jul 2019 09:21:26 GMT</InsertionTime><ExpirationTime>Thu, 25 Jul 2019 09:22:06 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAABF6tXMpC1QE=</PopReceipt><TimeNextVisible>Thu, 25 Jul 2019 09:21:38 GMT</TimeNextVisible><DequeueCount>1</DequeueCount><MessageText>Hello World</MessageText></QueueMessage><QueueMessage><MessageId>b4f273ff-4335-4f1a-bb92-de2be422cbb8</MessageId><InsertionTime>Thu, 25 Jul 2019 09:21:27 GMT</InsertionTime><ExpirationTime>Thu, 25 Jul 2019 09:22:07 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAABF6tXMpC1QE=</PopReceipt><TimeNextVisible>Thu, 25 Jul 2019 09:21:38 GMT</TimeNextVisible><DequeueCount>1</DequeueCount><MessageText>Hello World</MessageText></QueueMessage></QueueMessagesList>", [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e9aced96-5003-009e-31ca-4247d1000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 25 Jul 2019 09:21:27 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue156404670462902188/messages')
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
  '7ab613da-7003-00a0-3fca-42f1f0000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 25 Jul 2019 09:21:28 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue156404670462902188')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1c390431-1003-007c-37ca-42a3a3000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Thu, 25 Jul 2019 09:21:28 GMT',
  'Connection',
  'close' ]);

