let nock = require('nock');

module.exports.testInfo = {"queue":"queue157049908159509625"}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue157049908159509625')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b78d6ba9-1003-006d-4d79-7d9a58000000',
  'x-ms-client-request-id',
  'a862fca8-a8ff-4cc9-9623-2c727c5180c7',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 08 Oct 2019 01:44:41 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .post('/queue157049908159509625/messages', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>Hello World</MessageText></QueueMessage>")
  .query(true)
  .reply(201, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>19ad72d3-41b1-4035-9886-cca450d47616</MessageId><InsertionTime>Tue, 08 Oct 2019 01:44:41 GMT</InsertionTime><ExpirationTime>Tue, 15 Oct 2019 01:44:41 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAAIWY/9Hl91QE=</PopReceipt><TimeNextVisible>Tue, 08 Oct 2019 01:44:41 GMT</TimeNextVisible></QueueMessage></QueueMessagesList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '818f9ddd-c003-0002-3279-7d328c000000',
  'x-ms-client-request-id',
  '11e57c80-5352-4236-b33f-6840b47f2274',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 08 Oct 2019 01:44:41 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue157049908159509625/messages/19ad72d3-41b1-4035-9886-cca450d47616', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>Hello World Hello World</MessageText></QueueMessage>")
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0ac2e854-1003-0126-5079-7ded97000000',
  'x-ms-client-request-id',
  '36ad37ee-aa51-40cc-8045-14e4bfd2c6e2',
  'x-ms-version',
  '2019-02-02',
  'x-ms-popreceipt',
  'AwAAAAMAAAAAAAAAXb559Hl91QEAAAAA',
  'x-ms-time-next-visible',
  'Tue, 08 Oct 2019 01:44:42 GMT',
  'Date',
  'Tue, 08 Oct 2019 01:44:41 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue157049908159509625/messages')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>19ad72d3-41b1-4035-9886-cca450d47616</MessageId><InsertionTime>Tue, 08 Oct 2019 01:44:41 GMT</InsertionTime><ExpirationTime>Tue, 15 Oct 2019 01:44:41 GMT</ExpirationTime><DequeueCount>0</DequeueCount><MessageText>Hello World Hello World</MessageText></QueueMessage></QueueMessagesList>", [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'cac305be-8003-010a-2279-7d6faa000000',
  'x-ms-client-request-id',
  'a1637212-a84d-4624-81e9-3193ef1a5f28',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 08 Oct 2019 01:44:42 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue157049908159509625')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4bc4c603-4003-013e-2279-7dc002000000',
  'x-ms-client-request-id',
  '218ab22e-35b3-483e-871a-54a8274321b0',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 08 Oct 2019 01:44:42 GMT',
  'Connection',
  'close' ]);

