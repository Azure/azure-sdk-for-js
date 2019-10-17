let nock = require('nock');

module.exports.testInfo = {"now":"2019-09-11T02:20:21.498Z","tmr":"2019-09-11T02:20:21.498Z","queue":"queue156816842149809366"}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue156816842149809366')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'cc1811b5-4003-0058-4d47-686287000000',
  'x-ms-client-request-id',
  '40b17dca-8f5d-42bb-8e33-9cb387154cdc',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:20:20 GMT' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .post('/queue156816842149809366/messages', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>Hello World!</MessageText></QueueMessage>")
  .query(true)
  .reply(201, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>c6870acb-a1ff-47af-804f-dae42c080f1a</MessageId><InsertionTime>Wed, 11 Sep 2019 02:20:22 GMT</InsertionTime><ExpirationTime>Wed, 18 Sep 2019 02:20:22 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAAv0bPdkdo1QE=</PopReceipt><TimeNextVisible>Wed, 11 Sep 2019 02:20:22 GMT</TimeNextVisible></QueueMessage></QueueMessagesList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9f5652fe-5003-0003-5847-6865fb000000',
  'x-ms-client-request-id',
  '5c02c8d5-30dd-49f9-b2f4-6f668cfb547e',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:20:21 GMT' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue156816842149809366/messages')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>c6870acb-a1ff-47af-804f-dae42c080f1a</MessageId><InsertionTime>Wed, 11 Sep 2019 02:20:22 GMT</InsertionTime><ExpirationTime>Wed, 18 Sep 2019 02:20:22 GMT</ExpirationTime><DequeueCount>0</DequeueCount><MessageText>Hello World!</MessageText></QueueMessage></QueueMessagesList>", [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1f4c1d50-3003-0031-5d47-683d2b000000',
  'x-ms-client-request-id',
  'a02198bb-a36d-4c07-afcb-dac1d8d3e33a',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 11 Sep 2019 02:20:21 GMT' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue156816842149809366/messages/c6870acb-a1ff-47af-804f-dae42c080f1a')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a6d1305d-e003-0038-7e47-6827a5000000',
  'x-ms-client-request-id',
  'a2911a08-ea93-467e-a764-93620cdf7e71',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:20:22 GMT' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue156816842149809366/messages')
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
  '4eaa1589-5003-004c-1b47-68a1e3000000',
  'x-ms-client-request-id',
  '32147185-9316-4194-8c86-696268448e7a',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 11 Sep 2019 02:20:23 GMT' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue156816842149809366')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '209cee4b-1003-004b-3947-685766000000',
  'x-ms-client-request-id',
  'e63e5d74-28ea-4ce7-86f1-6e8ffa1483e5',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:20:23 GMT' ]);

