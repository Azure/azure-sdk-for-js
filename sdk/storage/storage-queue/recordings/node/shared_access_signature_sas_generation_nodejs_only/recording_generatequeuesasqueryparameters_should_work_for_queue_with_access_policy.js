let nock = require('nock');

module.exports.testInfo = {"now":"2019-06-08T03:18:52.543Z","tmr":"2019-06-08T03:18:52.543Z","queue":"queue155996393254304257"}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue155996393254304257')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '74d88ae4-5003-0069-06a8-1dc2f4000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Sat, 08 Jun 2019 03:18:51 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue155996393254304257', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><SignedIdentifiers><SignedIdentifier><Id>unique-id</Id><AccessPolicy><Start>2019-06-08T03:13:52.5430000Z</Start><Expiry>2019-06-09T03:18:52.5430000Z</Expiry><Permission>raup</Permission></AccessPolicy></SignedIdentifier></SignedIdentifiers>")
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '973b243e-c003-006c-3da8-1d368b000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Sat, 08 Jun 2019 03:18:52 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .post('/queue155996393254304257/messages', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>hello</MessageText></QueueMessage>")
  .query(true)
  .reply(201, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>cd081211-ea6f-419a-964c-121ce160be41</MessageId><InsertionTime>Sat, 08 Jun 2019 03:18:53 GMT</InsertionTime><ExpirationTime>Sat, 15 Jun 2019 03:18:53 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAAHjBD5qgd1QE=</PopReceipt><TimeNextVisible>Sat, 08 Jun 2019 03:18:53 GMT</TimeNextVisible></QueueMessage></QueueMessagesList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6c99e86c-d003-0015-0aa8-1d5fc1000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Sat, 08 Jun 2019 03:18:52 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue155996393254304257/messages')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>cd081211-ea6f-419a-964c-121ce160be41</MessageId><InsertionTime>Sat, 08 Jun 2019 03:18:53 GMT</InsertionTime><ExpirationTime>Sat, 15 Jun 2019 03:18:53 GMT</ExpirationTime><DequeueCount>0</DequeueCount><MessageText>hello</MessageText></QueueMessage></QueueMessagesList>", [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bd4b3e5c-2003-0083-18a8-1d3df5000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Sat, 08 Jun 2019 03:18:53 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue155996393254304257/messages')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>cd081211-ea6f-419a-964c-121ce160be41</MessageId><InsertionTime>Sat, 08 Jun 2019 03:18:53 GMT</InsertionTime><ExpirationTime>Sat, 15 Jun 2019 03:18:53 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAA61xa56gd1QE=</PopReceipt><TimeNextVisible>Sat, 08 Jun 2019 03:18:55 GMT</TimeNextVisible><DequeueCount>1</DequeueCount><MessageText>hello</MessageText></QueueMessage></QueueMessagesList>", [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'fd9932e4-a003-0038-4aa8-1ddc01000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Sat, 08 Jun 2019 03:18:53 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue155996393254304257/messages/cd081211-ea6f-419a-964c-121ce160be41')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6811c1ca-4003-001b-59a8-1db3ca000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Sat, 08 Jun 2019 03:18:55 GMT',
  'Connection',
  'close' ]);

