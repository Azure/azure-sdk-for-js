let nock = require('nock');

module.exports.testInfo = {"queue":"queue156149549363607192"}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue156149549363607192')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ca34a25d-c003-0033-4c96-2b23bc000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 25 Jun 2019 20:44:53 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .post('/queue156149549363607192/messages', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>Hello World</MessageText></QueueMessage>")
  .query(true)
  .reply(201, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>ed62299c-2aad-4c1a-aa72-288d223d07c7</MessageId><InsertionTime>Tue, 25 Jun 2019 20:44:54 GMT</InsertionTime><ExpirationTime>Tue, 25 Jun 2019 20:45:34 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAAgBPA15Yr1QE=</PopReceipt><TimeNextVisible>Tue, 25 Jun 2019 20:44:54 GMT</TimeNextVisible></QueueMessage></QueueMessagesList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3076a684-f003-0056-4096-2b92e1000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 25 Jun 2019 20:44:53 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .post('/queue156149549363607192/messages', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>Hello World</MessageText></QueueMessage>")
  .query(true)
  .reply(400, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>InvalidQueryParameterValue</Code><Message>Value for one of the query parameters specified in the request URI is invalid.\nRequestId:ff406813-2003-00ba-5596-2b9a98000000\nTime:2019-06-25T20:44:54.5084801Z</Message><QueryParameterName>visibilitytimeout</QueryParameterName><QueryParameterValue>30</QueryParameterValue><Reason>messagettl must be greater than visibilitytimeout</Reason></Error>", [ 'Content-Length',
  '442',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ff406813-2003-00ba-5596-2b9a98000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-error-code',
  'InvalidQueryParameterValue',
  'Date',
  'Tue, 25 Jun 2019 20:44:54 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue156149549363607192/messages')
  .query(true)
  .reply(400, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>OutOfRangeQueryParameterValue</Code><Message>One of the query parameters specified in the request URI is outside the permissible range.\nRequestId:ff40683f-2003-00ba-7e96-2b9a98000000\nTime:2019-06-25T20:44:54.7376410Z</Message><QueryParameterName>numofmessages</QueryParameterName><QueryParameterValue>100</QueryParameterValue><MinimumAllowed>1</MinimumAllowed><MaximumAllowed>32</MaximumAllowed></Error>", [ 'Content-Length',
  '457',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ff40683f-2003-00ba-7e96-2b9a98000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-error-code',
  'OutOfRangeQueryParameterValue',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 25 Jun 2019 20:44:54 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue156149549363607192/messages')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>ed62299c-2aad-4c1a-aa72-288d223d07c7</MessageId><InsertionTime>Tue, 25 Jun 2019 20:44:54 GMT</InsertionTime><ExpirationTime>Tue, 25 Jun 2019 20:45:34 GMT</ExpirationTime><DequeueCount>0</DequeueCount><MessageText>Hello World</MessageText></QueueMessage></QueueMessagesList>", [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bd9b32b2-2003-00b1-4796-2b82ec000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 25 Jun 2019 20:44:54 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue156149549363607192/messages')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>ed62299c-2aad-4c1a-aa72-288d223d07c7</MessageId><InsertionTime>Tue, 25 Jun 2019 20:44:54 GMT</InsertionTime><ExpirationTime>Tue, 25 Jun 2019 20:45:34 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAARBtI8JYr1QE=</PopReceipt><TimeNextVisible>Tue, 25 Jun 2019 20:45:35 GMT</TimeNextVisible><DequeueCount>1</DequeueCount><MessageText>Hello World</MessageText></QueueMessage></QueueMessagesList>", [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2869e6e2-e003-000d-2296-2b959d000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 25 Jun 2019 20:44:54 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue156149549363607192')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '141f72ff-3003-0062-1596-2b3d49000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 25 Jun 2019 20:44:56 GMT',
  'Connection',
  'close' ]);

