let nock = require('nock');

module.exports.testInfo = {"queue":"queue155596542429904269"}

nock('https://coolstorageaccount1234.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue155596542429904269')
  .query({"timeout":"30"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '71049fb3-1003-0021-784b-f9f069000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Mon, 22 Apr 2019 20:37:03 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.queue.core.windows.net:443', {"encodedQueryParams":true})
  .post('/queue155596542429904269/messages', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>Hello World</MessageText></QueueMessage>")
  .query({"visibilitytimeout":"0","messagettl":"40","timeout":"30"})
  .reply(201, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>5fb01ab3-b20b-4057-afc2-4af7a45dd318</MessageId><InsertionTime>Mon, 22 Apr 2019 20:37:05 GMT</InsertionTime><ExpirationTime>Mon, 22 Apr 2019 20:37:45 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAAlN68JUv51AE=</PopReceipt><TimeNextVisible>Mon, 22 Apr 2019 20:37:05 GMT</TimeNextVisible></QueueMessage></QueueMessagesList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f1fde872-6003-008f-0e4b-f9d304000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Mon, 22 Apr 2019 20:37:04 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.queue.core.windows.net:443', {"encodedQueryParams":true})
  .post('/queue155596542429904269/messages', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>Hello World</MessageText></QueueMessage>")
  .query({"visibilitytimeout":"0","messagettl":"40","timeout":"30"})
  .reply(201, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>977616e9-d7f0-49c1-a155-b3fc6510843b</MessageId><InsertionTime>Mon, 22 Apr 2019 20:37:05 GMT</InsertionTime><ExpirationTime>Mon, 22 Apr 2019 20:37:45 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAA/0gKJkv51AE=</PopReceipt><TimeNextVisible>Mon, 22 Apr 2019 20:37:05 GMT</TimeNextVisible></QueueMessage></QueueMessagesList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd0a7c091-f003-006f-144b-f9358c000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Mon, 22 Apr 2019 20:37:04 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.queue.core.windows.net:443', {"encodedQueryParams":true})
  .post('/queue155596542429904269/messages', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>Hello World</MessageText></QueueMessage>")
  .query({"visibilitytimeout":"5","messagettl":"10","timeout":"30"})
  .reply(201, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>b9910db3-fa50-40d4-a03e-ae4371cdd8f1</MessageId><InsertionTime>Mon, 22 Apr 2019 20:37:06 GMT</InsertionTime><ExpirationTime>Mon, 22 Apr 2019 20:37:16 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAAZ9BFKUv51AE=</PopReceipt><TimeNextVisible>Mon, 22 Apr 2019 20:37:11 GMT</TimeNextVisible></QueueMessage></QueueMessagesList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7b028029-d003-009d-5d4b-f9e718000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Mon, 22 Apr 2019 20:37:05 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.queue.core.windows.net:443', {"encodedQueryParams":true})
  .post('/queue155596542429904269/messages', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>Hello World</MessageText></QueueMessage>")
  .query({"visibilitytimeout":"19","messagettl":"20","timeout":"30"})
  .reply(201, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>e1fc6749-3542-49ef-afa5-9e31d0adb2dc</MessageId><InsertionTime>Mon, 22 Apr 2019 20:37:06 GMT</InsertionTime><ExpirationTime>Mon, 22 Apr 2019 20:37:26 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAALRLsMUv51AE=</PopReceipt><TimeNextVisible>Mon, 22 Apr 2019 20:37:25 GMT</TimeNextVisible></QueueMessage></QueueMessagesList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9d1fe66e-4003-007d-724b-f90190000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Mon, 22 Apr 2019 20:37:06 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue155596542429904269/messages')
  .query({"numofmessages":"2","peekonly":"true","timeout":"30"})
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>5fb01ab3-b20b-4057-afc2-4af7a45dd318</MessageId><InsertionTime>Mon, 22 Apr 2019 20:37:05 GMT</InsertionTime><ExpirationTime>Mon, 22 Apr 2019 20:37:45 GMT</ExpirationTime><DequeueCount>0</DequeueCount><MessageText>Hello World</MessageText></QueueMessage><QueueMessage><MessageId>977616e9-d7f0-49c1-a155-b3fc6510843b</MessageId><InsertionTime>Mon, 22 Apr 2019 20:37:05 GMT</InsertionTime><ExpirationTime>Mon, 22 Apr 2019 20:37:45 GMT</ExpirationTime><DequeueCount>0</DequeueCount><MessageText>Hello World</MessageText></QueueMessage></QueueMessagesList>", [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7f6205c1-5003-008c-7c4b-f9d003000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 22 Apr 2019 20:37:06 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue155596542429904269/messages')
  .query({"numofmessages":"2","visibilitytimeout":"10","timeout":"30"})
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>5fb01ab3-b20b-4057-afc2-4af7a45dd318</MessageId><InsertionTime>Mon, 22 Apr 2019 20:37:05 GMT</InsertionTime><ExpirationTime>Mon, 22 Apr 2019 20:37:45 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAAphUoLUv51AE=</PopReceipt><TimeNextVisible>Mon, 22 Apr 2019 20:37:17 GMT</TimeNextVisible><DequeueCount>1</DequeueCount><MessageText>Hello World</MessageText></QueueMessage><QueueMessage><MessageId>977616e9-d7f0-49c1-a155-b3fc6510843b</MessageId><InsertionTime>Mon, 22 Apr 2019 20:37:05 GMT</InsertionTime><ExpirationTime>Mon, 22 Apr 2019 20:37:45 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAAphUoLUv51AE=</PopReceipt><TimeNextVisible>Mon, 22 Apr 2019 20:37:17 GMT</TimeNextVisible><DequeueCount>1</DequeueCount><MessageText>Hello World</MessageText></QueueMessage></QueueMessagesList>", [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9d1fe7bc-4003-007d-244b-f90190000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 22 Apr 2019 20:37:07 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue155596542429904269/messages')
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
  'f94a8515-e003-0016-1c4b-f95cc6000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 22 Apr 2019 20:37:07 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue155596542429904269')
  .query({"timeout":"30"})
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2bd4f585-a003-0011-2b4b-f9aa43000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Mon, 22 Apr 2019 20:37:07 GMT',
  'Connection',
  'close' ]);
