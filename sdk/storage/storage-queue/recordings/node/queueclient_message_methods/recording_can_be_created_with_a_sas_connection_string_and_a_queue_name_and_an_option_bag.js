let nock = require('nock');

module.exports.testInfo = {"queue":"queue156816833361607022"}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue156816833361607022')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '17e246b8-0003-0039-5c47-682658000000',
  'x-ms-client-request-id',
  'f3ddf25a-e3bc-482e-ba1f-7bc9b0bca901',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:18:53 GMT' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .post('/queue156816833361607022/messages', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>Hello World</MessageText></QueueMessage>")
  .query(true)
  .reply(201, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>505b7b65-79f3-4472-9a29-65effa069f23</MessageId><InsertionTime>Wed, 11 Sep 2019 02:18:54 GMT</InsertionTime><ExpirationTime>Wed, 18 Sep 2019 02:18:54 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAAgp9uQkdo1QE=</PopReceipt><TimeNextVisible>Wed, 11 Sep 2019 02:18:54 GMT</TimeNextVisible></QueueMessage></QueueMessagesList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2b17ff73-e003-0055-3847-688d8b000000',
  'x-ms-client-request-id',
  '7acc12f1-fdc5-4e0f-b916-43c556d5d935',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:18:53 GMT' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue156816833361607022')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '78a06084-6003-0044-4947-68ba90000000',
  'x-ms-client-request-id',
  '7b0e989e-0a99-4921-9be0-7f4c8c69e4f9',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:18:54 GMT' ]);

