let nock = require('nock');

module.exports.testInfo = {"queue":"queue156758129383001799"}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue156758129383001799')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6d05a751-5003-00a1-11f0-622cfe000000',
  'x-ms-client-request-id',
  '85b14ad9-39cb-4eaf-b354-1536b54a4205',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 07:14:53 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .post('/queue156758129383001799/messages', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>Hello World</MessageText></QueueMessage>")
  .query(true)
  .reply(201, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>f898976e-011f-4bb1-936a-871a688beae9</MessageId><InsertionTime>Wed, 04 Sep 2019 07:14:54 GMT</InsertionTime><ExpirationTime>Wed, 11 Sep 2019 07:14:54 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAAwDZpc/Bi1QE=</PopReceipt><TimeNextVisible>Wed, 04 Sep 2019 07:14:54 GMT</TimeNextVisible></QueueMessage></QueueMessagesList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bf494b8a-0003-0067-06f0-62e77f000000',
  'x-ms-client-request-id',
  'd8782dd8-f553-4431-b703-b2b4cbf57481',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 07:14:54 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue156758129383001799/messages/f898976e-011f-4bb1-936a-871a688beae9', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText/></QueueMessage>")
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'cee8f141-4003-010b-71f0-62f2e5000000',
  'x-ms-client-request-id',
  'ff47dd27-c6ed-42ae-8cfb-b3f214276e8b',
  'x-ms-version',
  '2019-02-02',
  'x-ms-popreceipt',
  'AwAAAAMAAAAAAAAA2Jymc/Bi1QEAAAAA',
  'x-ms-time-next-visible',
  'Wed, 04 Sep 2019 07:14:54 GMT',
  'Date',
  'Wed, 04 Sep 2019 07:14:56 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue156758129383001799/messages')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>f898976e-011f-4bb1-936a-871a688beae9</MessageId><InsertionTime>Wed, 04 Sep 2019 07:14:54 GMT</InsertionTime><ExpirationTime>Wed, 11 Sep 2019 07:14:54 GMT</ExpirationTime><DequeueCount>0</DequeueCount><MessageText /></QueueMessage></QueueMessagesList>", [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b8e732f7-e003-0050-13f0-6235d3000000',
  'x-ms-client-request-id',
  '985dfa13-14a9-4978-97f3-ea7045cd4e23',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 04 Sep 2019 07:14:55 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue156758129383001799/messages/f898976e-011f-4bb1-936a-871a688beae9')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a9b3d335-2003-00ab-63f0-628849000000',
  'x-ms-client-request-id',
  'd8f5787f-b57c-48b8-9058-61ab7a292770',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 07:14:56 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue156758129383001799/messages')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList />", [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '845cc905-c003-000a-26f0-625334000000',
  'x-ms-client-request-id',
  'c11ef2e2-b423-4447-b7d6-8de36bd12c33',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 04 Sep 2019 07:14:57 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue156758129383001799')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '51bf594c-7003-0110-16f0-62cce6000000',
  'x-ms-client-request-id',
  '3e4a4ee0-7565-406c-8908-8636eb38a2f6',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 07:14:56 GMT',
  'Connection',
  'close' ]);

