let nock = require('nock');

module.exports.testInfo = {"queue":"queue156758131590101146"}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue156758131590101146')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4d2f5930-9003-0075-0ef0-629caf000000',
  'x-ms-client-request-id',
  '6512800e-840a-4ec5-a17d-edc3ddd75837',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 07:15:15 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .post('/queue156758131590101146/messages', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>Hello World</MessageText></QueueMessage>")
  .query(true)
  .reply(201, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>7dd39641-3c49-4bf7-b4a4-8b2f9dcebf02</MessageId><InsertionTime>Wed, 04 Sep 2019 07:15:16 GMT</InsertionTime><ExpirationTime>Wed, 11 Sep 2019 07:15:16 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAADNZ6gPBi1QE=</PopReceipt><TimeNextVisible>Wed, 04 Sep 2019 07:15:16 GMT</TimeNextVisible></QueueMessage></QueueMessagesList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4d2f5949-9003-0075-23f0-629caf000000',
  'x-ms-client-request-id',
  '67913cf4-0a1b-49da-b5cc-5e9a2722fc81',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 07:15:16 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue156758131590101146/messages/7dd39641-3c49-4bf7-b4a4-8b2f9dcebf02')
  .query(true)
  .reply(400, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>InvalidQueryParameterValue</Code><Message>Value for one of the query parameters specified in the request URI is invalid.\nRequestId:7e5267e5-d003-0126-39f0-624196000000\nTime:2019-09-04T07:15:16.8600294Z</Message><QueryParameterName>popreceipt</QueryParameterName><QueryParameterValue>invalid</QueryParameterValue><Reason>Invalid pop receipt format</Reason></Error>", [ 'Content-Length',
  '417',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7e5267e5-d003-0126-39f0-624196000000',
  'x-ms-client-request-id',
  'fefd723d-5b7a-4633-bc52-5ecb04c3e413',
  'x-ms-version',
  '2019-02-02',
  'x-ms-error-code',
  'InvalidQueryParameterValue',
  'Date',
  'Wed, 04 Sep 2019 07:15:16 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue156758131590101146')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b85946c2-b003-002f-3ef0-62fa48000000',
  'x-ms-client-request-id',
  '5376ba24-fc0a-4151-80ff-c73b189f9965',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 07:15:16 GMT',
  'Connection',
  'close' ]);

