let nock = require('nock');

module.exports.testInfo = {"queue":"queue156816831188105951"}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue156816831188105951')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4ea97af2-5003-004c-1447-68a1e3000000',
  'x-ms-client-request-id',
  'a787a643-fba6-4b76-9a26-1d5866fd7255',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:18:31 GMT' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .post('/queue156816831188105951/messages', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>Hello World</MessageText></QueueMessage>")
  .query(true)
  .reply(201, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>224f9823-41a5-4766-b68c-33228548ed58</MessageId><InsertionTime>Wed, 11 Sep 2019 02:18:32 GMT</InsertionTime><ExpirationTime>Wed, 18 Sep 2019 02:18:32 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAAuEt7NUdo1QE=</PopReceipt><TimeNextVisible>Wed, 11 Sep 2019 02:18:32 GMT</TimeNextVisible></QueueMessage></QueueMessagesList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e18b3f2c-1003-002d-2f47-68e53c000000',
  'x-ms-client-request-id',
  'e5debeaa-51ca-4e07-8457-ce072d0915d7',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:18:32 GMT' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue156816831188105951/messages/224f9823-41a5-4766-b68c-33228548ed58')
  .query(true)
  .reply(400, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>InvalidQueryParameterValue</Code><Message>Value for one of the query parameters specified in the request URI is invalid.\nRequestId:5deb2fdb-2003-0048-1447-685461000000\nTime:2019-09-11T02:18:33.0772397Z</Message><QueryParameterName>popreceipt</QueryParameterName><QueryParameterValue>invalid</QueryParameterValue><Reason>Invalid pop receipt format</Reason></Error>", [ 'Content-Length',
  '417',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5deb2fdb-2003-0048-1447-685461000000',
  'x-ms-client-request-id',
  '2696fed4-6359-4bca-b972-76659d5cfa59',
  'x-ms-version',
  '2019-02-02',
  'x-ms-error-code',
  'InvalidQueryParameterValue',
  'Date',
  'Wed, 11 Sep 2019 02:18:32 GMT' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue156816831188105951')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1c327cc4-c003-0060-6747-6823de000000',
  'x-ms-client-request-id',
  '9c0efe61-c8c2-441c-865a-8d61485414e2',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:18:33 GMT' ]);

