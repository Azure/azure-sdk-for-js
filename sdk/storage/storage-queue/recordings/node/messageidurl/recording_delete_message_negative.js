let nock = require('nock');

module.exports.testInfo = {"queue":"queue155996386301102568"}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue155996386301102568')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bd2245f0-4003-005f-73a8-1d6fa6000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Sat, 08 Jun 2019 03:17:42 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .post('/queue155996386301102568/messages', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>Hello World</MessageText></QueueMessage>")
  .query(true)
  .reply(201, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>8c7f11df-1720-4ed1-9e67-27b69f703780</MessageId><InsertionTime>Sat, 08 Jun 2019 03:17:43 GMT</InsertionTime><ExpirationTime>Sat, 15 Jun 2019 03:17:43 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAA8z+GvKgd1QE=</PopReceipt><TimeNextVisible>Sat, 08 Jun 2019 03:17:43 GMT</TimeNextVisible></QueueMessage></QueueMessagesList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bab22908-8003-008e-25a8-1dd2f9000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Sat, 08 Jun 2019 03:17:42 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue155996386301102568/messages/8c7f11df-1720-4ed1-9e67-27b69f703780')
  .query(true)
  .reply(400, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>InvalidQueryParameterValue</Code><Message>Value for one of the query parameters specified in the request URI is invalid.\nRequestId:ab0c1880-4003-0054-59a8-1d77d2000000\nTime:2019-06-08T03:17:43.6068824Z</Message><QueryParameterName>popreceipt</QueryParameterName><QueryParameterValue>invalid</QueryParameterValue><Reason>Invalid pop receipt format</Reason></Error>", [ 'Content-Length',
  '417',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ab0c1880-4003-0054-59a8-1d77d2000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-error-code',
  'InvalidQueryParameterValue',
  'Date',
  'Sat, 08 Jun 2019 03:17:43 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue155996386301102568')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd9a0eb86-a003-007c-23a8-1d006d000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Sat, 08 Jun 2019 03:17:43 GMT',
  'Connection',
  'close' ]);

