let nock = require('nock');

module.exports.testInfo = {"queue":"queue155596543882200873"}

nock('https://coolstorageaccount1234.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue155596543882200873')
  .query({"timeout":"30"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '30c32863-d003-0037-774b-f931f7000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Mon, 22 Apr 2019 20:37:18 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.queue.core.windows.net:443', {"encodedQueryParams":true})
  .post('/queue155596543882200873/messages', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>Hello World</MessageText></QueueMessage>")
  .query({"messagettl":"40","timeout":"30"})
  .reply(201, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>0bf0d317-e094-48a5-9a0d-9199053f2537</MessageId><InsertionTime>Mon, 22 Apr 2019 20:37:19 GMT</InsertionTime><ExpirationTime>Mon, 22 Apr 2019 20:37:59 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAA8zVcLkv51AE=</PopReceipt><TimeNextVisible>Mon, 22 Apr 2019 20:37:19 GMT</TimeNextVisible></QueueMessage></QueueMessagesList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ba863fae-9003-0091-7d4b-f909e9000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Mon, 22 Apr 2019 20:37:18 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.queue.core.windows.net:443', {"encodedQueryParams":true})
  .post('/queue155596543882200873/messages', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>Hello World</MessageText></QueueMessage>")
  .query({"visibilitytimeout":"30","messagettl":"30","timeout":"30"})
  .reply(400, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>InvalidQueryParameterValue</Code><Message>Value for one of the query parameters specified in the request URI is invalid.\nRequestId:72f72e33-9003-0019-614b-f9b130000000\nTime:2019-04-22T20:37:20.0413252Z</Message><QueryParameterName>visibilitytimeout</QueryParameterName><QueryParameterValue>30</QueryParameterValue><Reason>messagettl must be greater than visibilitytimeout</Reason></Error>", [ 'Content-Length',
  '442',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '72f72e33-9003-0019-614b-f9b130000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-error-code',
  'InvalidQueryParameterValue',
  'Date',
  'Mon, 22 Apr 2019 20:37:20 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue155596543882200873/messages')
  .query({"numofmessages":"100","peekonly":"true","timeout":"30"})
  .reply(400, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>OutOfRangeQueryParameterValue</Code><Message>One of the query parameters specified in the request URI is outside the permissible range.\nRequestId:1ade42e3-0003-0053-104b-f98157000000\nTime:2019-04-22T20:37:20.4471842Z</Message><QueryParameterName>numofmessages</QueryParameterName><QueryParameterValue>100</QueryParameterValue><MinimumAllowed>1</MinimumAllowed><MaximumAllowed>32</MaximumAllowed></Error>", [ 'Content-Length',
  '457',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1ade42e3-0003-0053-104b-f98157000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-error-code',
  'OutOfRangeQueryParameterValue',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 22 Apr 2019 20:37:19 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue155596543882200873/messages')
  .query({"numofmessages":"2","peekonly":"true","timeout":"30"})
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>0bf0d317-e094-48a5-9a0d-9199053f2537</MessageId><InsertionTime>Mon, 22 Apr 2019 20:37:19 GMT</InsertionTime><ExpirationTime>Mon, 22 Apr 2019 20:37:59 GMT</ExpirationTime><DequeueCount>0</DequeueCount><MessageText>Hello World</MessageText></QueueMessage></QueueMessagesList>", [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7bb63240-4003-0098-174b-f91367000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 22 Apr 2019 20:37:20 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue155596543882200873/messages')
  .query({"numofmessages":"2","visibilitytimeout":"40","timeout":"30"})
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>0bf0d317-e094-48a5-9a0d-9199053f2537</MessageId><InsertionTime>Mon, 22 Apr 2019 20:37:19 GMT</InsertionTime><ExpirationTime>Mon, 22 Apr 2019 20:37:59 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAAm6svR0v51AE=</PopReceipt><TimeNextVisible>Mon, 22 Apr 2019 20:38:01 GMT</TimeNextVisible><DequeueCount>1</DequeueCount><MessageText>Hello World</MessageText></QueueMessage></QueueMessagesList>", [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b362d9bd-7003-0075-3a4b-f91ae3000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 22 Apr 2019 20:37:20 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue155596543882200873')
  .query({"timeout":"30"})
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '342012b7-3003-0036-424b-f9300a000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Mon, 22 Apr 2019 20:37:20 GMT',
  'Connection',
  'close' ]);
