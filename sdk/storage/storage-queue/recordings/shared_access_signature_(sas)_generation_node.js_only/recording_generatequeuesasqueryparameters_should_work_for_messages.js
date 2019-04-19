let nock = require('nock');

module.exports.testInfo = {"now":"2019-04-19T03:51:46.155Z","tmr":"2019-04-19T03:51:46.155Z","queue":"queue155564590615503783"}

nock('https://coolstorageaccount1234.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue155564590615503783')
  .query({"timeout":"30"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'dedd65e2-f003-004d-6563-f65bba000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 19 Apr 2019 03:51:46 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.queue.core.windows.net:443', {"encodedQueryParams":true})
  .post('/queue155564590615503783/messages', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>Hello World!</MessageText></QueueMessage>")
  .query({"sv":"2016-05-31","spr":"https%2Chttp","st":"2019-04-19T03%3A46%3A46Z","se":"2019-04-20T03%3A51%3A46Z","sip":"0.0.0.0-255.255.255.255","sp":"raup","sig":"5D2UZUmb1h1YG5AxNa6XLS46TaIOigxUdn6c%2Fuwxi7A%3D","timeout":"30"})
  .reply(201, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>6bdf5433-8c2a-4a2c-a304-1d0484fc1b28</MessageId><InsertionTime>Fri, 19 Apr 2019 03:51:47 GMT</InsertionTime><ExpirationTime>Fri, 26 Apr 2019 03:51:47 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAAFb8kNmP21AE=</PopReceipt><TimeNextVisible>Fri, 19 Apr 2019 03:51:47 GMT</TimeNextVisible></QueueMessage></QueueMessagesList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ce001537-7003-003a-0663-f6defb000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 19 Apr 2019 03:51:47 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue155564590615503783/messages')
  .query({"peekonly":"true","timeout":"30"})
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>6bdf5433-8c2a-4a2c-a304-1d0484fc1b28</MessageId><InsertionTime>Fri, 19 Apr 2019 03:51:47 GMT</InsertionTime><ExpirationTime>Fri, 26 Apr 2019 03:51:47 GMT</ExpirationTime><DequeueCount>0</DequeueCount><MessageText>Hello World!</MessageText></QueueMessage></QueueMessagesList>", [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '692dca07-b003-0005-0163-f66927000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 19 Apr 2019 03:51:47 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue155564590615503783/messages/6bdf5433-8c2a-4a2c-a304-1d0484fc1b28')
  .query({"sv":"2016-05-31","spr":"https%2Chttp","st":"2019-04-19T03%3A46%3A46Z","se":"2019-04-20T03%3A51%3A46Z","sip":"0.0.0.0-255.255.255.255","sp":"raup","sig":"5D2UZUmb1h1YG5AxNa6XLS46TaIOigxUdn6c%2Fuwxi7A%3D","popreceipt":"AgAAAAMAAAAAAAAAFb8kNmP21AE%3D","timeout":"30"})
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'da3ad40c-b003-0063-2563-f6db7d000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 19 Apr 2019 03:51:47 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue155564590615503783/messages')
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
  '560671c1-a003-0077-2a63-f61819000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 19 Apr 2019 03:51:47 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue155564590615503783')
  .query({"timeout":"30"})
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'fccf6cee-e003-003f-6c63-f62a84000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 19 Apr 2019 03:51:48 GMT',
  'Connection',
  'close' ]);
