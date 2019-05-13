let nock = require('nock');

module.exports.testInfo = {"queue":"queue155596542018104316"}

nock('https://coolstorageaccount1234.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue155596542018104316')
  .query({"timeout":"30"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd513121d-8003-0085-614b-f9ca8d000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Mon, 22 Apr 2019 20:37:00 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.queue.core.windows.net:443', {"encodedQueryParams":true})
  .post('/queue155596542018104316/messages', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>Hello World</MessageText></QueueMessage>")
  .query({"timeout":"30"})
  .reply(201, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>d7e73abe-1673-46d1-aaab-eeaa4bfbd7ef</MessageId><InsertionTime>Mon, 22 Apr 2019 20:37:01 GMT</InsertionTime><ExpirationTime>Mon, 29 Apr 2019 20:37:01 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAAsBxsI0v51AE=</PopReceipt><TimeNextVisible>Mon, 22 Apr 2019 20:37:01 GMT</TimeNextVisible></QueueMessage></QueueMessagesList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7b027fff-d003-009d-464b-f9e718000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Mon, 22 Apr 2019 20:37:00 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.queue.core.windows.net:443', {"encodedQueryParams":true})
  .post('/queue155596542018104316/messages', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>Hello World</MessageText></QueueMessage>")
  .query({"timeout":"30"})
  .reply(201, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>386cd211-b4e6-4785-97fe-64c9af4e9013</MessageId><InsertionTime>Mon, 22 Apr 2019 20:37:01 GMT</InsertionTime><ExpirationTime>Mon, 29 Apr 2019 20:37:01 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAAByWvI0v51AE=</PopReceipt><TimeNextVisible>Mon, 22 Apr 2019 20:37:01 GMT</TimeNextVisible></QueueMessage></QueueMessagesList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '13484d5f-9003-0030-6c4b-f9c772000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Mon, 22 Apr 2019 20:37:01 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue155596542018104316/messages')
  .query({"peekonly":"true","timeout":"30"})
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>d7e73abe-1673-46d1-aaab-eeaa4bfbd7ef</MessageId><InsertionTime>Mon, 22 Apr 2019 20:37:01 GMT</InsertionTime><ExpirationTime>Mon, 29 Apr 2019 20:37:01 GMT</ExpirationTime><DequeueCount>0</DequeueCount><MessageText>Hello World</MessageText></QueueMessage></QueueMessagesList>", [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7514a49b-d003-0078-7d4b-f9f5ef000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 22 Apr 2019 20:37:01 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue155596542018104316/messages')
  .query({"timeout":"30"})
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>d7e73abe-1673-46d1-aaab-eeaa4bfbd7ef</MessageId><InsertionTime>Mon, 22 Apr 2019 20:37:01 GMT</InsertionTime><ExpirationTime>Mon, 29 Apr 2019 20:37:01 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAAFMcVNkv51AE=</PopReceipt><TimeNextVisible>Mon, 22 Apr 2019 20:37:32 GMT</TimeNextVisible><DequeueCount>1</DequeueCount><MessageText>Hello World</MessageText></QueueMessage></QueueMessagesList>", [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1994a9b5-e003-0052-384b-f980aa000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 22 Apr 2019 20:37:02 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue155596542018104316/messages')
  .query({"timeout":"30"})
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0ba4d81b-6003-002e-404b-f91d9f000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Mon, 22 Apr 2019 20:37:02 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue155596542018104316/messages')
  .query({"peekonly":"true","timeout":"30"})
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList />", [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4ae7a264-7003-009b-2d4b-f91060000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 22 Apr 2019 20:37:03 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue155596542018104316')
  .query({"timeout":"30"})
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b1d3603d-e003-0070-2c4b-f9ee9c000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Mon, 22 Apr 2019 20:37:04 GMT',
  'Connection',
  'close' ]);
