let nock = require('nock');

module.exports.testInfo = {"queue":"queue156029725383304313"}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue156029725383304313')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0ed25a86-5003-0072-7db0-200baf000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 11 Jun 2019 23:54:18 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .post('/queue156029725383304313/messages', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>Hello World</MessageText></QueueMessage>")
  .query(true)
  .reply(201, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>01103b48-48f5-4442-bb2a-9165a7a23ee4</MessageId><InsertionTime>Tue, 11 Jun 2019 23:54:18 GMT</InsertionTime><ExpirationTime>Tue, 11 Jun 2019 23:54:58 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAAP7eW+7Ag1QE=</PopReceipt><TimeNextVisible>Tue, 11 Jun 2019 23:54:18 GMT</TimeNextVisible></QueueMessage></QueueMessagesList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '34de1316-b003-0051-2eb0-206464000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 11 Jun 2019 23:54:18 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .post('/queue156029725383304313/messages', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>Hello World</MessageText></QueueMessage>")
  .query(true)
  .reply(400, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>InvalidQueryParameterValue</Code><Message>Value for one of the query parameters specified in the request URI is invalid.\nRequestId:2cf4ad42-3003-00a5-37b0-204188000000\nTime:2019-06-11T23:54:18.8144036Z</Message><QueryParameterName>visibilitytimeout</QueryParameterName><QueryParameterValue>30</QueryParameterValue><Reason>messagettl must be greater than visibilitytimeout</Reason></Error>", [ 'Content-Length',
  '442',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2cf4ad42-3003-00a5-37b0-204188000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-error-code',
  'InvalidQueryParameterValue',
  'Date',
  'Tue, 11 Jun 2019 23:54:18 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue156029725383304313/messages')
  .query(true)
  .reply(400, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>OutOfRangeQueryParameterValue</Code><Message>One of the query parameters specified in the request URI is outside the permissible range.\nRequestId:a5a14a48-4003-0044-4bb0-20a6fd000000\nTime:2019-06-11T23:54:19.1129667Z</Message><QueryParameterName>numofmessages</QueryParameterName><QueryParameterValue>100</QueryParameterValue><MinimumAllowed>1</MinimumAllowed><MaximumAllowed>32</MaximumAllowed></Error>", [ 'Content-Length',
  '457',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a5a14a48-4003-0044-4bb0-20a6fd000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-error-code',
  'OutOfRangeQueryParameterValue',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 11 Jun 2019 23:54:18 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue156029725383304313/messages')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>01103b48-48f5-4442-bb2a-9165a7a23ee4</MessageId><InsertionTime>Tue, 11 Jun 2019 23:54:18 GMT</InsertionTime><ExpirationTime>Tue, 11 Jun 2019 23:54:58 GMT</ExpirationTime><DequeueCount>0</DequeueCount><MessageText>Hello World</MessageText></QueueMessage></QueueMessagesList>", [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '151d0f51-2003-0076-37b0-20fe2d000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 11 Jun 2019 23:54:18 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue156029725383304313/messages')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>01103b48-48f5-4442-bb2a-9165a7a23ee4</MessageId><InsertionTime>Tue, 11 Jun 2019 23:54:18 GMT</InsertionTime><ExpirationTime>Tue, 11 Jun 2019 23:54:58 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAAuysuFLEg1QE=</PopReceipt><TimeNextVisible>Tue, 11 Jun 2019 23:54:59 GMT</TimeNextVisible><DequeueCount>1</DequeueCount><MessageText>Hello World</MessageText></QueueMessage></QueueMessagesList>", [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '59522827-9003-006f-19b0-20d245000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 11 Jun 2019 23:54:19 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue156029725383304313')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1a7c1f4e-e003-000d-7eb0-20959d000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 11 Jun 2019 23:54:19 GMT',
  'Connection',
  'close' ]);

