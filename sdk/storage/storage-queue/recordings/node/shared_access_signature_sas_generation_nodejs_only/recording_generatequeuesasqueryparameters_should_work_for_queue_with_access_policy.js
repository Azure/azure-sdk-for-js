let nock = require('nock');

module.exports.testInfo = {"now":"2019-06-08T02:09:37.699Z","tmr":"2019-06-08T02:09:37.699Z","queue":"queue155995977769902373"}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue155995977769902373')
  .query({"timeout":"30"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'fb3b3014-a003-0077-3f9f-1d1819000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Sat, 08 Jun 2019 02:09:37 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue155995977769902373', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><SignedIdentifiers><SignedIdentifier><Id>unique-id</Id><AccessPolicy><Start>2019-06-08T02:04:37.6990000Z</Start><Expiry>2019-06-09T02:09:37.6990000Z</Expiry><Permission>raup</Permission></AccessPolicy></SignedIdentifier></SignedIdentifiers>")
  .query({"comp":"acl","timeout":"30"})
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3cfaab25-8003-0060-519f-1dd87a000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Sat, 08 Jun 2019 02:09:37 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .post('/queue155995977769902373/messages', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>hello</MessageText></QueueMessage>")
  .query({"sv":"2018-03-28","si":"unique-id","sig":"qA%2BjlQE1%2FwJHAQyXtoNsyyQpKvl7NOmF2GnDgQ0M2%2BE%3D","timeout":"30"})
  .reply(201, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>374871c6-43d3-4404-bf8f-1c3536d2985f</MessageId><InsertionTime>Sat, 08 Jun 2019 02:09:38 GMT</InsertionTime><ExpirationTime>Sat, 15 Jun 2019 02:09:38 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAAuG/BOZ8d1QE=</PopReceipt><TimeNextVisible>Sat, 08 Jun 2019 02:09:38 GMT</TimeNextVisible></QueueMessage></QueueMessagesList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '94c65212-a003-0055-289f-1d762f000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Sat, 08 Jun 2019 02:09:37 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue155995977769902373/messages')
  .query({"sv":"2018-03-28","si":"unique-id","sig":"qA%2BjlQE1%2FwJHAQyXtoNsyyQpKvl7NOmF2GnDgQ0M2%2BE%3D","peekonly":"true","timeout":"30"})
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>374871c6-43d3-4404-bf8f-1c3536d2985f</MessageId><InsertionTime>Sat, 08 Jun 2019 02:09:38 GMT</InsertionTime><ExpirationTime>Sat, 15 Jun 2019 02:09:38 GMT</ExpirationTime><DequeueCount>0</DequeueCount><MessageText>hello</MessageText></QueueMessage></QueueMessagesList>", [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3cfaabae-8003-0060-469f-1dd87a000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Sat, 08 Jun 2019 02:09:38 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue155995977769902373/messages')
  .query({"sv":"2018-03-28","si":"unique-id","sig":"qA%2BjlQE1%2FwJHAQyXtoNsyyQpKvl7NOmF2GnDgQ0M2%2BE%3D","visibilitytimeout":"1","timeout":"30"})
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>374871c6-43d3-4404-bf8f-1c3536d2985f</MessageId><InsertionTime>Sat, 08 Jun 2019 02:09:38 GMT</InsertionTime><ExpirationTime>Sat, 15 Jun 2019 02:09:38 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAAs+rYOp8d1QE=</PopReceipt><TimeNextVisible>Sat, 08 Jun 2019 02:09:40 GMT</TimeNextVisible><DequeueCount>1</DequeueCount><MessageText>hello</MessageText></QueueMessage></QueueMessagesList>", [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '577046ff-9003-0056-589f-1d7528000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Sat, 08 Jun 2019 02:09:38 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue155995977769902373/messages/374871c6-43d3-4404-bf8f-1c3536d2985f')
  .query({"sv":"2018-03-28","si":"unique-id","sig":"qA%2BjlQE1%2FwJHAQyXtoNsyyQpKvl7NOmF2GnDgQ0M2%2BE%3D","popreceipt":"AgAAAAMAAAAAAAAAs%2BrYOp8d1QE%3D","timeout":"30"})
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '02cbf76f-a003-001a-669f-1db237000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Sat, 08 Jun 2019 02:09:41 GMT',
  'Connection',
  'close' ]);

