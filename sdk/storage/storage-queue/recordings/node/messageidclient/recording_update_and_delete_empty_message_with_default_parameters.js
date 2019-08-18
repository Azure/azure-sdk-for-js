let nock = require('nock');

module.exports.testInfo = {"queue":"queue156599412703500188"}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue156599412703500188')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9609ef13-3003-004b-6581-544b0b000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 16 Aug 2019 22:22:07 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .post('/queue156599412703500188/messages', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>Hello World</MessageText></QueueMessage>")
  .query(true)
  .reply(201, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>66b0b8b6-f902-4b92-b95c-a69829a7589f</MessageId><InsertionTime>Fri, 16 Aug 2019 22:22:07 GMT</InsertionTime><ExpirationTime>Fri, 23 Aug 2019 22:22:07 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAAHHQzCoFU1QE=</PopReceipt><TimeNextVisible>Fri, 16 Aug 2019 22:22:07 GMT</TimeNextVisible></QueueMessage></QueueMessagesList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7be3c781-a003-0089-7981-54c3b5000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 16 Aug 2019 22:22:07 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue156599412703500188/messages/66b0b8b6-f902-4b92-b95c-a69829a7589f', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText/></QueueMessage>")
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '61257787-e003-00e3-0281-549f1e000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-popreceipt',
  'AwAAAAMAAAAAAAAAtwZiCoFU1QEAAAAA',
  'x-ms-time-next-visible',
  'Fri, 16 Aug 2019 22:22:07 GMT',
  'Date',
  'Fri, 16 Aug 2019 22:22:07 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue156599412703500188/messages')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>66b0b8b6-f902-4b92-b95c-a69829a7589f</MessageId><InsertionTime>Fri, 16 Aug 2019 22:22:07 GMT</InsertionTime><ExpirationTime>Fri, 23 Aug 2019 22:22:07 GMT</ExpirationTime><DequeueCount>0</DequeueCount><MessageText /></QueueMessage></QueueMessagesList>", [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e418f3a0-3003-00ae-3a81-5459fc000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 16 Aug 2019 22:22:07 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue156599412703500188/messages/66b0b8b6-f902-4b92-b95c-a69829a7589f')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2d286e89-9003-0081-4081-54d8c6000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 16 Aug 2019 22:22:08 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue156599412703500188/messages')
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
  'e7f7aa27-3003-0069-7581-54253d000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 16 Aug 2019 22:22:08 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue156599412703500188')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b894bf40-7003-00cf-4b81-541d23000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 16 Aug 2019 22:22:08 GMT',
  'Connection',
  'close' ]);

