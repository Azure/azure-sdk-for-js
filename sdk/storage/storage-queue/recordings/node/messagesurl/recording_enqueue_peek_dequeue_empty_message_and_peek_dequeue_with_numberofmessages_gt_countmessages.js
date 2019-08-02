let nock = require('nock');

module.exports.testInfo = {"queue":"queue156404670705102673"}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue156404670705102673')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b64a42d5-6003-003c-48ca-428a4d000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Thu, 25 Jul 2019 09:21:28 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .post('/queue156404670705102673/messages', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText/></QueueMessage>")
  .query(true)
  .reply(201, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>64e81fb2-24df-4e68-b72e-73737dac72e6</MessageId><InsertionTime>Thu, 25 Jul 2019 09:21:29 GMT</InsertionTime><ExpirationTime>Thu, 25 Jul 2019 09:22:09 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAAHqdZV8pC1QE=</PopReceipt><TimeNextVisible>Thu, 25 Jul 2019 09:21:29 GMT</TimeNextVisible></QueueMessage></QueueMessagesList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c929acb1-4003-00a3-34ca-42f2f7000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Thu, 25 Jul 2019 09:21:29 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue156404670705102673/messages')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>64e81fb2-24df-4e68-b72e-73737dac72e6</MessageId><InsertionTime>Thu, 25 Jul 2019 09:21:29 GMT</InsertionTime><ExpirationTime>Thu, 25 Jul 2019 09:22:09 GMT</ExpirationTime><DequeueCount>0</DequeueCount><MessageText /></QueueMessage></QueueMessagesList>", [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '26b3da15-f003-00b1-40ca-42c6eb000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 25 Jul 2019 09:21:29 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue156404670705102673/messages')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>64e81fb2-24df-4e68-b72e-73737dac72e6</MessageId><InsertionTime>Thu, 25 Jul 2019 09:21:29 GMT</InsertionTime><ExpirationTime>Thu, 25 Jul 2019 09:22:09 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAA166hXcpC1QE=</PopReceipt><TimeNextVisible>Thu, 25 Jul 2019 09:21:39 GMT</TimeNextVisible><DequeueCount>1</DequeueCount><MessageText /></QueueMessage></QueueMessagesList>", [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'fdab921a-7003-000a-38ca-42271f000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 25 Jul 2019 09:21:29 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue156404670705102673')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '98569071-d003-002e-12ca-42be51000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Thu, 25 Jul 2019 09:21:29 GMT',
  'Connection',
  'close' ]);

