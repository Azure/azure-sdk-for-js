let nock = require('nock');

module.exports.testInfo = {"now":"2019-04-22T21:00:17.343Z","tmr":"2019-04-22T21:00:17.344Z","queue":"queue155596681734400587"}

nock('https://coolstorageaccount1234.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue155596681734400587')
  .query({"timeout":"30"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '50db2459-b003-0086-6d4e-f9c98a000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Mon, 22 Apr 2019 21:00:17 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.queue.core.windows.net:443', {"encodedQueryParams":true})
  .post('/queue155596681734400587/messages', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>Hello World!</MessageText></QueueMessage>")
  .query({"sv":"2016-05-31","spr":"https%2Chttp","st":"2019-04-22T20%3A55%3A17Z","se":"2019-04-23T21%3A00%3A17Z","sip":"0.0.0.0-255.255.255.255","sp":"raup","sig":"wqWNzvqAaMA54cRoKQt4y%2BS7E0hR7hqPNylLQSTt7tE%3D","timeout":"30"})
  .reply(201, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>cb766425-6e3d-48ca-a772-f6d3915a9ddf</MessageId><InsertionTime>Mon, 22 Apr 2019 21:00:18 GMT</InsertionTime><ExpirationTime>Mon, 29 Apr 2019 21:00:18 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAAod8dZE751AE=</PopReceipt><TimeNextVisible>Mon, 22 Apr 2019 21:00:18 GMT</TimeNextVisible></QueueMessage></QueueMessagesList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4aea1412-7003-009b-6a4e-f91060000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Mon, 22 Apr 2019 21:00:18 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue155596681734400587/messages')
  .query({"peekonly":"true","timeout":"30"})
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>cb766425-6e3d-48ca-a772-f6d3915a9ddf</MessageId><InsertionTime>Mon, 22 Apr 2019 21:00:18 GMT</InsertionTime><ExpirationTime>Mon, 29 Apr 2019 21:00:18 GMT</ExpirationTime><DequeueCount>0</DequeueCount><MessageText>Hello World!</MessageText></QueueMessage></QueueMessagesList>", [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8da322cf-6003-0061-564e-f9d987000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 22 Apr 2019 21:00:17 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue155596681734400587/messages/cb766425-6e3d-48ca-a772-f6d3915a9ddf')
  .query({"sv":"2016-05-31","spr":"https%2Chttp","st":"2019-04-22T20%3A55%3A17Z","se":"2019-04-23T21%3A00%3A17Z","sip":"0.0.0.0-255.255.255.255","sp":"raup","sig":"wqWNzvqAaMA54cRoKQt4y%2BS7E0hR7hqPNylLQSTt7tE%3D","popreceipt":"AgAAAAMAAAAAAAAAod8dZE751AE%3D","timeout":"30"})
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c2edda69-f003-0046-564e-f943ce000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Mon, 22 Apr 2019 21:00:18 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue155596681734400587/messages')
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
  'b1db2ded-e003-0070-744e-f9ee9c000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 22 Apr 2019 21:00:18 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue155596681734400587')
  .query({"timeout":"30"})
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'cfca2511-4003-0093-264e-f90b13000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Mon, 22 Apr 2019 21:00:19 GMT',
  'Connection',
  'close' ]);
