let nock = require('nock');

module.exports.testInfo = {"queue":"queue156758132080105412"}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue156758132080105412')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6e7f4039-f003-005c-10f0-62a2db000000',
  'x-ms-client-request-id',
  '41a6d1b7-b7bb-45ca-809a-48518a87d8e0',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 07:15:20 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .post('/queue156758132080105412/messages', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>Hello World</MessageText></QueueMessage>")
  .query(true)
  .reply(201, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>50bf5e23-f6e4-4e4e-9c52-9ba0b15bb436</MessageId><InsertionTime>Wed, 04 Sep 2019 07:15:21 GMT</InsertionTime><ExpirationTime>Wed, 04 Sep 2019 07:16:01 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAAhGd5g/Bi1QE=</PopReceipt><TimeNextVisible>Wed, 04 Sep 2019 07:15:21 GMT</TimeNextVisible></QueueMessage></QueueMessagesList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0ae125f2-e003-013d-75f0-627f95000000',
  'x-ms-client-request-id',
  '2ee3d29d-cff8-4d28-9c44-faa4fe642bb4',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 07:15:21 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .post('/queue156758132080105412/messages', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>Hello World</MessageText></QueueMessage>")
  .query(true)
  .reply(201, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>175fb393-96fa-4e20-93b9-3b557d99962c</MessageId><InsertionTime>Wed, 04 Sep 2019 07:15:21 GMT</InsertionTime><ExpirationTime>Wed, 04 Sep 2019 07:16:01 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAApEa1g/Bi1QE=</PopReceipt><TimeNextVisible>Wed, 04 Sep 2019 07:15:21 GMT</TimeNextVisible></QueueMessage></QueueMessagesList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '00a8c16a-0003-011a-41f0-626851000000',
  'x-ms-client-request-id',
  'f822fe08-a702-4a65-8051-3ea9811f5d46',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 07:15:21 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .post('/queue156758132080105412/messages', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>Hello World</MessageText></QueueMessage>")
  .query(true)
  .reply(201, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>e472ba0c-6843-40a8-860e-d95a91e72a51</MessageId><InsertionTime>Wed, 04 Sep 2019 07:15:22 GMT</InsertionTime><ExpirationTime>Wed, 04 Sep 2019 07:15:32 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAAnLLshvBi1QE=</PopReceipt><TimeNextVisible>Wed, 04 Sep 2019 07:15:27 GMT</TimeNextVisible></QueueMessage></QueueMessagesList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3c3f9b77-5003-015a-74f0-626f69000000',
  'x-ms-client-request-id',
  '1be26932-2b33-4e1a-8b9a-426646a2b7fa',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 07:15:22 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .post('/queue156758132080105412/messages', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>Hello World</MessageText></QueueMessage>")
  .query(true)
  .reply(201, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>b15231af-b8af-4afd-9fbf-18eb9646bd84</MessageId><InsertionTime>Wed, 04 Sep 2019 07:15:22 GMT</InsertionTime><ExpirationTime>Wed, 04 Sep 2019 07:15:42 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAAHWmBj/Bi1QE=</PopReceipt><TimeNextVisible>Wed, 04 Sep 2019 07:15:41 GMT</TimeNextVisible></QueueMessage></QueueMessagesList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6318857e-2003-00f6-03f0-6282cd000000',
  'x-ms-client-request-id',
  '15a3d378-2dbb-4285-8c47-7d3c48147b39',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 07:15:22 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue156758132080105412/messages')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>50bf5e23-f6e4-4e4e-9c52-9ba0b15bb436</MessageId><InsertionTime>Wed, 04 Sep 2019 07:15:21 GMT</InsertionTime><ExpirationTime>Wed, 04 Sep 2019 07:16:01 GMT</ExpirationTime><DequeueCount>0</DequeueCount><MessageText>Hello World</MessageText></QueueMessage><QueueMessage><MessageId>175fb393-96fa-4e20-93b9-3b557d99962c</MessageId><InsertionTime>Wed, 04 Sep 2019 07:15:21 GMT</InsertionTime><ExpirationTime>Wed, 04 Sep 2019 07:16:01 GMT</ExpirationTime><DequeueCount>0</DequeueCount><MessageText>Hello World</MessageText></QueueMessage></QueueMessagesList>", [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'fccae4a4-6003-0013-64f0-62d38f000000',
  'x-ms-client-request-id',
  'c9417974-6b3a-4ff7-adeb-24bd2ef6aeb5',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 04 Sep 2019 07:15:22 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue156758132080105412/messages')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>50bf5e23-f6e4-4e4e-9c52-9ba0b15bb436</MessageId><InsertionTime>Wed, 04 Sep 2019 07:15:21 GMT</InsertionTime><ExpirationTime>Wed, 04 Sep 2019 07:16:01 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAAP9ioivBi1QE=</PopReceipt><TimeNextVisible>Wed, 04 Sep 2019 07:15:33 GMT</TimeNextVisible><DequeueCount>1</DequeueCount><MessageText>Hello World</MessageText></QueueMessage><QueueMessage><MessageId>175fb393-96fa-4e20-93b9-3b557d99962c</MessageId><InsertionTime>Wed, 04 Sep 2019 07:15:21 GMT</InsertionTime><ExpirationTime>Wed, 04 Sep 2019 07:16:01 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAAP9ioivBi1QE=</PopReceipt><TimeNextVisible>Wed, 04 Sep 2019 07:15:33 GMT</TimeNextVisible><DequeueCount>1</DequeueCount><MessageText>Hello World</MessageText></QueueMessage></QueueMessagesList>", [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '80eed9e9-1003-014b-1af0-62f5dd000000',
  'x-ms-client-request-id',
  'e1888d21-36ed-429f-8ebb-c8dfe1273e37',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 04 Sep 2019 07:15:23 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue156758132080105412/messages')
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
  'e575e43d-4003-00cf-7ef0-6279d1000000',
  'x-ms-client-request-id',
  '6daed693-d429-4ee6-9d41-84617bff6841',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 04 Sep 2019 07:15:23 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue156758132080105412')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd82399aa-7003-00fb-2ff0-624a19000000',
  'x-ms-client-request-id',
  'db470100-5c75-4c83-8e51-d3a844d23a65',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 07:15:23 GMT',
  'Connection',
  'close' ]);

