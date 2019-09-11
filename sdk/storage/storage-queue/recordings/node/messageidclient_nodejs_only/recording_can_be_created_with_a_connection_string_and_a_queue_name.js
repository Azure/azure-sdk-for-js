let nock = require('nock');

module.exports.testInfo = {"queue":"queue156816839140903423"}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue156816839140903423')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b9a520aa-6003-0022-6347-6808ca000000',
  'x-ms-client-request-id',
  '2bbd3117-4d8a-4418-a360-2afddd4c66e7',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:19:51 GMT' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .post('/queue156816839140903423/messages', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>Hello World</MessageText></QueueMessage>")
  .query(true)
  .reply(201, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>5ee220e1-0832-4d8a-b16d-4a68ade50263</MessageId><InsertionTime>Wed, 11 Sep 2019 02:19:52 GMT</InsertionTime><ExpirationTime>Wed, 18 Sep 2019 02:19:52 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAAVpzhZEdo1QE=</PopReceipt><TimeNextVisible>Wed, 11 Sep 2019 02:19:52 GMT</TimeNextVisible></QueueMessage></QueueMessagesList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0ff2e535-d003-0019-5e47-684a94000000',
  'x-ms-client-request-id',
  '1537d0ad-a37a-462e-bf0f-862674dd939a',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:19:51 GMT' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue156816839140903423')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a1ca3c4b-3003-005c-0947-689705000000',
  'x-ms-client-request-id',
  '77927800-feb7-44c4-9744-04d69e1f268a',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:19:52 GMT' ]);

