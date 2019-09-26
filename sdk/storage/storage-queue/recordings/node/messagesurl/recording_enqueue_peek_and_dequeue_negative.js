let nock = require('nock');

module.exports.testInfo = {"queue":"queue156758133155202779"}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue156758133155202779')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4e335b87-3003-0021-33f0-62d3f8000000',
  'x-ms-client-request-id',
  '3088761e-8494-461d-8825-7de7311ca906',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 07:15:31 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .post('/queue156758133155202779/messages', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>Hello World</MessageText></QueueMessage>")
  .query(true)
  .reply(201, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>692f4128-a1fe-4ea0-9f94-ca6b586ece5c</MessageId><InsertionTime>Wed, 04 Sep 2019 07:15:32 GMT</InsertionTime><ExpirationTime>Wed, 04 Sep 2019 07:16:12 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAAS2beifBi1QE=</PopReceipt><TimeNextVisible>Wed, 04 Sep 2019 07:15:32 GMT</TimeNextVisible></QueueMessage></QueueMessagesList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '583effb9-a003-0033-58f0-62a828000000',
  'x-ms-client-request-id',
  '6a405147-fa5c-4ddc-a5c1-8195b035a6f7',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 07:15:32 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .post('/queue156758133155202779/messages', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>Hello World</MessageText></QueueMessage>")
  .query(true)
  .reply(400, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>InvalidQueryParameterValue</Code><Message>Value for one of the query parameters specified in the request URI is invalid.\nRequestId:c191c748-d003-0136-5df0-6284fe000000\nTime:2019-09-04T07:15:32.6049387Z</Message><QueryParameterName>visibilitytimeout</QueryParameterName><QueryParameterValue>30</QueryParameterValue><Reason>messagettl must be greater than visibilitytimeout</Reason></Error>", [ 'Content-Length',
  '442',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c191c748-d003-0136-5df0-6284fe000000',
  'x-ms-client-request-id',
  '2291d25a-4fe4-4d2c-b5dc-7447e6747d9b',
  'x-ms-version',
  '2019-02-02',
  'x-ms-error-code',
  'InvalidQueryParameterValue',
  'Date',
  'Wed, 04 Sep 2019 07:15:32 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue156758133155202779/messages')
  .query(true)
  .reply(400, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>OutOfRangeQueryParameterValue</Code><Message>One of the query parameters specified in the request URI is outside the permissible range.\nRequestId:d10b527e-9003-0145-16f0-62dc6d000000\nTime:2019-09-04T07:15:33.0051517Z</Message><QueryParameterName>numofmessages</QueryParameterName><QueryParameterValue>100</QueryParameterValue><MinimumAllowed>1</MinimumAllowed><MaximumAllowed>32</MaximumAllowed></Error>", [ 'Content-Length',
  '457',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd10b527e-9003-0145-16f0-62dc6d000000',
  'x-ms-client-request-id',
  'f7f5a7c9-5765-4fa7-ab27-49be8d232fee',
  'x-ms-version',
  '2019-02-02',
  'x-ms-error-code',
  'OutOfRangeQueryParameterValue',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 04 Sep 2019 07:15:32 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue156758133155202779/messages')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>692f4128-a1fe-4ea0-9f94-ca6b586ece5c</MessageId><InsertionTime>Wed, 04 Sep 2019 07:15:32 GMT</InsertionTime><ExpirationTime>Wed, 04 Sep 2019 07:16:12 GMT</ExpirationTime><DequeueCount>0</DequeueCount><MessageText>Hello World</MessageText></QueueMessage></QueueMessagesList>", [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7286aa0c-9003-0038-27f0-625343000000',
  'x-ms-client-request-id',
  '775bdf50-8553-4b12-9d44-2f0450f90277',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 04 Sep 2019 07:15:32 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue156758133155202779/messages')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>692f4128-a1fe-4ea0-9f94-ca6b586ece5c</MessageId><InsertionTime>Wed, 04 Sep 2019 07:15:32 GMT</InsertionTime><ExpirationTime>Wed, 04 Sep 2019 07:16:12 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAACJiqovBi1QE=</PopReceipt><TimeNextVisible>Wed, 04 Sep 2019 07:16:13 GMT</TimeNextVisible><DequeueCount>1</DequeueCount><MessageText>Hello World</MessageText></QueueMessage></QueueMessagesList>", [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '583f005a-a003-0033-67f0-62a828000000',
  'x-ms-client-request-id',
  'c556866e-5a83-4b94-a140-aa52bfc16c75',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 04 Sep 2019 07:15:33 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue156758133155202779')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9670a27b-5003-00c3-4cf0-62eed9000000',
  'x-ms-client-request-id',
  'adfff1ad-63bc-49d5-af7d-cafc2abf5f8f',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 07:15:33 GMT',
  'Connection',
  'close' ]);

