let nock = require('nock');

module.exports.testInfo = {"queue":"queue155996387196306128"}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue155996387196306128')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3c420fdf-3003-0097-41a8-1dfe91000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Sat, 08 Jun 2019 03:17:51 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .post('/queue155996387196306128/messages', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText/></QueueMessage>")
  .query(true)
  .reply(201, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>32f791f1-88b7-47e1-8d0d-62f69816679e</MessageId><InsertionTime>Sat, 08 Jun 2019 03:17:52 GMT</InsertionTime><ExpirationTime>Sat, 08 Jun 2019 03:18:32 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAA/Ebewagd1QE=</PopReceipt><TimeNextVisible>Sat, 08 Jun 2019 03:17:52 GMT</TimeNextVisible></QueueMessage></QueueMessagesList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '68a68a42-c003-0089-30a8-1d247c000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Sat, 08 Jun 2019 03:17:51 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue155996387196306128/messages')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>32f791f1-88b7-47e1-8d0d-62f69816679e</MessageId><InsertionTime>Sat, 08 Jun 2019 03:17:52 GMT</InsertionTime><ExpirationTime>Sat, 08 Jun 2019 03:18:32 GMT</ExpirationTime><DequeueCount>0</DequeueCount><MessageText /></QueueMessage></QueueMessagesList>", [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e8c90619-f003-0020-0da8-1df194000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Sat, 08 Jun 2019 03:17:52 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue155996387196306128/messages')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>32f791f1-88b7-47e1-8d0d-62f69816679e</MessageId><InsertionTime>Sat, 08 Jun 2019 03:17:52 GMT</InsertionTime><ExpirationTime>Sat, 08 Jun 2019 03:18:32 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAA531VyKgd1QE=</PopReceipt><TimeNextVisible>Sat, 08 Jun 2019 03:18:03 GMT</TimeNextVisible><DequeueCount>1</DequeueCount><MessageText /></QueueMessage></QueueMessagesList>", [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'dd6cef10-e003-001d-23a8-1d44b2000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Sat, 08 Jun 2019 03:17:52 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue155996387196306128')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3abcfe38-9003-005d-2ca8-1d6d5c000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Sat, 08 Jun 2019 03:17:52 GMT',
  'Connection',
  'close' ]);

