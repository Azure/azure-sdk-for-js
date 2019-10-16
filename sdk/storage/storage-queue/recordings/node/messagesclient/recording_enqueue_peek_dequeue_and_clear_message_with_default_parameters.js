let nock = require('nock');

module.exports.testInfo = {"queue":"queue156816831357204865"}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue156816831357204865')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a1c9d29e-3003-005c-5f47-689705000000',
  'x-ms-client-request-id',
  'a666b8eb-1af8-4ef6-a20d-d8692a3814a2',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:18:33 GMT' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .post('/queue156816831357204865/messages', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>Hello World</MessageText></QueueMessage>")
  .query(true)
  .reply(201, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>7a04fbba-af09-4478-9b07-9bdd43ed74b3</MessageId><InsertionTime>Wed, 11 Sep 2019 02:18:34 GMT</InsertionTime><ExpirationTime>Wed, 18 Sep 2019 02:18:34 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAAhpN8Nkdo1QE=</PopReceipt><TimeNextVisible>Wed, 11 Sep 2019 02:18:34 GMT</TimeNextVisible></QueueMessage></QueueMessagesList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e5eb5915-4003-0017-3747-68a69f000000',
  'x-ms-client-request-id',
  '6462ef9f-7dc0-4743-8ace-4a945c83f24d',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:18:33 GMT' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .post('/queue156816831357204865/messages', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>Hello World</MessageText></QueueMessage>")
  .query(true)
  .reply(201, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>b67c6069-0452-42b2-8815-37352b7c3f7f</MessageId><InsertionTime>Wed, 11 Sep 2019 02:18:34 GMT</InsertionTime><ExpirationTime>Wed, 18 Sep 2019 02:18:34 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAALvG7Nkdo1QE=</PopReceipt><TimeNextVisible>Wed, 11 Sep 2019 02:18:34 GMT</TimeNextVisible></QueueMessage></QueueMessagesList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3bdad21e-9003-003c-6847-68d227000000',
  'x-ms-client-request-id',
  'cf4fadd5-fcdc-4c5e-8a0c-6a7c264295c6',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:18:33 GMT' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue156816831357204865/messages')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>7a04fbba-af09-4478-9b07-9bdd43ed74b3</MessageId><InsertionTime>Wed, 11 Sep 2019 02:18:34 GMT</InsertionTime><ExpirationTime>Wed, 18 Sep 2019 02:18:34 GMT</ExpirationTime><DequeueCount>0</DequeueCount><MessageText>Hello World</MessageText></QueueMessage></QueueMessagesList>", [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2568a130-2003-0061-0147-682223000000',
  'x-ms-client-request-id',
  'dc4626bf-33e0-4708-bc17-73b0e68c63c1',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 11 Sep 2019 02:18:35 GMT' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue156816831357204865/messages')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>7a04fbba-af09-4478-9b07-9bdd43ed74b3</MessageId><InsertionTime>Wed, 11 Sep 2019 02:18:34 GMT</InsertionTime><ExpirationTime>Wed, 18 Sep 2019 02:18:34 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAAjyQeSUdo1QE=</PopReceipt><TimeNextVisible>Wed, 11 Sep 2019 02:19:05 GMT</TimeNextVisible><DequeueCount>1</DequeueCount><MessageText>Hello World</MessageText></QueueMessage></QueueMessagesList>", [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c84b2f95-8003-000a-3547-687f75000000',
  'x-ms-client-request-id',
  '8b15c59e-3f6b-4038-89b3-b2dc3d8b0250',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 11 Sep 2019 02:18:35 GMT' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue156816831357204865/messages')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'cc17b52e-4003-0058-3147-686287000000',
  'x-ms-client-request-id',
  '23940e50-6dc4-4794-8b35-2052b13c05f2',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:18:35 GMT' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue156816831357204865/messages')
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
  '96e5580e-e003-001a-2647-684993000000',
  'x-ms-client-request-id',
  '480c31c9-5def-4281-870b-f439fd7dbba6',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 11 Sep 2019 02:18:36 GMT' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue156816831357204865')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e69b6c3b-0003-001b-1047-68486e000000',
  'x-ms-client-request-id',
  '0cfca6a4-e899-4393-a348-fa1065f42fb7',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:18:36 GMT' ]);

