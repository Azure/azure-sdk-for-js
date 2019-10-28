let nock = require('nock');

module.exports.testInfo = {"queue":"queue156816829383102425"}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue156816829383102425')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3e5eb349-1003-0040-1347-684f12000000',
  'x-ms-client-request-id',
  '55df7d12-3170-47ce-a4a4-cef2945d3c65',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:18:13 GMT' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .post('/queue156816829383102425/messages', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>Hello World</MessageText></QueueMessage>")
  .query(true)
  .reply(201, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>bc9d55fb-d5be-4af6-845b-4076561ef88b</MessageId><InsertionTime>Wed, 11 Sep 2019 02:18:14 GMT</InsertionTime><ExpirationTime>Wed, 18 Sep 2019 02:18:14 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAAxo65Kkdo1QE=</PopReceipt><TimeNextVisible>Wed, 11 Sep 2019 02:18:14 GMT</TimeNextVisible></QueueMessage></QueueMessagesList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '341e0fb7-2003-0025-1347-68fe4f000000',
  'x-ms-client-request-id',
  'ccbfa1c1-234e-468c-b320-66dd75f1a602',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:18:14 GMT' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue156816829383102425/messages/bc9d55fb-d5be-4af6-845b-4076561ef88b', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>New Message</MessageText></QueueMessage>")
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8a32cddf-6003-0029-1047-6810be000000',
  'x-ms-client-request-id',
  '9dba730d-12d3-4669-b0d2-88a7dd393dd6',
  'x-ms-version',
  '2019-02-02',
  'x-ms-popreceipt',
  'AwAAAAMAAAAAAAAAFbTxMEdo1QEAAAAA',
  'x-ms-time-next-visible',
  'Wed, 11 Sep 2019 02:18:25 GMT',
  'Date',
  'Wed, 11 Sep 2019 02:18:14 GMT' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue156816829383102425/messages')
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
  '3201f195-c003-0049-0e47-68559c000000',
  'x-ms-client-request-id',
  '78256501-8560-4c36-8200-412e6b8ba57d',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 11 Sep 2019 02:18:14 GMT' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue156816829383102425/messages')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>bc9d55fb-d5be-4af6-845b-4076561ef88b</MessageId><InsertionTime>Wed, 11 Sep 2019 02:18:14 GMT</InsertionTime><ExpirationTime>Wed, 18 Sep 2019 02:18:14 GMT</ExpirationTime><DequeueCount>0</DequeueCount><MessageText>New Message</MessageText></QueueMessage></QueueMessagesList>", [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2b17e40c-e003-0055-0947-688d8b000000',
  'x-ms-client-request-id',
  '939981ca-b816-454f-b565-e5d7d2448a95',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 11 Sep 2019 02:18:26 GMT' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue156816829383102425')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3889e764-b003-0064-1f47-68d65c000000',
  'x-ms-client-request-id',
  '125f3cfb-5ef1-492d-ae77-7240ade53ac9',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:18:26 GMT' ]);

