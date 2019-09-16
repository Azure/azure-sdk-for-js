let nock = require('nock');

module.exports.testInfo = {"queue":"queue156816839013105196"}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue156816839013105196')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c3ed768d-5003-002a-3347-6813b9000000',
  'x-ms-client-request-id',
  'b80c3dc9-ca4b-4ab1-a1be-ef481d552df1',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:19:49 GMT' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .post('/queue156816839013105196/messages', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>Hello World</MessageText></QueueMessage>")
  .query(true)
  .reply(201, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>79586d81-2018-4417-8ad8-1b6f1ff70b72</MessageId><InsertionTime>Wed, 11 Sep 2019 02:19:50 GMT</InsertionTime><ExpirationTime>Wed, 18 Sep 2019 02:19:50 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAA/GMfZEdo1QE=</PopReceipt><TimeNextVisible>Wed, 11 Sep 2019 02:19:50 GMT</TimeNextVisible></QueueMessage></QueueMessagesList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a68989c0-b003-0002-3847-686406000000',
  'x-ms-client-request-id',
  '4e09ad4d-1024-47f6-b430-aacf5ce1b661',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:19:50 GMT' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue156816839013105196')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '583fd8ef-7003-005b-7f47-686180000000',
  'x-ms-client-request-id',
  'ceb2338e-19b3-4ee4-b5c8-4df14407227a',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:19:50 GMT' ]);

