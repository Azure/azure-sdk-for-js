let nock = require('nock');

module.exports.testInfo = {"queue":"queue155996386468409787"}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue155996386468409787')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0a2bb0b5-8003-0085-25a8-1dca8d000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Sat, 08 Jun 2019 03:17:44 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .post('/queue155996386468409787/messages', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>Hello World</MessageText></QueueMessage>")
  .query(true)
  .reply(201, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>27dc144d-0f7e-4bcf-a6ba-e1e28859d478</MessageId><InsertionTime>Sat, 08 Jun 2019 03:17:44 GMT</InsertionTime><ExpirationTime>Sat, 15 Jun 2019 03:17:44 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAAGFeEvagd1QE=</PopReceipt><TimeNextVisible>Sat, 08 Jun 2019 03:17:44 GMT</TimeNextVisible></QueueMessage></QueueMessagesList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a27c7381-4003-0039-10a8-1dddfc000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Sat, 08 Jun 2019 03:17:43 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .post('/queue155996386468409787/messages', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>Hello World</MessageText></QueueMessage>")
  .query(true)
  .reply(201, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>b09a0b3e-39d3-4555-a544-6cdc25b1d760</MessageId><InsertionTime>Sat, 08 Jun 2019 03:17:45 GMT</InsertionTime><ExpirationTime>Sat, 15 Jun 2019 03:17:45 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAAJ1LEvagd1QE=</PopReceipt><TimeNextVisible>Sat, 08 Jun 2019 03:17:45 GMT</TimeNextVisible></QueueMessage></QueueMessagesList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3d0f17bf-8003-0060-18a8-1dd87a000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Sat, 08 Jun 2019 03:17:44 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue155996386468409787/messages')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>27dc144d-0f7e-4bcf-a6ba-e1e28859d478</MessageId><InsertionTime>Sat, 08 Jun 2019 03:17:44 GMT</InsertionTime><ExpirationTime>Sat, 15 Jun 2019 03:17:44 GMT</ExpirationTime><DequeueCount>0</DequeueCount><MessageText>Hello World</MessageText></QueueMessage></QueueMessagesList>", [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'fcd9438a-5003-0004-27a8-1d68da000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Sat, 08 Jun 2019 03:17:45 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue155996386468409787/messages')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>27dc144d-0f7e-4bcf-a6ba-e1e28859d478</MessageId><InsertionTime>Sat, 08 Jun 2019 03:17:44 GMT</InsertionTime><ExpirationTime>Sat, 15 Jun 2019 03:17:44 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAAGHYl0Kgd1QE=</PopReceipt><TimeNextVisible>Sat, 08 Jun 2019 03:18:16 GMT</TimeNextVisible><DequeueCount>1</DequeueCount><MessageText>Hello World</MessageText></QueueMessage></QueueMessagesList>", [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7ef017e7-d003-003c-19a8-1d2983000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Sat, 08 Jun 2019 03:17:45 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue155996386468409787/messages')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '217bcafe-0003-007a-41a8-1df715000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Sat, 08 Jun 2019 03:17:46 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue155996386468409787/messages')
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
  'd73f694f-3003-0014-63a8-1d5e3c000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Sat, 08 Jun 2019 03:17:46 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue155996386468409787')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3904df89-5003-008c-72a8-1dd003000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Sat, 08 Jun 2019 03:17:47 GMT',
  'Connection',
  'close' ]);

