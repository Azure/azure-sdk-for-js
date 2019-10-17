let nock = require('nock');

module.exports.testInfo = {"queue":"queue156816828032700277"}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue156816828032700277')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0ae54bca-c003-0042-2b47-684de8000000',
  'x-ms-client-request-id',
  '5c4dc4f6-4a1b-452d-8f88-5fa2a5670928',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:18:00 GMT' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .post('/queue156816828032700277/messages', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>Hello World</MessageText></QueueMessage>")
  .query(true)
  .reply(201, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>95e7481b-ef10-48b5-8bdb-8ecb153de8f9</MessageId><InsertionTime>Wed, 11 Sep 2019 02:18:01 GMT</InsertionTime><ExpirationTime>Wed, 18 Sep 2019 02:18:01 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAA+G2qIkdo1QE=</PopReceipt><TimeNextVisible>Wed, 11 Sep 2019 02:18:01 GMT</TimeNextVisible></QueueMessage></QueueMessagesList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '78a01716-6003-0044-6c47-68ba90000000',
  'x-ms-client-request-id',
  'b2c1f6d7-bb7c-4e07-9965-646b8f8b03ff',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:18:00 GMT' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue156816828032700277/messages/95e7481b-ef10-48b5-8bdb-8ecb153de8f9', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>New Message</MessageText></QueueMessage>")
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1f4b8f81-3003-0031-4d47-683d2b000000',
  'x-ms-client-request-id',
  '5d610da2-f8a1-42c3-8fa5-5bedfe9f59da',
  'x-ms-version',
  '2019-02-02',
  'x-ms-popreceipt',
  'AwAAAAMAAAAAAAAAD3DgKEdo1QEAAAAA',
  'x-ms-time-next-visible',
  'Wed, 11 Sep 2019 02:18:11 GMT',
  'Date',
  'Wed, 11 Sep 2019 02:18:00 GMT' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue156816828032700277/messages')
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
  '8da6b453-5003-0047-6047-68b997000000',
  'x-ms-client-request-id',
  'e985e615-ca63-4418-86c2-86fec6c63ffa',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 11 Sep 2019 02:18:01 GMT' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue156816828032700277/messages')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>95e7481b-ef10-48b5-8bdb-8ecb153de8f9</MessageId><InsertionTime>Wed, 11 Sep 2019 02:18:01 GMT</InsertionTime><ExpirationTime>Wed, 18 Sep 2019 02:18:01 GMT</ExpirationTime><DequeueCount>0</DequeueCount><MessageText>New Message</MessageText></QueueMessage></QueueMessagesList>", [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1d5af703-2003-006a-4547-683a57000000',
  'x-ms-client-request-id',
  '1c1068c1-c8f1-4cde-8470-14d2cbad4b7d',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 11 Sep 2019 02:18:13 GMT' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue156816828032700277')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0cae7493-d003-0012-0647-6852e0000000',
  'x-ms-client-request-id',
  '3ceaca79-ecc9-45f9-91bb-a1af7cdc77b6',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:18:13 GMT' ]);

