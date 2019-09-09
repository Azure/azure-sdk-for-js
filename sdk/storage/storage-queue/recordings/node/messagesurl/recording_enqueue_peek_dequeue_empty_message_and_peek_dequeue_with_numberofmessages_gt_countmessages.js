let nock = require('nock');

module.exports.testInfo = {"queue":"queue156758132453208011"}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue156758132453208011')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4d2f5c41-9003-0075-33f0-629caf000000',
  'x-ms-client-request-id',
  '0b78bbc6-6ee5-41cb-af36-d24bb36465f8',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 07:15:24 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .post('/queue156758132453208011/messages', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText/></QueueMessage>")
  .query(true)
  .reply(201, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>95649c2f-608c-48da-84e0-c7fb13e12587</MessageId><InsertionTime>Wed, 04 Sep 2019 07:15:25 GMT</InsertionTime><ExpirationTime>Wed, 04 Sep 2019 07:16:05 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAA5ZmthfBi1QE=</PopReceipt><TimeNextVisible>Wed, 04 Sep 2019 07:15:25 GMT</TimeNextVisible></QueueMessage></QueueMessagesList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5f30ab26-1003-0009-0ef0-62b250000000',
  'x-ms-client-request-id',
  '7edaf1c0-2180-4ae4-9702-35ed19d393fd',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 07:15:24 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue156758132453208011/messages')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>95649c2f-608c-48da-84e0-c7fb13e12587</MessageId><InsertionTime>Wed, 04 Sep 2019 07:15:25 GMT</InsertionTime><ExpirationTime>Wed, 04 Sep 2019 07:16:05 GMT</ExpirationTime><DequeueCount>0</DequeueCount><MessageText /></QueueMessage></QueueMessagesList>", [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '858a0c3c-1003-0054-11f0-62b8d4000000',
  'x-ms-client-request-id',
  'aa6683e4-9be2-4e36-901f-5eba87ebc3ae',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 04 Sep 2019 07:15:25 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue156758132453208011/messages')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>95649c2f-608c-48da-84e0-c7fb13e12587</MessageId><InsertionTime>Wed, 04 Sep 2019 07:15:25 GMT</InsertionTime><ExpirationTime>Wed, 04 Sep 2019 07:16:05 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAAc+MejPBi1QE=</PopReceipt><TimeNextVisible>Wed, 04 Sep 2019 07:15:35 GMT</TimeNextVisible><DequeueCount>1</DequeueCount><MessageText /></QueueMessage></QueueMessagesList>", [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd82399c6-7003-00fb-3ef0-624a19000000',
  'x-ms-client-request-id',
  '3db6696a-fd82-4ac1-81d1-336e1ea487a0',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 04 Sep 2019 07:15:24 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue156758132453208011')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8fb92df9-1003-0019-08f0-627738000000',
  'x-ms-client-request-id',
  '6db37124-0c4c-45d1-8895-7afa908e529b',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 07:15:26 GMT',
  'Connection',
  'close' ]);

