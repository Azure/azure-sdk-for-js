let nock = require('nock');

module.exports.testInfo = {"now":"2019-04-22T21:00:20.019Z","tmr":"2019-04-22T21:00:20.019Z","queue":"queue155596682001906156"}

nock('https://coolstorageaccount1234.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue155596682001906156')
  .query({"timeout":"30"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'eea43d77-c003-0028-334e-f9eae7000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Mon, 22 Apr 2019 21:00:19 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue155596682001906156', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><SignedIdentifiers><SignedIdentifier><Id>unique-id</Id><AccessPolicy><Start>2019-04-22T20:55:20.0190000Z</Start><Expiry>2019-04-23T21:00:20.0190000Z</Expiry><Permission>raup</Permission></AccessPolicy></SignedIdentifier></SignedIdentifiers>")
  .query({"comp":"acl","timeout":"30"})
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b347c57d-7003-0090-534e-f90814000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Mon, 22 Apr 2019 21:00:20 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.queue.core.windows.net:443', {"encodedQueryParams":true})
  .post('/queue155596682001906156/messages', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>hello</MessageText></QueueMessage>")
  .query({"sv":"2018-03-28","si":"unique-id","sig":"31ht4WQkO2SSX8uqEUtxlGV1LA3QoHW7X%2FLYQihVv7M%3D","timeout":"30"})
  .reply(201, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>7290143f-dd58-4394-81dc-19deecfa79d9</MessageId><InsertionTime>Mon, 22 Apr 2019 21:00:21 GMT</InsertionTime><ExpirationTime>Mon, 29 Apr 2019 21:00:21 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAAMboFZk751AE=</PopReceipt><TimeNextVisible>Mon, 22 Apr 2019 21:00:21 GMT</TimeNextVisible></QueueMessage></QueueMessagesList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '44b150d3-b003-008d-754e-f9d1fe000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Mon, 22 Apr 2019 21:00:21 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue155596682001906156/messages')
  .query({"sv":"2018-03-28","si":"unique-id","sig":"31ht4WQkO2SSX8uqEUtxlGV1LA3QoHW7X%2FLYQihVv7M%3D","peekonly":"true","timeout":"30"})
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>7290143f-dd58-4394-81dc-19deecfa79d9</MessageId><InsertionTime>Mon, 22 Apr 2019 21:00:21 GMT</InsertionTime><ExpirationTime>Mon, 29 Apr 2019 21:00:21 GMT</ExpirationTime><DequeueCount>0</DequeueCount><MessageText>hello</MessageText></QueueMessage></QueueMessagesList>", [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '85b67266-9003-0056-564e-f97528000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 22 Apr 2019 21:00:21 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue155596682001906156/messages')
  .query({"sv":"2018-03-28","si":"unique-id","sig":"31ht4WQkO2SSX8uqEUtxlGV1LA3QoHW7X%2FLYQihVv7M%3D","visibilitytimeout":"1","timeout":"30"})
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>7290143f-dd58-4394-81dc-19deecfa79d9</MessageId><InsertionTime>Mon, 22 Apr 2019 21:00:21 GMT</InsertionTime><ExpirationTime>Mon, 29 Apr 2019 21:00:21 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAAfR4eZ0751AE=</PopReceipt><TimeNextVisible>Mon, 22 Apr 2019 21:00:23 GMT</TimeNextVisible><DequeueCount>1</DequeueCount><MessageText>hello</MessageText></QueueMessage></QueueMessagesList>", [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'dcf2f02d-5003-000f-154e-f970ae000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 22 Apr 2019 21:00:22 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue155596682001906156/messages/7290143f-dd58-4394-81dc-19deecfa79d9')
  .query({"sv":"2018-03-28","si":"unique-id","sig":"31ht4WQkO2SSX8uqEUtxlGV1LA3QoHW7X%2FLYQihVv7M%3D","popreceipt":"AgAAAAMAAAAAAAAAfR4eZ0751AE%3D","timeout":"30"})
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '08fe6fac-8003-0060-254e-f9d87a000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Mon, 22 Apr 2019 21:00:24 GMT',
  'Connection',
  'close' ]);
