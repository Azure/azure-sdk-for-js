let nock = require('nock');

module.exports.testInfo = {"now":"2019-06-11T23:55:08.004Z","tmr":"2019-06-11T23:55:08.004Z","queue":"queue156029730800401003"}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue156029730800401003')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c77cecc4-7003-0065-27b1-20cbcc000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 11 Jun 2019 23:55:07 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .post('/queue156029730800401003/messages', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>Hello World!</MessageText></QueueMessage>")
  .query(true)
  .reply(201, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>0bad3e6c-79c4-4fca-82de-01a2374306b5</MessageId><InsertionTime>Tue, 11 Jun 2019 23:55:08 GMT</InsertionTime><ExpirationTime>Tue, 18 Jun 2019 23:55:08 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAAjrhwGbEg1QE=</PopReceipt><TimeNextVisible>Tue, 11 Jun 2019 23:55:08 GMT</TimeNextVisible></QueueMessage></QueueMessagesList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1c5e694e-0003-000c-5ab1-209460000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 11 Jun 2019 23:55:07 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue156029730800401003/messages')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>0bad3e6c-79c4-4fca-82de-01a2374306b5</MessageId><InsertionTime>Tue, 11 Jun 2019 23:55:08 GMT</InsertionTime><ExpirationTime>Tue, 18 Jun 2019 23:55:08 GMT</ExpirationTime><DequeueCount>0</DequeueCount><MessageText>Hello World!</MessageText></QueueMessage></QueueMessagesList>", [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd1c66bdd-9003-00e7-2db1-206a9c000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 11 Jun 2019 23:55:08 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue156029730800401003/messages/0bad3e6c-79c4-4fca-82de-01a2374306b5')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '95ce0c7a-c003-0033-6bb1-2023bc000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 11 Jun 2019 23:55:08 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue156029730800401003/messages')
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
  'be71be1e-6003-0017-39b1-20baf2000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 11 Jun 2019 23:55:08 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue156029730800401003')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '01916741-e003-008e-71b1-203530000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 11 Jun 2019 23:55:08 GMT',
  'Connection',
  'close' ]);

