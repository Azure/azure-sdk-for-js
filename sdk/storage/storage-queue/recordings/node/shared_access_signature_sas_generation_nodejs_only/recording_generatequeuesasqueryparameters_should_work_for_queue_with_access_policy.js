let nock = require('nock');

module.exports.testInfo = {"now":"2019-09-11T02:20:23.991Z","tmr":"2019-09-11T02:20:23.991Z","queue":"queue156816842399105840"}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue156816842399105840')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '348b549a-f003-002c-6247-68e4c1000000',
  'x-ms-client-request-id',
  'dc752532-78ba-4777-bf08-ff22c88e4af3',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:20:23 GMT' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue156816842399105840', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><SignedIdentifiers><SignedIdentifier><Id>unique-id</Id><AccessPolicy><Start>2019-09-11T02:15:23.9910000Z</Start><Expiry>2019-09-12T02:20:23.9910000Z</Expiry><Permission>raup</Permission></AccessPolicy></SignedIdentifier></SignedIdentifiers>")
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '388a45f3-b003-0064-2647-68d65c000000',
  'x-ms-client-request-id',
  '0c438541-da75-4f3b-91b7-31b575ccd758',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:20:24 GMT' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .post('/queue156816842399105840/messages', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>hello</MessageText></QueueMessage>")
  .query(true)
  .reply(201, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>a6b0e6fe-9987-4342-b82e-d05910962c37</MessageId><InsertionTime>Wed, 11 Sep 2019 02:20:25 GMT</InsertionTime><ExpirationTime>Wed, 18 Sep 2019 02:20:25 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAAwfGQeEdo1QE=</PopReceipt><TimeNextVisible>Wed, 11 Sep 2019 02:20:25 GMT</TimeNextVisible></QueueMessage></QueueMessagesList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '64277cb1-f003-0041-4f47-684eef000000',
  'x-ms-client-request-id',
  'f4f8e279-9232-4748-bc54-2849229dfb18',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:20:24 GMT' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue156816842399105840/messages')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>a6b0e6fe-9987-4342-b82e-d05910962c37</MessageId><InsertionTime>Wed, 11 Sep 2019 02:20:25 GMT</InsertionTime><ExpirationTime>Wed, 18 Sep 2019 02:20:25 GMT</ExpirationTime><DequeueCount>0</DequeueCount><MessageText>hello</MessageText></QueueMessage></QueueMessagesList>", [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '67aca72b-8003-0028-5247-681143000000',
  'x-ms-client-request-id',
  'f3a02fd6-6036-4d79-9018-8846d907809d',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 11 Sep 2019 02:20:24 GMT' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue156816842399105840/messages')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>a6b0e6fe-9987-4342-b82e-d05910962c37</MessageId><InsertionTime>Wed, 11 Sep 2019 02:20:25 GMT</InsertionTime><ExpirationTime>Wed, 18 Sep 2019 02:20:25 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAA2QqneUdo1QE=</PopReceipt><TimeNextVisible>Wed, 11 Sep 2019 02:20:27 GMT</TimeNextVisible><DequeueCount>1</DequeueCount><MessageText>hello</MessageText></QueueMessage></QueueMessagesList>", [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ee6d0288-2003-002e-7a47-68e63b000000',
  'x-ms-client-request-id',
  'e1f341c4-035e-4f48-b107-1296afe2cf27',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 11 Sep 2019 02:20:25 GMT' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue156816842399105840/messages/a6b0e6fe-9987-4342-b82e-d05910962c37')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6f5ff1d3-4003-001c-3f47-68beeb000000',
  'x-ms-client-request-id',
  '84fd1deb-6c07-47ee-8d88-35c7aefe18e9',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:20:28 GMT' ]);

