let nock = require('nock');

module.exports.testInfo = {"queue":"queue156404668586900511"}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue156404668586900511')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '69e8d9da-2003-009a-71ca-42b253000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Thu, 25 Jul 2019 09:21:07 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .post('/queue156404668586900511/messages', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>Hello World</MessageText></QueueMessage>")
  .query(true)
  .reply(201, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>13be1275-f10c-4d40-a260-a5407813de3f</MessageId><InsertionTime>Thu, 25 Jul 2019 09:21:08 GMT</InsertionTime><ExpirationTime>Thu, 01 Aug 2019 09:21:08 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAAWUK8SspC1QE=</PopReceipt><TimeNextVisible>Thu, 25 Jul 2019 09:21:08 GMT</TimeNextVisible></QueueMessage></QueueMessagesList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9b87932d-6003-0138-63ca-42399a000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Thu, 25 Jul 2019 09:21:07 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue156404668586900511/messages/13be1275-f10c-4d40-a260-a5407813de3f', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>New Message</MessageText></QueueMessage>")
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0618c614-4003-0106-2dca-428fbb000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-popreceipt',
  'AwAAAAMAAAAAAAAAX8HaUMpC1QEAAAAA',
  'x-ms-time-next-visible',
  'Thu, 25 Jul 2019 09:21:18 GMT',
  'Date',
  'Thu, 25 Jul 2019 09:21:08 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue156404668586900511/messages')
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
  '0618c642-4003-0106-49ca-428fbb000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 25 Jul 2019 09:21:08 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue156404668586900511/messages')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>13be1275-f10c-4d40-a260-a5407813de3f</MessageId><InsertionTime>Thu, 25 Jul 2019 09:21:08 GMT</InsertionTime><ExpirationTime>Thu, 01 Aug 2019 09:21:08 GMT</ExpirationTime><DequeueCount>0</DequeueCount><MessageText>New Message</MessageText></QueueMessage></QueueMessagesList>", [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '556ff077-6003-0073-79ca-424e55000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 25 Jul 2019 09:21:18 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue156404668586900511')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '20952ac1-8003-00b5-3cca-423369000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Thu, 25 Jul 2019 09:21:19 GMT',
  'Connection',
  'close' ]);

