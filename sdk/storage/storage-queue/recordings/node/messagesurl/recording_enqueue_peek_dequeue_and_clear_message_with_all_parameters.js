let nock = require('nock');

module.exports.testInfo = {"queue":"queue156029724486501565"}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue156029724486501565')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'cce4e6ca-8003-003f-05b0-20cd4d000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 11 Jun 2019 23:54:04 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .post('/queue156029724486501565/messages', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>Hello World</MessageText></QueueMessage>")
  .query(true)
  .reply(201, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>318a889e-2240-4896-a9e8-38b33d34b8ee</MessageId><InsertionTime>Tue, 11 Jun 2019 23:54:05 GMT</InsertionTime><ExpirationTime>Tue, 11 Jun 2019 23:54:45 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAAPD/P87Ag1QE=</PopReceipt><TimeNextVisible>Tue, 11 Jun 2019 23:54:05 GMT</TimeNextVisible></QueueMessage></QueueMessagesList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f80709c2-9003-0009-10b0-20601f000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 11 Jun 2019 23:54:05 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .post('/queue156029724486501565/messages', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>Hello World</MessageText></QueueMessage>")
  .query(true)
  .reply(201, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>9176693d-7909-456b-b3e1-e09a72f3b3af</MessageId><InsertionTime>Tue, 11 Jun 2019 23:54:05 GMT</InsertionTime><ExpirationTime>Tue, 11 Jun 2019 23:54:45 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAA19H987Ag1QE=</PopReceipt><TimeNextVisible>Tue, 11 Jun 2019 23:54:05 GMT</TimeNextVisible></QueueMessage></QueueMessagesList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1d8fc7e3-7003-00cf-68b0-201d23000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 11 Jun 2019 23:54:05 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .post('/queue156029724486501565/messages', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>Hello World</MessageText></QueueMessage>")
  .query(true)
  .reply(201, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>7afbbcd8-8db5-42f7-8b95-ec3ad8741b87</MessageId><InsertionTime>Tue, 11 Jun 2019 23:54:06 GMT</InsertionTime><ExpirationTime>Tue, 11 Jun 2019 23:54:16 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAAbJEm97Ag1QE=</PopReceipt><TimeNextVisible>Tue, 11 Jun 2019 23:54:11 GMT</TimeNextVisible></QueueMessage></QueueMessagesList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4f9327a9-7003-00ed-1bb0-207315000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 11 Jun 2019 23:54:05 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .post('/queue156029724486501565/messages', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>Hello World</MessageText></QueueMessage>")
  .query(true)
  .reply(201, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>cb8b114f-0973-4f8c-be0b-00b5b855b263</MessageId><InsertionTime>Tue, 11 Jun 2019 23:54:06 GMT</InsertionTime><ExpirationTime>Tue, 11 Jun 2019 23:54:26 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAAxxCt/7Ag1QE=</PopReceipt><TimeNextVisible>Tue, 11 Jun 2019 23:54:25 GMT</TimeNextVisible></QueueMessage></QueueMessagesList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'dd0c5ab7-8003-00b7-01b0-207594000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 11 Jun 2019 23:54:05 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue156029724486501565/messages')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>318a889e-2240-4896-a9e8-38b33d34b8ee</MessageId><InsertionTime>Tue, 11 Jun 2019 23:54:05 GMT</InsertionTime><ExpirationTime>Tue, 11 Jun 2019 23:54:45 GMT</ExpirationTime><DequeueCount>0</DequeueCount><MessageText>Hello World</MessageText></QueueMessage><QueueMessage><MessageId>9176693d-7909-456b-b3e1-e09a72f3b3af</MessageId><InsertionTime>Tue, 11 Jun 2019 23:54:05 GMT</InsertionTime><ExpirationTime>Tue, 11 Jun 2019 23:54:45 GMT</ExpirationTime><DequeueCount>0</DequeueCount><MessageText>Hello World</MessageText></QueueMessage></QueueMessagesList>", [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '28ca245e-f003-0056-57b0-2092e1000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 11 Jun 2019 23:54:06 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue156029724486501565/messages')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>318a889e-2240-4896-a9e8-38b33d34b8ee</MessageId><InsertionTime>Tue, 11 Jun 2019 23:54:05 GMT</InsertionTime><ExpirationTime>Tue, 11 Jun 2019 23:54:45 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAA/U6s+rAg1QE=</PopReceipt><TimeNextVisible>Tue, 11 Jun 2019 23:54:16 GMT</TimeNextVisible><DequeueCount>1</DequeueCount><MessageText>Hello World</MessageText></QueueMessage><QueueMessage><MessageId>9176693d-7909-456b-b3e1-e09a72f3b3af</MessageId><InsertionTime>Tue, 11 Jun 2019 23:54:05 GMT</InsertionTime><ExpirationTime>Tue, 11 Jun 2019 23:54:45 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAA/U6s+rAg1QE=</PopReceipt><TimeNextVisible>Tue, 11 Jun 2019 23:54:16 GMT</TimeNextVisible><DequeueCount>1</DequeueCount><MessageText>Hello World</MessageText></QueueMessage></QueueMessagesList>", [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5a0a7f88-5003-00b5-18b0-20776e000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 11 Jun 2019 23:54:06 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue156029724486501565/messages')
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
  '282ae1ec-a003-0067-78b0-20c936000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 11 Jun 2019 23:54:06 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue156029724486501565')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0191219b-e003-008e-26b0-203530000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 11 Jun 2019 23:54:06 GMT',
  'Connection',
  'close' ]);

