let nock = require('nock');

module.exports.testInfo = {"queue":"queue156816840366301323"}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue156816840366301323')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '78a0bb98-6003-0044-5a47-68ba90000000',
  'x-ms-client-request-id',
  '29b8b314-f317-46d7-86c7-3c85f3810c7a',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:20:03 GMT' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .post('/queue156816840366301323/messages', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>Hello World</MessageText></QueueMessage>")
  .query(true)
  .reply(201, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>aafaa37d-da0e-407c-8cc2-00e4e64b3b79</MessageId><InsertionTime>Wed, 11 Sep 2019 02:20:04 GMT</InsertionTime><ExpirationTime>Wed, 18 Sep 2019 02:20:04 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAAWxMsbEdo1QE=</PopReceipt><TimeNextVisible>Wed, 11 Sep 2019 02:20:04 GMT</TimeNextVisible></QueueMessage></QueueMessagesList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '642764a7-f003-0041-3747-684eef000000',
  'x-ms-client-request-id',
  '7b2a4b86-90aa-4966-850d-5634f965ee0c',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:20:03 GMT' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue156816840366301323')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1d5b6080-2003-006a-3147-683a57000000',
  'x-ms-client-request-id',
  'a5dd0c9c-a553-47e9-b8b7-10181ad93ec6',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:20:04 GMT' ]);

