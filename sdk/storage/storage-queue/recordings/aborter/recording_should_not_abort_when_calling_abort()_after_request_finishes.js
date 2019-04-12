let nock = require('nock');

const testInfo = {"queueName":"queue155510369687708334"}

nock('https://harshantest.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue155510368474107416')
  .query({"timeout":"30"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd3fe732a-e003-0049-3574-f149f1000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 12 Apr 2019 21:14:44 GMT',
  'Connection',
  'close' ]);


nock('https://harshantest.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue155510368474107416')
  .query({"timeout":"30"})
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '80e1d445-d003-0063-2374-f13cb4000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 12 Apr 2019 21:14:56 GMT',
  'Connection',
  'close' ]);


nock('https://harshantest.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue155510369687708334')
  .query({"timeout":"30"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a83f1d59-e003-0042-3074-f15185000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 12 Apr 2019 21:14:56 GMT',
  'Connection',
  'close' ]);


nock('https://harshantest.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue155510369687708334')
  .query({"timeout":"30"})
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '881114f3-c003-00bb-4874-f19b65000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 12 Apr 2019 21:14:56 GMT',
  'Connection',
  'close' ]);
