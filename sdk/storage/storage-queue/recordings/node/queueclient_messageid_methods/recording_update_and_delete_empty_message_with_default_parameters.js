let nock = require('nock');

module.exports.testInfo = {"queue":"queue156816827735800054"}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue156816827735800054')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c3ed3dd4-5003-002a-2347-6813b9000000',
  'x-ms-client-request-id',
  '1958d278-982e-4a80-9985-89de54bb8687',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:17:57 GMT' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .post('/queue156816827735800054/messages', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>Hello World</MessageText></QueueMessage>")
  .query(true)
  .reply(201, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>90f4410a-6f6c-41d4-9ff4-998376b36fca</MessageId><InsertionTime>Wed, 11 Sep 2019 02:17:58 GMT</InsertionTime><ExpirationTime>Wed, 18 Sep 2019 02:17:58 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAA38LoIEdo1QE=</PopReceipt><TimeNextVisible>Wed, 11 Sep 2019 02:17:58 GMT</TimeNextVisible></QueueMessage></QueueMessagesList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5deb1b8e-2003-0048-6a47-685461000000',
  'x-ms-client-request-id',
  '08e98994-9c27-40c0-aa55-18095d634015',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:17:58 GMT' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue156816827735800054/messages/90f4410a-6f6c-41d4-9ff4-998376b36fca', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText/></QueueMessage>")
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '388f37b5-a003-0059-2d47-68637a000000',
  'x-ms-client-request-id',
  'cfdc1687-8910-486d-970e-14a94086123f',
  'x-ms-version',
  '2019-02-02',
  'x-ms-popreceipt',
  'AwAAAAMAAAAAAAAAdXwrIUdo1QEAAAAA',
  'x-ms-time-next-visible',
  'Wed, 11 Sep 2019 02:17:58 GMT',
  'Date',
  'Wed, 11 Sep 2019 02:17:58 GMT' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue156816827735800054/messages')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>90f4410a-6f6c-41d4-9ff4-998376b36fca</MessageId><InsertionTime>Wed, 11 Sep 2019 02:17:58 GMT</InsertionTime><ExpirationTime>Wed, 18 Sep 2019 02:17:58 GMT</ExpirationTime><DequeueCount>0</DequeueCount><MessageText /></QueueMessage></QueueMessagesList>", [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1f4b8c18-3003-0031-7847-683d2b000000',
  'x-ms-client-request-id',
  'effbcdbc-1422-489a-a749-bb42ba765491',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 11 Sep 2019 02:17:58 GMT' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue156816827735800054/messages/90f4410a-6f6c-41d4-9ff4-998376b36fca')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ed703de0-4003-0053-1347-687af3000000',
  'x-ms-client-request-id',
  '91a66101-f6b0-4990-972a-2ba7dc7dae00',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:17:58 GMT' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue156816827735800054/messages')
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
  'c5ce5979-6003-0066-0947-68d4a6000000',
  'x-ms-client-request-id',
  '8b75282e-d60b-4d56-b70e-e3d77f39e596',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 11 Sep 2019 02:17:59 GMT' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue156816827735800054')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4ea954e5-5003-004c-5347-68a1e3000000',
  'x-ms-client-request-id',
  '9e10c8ad-8d4f-4199-a328-e2dfa3602197',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:17:59 GMT' ]);

