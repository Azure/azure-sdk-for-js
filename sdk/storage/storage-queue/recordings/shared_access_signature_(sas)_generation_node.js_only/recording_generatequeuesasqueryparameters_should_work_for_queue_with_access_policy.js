let nock = require('nock');

module.exports.testInfo = {"now":"2019-04-19T03:51:48.852Z","tmr":"2019-04-19T03:51:48.852Z","queue":"queue155564590885204877"}

nock('https://coolstorageaccount1234.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue155564590885204877')
  .query({"timeout":"30"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8211ef38-7003-0075-5d63-f61ae3000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 19 Apr 2019 03:51:49 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue155564590885204877', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><SignedIdentifiers><SignedIdentifier><Id>unique-id</Id><AccessPolicy><Start>2019-04-19T03:46:48.8520000Z</Start><Expiry>2019-04-20T03:51:48.8520000Z</Expiry><Permission>raup</Permission></AccessPolicy></SignedIdentifier></SignedIdentifiers>")
  .query({"comp":"acl","timeout":"30"})
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1d395032-5003-008c-5d63-f6d003000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 19 Apr 2019 03:51:48 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.queue.core.windows.net:443', {"encodedQueryParams":true})
  .post('/queue155564590885204877/messages', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>hello</MessageText></QueueMessage>")
  .query({"sv":"2018-03-28","si":"unique-id","sig":"uS2j5SgfGztnltDFjzM4d0sKTgrAID7XIhwTbykRLYE%3D","timeout":"30"})
  .reply(201, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>476688b9-9bb8-463a-9c00-1dc91de7ca84</MessageId><InsertionTime>Fri, 19 Apr 2019 03:51:50 GMT</InsertionTime><ExpirationTime>Fri, 26 Apr 2019 03:51:50 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAA+3YBOGP21AE=</PopReceipt><TimeNextVisible>Fri, 19 Apr 2019 03:51:50 GMT</TimeNextVisible></QueueMessage></QueueMessagesList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1f15d4a6-2003-0066-5a63-f62f02000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 19 Apr 2019 03:51:49 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue155564590885204877/messages')
  .query({"sv":"2018-03-28","si":"unique-id","sig":"uS2j5SgfGztnltDFjzM4d0sKTgrAID7XIhwTbykRLYE%3D","peekonly":"true","timeout":"30"})
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>476688b9-9bb8-463a-9c00-1dc91de7ca84</MessageId><InsertionTime>Fri, 19 Apr 2019 03:51:50 GMT</InsertionTime><ExpirationTime>Fri, 26 Apr 2019 03:51:50 GMT</ExpirationTime><DequeueCount>0</DequeueCount><MessageText>hello</MessageText></QueueMessage></QueueMessagesList>", [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6dfed2a4-6003-0048-7963-f6afc5000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 19 Apr 2019 03:51:50 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue155564590885204877/messages')
  .query({"sv":"2018-03-28","si":"unique-id","sig":"uS2j5SgfGztnltDFjzM4d0sKTgrAID7XIhwTbykRLYE%3D","visibilitytimeout":"1","timeout":"30"})
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>476688b9-9bb8-463a-9c00-1dc91de7ca84</MessageId><InsertionTime>Fri, 19 Apr 2019 03:51:50 GMT</InsertionTime><ExpirationTime>Fri, 26 Apr 2019 03:51:50 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAAZnwYOWP21AE=</PopReceipt><TimeNextVisible>Fri, 19 Apr 2019 03:51:52 GMT</TimeNextVisible><DequeueCount>1</DequeueCount><MessageText>hello</MessageText></QueueMessage></QueueMessagesList>", [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1b3c1d22-9003-0074-3563-f61b1e000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 19 Apr 2019 03:51:50 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue155564590885204877/messages/476688b9-9bb8-463a-9c00-1dc91de7ca84')
  .query({"sv":"2018-03-28","si":"unique-id","sig":"uS2j5SgfGztnltDFjzM4d0sKTgrAID7XIhwTbykRLYE%3D","popreceipt":"AgAAAAMAAAAAAAAAZnwYOWP21AE%3D","timeout":"30"})
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '37c54f05-f003-0081-3f63-f63f0f000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 19 Apr 2019 03:51:52 GMT',
  'Connection',
  'close' ]);
