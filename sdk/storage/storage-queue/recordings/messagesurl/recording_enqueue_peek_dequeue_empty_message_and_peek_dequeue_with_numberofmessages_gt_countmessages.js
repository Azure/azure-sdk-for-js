let nock = require('nock');

module.exports.testInfo = {"queue":"queue155692189862601635"}

nock('https://coolstorageaccount1234.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue155692189862601635')
  .query({"timeout":"30"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '29cd6648-0003-001c-1ffe-01454f000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 03 May 2019 22:18:17 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.queue.core.windows.net:443', {"encodedQueryParams":true})
  .post('/queue155692189862601635/messages', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText/></QueueMessage>")
  .query({"visibilitytimeout":"0","messagettl":"40","timeout":"30"})
  .reply(201, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>78582fb5-d067-4323-bbe9-0c813eec6ede</MessageId><InsertionTime>Fri, 03 May 2019 22:18:19 GMT</InsertionTime><ExpirationTime>Fri, 03 May 2019 22:18:59 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAAC0uWHP4B1QE=</PopReceipt><TimeNextVisible>Fri, 03 May 2019 22:18:19 GMT</TimeNextVisible></QueueMessage></QueueMessagesList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '06748554-6003-0007-2bfe-016bdd000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 03 May 2019 22:18:18 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue155692189862601635/messages')
  .query({"numofmessages":"2","peekonly":"true","timeout":"30"})
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>78582fb5-d067-4323-bbe9-0c813eec6ede</MessageId><InsertionTime>Fri, 03 May 2019 22:18:19 GMT</InsertionTime><ExpirationTime>Fri, 03 May 2019 22:18:59 GMT</ExpirationTime><DequeueCount>0</DequeueCount><MessageText /></QueueMessage></QueueMessagesList>", [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7858ccf4-4003-0093-6efe-010b13000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 03 May 2019 22:18:19 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue155692189862601635/messages')
  .query({"numofmessages":"2","visibilitytimeout":"10","timeout":"30"})
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>78582fb5-d067-4323-bbe9-0c813eec6ede</MessageId><InsertionTime>Fri, 03 May 2019 22:18:19 GMT</InsertionTime><ExpirationTime>Fri, 03 May 2019 22:18:59 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAAWHryIv4B1QE=</PopReceipt><TimeNextVisible>Fri, 03 May 2019 22:18:29 GMT</TimeNextVisible><DequeueCount>1</DequeueCount><MessageText /></QueueMessage></QueueMessagesList>", [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4ced5041-6003-0043-5efe-01b7b1000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 03 May 2019 22:18:19 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue155692189862601635')
  .query({"timeout":"30"})
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0e27ce04-4003-001b-2efe-01b3ca000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 03 May 2019 22:18:20 GMT',
  'Connection',
  'close' ]);

