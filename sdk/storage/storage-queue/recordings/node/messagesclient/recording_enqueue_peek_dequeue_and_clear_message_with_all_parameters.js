let nock = require('nock');

module.exports.testInfo = {"queue":"queue156149548512906398"}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue156149548512906398')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '984e65b4-2003-007d-0a96-2be659000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 25 Jun 2019 20:44:45 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .post('/queue156149548512906398/messages', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>Hello World</MessageText></QueueMessage>")
  .query(true)
  .reply(201, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>e6759d9f-2d18-4b68-9cfc-bbdb3ed29723</MessageId><InsertionTime>Tue, 25 Jun 2019 20:44:45 GMT</InsertionTime><ExpirationTime>Tue, 25 Jun 2019 20:45:25 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAAF5m90pYr1QE=</PopReceipt><TimeNextVisible>Tue, 25 Jun 2019 20:44:45 GMT</TimeNextVisible></QueueMessage></QueueMessagesList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8d38b5fc-1003-00df-6496-2b2bc5000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 25 Jun 2019 20:44:45 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .post('/queue156149548512906398/messages', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>Hello World</MessageText></QueueMessage>")
  .query(true)
  .reply(201, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>3e4d6df5-94f4-40a5-a3f4-06b7531391f3</MessageId><InsertionTime>Tue, 25 Jun 2019 20:44:46 GMT</InsertionTime><ExpirationTime>Tue, 25 Jun 2019 20:45:26 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAAxKDs0pYr1QE=</PopReceipt><TimeNextVisible>Tue, 25 Jun 2019 20:44:46 GMT</TimeNextVisible></QueueMessage></QueueMessagesList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ddec8fb0-5003-0014-2896-2bb9f5000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 25 Jun 2019 20:44:45 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .post('/queue156149548512906398/messages', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>Hello World</MessageText></QueueMessage>")
  .query(true)
  .reply(201, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>71049657-dd75-425b-a957-35057f3e815f</MessageId><InsertionTime>Tue, 25 Jun 2019 20:44:46 GMT</InsertionTime><ExpirationTime>Tue, 25 Jun 2019 20:44:56 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAAEOcW1pYr1QE=</PopReceipt><TimeNextVisible>Tue, 25 Jun 2019 20:44:51 GMT</TimeNextVisible></QueueMessage></QueueMessagesList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '421caef5-b003-003c-6c96-2bce4a000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 25 Jun 2019 20:44:45 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .post('/queue156149548512906398/messages', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>Hello World</MessageText></QueueMessage>")
  .query(true)
  .reply(201, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>bcf1cff1-b6f1-4a7e-8ed3-86ef551fdbec</MessageId><InsertionTime>Tue, 25 Jun 2019 20:44:46 GMT</InsertionTime><ExpirationTime>Tue, 25 Jun 2019 20:45:06 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAApgKe3pYr1QE=</PopReceipt><TimeNextVisible>Tue, 25 Jun 2019 20:45:05 GMT</TimeNextVisible></QueueMessage></QueueMessagesList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bd7f2e10-0003-00ad-7e96-2b5afb000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 25 Jun 2019 20:44:46 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue156149548512906398/messages')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>e6759d9f-2d18-4b68-9cfc-bbdb3ed29723</MessageId><InsertionTime>Tue, 25 Jun 2019 20:44:45 GMT</InsertionTime><ExpirationTime>Tue, 25 Jun 2019 20:45:25 GMT</ExpirationTime><DequeueCount>0</DequeueCount><MessageText>Hello World</MessageText></QueueMessage><QueueMessage><MessageId>3e4d6df5-94f4-40a5-a3f4-06b7531391f3</MessageId><InsertionTime>Tue, 25 Jun 2019 20:44:46 GMT</InsertionTime><ExpirationTime>Tue, 25 Jun 2019 20:45:26 GMT</ExpirationTime><DequeueCount>0</DequeueCount><MessageText>Hello World</MessageText></QueueMessage></QueueMessagesList>", [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '74f7998f-5003-001f-7496-2ba181000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 25 Jun 2019 20:44:46 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue156149548512906398/messages')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>e6759d9f-2d18-4b68-9cfc-bbdb3ed29723</MessageId><InsertionTime>Tue, 25 Jun 2019 20:44:45 GMT</InsertionTime><ExpirationTime>Tue, 25 Jun 2019 20:45:25 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAADSue2ZYr1QE=</PopReceipt><TimeNextVisible>Tue, 25 Jun 2019 20:44:57 GMT</TimeNextVisible><DequeueCount>1</DequeueCount><MessageText>Hello World</MessageText></QueueMessage><QueueMessage><MessageId>3e4d6df5-94f4-40a5-a3f4-06b7531391f3</MessageId><InsertionTime>Tue, 25 Jun 2019 20:44:46 GMT</InsertionTime><ExpirationTime>Tue, 25 Jun 2019 20:45:26 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAADSue2ZYr1QE=</PopReceipt><TimeNextVisible>Tue, 25 Jun 2019 20:44:57 GMT</TimeNextVisible><DequeueCount>1</DequeueCount><MessageText>Hello World</MessageText></QueueMessage></QueueMessagesList>", [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ba90f708-8003-0034-4196-2bd539000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 25 Jun 2019 20:44:46 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue156149548512906398/messages')
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
  '053389db-e003-00a7-6e96-2b4372000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 25 Jun 2019 20:44:46 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue156149548512906398')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f8edc6b0-7003-00a9-2f96-2baf79000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 25 Jun 2019 20:44:47 GMT',
  'Connection',
  'close' ]);

