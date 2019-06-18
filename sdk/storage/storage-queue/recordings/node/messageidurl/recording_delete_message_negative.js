let nock = require('nock');

module.exports.testInfo = {"queue":"queue156029723825801077"}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue156029723825801077')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '151cf02e-2003-0076-19b0-20fe2d000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 11 Jun 2019 23:53:57 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .post('/queue156029723825801077/messages', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>Hello World</MessageText></QueueMessage>")
  .query(true)
  .reply(201, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>4e61d032-a4a8-4230-85a0-5b2c5a14f40a</MessageId><InsertionTime>Tue, 11 Jun 2019 23:53:58 GMT</InsertionTime><ExpirationTime>Tue, 18 Jun 2019 23:53:58 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAAKsHf77Ag1QE=</PopReceipt><TimeNextVisible>Tue, 11 Jun 2019 23:53:58 GMT</TimeNextVisible></QueueMessage></QueueMessagesList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9b8945ab-3003-00c8-6eb0-20eba6000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 11 Jun 2019 23:53:58 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue156029723825801077/messages/4e61d032-a4a8-4230-85a0-5b2c5a14f40a')
  .query(true)
  .reply(400, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>InvalidQueryParameterValue</Code><Message>Value for one of the query parameters specified in the request URI is invalid.\nRequestId:a0d19ff1-c003-00dd-6bb0-20293f000000\nTime:2019-06-11T23:53:59.1662071Z</Message><QueryParameterName>popreceipt</QueryParameterName><QueryParameterValue>invalid</QueryParameterValue><Reason>Invalid pop receipt format</Reason></Error>", [ 'Content-Length',
  '417',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a0d19ff1-c003-00dd-6bb0-20293f000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-error-code',
  'InvalidQueryParameterValue',
  'Date',
  'Tue, 11 Jun 2019 23:53:58 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue156029723825801077')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f806fa62-9003-0009-6db0-20601f000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 11 Jun 2019 23:53:59 GMT',
  'Connection',
  'close' ]);

