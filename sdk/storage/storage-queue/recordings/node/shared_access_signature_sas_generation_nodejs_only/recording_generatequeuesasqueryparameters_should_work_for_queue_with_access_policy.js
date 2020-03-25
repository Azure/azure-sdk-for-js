let nock = require('nock');

module.exports.hash = "c16925bb4580825648c33e8d4fdcf64f";

module.exports.testInfo = {"uniqueName":{"queue":"queue158193572798704538"},"newDate":{"now":"2020-02-17T10:35:27.986Z","tmr":"2020-02-17T10:35:27.987Z"}}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue158193572798704538')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a59ca562-4003-0010-137d-e59a6d000000',
  'x-ms-client-request-id',
  'b93ac10d-92b7-42f8-a350-42981e8356e0',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Mon, 17 Feb 2020 10:35:36 GMT'
]);

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue158193572798704538', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><SignedIdentifiers><SignedIdentifier><Id>unique-id</Id><AccessPolicy><Start>2020-02-17T10:30:27.9860000Z</Start><Permission>raup</Permission></AccessPolicy></SignedIdentifier></SignedIdentifiers>")
  .query(true)
  .reply(204, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a59caaa4-4003-0010-747d-e59a6d000000',
  'x-ms-client-request-id',
  '85d3f180-f03a-40fa-9148-142a13ebf55c',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Mon, 17 Feb 2020 10:35:37 GMT'
]);

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .post('/queue158193572798704538/messages', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>hello</MessageText></QueueMessage>")
  .query(true)
  .reply(201, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>d7b1b13e-d57f-4243-9d57-52dcca15ba00</MessageId><InsertionTime>Mon, 17 Feb 2020 10:35:37 GMT</InsertionTime><ExpirationTime>Mon, 24 Feb 2020 10:35:37 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAAzdVr/n3l1QE=</PopReceipt><TimeNextVisible>Mon, 17 Feb 2020 10:35:37 GMT</TimeNextVisible></QueueMessage></QueueMessagesList>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a59caae6-4003-0010-327d-e59a6d000000',
  'x-ms-client-request-id',
  'd75274e0-04fc-48ae-b44e-c61f2443b1f0',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Mon, 17 Feb 2020 10:35:38 GMT'
]);

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue158193572798704538/messages')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>d7b1b13e-d57f-4243-9d57-52dcca15ba00</MessageId><InsertionTime>Mon, 17 Feb 2020 10:35:37 GMT</InsertionTime><ExpirationTime>Mon, 24 Feb 2020 10:35:37 GMT</ExpirationTime><DequeueCount>0</DequeueCount><MessageText>hello</MessageText></QueueMessage></QueueMessagesList>", [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a59cab36-4003-0010-017d-e59a6d000000',
  'x-ms-client-request-id',
  'a22868bf-ac91-4b6b-a95c-f144a3ec4369',
  'x-ms-version',
  '2019-07-07',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 17 Feb 2020 10:35:38 GMT'
]);

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue158193572798704538/messages')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>d7b1b13e-d57f-4243-9d57-52dcca15ba00</MessageId><InsertionTime>Mon, 17 Feb 2020 10:35:37 GMT</InsertionTime><ExpirationTime>Mon, 24 Feb 2020 10:35:37 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAA6rqd/33l1QE=</PopReceipt><TimeNextVisible>Mon, 17 Feb 2020 10:35:39 GMT</TimeNextVisible><DequeueCount>1</DequeueCount><MessageText>hello</MessageText></QueueMessage></QueueMessagesList>", [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a59cab72-4003-0010-3a7d-e59a6d000000',
  'x-ms-client-request-id',
  'c9d01162-97ca-411f-b847-312c9d19234b',
  'x-ms-version',
  '2019-07-07',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 17 Feb 2020 10:35:39 GMT'
]);

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue158193572798704538/messages/d7b1b13e-d57f-4243-9d57-52dcca15ba00')
  .query(true)
  .reply(204, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a59cad77-4003-0010-0d7e-e59a6d000000',
  'x-ms-client-request-id',
  '3bbe2372-3b66-4d9b-852e-1cd716732781',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Mon, 17 Feb 2020 10:35:42 GMT'
]);
