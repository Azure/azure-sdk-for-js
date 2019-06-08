let nock = require('nock');

module.exports.testInfo = {"now":"2019-06-08T02:09:35.147Z","tmr":"2019-06-08T02:09:35.147Z","queue":"queue155995977514706240"}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue155995977514706240')
  .query({"timeout":"30"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ee1f7271-b003-004a-489f-1dad3f000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Sat, 08 Jun 2019 02:09:34 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .post('/queue155995977514706240/messages', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>Hello World!</MessageText></QueueMessage>")
  .query({"sv":"2016-05-31","spr":"https%2Chttp","st":"2019-06-08T02%3A04%3A35Z","se":"2019-06-09T02%3A09%3A35Z","sip":"0.0.0.0-255.255.255.255","sp":"raup","sig":"P5AhqcyxGc7v%2FyYASN%2FzI%2FXAVrjFQmJRaWLrpG%2FLGMc%3D","timeout":"30"})
  .reply(201, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>f50ea266-5ff7-42fe-b8c0-c9c386126a56</MessageId><InsertionTime>Sat, 08 Jun 2019 02:09:35 GMT</InsertionTime><ExpirationTime>Sat, 15 Jun 2019 02:09:35 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAAEH73N58d1QE=</PopReceipt><TimeNextVisible>Sat, 08 Jun 2019 02:09:35 GMT</TimeNextVisible></QueueMessage></QueueMessagesList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'cb5f9897-b003-008d-149f-1dd1fe000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Sat, 08 Jun 2019 02:09:35 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue155995977514706240/messages')
  .query({"peekonly":"true","timeout":"30"})
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>f50ea266-5ff7-42fe-b8c0-c9c386126a56</MessageId><InsertionTime>Sat, 08 Jun 2019 02:09:35 GMT</InsertionTime><ExpirationTime>Sat, 15 Jun 2019 02:09:35 GMT</ExpirationTime><DequeueCount>0</DequeueCount><MessageText>Hello World!</MessageText></QueueMessage></QueueMessagesList>", [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5770446d-9003-0056-379f-1d7528000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Sat, 08 Jun 2019 02:09:35 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue155995977514706240/messages/f50ea266-5ff7-42fe-b8c0-c9c386126a56')
  .query({"sv":"2016-05-31","spr":"https%2Chttp","st":"2019-06-08T02%3A04%3A35Z","se":"2019-06-09T02%3A09%3A35Z","sip":"0.0.0.0-255.255.255.255","sp":"raup","sig":"P5AhqcyxGc7v%2FyYASN%2FzI%2FXAVrjFQmJRaWLrpG%2FLGMc%3D","popreceipt":"AgAAAAMAAAAAAAAAEH73N58d1QE%3D","timeout":"30"})
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f51e1fa6-c003-0023-7d9f-1df293000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Sat, 08 Jun 2019 02:09:35 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue155995977514706240/messages')
  .query({"peekonly":"true","timeout":"30"})
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList />", [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7c9e1eef-b003-0027-1f9f-1d0711000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Sat, 08 Jun 2019 02:09:36 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue155995977514706240')
  .query({"timeout":"30"})
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '79e67757-1003-0003-779f-1d9e5f000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Sat, 08 Jun 2019 02:09:36 GMT',
  'Connection',
  'close' ]);

