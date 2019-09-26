let nock = require('nock');

module.exports.testInfo = {"now":"2019-09-04T07:16:24.111Z","tmr":"2019-09-04T07:16:24.111Z","queue":"queue156758138411106220"}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue156758138411106220')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd61c7190-a003-0023-24f0-626d40000000',
  'x-ms-client-request-id',
  '926c129f-3f30-4336-91a3-8f2fba962e01',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 07:16:23 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue156758138411106220', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><SignedIdentifiers><SignedIdentifier><Id>unique-id</Id><AccessPolicy><Start>2019-09-04T07:11:24.1110000Z</Start><Expiry>2019-09-05T07:16:24.1110000Z</Expiry><Permission>raup</Permission></AccessPolicy></SignedIdentifier></SignedIdentifiers>")
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ec8bfafc-e003-007f-67f0-623818000000',
  'x-ms-client-request-id',
  '2cfcad05-9dd5-4278-8395-6965bd4a609a',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 07:16:24 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .post('/queue156758138411106220/messages', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>hello</MessageText></QueueMessage>")
  .query(true)
  .reply(201, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>bfa3d810-5c97-415b-9869-863bfa219318</MessageId><InsertionTime>Wed, 04 Sep 2019 07:16:25 GMT</InsertionTime><ExpirationTime>Wed, 11 Sep 2019 07:16:25 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAAuE53qfBi1QE=</PopReceipt><TimeNextVisible>Wed, 04 Sep 2019 07:16:25 GMT</TimeNextVisible></QueueMessage></QueueMessagesList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0b39a335-0003-0147-51f0-6262d5000000',
  'x-ms-client-request-id',
  '9d1187cd-2886-46dc-accf-fab1ccc40f82',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 07:16:24 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue156758138411106220/messages')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>bfa3d810-5c97-415b-9869-863bfa219318</MessageId><InsertionTime>Wed, 04 Sep 2019 07:16:25 GMT</InsertionTime><ExpirationTime>Wed, 11 Sep 2019 07:16:25 GMT</ExpirationTime><DequeueCount>0</DequeueCount><MessageText>hello</MessageText></QueueMessage></QueueMessagesList>", [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8811f10b-6003-0085-37f0-62da5e000000',
  'x-ms-client-request-id',
  'c0161145-c7f9-45a3-8c57-c2c091607c25',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 04 Sep 2019 07:16:24 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue156758138411106220/messages')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>bfa3d810-5c97-415b-9869-863bfa219318</MessageId><InsertionTime>Wed, 04 Sep 2019 07:16:25 GMT</InsertionTime><ExpirationTime>Wed, 11 Sep 2019 07:16:25 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAAOZiNqvBi1QE=</PopReceipt><TimeNextVisible>Wed, 04 Sep 2019 07:16:27 GMT</TimeNextVisible><DequeueCount>1</DequeueCount><MessageText>hello</MessageText></QueueMessage></QueueMessagesList>", [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e5902411-d003-0144-7bf0-6283b1000000',
  'x-ms-client-request-id',
  '5273c2e7-438b-4d5f-8e8e-83fcab4e968a',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 04 Sep 2019 07:16:25 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue156758138411106220/messages/bfa3d810-5c97-415b-9869-863bfa219318')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5b80fc83-f003-00e5-38f0-62a6c1000000',
  'x-ms-client-request-id',
  'a62db070-64c8-4478-a2a3-e7387199b0a8',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 07:16:28 GMT',
  'Connection',
  'close' ]);

