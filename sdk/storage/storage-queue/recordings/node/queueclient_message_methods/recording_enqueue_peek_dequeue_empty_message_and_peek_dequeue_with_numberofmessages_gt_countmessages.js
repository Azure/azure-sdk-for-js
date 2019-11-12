let nock = require('nock');

module.exports.testInfo = {"queue":"queue156816832078507818"}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue156816832078507818')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e39d99bc-f003-000e-3e47-688af7000000',
  'x-ms-client-request-id',
  '1b0812f7-ce2c-4553-9763-dc9d91ddba2d',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:18:40 GMT' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .post('/queue156816832078507818/messages', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText/></QueueMessage>")
  .query(true)
  .reply(201, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>80720254-bab5-424a-afac-9704e32702d8</MessageId><InsertionTime>Wed, 11 Sep 2019 02:18:41 GMT</InsertionTime><ExpirationTime>Wed, 11 Sep 2019 02:19:21 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAA0NXKOkdo1QE=</PopReceipt><TimeNextVisible>Wed, 11 Sep 2019 02:18:41 GMT</TimeNextVisible></QueueMessage></QueueMessagesList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0ff28c2a-d003-0019-3c47-684a94000000',
  'x-ms-client-request-id',
  '12eede7c-bfc7-4bd8-90a5-512b97dd379e',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:18:41 GMT' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue156816832078507818/messages')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>80720254-bab5-424a-afac-9704e32702d8</MessageId><InsertionTime>Wed, 11 Sep 2019 02:18:41 GMT</InsertionTime><ExpirationTime>Wed, 11 Sep 2019 02:19:21 GMT</ExpirationTime><DequeueCount>0</DequeueCount><MessageText /></QueueMessage></QueueMessagesList>", [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '11555434-c003-0024-3047-68ffb2000000',
  'x-ms-client-request-id',
  '922d3b69-e922-4b76-9e7a-ae3f73d562a2',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 11 Sep 2019 02:18:41 GMT' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue156816832078507818/messages')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>80720254-bab5-424a-afac-9704e32702d8</MessageId><InsertionTime>Wed, 11 Sep 2019 02:18:41 GMT</InsertionTime><ExpirationTime>Wed, 11 Sep 2019 02:19:21 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAA0qpAQUdo1QE=</PopReceipt><TimeNextVisible>Wed, 11 Sep 2019 02:18:52 GMT</TimeNextVisible><DequeueCount>1</DequeueCount><MessageText /></QueueMessage></QueueMessagesList>", [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c5ce735b-6003-0066-7347-68d4a6000000',
  'x-ms-client-request-id',
  'fd61dbf4-51e7-4634-a509-835a46ace18b',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 11 Sep 2019 02:18:41 GMT' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue156816832078507818')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '072a2b9f-5003-0008-4b47-687d8f000000',
  'x-ms-client-request-id',
  '6b494907-691e-4544-95a7-b6e954c9832d',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:18:42 GMT' ]);

