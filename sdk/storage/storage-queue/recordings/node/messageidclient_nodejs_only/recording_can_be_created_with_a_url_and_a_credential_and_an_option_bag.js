let nock = require('nock');

module.exports.testInfo = {"queue":"queue156816838886301799"}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue156816838886301799')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9f563efa-5003-0003-1647-6865fb000000',
  'x-ms-client-request-id',
  'c55a2638-4a1d-48ae-8fe2-ee1ecbbd570c',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:19:48 GMT' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .post('/queue156816838886301799/messages', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>Hello World</MessageText></QueueMessage>")
  .query(true)
  .reply(201, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>799f3412-cacc-4f83-aa65-049edefb3b4d</MessageId><InsertionTime>Wed, 11 Sep 2019 02:19:49 GMT</InsertionTime><ExpirationTime>Wed, 18 Sep 2019 02:19:49 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAAAMhdY0do1QE=</PopReceipt><TimeNextVisible>Wed, 11 Sep 2019 02:19:49 GMT</TimeNextVisible></QueueMessage></QueueMessagesList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e5a6b1be-c003-000d-5147-6889f0000000',
  'x-ms-client-request-id',
  '2cf35f27-2a70-4d27-b707-e5ccae7a0635',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:19:49 GMT' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue156816838886301799')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0ff2e2d3-d003-0019-2047-684a94000000',
  'x-ms-client-request-id',
  'f96b87a0-f640-437c-bcc3-42c76632d36c',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:19:49 GMT' ]);

