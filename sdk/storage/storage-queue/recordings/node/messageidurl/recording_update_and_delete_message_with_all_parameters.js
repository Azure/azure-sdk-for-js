let nock = require('nock');

module.exports.testInfo = {"queue":"queue156758129804006248"}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue156758129804006248')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '238fcffc-3003-00c5-75f0-62dd66000000',
  'x-ms-client-request-id',
  'b072f0ef-f093-4cd5-bbb9-6d5bdf203425',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 07:14:57 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .post('/queue156758129804006248/messages', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>Hello World</MessageText></QueueMessage>")
  .query(true)
  .reply(201, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>41a01a4b-482b-4f8e-8fa7-0f5429f61582</MessageId><InsertionTime>Wed, 04 Sep 2019 07:14:58 GMT</InsertionTime><ExpirationTime>Wed, 11 Sep 2019 07:14:58 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAA2hjodfBi1QE=</PopReceipt><TimeNextVisible>Wed, 04 Sep 2019 07:14:58 GMT</TimeNextVisible></QueueMessage></QueueMessagesList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6a210ee1-e003-000d-58f0-623f57000000',
  'x-ms-client-request-id',
  '71d5db9d-b856-47fd-94cc-1daffbe1e1bd',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 07:14:58 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue156758129804006248/messages/41a01a4b-482b-4f8e-8fa7-0f5429f61582', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>New Message</MessageText></QueueMessage>")
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1902c475-a003-00d7-0ef0-62a6b6000000',
  'x-ms-client-request-id',
  '450ba4e1-1c30-4ba5-a53e-1c114c42362e',
  'x-ms-version',
  '2019-02-02',
  'x-ms-popreceipt',
  'AwAAAAMAAAAAAAAAKK4bfPBi1QEAAAAA',
  'x-ms-time-next-visible',
  'Wed, 04 Sep 2019 07:15:09 GMT',
  'Date',
  'Wed, 04 Sep 2019 07:14:59 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue156758129804006248/messages')
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
  '69187997-8003-00ef-78f0-620276000000',
  'x-ms-client-request-id',
  'a1353e89-aca0-434a-bbe8-ee1bc13d042b',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 04 Sep 2019 07:14:58 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue156758129804006248/messages')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>41a01a4b-482b-4f8e-8fa7-0f5429f61582</MessageId><InsertionTime>Wed, 04 Sep 2019 07:14:58 GMT</InsertionTime><ExpirationTime>Wed, 11 Sep 2019 07:14:58 GMT</ExpirationTime><DequeueCount>0</DequeueCount><MessageText>New Message</MessageText></QueueMessage></QueueMessagesList>", [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '29e9a504-a003-0051-80f0-626a0f000000',
  'x-ms-client-request-id',
  '386e323b-b05b-4c78-a526-39c1bd5b0e10',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 04 Sep 2019 07:15:09 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue156758129804006248')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd4bd8e22-4003-0049-39f0-62b568000000',
  'x-ms-client-request-id',
  'a6c93e8f-170a-401d-b07d-821909c6b80f',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 07:15:10 GMT',
  'Connection',
  'close' ]);

