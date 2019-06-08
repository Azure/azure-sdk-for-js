let nock = require('nock');

module.exports.testInfo = {"queue":"queue155995971572107929"}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue155995971572107929')
  .query({"timeout":"30"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '97dbc6f4-3003-0072-599f-1dec66000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Sat, 08 Jun 2019 02:08:34 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .post('/queue155995971572107929/messages', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>Hello World</MessageText></QueueMessage>")
  .query({"visibilitytimeout":"0","messagettl":"40","timeout":"30"})
  .reply(201, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>f630ba37-22f3-4429-87c6-8a9f54a12367</MessageId><InsertionTime>Sat, 08 Jun 2019 02:08:36 GMT</InsertionTime><ExpirationTime>Sat, 08 Jun 2019 02:09:16 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAABWipFJ8d1QE=</PopReceipt><TimeNextVisible>Sat, 08 Jun 2019 02:08:36 GMT</TimeNextVisible></QueueMessage></QueueMessagesList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '541db5b1-6003-006a-239f-1dc1f3000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Sat, 08 Jun 2019 02:08:35 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .post('/queue155995971572107929/messages', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>Hello World</MessageText></QueueMessage>")
  .query({"visibilitytimeout":"0","messagettl":"40","timeout":"30"})
  .reply(201, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>d025a224-d8a6-4c8e-9e56-016c18fb9b47</MessageId><InsertionTime>Sat, 08 Jun 2019 02:08:36 GMT</InsertionTime><ExpirationTime>Sat, 08 Jun 2019 02:09:16 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAAELXnFJ8d1QE=</PopReceipt><TimeNextVisible>Sat, 08 Jun 2019 02:08:36 GMT</TimeNextVisible></QueueMessage></QueueMessagesList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2c4e9faa-d003-0051-109f-1d83ad000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Sat, 08 Jun 2019 02:08:35 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .post('/queue155995971572107929/messages', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>Hello World</MessageText></QueueMessage>")
  .query({"visibilitytimeout":"5","messagettl":"10","timeout":"30"})
  .reply(201, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>2509068d-155a-4385-8985-0e84d535bafe</MessageId><InsertionTime>Sat, 08 Jun 2019 02:08:36 GMT</InsertionTime><ExpirationTime>Sat, 08 Jun 2019 02:08:46 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAA5BUjGJ8d1QE=</PopReceipt><TimeNextVisible>Sat, 08 Jun 2019 02:08:41 GMT</TimeNextVisible></QueueMessage></QueueMessagesList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '33c9dcb2-b003-0041-069f-1db54b000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Sat, 08 Jun 2019 02:08:36 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .post('/queue155995971572107929/messages', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>Hello World</MessageText></QueueMessage>")
  .query({"visibilitytimeout":"19","messagettl":"20","timeout":"30"})
  .reply(201, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>b16e9b81-514a-4743-9c21-7de3f4208715</MessageId><InsertionTime>Sat, 08 Jun 2019 02:08:37 GMT</InsertionTime><ExpirationTime>Sat, 08 Jun 2019 02:08:57 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAAyf26IJ8d1QE=</PopReceipt><TimeNextVisible>Sat, 08 Jun 2019 02:08:56 GMT</TimeNextVisible></QueueMessage></QueueMessagesList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ab049830-4003-0054-349f-1d77d2000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Sat, 08 Jun 2019 02:08:36 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue155995971572107929/messages')
  .query({"numofmessages":"2","peekonly":"true","timeout":"30"})
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>f630ba37-22f3-4429-87c6-8a9f54a12367</MessageId><InsertionTime>Sat, 08 Jun 2019 02:08:36 GMT</InsertionTime><ExpirationTime>Sat, 08 Jun 2019 02:09:16 GMT</ExpirationTime><DequeueCount>0</DequeueCount><MessageText>Hello World</MessageText></QueueMessage><QueueMessage><MessageId>d025a224-d8a6-4c8e-9e56-016c18fb9b47</MessageId><InsertionTime>Sat, 08 Jun 2019 02:08:36 GMT</InsertionTime><ExpirationTime>Sat, 08 Jun 2019 02:09:16 GMT</ExpirationTime><DequeueCount>0</DequeueCount><MessageText>Hello World</MessageText></QueueMessage></QueueMessagesList>", [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6f303878-8003-0042-2f9f-1db64c000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Sat, 08 Jun 2019 02:08:36 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue155995971572107929/messages')
  .query({"numofmessages":"2","visibilitytimeout":"10","timeout":"30"})
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>f630ba37-22f3-4429-87c6-8a9f54a12367</MessageId><InsertionTime>Sat, 08 Jun 2019 02:08:36 GMT</InsertionTime><ExpirationTime>Sat, 08 Jun 2019 02:09:16 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAAf9DdG58d1QE=</PopReceipt><TimeNextVisible>Sat, 08 Jun 2019 02:08:48 GMT</TimeNextVisible><DequeueCount>1</DequeueCount><MessageText>Hello World</MessageText></QueueMessage><QueueMessage><MessageId>d025a224-d8a6-4c8e-9e56-016c18fb9b47</MessageId><InsertionTime>Sat, 08 Jun 2019 02:08:36 GMT</InsertionTime><ExpirationTime>Sat, 08 Jun 2019 02:09:16 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAAf9DdG58d1QE=</PopReceipt><TimeNextVisible>Sat, 08 Jun 2019 02:08:48 GMT</TimeNextVisible><DequeueCount>1</DequeueCount><MessageText>Hello World</MessageText></QueueMessage></QueueMessagesList>", [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c69cd976-d003-001e-239f-1d47b5000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Sat, 08 Jun 2019 02:08:37 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue155995971572107929/messages')
  .query({"peekonly":"true","timeout":"30"})
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList />", [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'cb5f6321-b003-008d-249f-1dd1fe000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Sat, 08 Jun 2019 02:08:38 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue155995971572107929')
  .query({"timeout":"30"})
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e8c34f9a-f003-0020-159f-1df194000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Sat, 08 Jun 2019 02:08:38 GMT',
  'Connection',
  'close' ]);

