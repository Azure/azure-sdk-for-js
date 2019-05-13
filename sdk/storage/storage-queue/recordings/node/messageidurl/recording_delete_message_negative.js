let nock = require('nock');

module.exports.testInfo = {"queue":"queue155564197434302591"}

nock('https://coolstorageaccount1234.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue155564197434302591')
  .query({"timeout":"30"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '728313f3-9003-0012-145a-f6a944000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 19 Apr 2019 02:46:14 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.queue.core.windows.net:443', {"encodedQueryParams":true})
  .post('/queue155564197434302591/messages', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>Hello World</MessageText></QueueMessage>")
  .query({"timeout":"30"})
  .reply(201, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>2521fc5c-c92c-4ae3-9199-b5af92b951a2</MessageId><InsertionTime>Fri, 19 Apr 2019 02:46:15 GMT</InsertionTime><ExpirationTime>Fri, 26 Apr 2019 02:46:15 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAAxuCCDlr21AE=</PopReceipt><TimeNextVisible>Fri, 19 Apr 2019 02:46:15 GMT</TimeNextVisible></QueueMessage></QueueMessagesList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '83f46b0a-1003-0008-615a-f6862b000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 19 Apr 2019 02:46:14 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue155564197434302591/messages/2521fc5c-c92c-4ae3-9199-b5af92b951a2')
  .query({"popreceipt":"invalid","timeout":"30"})
  .reply(400, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>InvalidQueryParameterValue</Code><Message>Value for one of the query parameters specified in the request URI is invalid.\nRequestId:47329878-1003-0021-325a-f6f069000000\nTime:2019-04-19T02:46:15.5650902Z</Message><QueryParameterName>popreceipt</QueryParameterName><QueryParameterValue>invalid</QueryParameterValue><Reason>Invalid pop receipt format</Reason></Error>", [ 'Content-Length',
  '417',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '47329878-1003-0021-325a-f6f069000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-error-code',
  'InvalidQueryParameterValue',
  'Date',
  'Fri, 19 Apr 2019 02:46:15 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue155564197434302591')
  .query({"timeout":"30"})
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f4aec2af-b003-0086-725a-f6c98a000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 19 Apr 2019 02:46:15 GMT',
  'Connection',
  'close' ]);
