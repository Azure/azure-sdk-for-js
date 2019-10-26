let nock = require('nock');

module.exports.testInfo = {"queue":"queue157049908603706728"}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue157049908603706728')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '07756c8a-e003-001e-2079-7dea9b000000',
  'x-ms-client-request-id',
  'c610018b-8a62-419c-9842-cb61f22f34e2',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 08 Oct 2019 01:44:45 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .post('/queue157049908603706728/messages', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>Hello World</MessageText></QueueMessage>")
  .query(true)
  .reply(201, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>5903052d-1d5a-4148-b50b-9ca3a4cf80c0</MessageId><InsertionTime>Tue, 08 Oct 2019 01:44:46 GMT</InsertionTime><ExpirationTime>Tue, 15 Oct 2019 01:44:46 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAAPAXO9nl91QE=</PopReceipt><TimeNextVisible>Tue, 08 Oct 2019 01:44:46 GMT</TimeNextVisible></QueueMessage></QueueMessagesList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'aa86980d-b003-00ca-5879-7da3bb000000',
  'x-ms-client-request-id',
  '82c9d9b8-7af9-4a48-ae2c-d87b6feeaead',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 08 Oct 2019 01:44:45 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue157049908603706728/messages/5903052d-1d5a-4148-b50b-9ca3a4cf80c0', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>Hello World Hello World</MessageText></QueueMessage>")
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd0f2e778-3003-013a-6379-7d3580000000',
  'x-ms-client-request-id',
  'babdc6d7-68e3-4a27-8c4c-9908c6321aac',
  'x-ms-version',
  '2019-02-02',
  'x-ms-popreceipt',
  'AwAAAAMAAAAAAAAAvSH+9nl91QEAAAAA',
  'x-ms-time-next-visible',
  'Tue, 08 Oct 2019 01:44:46 GMT',
  'Date',
  'Tue, 08 Oct 2019 01:44:46 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue157049908603706728/messages')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>5903052d-1d5a-4148-b50b-9ca3a4cf80c0</MessageId><InsertionTime>Tue, 08 Oct 2019 01:44:46 GMT</InsertionTime><ExpirationTime>Tue, 15 Oct 2019 01:44:46 GMT</ExpirationTime><DequeueCount>0</DequeueCount><MessageText>Hello World Hello World</MessageText></QueueMessage></QueueMessagesList>", [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0fb5f0bc-5003-002e-0579-7db0b1000000',
  'x-ms-client-request-id',
  '05958e6c-70de-4118-9f01-c61f86501856',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 08 Oct 2019 01:44:46 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue157049908603706728')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b7f908c3-f003-00c6-4079-7d4d4a000000',
  'x-ms-client-request-id',
  '9a794e3f-d7da-4ca5-8a73-cbe89f46aee9',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 08 Oct 2019 01:44:47 GMT',
  'Connection',
  'close' ]);

