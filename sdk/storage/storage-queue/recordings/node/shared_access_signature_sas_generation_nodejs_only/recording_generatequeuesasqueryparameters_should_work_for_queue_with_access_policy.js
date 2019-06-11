let nock = require('nock');

module.exports.testInfo = {"now":"2019-06-11T23:55:09.753Z","tmr":"2019-06-11T23:55:09.753Z","queue":"queue156029730975300678"}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue156029730975300678')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7326f5ad-1003-003a-06b1-203932000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 11 Jun 2019 23:55:09 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue156029730975300678', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><SignedIdentifiers><SignedIdentifier><Id>unique-id</Id><AccessPolicy><Start>2019-06-11T23:50:09.7530000Z</Start><Expiry>2019-06-12T23:55:09.7530000Z</Expiry><Permission>raup</Permission></AccessPolicy></SignedIdentifier></SignedIdentifiers>")
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '88ae4aef-1003-00b9-61b1-20999f000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 11 Jun 2019 23:55:10 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .post('/queue156029730975300678/messages', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>hello</MessageText></QueueMessage>")
  .query(true)
  .reply(201, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>b5b6ba7d-2dd2-4168-a77c-e7c50ecf5cb8</MessageId><InsertionTime>Tue, 11 Jun 2019 23:55:10 GMT</InsertionTime><ExpirationTime>Tue, 18 Jun 2019 23:55:10 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAAgqKuGrEg1QE=</PopReceipt><TimeNextVisible>Tue, 11 Jun 2019 23:55:10 GMT</TimeNextVisible></QueueMessage></QueueMessagesList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '25f864e4-e003-00ca-27b1-20e95c000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 11 Jun 2019 23:55:09 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue156029730975300678/messages')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>b5b6ba7d-2dd2-4168-a77c-e7c50ecf5cb8</MessageId><InsertionTime>Tue, 11 Jun 2019 23:55:10 GMT</InsertionTime><ExpirationTime>Tue, 18 Jun 2019 23:55:10 GMT</ExpirationTime><DequeueCount>0</DequeueCount><MessageText>hello</MessageText></QueueMessage></QueueMessagesList>", [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c368903c-0003-0007-38b1-208c14000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 11 Jun 2019 23:55:10 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue156029730975300678/messages')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>b5b6ba7d-2dd2-4168-a77c-e7c50ecf5cb8</MessageId><InsertionTime>Tue, 11 Jun 2019 23:55:10 GMT</InsertionTime><ExpirationTime>Tue, 18 Jun 2019 23:55:10 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAAvmWgG7Eg1QE=</PopReceipt><TimeNextVisible>Tue, 11 Jun 2019 23:55:12 GMT</TimeNextVisible><DequeueCount>1</DequeueCount><MessageText>hello</MessageText></QueueMessage></QueueMessagesList>", [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5ae0272c-d003-0041-58b1-205282000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 11 Jun 2019 23:55:10 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue156029730975300678/messages/b5b6ba7d-2dd2-4168-a77c-e7c50ecf5cb8')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ec2dac91-2003-0098-2eb1-20f4ae000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 11 Jun 2019 23:55:13 GMT',
  'Connection',
  'close' ]);

