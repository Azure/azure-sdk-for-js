let nock = require('nock');

module.exports.testInfo = {"queue":"queue157049908777100599"}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue157049908777100599')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '020e7003-5003-0121-4f79-7d1b12000000',
  'x-ms-client-request-id',
  '0bf67fa5-2c3f-4581-b351-dbdf54ef8c0e',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 08 Oct 2019 01:44:46 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .post('/queue157049908777100599/messages', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>Hello World</MessageText></QueueMessage>")
  .query(true)
  .reply(201, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>d8cce548-ad03-4acc-bc78-a7241cb36887</MessageId><InsertionTime>Tue, 08 Oct 2019 01:44:47 GMT</InsertionTime><ExpirationTime>Tue, 15 Oct 2019 01:44:47 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAAHJ7D93l91QE=</PopReceipt><TimeNextVisible>Tue, 08 Oct 2019 01:44:47 GMT</TimeNextVisible></QueueMessage></QueueMessagesList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '848e9dbe-f003-0001-5a79-7d318b000000',
  'x-ms-client-request-id',
  '636d116d-74db-4d70-8fd4-0aea7a64784b',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 08 Oct 2019 01:44:47 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue157049908777100599/messages/d8cce548-ad03-4acc-bc78-a7241cb36887', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>Hello World Hello World</MessageText></QueueMessage>")
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e3d99b9b-7003-0098-5379-7dbe49000000',
  'x-ms-client-request-id',
  '7de44ad8-965a-4c3a-affc-0d12e95675e6',
  'x-ms-version',
  '2019-02-02',
  'x-ms-popreceipt',
  'AwAAAAMAAAAAAAAAjT/h93l91QEAAAAA',
  'x-ms-time-next-visible',
  'Tue, 08 Oct 2019 01:44:48 GMT',
  'Date',
  'Tue, 08 Oct 2019 01:44:47 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue157049908777100599/messages')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>d8cce548-ad03-4acc-bc78-a7241cb36887</MessageId><InsertionTime>Tue, 08 Oct 2019 01:44:47 GMT</InsertionTime><ExpirationTime>Tue, 15 Oct 2019 01:44:47 GMT</ExpirationTime><DequeueCount>0</DequeueCount><MessageText>Hello World Hello World</MessageText></QueueMessage></QueueMessagesList>", [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8732b03f-4003-00df-3779-7d6122000000',
  'x-ms-client-request-id',
  'f1f366c1-7f73-45ba-b5e9-04600098c201',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 08 Oct 2019 01:44:47 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue157049908777100599')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8ee6f69b-3003-0113-7679-7d43c2000000',
  'x-ms-client-request-id',
  '52ec50c0-069e-4780-af8c-2de4ba78ae7e',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 08 Oct 2019 01:44:48 GMT',
  'Connection',
  'close' ]);

