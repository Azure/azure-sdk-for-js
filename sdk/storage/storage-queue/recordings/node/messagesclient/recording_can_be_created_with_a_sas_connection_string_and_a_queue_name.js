let nock = require('nock');

module.exports.testInfo = {"queue":"queue156360478747606532"}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue156360478747606532')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2828f2a5-8003-00b7-47c5-3e7594000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Sat, 20 Jul 2019 06:39:47 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .post('/queue156360478747606532/messages', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>Hello World</MessageText></QueueMessage>")
  .query(true)
  .reply(201, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>3134ce76-9dd5-4111-b1fc-ac6617c46b63</MessageId><InsertionTime>Sat, 20 Jul 2019 06:39:48 GMT</InsertionTime><ExpirationTime>Sat, 27 Jul 2019 06:39:48 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAAJ3j47MU+1QE=</PopReceipt><TimeNextVisible>Sat, 20 Jul 2019 06:39:48 GMT</TimeNextVisible></QueueMessage></QueueMessagesList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8685906a-a003-0028-30c5-3e0d2e000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Sat, 20 Jul 2019 06:39:47 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue156360478747606532')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ec032cf0-7003-006e-7ec5-3ed3b8000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Sat, 20 Jul 2019 06:39:48 GMT',
  'Connection',
  'close' ]);

