let nock = require('nock');

module.exports.testInfo = {"now":"2019-09-04T07:16:21.596Z","tmr":"2019-09-04T07:16:21.596Z","queue":"queue156758138159609727"}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue156758138159609727')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '29e9c23a-a003-0051-80f0-626a0f000000',
  'x-ms-client-request-id',
  '9593f55a-6ba7-4955-8eb7-81dea89804fc',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 07:16:21 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .post('/queue156758138159609727/messages', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>Hello World!</MessageText></QueueMessage>")
  .query(true)
  .reply(201, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>b77236a1-53a2-4cfc-b9d0-0ac8144e8603</MessageId><InsertionTime>Wed, 04 Sep 2019 07:16:22 GMT</InsertionTime><ExpirationTime>Wed, 11 Sep 2019 07:16:22 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAAA3Syp/Bi1QE=</PopReceipt><TimeNextVisible>Wed, 04 Sep 2019 07:16:22 GMT</TimeNextVisible></QueueMessage></QueueMessagesList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '61d0e65c-b003-004d-3df0-62386f000000',
  'x-ms-client-request-id',
  'edf8074d-7947-4e87-8a4d-78f49e6b5b21',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 07:16:21 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue156758138159609727/messages')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>b77236a1-53a2-4cfc-b9d0-0ac8144e8603</MessageId><InsertionTime>Wed, 04 Sep 2019 07:16:22 GMT</InsertionTime><ExpirationTime>Wed, 11 Sep 2019 07:16:22 GMT</ExpirationTime><DequeueCount>0</DequeueCount><MessageText>Hello World!</MessageText></QueueMessage></QueueMessagesList>", [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5e397a36-c003-0078-63f0-62547b000000',
  'x-ms-client-request-id',
  'f64ebf13-d313-4549-a04f-acdd5dd52c17',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 04 Sep 2019 07:16:22 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue156758138159609727/messages/b77236a1-53a2-4cfc-b9d0-0ac8144e8603')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '07e9e651-9003-0091-1bf0-629231000000',
  'x-ms-client-request-id',
  '6beee8d0-0793-4ad1-a846-5342e4e5e909',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 07:16:22 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue156758138159609727/messages')
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
  '12d23bf4-d003-0090-71f0-62cded000000',
  'x-ms-client-request-id',
  '860c4608-fd65-4641-8c02-97ee676b5326',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 04 Sep 2019 07:16:22 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue156758138159609727')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'edf1ec38-3003-007c-23f0-62d97c000000',
  'x-ms-client-request-id',
  '28895079-ed73-4d83-ba37-ffb4e46a9455',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 07:16:22 GMT',
  'Connection',
  'close' ]);

