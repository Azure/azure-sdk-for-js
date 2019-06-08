let nock = require('nock');

module.exports.testInfo = {"queue":"queue155996386816501025"}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue155996386816501025')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7ad032c9-1003-006e-54a8-1d3471000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Sat, 08 Jun 2019 03:17:47 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .post('/queue155996386816501025/messages', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>Hello World</MessageText></QueueMessage>")
  .query(true)
  .reply(201, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>948774fc-4077-4f61-aa1b-df8c21c7d052</MessageId><InsertionTime>Sat, 08 Jun 2019 03:17:48 GMT</InsertionTime><ExpirationTime>Sat, 08 Jun 2019 03:18:28 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAAWpSXv6gd1QE=</PopReceipt><TimeNextVisible>Sat, 08 Jun 2019 03:17:48 GMT</TimeNextVisible></QueueMessage></QueueMessagesList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '577dd165-9003-0056-6aa8-1d7528000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Sat, 08 Jun 2019 03:17:47 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .post('/queue155996386816501025/messages', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>Hello World</MessageText></QueueMessage>")
  .query(true)
  .reply(201, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>94d858e3-85c4-4444-a8c2-d64ce895c2b8</MessageId><InsertionTime>Sat, 08 Jun 2019 03:17:48 GMT</InsertionTime><ExpirationTime>Sat, 08 Jun 2019 03:18:28 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAADPPWv6gd1QE=</PopReceipt><TimeNextVisible>Sat, 08 Jun 2019 03:17:48 GMT</TimeNextVisible></QueueMessage></QueueMessagesList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '37b43529-7003-0031-77a8-1dc68f000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Sat, 08 Jun 2019 03:17:48 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .post('/queue155996386816501025/messages', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>Hello World</MessageText></QueueMessage>")
  .query(true)
  .reply(201, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>612da1eb-9437-4d2c-a3be-c28af7368a36</MessageId><InsertionTime>Sat, 08 Jun 2019 03:17:49 GMT</InsertionTime><ExpirationTime>Sat, 08 Jun 2019 03:17:59 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAA+CgUw6gd1QE=</PopReceipt><TimeNextVisible>Sat, 08 Jun 2019 03:17:54 GMT</TimeNextVisible></QueueMessage></QueueMessagesList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ba80ab28-c003-0001-5ba8-1d9ca5000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Sat, 08 Jun 2019 03:17:48 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .post('/queue155996386816501025/messages', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>Hello World</MessageText></QueueMessage>")
  .query(true)
  .reply(201, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>c1dc4545-c5da-4701-b1a0-e641f7968ba5</MessageId><InsertionTime>Sat, 08 Jun 2019 03:17:49 GMT</InsertionTime><ExpirationTime>Sat, 08 Jun 2019 03:18:09 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAANf+qy6gd1QE=</PopReceipt><TimeNextVisible>Sat, 08 Jun 2019 03:18:08 GMT</TimeNextVisible></QueueMessage></QueueMessagesList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '336b6fd1-7003-005c-4ca8-1d6ca1000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Sat, 08 Jun 2019 03:17:49 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue155996386816501025/messages')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>948774fc-4077-4f61-aa1b-df8c21c7d052</MessageId><InsertionTime>Sat, 08 Jun 2019 03:17:48 GMT</InsertionTime><ExpirationTime>Sat, 08 Jun 2019 03:18:28 GMT</ExpirationTime><DequeueCount>0</DequeueCount><MessageText>Hello World</MessageText></QueueMessage><QueueMessage><MessageId>94d858e3-85c4-4444-a8c2-d64ce895c2b8</MessageId><InsertionTime>Sat, 08 Jun 2019 03:17:48 GMT</InsertionTime><ExpirationTime>Sat, 08 Jun 2019 03:18:28 GMT</ExpirationTime><DequeueCount>0</DequeueCount><MessageText>Hello World</MessageText></QueueMessage></QueueMessagesList>", [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '453e0425-f003-004d-08a8-1d5bba000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Sat, 08 Jun 2019 03:17:49 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue155996386816501025/messages')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>948774fc-4077-4f61-aa1b-df8c21c7d052</MessageId><InsertionTime>Sat, 08 Jun 2019 03:17:48 GMT</InsertionTime><ExpirationTime>Sat, 08 Jun 2019 03:18:28 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAAjjXNxqgd1QE=</PopReceipt><TimeNextVisible>Sat, 08 Jun 2019 03:18:00 GMT</TimeNextVisible><DequeueCount>1</DequeueCount><MessageText>Hello World</MessageText></QueueMessage><QueueMessage><MessageId>94d858e3-85c4-4444-a8c2-d64ce895c2b8</MessageId><InsertionTime>Sat, 08 Jun 2019 03:17:48 GMT</InsertionTime><ExpirationTime>Sat, 08 Jun 2019 03:18:28 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAAjjXNxqgd1QE=</PopReceipt><TimeNextVisible>Sat, 08 Jun 2019 03:18:00 GMT</TimeNextVisible><DequeueCount>1</DequeueCount><MessageText>Hello World</MessageText></QueueMessage></QueueMessagesList>", [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '97e1fecc-3003-0072-05a8-1dec66000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Sat, 08 Jun 2019 03:17:49 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue155996386816501025/messages')
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
  '3904e16a-5003-008c-18a8-1dd003000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Sat, 08 Jun 2019 03:17:50 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue155996386816501025')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '74d8837a-5003-0069-2ca8-1dc2f4000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Sat, 08 Jun 2019 03:17:50 GMT',
  'Connection',
  'close' ]);

