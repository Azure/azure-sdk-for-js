let nock = require('nock');

module.exports.testInfo = {"queueName":"queue155510753575501487"}

nock('https://harshantest.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue155510753491009223')
  .query({"timeout":"30"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '320f9fea-8003-00b7-4e7d-f17594000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 12 Apr 2019 22:18:55 GMT',
  'Connection',
  'close' ]);


nock('https://harshantest.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue155510753491009223')
  .query({"timeout":"30"})
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2e8e8f41-7003-006e-057d-f1d3b8000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 12 Apr 2019 22:18:55 GMT',
  'Connection',
  'close' ]);
