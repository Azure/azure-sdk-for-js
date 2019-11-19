let nock = require('nock');

module.exports.testInfo = {"queue":"queue156816832791604438"}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue156816832791604438')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e69b7b4c-0003-001b-5247-68486e000000',
  'x-ms-client-request-id',
  '930b4c05-a5fb-4372-ae1d-ad2ef561b4bb',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:18:47 GMT' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .post('/queue156816832791604438/messages', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>Hello World</MessageText></QueueMessage>")
  .query(true)
  .reply(201, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>ef870709-075e-4883-bc90-e671edf4656c</MessageId><InsertionTime>Wed, 11 Sep 2019 02:18:48 GMT</InsertionTime><ExpirationTime>Wed, 11 Sep 2019 02:19:28 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAAbs8LP0do1QE=</PopReceipt><TimeNextVisible>Wed, 11 Sep 2019 02:18:48 GMT</TimeNextVisible></QueueMessage></QueueMessagesList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c3ed5418-5003-002a-7647-6813b9000000',
  'x-ms-client-request-id',
  '9430b80c-ab07-4ad5-8cb3-897822b09fd3',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:18:48 GMT' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .post('/queue156816832791604438/messages', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>Hello World</MessageText></QueueMessage>")
  .query(true)
  .reply(400, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>InvalidQueryParameterValue</Code><Message>Value for one of the query parameters specified in the request URI is invalid.\nRequestId:0ff296fb-d003-0019-2347-684a94000000\nTime:2019-09-11T02:18:49.1227238Z</Message><QueryParameterName>visibilitytimeout</QueryParameterName><QueryParameterValue>30</QueryParameterValue><Reason>messagettl must be greater than visibilitytimeout</Reason></Error>", [ 'Content-Length',
  '442',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0ff296fb-d003-0019-2347-684a94000000',
  'x-ms-client-request-id',
  '3e74a79d-dc5a-451f-b338-bfe45c0607bb',
  'x-ms-version',
  '2019-02-02',
  'x-ms-error-code',
  'InvalidQueryParameterValue',
  'Date',
  'Wed, 11 Sep 2019 02:18:48 GMT' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue156816832791604438/messages')
  .query(true)
  .reply(400, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>OutOfRangeQueryParameterValue</Code><Message>One of the query parameters specified in the request URI is outside the permissible range.\nRequestId:348b3414-f003-002c-3047-68e4c1000000\nTime:2019-09-11T02:18:49.5309827Z</Message><QueryParameterName>numofmessages</QueryParameterName><QueryParameterValue>100</QueryParameterValue><MinimumAllowed>1</MinimumAllowed><MaximumAllowed>32</MaximumAllowed></Error>", [ 'Content-Length',
  '457',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '348b3414-f003-002c-3047-68e4c1000000',
  'x-ms-client-request-id',
  '5bdafa89-ff17-44cd-91ff-a39a4935d22b',
  'x-ms-version',
  '2019-02-02',
  'x-ms-error-code',
  'OutOfRangeQueryParameterValue',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 11 Sep 2019 02:18:49 GMT' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue156816832791604438/messages')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>ef870709-075e-4883-bc90-e671edf4656c</MessageId><InsertionTime>Wed, 11 Sep 2019 02:18:48 GMT</InsertionTime><ExpirationTime>Wed, 11 Sep 2019 02:19:28 GMT</ExpirationTime><DequeueCount>0</DequeueCount><MessageText>Hello World</MessageText></QueueMessage></QueueMessagesList>", [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '69a4d954-a003-0052-7147-687b0e000000',
  'x-ms-client-request-id',
  'bf2b902e-bb96-428a-b4b6-6175ef58a818',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 11 Sep 2019 02:18:49 GMT' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue156816832791604438/messages')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>ef870709-075e-4883-bc90-e671edf4656c</MessageId><InsertionTime>Wed, 11 Sep 2019 02:18:48 GMT</InsertionTime><ExpirationTime>Wed, 11 Sep 2019 02:19:28 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAAIfHgV0do1QE=</PopReceipt><TimeNextVisible>Wed, 11 Sep 2019 02:19:30 GMT</TimeNextVisible><DequeueCount>1</DequeueCount><MessageText>Hello World</MessageText></QueueMessage></QueueMessagesList>", [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0423f399-8003-0045-2b47-68bb6d000000',
  'x-ms-client-request-id',
  '1acff381-3d20-4615-8039-efa7cd057a77',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 11 Sep 2019 02:18:50 GMT' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue156816832791604438')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '35c88213-f003-0068-0847-6838ad000000',
  'x-ms-client-request-id',
  'bee4559f-d888-4ee6-b187-21cb1f7cef9b',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:18:50 GMT' ]);

