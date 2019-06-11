let nock = require('nock');

module.exports.testInfo = {"queue":"queue156027471615104731"}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue156027471615104731')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a18d77e7-f003-009a-277c-20f654000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 11 Jun 2019 17:38:35 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .post('/queue156027471615104731/messages', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>Hello World</MessageText></QueueMessage>")
  .query(true)
  .reply(201, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>3b5b3ed2-d17c-4c9f-889b-e41fd344e256</MessageId><InsertionTime>Tue, 11 Jun 2019 17:38:36 GMT</InsertionTime><ExpirationTime>Tue, 11 Jun 2019 17:39:16 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAAbLaof3wg1QE=</PopReceipt><TimeNextVisible>Tue, 11 Jun 2019 17:38:36 GMT</TimeNextVisible></QueueMessage></QueueMessagesList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'dc024966-a003-0028-757c-200d2e000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 11 Jun 2019 17:38:35 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .post('/queue156027471615104731/messages', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>Hello World</MessageText></QueueMessage>")
  .query(true)
  .reply(201, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>e0aa61af-45e4-4691-9683-eb976c317e66</MessageId><InsertionTime>Tue, 11 Jun 2019 17:38:37 GMT</InsertionTime><ExpirationTime>Tue, 11 Jun 2019 17:39:17 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAAiNPWf3wg1QE=</PopReceipt><TimeNextVisible>Tue, 11 Jun 2019 17:38:37 GMT</TimeNextVisible></QueueMessage></QueueMessagesList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1561fe7f-d003-00af-107c-205801000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 11 Jun 2019 17:38:36 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .post('/queue156027471615104731/messages', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>Hello World</MessageText></QueueMessage>")
  .query(true)
  .reply(201, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>8848b192-d024-4aa2-ae53-e086e46381d1</MessageId><InsertionTime>Tue, 11 Jun 2019 17:38:37 GMT</InsertionTime><ExpirationTime>Tue, 11 Jun 2019 17:38:47 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAA2xkBg3wg1QE=</PopReceipt><TimeNextVisible>Tue, 11 Jun 2019 17:38:42 GMT</TimeNextVisible></QueueMessage></QueueMessagesList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5592e890-5003-0036-447c-20d7c3000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 11 Jun 2019 17:38:36 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .post('/queue156027471615104731/messages', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>Hello World</MessageText></QueueMessage>")
  .query(true)
  .reply(201, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>17122c7a-63b4-418b-9099-0013e4dc1eb3</MessageId><InsertionTime>Tue, 11 Jun 2019 17:38:37 GMT</InsertionTime><ExpirationTime>Tue, 11 Jun 2019 17:38:57 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAAEpmHi3wg1QE=</PopReceipt><TimeNextVisible>Tue, 11 Jun 2019 17:38:56 GMT</TimeNextVisible></QueueMessage></QueueMessagesList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2ff65be5-7003-00a2-087c-20b70d000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 11 Jun 2019 17:38:36 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue156027471615104731/messages')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>3b5b3ed2-d17c-4c9f-889b-e41fd344e256</MessageId><InsertionTime>Tue, 11 Jun 2019 17:38:36 GMT</InsertionTime><ExpirationTime>Tue, 11 Jun 2019 17:39:16 GMT</ExpirationTime><DequeueCount>0</DequeueCount><MessageText>Hello World</MessageText></QueueMessage><QueueMessage><MessageId>e0aa61af-45e4-4691-9683-eb976c317e66</MessageId><InsertionTime>Tue, 11 Jun 2019 17:38:37 GMT</InsertionTime><ExpirationTime>Tue, 11 Jun 2019 17:39:17 GMT</ExpirationTime><DequeueCount>0</DequeueCount><MessageText>Hello World</MessageText></QueueMessage></QueueMessagesList>", [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bef62056-c003-00bb-187c-209b65000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 11 Jun 2019 17:38:37 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue156027471615104731/messages')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>3b5b3ed2-d17c-4c9f-889b-e41fd344e256</MessageId><InsertionTime>Tue, 11 Jun 2019 17:38:36 GMT</InsertionTime><ExpirationTime>Tue, 11 Jun 2019 17:39:16 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAA9yiFhnwg1QE=</PopReceipt><TimeNextVisible>Tue, 11 Jun 2019 17:38:48 GMT</TimeNextVisible><DequeueCount>1</DequeueCount><MessageText>Hello World</MessageText></QueueMessage><QueueMessage><MessageId>e0aa61af-45e4-4691-9683-eb976c317e66</MessageId><InsertionTime>Tue, 11 Jun 2019 17:38:37 GMT</InsertionTime><ExpirationTime>Tue, 11 Jun 2019 17:39:17 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAA9yiFhnwg1QE=</PopReceipt><TimeNextVisible>Tue, 11 Jun 2019 17:38:48 GMT</TimeNextVisible><DequeueCount>1</DequeueCount><MessageText>Hello World</MessageText></QueueMessage></QueueMessagesList>", [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8d861e36-8003-00b7-5e7c-207594000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 11 Jun 2019 17:38:37 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue156027471615104731/messages')
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
  'e06a58ad-c003-0011-417c-204d8a000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 11 Jun 2019 17:38:38 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue156027471615104731')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '348697b8-b003-0051-2d7c-206464000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 11 Jun 2019 17:38:38 GMT',
  'Connection',
  'close' ]);

