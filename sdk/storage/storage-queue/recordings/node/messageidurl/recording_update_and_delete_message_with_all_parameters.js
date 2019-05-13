let nock = require('nock');

module.exports.testInfo = {"queue":"queue155564195632807390"}

nock('https://coolstorageaccount1234.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue155564195632807390')
  .query({"timeout":"30"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8b63ecba-1003-004c-585a-f65a47000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 19 Apr 2019 02:45:55 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.queue.core.windows.net:443', {"encodedQueryParams":true})
  .post('/queue155564195632807390/messages', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>Hello World</MessageText></QueueMessage>")
  .query({"timeout":"30"})
  .reply(201, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>652711d2-0431-4f63-a9fa-7b3dd19156be</MessageId><InsertionTime>Fri, 19 Apr 2019 02:45:57 GMT</InsertionTime><ExpirationTime>Fri, 26 Apr 2019 02:45:57 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAArMzGA1r21AE=</PopReceipt><TimeNextVisible>Fri, 19 Apr 2019 02:45:57 GMT</TimeNextVisible></QueueMessage></QueueMessagesList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e44072dd-8003-000d-135a-f67254000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 19 Apr 2019 02:45:56 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue155564195632807390/messages/652711d2-0431-4f63-a9fa-7b3dd19156be', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>New Message</MessageText></QueueMessage>")
  .query({"popreceipt":"AgAAAAMAAAAAAAAArMzGA1r21AE%3D","visibilitytimeout":"10","timeout":"30"})
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4732925d-1003-0021-1d5a-f6f069000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-popreceipt',
  'AwAAAAMAAAAAAAAAnc/8CVr21AEAAAAA',
  'x-ms-time-next-visible',
  'Fri, 19 Apr 2019 02:46:07 GMT',
  'Date',
  'Fri, 19 Apr 2019 02:45:57 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue155564195632807390/messages')
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
  '5fd574fe-c003-0028-385a-f6eae7000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 19 Apr 2019 02:45:57 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue155564195632807390/messages')
  .query({"peekonly":"true","timeout":"30"})
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>652711d2-0431-4f63-a9fa-7b3dd19156be</MessageId><InsertionTime>Fri, 19 Apr 2019 02:45:57 GMT</InsertionTime><ExpirationTime>Fri, 26 Apr 2019 02:45:57 GMT</ExpirationTime><DequeueCount>0</DequeueCount><MessageText>New Message</MessageText></QueueMessage></QueueMessagesList>", [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b90b5b57-1003-006e-6d5a-f63471000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 19 Apr 2019 02:46:08 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue155564195632807390')
  .query({"timeout":"30"})
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'dec6d7ae-f003-004d-175a-f65bba000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 19 Apr 2019 02:46:09 GMT',
  'Connection',
  'close' ]);
