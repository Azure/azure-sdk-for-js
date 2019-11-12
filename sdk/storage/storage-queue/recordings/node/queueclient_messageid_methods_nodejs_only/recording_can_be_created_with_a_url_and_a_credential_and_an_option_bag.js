let nock = require('nock');

module.exports.testInfo = {"queue":"queue157049908387800003"}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue157049908387800003')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3b4d39a9-c003-0046-4279-7deee0000000',
  'x-ms-client-request-id',
  '2c627fdc-479e-4a42-8928-1bca22d4cf0b',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 08 Oct 2019 01:44:42 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .post('/queue157049908387800003/messages', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>Hello World</MessageText></QueueMessage>")
  .query(true)
  .reply(201, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>40a628e0-9bee-4f5b-a6d7-62354de99759</MessageId><InsertionTime>Tue, 08 Oct 2019 01:44:44 GMT</InsertionTime><ExpirationTime>Tue, 15 Oct 2019 01:44:44 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAA8UaN9Xl91QE=</PopReceipt><TimeNextVisible>Tue, 08 Oct 2019 01:44:44 GMT</TimeNextVisible></QueueMessage></QueueMessagesList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bf327024-3003-003e-2f79-7d8657000000',
  'x-ms-client-request-id',
  '362f1cc2-98d5-4107-8d04-f5085bcd94d4',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 08 Oct 2019 01:44:43 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue157049908387800003/messages/40a628e0-9bee-4f5b-a6d7-62354de99759', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>Hello World Hello World</MessageText></QueueMessage>")
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f4750d14-8003-000e-5379-7ddc7d000000',
  'x-ms-client-request-id',
  '97390546-0df3-42a2-a947-f85c03d0ea78',
  'x-ms-version',
  '2019-02-02',
  'x-ms-popreceipt',
  'AwAAAAMAAAAAAAAA5+vd9Xl91QEAAAAA',
  'x-ms-time-next-visible',
  'Tue, 08 Oct 2019 01:44:44 GMT',
  'Date',
  'Tue, 08 Oct 2019 01:44:44 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue157049908387800003/messages')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>40a628e0-9bee-4f5b-a6d7-62354de99759</MessageId><InsertionTime>Tue, 08 Oct 2019 01:44:44 GMT</InsertionTime><ExpirationTime>Tue, 15 Oct 2019 01:44:44 GMT</ExpirationTime><DequeueCount>0</DequeueCount><MessageText>Hello World Hello World</MessageText></QueueMessage></QueueMessagesList>", [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1bd454d4-0003-0132-5479-7d2ef3000000',
  'x-ms-client-request-id',
  '9de5d8b8-a94e-4c02-85db-2f0f2b2cb465',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 08 Oct 2019 01:44:44 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue157049908387800003')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3511584c-1003-00ee-6079-7d3af5000000',
  'x-ms-client-request-id',
  '96ac1dcf-51da-40f3-8ce9-afc903be1d5a',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 08 Oct 2019 01:44:44 GMT',
  'Connection',
  'close' ]);

