let nock = require('nock');

module.exports.testInfo = {"queue":"queue157049908888001087"}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue157049908888001087')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e1605a84-c003-00ce-7079-7d5639000000',
  'x-ms-client-request-id',
  'a8dff1c1-5d89-4e3a-a62b-8af4dd7996e8',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 08 Oct 2019 01:44:48 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .post('/queue157049908888001087/messages', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>Hello World</MessageText></QueueMessage>")
  .query(true)
  .reply(201, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>a197d4e6-8fdf-4992-9af4-fab50b85b987</MessageId><InsertionTime>Tue, 08 Oct 2019 01:44:49 GMT</InsertionTime><ExpirationTime>Tue, 15 Oct 2019 01:44:49 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAAf2GN+Hl91QE=</PopReceipt><TimeNextVisible>Tue, 08 Oct 2019 01:44:49 GMT</TimeNextVisible></QueueMessage></QueueMessagesList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd53e4773-7003-0039-4a79-7d70d2000000',
  'x-ms-client-request-id',
  'f93b3a6c-6573-4382-ab92-e313796d8ce8',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 08 Oct 2019 01:44:48 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue157049908888001087/messages/a197d4e6-8fdf-4992-9af4-fab50b85b987', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>Hello World Hello World</MessageText></QueueMessage>")
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3e66f99b-3003-00f9-1879-7dfa96000000',
  'x-ms-client-request-id',
  '3ce55a04-844a-424b-b0d0-8cfc5789ae16',
  'x-ms-version',
  '2019-02-02',
  'x-ms-popreceipt',
  'AwAAAAMAAAAAAAAAmBSs+Hl91QEAAAAA',
  'x-ms-time-next-visible',
  'Tue, 08 Oct 2019 01:44:49 GMT',
  'Date',
  'Tue, 08 Oct 2019 01:44:48 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue157049908888001087/messages')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>a197d4e6-8fdf-4992-9af4-fab50b85b987</MessageId><InsertionTime>Tue, 08 Oct 2019 01:44:49 GMT</InsertionTime><ExpirationTime>Tue, 15 Oct 2019 01:44:49 GMT</ExpirationTime><DequeueCount>0</DequeueCount><MessageText>Hello World Hello World</MessageText></QueueMessage></QueueMessagesList>", [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '05b35982-a003-00b3-6279-7dcaf1000000',
  'x-ms-client-request-id',
  '8c848df6-3c92-49a4-a92a-838e67feb110',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 08 Oct 2019 01:44:48 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue157049908888001087')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e8890d53-b003-00e8-7e79-7dcd8d000000',
  'x-ms-client-request-id',
  '39494693-8f43-4a17-96dc-ad9e10b93966',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 08 Oct 2019 01:44:49 GMT',
  'Connection',
  'close' ]);

