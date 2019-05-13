let nock = require('nock');

module.exports.testInfo = {"queue":"queue155564195328608225"}

nock('https://coolstorageaccount1234.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue155564195328608225')
  .query({"timeout":"30"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '24919947-5003-0062-035a-f6da80000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 19 Apr 2019 02:45:53 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.queue.core.windows.net:443', {"encodedQueryParams":true})
  .post('/queue155564195328608225/messages', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>Hello World</MessageText></QueueMessage>")
  .query({"timeout":"30"})
  .reply(201, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>fb0ecd8c-8d3c-443f-875d-3941f0bce0b6</MessageId><InsertionTime>Fri, 19 Apr 2019 02:45:54 GMT</InsertionTime><ExpirationTime>Fri, 26 Apr 2019 02:45:54 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAAT6oCAlr21AE=</PopReceipt><TimeNextVisible>Fri, 19 Apr 2019 02:45:54 GMT</TimeNextVisible></QueueMessage></QueueMessagesList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2aa62da3-c003-0082-745a-f63c08000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 19 Apr 2019 02:45:53 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue155564195328608225/messages/fb0ecd8c-8d3c-443f-875d-3941f0bce0b6', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText/></QueueMessage>")
  .query({"popreceipt":"AgAAAAMAAAAAAAAAT6oCAlr21AE%3D","visibilitytimeout":"0","timeout":"30"})
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'cc932e99-5003-0069-085a-f6c2f4000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-popreceipt',
  'AwAAAAMAAAAAAAAAsY9DAlr21AEAAAAA',
  'x-ms-time-next-visible',
  'Fri, 19 Apr 2019 02:45:54 GMT',
  'Date',
  'Fri, 19 Apr 2019 02:45:54 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue155564195328608225/messages')
  .query({"peekonly":"true","timeout":"30"})
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>fb0ecd8c-8d3c-443f-875d-3941f0bce0b6</MessageId><InsertionTime>Fri, 19 Apr 2019 02:45:54 GMT</InsertionTime><ExpirationTime>Fri, 26 Apr 2019 02:45:54 GMT</ExpirationTime><DequeueCount>0</DequeueCount><MessageText /></QueueMessage></QueueMessagesList>", [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9a20b720-9003-0019-665a-f6b130000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 19 Apr 2019 02:45:55 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue155564195328608225/messages/fb0ecd8c-8d3c-443f-875d-3941f0bce0b6')
  .query({"popreceipt":"AwAAAAMAAAAAAAAAsY9DAlr21AEAAAAA","timeout":"30"})
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd6705ec1-1003-002a-405a-f6e81d000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 19 Apr 2019 02:45:54 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue155564195328608225/messages')
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
  'a9dc4b0a-2003-0044-015a-f64134000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 19 Apr 2019 02:45:55 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue155564195328608225')
  .query({"timeout":"30"})
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd0f9cb93-d003-0073-665a-f6ed9b000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 19 Apr 2019 02:45:55 GMT',
  'Connection',
  'close' ]);
