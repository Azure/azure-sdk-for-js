let nock = require('nock');

module.exports.testInfo = {"queue":"queue156758131742208531"}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue156758131742208531')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a0bd9ab1-3003-0031-4bf0-621690000000',
  'x-ms-client-request-id',
  'df99c9d1-57a6-4d2f-b828-8d4404737e67',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 07:15:16 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .post('/queue156758131742208531/messages', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>Hello World</MessageText></QueueMessage>")
  .query(true)
  .reply(201, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>a3d64eba-3e95-4daf-93be-d0457382c167</MessageId><InsertionTime>Wed, 04 Sep 2019 07:15:18 GMT</InsertionTime><ExpirationTime>Wed, 11 Sep 2019 07:15:18 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAAsnh1gfBi1QE=</PopReceipt><TimeNextVisible>Wed, 04 Sep 2019 07:15:18 GMT</TimeNextVisible></QueueMessage></QueueMessagesList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a054ac38-b003-005d-02f0-62fd07000000',
  'x-ms-client-request-id',
  '6bb1dd79-2782-4f99-a8a4-5e60561d3e8b',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 07:15:17 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .post('/queue156758131742208531/messages', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>Hello World</MessageText></QueueMessage>")
  .query(true)
  .reply(201, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>bf74a4aa-aa43-466a-8558-47de4b475699</MessageId><InsertionTime>Wed, 04 Sep 2019 07:15:18 GMT</InsertionTime><ExpirationTime>Wed, 11 Sep 2019 07:15:18 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAAIrO/gfBi1QE=</PopReceipt><TimeNextVisible>Wed, 04 Sep 2019 07:15:18 GMT</TimeNextVisible></QueueMessage></QueueMessagesList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '344140ab-e003-0112-52f0-62725e000000',
  'x-ms-client-request-id',
  'af1ec1a0-3e61-45ff-887f-2f8bc531f72c',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 07:15:18 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue156758131742208531/messages')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>a3d64eba-3e95-4daf-93be-d0457382c167</MessageId><InsertionTime>Wed, 04 Sep 2019 07:15:18 GMT</InsertionTime><ExpirationTime>Wed, 11 Sep 2019 07:15:18 GMT</ExpirationTime><DequeueCount>0</DequeueCount><MessageText>Hello World</MessageText></QueueMessage></QueueMessagesList>", [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '065d58c7-e003-00d6-09f0-62f96a000000',
  'x-ms-client-request-id',
  'b2742fce-7c1f-4af9-846c-e0e82252bf25',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 04 Sep 2019 07:15:18 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue156758131742208531/messages')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>a3d64eba-3e95-4daf-93be-d0457382c167</MessageId><InsertionTime>Wed, 04 Sep 2019 07:15:18 GMT</InsertionTime><ExpirationTime>Wed, 11 Sep 2019 07:15:18 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAAOvsblPBi1QE=</PopReceipt><TimeNextVisible>Wed, 04 Sep 2019 07:15:49 GMT</TimeNextVisible><DequeueCount>1</DequeueCount><MessageText>Hello World</MessageText></QueueMessage></QueueMessagesList>", [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '478663ce-7003-0052-14f0-628b6b000000',
  'x-ms-client-request-id',
  '716bf65b-c139-49c2-b450-7ee5823b3f1a',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 04 Sep 2019 07:15:19 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue156758131742208531/messages')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0ae12583-e003-013d-19f0-627f95000000',
  'x-ms-client-request-id',
  '9c67c7ac-51dc-4126-91ec-9d24b2fe17b2',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 07:15:19 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue156758131742208531/messages')
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
  '1d799bc0-f003-010e-06f0-62203e000000',
  'x-ms-client-request-id',
  '9c4120a8-6a8c-42af-8ff5-fed6637a3c7f',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 04 Sep 2019 07:15:19 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue156758131742208531')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7286a6f5-9003-0038-0df0-625343000000',
  'x-ms-client-request-id',
  'c0698497-a548-4e7c-af43-0f6b41feafd6',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 07:15:20 GMT',
  'Connection',
  'close' ]);

