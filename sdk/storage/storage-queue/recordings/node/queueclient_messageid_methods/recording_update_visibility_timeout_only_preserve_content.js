let nock = require('nock');

module.exports.hash = "e43fe88599f94bda7bb7c36a7c88b62f";

module.exports.testInfo = {"uniqueName":{"queue":"queue160015809428209607"},"newDate":{}}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue160015809428209607')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2248f401-9003-003e-1b39-8b3570000000',
  'x-ms-client-request-id',
  '243c19b3-a611-47c4-bb86-6f342d4f2ae3',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Tue, 15 Sep 2020 08:21:35 GMT'
]);

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .post('/queue160015809428209607/messages', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>foo</MessageText></QueueMessage>")
  .query(true)
  .reply(201, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>a340c68f-fd60-484d-bf95-14ce7ec15614</MessageId><InsertionTime>Tue, 15 Sep 2020 08:21:35 GMT</InsertionTime><ExpirationTime>Tue, 22 Sep 2020 08:21:35 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAAPV0YQDmL1gE=</PopReceipt><TimeNextVisible>Tue, 15 Sep 2020 08:21:45 GMT</TimeNextVisible></QueueMessage></QueueMessagesList>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2248f4d8-9003-003e-5839-8b3570000000',
  'x-ms-client-request-id',
  '9e7e431a-ac04-4522-8322-fe56a306f5a0',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Tue, 15 Sep 2020 08:21:35 GMT'
]);

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue160015809428209607/messages/a340c68f-fd60-484d-bf95-14ce7ec15614')
  .query(true)
  .reply(204, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2248f5af-9003-003e-1c39-8b3570000000',
  'x-ms-client-request-id',
  '08bc98dd-c44f-4b4b-a4ab-47f81b0ae7fc',
  'x-ms-version',
  '2020-02-10',
  'x-ms-popreceipt',
  'AwAAAAMAAAAAAAAAyudQOjmL1gEAAAAA',
  'x-ms-time-next-visible',
  'Tue, 15 Sep 2020 08:21:36 GMT',
  'Date',
  'Tue, 15 Sep 2020 08:21:36 GMT'
]);

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue160015809428209607/messages')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>a340c68f-fd60-484d-bf95-14ce7ec15614</MessageId><InsertionTime>Tue, 15 Sep 2020 08:21:35 GMT</InsertionTime><ExpirationTime>Tue, 22 Sep 2020 08:21:35 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAAywtgTDmL1gE=</PopReceipt><TimeNextVisible>Tue, 15 Sep 2020 08:22:06 GMT</TimeNextVisible><DequeueCount>1</DequeueCount><MessageText>foo</MessageText></QueueMessage></QueueMessagesList>", [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2248f673-9003-003e-4f39-8b3570000000',
  'x-ms-client-request-id',
  '61f2ddc4-b4dd-47bc-9af2-4d587dafe80a',
  'x-ms-version',
  '2020-02-10',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 15 Sep 2020 08:21:36 GMT'
]);

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue160015809428209607')
  .query(true)
  .reply(204, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2248f71b-9003-003e-6e39-8b3570000000',
  'x-ms-client-request-id',
  'c084add0-1a55-4435-aff2-cd8c2298deaf',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Tue, 15 Sep 2020 08:21:36 GMT'
]);
